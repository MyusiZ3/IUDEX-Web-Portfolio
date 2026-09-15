/**
 * Gallery Renderer Module
 * Dynamically fetches and renders portfolio items on gallery pages.
 */

function parseProjectImages(imageField) {
    if (!imageField) return [];
    if (Array.isArray(imageField)) return imageField.filter(Boolean);
    if (typeof imageField === 'string') {
        const trimmed = imageField.trim();
        if (trimmed.startsWith('[')) {
            try {
                const parsed = JSON.parse(trimmed);
                if (Array.isArray(parsed)) return parsed.filter(Boolean);
            } catch(e) {}
        }
        if (trimmed.includes(',')) {
            return trimmed.split(',').map(s => s.trim()).filter(Boolean);
        }
        if (trimmed) return [trimmed];
    }
    return [];
}

async function loadGallery(adminName) {
    const container = document.getElementById('galleryContainer');
    if (!container) return;

    container.innerHTML = '<p class="text-white">Loading gallery data...</p>';

    try {
        const items = await Projects.getByAdmin(adminName);

        if (!items || items.length === 0) {
            container.innerHTML = '<p class="text-white">No gallery items available.</p>';
            return;
        }

        let html = '';
        items.forEach(item => {
            const images = parseProjectImages(item.image);
            const imgPath = images.length > 0 ? images[0] : 'assets/images/placeholder.jpg';
            html += `
                <div class="service-one service wow">
                    <a href="${imgPath}" target="_blank">
                        <div class="services-img">
                            <img src="${imgPath}" alt="${escapeHtml(item.title || 'gallery-item')}" style="object-fit: cover;" onerror="this.onerror=null; this.src='assets/images/placeholder.jpg';">
                        </div>
                        <div class="services-description">
                            <h4>${escapeHtml(item.title || '')}</h4>
                            <p>${escapeHtml(item.description || '')}</p>
                        </div>
                    </a>
                </div>
            `;
        });

        container.innerHTML = html;
    } catch (err) {
        console.error('Error loading gallery:', err);
        container.innerHTML = '<p class="text-white">Failed to load gallery content.</p>';
    }
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}
