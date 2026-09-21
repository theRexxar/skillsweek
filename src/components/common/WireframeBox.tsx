import React from 'react';

interface WireframeBoxProps {
  label?: string;
  sublabel?: string;
  aspectRatio?: 'video' | 'square' | 'banner' | 'avatar' | 'auto';
  className?: string;
  dashed?: boolean;
  showCross?: boolean;
  children?: React.ReactNode;
}

export const WireframeBox: React.FC<WireframeBoxProps> = ({
  label = 'IMAGE PLACEHOLDER',
  sublabel,
  aspectRatio = 'auto',
  className = '',
  dashed = false,
  showCross = true,
  children,
}) => {
  const aspectClasses = {
    video: 'aspect-video',
    square: 'aspect-square',
    banner: 'aspect-[21/9]',
    avatar: 'aspect-square rounded-full',
    auto: '',
  }[aspectRatio];

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-neutral-100 text-neutral-500 select-none ${
        dashed ? 'border-2 border-dashed border-neutral-300' : 'border border-neutral-300'
      } ${aspectClasses} ${className}`}
    >
      {/* Wireframe diagonal cross lines */}
      {showCross && (
        <svg
          className="absolute inset-0 h-full w-full stroke-neutral-300 stroke-[1] pointer-events-none opacity-60"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="0" y1="0" x2="100%" y2="100%" />
          <line x1="100%" y1="0" x2="0" y2="100%" />
        </svg>
      )}

      {/* Content or label */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-3 text-center">
        {children ? (
          children
        ) : (
          <>
            <span className="font-mono text-[11px] font-semibold tracking-wider text-neutral-600 bg-neutral-200/90 px-2 py-0.5 rounded border border-neutral-300">
              [ {label} ]
            </span>
            {sublabel && (
              <span className="mt-1 font-mono text-[10px] text-neutral-500">
                {sublabel}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
};
