/**
 * Projects CRUD Module (Full Supabase Integration)
 * Reads and writes directly to Supabase "projects" table.
 */

const Projects = {
    // Fetch all projects directly from Supabase
    async getAll() {
        if (!window.supabaseClient) {
            console.error('Supabase client is not initialized.');
            return [];
        }

        try {
            const { data, error } = await window.supabaseClient
                .from('projects')
                .select('*')
                .order('id', { ascending: false });

            if (error) {
                console.error('Error fetching projects from Supabase:', error);
                return [];
            }
            return data || [];
        } catch (e) {
            console.error('Exception fetching projects:', e);
            return [];
        }
    },

    // Fetch single project by ID directly from Supabase
    async getById(id) {
        if (!window.supabaseClient) return null;
        try {
            const { data, error } = await window.supabaseClient
                .from('projects')
                .select('*')
                .eq('id', parseInt(id))
                .maybeSingle();

            if (error) {
                console.error('Error fetching project by ID:', error);
                return null;
            }
            return data || null;
        } catch (e) {
            console.error('Exception fetching project by ID:', e);
            return null;
        }
    },

    // Fetch projects filtered by Admin name directly from Supabase
    async getByAdmin(adminName) {
        if (!window.supabaseClient) return [];
        try {
            const { data, error } = await window.supabaseClient
                .from('projects')
                .select('*')
                .ilike('admin', adminName)
                .order('id', { ascending: false });

            if (error) {
                console.error('Error fetching projects by admin:', error);
                return [];
            }
            return data || [];
        } catch (e) {
            console.error('Exception fetching projects by admin:', e);
            return [];
        }
    },

    // Create new project directly in Supabase
    async create(title, description, admin, date, tag, imagePath) {
        if (!window.supabaseClient) {
            return { success: false, message: 'Koneksi Supabase tidak tersedia' };
        }

        const newProject = {
            title,
            description,
            admin,
            date,
            tag: tag || 'Digital Art',
            category: tag || 'general',
            image: imagePath || null
        };

        try {
            const { data, error } = await window.supabaseClient
                .from('projects')
                .insert([newProject])
                .select();

            if (error) throw error;
            return { success: true, data };
        } catch (e) {
            console.error('Error creating project in Supabase:', e);
            return { success: false, message: e.message };
        }
    },

    // Update project directly in Supabase
    async update(id, title, description, admin, date, tag, imagePath) {
        if (!window.supabaseClient) {
            return { success: false, message: 'Koneksi Supabase tidak tersedia' };
        }

        const updatedData = {
            title,
            description,
            admin,
            date,
            tag: tag || 'Digital Art',
            category: tag || 'general'
        };
        if (imagePath) updatedData.image = imagePath;

        try {
            const { error } = await window.supabaseClient
                .from('projects')
                .update(updatedData)
                .eq('id', parseInt(id));

            if (error) throw error;
            return { success: true };
        } catch (e) {
            console.error('Error updating project in Supabase:', e);
            return { success: false, message: e.message };
        }
    },

    // Remove project directly from Supabase
    async remove(id) {
        if (!window.supabaseClient) {
            return { success: false, message: 'Koneksi Supabase tidak tersedia' };
        }

        try {
            const { error } = await window.supabaseClient
                .from('projects')
                .delete()
                .eq('id', parseInt(id));

            if (error) throw error;
            return { success: true };
        } catch (e) {
            console.error('Error deleting project from Supabase:', e);
            return { success: false, message: e.message };
        }
    }
};
