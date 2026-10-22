/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { EditorWorkspace } from './components/EditorWorkspace';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { ErrorModal, InfoModal, ProcessingModal } from './components/Modals';
import { LegalModal, LegalDocType } from './components/LegalPages';
import { ShowcaseSection } from './components/ShowcaseSection';
import { UseCasesSection, UseCaseType } from './components/UseCasesSection';
import { DEFAULT_EDITOR_IMAGE, NEUTRAL_ID_SAMPLE, SAMPLE_IMAGES } from './data/samples';
import { ImageData, ViewState } from './types';
import {
  ProgressCallbackData,
  removeImageBackgroundAI,
  validateUploadFile,
} from './utils/imageProcessing';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [currentImage, setCurrentImage] = useState<ImageData>(DEFAULT_EDITOR_IMAGE);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingTitle, setProcessingTitle] = useState<string>('Preparing background remover...');
  const [processingSubtitle, setProcessingSubtitle] = useState<string>(
    'Loading AI neural segmentation model in browser memory...'
  );
  const [processingPercent, setProcessingPercent] = useState<number | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoModal, setInfoModal] = useState<{
    isOpen: boolean;
    title: string;
    content: string;
  }>({
    isOpen: false,
    title: '',
    content: '',
  });
  const [legalModal, setLegalModal] = useState<{
    isOpen: boolean;
    docType: LegalDocType;
  }>({
    isOpen: false,
    docType: 'privacy',
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const customBlobUrlsRef = useRef<string[]>([]);

  // Cleanup object URLs on unmount
  React.useEffect(() => {
    return () => {
      customBlobUrlsRef.current.forEach(url => {
        try {
          URL.revokeObjectURL(url);
        } catch {
          // Ignore
        }
      });
    };
  }, []);

  const handleFileUpload = async (file: File) => {
    if (isProcessing) return; // Prevent duplicate concurrent requests

    // 1. Validate file (size, format, integrity)
    const validation = await validateUploadFile(file);
    if (!validation.valid) {
      setErrorMessage(validation.error || 'Invalid file uploaded.');
      return;
    }

    try {
      setErrorMessage(null);
      setIsProcessing(true);
      setProcessingTitle('Preparing background remover...');
      setProcessingSubtitle('Loading client-side AI model assets...');
      setProcessingPercent(undefined);

      const onProgress = (data: ProgressCallbackData) => {
        if (data.stage === 'preparing') {
          setProcessingTitle(data.message);
          setProcessingSubtitle('Downloading and caching neural model weights...');
        } else {
          setProcessingTitle(data.message);
          setProcessingSubtitle('Segmenting subject from background with alpha precision...');
        }
        setProcessingPercent(data.percent);
      };

      // 2. Run real AI background removal in the browser
      const result = await removeImageBackgroundAI(file, onProgress);

      // Clean up previous custom blob URLs to conserve browser memory
      if (currentImage.isCustomUpload) {
        if (currentImage.cutoutUrl?.startsWith('blob:')) {
          try {
            URL.revokeObjectURL(currentImage.cutoutUrl);
          } catch {}
        }
        if (currentImage.originalUrl?.startsWith('blob:')) {
          try {
            URL.revokeObjectURL(currentImage.originalUrl);
          } catch {}
        }
      }

      customBlobUrlsRef.current.push(result.cutoutUrl);
      if (result.originalUrl.startsWith('blob:')) {
        customBlobUrlsRef.current.push(result.originalUrl);
      }

      const newImageData: ImageData = {
        id: `upload-${Date.now()}`,
        name: file.name,
        sizeStr: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        dimensionsStr: `${result.width}×${result.height}`,
        cutoutUrl: result.cutoutUrl,
        originalUrl: result.originalUrl,
        isCustomUpload: true,
      };

      setCurrentImage(newImageData);
      setIsProcessing(false);
      setCurrentView('editor');
    } catch (err: unknown) {
      console.error('Error during background removal:', err);
      setIsProcessing(false);
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred during processing.';
      setErrorMessage(msg);
    }
  };

  /**
   * Loads a sample image file and passes it through the real background-removal pipeline.
   * If there is an external network delay fetching model weights, it gracefully opens the
   * verified sample cutout in the editor so the user is never left stuck.
   */
  const handleSelectSample = async (sample: ImageData) => {
    if (isProcessing) return;

    try {
      // Fetch the actual local sample image file
      const response = await fetch(sample.originalUrl);
      if (!response.ok) {
        throw new Error(`Failed to load sample image: ${response.statusText}`);
      }
      const blob = await response.blob();
      const file = new File([blob], sample.name, { type: blob.type || 'image/jpeg' });

      // Send through real background removal workflow
      await handleFileUpload(file);
    } catch (err: unknown) {
      console.warn('Sample background removal notice:', err);
      // Graceful fallback to verified sample cutout so user is never blocked
      setCurrentImage(sample);
      setCurrentView('editor');
      setIsProcessing(false);
    }
  };

  const handleSelectUseCase = (type: UseCaseType) => {
    switch (type) {
      case 'profile':
        handleSelectSample(SAMPLE_IMAGES[0]); // Male portrait headshot
        break;
      case 'ecommerce':
        handleSelectSample(SAMPLE_IMAGES[1]); // Product headphones
        break;
      case 'id':
        handleSelectSample(NEUTRAL_ID_SAMPLE); // Neutral ID portrait
        break;
      case 'social':
        handleSelectSample(SAMPLE_IMAGES[2]); // Casual male portrait
        break;
      default:
        handleSelectSample(SAMPLE_IMAGES[0]);
    }
  };

  const handleTriggerUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    fileInputRef.current?.click();
  };

  const handleOpenHelpModal = () => {
    setInfoModal({
      isOpen: true,
      title: 'How to use ColorCut',
      content:
        '1. Upload an image: Drag and drop any JPG, PNG, or WebP photo (up to 10 MB), or test with a sample photo.\n\n2. Automatic AI Segmentation: The browser-compatible AI model runs locally on your device to segment the background with sub-pixel alpha precision.\n\n3. Choose Solid Colors: Select from 17 curated color presets or enter any custom HEX value to preview instantly behind the subject.\n\n4. Real Export: Download full-resolution transparent PNG or solid-colored JPG with zero watermarks.',
    });
  };

  const handleOpenLegalModal = (docType: LegalDocType) => {
    setLegalModal({
      isOpen: true,
      docType,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111827]">
      {/* Hidden global input for file selection */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
        onChange={e => {
          if (e.target.files && e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
          }
        }}
      />

      {currentView === 'home' ? (
        <>
          <Header
            currentView={currentView}
            onNavigateHome={() => setCurrentView('home')}
            onTriggerUpload={handleTriggerUpload}
            onOpenHelpModal={handleOpenHelpModal}
          />

          <main className="flex-1">
            <HeroSection
              onSelectSample={handleSelectSample}
              onFileUpload={handleFileUpload}
              fileInputRef={fileInputRef}
            />

            <ShowcaseSection />

            <HowItWorksSection />

            <UseCasesSection
              onSelectUseCase={handleSelectUseCase}
              onSelectCategory={catId => {
                if (catId === 'profile' || catId === 'linkedin') handleSelectUseCase('profile');
                else if (catId === 'ecommerce') handleSelectUseCase('ecommerce');
                else if (catId === 'id' || catId === 'id-visa') handleSelectUseCase('id');
                else if (catId === 'social') handleSelectUseCase('social');
                else handleSelectUseCase('profile');
              }}
            />

            <FaqSection />

            {/* Mobile Bottom Floating Action Bar */}
            <div className="md:hidden sticky bottom-0 z-30 p-3 bg-white/95 backdrop-blur-md border-t border-[#E5E7EB] shadow-lg">
              <button
                type="button"
                onClick={handleTriggerUpload}
                className="w-full h-11 bg-[#4F46E5] hover:bg-[#4338CA] active:bg-[#3730A3] text-white font-semibold rounded-xl flex items-center justify-center gap-2 active:scale-95 shadow-md shadow-[#4F46E5]/20 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">upload</span>
                <span>Upload Image Now</span>
              </button>
            </div>
          </main>

          <Footer
            onOpenLegalModal={handleOpenLegalModal}
            onNavigateHome={() => setCurrentView('home')}
          />
        </>
      ) : (
        <EditorWorkspace
          currentImage={currentImage}
          onNavigateHome={() => setCurrentView('home')}
          onChangeImage={handleTriggerUpload}
        />
      )}

      {/* Global Processing State Modal */}
      <ProcessingModal
        isOpen={isProcessing}
        title={processingTitle}
        subtitle={processingSubtitle}
        percent={processingPercent}
        onCancel={() => setIsProcessing(false)}
      />

      {/* Global Error Modal */}
      <ErrorModal
        isOpen={!!errorMessage}
        title="Processing Error"
        errorMessage={errorMessage || ''}
        onDismiss={() => setErrorMessage(null)}
        onRetry={() => {
          setErrorMessage(null);
          handleTriggerUpload();
        }}
      />

      {/* Info / Guide Modal */}
      <InfoModal
        isOpen={infoModal.isOpen}
        title={infoModal.title}
        content={infoModal.content}
        onClose={() => setInfoModal(prev => ({ ...prev, isOpen: false }))}
      />

      {/* Comprehensive Legal Documentation Modal */}
      <LegalModal
        isOpen={legalModal.isOpen}
        initialDoc={legalModal.docType}
        onClose={() => setLegalModal(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
