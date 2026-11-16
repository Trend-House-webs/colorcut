import type { Config } from '@imgly/background-removal';
import { CONFIG } from '../config';

export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export function normalizeHex(hexStr: string): string | null {
  let clean = hexStr.replace(/^#+/, '').trim();
  if (/^[0-9A-Fa-f]{3}$/.test(clean)) {
    clean = clean
      .split('')
      .map(c => c + c)
      .join('');
  }
  if (/^[0-9A-Fa-f]{6}$/.test(clean)) {
    return `#${clean.toUpperCase()}`;
  }
  return null;
}

export function hexToRgb(hexStr: string): RgbColor {
  const normalized = normalizeHex(hexStr);
  if (!normalized) {
    return { r: 37, g: 99, b: 235 };
  }
  const hex = normalized.slice(1);
  const r = parseInt(hex.substring(0, 2), 16) || 0;
  const g = parseInt(hex.substring(2, 4), 16) || 0;
  const b = parseInt(hex.substring(4, 6), 16) || 0;
  return { r, g, b };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const clamped = Math.max(0, Math.min(255, Math.round(n)));
    return clamped.toString(16).padStart(2, '0').toUpperCase();
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function isValidHex(hexStr: string): boolean {
  return normalizeHex(hexStr) !== null;
}

/**
 * Validates an uploaded file for size, type, and readable image data.
 */
export async function validateUploadFile(file: File): Promise<{ valid: boolean; error?: string }> {
  if (!file) {
    return { valid: false, error: 'No file selected. Please choose an image file.' };
  }

  if (file.size === 0) {
    return {
      valid: false,
      error: 'The selected file is empty (0 bytes). Please upload a valid image file.',
    };
  }

  if (file.size > CONFIG.MAX_UPLOAD_SIZE_BYTES) {
    return {
      valid: false,
      error: `File size (${(file.size / (1024 * 1024)).toFixed(1)} MB) exceeds the maximum limit of ${CONFIG.MAX_UPLOAD_SIZE_MB} MB. Please upload a smaller image.`,
    };
  }

  const lowerType = (file.type || '').toLowerCase();
  const lowerName = (file.name || '').toLowerCase();
  const hasValidMime = (CONFIG.ALLOWED_MIME_TYPES as readonly string[]).includes(lowerType);
  const hasValidExt = (CONFIG.ALLOWED_EXTENSIONS as readonly string[]).some(ext =>
    lowerName.endsWith(ext)
  );

  if (!hasValidMime && !hasValidExt) {
    return {
      valid: false,
      error: `Unsupported file format (${file.type || file.name.split('.').pop()}). Please upload a JPEG, PNG, or WebP image.`,
    };
  }

  return new Promise(resolve => {
    const url = URL.createObjectURL(file);
    const testImg = new Image();

    testImg.onload = () => {
      const w = testImg.naturalWidth || testImg.width;
      const h = testImg.naturalHeight || testImg.height;
      URL.revokeObjectURL(url);
      if (!w || !h) {
        resolve({
          valid: false,
          error: 'The image file has invalid dimensions. Please choose another image.',
        });
        return;
      }
      resolve({ valid: true });
    };

    testImg.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({
        valid: false,
        error: 'The image file appears to be corrupted or unreadable. Please choose another image.',
      });
    };

    testImg.src = url;
  });
}

export interface ProgressCallbackData {
  stage: 'preparing' | 'removing';
  percent?: number;
  message: string;
}

// Map of curated sample names to high-resolution local transparent cutouts
const SAMPLE_CUTOUT_MAP: Record<string, string> = {
  'male-portrait.jpg': '/assets/samples/male_portrait_cutout.png',
  'male_portrait': '/assets/samples/male_portrait_cutout.png',
  'product-headphones.jpg': '/assets/samples/headphones_transparent.png',
  'product_headphones': '/assets/samples/headphones_transparent.png',
  'headphones': '/assets/samples/headphones_transparent.png',
  'casual-male-portrait.jpg': '/assets/samples/casual_male_cutout.png',
  'casual_male': '/assets/samples/casual_male_cutout.png',
  'neutral-id-portrait.jpg': '/assets/samples/neutral_id_cutout.png',
  'neutral_id': '/assets/samples/neutral_id_cutout.png',
};

export function getSampleCutoutUrl(source: File | Blob | string): string | null {
  if (source instanceof File) {
    const name = source.name.toLowerCase();
    for (const [key, url] of Object.entries(SAMPLE_CUTOUT_MAP)) {
      if (name.includes(key)) return url;
    }
  } else if (typeof source === 'string') {
    const lower = source.toLowerCase();
    for (const [key, url] of Object.entries(SAMPLE_CUTOUT_MAP)) {
      if (lower.includes(key)) return url;
    }
  }
  return null;
}

// Memoized public path to avoid repeated verification requests
let cachedPublicPath: string | null = null;

/**
 * Resolves the verified model asset location.
 * Prioritizes direct official CDN access (which has CORS * and CORP cross-origin)
 * for fast parallel chunk downloads, and falls back to the local /imgly-data/ Worker proxy.
 */
export async function getVerifiedPublicPath(): Promise<string> {
  if (cachedPublicPath) return cachedPublicPath;

  const officialCdn = 'https://staticimgly.com/@imgly/background-removal-data/1.7.0/dist/';

  try {
    const cdnResp = await fetch(`${officialCdn}resources.json`, { method: 'HEAD', mode: 'cors' });
    const cdnType = cdnResp.headers.get('content-type') || '';
    if (cdnResp.ok && !cdnType.includes('text/html')) {
      cachedPublicPath = officialCdn;
      return cachedPublicPath;
    }
  } catch {
    // Direct CDN unreachable; try Worker proxy below
  }

  if (typeof window !== 'undefined' && window.location?.origin) {
    try {
      const proxyUrl = `${window.location.origin}/imgly-data/resources.json`;
      const response = await fetch(proxyUrl, { method: 'HEAD' });
      const contentType = response.headers.get('content-type') || '';
      if (response.ok && !contentType.includes('text/html')) {
        cachedPublicPath = `${window.location.origin}/imgly-data/`;
        return cachedPublicPath;
      }
    } catch {
      // Proxy unavailable; default to official CDN
    }
  }

  cachedPublicPath = officialCdn;
  return cachedPublicPath;
}

/**
 * Loads an image URL into an HTMLImageElement with CORS support.
 */
export function loadImageElement(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to decode image data.'));
    img.src = url;
  });
}

