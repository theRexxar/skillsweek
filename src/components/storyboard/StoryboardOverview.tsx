import React from 'react';
import { 
  ArrowRight, 
  Layers, 
  ExternalLink, 
  CheckCircle2, 
  UserCheck, 
  Search, 
  Ticket, 
  Mail, 
  GraduationCap 
} from 'lucide-react';
import { FlowStep } from '../../types';
import { FLOW_STEPS } from '../../data/courses';

interface StoryboardOverviewProps {
  currentStep: FlowStep;
  onSelectStep: (step: FlowStep) => void;
  bookingIssued: boolean;
  voucherRedeemed: boolean;
}

export const StoryboardOverview: React.FC<StoryboardOverviewProps> = ({
  currentStep,
  onSelectStep,
  bookingIssued,
  voucherRedeemed,
}) => {
  const stepIcons = {
    landing: Layers,
    login: UserCheck,
    search: Search,
    book: Ticket,
    voucher: Mail,
    learn: GraduationCap,
  };

  return (
    <div className="w-full bg-neutral-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Storyboard Header */}
        <div className="border-2 border-neutral-800 bg-white p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-neutral-900 text-white px-2 py-0.5 text-xs font-bold">
                  UX STORYBOARD MAP
                </span>
                <span className="text-xs text-neutral-500">6 Connected Stages</span>
              </div>
              <h2 className="text-2xl font-bold font-sans text-neutral-950 mt-1">
                End-to-End Learning Journey Flow
              </h2>
              <p className="text-xs font-mono text-neutral-600 mt-1">
                landing ➔ login ➔ search ➔ book / issued ➔ dapat kupon/voucher (email) ➔ ikut belajar
              </p>
            </div>

            <div className="bg-neutral-100 border border-neutral-300 p-3 text-xs space-y-1 text-neutral-700">
              <div className="font-bold text-neutral-900">Storyboard Guidelines:</div>
              <div>• Click any card to enter that stage's interactive wireframe</div>
              <div>• Grayscale hierarchy: high contrast boundaries, monospace metadata</div>
            </div>
          </div>
        </div>

        {/* 6 Stage Storyboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FLOW_STEPS.map((step, index) => {
            const IconComponent = stepIcons[step.id];
            const isCurrent = currentStep === step.id;

            return (
              <div
                key={step.id}
                onClick={() => onSelectStep(step.id)}
                className={`cursor-pointer border-2 bg-white transition-all transform hover:-translate-y-1 ${
                  isCurrent
                    ? 'border-neutral-950 ring-4 ring-neutral-400/50 shadow-lg'
                    : 'border-neutral-400 hover:border-neutral-800 shadow-sm'
                }`}
              >
                {/* Storyboard Card Header */}
                <div className="p-3 border-b-2 border-neutral-300 bg-neutral-100 flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 bg-neutral-900 text-white flex items-center justify-center font-bold text-[11px]">
                      {index + 1}
                    </span>
                    <span className="font-bold text-neutral-900">{step.code}</span>
                  </div>
                  <span className="text-[10px] text-neutral-500 uppercase">{step.originalLabel}</span>
                </div>

                {/* Wireframe Thumbnail Representation */}
                <div className="p-4 bg-neutral-50 border-b border-neutral-300">
                  <div className="h-32 border-2 border-dashed border-neutral-400 bg-white flex flex-col items-center justify-center p-3 text-center space-y-2 relative overflow-hidden">
                    {/* Diagonal wireframe cross */}
                    <svg
                      className="absolute inset-0 h-full w-full stroke-neutral-200 stroke-[1] pointer-events-none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line x1="0" y1="0" x2="100%" y2="100%" />
                      <line x1="100%" y1="0" x2="0" y2="100%" />
                    </svg>

                    <div className="relative z-10 w-8 h-8 rounded-full border border-neutral-600 bg-neutral-100 flex items-center justify-center text-neutral-800">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="relative z-10 font-mono text-xs font-bold text-neutral-900">
                      {step.title}
                    </div>
                    <div className="relative z-10 font-mono text-[9px] text-neutral-500">
                      [SCREEN_MOCK: {step.id.toUpperCase()}]
                    </div>
                  </div>
                </div>

                {/* Storyboard Card Description */}
                <div className="p-4 space-y-3 font-mono text-xs">
                  <div>
                    <h3 className="font-bold text-neutral-900 font-sans text-sm">{step.title}</h3>
                    <p className="text-neutral-600 text-[11px] font-sans mt-1 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-neutral-200 space-y-1 text-[10px]">
                    <div className="font-bold text-neutral-800 uppercase">UX Rationale:</div>
                    <div className="text-neutral-500 font-sans">{step.uxFocus}</div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[11px] font-bold text-neutral-900">
                    <span>{isCurrent ? '● Active Step' : 'Click to View Screen'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Storyboard Footer Notice */}
        <div className="border border-neutral-400 bg-white p-4 font-mono text-xs text-neutral-600 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>Learner Flow Specification: 100% Grayscale Wireframe • Responsive layout</span>
          <button
            onClick={() => onSelectStep('landing')}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold"
          >
            Start Interactive Flow at Step 1 →
          </button>
        </div>
      </div>
    </div>
  );
};
