/**
 * ColorCut Application Configuration
 */

export const CONFIG = {
  // Maximum image upload size in megabytes (adjustable as per PRD Section 4)
  MAX_UPLOAD_SIZE_MB: 10,
  get MAX_UPLOAD_SIZE_BYTES() {
    return this.MAX_UPLOAD_SIZE_MB * 1024 * 1024;
  },

  // Allowed MIME types
  ALLOWED_MIME_TYPES: ['image/jpeg', 'image/png', 'image/webp'] as const,

  // Allowed file extensions
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp'] as const,

  // Default JPEG export quality (PRD Section 7)
  JPEG_EXPORT_QUALITY: 0.92,

  // Model settings
  MODEL_NAME: 'isnet_fp16' as const, // Faster client-side inference with high precision
};