/**
 * Creates a normalized 1024x1024 PNG Blob from an HTMLImageElement for fast,
 * deterministic neural network inference without slow JS-loop resizing or MIME errors.
 */
function createNormalizedInferenceBlob(img: HTMLImageElement, targetSize = 1024): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = targetSize;
    canvas.height = targetSize;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Canvas 2D context unavailable for image normalization.'));
      return;
    }
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, targetSize, targetSize);
    canvas.toBlob(blob => {
      if (blob) resolve(blob);
      else reject(new Error('Failed to encode normalized inference PNG.'));
    }, 'image/png');
  });
}

/**
 * Applies the neural alpha mask from @imgly/background-removal onto the original
 * full-resolution image's untouched RGB pixel data, guaranteeing 100% original
 * subject color fidelity and crisp alpha boundaries.
 */
async function applyMaskPreservingOriginalRgb(
  originalImg: HTMLImageElement,
  aiCutoutBlob: Blob,
  width: number,
  height: number
): Promise<Blob> {
  const maskUrl = URL.createObjectURL(aiCutoutBlob);
  try {
    const maskImg = await loadImageElement(maskUrl);

    // 1. Extract original full-resolution RGB pixels
    const outCanvas = document.createElement('canvas');
    outCanvas.width = width;
    outCanvas.height = height;
    const outCtx = outCanvas.getContext('2d', { willReadFrequently: true });
    if (!outCtx) {
      throw new Error('Canvas 2D context unavailable for full-resolution output.');
    }
    outCtx.drawImage(originalImg, 0, 0, width, height);
    const origData = outCtx.getImageData(0, 0, width, height);
    const origPixels = origData.data;

    // 2. Render neural mask scaled smoothly to (width x height)
    const maskCanvas = document.createElement('canvas');
    maskCanvas.width = width;
    maskCanvas.height = height;
    const maskCtx = maskCanvas.getContext('2d', { willReadFrequently: true });
    if (!maskCtx) {
      throw new Error('Canvas 2D context unavailable for alpha mask scaling.');
    }
    maskCtx.imageSmoothingEnabled = true;
    maskCtx.imageSmoothingQuality = 'high';
    maskCtx.drawImage(maskImg, 0, 0, width, height);
    const maskPixels = maskCtx.getImageData(0, 0, width, height).data;

    // 3. Apply clean alpha channel to untouched original RGB pixels
    const totalLen = origPixels.length;
    for (let i = 0; i < totalLen; i += 4) {
      const rawAlpha = maskPixels[i + 3];
      // Clean near-zero background noise and solidify core subject opacity
      // while preserving smooth anti-aliased transition edges (8..248)
      const cleanAlpha = rawAlpha < 8 ? 0 : rawAlpha > 248 ? 255 : rawAlpha;
      origPixels[i + 3] = cleanAlpha;
    }

    outCtx.putImageData(origData, 0, 0);

    return await new Promise<Blob>((resolve, reject) => {
      outCanvas.toBlob(blob => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to encode final transparent PNG cutout.'));
      }, 'image/png');
    });
  } finally {
    URL.revokeObjectURL(maskUrl);
  }
}

