/**
 * Image Optimizer Module
 * Converts uploaded images (PNG, JPG, JPEG, BMP) to lightweight WebP format on the client side
 * using HTML5 Canvas API before sending to Supabase / Storage.
 */

const ImageOptimizer = {
    /**
     * Convert an Image File object to WebP format
     * @param {File} file - Original file object from input element
     * @param {Object} options - Config options (maxWidth, maxHeight, quality)
     * @returns {Promise<{blob: Blob, dataUrl: string, originalSize: number, webpSize: number, compressionRatio: string, fileName: string}>}
     */
    async convertToWebP(file, options = {}) {
        const maxWidth = options.maxWidth || 1920;
        const maxHeight = options.maxHeight || 1080;
        const quality = options.quality !== undefined ? options.quality : 0.85;

        return new Promise((resolve, reject) => {
            if (!file || !file.type.startsWith('image/')) {
                reject(new Error('Selected file is not a valid image.'));
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    // Calculate target dimensions preserving aspect ratio
                    let width = img.width;
                    let height = img.height;

                    if (width > maxWidth) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    }
                    if (height > maxHeight) {
                        width = Math.round((width * maxHeight) / height);
                        height = maxHeight;
                    }

                    // Create offscreen canvas for rendering
                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    // Export canvas content as WebP
                    const dataUrl = canvas.toDataURL('image/webp', quality);

                    canvas.toBlob((blob) => {
                        if (!blob) {
                            reject(new Error('Failed to convert image to WebP format.'));
                            return;
                        }

                        const originalSize = file.size;
                        const webpSize = blob.size;
                        const savedBytes = Math.max(0, originalSize - webpSize);
                        const ratioPercent = originalSize > 0 
                            ? Math.round((savedBytes / originalSize) * 100) 
                            : 0;

                        const baseName = file.name.replace(/\.[^/.]+$/, "");
                        const webpFileName = `${baseName}_optimized.webp`;

                        resolve({
                            blob,
                            dataUrl,
                            originalSize,
                            webpSize,
                            compressionRatio: `${ratioPercent}%`,
                            originalSizeFormatted: this.formatBytes(originalSize),
                            webpSizeFormatted: this.formatBytes(webpSize),
                            fileName: webpFileName
                        });
                    }, 'image/webp', quality);
                };

                img.onerror = () => reject(new Error('Error loading image source.'));
                img.src = event.target.result;
            };

            reader.onerror = () => reject(new Error('Error reading image file.'));
            reader.readAsDataURL(file);
        });
    },

    /**
     * Format bytes into human readable string (KB / MB)
     */
    formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
};
