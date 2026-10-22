import React from 'react';

interface ProcessingModalProps {
  isOpen: boolean;
  title?: string;
  subtitle?: string;
  percent?: number;
  onCancel?: () => void;
}

export const ProcessingModal: React.FC<ProcessingModalProps> = ({
  isOpen,
  title = 'Removing Background...',
  subtitle = 'Neural segmentation running locally in your browser. This may take a few moments.',
  percent,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="processing-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-md p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-[#E5E7EB] text-center space-y-5 transform scale-100 transition-all">
        {/* Animated Processing Loader Ring */}
        <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-indigo-100 border-t-[#4F46E5] animate-spin" />
          <span className="material-symbols-outlined text-[#4F46E5] text-[26px]">
            auto_awesome
          </span>
        </div>

        <div className="space-y-1.5">
          <h3
            id="processing-title"
            className="font-headline font-bold text-[20px] text-[#111827]"
          >
            {title}
          </h3>
          <p className="text-[14px] text-[#6B7280] leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Measurable or Indeterminate Progress Bar */}
        <div className="w-full bg-[#F3F4F6] h-2.5 rounded-full overflow-hidden">
          {percent !== undefined ? (
            <div
              style={{ width: `${Math.min(100, Math.max(5, percent))}%` }}
              className="bg-[#4F46E5] h-full rounded-full transition-all duration-300"
            />
          ) : (
            <div className="bg-[#4F46E5] h-full w-2/3 rounded-full animate-pulse transition-all duration-300" />
          )}
        </div>

        {percent !== undefined && (
          <div className="text-[12px] font-mono text-[#6B7280]">
            {percent}% completed
          </div>
        )}

        {onCancel && (
          <div className="pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2 rounded-xl border border-[#E5E7EB] text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] text-[13px] font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

interface ErrorModalProps {
  isOpen: boolean;
  title?: string;
  errorMessage?: string;
  onDismiss: () => void;
  onRetry: () => void;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  title = 'Processing Error',
  errorMessage = 'Unsupported image format or processing error occurred. Please try a different asset.',
  onDismiss,
  onRetry,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="error-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-md p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-rose-200 text-center space-y-5 transform scale-100 transition-all">
        <div className="w-14 h-14 rounded-full bg-rose-50 text-[#F43F5E] flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-[30px]">error_outline</span>
        </div>

        <div className="space-y-1.5">
          <h3
            id="error-title"
            className="font-headline font-bold text-[20px] text-[#111827]"
          >
            {title}
          </h3>
          <p className="text-[14px] text-[#6B7280] leading-relaxed text-left sm:text-center">
            {errorMessage}
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onDismiss}
            className="px-4 py-2 rounded-xl border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827] text-[13px] font-medium transition-colors cursor-pointer"
          >
            Dismiss
          </button>
          <button
            type="button"
            onClick={onRetry}
            className="px-5 py-2 rounded-xl bg-[#F43F5E] hover:bg-rose-600 text-white text-[13px] font-semibold transition-colors shadow-xs cursor-pointer"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

interface InfoModalProps {
  isOpen: boolean;
  title: string;
  content: string;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, title, content, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-lg p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-[#E5E7EB] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
          <h3
            id="info-modal-title"
            className="font-headline font-bold text-[18px] text-[#111827]"
          >
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[#6B7280] hover:bg-[#F3F4F6] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <p className="text-[14px] text-[#6B7280] leading-relaxed whitespace-pre-line">
          {content}
        </p>

        <div className="pt-3 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#4F46E5] text-white text-[13px] font-semibold hover:bg-[#4338CA] transition-colors cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