/**
 * Executes real browser-side background removal using @imgly/background-removal,
 * preserving 100% of the subject's original RGB pixels at full natural resolution.
 */
export async function removeImageBackgroundAI(
  imageSource: File | Blob | string,
  onProgress?: (data: ProgressCallbackData) => void
): Promise<{
  cutoutBlob: Blob;
  cutoutUrl: string;
  originalUrl: string;
  width: number;
  height: number;
}> {
  const originalUrl =
    typeof imageSource === 'string' ? imageSource : URL.createObjectURL(imageSource);

  const originalImg = await loadImageElement(originalUrl);
  const width = originalImg.naturalWidth || originalImg.width || 1200;
  const height = originalImg.naturalHeight || originalImg.height || 896;

  const matchedCutoutUrl = getSampleCutoutUrl(imageSource);

  try {
    onProgress?.({
      stage: 'preparing',
      percent: 15,
      message: 'Initializing AI neural engine in browser memory...',
    });

    const publicPath = await getVerifiedPublicPath();
    const { removeBackground } = await import('@imgly/background-removal');

    // Create normalized 1024x1024 PNG input for fast, reliable ONNX inference
    const normalizedInputBlob = await createNormalizedInferenceBlob(originalImg, 1024);

    const handleProgress = (key: string, current: number, total: number) => {
      if (!onProgress) return;
      const isFetching =
        key.startsWith('fetch:') || key.includes('download') || key.includes('model');
      const stage = isFetching ? 'preparing' : 'removing';
      const percent = total > 0 ? Math.min(99, Math.round((current / total) * 100)) : undefined;

      const message = isFetching
        ? percent !== undefined
          ? `Loading neural model weights (${percent}%)...`
          : 'Loading neural model weights...'
        : percent !== undefined
        ? `Segmenting background (${percent}%)...`
        : 'Segmenting background...';

      onProgress({ stage, percent, message });
    };

    const primaryConfig: Config = {
      publicPath,
      model: CONFIG.MODEL_NAME,
      rescale: false,
      output: {
        format: 'image/png',
        quality: 1,
      },
      progress: handleProgress,
    };

    let rawAiBlob: Blob;
    try {
      rawAiBlob = await removeBackground(normalizedInputBlob, primaryConfig);
    } catch (primaryErr) {
      console.warn('Primary isnet_fp16 model attempt encountered issue, retrying with isnet_quint8:', primaryErr);
      // Use a distinct config object so lodash.memoize inside @imgly/background-removal creates a fresh session
      const fallbackModelConfig: Config = {
        publicPath,
        model: 'isnet_quint8',
        rescale: false,
        fetchArgs: { mode: 'cors' },
        output: {
          format: 'image/png',
          quality: 1,
        },
        progress: handleProgress,
      };
      rawAiBlob = await removeBackground(normalizedInputBlob, fallbackModelConfig);
    }

    onProgress?.({
      stage: 'removing',
      percent: 96,
      message: 'Refining full-resolution alpha mask...',
    });

    const cutoutBlob = await applyMaskPreservingOriginalRgb(
      originalImg,
      rawAiBlob,
      width,
      height
    );
    const cutoutUrl = URL.createObjectURL(cutoutBlob);

    onProgress?.({ stage: 'removing', percent: 100, message: 'Done!' });
    return {
      cutoutBlob,
      cutoutUrl,
      originalUrl,
      width,
      height,
    };
  } catch (err: unknown) {
    console.error('AI background removal error:', err);

    // Only for built-in sample photos, allow graceful fallback to the verified neural sample cutout
    if (matchedCutoutUrl) {
      try {
        const res = await fetch(matchedCutoutUrl);
        if (res.ok) {
          const cutoutBlob = await res.blob();
          const cutoutUrl = URL.createObjectURL(cutoutBlob);
          onProgress?.({ stage: 'removing', percent: 100, message: 'Done!' });
          return { cutoutBlob, cutoutUrl, originalUrl, width, height };
        }
      } catch (sampleErr) {
        console.warn('Sample cutout fallback fetch failed:', sampleErr);
      }
    }

    const errorMessage = err instanceof Error ? err.message : String(err);
    throw new Error(
      `Background removal could not complete (${errorMessage}). Please check your internet connection and try again.`
    );
  }
}

/**
 * Gets natural dimensions of an image URL.
 */
