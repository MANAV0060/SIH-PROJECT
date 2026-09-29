import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ActiveScreen } from '../types';

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  activeScreen?: ActiveScreen;
  onSelectScreen?: (screen: ActiveScreen) => void;
}

export const Header: React.FC<HeaderProps> = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  activeScreen,
  onSelectScreen,
}) => {
  const [seconds, setSeconds] = useState(19);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => (prev > 0 ? prev - 1 : 59));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 h-20 bg-white/95 backdrop-blur-xl z-40 border-b border-[#e2e8f0] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 w-full px-4 lg:px-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#4d5f7c] hover:bg-[#eff4ff] transition-colors"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#0f233d] text-base tracking-wider uppercase font-sans">
                UAV-MALE-704
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#ebf3ff] text-[#0037b0] text-[11px] font-bold tracking-wider uppercase">
                MQ-99 Sentinel Twin
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#4d5f7c] tracking-wide mt-0.5">
              Rotax 915 iSA / 914 Turbo (ECU Redundant B)
            </span>
          </div>

          <div className="h-8 w-px bg-[#dce9ff] hidden xl:block"></div>

          <div className="hidden xl:flex items-center gap-6">
            <div className="flex flex-col">
              <span className="font-mono text-[10px] text-[#4d5f7c] uppercase font-semibold">SORTIE STATUS</span>
              <span className="font-mono text-[12px] text-[#0b1c30] font-bold">Orbit Patrol FL195</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[10px] text-[#4d5f7c] uppercase font-semibold">REMAINING TTG</span>
              <span className="font-mono text-[12px] text-[#0b1c30] font-bold">
                06:42:{seconds < 10 ? `0${seconds}` : seconds}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[10px] text-[#4d5f7c] uppercase font-semibold">AMBIENT OAT</span>
              <span className="font-mono text-[12px] text-[#0b1c30] font-bold">-24°C</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[10px] text-[#4d5f7c] uppercase font-semibold">TOTAL RUNTIME</span>
              <span className="font-mono text-[12px] text-[#0b1c30] font-bold">842.6 HRS</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          {onSelectScreen && (
            <button
              onClick={() => onSelectScreen('digital-twin-3d')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[11px] font-bold transition-all shadow-sm ${
                activeScreen === 'digital-twin-3d'
                  ? 'bg-[#1b64da] text-white ring-2 ring-[#1b64da]/40'
                  : 'bg-[#eff4ff] text-[#0037b0] hover:bg-[#dce9ff] border border-[#dce9ff]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">view_in_ar</span>
              <span>3D Models</span>
            </button>
          )}

          <div className="hidden sm:flex items-center gap-2 bg-[#eafaf1] px-3 py-1 rounded-full border border-[#bbf7d0]/60">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
            <span className="text-[11px] font-bold text-[#004f35] font-sans uppercase tracking-wider">
              PINN Sync 2.14e-5
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 bg-[#eff4ff] px-2.5 py-1 rounded border border-[#dce9ff]">
            <span className="font-mono text-[10px] text-[#4d5f7c] font-semibold uppercase">STREAM</span>
            <span className="font-mono text-[12px] text-[#10b981] font-bold">98.7%</span>
          </div>

          <div className="w-8 h-8 rounded-full bg-[#0037b0] flex items-center justify-center text-white shadow-sm ring-2 ring-[#0037b0]/20">
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
};
