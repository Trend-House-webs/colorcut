export interface ImageData {
  id: string;
  name: string;
  sizeStr: string;
  dimensionsStr: string;
  cutoutUrl: string;
  originalUrl: string;
  category?: string;
  description?: string;
  isCustomUpload?: boolean;
}

export interface ColorPreset {
  name: string;
  value: string; // hex or 'transparent'
  textHex?: string;
}

export type ViewState = 'home' | 'editor' | 'privacy' | 'terms' | 'about' | 'how-it-works';

export type ComparisonState = 'original' | 'cutout' | 'solid';
