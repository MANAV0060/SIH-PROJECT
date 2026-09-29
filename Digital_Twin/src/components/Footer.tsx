import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 lg:left-64 right-0 h-10 bg-white/95 backdrop-blur-xl z-40 border-t border-[#e2e8f0] shadow-[0_-1px_6px_rgba(0,0,0,0.03)]">
      <div className="h-10 w-full px-4 lg:px-6 flex items-center justify-between text-[#434655] text-xs">
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="font-mono text-[10px] text-[#4d5f7c] uppercase font-bold shrink-0">
            Engine Bench:
          </span>
          <span className="font-mono text-[12px] text-[#0b1c30] truncate">
            Rotax 914/915 iSA · 4-Cyl Turbocharged Boxer · 141 HP
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="font-mono text-[10px] text-[#4d5f7c] uppercase font-semibold">
              PINN Calibrated:
            </span>
            <span className="font-mono text-[12px] text-[#10b981] font-bold">
              99.8% VERIFIED
            </span>
          </div>
          <div className="h-3 w-px bg-[#dce9ff] hidden sm:block"></div>
          <span className="font-mono text-[10px] text-[#4d5f7c]">
            AeroTwin Station v4.8.2-PROD
          </span>
        </div>
      </div>
    </footer>
  );
};
