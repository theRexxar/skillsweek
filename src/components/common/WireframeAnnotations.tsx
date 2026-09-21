import React from 'react';
import { Info, LayoutGrid, Ruler, Layers } from 'lucide-react';
import { FlowStep } from '../../types';
import { FLOW_STEPS } from '../../data/courses';

interface WireframeAnnotationsProps {
  currentStep: FlowStep;
  isOpen: boolean;
  onClose: () => void;
}

export const WireframeAnnotations: React.FC<WireframeAnnotationsProps> = ({
  currentStep,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const stepMeta = FLOW_STEPS.find((s) => s.id === currentStep) || FLOW_STEPS[0];

  return (
    <div className="w-full bg-neutral-900 text-neutral-200 border-b-2 border-neutral-700 px-4 py-3 text-xs font-mono">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Wireframe ID and Specs */}
        <div className="flex items-start gap-3">
          <div className="p-1.5 bg-neutral-800 border border-neutral-600 text-neutral-300">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white uppercase tracking-wider bg-neutral-800 px-1.5 py-0.5 border border-neutral-600">
                {stepMeta.code}
              </span>
              <span className="font-bold text-neutral-100">{stepMeta.title}</span>
              <span className="text-neutral-400">({stepMeta.originalLabel})</span>
            </div>
            <p className="text-neutral-300 mt-1 text-[11px] leading-relaxed max-w-3xl">
              {stepMeta.description}
            </p>
          </div>
        </div>

        {/* Right: Layout & Spacing Specs */}
        <div className="flex flex-wrap items-center gap-4 bg-neutral-950 p-2.5 border border-neutral-800 text-[11px]">
          <div className="flex items-center gap-1.5 text-neutral-300">
            <LayoutGrid className="w-3.5 h-3.5 text-neutral-400" />
            <span>Grid: 12-col Desktop • 1-col Mobile</span>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-300">
            <Ruler className="w-3.5 h-3.5 text-neutral-400" />
            <span>Spacing: 8px baseline (p-4=16px, p-6=24px, p-8=32px)</span>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-300">
            <Layers className="w-3.5 h-3.5 text-neutral-400" />
            <span>Contrast: Grayscale WCAG AA Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
};
