import { CONFIG } from '../config';

/**
 * Validates an uploaded file for size, type, and basic integrity.
 * Lightweight utility separated from heavy image processing to avoid bundling
 * ML/canvas code into the initial homepage JavaScript payload.
 */
export async function validateUploadFile(file: File): Promise<{ valid: boolean; error?: string }> {
  if (!file) {
    return { valid: false, error: 'No file selected. Please choose an image file.' };
  }

  // Zero-byte check
  if (file.size === 0) {
    return {
      valid: false,
      error: 'The selected file is empty (0 bytes). Please upload a valid image file.',
    };
  }

  // Size limit check
  if (file.size > CONFIG.MAX_UPLOAD_SIZE_BYTES) {
    return {
      valid: false,
      error: `File size (${(file.size / (1024 * 1024)).toFixed(1)} MB) exceeds the maximum limit of ${CONFIG.MAX_UPLOAD_SIZE_MB} MB. Please upload a smaller image.`,
    };
  }

  // Format check
  const ext = '.' + file.name.split('.').pop()?.toLowerCase();
  const validExtensions = CONFIG.ALLOWED_EXTENSIONS as readonly string[];
  const validMimes = CONFIG.ALLOWED_MIME_TYPES as readonly string[];

  const isExtValid = validExtensions.includes(ext);
  const isMimeValid = validMimes.includes(file.type);

  if (!isExtValid && !isMimeValid) {
    return {
      valid: false,
      error: 'Unsupported file format. Please upload a valid image file (JPG, PNG, or WebP).',
    };
  }

  return { valid: true };
}
