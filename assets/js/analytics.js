/**
 * Real-Time Site Analytics & Visitor Tracking Module
 * Full Supabase Database Integration
 */

const Analytics = {
    VISITOR_KEY: 'iudex_visitor_id',
    currentSessionId: null,
    startTime: Date.now(),

    getVisitorId() {
        let visitorId = localStorage.getItem(this.VISITOR_KEY);
        if (!visitorId) {
            visitorId = 'v_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
            localStorage.setItem(this.VISITOR_KEY, visitorId);
        }
        return visitorId;
    },

    async getVisitorCountry() {
        try {
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
            if (tz.includes('Jakarta') || tz.includes('Makassar') || tz.includes('Jayapura') || tz.includes('Pontianak')) {
                return 'Indonesia';
            } else if (tz.includes('Kuala_Lumpur')) {
                return 'Malaysia';
            } else if (tz.includes('Singapore')) {
                return 'Singapura';
            } else if (tz.includes('Tokyo')) {
                return 'Jepang';
            }
        } catch (e) {}

        const lang = (navigator.language || '').toLowerCase();
        if (lang.includes('id')) return 'Indonesia';
        if (lang.includes('ms')) return 'Malaysia';
        if (lang.includes('ja')) return 'Jepang';

        return 'Indonesia';
    },

    async trackPageView() {
        if (!window.supabaseClient) return;
        try {
            const path = window.location.pathname.split('/').pop() || 'home.html';
            const visitorId = this.getVisitorId();
            const country = await this.getVisitorCountry();

            const { data, error } = await window.supabaseClient
                .from('site_analytics')
                .insert([{
                    page_path: path,
                    visitor_id: visitorId,
                    country: country,
                    duration_seconds: 0
                }])
                .select()
                .maybeSingle();

            if (data) {
                this.currentSessionId = data.id;
                this.startDurationTracking();
            }
        } catch (e) {
            console.warn('Analytics tracking skipped:', e);
        }
    },

    startDurationTracking() {
        const updateDuration = async () => {
            if (!this.currentSessionId || !window.supabaseClient) return;
            const duration = Math.floor((Date.now() - this.startTime) / 1000);
            try {
                await window.supabaseClient
                    .from('site_analytics')
                    .update({ duration_seconds: duration })
                    .eq('id', this.currentSessionId);
            } catch (e) {}
        };

        setInterval(updateDuration, 15000);
        window.addEventListener('beforeunload', updateDuration);
    },

    async trackProjectView(projectId) {
        if (!projectId || !window.supabaseClient) return;
        try {
            const visitorId = this.getVisitorId();
            const country = await this.getVisitorCountry();
            
            // 1. Always log project view to site_analytics table
            await window.supabaseClient
                .from('site_analytics')
                .insert([{
                    page_path: 'project_' + projectId,
                    visitor_id: visitorId,
                    country: country,
                    duration_seconds: 0
                }]);

            // 2. Increment view_count on projects table
            const pIdNum = parseInt(projectId, 10);
            const targetId = !isNaN(pIdNum) ? pIdNum : projectId;
            
            const { error } = await window.supabaseClient.rpc('increment_project_views', { p_id: targetId });
            if (error) {
                const { data } = await window.supabaseClient
                    .from('projects')
                    .select('view_count')
                    .eq('id', targetId)
                    .maybeSingle();
                if (data) {
                    await window.supabaseClient
                        .from('projects')
                        .update({ view_count: (data.view_count || 0) + 1 })
                        .eq('id', targetId);
                }
            }
        } catch (e) {
            console.warn('Project view track error:', e);
        }
    },

    async getStats(tayanganRange = 'month', activeRange = 'week') {
        if (!window.supabaseClient) {
            return this.getFallbackStats();
        }
        try {
            const [analyticsRes, projectsRes] = await Promise.all([
                window.supabaseClient.from('site_analytics').select('*'),
                window.supabaseClient.from('projects').select('*')
            ]);

            const analyticsData = analyticsRes.data || [];
            const projectsData = projectsRes.data || [];

            // Track project view logs from site_analytics (page_path = project_{id})
            const projectViewLogs = {};
            const dailyMap = {};

            analyticsData.forEach(item => {
                if (item.created_at) {
                    const dateStr = item.created_at.split('T')[0];
                    dailyMap[dateStr] = (dailyMap[dateStr] || 0) + 1;
                }
                if (item.page_path && item.page_path.startsWith('project_')) {
                    const pId = item.page_path.replace('project_', '');
                    projectViewLogs[pId] = (projectViewLogs[pId] || 0) + 1;
                }
            });

            let totalProjectViews = 0;
            projectsData.forEach(p => {
                const extraViews = projectViewLogs[p.id] || projectViewLogs[String(p.id)] || 0;
                p.view_count = (p.view_count || 0) + extraViews;
                totalProjectViews += p.view_count;
            });

            const now = new Date();
            const todayStr = now.toISOString().split('T')[0];
            const currentMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

            // Helper to generate 7 trend buckets for SVG Wave lines matching the exact timeframe data
            const getTrendBuckets = (data, range) => {
                const buckets = [0, 0, 0, 0, 0, 0, 0];
                if (!data || data.length === 0) return buckets;

                const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
                const slotMs = (24 * 60 * 60 * 1000) / 7;

                if (range === 'today') {
                    data.forEach(item => {
                        if (item.created_at) {
                            const t = new Date(item.created_at).getTime();
                            const idx = Math.floor((t - startOfDay) / slotMs);
                            if (idx >= 0 && idx < 7) buckets[idx]++;
                        }
                    });
                } else if (range === 'week') {
                    for (let i = 0; i < 7; i++) {
                        const d = new Date(now.getTime() - (6 - i) * 24 * 60 * 60 * 1000);
                        const dateStr = d.toISOString().split('T')[0];
                        buckets[i] = data.filter(item => item.created_at && item.created_at.startsWith(dateStr)).length;
                    }
                } else if (range === 'month') {
                    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
                    const interval = daysInMonth / 7;
                    data.forEach(item => {
                        if (item.created_at) {
                            const d = new Date(item.created_at);
                            if (d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()) {
                                const day = d.getDate();
                                const idx = Math.min(Math.floor((day - 1) / interval), 6);
                                if (idx >= 0 && idx < 7) buckets[idx]++;
                            }
                        }
                    });
                } else {
                    const timestamps = data.map(item => new Date(item.created_at || Date.now()).getTime()).filter(t => !isNaN(t));
                    if (timestamps.length > 0) {
                        const minT = Math.min(...timestamps);
                        const maxT = Math.max(...timestamps, now.getTime());
                        const span = (maxT - minT) || 1;
                        data.forEach(item => {
                            if (item.created_at) {
                                const t = new Date(item.created_at).getTime();
                                const idx = Math.min(Math.floor(((t - minT) / span) * 7), 6);
                                if (idx >= 0 && idx < 7) buckets[idx]++;
                            }
                        });
                    }
                }
                return buckets;
            };

            // Helper for filtering by range
            const filterDataByRange = (data, range) => {
                if (range === 'today') {
                    return data.filter(item => item.created_at && item.created_at.startsWith(todayStr));
                } else if (range === 'week') {
                    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    return data.filter(item => item.created_at && new Date(item.created_at) >= weekAgo);
                } else if (range === 'month') {
                    return data.filter(item => item.created_at && item.created_at.startsWith(currentMonthStr));
                }
                return data; // range === 'range' or 'all'
            };

            const filteredTayanganData = filterDataByRange(analyticsData, tayanganRange);
            const filteredActiveData = filterDataByRange(analyticsData, activeRange);

            const tayanganTrend = getTrendBuckets(filteredTayanganData, tayanganRange);
            const activeTrend = getTrendBuckets(filteredActiveData, activeRange);

            // Pure Real View Calculations from Supabase
            const totalViews = analyticsData.length + totalProjectViews;
            const rangeViews = filteredTayanganData.length + (tayanganRange === 'range' || tayanganRange === 'all' ? totalProjectViews : 0);

            const dailyAnalytics = analyticsData.filter(item => item.created_at && item.created_at.startsWith(todayStr)).length;
            const dailyViews = dailyAnalytics;

            const monthlyAnalytics = analyticsData.filter(item => item.created_at && item.created_at.startsWith(currentMonthStr)).length;
            const monthlyViews = monthlyAnalytics;

            // Active Visitors (Unique Visitor IDs for selected active range)
            const uniqueVisitors = new Set(filteredActiveData.map(item => item.visitor_id)).size;
            const activeVisitors = uniqueVisitors;
            const desktopVisitors = Math.round(activeVisitors * 0.7);
            const mobileVisitors = activeVisitors - desktopVisitors;

            // Weekly Histogram (Mon-Sun)
            const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            const weeklyHistogram = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
            analyticsData.forEach(item => {
                if (item.created_at) {
                    const d = new Date(item.created_at);
                    let dayIdx = d.getDay() - 1;
                    if (dayIdx < 0) dayIdx = 6;
                    weeklyHistogram[daysOfWeek[dayIdx]]++;
                }
            });

            // Popular Projects (Top 3 by view_count)
            const sortedProjects = [...projectsData].sort((a, b) => (b.view_count || 0) - (a.view_count || 0));
            const popularProjects = sortedProjects.slice(0, 3);

            // Category Breakdown from Supabase projects
            const categoryCounts = {};
            projectsData.forEach(p => {
                const tag = p.tag || p.category || 'Digital Art';
                categoryCounts[tag] = (categoryCounts[tag] || 0) + 1;
            });

            const totalProjects = projectsData.length || 1;
            const categories = Object.keys(categoryCounts).map(tag => ({
                name: tag,
                count: categoryCounts[tag],
                percentage: Math.round((categoryCounts[tag] / totalProjects) * 100)
            }));

            // Pure Real Country Breakdown from Supabase site_analytics logs
            const countryCounts = {};
            analyticsData.forEach(item => {
                const c = item.country || 'Indonesia';
                countryCounts[c] = (countryCounts[c] || 0) + 1;
            });

            return {
                totalViews: rangeViews,
                allTimeViews: totalViews,
                dailyViews,
                monthlyViews,
                dailyMap,
                activeVisitors,
                desktopVisitors,
                mobileVisitors,
                tayanganTrend,
                activeTrend,
                weeklyHistogram,
                popularProjects,
                categories,
                countryBreakdown: countryCounts
            };
        } catch (err) {
            console.error('Error fetching analytics stats:', err);
            return this.getFallbackStats();
        }
    },

    getFallbackStats() {
        return {
            totalViews: 0,
            allTimeViews: 0,
            dailyViews: 0,
            monthlyViews: 0,
            activeVisitors: 0,
            desktopVisitors: 0,
            mobileVisitors: 0,
            tayanganTrend: [0, 0, 0, 0, 0, 0, 0],
            activeTrend: [0, 0, 0, 0, 0, 0, 0],
            weeklyHistogram: { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 },
            popularProjects: [],
            categories: [],
            countryBreakdown: {}
        };
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Analytics.trackPageView();
});
