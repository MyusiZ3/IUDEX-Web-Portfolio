const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.SUPABASE_URL || 'https://spqjxekismwwlsesqomk.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwcWp4ZWtpc213d2xzZXNxb21rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0MTI3MDEsImV4cCI6MjEwNDk4ODcwMX0.LbjQ4u3GsgAc6tec06m3wqCC8AtJi_bLniMJCa20EnQ';

const configContent = `/**
 * Auto-generated Supabase Configuration
 * Build Time: ${new Date().toISOString()}
 */
window.SUPABASE_CONFIG = {
    URL: '${supabaseUrl}',
    ANON_KEY: '${supabaseKey}'
};
`;

const configPath = path.join(__dirname, '../assets/js/config.js');
fs.mkdirSync(path.dirname(configPath), { recursive: true });
fs.writeFileSync(configPath, configContent);
console.log('✅ Successfully generated assets/js/config.js for deployment.');
