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
    question: 'What is CutColor?',
    answer:
      'CutColor is a free, browser-based AI image background remover and solid background color changer. It isolates the foreground subject from JPG, PNG, and WebP photos locally in your browser using WebAssembly, allowing you to download a lossless transparent PNG or apply a solid background color.',
  },
  {
    question: 'How do I remove an image background online with CutColor?',
    answer:
      'Upload or drag and drop a JPG, PNG, or WebP image (up to 10 MB) onto the CutColor upload card. The client-side neural segmentation model (isnet_fp16) automatically detects the subject and removes the background in your browser memory, opening the interactive editor where you can download a transparent PNG or apply a solid background color.',
  },
  {
    question: 'Can I download a transparent PNG?',
    answer:
      'Yes. Keep the background option set to Transparent and click "Download PNG — Transparent" to export a full-resolution 32-bit RGBA PNG file with complete alpha transparency, ready for Canva, Figma, Photoshop, or web graphics.',
  },
  {
    question: 'Can I change the background to white?',
    answer:
      'Yes. After background removal, select the White (#FFFFFF) swatch from the preset palette to place a pure white background behind your product photo or portrait, then download the finished image as a solid-color JPG or PNG.',
  },
  {
    question: 'Can I select a custom background color?',
    answer:
      'Yes. In addition to 17 curated solid color presets (including White, Black, Light Gray, Navy, Blue, Green, Yellow, and Beige), you can use the custom HEX color input (#RRGGBB) or native color picker to preview and apply any solid background color.',
  },
  {
    question: 'Which image formats are supported?',
    answer:
      'CutColor supports standard JPG, JPEG, PNG, and WebP input files up to 10 MB. You can export your finished image at full original pixel dimensions as a 32-bit transparent/colored PNG or a 24-bit solid-color JPG.',
  },
  {
    question: 'Is an account required and is there a watermark?',
    answer:
      'No account, sign-up, or email registration is required, and no watermark is ever added. CutColor is 100% free to use with full-resolution downloads.',
  },
  {
    question: 'How are images processed and are my photos uploaded to a server?',
    answer:
      'All image decoding, neural network segmentation (via ONNX Runtime Web and WebAssembly), and HTML5 Canvas color compositing happen locally inside your browser memory. Your photos are not uploaded to or stored on a remote server. On your first run, your browser downloads and caches the static AI model weights (~20–40 MB) from a public CDN so subsequent edits run faster.',
  },
  {
    question: 'Does CutColor generate AI background scenes or replace backgrounds with uploaded images?',
    answer:
      'No. CutColor is built specifically for background removal, transparent PNG cutouts, and solid-color background replacement. It does not generate synthetic AI background scenes and does not replace backgrounds with custom uploaded backdrop photos.',
  },
  {
    question: 'Does CutColor support batch processing or passport compliance verification?',
    answer:
      'No. CutColor processes one image at a time so you can inspect edge quality and preview solid colors before exporting. While you can apply neutral solid background colors to portraits, CutColor does not automatically crop, resize, or certify compliance with official passport or government ID regulations.',
  },
];