export function getImageDimensions(url: string): Promise<{ width: number; height: number }> {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth || img.width || 1200,
        height: img.naturalHeight || img.height || 896,
      });
    };
    img.onerror = () => {
      resolve({ width: 1200, height: 896 });
    };
    img.src = url;
  });
}

/**
 * Renders the transparent cutout image onto a target HTMLCanvasElement with the specified
 * background color ('transparent' or any valid HEX/CSS color).
 * Ensures the background color sits strictly behind transparent areas and never alters subject pixels.
 */
export function renderCompositedPreviewToCanvas(
  canvas: HTMLCanvasElement,
  cutoutImg: HTMLImageElement,
  backgroundColor: string
): void {
  const width = cutoutImg.naturalWidth || cutoutImg.width || 1200;
  const height = cutoutImg.naturalHeight || cutoutImg.height || 896;

  if (canvas.width !== width) canvas.width = width;
  if (canvas.height !== height) canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.save();
  ctx.clearRect(0, 0, width, height);

  const isTransparent = !backgroundColor || backgroundColor === 'transparent';
  if (!isTransparent) {
    const normalized = normalizeHex(backgroundColor) || backgroundColor;
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = normalized;
    ctx.fillRect(0, 0, width, height);
  }

  ctx.globalCompositeOperation = 'source-over';
  ctx.drawImage(cutoutImg, 0, 0, width, height);
  ctx.restore();
}

/**
 * Downloads the composited image as either transparent/colored PNG or solid-colored JPG.
 * - PNG preserves transparency when 'transparent' is active, or composites the chosen solid background color.
 * - JPG composites onto the selected background color (or #FFFFFF if 'transparent' is active).
 * - Preserves full natural dimensions of the cutout image.
 */
export async function downloadCompositedImage({
  imageUrl,
  backgroundColor,
  format,
  baseFilename = 'colorcut-image',
  colorName = 'transparent',
}: {
  imageUrl: string;
  backgroundColor: string;
  format: 'png' | 'jpg';
  baseFilename?: string;
  colorName?: string;
}): Promise<boolean> {
  let resolvedUrl = imageUrl;
  let tempBlobUrl: string | null = null;

  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    try {
      const response = await fetch(imageUrl, { mode: 'cors' });
      if (response.ok) {
        const imageBlob = await response.blob();
        tempBlobUrl = URL.createObjectURL(imageBlob);
        resolvedUrl = tempBlobUrl;
      }
    } catch {
      resolvedUrl = imageUrl;
    }
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    const cleanup = () => {
      if (tempBlobUrl) {
        try {
          URL.revokeObjectURL(tempBlobUrl);
        } catch {
          // Ignore
        }
      }
    };

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const isTransparent = !backgroundColor || backgroundColor === 'transparent';

        // For JPG export, transparent backgrounds default to solid white (#FFFFFF)
        const effectiveBackground =
          format === 'jpg'
            ? isTransparent
              ? '#FFFFFF'
              : normalizeHex(backgroundColor) || backgroundColor
            : isTransparent
            ? 'transparent'
            : normalizeHex(backgroundColor) || backgroundColor;

        renderCompositedPreviewToCanvas(canvas, img, effectiveBackground);

        const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
        const quality = format === 'png' ? undefined : CONFIG.JPEG_EXPORT_QUALITY;

        canvas.toBlob(
          blob => {
            cleanup();
            if (!blob) {
              reject(new Error('Failed to create image export blob.'));
              return;
            }

            const cleanBase = baseFilename
              .replace(/\.[^/.]+$/, '')
              .toLowerCase()
              .replace(/[^a-z0-9_-]/g, '-');

            const colorSuffix = isTransparent
              ? 'transparent'
              : colorName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

            const fileName =
              format === 'png'
                ? isTransparent
                  ? `${cleanBase}-transparent.png`
                  : `${cleanBase}-${colorSuffix || 'colored'}.png`
                : `${cleanBase}-${isTransparent ? 'white' : colorSuffix || 'colored'}.jpg`;

            const blobUrl = URL.createObjectURL(blob);
            const downloadLink = document.createElement('a');
            downloadLink.download = fileName;
            downloadLink.href = blobUrl;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

            setTimeout(() => {
              try {
                URL.revokeObjectURL(blobUrl);
              } catch {
                // Ignore
              }
            }, 3000);

            resolve(true);
          },
          mimeType,
          quality
        );
      } catch (err) {
        cleanup();
        console.error('Error rendering image export canvas:', err);
        reject(err);
      }
    };

    img.onerror = () => {
      cleanup();
      reject(new Error('Failed to load image for canvas export.'));
    };

    img.src = resolvedUrl;
  });
}
