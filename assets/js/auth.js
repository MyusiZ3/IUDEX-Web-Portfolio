/**
 * Authentication & Role-Based Access Control (RBAC) Module
 * Full Supabase Integration with 12-Hour Session Expiry
 */

const Auth = {
    STORAGE_KEY: 'iudex_admin_user',
    SESSION_DURATION: 12 * 60 * 60 * 1000, // 12 Hours in milliseconds

    // Check if current page requires authentication guard
    requireAuth() {
        const user = this.getCurrentUser();
        if (!user) {
            window.location.href = 'login.html';
        }
    },

    // Check if user is logged in & enforce 12-hour session timeout
    getCurrentUser() {
        const userStr = localStorage.getItem(this.STORAGE_KEY);
        if (!userStr) return null;
        try {
            const user = JSON.parse(userStr);
            if (!user || !user.logged_at) {
                // If old session without timestamp, assign current timestamp
                user.logged_at = Date.now();
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
            }

            // Enforce 12-hour timeout
            const now = Date.now();
            if (now - user.logged_at > this.SESSION_DURATION) {
                console.warn('Session expired (12 hours elapsed). Logging out...');
                this.logout();
                return null;
            }

            return user;
        } catch (e) {
            return null;
        }
    },

    getUser() {
        return this.getCurrentUser();
    },

    // Get remaining session duration in milliseconds
    getRemainingTime() {
        const userStr = localStorage.getItem(this.STORAGE_KEY);
        if (!userStr) return 0;
        try {
            const user = JSON.parse(userStr);
            if (!user || !user.logged_at) return 0;
            const remaining = (user.logged_at + this.SESSION_DURATION) - Date.now();
            return remaining > 0 ? remaining : 0;
        } catch (e) {
            return 0;
        }
    },

    // Start live countdown timer on target element ID
    startSessionTimer(elementId) {
        const updateTimer = () => {
            const el = document.getElementById(elementId);
            if (!el) return;
            const rem = this.getRemainingTime();
            if (rem <= 0) {
                el.textContent = 'Expired';
                this.logout();
                return;
            }
            const hours = Math.floor(rem / (1000 * 60 * 60));
            const minutes = Math.floor((rem % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((rem % (1000 * 60)) / 1000);

            const hStr = String(hours).padStart(2, '0');
            const mStr = String(minutes).padStart(2, '0');
            const sStr = String(seconds).padStart(2, '0');

            el.textContent = `${hStr}:${mStr}:${sStr}`;
        };

        updateTimer();
        setInterval(updateTimer, 1000);
    },

    // Check if logged-in user is Superadmin
    isSuperAdmin() {
        const user = this.getCurrentUser();
        return user && (user.role === 'superadmin' || user.username?.toLowerCase() === 'imyusi');
    },

    // Check if user can edit/delete specific project
    canEditProject(project) {
        if (this.isSuperAdmin()) return true;
        const user = this.getCurrentUser();
        if (!user || !project || !project.admin) return false;
        return project.admin.toLowerCase() === user.username.toLowerCase();
    },

    // Authenticate user directly against Supabase "user" table
    async login(username, password) {
        if (!username || !password) {
            return { success: false, message: 'Harap isi username dan password' };
        }

        if (!window.supabaseClient) {
            return { success: false, message: 'Koneksi ke Supabase belum dikonfigurasi' };
        }

        try {
            const { data, error } = await window.supabaseClient
                .from('user')
                .select('*')
                .eq('username', username)
                .eq('password', password)
                .maybeSingle();

            if (error) {
                console.error('Supabase authentication query error:', error);
                return { success: false, message: 'Gagal terhubung ke database Supabase: ' + error.message };
            }

            if (data) {
                data.logged_at = Date.now(); // Store login timestamp for 12h expiry check
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
                return { success: true };
            } else {
                return { success: false, message: 'Username atau password tidak sesuai.' };
            }
        } catch (err) {
            console.error('Supabase auth error:', err);
            return { success: false, message: 'Terjadi kesalahan sistem saat verifikasi data.' };
        }
    },

    // Logout session
    logout() {
        localStorage.removeItem(this.STORAGE_KEY);
        window.location.href = 'login.html';
    }
};
