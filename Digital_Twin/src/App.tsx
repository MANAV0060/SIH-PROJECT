/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveScreen } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { TelemetryCockpit } from './components/views/TelemetryCockpit';
import { PrognosticsView } from './components/views/PrognosticsView';
import { ContingencyView } from './components/views/ContingencyView';
import { CbmLogisticsView } from './components/views/CbmLogisticsView';
import { DigitalTwin3DView } from './components/views/DigitalTwin3DView';
import { AxionLandingPage } from './components/landing/AxionLandingPage';
import { AerisCinematicLandingPage } from './components/landing/AerisCinematicLandingPage';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('landing-page');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Default active landing page: New AERIS-TWIN Cinematic Frontend
  if (activeScreen === 'landing-page') {
    return (
      <AerisCinematicLandingPage
        onNavigateToScreen={setActiveScreen}
        onSwitchToLegacy={() => setActiveScreen('legacy-landing-page')}
      />
    );
  }

  // Preserved previous Axion Studio frontend
  if (activeScreen === 'legacy-landing-page') {
    return (
      <div className="relative">
        <div className="fixed top-3 right-4 z-50">
          <button
            onClick={() => setActiveScreen('landing-page')}
            className="px-4 py-2 bg-gradient-to-r from-[#F26522] to-orange-600 hover:from-orange-600 hover:to-[#F26522] text-white text-xs font-semibold rounded-full shadow-xl transition-all cursor-pointer flex items-center gap-2"
          >
            <span>← Switch to AERIS-TWIN Frontend</span>
          </button>
        </div>
        <AxionLandingPage onNavigateToScreen={setActiveScreen} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#1a1c1e] font-sans antialiased flex flex-col selection:bg-[#1b64da] selection:text-white">
      {/* Top Universal App Bar */}
      <Header
        activeScreen={activeScreen}
        onSelectScreen={setActiveScreen}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Main Structural Layout Wrapper */}
      <div className="flex flex-1 pt-20">
        {/* Left Navigation Sidebar */}
        <Sidebar
          activeScreen={activeScreen}
          onSelectScreen={setActiveScreen}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* Dynamic Primary Screen View Container */}
        <main className="flex-1 lg:pl-64 pb-14 transition-all duration-300 w-full overflow-x-hidden">
          {/* Quick Return Bar */}
          <div className="bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between text-xs border-b border-slate-800">
            <span className="font-mono text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              AERIS-TWIN 3.0 Operational Defense Cockpit • Rotax 914/915 iS Engine Telemetry Active
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveScreen('legacy-landing-page')}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full font-medium transition-colors cursor-pointer text-[11px]"
                title="View previous frontend design"
              >
                Previous Frontend
              </button>
              <button
                onClick={() => setActiveScreen('landing-page')}
                className="px-3.5 py-1 bg-[#F26522] hover:bg-[#e05a1a] text-white rounded-full font-medium transition-colors cursor-pointer text-[11px]"
              >
                ← Back to AERIS-TWIN Landing
              </button>
            </div>
          </div>

          {activeScreen === 'telemetry-cockpit' && <TelemetryCockpit />}
          {activeScreen === 'predictive-prognostics' && <PrognosticsView />}
          {activeScreen === 'mission-contingency' && <ContingencyView />}
          {activeScreen === 'cbm-and-logistics' && <CbmLogisticsView />}
          {activeScreen === 'digital-twin-3d' && <DigitalTwin3DView />}
        </main>
      </div>

      {/* Persistent Bottom Status Strip */}
      <Footer />
    </div>
  );
}
