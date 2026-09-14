/**
 * User & Access Management Module (Superadmin Privilege)
 * Project: IUDEX Web Portfolio CMS
 */

const UserManagement = {
    // Initial fallback data if Supabase keys are not set yet
    mockUsers: [
        { id: 1, username: 'superadmin', role: 'superadmin', created_at: new Date().toISOString() },
        { id: 2, username: 'imyusi', role: 'superadmin', created_at: new Date().toISOString() },
        { id: 3, username: 'aliya', role: 'admin', created_at: new Date().toISOString() },
        { id: 4, username: 'bilqis', role: 'admin', created_at: new Date().toISOString() }
    ],

    async init() {
        if (!Auth.isSuperAdmin()) {
            alert('Akses ditolak. Modul ini hanya untuk Superadmin.');
            window.location.href = 'index.html';
            return;
        }
        await this.loadUsers();
    },

    async loadUsers() {
        const tableBody = document.getElementById('userTableBody');
        if (!tableBody) return;

        tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center py-4">
                    <div class="spinner-border text-primary" role="status">
                        <span class="sr-only">Loading Users...</span>
                    </div>
                </td>
            </tr>
        `;

        let users = [];

        try {
            if (typeof supabaseClient !== 'undefined' && supabaseClient && SUPABASE_CONFIG.URL !== "YOUR_SUPABASE_URL") {
                const { data, error } = await supabaseClient
                    .from('user')
                    .select('id, username, role, created_at')
                    .order('id', { ascending: true });

                if (error) throw error;
                users = data || [];
            } else {
                users = this.getLocalUsers();
            }
        } catch (err) {
            console.warn('Gagal memuat pengguna dari Supabase, menggunakan data lokal:', err);
            users = this.getLocalUsers();
        }

        this.renderUsers(users);
    },

    getLocalUsers() {
        const saved = localStorage.getItem('iudex_users');
        if (saved) {
            try { return JSON.parse(saved); } catch (e) { }
        }
        localStorage.setItem('iudex_users', JSON.stringify(this.mockUsers));
        return this.mockUsers;
    },

    saveLocalUsers(users) {
        localStorage.setItem('iudex_users', JSON.stringify(users));
    },

    renderUsers(users) {
        const tableBody = document.getElementById('userTableBody');
        if (!tableBody) return;

        if (users.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center text-muted py-4">Belum ada pengguna terdaftar. Klik "Tambah User Baru" untuk membuat akun.</td>
                </tr>
            `;
            return;
        }

        const currentUser = Auth.getUser();

        tableBody.innerHTML = users.map((u, index) => {
            const isSelf = currentUser && currentUser.username === u.username;
            const badgeClass = u.role === 'superadmin' ? 'badge-danger' : 'badge-info';
            const formattedDate = u.created_at ? new Date(u.created_at).toLocaleDateString('id-ID') : '-';

            return `
                <tr>
                    <td>${u.id || index + 1}</td>
                    <td>
                        <strong>${this.escapeHtml(u.username)}</strong>
                        ${isSelf ? ' <span class="badge badge-secondary">(Anda)</span>' : ''}
                    </td>
                    <td><span class="badge ${badgeClass} p-2" style="font-size:12px;">${u.role || 'admin'}</span></td>
                    <td>${formattedDate}</td>
                    <td>
                        <button class="btn btn-sm btn-info mr-1" onclick="UserManagement.openEditModal(${u.id}, '${this.escapeHtml(u.username)}', '${u.role}')">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        ${!isSelf ? `
                            <button class="btn btn-sm btn-danger" onclick="UserManagement.deleteUser(${u.id}, '${this.escapeHtml(u.username)}')">
                                <i class="fas fa-trash"></i> Hapus
                            </button>
                        ` : '<button class="btn btn-sm btn-secondary" disabled>Utama</button>'}
                    </td>
                </tr>
            `;
        }).join('');
    },

    async addUser() {
        const usernameInput = document.getElementById('addUsername');
        const passwordInput = document.getElementById('addPassword');
        const roleSelect = document.getElementById('addRole');

        const username = usernameInput.value.trim().toLowerCase();
        const password = passwordInput.value.trim();
        const role = roleSelect.value;

        if (!username || !password) {
            alert('Username dan Password wajib diisi.');
            return;
        }

        try {
            if (typeof supabaseClient !== 'undefined' && supabaseClient && SUPABASE_CONFIG.URL !== "YOUR_SUPABASE_URL") {
                const { error } = await supabaseClient
                    .from('user')
                    .insert([{ username, password, role }]);

                if (error) throw error;
            } else {
                const users = this.getLocalUsers();
                if (users.some(u => u.username === username)) {
                    alert('Username sudah digunakan.');
                    return;
                }
                const newUser = {
                    id: Date.now(),
                    username,
                    password,
                    role,
                    created_at: new Date().toISOString()
                };
                users.push(newUser);
                this.saveLocalUsers(users);
            }

            alert(`User '${username}' berhasil ditambahkan!`);
            $('#addUserModal').modal('hide');
            usernameInput.value = '';
            passwordInput.value = '';
            await this.loadUsers();
        } catch (err) {
            alert('Gagal menambahkan user: ' + err.message);
        }
    },

    openEditModal(id, username, role) {
        document.getElementById('editUserId').value = id;
        document.getElementById('editUsername').value = username;
        document.getElementById('editPassword').value = '';
        document.getElementById('editRole').value = role;
        $('#editUserModal').modal('show');
    },

    async updateUser() {
        const id = document.getElementById('editUserId').value;
        const username = document.getElementById('editUsername').value;
        const password = document.getElementById('editPassword').value.trim();
        const role = document.getElementById('editRole').value;

        try {
            const updatePayload = { role };
            if (password) {
                updatePayload.password = password;
            }

            if (typeof supabaseClient !== 'undefined' && supabaseClient && SUPABASE_CONFIG.URL !== "YOUR_SUPABASE_URL") {
                const { error } = await supabaseClient
                    .from('user')
                    .update(updatePayload)
                    .eq('id', id);

                if (error) throw error;
            } else {
                const users = this.getLocalUsers();
                const userIndex = users.findIndex(u => u.id == id);
                if (userIndex !== -1) {
                    users[userIndex].role = role;
                    if (password) users[userIndex].password = password;
                    this.saveLocalUsers(users);
                }
            }

            alert(`User '${username}' berhasil diperbarui!`);
            $('#editUserModal').modal('hide');
            await this.loadUsers();
        } catch (err) {
            alert('Gagal memperbarui user: ' + err.message);
        }
    },

    async deleteUser(id, username) {
        if (!confirm(`Apakah Anda yakin ingin menghapus akun user '${username}'?`)) {
            return;
        }

        try {
            if (typeof supabaseClient !== 'undefined' && supabaseClient && SUPABASE_CONFIG.URL !== "YOUR_SUPABASE_URL") {
                const { error } = await supabaseClient
                    .from('user')
                    .delete()
                    .eq('id', id);

                if (error) throw error;
            } else {
                let users = this.getLocalUsers();
                users = users.filter(u => u.id != id);
                this.saveLocalUsers(users);
            }

            alert(`User '${username}' berhasil dihapus.`);
            await this.loadUsers();
        } catch (err) {
            alert('Gagal menghapus user: ' + err.message);
        }
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    UserManagement.init();
});
