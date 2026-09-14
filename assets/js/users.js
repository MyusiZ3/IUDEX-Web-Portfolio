/**
 * User & Access Management Module (Full Supabase Integration)
 * Reads and writes directly to Supabase "user" table.
 */

const UserManagement = {
    usersList: [],
    currentPage: 1,
    ITEMS_PER_PAGE: 10,

    async init() {
        await this.loadUsers();
    },

    async loadUsers() {
        const tableBody = document.getElementById('userTableBody') || document.getElementById('usersBody');
        if (!tableBody) return;

        if (!window.supabaseClient) {
            tableBody.innerHTML = `<tr><td colspan="5" class="text-center text-danger py-4">Koneksi Supabase tidak terhubung.</td></tr>`;
            return;
        }

        try {
            const { data, error } = await window.supabaseClient
                .from('user')
                .select('id, username, role, created_at')
                .order('id', { ascending: true });

            if (error) {
                console.error('Error fetching users from Supabase:', error);
                tableBody.innerHTML = `<tr><td colspan="5" class="text-center text-danger py-4">Gagal memuat pengguna: ${this.escapeHtml(error.message)}</td></tr>`;
                return;
            }

            this.usersList = data || [];
            this.currentPage = 1;
            this.renderUsers();
        } catch (err) {
            console.error('Exception loading users:', err);
            tableBody.innerHTML = `<tr><td colspan="5" class="text-center text-danger py-4">Terjadi kesalahan sistem saat memuat pengguna.</td></tr>`;
        }
    },

    renderUsers() {
        const tableBody = document.getElementById('userTableBody') || document.getElementById('usersBody');
        if (!tableBody) return;

        const users = this.usersList;
        if (!users || users.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center text-sub py-4">Belum ada user terdaftar di Supabase.</td>
                </tr>
            `;
            this.renderPagination(0, 0, 0, 1);
            return;
        }

        const totalItems = users.length;
        const totalPages = Math.ceil(totalItems / this.ITEMS_PER_PAGE) || 1;
        if (this.currentPage > totalPages) this.currentPage = totalPages;

        const startIndex = (this.currentPage - 1) * this.ITEMS_PER_PAGE;
        const pagedUsers = users.slice(startIndex, startIndex + this.ITEMS_PER_PAGE);

        const currentUser = Auth.getUser();

        tableBody.innerHTML = pagedUsers.map((u, index) => {
            const isSelf = currentUser && currentUser.username === u.username;
            const formattedDate = u.created_at ? new Date(u.created_at).toLocaleDateString('id-ID') : '-';
            const roleBadgeClass = u.role === 'superadmin' ? 'badge-fit-purple' : 'badge-fit-rose';

            return `
                <tr>
                    <td class="text-sub font-mono">#${u.id || index + 1}</td>
                    <td>
                        <strong class="text-main">${this.escapeHtml(u.username)}</strong>
                        ${isSelf ? ' <span class="badge-fit badge-fit-cyan ml-1">Anda</span>' : ''}
                    </td>
                    <td><span class="badge-fit ${roleBadgeClass}">${this.escapeHtml(u.role || 'admin')}</span></td>
                    <td class="text-sub font-mono small">${formattedDate}</td>
                    <td>
                        ${!isSelf ? `
                            <button class="btn-action-secondary py-1 px-2 text-danger" onclick="UserManagement.deleteUser(${u.id}, '${this.escapeHtml(u.username)}')">Hapus</button>
                        ` : '<span class="text-sub small">Utama</span>'}
                    </td>
                </tr>
            `;
        }).join('');

        this.renderPagination(totalItems, startIndex + 1, Math.min(startIndex + this.ITEMS_PER_PAGE, totalItems), totalPages);
    },

    renderPagination(totalItems, start, end, totalPages) {
        const container = document.getElementById('usersPaginationContainer');
        if (!container) return;

        if (totalItems === 0) {
            container.innerHTML = '';
            return;
        }

        let pageBtns = '';
        for (let i = 1; i <= totalPages; i++) {
            pageBtns += `<button class="btn-pagination ${i === this.currentPage ? 'active' : ''} ml-1" onclick="UserManagement.changePage(${i})">${i}</button>`;
        }

        container.innerHTML = `
            <div class="text-sub small">Menampilkan <strong>${start}-${end}</strong> dari <strong>${totalItems}</strong> user</div>
            <div class="d-flex align-items-center">
                <button class="btn-pagination mr-1" ${this.currentPage === 1 ? 'disabled' : ''} onclick="UserManagement.changePage(${this.currentPage - 1})">Sebelumnya</button>
                ${pageBtns}
                <button class="btn-pagination ml-1" ${this.currentPage === totalPages ? 'disabled' : ''} onclick="UserManagement.changePage(${this.currentPage + 1})">Selanjutnya</button>
            </div>
        `;
    },

    changePage(page) {
        this.currentPage = page;
        this.renderUsers();
    },

    async addUser() {
        const usernameInput = document.getElementById('addUsername');
        const passwordInput = document.getElementById('addPassword');
        const roleSelect = document.getElementById('addRole');

        const username = usernameInput.value.trim().toLowerCase();
        const password = passwordInput.value.trim();
        const role = roleSelect.value;

        if (!username || !password) {
            if (typeof showToast === 'function') {
                showToast('Username dan Password wajib diisi.', 'error');
            } else {
                alert('Username dan Password wajib diisi.');
            }
            return;
        }

        if (!window.supabaseClient) {
            if (typeof showToast === 'function') {
                showToast('Koneksi Supabase tidak tersedia', 'error');
            } else {
                alert('Koneksi Supabase tidak tersedia');
            }
            return;
        }

        try {
            const { error } = await window.supabaseClient
                .from('user')
                .insert([{ username, password, role }]);

            if (error) throw error;

            if (typeof showToast === 'function') {
                showToast(`User '${username}' berhasil ditambahkan ke Supabase!`);
            }
            $('#userModal').modal('hide');
            usernameInput.value = '';
            passwordInput.value = '';
            await this.loadUsers();
        } catch (err) {
            if (typeof showToast === 'function') {
                showToast('Gagal menambahkan user: ' + err.message, 'error');
            } else {
                alert('Gagal menambahkan user: ' + err.message);
            }
        }
    },

    deleteUser(id, username) {
        if (typeof showConfirm === 'function') {
            showConfirm('Hapus User', `Apakah Anda yakin ingin menghapus akun user '${username}' dari Supabase?`, 'Ya, Hapus', async () => {
                await this.performDeleteUser(id, username);
            });
        } else {
            if (confirm(`Apakah Anda yakin ingin menghapus akun user '${username}' dari Supabase?`)) {
                this.performDeleteUser(id, username);
            }
        }
    },

    async performDeleteUser(id, username) {
        if (!window.supabaseClient) return;
        try {
            const { error } = await window.supabaseClient
                .from('user')
                .delete()
                .eq('id', parseInt(id));

            if (error) throw error;

            if (typeof showToast === 'function') {
                showToast(`User '${username}' berhasil dihapus dari Supabase.`);
            }
            await this.loadUsers();
        } catch (err) {
            if (typeof showToast === 'function') {
                showToast('Gagal menghapus user: ' + err.message, 'error');
            } else {
                alert('Gagal menghapus user: ' + err.message);
            }
        }
    },

    escapeHtml(text) {
        return String(text || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    UserManagement.init();
});
