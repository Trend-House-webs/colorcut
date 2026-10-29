import { ColorPreset, ImageData } from '../types';

export const DEFAULT_EDITOR_IMAGE: ImageData = {
  id: 'sample-product',
  name: 'product-headphones.jpg',
  sizeStr: '1.2 MB',
  dimensionsStr: '1200×896',
  cutoutUrl: '/assets/samples/headphones_transparent.png',
  originalUrl: '/assets/samples/headphones_original.jpg',
  category: 'Product',
  description: 'Studio product shot of premium wireless headphones.',
};

export const NEUTRAL_ID_SAMPLE: ImageData = {
  id: 'sample-id-portrait',
  name: 'neutral-id-portrait.jpg',
  sizeStr: '1.3 MB',
  dimensionsStr: '1200×896',
  cutoutUrl: '/assets/samples/neutral_id_cutout.png',
  originalUrl: '/assets/samples/neutral_id_portrait.jpg',
  category: 'ID and Document',
  description: 'Clean neutral portrait photo with centered framing for document purposes.',
};

export const SAMPLE_IMAGES: ImageData[] = [
  {
    id: 'sample-male-portrait',
    name: 'male-portrait.jpg',
    sizeStr: '1.4 MB',
    dimensionsStr: '1200×896',
    cutoutUrl: '/assets/samples/male_portrait_cutout.png',
    originalUrl: '/assets/samples/male_portrait_headshot.jpg',
    thumbnailUrl: '/assets/samples/male_portrait_thumb.jpg',
    category: 'Male Portrait',
    description: 'Professional executive male headshot for resumes and corporate profiles.',
  },
  {
    id: 'sample-product',
    name: 'product-headphones.jpg',
    sizeStr: '1.2 MB',
    dimensionsStr: '1200×896',
    cutoutUrl: '/assets/samples/headphones_transparent.png',
    originalUrl: '/assets/samples/headphones_original.jpg',
    thumbnailUrl: '/assets/samples/headphones_thumb.jpg',
    category: 'Product',
    description: 'Clean studio e-commerce photograph of wireless over-ear headphones.',
  },
  {
    id: 'sample-casual-male',
    name: 'casual-male-portrait.jpg',
    sizeStr: '1.8 MB',
    dimensionsStr: '1200×896',
    cutoutUrl: '/assets/samples/casual_male_cutout.png',
    originalUrl: '/assets/samples/casual_male_portrait.jpg',
    thumbnailUrl: '/assets/samples/casual_male_thumb.jpg',
    category: 'Casual Male Portrait',
    description: 'Modern casual male portrait suited for social media profiles and content creators.',
  },
];

export const COLOR_PRESETS: ColorPreset[] = [
  { name: 'Transparent', value: 'transparent' },
  { name: 'White', value: '#FFFFFF', textHex: 'FFFFFF' },
  { name: 'Black', value: '#000000', textHex: '000000' },
  { name: 'Light Gray', value: '#F3F4F6', textHex: 'F3F4F6' },
  { name: 'Gray', value: '#808080', textHex: '808080' },
  { name: 'Dark Gray', value: '#374151', textHex: '374151' },
  { name: 'Red', value: '#EF4444', textHex: 'EF4444' },
  { name: 'Blue', value: '#2563EB', textHex: '2563EB' },
  { name: 'Light Blue', value: '#87CEEB', textHex: '87CEEB' },
  { name: 'Navy', value: '#1E3A8A', textHex: '1E3A8A' },
  { name: 'Green', value: '#22C55E', textHex: '22C55E' },
  { name: 'Yellow', value: '#FACC15', textHex: 'FACC15' },
  { name: 'Orange', value: '#F97316', textHex: 'F97316' },
  { name: 'Pink', value: '#EC4899', textHex: 'EC4899' },
  { name: 'Purple', value: '#8B5CF6', textHex: '8B5CF6' },
  { name: 'Beige', value: '#F5F5DC', textHex: 'F5F5DC' },
  { name: 'Brown', value: '#8B5E3C', textHex: '8B5E3C' },
];

export const FAQ_ITEMS = [
  {
    question: 'How does ColorCut remove image backgrounds?',
    answer:
      'ColorCut uses an advanced client-side neural network segmentation model running directly in your web browser via WebAssembly (Wasm). The model evaluates edges and foreground subject features to generate a high-precision alpha matte without requiring server-side rendering.',
  },
  {
    question: 'Are my images uploaded to a server?',
    answer:
      'No. Your images are processed entirely on your local device inside your browser memory. Your photos never leave your computer or phone, and they are never stored on any remote server or database.',
  },
  {
    question: 'Which image formats are supported?',
    answer:
      'ColorCut supports standard JPG, JPEG, PNG, and modern WebP image formats. Files up to 10 MB in size are supported to ensure smooth and responsive in-browser performance.',
  },
  {
    question: 'Can I download a transparent PNG?',
    answer:
      'Yes. You can keep the background transparent and export full-resolution PNG files with complete alpha transparency, ready for use in Photoshop, Canva, Figma, or website designs.',
  },
  {
    question: 'Can I change the background to a solid color?',
    answer:
      'Yes. Once the background is removed, you can instantly choose from 17 curated solid color presets or use the custom HEX picker. The solid color is composited directly behind the transparent foreground subject without altering the subject.',
  },
  {
    question: 'Why does processing take longer on some devices?',
    answer:
      'Because all neural processing runs directly on your device rather than on a remote cloud GPU, performance depends on your device CPU and available RAM. Additionally, on your very first use, the browser downloads and caches the neural model weights (approx. 20-40 MB). Subsequent runs on the same device are significantly faster.',
  },
  {
    question: 'Is ColorCut free to use?',
    answer:
      'Yes. ColorCut is 100% free with no subscription tiers, paywalls, watermarks, or account registration requirements.',
  },
];
