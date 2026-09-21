import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Maximize2, 
  Eye, 
  Layers, 
  Compass, 
  RotateCcw,
  CheckCircle2,
  Tag
} from 'lucide-react';
import { FlowStep, ViewportMode, ViewMode } from '../../types';
import { FLOW_STEPS } from '../../data/courses';

interface FlowControllerProps {
  currentStep: FlowStep;
  onSelectStep: (step: FlowStep) => void;
  viewportMode: ViewportMode;
  onSelectViewport: (mode: ViewportMode) => void;
  viewMode: ViewMode;
  onToggleViewMode: () => void;
  showAnnotations: boolean;
  onToggleAnnotations: () => void;
  onResetFlow: () => void;
  bookingIssued: boolean;
  voucherRedeemed: boolean;
}

export const FlowController: React.FC<FlowControllerProps> = ({
  currentStep,
  onSelectStep,
  viewportMode,
  onSelectViewport,
  viewMode,
  onToggleViewMode,
  showAnnotations,
  onToggleAnnotations,
  onResetFlow,
  bookingIssued,
  voucherRedeemed,
}) => {
  const currentIndex = FLOW_STEPS.findIndex((s) => s.id === currentStep);
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < FLOW_STEPS.length - 1;

  const handlePrev = () => {
    if (canGoPrev) {
      onSelectStep(FLOW_STEPS[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      onSelectStep(FLOW_STEPS[currentIndex + 1].id);
    }
  };

  return (
    <div className="w-full bg-neutral-900 text-neutral-100 border-b border-neutral-800 shadow-md">
      {/* Top Banner: Wireframe Flow Meta & Controls */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        {/* Left: Project title & Specs */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 bg-neutral-800 text-neutral-200 px-2 py-0.5 border border-neutral-700 font-bold uppercase tracking-wider text-[11px]">
            <Compass className="w-3.5 h-3.5" />
            UX Flow Simulator
          </span>
          <span className="hidden sm:inline text-neutral-400 text-[11px]">
            Learning Journey: 6-Stage Wireframe
          </span>
          <span className="hidden md:inline bg-neutral-800/80 text-neutral-300 text-[10px] px-1.5 py-0.5 border border-neutral-700">
            Grayscale • Minimal
          </span>
        </div>

        {/* Right Tools: Viewport toggles, Annotations, Reset */}
        <div className="flex items-center gap-2">
          {/* View Mode Toggle: Interactive vs Storyboard */}
          <button
            id="btn-toggle-viewmode"
            onClick={onToggleViewMode}
            className={`flex items-center gap-1.5 px-2.5 py-1 border transition-colors ${
              viewMode === 'storyboard'
                ? 'bg-neutral-100 text-neutral-900 border-white font-bold'
                : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:border-neutral-500'
            }`}
            title="Switch between Step-by-Step Flow and Storyboard Overview"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {viewMode === 'storyboard' ? 'Exit Storyboard' : 'Storyboard All'}
            </span>
          </button>

          {/* Annotations Toggle */}
          <button
            id="btn-toggle-annotations"
            onClick={onToggleAnnotations}
            className={`flex items-center gap-1.5 px-2.5 py-1 border transition-colors ${
              showAnnotations
                ? 'bg-neutral-200 text-neutral-900 border-neutral-400 font-bold'
                : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-neutral-200'
            }`}
            title="Toggle UX notes, layout grid lines, and spacing measurements"
          >
            <Tag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">UX Specs:</span>
            <span>{showAnnotations ? 'ON' : 'OFF'}</span>
          </button>

          {/* Viewport Width Controls */}
          {viewMode === 'flow' && (
            <div className="hidden lg:flex items-center bg-neutral-800 border border-neutral-700 p-0.5 rounded-none">
              <button
                id="btn-viewport-responsive"
                onClick={() => onSelectViewport('responsive')}
                className={`p-1 px-1.5 text-[10px] flex items-center gap-1 ${
                  viewportMode === 'responsive'
                    ? 'bg-neutral-700 text-white font-bold'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
                title="Full Fluid Responsive"
              >
                <Maximize2 className="w-3 h-3" />
                <span>Full</span>
              </button>
              <button
                id="btn-viewport-desktop"
                onClick={() => onSelectViewport('desktop')}
                className={`p-1 px-1.5 text-[10px] flex items-center gap-1 ${
                  viewportMode === 'desktop'
                    ? 'bg-neutral-700 text-white font-bold'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
                title="Desktop (1200px container)"
              >
                <Monitor className="w-3 h-3" />
                <span>1200px</span>
              </button>
              <button
                id="btn-viewport-tablet"
                onClick={() => onSelectViewport('tablet')}
                className={`p-1 px-1.5 text-[10px] flex items-center gap-1 ${
                  viewportMode === 'tablet'
                    ? 'bg-neutral-700 text-white font-bold'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
                title="Tablet (768px container)"
              >
                <Tablet className="w-3 h-3" />
                <span>768px</span>
              </button>
              <button
                id="btn-viewport-mobile"
                onClick={() => onSelectViewport('mobile')}
                className={`p-1 px-1.5 text-[10px] flex items-center gap-1 ${
                  viewportMode === 'mobile'
                    ? 'bg-neutral-700 text-white font-bold'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
                title="Mobile (390px container)"
              >
                <Smartphone className="w-3 h-3" />
                <span>390px</span>
              </button>
            </div>
          )}

          {/* Reset Journey */}
          <button
            id="btn-reset-flow"
            onClick={onResetFlow}
            className="p-1 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 border border-neutral-700"
            title="Reset flow to beginning"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Step Stepper Navigation Bar */}
      <div className="bg-neutral-950 border-t border-neutral-800 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between min-w-[700px]">
          {/* Step buttons */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {FLOW_STEPS.map((step, idx) => {
              const isActive = currentStep === step.id;
              const isPast = idx < currentIndex;
              const hasFlag = 
                (step.id === 'book' && bookingIssued) || 
                (step.id === 'voucher' && voucherRedeemed);

              return (
                <button
                  key={step.id}
                  id={`step-pill-${step.id}`}
                  onClick={() => onSelectStep(step.id)}
                  className={`flex items-center gap-2 px-2.5 py-1.5 text-xs font-mono border transition-all text-left ${
                    isActive
                      ? 'bg-white text-neutral-950 border-white font-bold shadow-sm'
                      : isPast
                      ? 'bg-neutral-900 text-neutral-300 border-neutral-700 hover:border-neutral-500'
                      : 'bg-neutral-900/50 text-neutral-400 border-neutral-800 hover:border-neutral-600'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isActive
                        ? 'bg-neutral-950 text-white'
                        : isPast
                        ? 'bg-neutral-700 text-neutral-200'
                        : 'border border-neutral-600 text-neutral-400'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <div className="flex flex-col">
                    <span className="truncate leading-tight text-[11px]">{step.title}</span>
                    <span className="text-[9px] text-neutral-400 leading-none">
                      {step.originalLabel}
                    </span>
                  </div>
                  {hasFlag && (
                    <CheckCircle2 className="w-3 h-3 text-neutral-300 ml-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Prev / Next jump */}
          <div className="flex items-center gap-1.5 ml-4">
            <button
              id="btn-prev-step"
              onClick={handlePrev}
              disabled={!canGoPrev}
              className={`p-1.5 border flex items-center gap-1 text-xs font-mono ${
                canGoPrev
                  ? 'border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:border-neutral-500'
                  : 'border-neutral-800 text-neutral-600 cursor-not-allowed'
              }`}
              title="Previous Wireframe Step"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Prev</span>
            </button>
            <button
              id="btn-next-step"
              onClick={handleNext}
              disabled={!canGoNext}
              className={`p-1.5 px-2.5 border flex items-center gap-1 text-xs font-mono font-bold ${
                canGoNext
                  ? 'bg-neutral-200 text-neutral-950 border-white hover:bg-white'
                  : 'border-neutral-800 text-neutral-600 cursor-not-allowed'
              }`}
              title="Next Wireframe Step"
            >
              <span className="hidden md:inline">Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
