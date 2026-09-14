/**
 * CMS Admin Dual Mode Theme Switcher (Dark Pastel & Light Pastel)
 * Project: IUDEX Web Portfolio CMS
 */

const AdminTheme = {
    STORAGE_KEY: 'iudex_cms_theme',

    init() {
        const savedTheme = localStorage.getItem(this.STORAGE_KEY) || 'dark';
        this.applyTheme(savedTheme);
        this.renderToggleBtn();
    },

    applyTheme(theme) {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        localStorage.setItem(this.STORAGE_KEY, theme);
        this.updateToggleBtnUI(theme);
    },

    toggle() {
        const current = localStorage.getItem(this.STORAGE_KEY) || 'dark';
        const nextTheme = current === 'dark' ? 'light' : 'dark';
        this.applyTheme(nextTheme);
    },

    renderToggleBtn() {
        const topbarUl = document.querySelector('.topbar .navbar-nav');
        if (!topbarUl) return;

        // Check if button already exists
        if (document.getElementById('themeToggleBtnContainer')) return;

        const li = document.createElement('li');
        li.id = 'themeToggleBtnContainer';
        li.className = 'nav-item d-flex align-items-center mr-3';
        li.innerHTML = `
            <button class="theme-switch-btn" id="themeToggleBtn" onclick="AdminTheme.toggle()" title="Switch Light/Dark Theme">
                <i class="fas fa-moon" id="themeIcon"></i>
                <span id="themeText">Dark Pastel</span>
            </button>
        `;

        topbarUl.insertBefore(li, topbarUl.firstChild);
        const current = localStorage.getItem(this.STORAGE_KEY) || 'dark';
        this.updateToggleBtnUI(current);
    },

    updateToggleBtnUI(theme) {
        const icon = document.getElementById('themeIcon');
        const text = document.getElementById('themeText');
        if (!icon || !text) return;

        if (theme === 'light') {
            icon.className = 'fas fa-sun text-warning';
            text.textContent = 'Light Pastel';
        } else {
            icon.className = 'fas fa-moon text-pastel-lavender';
            text.textContent = 'Dark Pastel';
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    AdminTheme.init();
});
