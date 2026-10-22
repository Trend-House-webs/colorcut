---
name: ColorCut
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#464555'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#00505f'
  on-tertiary: '#ffffff'
  tertiary-container: '#006a7c'
  on-tertiary-container: '#93e8ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
  accent-indigo-light: '#6366F1'
  surface-canvas: '#F8FAFC'
  border-subtle: '#E2E8F0'
  border-hover: '#CBD5E1'
  transparency-light: '#FFFFFF'
  transparency-dark: '#E2E8F0'
  success-emerald: '#10B981'
  alert-rose: '#F43F5E'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xxs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
  space-2xl: 2rem
  space-3xl: 3rem
---

## Brand & Style

The design system establishes a high-precision, utilitarian aesthetic tailored for an AI-powered visual production tool. It blends the focused efficiency of developer-grade creative software (such as Linear) with the approachable, intuitive clarity expected in modern browser-based graphic utilities.

### Design Movement: Modern Precision SaaS
- **Visual Weight & White Space:** Extensive use of crisp, low-saturation neutral surfaces (`#F8FAFC` to `#FFFFFF`) creates negative space that directs full attention to uploaded visual assets.
- **Focal Accuracy:** Functional elements recede into subtle outlines and balanced contrast, surfacing vivid color only to indicate primary execution paths, automated processing, and selection states.
- **Utilitarian Polish:** Micro-interactions are snappy and understated. Transparency checkerboards, precision viewport crop markers, and subtle glassy badges ground the interface in digital craftsmanship.

## Colors

The palette balances clinical precision with an energetic, modern electric violet/indigo accent.

- **Primary (`#4F46E5` / `#6366F1`):** Represents AI engine actions, primary triggers (e.g., "Remove Background", "Download HD"), and active segment selections.
- **Secondary (`#0F172A`):** Deep charcoal ink for high-contrast, ultra-legible typography and focused structural anchors.
- **Tertiary (`#06B6D4`):** Cyan highlight reserved for real-time edge refinement, brush strokes, and auxiliary precision feedback.
- **Neutral (`#64748B`):** Cool slate for auxiliary labels, inactive icon states, and secondary metadata.

### System Rules
- **Canvas Transparency Checkerboard:** Construct 8px checkerboard viewports using alternating squares of `transparency-light` (`#FFFFFF`) and `transparency-dark` (`#E2E8F0`) to preview alpha transparency clearly without ocular fatigue.
- **Surface Elevation Hierarchy:** Canvas base uses `surface-canvas` (`#F8FAFC`), panels sit on clean white (`#FFFFFF`), and active tooltips or flyouts use deep `secondary` (`#0F172A`) for decisive contrast.

## Typography

Typography balances the geometric humanism of **Plus Jakarta Sans** for prominent headers with the mechanical legibility of **Inter** for dense controls, sidebars, and operational badges.

- **Numerics and Dimensions:** Image asset attributes (e.g., `4096 x 2160`, `3.2 MB`, `#FFFFFF`) must be rendered using `label-mono` to prevent horizontal jitter during interactive slider scrubbing or real-time color sampling.
- **Labels:** Use uppercase strictly in `label-sm` for system pill tags (e.g., `PNG`, `ALPHA`, `PRO`, `AUTO-DETECT`).

## Layout & Spacing

The system implements a fixed-width centered layout for marketing surfaces and a fluid 3-column docked layout for the processing studio:

1. **Studio Canvas Layout:**
   - **Left Tools / Presets Panel:** 320px fixed width desktop; converts to a sliding bottom sheet on mobile.
   - **Central Viewport:** Fluid flex-1 container surrounded by dynamic `gutter-desktop` safe areas for zooming and pan headroom.
   - **Inspector / Color Swatches Bar:** Docked horizontally beneath the asset or in a 280px right-hand inspector.
2. **Spacing Grid:** Built strictly upon an 8pt base grid with a 4pt sub-grid for fine-grained toolbar icon spacing (`space-xs`, `space-sm`).
3. **Responsive Breakpoints:**
   - **Mobile (< 768px):** Single-column stacked layout; tools stack below canvas viewport; margin is `1rem`.
   - **Tablet (768px - 1024px):** 2-column view; compact tools drawer; margin is `2rem`.
   - **Desktop (> 1024px):** 3-panel split layout; canvas gets permanent dominance; margin is `3rem`.

## Elevation & Depth

Visual hierarchy uses ultra-soft ambient diffuse shadows combined with hairline borders (`#E2E8F0`). This produces a clean, non-obtrusive workspace where depth never competes with image color inspection.

- **Level 0 (Canvas Base):** Flat `#F8FAFC` background with no shadow.
- **Level 1 (Tool Cards & Swatch Panels):** `#FFFFFF` surface with `border: 1px solid #E2E8F0` and `box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04), 0 1px 2px rgba(15, 23, 42, 0.02)`.
- **Level 2 (Floating Toolbar & Before/After Slider Handle):** `box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)`.
- **Level 3 (Image Export Dialogs & Modals):** `box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`.
- **Focus Rings:** High-visibility double-layer ring: `box-shadow: 0 0 0 2px #FFFFFF, 0 0 0 4px #4F46E5`.

## Shapes

The interface balances soft friendliness with structured utility using systematic rounding tiers:

- **Workstation & Image Cards (`rounded-2xl`):** `1rem` (16px) radius to frame uploaded photos gracefully.
- **Buttons, Popovers, & Dropzones (`rounded-xl`):** `0.75rem` (12px) radius for accessible, tactile interaction targets.
- **Inputs, Chips, & Palette Swatches (`rounded-lg`):** `0.5rem` (8px) radius for compact inline components.
- **Color Preset Dots & Precision Toggles:** 9999px (circular / full pill) to communicate color-dot purity and status.

## Components

### Buttons
- **Primary Execution Button:** Solid `#4F46E5` fill with pure white label, `rounded-xl`, vertical padding `10px`, horizontal padding `18px`. Hover shifts to `#4338CA` with an ambient glow (`box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25)`).
- **Secondary Neutral Button:** Pure white background, `border: 1px solid #E2E8F0`, deep charcoal text `#0F172A`. On hover, background shifts to `#F8FAFC` and border to `#CBD5E1`.
- **Icon / Tool Utility Button:** 36x36px square with `rounded-lg`, transparent background, `#64748B` icon fill. Transitions to `#F1F5F9` background and `#0F172A` icon fill on hover.

### Color Swatches & Preset Chips
- **Solid Color Preset Swatch:** 32x32px squircle (`rounded-lg`) with an internal inset border (`box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.1)`). Selected swatch gets an outer outline (`ring-2 ring-offset-2 ring-primary`).
- **Transparency Chip:** Displays a miniature 8px checkerboard pattern with a clear slashed red bar indicator for alpha/no-fill mode.

### Drag & Drop Upload Zone
- **Default State:** Dashed border (`2px dashed #CBD5E1`), background `#FFFFFF`, `rounded-2xl`, generous internal padding (`space-3xl`).
- **Drag-Over Active State:** Border shifts to solid `#4F46E5`, background tints to `rgba(79, 70, 229, 0.04)`.

### Before / After Split Comparison Slider
- **Divider Handle:** A vertical 2px line in `#FFFFFF` with a central 32px circular grip carrying dual opposing arrows. Features elevation Level 2 and an overlaid hairline drop shadow for contrast against both black and white image pixels.

### Form Inputs & Hex Samplers
- **Hex Input Field:** Height 36px, `rounded-lg`, border `#E2E8F0`, typography `label-mono`. Features an integrated color indicator dot at the left inset.