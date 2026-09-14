/**
 * Projects CRUD Module
 * Handles loading, adding, updating, and deleting project entries with Supabase or LocalStorage fallback.
 */

const Projects = {
    LOCAL_KEY: 'iudex_projects_data',

    // Sample fallback data when offline or before Supabase URL configured
    DEFAULT_PROJECTS: [
        {
            id: 1,
            title: 'Digital Art Showcase',
            description: 'Koleksi karya seni digital dan desain karakter.',
            admin: 'Sidik',
            date: '2024-01-15',
            image: '../uploads/sidik_porto/DA_galeri1.png'
        },
        {
            id: 2,
            title: 'Lettering & Character Art',
            description: 'Desain typography dan ilustrasi karakter.',
            admin: 'Aliya',
            date: '2024-01-10',
            image: '../uploads/aliya/aliyafoto.jpg'
        },
        {
            id: 3,
            title: 'Creative Layout & Radio',
            description: 'Desain tata letak responsif dan media visual.',
            admin: 'Bilqis',
            date: '2024-01-05',
            image: '../uploads/bilqis/beruang.jpg'
        }
    ],

    // Fetch all projects
    async getAll() {
        if (window.supabaseClient) {
            try {
                const { data, error } = await window.supabaseClient
                    .from('projects')
                    .select('*')
                    .order('id', { ascending: false });

                if (!error && data && data.length > 0) {
                    return data;
                }
            } catch (e) {
                console.warn('Supabase fetch error, fallback to local storage:', e);
            }
        }

        const local = localStorage.getItem(this.LOCAL_KEY);
        if (local) {
            return JSON.parse(local);
        }
        localStorage.setItem(this.LOCAL_KEY, JSON.stringify(this.DEFAULT_PROJECTS));
        return this.DEFAULT_PROJECTS;
    },

    // Fetch single project by ID
    async getById(id) {
        id = parseInt(id);
        const projects = await this.getAll();
        return projects.find(p => p.id === id) || null;
    },

    // Fetch projects filtered by Admin name
    async getByAdmin(adminName) {
        if (window.supabaseClient) {
            try {
                const { data, error } = await window.supabaseClient
                    .from('projects')
                    .select('*')
                    .ilike('admin', adminName)
                    .order('id', { ascending: false });

                if (!error && data) {
                    return data;
                }
            } catch (e) {
                console.warn('Supabase getByAdmin error:', e);
            }
        }

        const all = await this.getAll();
        return all.filter(p => p.admin.toLowerCase() === adminName.toLowerCase());
    },

    // Add new project
    async create(title, description, admin, date, imagePath) {
        const newProject = {
            title,
            description,
            admin,
            date,
            image: imagePath || '../assets/images/placeholder.jpg'
        };

        if (window.supabaseClient) {
            try {
                const { data, error } = await window.supabaseClient
                    .from('projects')
                    .insert([newProject])
                    .select();

                if (!error) return { success: true, data };
            } catch (e) {
                console.warn('Supabase insert failed:', e);
            }
        }

        const all = await this.getAll();
        newProject.id = Date.now();
        all.unshift(newProject);
        localStorage.setItem(this.LOCAL_KEY, JSON.stringify(all));
        return { success: true, data: newProject };
    },

    // Update project by ID
    async update(id, title, description, admin, date, imagePath) {
        id = parseInt(id);
        const updatedData = { title, description, admin, date };
        if (imagePath) updatedData.image = imagePath;

        if (window.supabaseClient) {
            try {
                const { data, error } = await window.supabaseClient
                    .from('projects')
                    .update(updatedData)
                    .eq('id', id);

                if (!error) return { success: true };
            } catch (e) {
                console.warn('Supabase update failed:', e);
            }
        }

        const all = await this.getAll();
        const index = all.findIndex(p => p.id === id);
        if (index !== -1) {
            all[index] = { ...all[index], ...updatedData };
            localStorage.setItem(this.LOCAL_KEY, JSON.stringify(all));
            return { success: true };
        }
        return { success: false, message: 'Project not found' };
    },

    // Delete project by ID
    async remove(id) {
        id = parseInt(id);
        if (window.supabaseClient) {
            try {
                const { error } = await window.supabaseClient
                    .from('projects')
                    .delete()
                    .eq('id', id);

                if (!error) return { success: true };
            } catch (e) {
                console.warn('Supabase delete failed:', e);
            }
        }

        let all = await this.getAll();
        all = all.filter(p => p.id !== id);
        localStorage.setItem(this.LOCAL_KEY, JSON.stringify(all));
        return { success: true };
    }
};
