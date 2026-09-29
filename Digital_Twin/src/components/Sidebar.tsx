import React from 'react';
import { ActiveScreen } from '../types';

interface SidebarProps {
  activeScreen: ActiveScreen;
  onSelectScreen: (screen: ActiveScreen) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

interface NavItem {
  id: ActiveScreen;
  label: string;
  icon: string;
  badge: string;
  badgeColor: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeScreen,
  onSelectScreen,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  const navItems: NavItem[] = [
    {
      id: 'landing-page',
      label: 'Studio Landing Page',
      icon: 'home',
      badge: 'HERO',
      badgeColor: 'bg-[#F26522] text-white',
    },
    {
      id: 'digital-twin-3d',
      label: '3D Models (UAV & Engine)',
      icon: 'view_in_ar',
      badge: '3D WEBGL',
      badgeColor: 'bg-[#1b64da] text-white',
    },
    {
      id: 'telemetry-cockpit',
      label: 'Telemetry Cockpit',
      icon: 'speed',
      badge: 'RT',
      badgeColor: 'bg-[#eafaf1] text-[#10b981]',
    },
    {
      id: 'predictive-prognostics',
      label: 'Prognostics',
      icon: 'troubleshoot',
      badge: 'WARN',
      badgeColor: 'bg-[#fffbeb] text-[#d97706]',
    },
    {
      id: 'mission-contingency',
      label: 'Contingency',
      icon: 'alt_route',
      badge: 'SIM',
      badgeColor: 'bg-[#e5eeff] text-[#4d5f7c]',
    },
    {
      id: 'cbm-and-logistics',
      label: 'CBM & Logistics',
      icon: 'fact_check',
      badge: 'FLEET',
      badgeColor: 'bg-[#e5eeff] text-[#4d5f7c]',
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-[#0b1c30]/40 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-white z-50 flex flex-col border-r border-[#e2e8f0] shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 px-4 flex items-center gap-3 bg-white border-b border-[#e2e8f0]/60">
          <img
            alt="AeroTwin Brand Logo"
            className="h-8 w-auto object-contain shrink-0"
            src="https://lh3.googleusercontent.com/aida/AEtjO1UXYcSfCOERNFgBPGor--3lweN3MvM4-WAZ1GQgURmzxE2NEgxJlRKew1MsVkt8XSdsIoPfTzxWssZiITIP_MsDkLtMJntBmAGXIeJalbGQbfacQGCfbIFT2QWLdBbwRhCez5Jm5RL0x_TXRYmqgdwm_K0gRdqniPeXc7UrYCzCTcvgBsHwoiW3EFmqe6wBnEdrSu5swfExHklp54rMCc4whQHbia5RdrW0vSOBHoRNsM2rZm-WFirUkwdI"
          />
          <div className="flex flex-col">
            <span className="font-bold text-[14px] text-[#0f233d] uppercase tracking-wider font-sans">
              AeroTwin
            </span>
            <span className="font-mono text-[10px] text-[#4d5f7c] tracking-widest uppercase font-semibold">
              Propulsion Lab
            </span>
          </div>
        </div>

        {/* Platform Architecture Strip */}
        <div className="px-4 py-2 bg-[#eff4ff] border-b border-[#e2e8f0]/60">
          <div className="font-mono text-[10px] text-[#4d5f7c] uppercase font-semibold">
            Platform Architecture
          </div>
          <div className="font-mono text-[12px] text-[#0037b0] font-bold mt-0.5 tracking-wider">
            MQ-99 SENTINEL // R915
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectScreen(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all ${
                  isActive
                    ? 'bg-[#1d4ed8] text-white font-bold shadow-sm'
                    : 'text-[#434655] hover:bg-[#dce9ff]/50 hover:text-[#0b1c30]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-white' : 'text-[#4d5f7c]'}`}>
                    {item.icon}
                  </span>
                  <span className="text-[14px] font-sans font-medium tracking-wide">
                    {item.label}
                  </span>
                </div>
                <span
                  className={`px-1.5 py-0.5 rounded font-mono text-[10px] font-bold tracking-wider ${
                    isActive ? 'bg-white/20 text-white' : item.badgeColor
                  }`}
                >
                  {item.badge}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Station Link Footer */}
        <div className="p-4 bg-white border-t border-[#e2e8f0]">
          <div className="p-3 bg-[#f8f9ff] rounded-lg border border-[#e2e8f0]">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[10px] text-[#4d5f7c] uppercase font-semibold">
                Station Link
              </span>
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
            </div>
            <div className="font-mono text-[12px] text-[#0b1c30] font-bold">
              UPLINK 100% SECURE
            </div>
            <div className="font-mono text-[10px] text-[#4d5f7c] mt-0.5">
              LATENCY: 12ms // C2 GEO
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
