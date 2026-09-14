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

    async trackPageView() {
        if (!window.supabaseClient) return;
        try {
            const path = window.location.pathname.split('/').pop() || 'home.html';
            const visitorId = this.getVisitorId();

            const { data, error } = await window.supabaseClient
                .from('site_analytics')
                .insert([{
                    page_path: path,
                    visitor_id: visitorId,
                    country: 'Indonesia',
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
            const { error } = await window.supabaseClient.rpc('increment_project_views', { p_id: projectId });
            if (error) {
                const { data } = await window.supabaseClient
                    .from('projects')
                    .select('view_count')
                    .eq('id', projectId)
                    .maybeSingle();
                if (data) {
                    await window.supabaseClient
                        .from('projects')
                        .update({ view_count: (data.view_count || 0) + 1 })
                        .eq('id', projectId);
                }
            }
        } catch (e) {
            console.warn('Project view track error:', e);
        }
    },

    async getStats() {
        if (!window.supabaseClient) {
            return {
                totalViews: 0,
                dailyViews: 0,
                avgDurationSeconds: 252,
                countryBreakdown: { Indonesia: 100 }
            };
        }
        try {
            const { data: analyticsData } = await window.supabaseClient
                .from('site_analytics')
                .select('*');

            const total = (analyticsData || []).length;
            const todayStr = new Date().toISOString().split('T')[0];
            const todayCount = (analyticsData || []).filter(item => item.created_at && item.created_at.startsWith(todayStr)).length;

            let totalDuration = 0;
            const countryCounts = {};

            (analyticsData || []).forEach(item => {
                totalDuration += (item.duration_seconds || 0);
                const c = item.country || 'Indonesia';
                countryCounts[c] = (countryCounts[c] || 0) + 1;
            });

            const avgDuration = total > 0 ? Math.round(totalDuration / total) : 252;

            return {
                totalViews: total,
                dailyViews: todayCount,
                avgDurationSeconds: avgDuration,
                countryBreakdown: countryCounts
            };
        } catch (err) {
            console.error('Error fetching analytics stats:', err);
            return {
                totalViews: 0,
                dailyViews: 0,
                avgDurationSeconds: 252,
                countryBreakdown: { Indonesia: 100 }
            };
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Analytics.trackPageView();
});
