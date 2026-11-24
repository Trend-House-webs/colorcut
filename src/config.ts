/**
 * CutColor Application & SEO Configuration
 * Single source of truth for production origin, branding, contact configuration, and tool constraints.
 */

export const SITE_ORIGIN = 'https://cutcolor.vercel.app';
export const SITE_NAME = 'CutColor';

export const CONFIG = {
  // Single source of truth for canonical domain and brand identity
  SITE_NAME,
  SITE_ORIGIN,
  SITE_URL: `${SITE_ORIGIN}/`,
  OG_IMAGE_URL: `${SITE_ORIGIN}/assets/aistudio/ChatGPT_Image_Oct_20__2026__02_43_40_PM_30899a20.png`,

  /**
   * OWNER CONFIGURATION POINT — Contact Details:
   * Set CONTACT_EMAIL to a real support email address (e.g., "support@yourdomain.com")
   * when available. Leave empty ("") if no direct email inbox is active yet.
   */
  CONTACT_EMAIL: '',
  GITHUB_REPO_URL: 'https://github.com/Trend-House-webs/colorcut',

  // Maximum image upload size in megabytes
  MAX_UPLOAD_SIZE_MB: 10,
  get MAX_UPLOAD_SIZE_BYTES() {
    return this.MAX_UPLOAD_SIZE_MB * 1024 * 1024;
  },

  // Allowed MIME types
  ALLOWED_MIME_TYPES: ['image/jpeg', 'image/png', 'image/webp'] as const,

  // Allowed file extensions
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp'] as const,

  // Default JPEG export quality
  JPEG_EXPORT_QUALITY: 0.92,

  // Model settings
  MODEL_NAME: 'isnet_fp16' as const, // Client-side ONNX model with high precision
};
