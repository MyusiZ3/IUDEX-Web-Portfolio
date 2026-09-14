/**
 * Authentication & Role-Based Access Control (RBAC) Module
 * Supports 'superadmin' (Full System Access) and 'admin' (Individual Project Access).
 */

const Auth = {
    STORAGE_KEY: 'iudex_admin_user',

    // Check if current page requires authentication guard
    requireAuth() {
        const user = this.getCurrentUser();
        if (!user) {
            window.location.href = 'login.html';
        } else {
            // Update Topbar Username & Role Badge
            const userEl = document.getElementById('currentUsername');
            if (userEl) {
                const roleBadge = this.isSuperAdmin() ? ' ⭐ [Superadmin]' : ' [Admin]';
                userEl.textContent = `IUDEX ${user.username}${roleBadge}`;
            }

            // Toggle Superadmin specific UI elements
            if (this.isSuperAdmin()) {
                document.querySelectorAll('.superadmin-only').forEach(el => el.style.display = 'block');
            } else {
                document.querySelectorAll('.superadmin-only').forEach(el => el.style.display = 'none');
            }
        }
    },

    // Check if user is logged in
    getCurrentUser() {
        const userStr = localStorage.getItem(this.STORAGE_KEY);
        if (!userStr) return null;
        try {
            return JSON.parse(userStr);
        } catch (e) {
            return null;
        }
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

    // Authenticate user against Supabase "user" table or fallback default
    async login(username, password) {
        if (!username || !password) {
            return { success: false, message: 'Harap isi username dan password' };
        }

        try {
            if (window.supabaseClient) {
                const { data, error } = await window.supabaseClient
                    .from('user')
                    .select('*')
                    .eq('username', username)
                    .eq('password', password)
                    .maybeSingle();

                if (!error && data) {
                    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
                    return { success: true };
                }
            }
        } catch (err) {
            console.warn('Supabase fetch failed, checking local credentials:', err);
        }

        // Demo fallback accounts if Supabase credentials not configured yet
        const demoAccounts = {
            'imyusi': { password: '99qr', role: 'superadmin' },
            'aliya': { password: 'qwerty111', role: 'admin' },
            'bilqis': { password: 'qwerty123', role: 'admin' }
        };

        const acc = demoAccounts[username.toLowerCase()];
        if (acc && acc.password === password) {
            const user = { username: username, id: 1, role: acc.role };
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
            return { success: true };
        }

        return { success: false, message: 'Password or username incorrect' };
    },

    // Logout session
    logout() {
        localStorage.removeItem(this.STORAGE_KEY);
        window.location.href = 'login.html';
    }
};
