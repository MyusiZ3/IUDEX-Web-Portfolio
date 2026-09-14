/**
 * Supabase Client Initialization
 * Initializes Supabase Client SDK from @supabase/supabase-js CDN library
 */

(function () {
    if (typeof supabase === 'undefined') {
        console.error('Supabase SDK client not loaded. Make sure to include @supabase/supabase-js CDN.');
        return;
    }

    const { createClient } = supabase;
    const url = window.SUPABASE_CONFIG?.URL || '';
    const key = window.SUPABASE_CONFIG?.ANON_KEY || '';

    window.supabaseClient = createClient(url, key);
    console.log('Supabase client initialized.');
})();
