import React, { useEffect, useRef, useState } from 'react';
import { COLOR_PRESETS } from '../data/samples';
import { ImageData } from '../types';
import {
  downloadCompositedImage,
  hexToRgb,
  isValidHex,
  RgbColor,
} from '../utils/imageProcessing';
import { BrandLogo } from './BrandLogo';

interface EditorWorkspaceProps {
  currentImage: ImageData;
  onNavigateHome: () => void;
  onChangeImage: () => void;
}

export const EditorWorkspace: React.FC<EditorWorkspaceProps> = ({
  currentImage,
  onNavigateHome,
  onChangeImage,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>('transparent');
  const [activeColorLabel, setActiveColorLabel] = useState<string>('Transparent');
  const [customHex, setCustomHex] = useState<string>('2563EB');
  const [rgbValues, setRgbValues] = useState<RgbColor>({ r: 37, g: 99, b: 235 });
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isComparing, setIsComparing] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const nativePickerRef = useRef<HTMLInputElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  // Update RGB breakdown when custom color or preset changes
  useEffect(() => {
    if (selectedColor !== 'transparent' && isValidHex(selectedColor)) {
      setRgbValues(hexToRgb(selectedColor));
      setCustomHex(selectedColor.replace('#', '').toUpperCase());
    } else {
      setRgbValues({ r: 255, g: 255, b: 255 });
    }
  }, [selectedColor]);

  // When currentImage changes, reset zoom
  useEffect(() => {
    setZoomLevel(100);
  }, [currentImage.id]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleSelectPreset = (value: string, name: string) => {
    setSelectedColor(value);
    setActiveColorLabel(name);
    if (value !== 'transparent') {
      const cleanHex = value.replace('#', '').toUpperCase();
      setCustomHex(cleanHex);
      setRgbValues(hexToRgb(value));
    }
  };

  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/[^0-9A-Fa-f]/g, '').slice(0, 6);
    setCustomHex(rawVal.toUpperCase());

    if (rawVal.length === 6) {
      const fullHex = `#${rawVal}`;
      setSelectedColor(fullHex);
      setActiveColorLabel(fullHex.toUpperCase());
      setRgbValues(hexToRgb(fullHex));
    }
  };

  const handleNativeColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fullHex = e.target.value.toUpperCase();
    setSelectedColor(fullHex);
    setActiveColorLabel(fullHex);
    setCustomHex(fullHex.replace('#', ''));
    setRgbValues(hexToRgb(fullHex));
  };

  const handleEyeDropper = async () => {
    if ('EyeDropper' in window) {
      try {
        // @ts-expect-error - EyeDropper API is standard in modern Chromium
        const eyeDropper = new window.EyeDropper();
        const result = await eyeDropper.open();
        if (result && result.sRGBHex) {
          const pickedHex = result.sRGBHex.toUpperCase();
          setSelectedColor(pickedHex);
          setActiveColorLabel(pickedHex);
          setCustomHex(pickedHex.replace('#', ''));
          setRgbValues(hexToRgb(pickedHex));
          showToast(`Sampled color ${pickedHex}`);
        }
      } catch {
        // User cancelled picker
      }
    } else {
      nativePickerRef.current?.click();
    }
  };

  const handleZoom = (delta: number) => {
    setZoomLevel(prev => Math.min(Math.max(prev + delta, 25), 300));
  };

  const handleReset = () => {
    setZoomLevel(100);
    setSelectedColor('transparent');
    setActiveColorLabel('Transparent');
    showToast('Canvas reset to transparent background (100% zoom)');
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleDownload = async (format: 'png' | 'jpg') => {
    try {
      setDownloading(true);
      await downloadCompositedImage({
        imageUrl: currentImage.cutoutUrl,
        backgroundColor: selectedColor,
        format,
        baseFilename: currentImage.name,
        colorName: activeColorLabel,
      });
      showToast(`Exported ${format.toUpperCase()} successfully!`);
    } catch (err: unknown) {
      console.error('Download error:', err);
      showToast('Export failed. Please check browser permissions and try again.');
    } finally {
      setDownloading(false);
    }
  };

  const isTransparent = selectedColor === 'transparent';

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F8FAFC] select-none min-h-screen">
      {/* 1. STUDIO DOCKED WORKSPACE HEADER */}
      <header className="h-16 w-full bg-white border-b border-[#E5E7EB] sticky top-0 z-30 px-4 sm:px-6 md:px-8 flex items-center justify-between shadow-xs">
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Brand Logo / Back Home */}
          <button
            type="button"
            onClick={onNavigateHome}
            title="Back to Homepage"
            aria-label="ColorCut Home"
            className="flex items-center space-x-2 text-left group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5] rounded-xl cursor-pointer"
          >
            <BrandLogo size={32} textSize="text-[18px]" />
          </button>

          <div className="h-5 w-px bg-[#E5E7EB] hidden sm:block" />

          {/* File info badge & removal status */}
          <div className="hidden sm:flex items-center space-x-2">
            <div className="flex items-center space-x-2 px-2.5 py-1 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-[#6B7280] font-mono text-[11px]">
              <span className="material-symbols-outlined text-[15px] text-[#4B5563]">image</span>
              <span className="text-[#111827] font-medium truncate max-w-[140px] md:max-w-[200px]">
                {currentImage.name}
              </span>
              <span className="text-[#9CA3AF]">•</span>
              <span>{currentImage.sizeStr}</span>
              <span className="text-[#9CA3AF]">•</span>
              <span>{currentImage.dimensionsStr}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              <span>Background Removed</span>
            </div>
          </div>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Reset Action */}
          <button
            type="button"
            onClick={handleReset}
            aria-label="Reset canvas zoom and color"
            className="px-2.5 sm:px-3 py-1.5 rounded-lg text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] text-[12px] sm:text-[13px] font-medium flex items-center gap-1 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[17px]">restart_alt</span>
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Change Image Button */}
          <button
            type="button"
            onClick={onChangeImage}
            aria-label="Change uploaded image"
            className="px-3 sm:px-3.5 py-1.5 rounded-xl border border-[#E5E7EB] bg-white text-[#111827] hover:bg-[#F9FAFB] hover:border-[#CBD5E1] text-[12px] sm:text-[13px] font-medium flex items-center gap-1.5 transition-all shadow-xs active:scale-95 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[17px] text-[#4F46E5]">
              add_photo_alternate
            </span>
            <span className="hidden sm:inline">Change Image</span>
            <span className="sm:hidden text-[11px]">Change</span>
          </button>
        </div>
      </header>

      {/* 2. TWO-COLUMN WORKSPACE CANVAS & SIDEBAR */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden relative">
        {/* LEFT COLUMN: Image Preview Canvas Viewport */}
        <section
          aria-label="Image Preview Area"
          className="flex flex-col bg-[#F8FAFC] relative border-b lg:border-b-0 lg:border-r border-[#E5E7EB] shrink-0 lg:flex-1 h-[400px] sm:h-[480px] lg:h-auto"
        >
          {/* Top Viewport Control Bar */}
          <div className="h-11 sm:h-12 px-3 sm:px-6 flex items-center justify-between border-b border-[#E5E7EB] bg-white/90 backdrop-blur-xs z-20 shrink-0">
            {/* Zoom toolbar */}
            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={() => handleZoom(-25)}
                disabled={zoomLevel <= 25}
                aria-label="Zoom out"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] disabled:opacity-40 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5] cursor-pointer"
                title="Zoom Out"
              >
                <span className="material-symbols-outlined text-[17px] sm:text-[18px]">zoom_out</span>
              </button>

              <span className="px-1.5 font-mono text-[11px] sm:text-[12px] text-[#4B5563] min-w-[46px] text-center font-medium">
                {zoomLevel}%
              </span>

              <button
                type="button"
                onClick={() => handleZoom(25)}
                disabled={zoomLevel >= 300}
                aria-label="Zoom in"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] disabled:opacity-40 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5] cursor-pointer"
                title="Zoom In"
              >
                <span className="material-symbols-outlined text-[17px] sm:text-[18px]">zoom_in</span>
              </button>

              <div className="h-4 w-px bg-[#E5E7EB] mx-1" />

              <button
                type="button"
                onClick={() => setZoomLevel(100)}
                aria-label="Fit to Screen"
                className="px-2 py-1 rounded-lg text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] text-[11px] font-medium flex items-center gap-1 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px] sm:text-[16px]">fit_screen</span>
                <span>Fit</span>
              </button>
            </div>

            {/* Canvas Badges & Fullscreen */}
            <div className="flex items-center space-x-2">
              <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F3F4F6] border border-[#E5E7EB] text-[#4B5563] text-[11px]">
                <span className="material-symbols-outlined text-[15px] text-[#4F46E5]">memory</span>
                <span>Sub-Pixel Alpha Cutout</span>
              </div>

              <button
                type="button"
                onClick={handleToggleFullscreen}
                aria-label="Toggle Fullscreen"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5] cursor-pointer"
                title="Toggle Fullscreen"
              >
                <span className="material-symbols-outlined text-[17px] sm:text-[18px]">fullscreen</span>
              </button>
            </div>
          </div>

          {/* Central Viewport Display Container */}
          <div
            ref={viewportRef}
            className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-auto bg-[#F1F5F9]/60"
          >
            {/* Framing Matte Board with subtle shadow */}
            <div
              style={{
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: 'center center',
              }}
              className="relative max-w-full max-h-[92%] w-auto h-auto rounded-xl shadow-md overflow-hidden transition-transform duration-200 border border-[#E2E8F0] bg-white"
            >
              {/* Background Composite Layer (Checkerboard or Solid Fill strictly BEHIND subject) */}
              <div
                style={{
                  backgroundColor: isTransparent ? 'transparent' : selectedColor,
                }}
                className={`absolute inset-0 transition-colors duration-200 ${
                  isTransparent ? 'checkerboard-pattern' : ''
                }`}
              />

              {/* Cutout Foreground Subject Image with genuine alpha channel */}
              <img
                src={currentImage.cutoutUrl}
                alt="Cutout Subject on Selected Background"
                referrerPolicy="no-referrer"
                className="relative z-10 block max-h-[320px] sm:max-h-[440px] lg:max-h-[540px] max-w-full w-auto object-contain pointer-events-none select-none"
              />

              {/* Original Image Layer for Compare Inspection (Visible when holding compare button) */}
              {isComparing && (
                <div className="absolute inset-0 z-20 animate-in fade-in duration-100">
                  <img
                    src={currentImage.originalUrl}
                    alt="Original Reference"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain bg-white"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#111827] px-2.5 py-1 rounded-md text-[11px] font-medium border border-[#E5E7EB] flex items-center gap-1.5 shadow-sm">
                    <span className="material-symbols-outlined text-[14px] text-[#4F46E5]">visibility</span>
                    <span>Original Reference</span>
                  </div>
                </div>
              )}

              {/* Subdued Viewport Grid Markers */}
              <div className="absolute top-2 left-2 z-20 pointer-events-none text-slate-400 font-mono text-[10px] opacity-75">
                x: 0, y: 0
              </div>
              <div className="absolute bottom-2 right-2 z-20 pointer-events-none text-slate-400 font-mono text-[10px] opacity-75">
                {currentImage.dimensionsStr} px
              </div>
            </div>

            {/* Floating Comparison Button (Press & Hold Interaction) */}
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center">
              <button
                type="button"
                onMouseDown={() => setIsComparing(true)}
                onMouseUp={() => setIsComparing(false)}
                onMouseLeave={() => setIsComparing(false)}
                onTouchStart={e => {
                  e.preventDefault();
                  setIsComparing(true);
                }}
                onTouchEnd={() => setIsComparing(false)}
                onTouchCancel={() => setIsComparing(false)}
                aria-label="Hold to compare with original photo"
                className={`px-4 py-2 rounded-full shadow-md backdrop-blur-md flex items-center gap-2 text-[12px] sm:text-[13px] font-medium transition-all select-none active:scale-95 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5] ${
                  isComparing
                    ? 'bg-[#4F46E5] text-white ring-2 ring-indigo-300'
                    : 'bg-white/95 hover:bg-white text-[#111827] border border-[#E5E7EB]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">compare</span>
                <span>Hold to Compare</span>
              </button>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: Editor Sidebar & Controls */}
        <aside
          aria-label="Background Color Controls"
          className="w-full lg:w-[380px] xl:w-[420px] bg-white flex flex-col justify-between overflow-y-visible lg:overflow-y-auto shrink-0 border-t lg:border-t-0"
        >
          <div className="p-4 sm:p-6 md:p-7 space-y-5 sm:space-y-6">
            {/* Section Title & Active Color Label */}
            <div>
              <div className="flex items-center justify-between">
                <h2 className="font-headline font-bold text-[17px] text-[#111827]">
                  Background Color
                </h2>
                <span
                  className="font-mono text-[12px] text-[#4F46E5] font-semibold px-2.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-100"
                  id="active-color-name"
                >
                  {activeColorLabel}
                </span>
              </div>
              <p className="text-[13px] text-[#6B7280] mt-1">
                Select a preset swatch or enter any custom solid HEX color
              </p>
            </div>

            {/* Preset Color Swatches Bento Grid (17 Colors) */}
            <div className="space-y-2.5">
              <label className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider block">
                Color Presets ({COLOR_PRESETS.length})
              </label>

              <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 gap-2 sm:gap-2.5">
                {COLOR_PRESETS.map(preset => {
                  const isActive =
                    preset.value === 'transparent'
                      ? isTransparent
                      : selectedColor.toUpperCase() === preset.value.toUpperCase();

                  return (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => handleSelectPreset(preset.value, preset.name)}
                      title={`${preset.name} (${preset.value})`}
                      aria-label={`Select ${preset.name} background color`}
                      className={`group relative h-11 rounded-xl p-0.5 flex items-center justify-center transition-all duration-150 active:scale-95 touch-manipulation focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5] cursor-pointer ${
                        isActive
                          ? 'border-2 border-[#4F46E5] ring-2 ring-indigo-200 shadow-xs'
                          : 'border border-[#E5E7EB] hover:border-[#CBD5E1]'
                      }`}
                    >
                      {preset.value === 'transparent' ? (
                        <span className="w-full h-full rounded-lg checkerboard-pattern-sm flex items-center justify-center relative overflow-hidden">
                          {isActive && (
                            <span className="material-symbols-outlined text-[#4F46E5] text-[20px] font-bold">
                              check
                            </span>
                          )}
                        </span>
                      ) : (
                        <span
                          style={{ backgroundColor: preset.value }}
                          className="w-full h-full rounded-lg swatch-inset-shadow flex items-center justify-center"
                        >
                          <span
                            className={`material-symbols-outlined text-[18px] transition-opacity ${
                              isActive
                                ? 'opacity-100 font-bold'
                                : 'opacity-0 group-hover:opacity-40'
                            } ${
                              ['#FFFFFF', '#F3F4F6', '#F5F5DC', '#FACC15', '#87CEEB'].includes(
                                preset.value
                              )
                                ? 'text-slate-800'
                                : 'text-white'
                            }`}
                          >
                            check
                          </span>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Color Picker Box */}
            <div className="space-y-2.5 pt-1">
              <label className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider block">
                Custom Color
              </label>

              <div className="p-3.5 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] space-y-3">
                <div className="flex items-center space-x-2.5 sm:space-x-3">
                  {/* Color Indicator & Native Picker Container */}
                  <div
                    onClick={() => nativePickerRef.current?.click()}
                    className="relative w-10 h-10 rounded-lg overflow-hidden border border-[#E5E7EB] shadow-xs shrink-0 cursor-pointer group focus-within:ring-2 focus-within:ring-[#4F46E5]"
                    title="Choose from color spectrum"
                  >
                    <input
                      ref={nativePickerRef}
                      type="color"
                      aria-label="Native color palette spectrum"
                      value={isTransparent ? '#2563EB' : selectedColor}
                      onChange={handleNativeColorChange}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                    />
                    <div
                      style={{
                        backgroundColor: isTransparent ? '#2563EB' : selectedColor,
                      }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined text-white/90 text-[18px] group-hover:scale-110 transition-transform">
                        colorize
                      </span>
                    </div>
                  </div>

                  {/* Hex Code Input with integrated hash */}
                  <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#9CA3AF] font-mono text-[13px]">
                      #
                    </div>
                    <input
                      type="text"
                      maxLength={6}
                      value={customHex}
                      onChange={handleHexInputChange}
                      placeholder="HEX"
                      aria-label="Hex color value input"
                      className="w-full pl-7 pr-3 py-2 font-mono text-[13px] text-[#111827] bg-white border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] transition-all uppercase"
                    />
                  </div>

                  {/* Eyedropper Utility Button */}
                  <button
                    type="button"
                    onClick={handleEyeDropper}
                    title="Sample screen color"
                    aria-label="Sample screen color with eyedropper"
                    className="w-10 h-10 rounded-lg border border-[#E5E7EB] bg-white hover:bg-[#F3F4F6] text-[#6B7280] hover:text-[#111827] flex items-center justify-center transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">colorize</span>
                  </button>
                </div>

                {/* RGB Channel Values Breakdown */}
                <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[11px] text-[#4B5563]">
                  <div className="flex items-center justify-between px-2.5 py-1 bg-white rounded border border-[#E5E7EB]">
                    <span className="text-[#9CA3AF] font-bold">R</span>
                    <span>{rgbValues.r}</span>
                  </div>
                  <div className="flex items-center justify-between px-2.5 py-1 bg-white rounded border border-[#E5E7EB]">
                    <span className="text-[#9CA3AF] font-bold">G</span>
                    <span>{rgbValues.g}</span>
                  </div>
                  <div className="flex items-center justify-between px-2.5 py-1 bg-white rounded border border-[#E5E7EB]">
                    <span className="text-[#9CA3AF] font-bold">B</span>
                    <span>{rgbValues.b}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Download Action Panel */}
          <div className="p-4 sm:p-5 lg:p-6 border-t border-[#E5E7EB] bg-white sticky bottom-0 z-20 space-y-2.5 shadow-lg lg:shadow-none">
            {/* Primary Download CTA: Transparent or Solid PNG */}
            <button
              type="button"
              disabled={downloading}
              onClick={() => handleDownload('png')}
              aria-label="Download PNG image"
              className="w-full py-3 px-4 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] active:bg-[#3730A3] text-white font-headline font-semibold text-[14px] sm:text-[15px] shadow-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5] cursor-pointer"
              id="download-png-btn"
            >
              <span className="material-symbols-outlined text-[20px]">download</span>
              <span>
                {isTransparent
                  ? 'Download PNG — Transparent'
                  : `Download PNG — ${activeColorLabel}`}
              </span>
            </button>

            {/* Secondary Download CTA: Solid JPG */}
            <button
              type="button"
              disabled={downloading}
              onClick={() => handleDownload('jpg')}
              aria-label="Download JPG image"
              className="w-full py-2.5 px-4 rounded-xl border border-[#E5E7EB] bg-white hover:bg-[#F9FAFB] text-[#111827] font-semibold text-[13px] flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5] cursor-pointer"
              id="download-jpg-btn"
            >
              <span className="material-symbols-outlined text-[18px] text-[#6B7280]">image</span>
              <span>
                {isTransparent
                  ? 'Download JPG — Solid White'
                  : `Download JPG — ${activeColorLabel}`}
              </span>
            </button>

            {/* Quality & License Subtext Note */}
            <div className="pt-1.5 flex items-center justify-center gap-1.5 text-[#6B7280] text-[12px] text-center">
              <span className="material-symbols-outlined text-[15px] text-[#10B981]">verified</span>
              <span>Full resolution • No watermark • 100% Free</span>
            </div>
          </div>
        </aside>
      </main>

      {/* Floating Download / Success Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#111827] text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-[13px] font-medium animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <span className="material-symbols-outlined text-[#10B981] text-[18px]">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
