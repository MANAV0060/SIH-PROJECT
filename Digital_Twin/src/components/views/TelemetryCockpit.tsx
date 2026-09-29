import React, { useState } from 'react';

export const TelemetryCockpit: React.FC = () => {
  const [viewMode, setViewMode] = useState<'normal' | 'wire' | 'heatmap'>('normal');
  const [isEnriched, setIsEnriched] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleEnrichToggle = () => {
    setIsEnriched(!isEnriched);
    setToastMessage(!isEnriched ? 'FADEC Mixture Enriched (+8%): Cyl 3 Cooling Activated' : 'FADEC Returned to Nominal Mixture Profile');
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLogBurst = () => {
    setIsLogging(true);
    setToastMessage('Logging High-Rate 500Hz Burst to Memory (30s buffer)...');
    setTimeout(() => {
      setIsLogging(false);
      setToastMessage('Burst 500Hz Telemetry Saved to Local Flight Recorder');
      setTimeout(() => setToastMessage(null), 2500);
    }, 1500);
  };

  const cyl3Cht = isEnriched ? '142°C' : '154°C';
  const cyl3Egt = isEnriched ? '838°C' : '885°C';
  const cyl3Residual = isEnriched ? '+0.48%' : '+6.19%';

  return (
    <div className="flex flex-col w-full px-4 lg:px-6 py-4 max-w-7xl mx-auto space-y-4">
      {/* Dynamic Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#0f233d] text-white px-4 py-2.5 rounded-lg shadow-xl border border-[#1b64da] flex items-center gap-2 animate-bounce text-sm">
          <span className="material-symbols-outlined text-[#10b981] text-[18px]">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top KPI Metric Strip */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 w-full">
        {/* Propulsion Core RPM */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e2e8f0] flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#4d5f7c] uppercase tracking-wider font-semibold">
              Propulsion Core
            </span>
            <span className="px-1.5 py-0.5 rounded bg-[#ebf3ff] text-[#0037b0] font-mono text-[10px] font-bold">
              CRUISE
            </span>
          </div>
          <div className="flex items-center justify-between my-2">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-extrabold text-[28px] text-[#0f233d] tracking-tight">5,420</span>
                <span className="font-mono text-[11px] text-[#4d5f7c] font-semibold">RPM</span>
              </div>
              <div className="text-[12px] text-[#4d5f7c] mt-0.5">MC: 5,800 · MAX: 6,200</div>
            </div>
            {/* Mini Radial Gauge SVG */}
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 48 48">
                <circle
                  className="text-[#e5eeff]"
                  cx="24"
                  cy="24"
                  fill="none"
                  r="19"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <circle
                  className="text-[#1d4ed8]"
                  cx="24"
                  cy="24"
                  fill="none"
                  r="19"
                  stroke="currentColor"
                  strokeDasharray="119.38"
                  strokeDashoffset="24"
                  strokeLinecap="round"
                  strokeWidth="4"
                />
              </svg>
              <span className="absolute font-mono text-[10px] text-[#0f233d] font-bold">87%</span>
            </div>
          </div>
          <div className="w-full bg-[#e5eeff] rounded-full h-1.5 overflow-hidden">
            <div className="bg-[#1d4ed8] h-full rounded-full w-[87%]"></div>
          </div>
        </div>

        {/* MAP Metric */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e2e8f0] flex flex-col justify-between group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#4d5f7c] uppercase tracking-wider font-semibold">
              Manifold Abs Pressure
            </span>
            <span className="px-1.5 py-0.5 rounded bg-[#eafaf1] text-[#004f35] font-mono text-[10px] font-bold">
              +1.32 BAR
            </span>
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-1">
              <span className="font-extrabold text-[28px] text-[#0f233d] tracking-tight">39.4</span>
              <span className="font-mono text-[11px] text-[#4d5f7c] font-semibold">inHg</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px] text-[#4d5f7c] mt-1">
              <span>PR: 1.34</span>
              <span>IC dP: 0.8 PSI</span>
            </div>
          </div>
          <div className="flex items-center gap-1 font-mono text-[10px] text-[#4d5f7c]">
            <span className="material-symbols-outlined text-[14px] text-[#10b981]">check_circle</span>
            <span>Compressor Margin +18%</span>
          </div>
        </div>

        {/* Fuel Ingestion Rate */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e2e8f0] flex flex-col justify-between group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#4d5f7c] uppercase tracking-wider font-semibold">
              Fuel Ingestion
            </span>
            <span className="font-mono text-[11px] text-[#0037b0] font-bold">0.473 L/min</span>
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-1">
              <span className="font-extrabold text-[28px] text-[#0f233d] tracking-tight">28.4</span>
              <span className="font-mono text-[11px] text-[#4d5f7c] font-semibold">L/HR</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px] text-[#4d5f7c] mt-1">
              <span>BSFC 224 g/kWh</span>
              <span>RES: 188 L</span>
            </div>
          </div>
          <div className="w-full bg-[#e5eeff] rounded-full h-1.5 overflow-hidden">
            <div className="bg-[#1b64da] h-full rounded-full w-[64%]"></div>
          </div>
        </div>

        {/* Mechanical Thermal Efficiency */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e2e8f0] flex flex-col justify-between group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#4d5f7c] uppercase tracking-wider font-semibold">
              Thermal Efficiency
            </span>
            <span className="font-mono text-[10px] text-[#4d5f7c]">CARNOT: 58%</span>
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-1">
              <span className="font-extrabold text-[28px] text-[#0f233d] tracking-tight">36.8</span>
              <span className="font-mono text-[11px] text-[#4d5f7c] font-semibold">%</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px] text-[#4d5f7c] mt-1">
              <span>PINN Target: 38.9%</span>
              <span className="text-[#d97706] font-bold">-2.1% Δ</span>
            </div>
          </div>
          <div className="flex items-center gap-1 font-mono text-[10px] text-[#4d5f7c]">
            <span className="material-symbols-outlined text-[14px] text-[#0037b0]">analytics</span>
            <span>Exergy Rec: 94.2 kW</span>
          </div>
        </div>

        {/* Cylinder 3 Health Alert */}
        <div className={`rounded-xl p-4 shadow-sm border flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all ${
          isEnriched 
            ? 'bg-[#eafaf1] border-[#bbf7d0]' 
            : 'bg-[#fffbeb] border-[#fde68a]'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`font-mono text-[10px] uppercase tracking-wider font-bold ${
              isEnriched ? 'text-[#004f35]' : 'text-[#d97706]'
            }`}>
              Cylinder 3 Health
            </span>
            <span className={`px-1.5 py-0.5 rounded font-mono text-[10px] text-white font-bold ${
              isEnriched ? 'bg-[#10b981]' : 'bg-[#f59e0b] animate-pulse'
            }`}>
              {isEnriched ? 'STABILIZED' : 'ALERT'}
            </span>
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-1">
              <span className={`font-extrabold text-[28px] tracking-tight ${
                isEnriched ? 'text-[#004f35]' : 'text-[#d97706]'
              }`}>
                {isEnriched ? '-1.2%' : '-5.4%'}
              </span>
              <span className={`font-mono text-[11px] font-bold ${
                isEnriched ? 'text-[#004f35]' : 'text-[#d97706]'
              }`}>
                {isEnriched ? 'NOMINAL' : 'DERATE'}
              </span>
            </div>
            <div className={`text-[12px] mt-1 font-medium ${
              isEnriched ? 'text-[#004f35]' : 'text-[#d97706]'
            }`}>
              {isEnriched ? 'Mitigation active: Mixture enriched' : 'Exhaust thermal excursion detected'}
            </div>
          </div>
          <div className={`flex items-center gap-1 font-mono text-[10px] font-bold ${
            isEnriched ? 'text-[#10b981]' : 'text-[#d97706]'
          }`}>
            <span className="material-symbols-outlined text-[14px]">
              {isEnriched ? 'verified' : 'warning'}
            </span>
            <span>
              {isEnriched ? `EGT ${cyl3Egt} < Safe Ceiling (860°C)` : 'EGT 885°C > Threshold (860°C)'}
            </span>
          </div>
        </div>
      </section>

      {/* Main Middle Workspace: Spatial Boxer Engine + PINN Reconciliation */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full">
        {/* Left: 3D Spatial Subsystem Cutaway (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl p-4 shadow-sm border border-[#e2e8f0] flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b pb-3 border-[#e2e8f0]">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#1d4ed8]"></div>
              <div>
                <h2 className="font-bold text-[14px] text-[#0f233d] uppercase tracking-wide">
                  Rotax 915 iSA · 4-Cylinder Boxer Architecture
                </h2>
                <p className="font-mono text-[10px] text-[#4d5f7c]">
                  PHYSICAL SENSOR TELEMETRY & MULTI-ZONE ISOTHERMAL TELEMETRY
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setViewMode(viewMode === 'wire' ? 'normal' : 'wire')}
                className={`px-2.5 py-1 rounded font-mono text-[10px] uppercase transition-colors flex items-center gap-1 ${
                  viewMode === 'wire'
                    ? 'bg-[#1d4ed8] text-white font-bold'
                    : 'bg-[#eff4ff] hover:bg-[#dce9ff] text-[#4d5f7c]'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">layers</span> Mesh Wire
              </button>
              <button
                onClick={() => setViewMode(viewMode === 'heatmap' ? 'normal' : 'heatmap')}
                className={`px-2.5 py-1 rounded font-mono text-[10px] uppercase transition-colors flex items-center gap-1 ${
                  viewMode === 'heatmap'
                    ? 'bg-[#d97706] text-white font-bold'
                    : 'bg-[#eff4ff] hover:bg-[#dce9ff] text-[#4d5f7c]'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">thermostat</span> Heatmap
              </button>
            </div>
          </div>

          {/* Boxer Engine Schematic Layout Canvas */}
          <div className={`relative w-full rounded-xl p-6 flex flex-col items-center justify-center min-h-[340px] overflow-hidden transition-all ${
            viewMode === 'heatmap' 
              ? 'bg-gradient-to-br from-[#eff4ff] via-[#fffbeb] to-[#fee2e2]' 
              : 'bg-[#f1f5f9]'
          }`}>
            {/* Tactical Grid Overlay */}
            <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="tactical-grid-cockpit" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#cbd5e1" strokeWidth="0.75" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#tactical-grid-cockpit)" />
            </svg>

            {/* Center Engine Crankcase & Turbo Hub Visualization */}
            <div className="relative z-10 w-full max-w-xl">
              {/* Central Crankcase Block */}
              <div className={`mx-auto w-44 h-28 rounded-lg shadow-sm flex flex-col items-center justify-center text-center p-2 relative border ${
                viewMode === 'wire' 
                  ? 'bg-transparent border-dashed border-[#1d4ed8]' 
                  : 'bg-white border-[#e2e8f0]'
              }`}>
                <span className="font-mono text-[10px] text-[#4d5f7c] uppercase font-bold">
                  CRANKCASE & OIL GALLERY
                </span>
                <span className="font-mono text-[12px] text-[#0f233d] font-bold mt-1">
                  4.20 BAR · 98°C
                </span>
                <div className="absolute -bottom-4 bg-[#eff4ff] px-2 py-0.5 rounded text-[9px] font-mono text-[#4d5f7c] border border-[#dce9ff]">
                  DRY SUMP SCAVENGE OK
                </div>
              </div>

              {/* Cylinder Nodes Grid (2x2 Boxer Opposite Layout) */}
              <div className="grid grid-cols-2 gap-x-12 sm:gap-x-16 gap-y-8 -mt-20">
                {/* Top Left: Cylinder 1 (Port Bank) */}
                <div className={`rounded-lg p-3 shadow-sm border transition-shadow flex flex-col space-y-1 ${
                  viewMode === 'wire' ? 'border-dashed border-[#10b981] bg-white/70' : 'bg-white border-[#e2e8f0]'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[13px] text-[#0f233d]">CYLINDER 01</span>
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#eafaf1] text-[#004f35] font-bold">
                      NOMINAL
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-left font-mono text-[11px]">
                    <div>
                      <span className="text-[#4d5f7c] text-[9px] block">CHT</span>
                      <span className="font-bold text-[#0b1c30]">138°C</span>
                    </div>
                    <div>
                      <span className="text-[#4d5f7c] text-[9px] block">EGT</span>
                      <span className="font-bold text-[#0b1c30]">820°C</span>
                    </div>
                  </div>
                  <div className="w-full bg-[#e5eeff] rounded-full h-1 mt-1">
                    <div className="bg-[#10b981] h-full rounded-full w-[65%]"></div>
                  </div>
                </div>

                {/* Top Right: Cylinder 2 (Starboard Bank) */}
                <div className={`rounded-lg p-3 shadow-sm border transition-shadow flex flex-col space-y-1 ${
                  viewMode === 'wire' ? 'border-dashed border-[#10b981] bg-white/70' : 'bg-white border-[#e2e8f0]'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[13px] text-[#0f233d]">CYLINDER 02</span>
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#eafaf1] text-[#004f35] font-bold">
                      NOMINAL
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-left font-mono text-[11px]">
                    <div>
                      <span className="text-[#4d5f7c] text-[9px] block">CHT</span>
                      <span className="font-bold text-[#0b1c30]">142°C</span>
                    </div>
                    <div>
                      <span className="text-[#4d5f7c] text-[9px] block">EGT</span>
                      <span className="font-bold text-[#0b1c30]">830°C</span>
                    </div>
                  </div>
                  <div className="w-full bg-[#e5eeff] rounded-full h-1 mt-1">
                    <div className="bg-[#10b981] h-full rounded-full w-[68%]"></div>
                  </div>
                </div>

                {/* Bottom Left: Cylinder 3 (ALERT HOT SPOT) */}
                <div className={`rounded-lg p-3 shadow-md border transition-all flex flex-col space-y-1 relative ring-1 ${
                  isEnriched 
                    ? 'bg-[#eafaf1] border-[#bbf7d0] ring-[#10b981]' 
                    : 'bg-[#fffbeb] border-[#fde68a] ring-[#f59e0b]'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`font-bold text-[13px] ${isEnriched ? 'text-[#004f35]' : 'text-[#d97706]'}`}>
                      CYLINDER 03
                    </span>
                    <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded text-white font-bold ${
                      isEnriched ? 'bg-[#10b981]' : 'bg-[#f59e0b] animate-pulse'
                    }`}>
                      {isEnriched ? 'RESOLVED' : 'CRIT ΔT'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-left font-mono text-[11px]">
                    <div>
                      <span className={`text-[9px] block ${isEnriched ? 'text-[#004f35]' : 'text-[#d97706]'}`}>CHT</span>
                      <span className={`font-bold ${isEnriched ? 'text-[#004f35]' : 'text-[#d97706]'}`}>
                        {cyl3Cht}
                      </span>
                    </div>
                    <div>
                      <span className={`text-[9px] block ${isEnriched ? 'text-[#004f35]' : 'text-[#d97706]'}`}>EGT</span>
                      <span className={`font-bold ${isEnriched ? 'text-[#004f35]' : 'text-[#d97706]'}`}>
                        {cyl3Egt}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-[#e5eeff] rounded-full h-1 mt-1">
                    <div className={`h-full rounded-full transition-all ${
                      isEnriched ? 'bg-[#10b981] w-[66%]' : 'bg-[#f59e0b] w-[94%]'
                    }`}></div>
                  </div>
                  <div className={`font-mono text-[9px] pt-0.5 font-medium ${
                    isEnriched ? 'text-[#004f35]' : 'text-[#d97706]'
                  }`}>
                    {isEnriched ? 'PINN Divergence: +0.48% (Stabilized)' : 'Exhaust Valve PINN Divergence: +6.2%'}
                  </div>
                </div>

                {/* Bottom Right: Cylinder 4 (Starboard Bank) */}
                <div className={`rounded-lg p-3 shadow-sm border transition-shadow flex flex-col space-y-1 ${
                  viewMode === 'wire' ? 'border-dashed border-[#10b981] bg-white/70' : 'bg-white border-[#e2e8f0]'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[13px] text-[#0f233d]">CYLINDER 04</span>
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#eafaf1] text-[#004f35] font-bold">
                      NOMINAL
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-left font-mono text-[11px]">
                    <div>
                      <span className="text-[#4d5f7c] text-[9px] block">CHT</span>
                      <span className="font-bold text-[#0b1c30]">139°C</span>
                    </div>
                    <div>
                      <span className="text-[#4d5f7c] text-[9px] block">EGT</span>
                      <span className="font-bold text-[#0b1c30]">825°C</span>
                    </div>
                  </div>
                  <div className="w-full bg-[#e5eeff] rounded-full h-1 mt-1">
                    <div className="bg-[#10b981] h-full rounded-full w-[66%]"></div>
                  </div>
                </div>
              </div>

              {/* Turbocharger & Intercooler Stage Nodes (Bottom Centered) */}
              <div className="mt-6 flex flex-wrap items-center justify-around gap-2">
                <div className="bg-white rounded-md px-3 py-1.5 shadow-sm border border-[#e2e8f0] text-center">
                  <span className="font-mono text-[10px] text-[#4d5f7c] uppercase block">
                    TURBOCHARGER STAGE
                  </span>
                  <span className="font-mono text-[12px] text-[#0037b0] font-bold">132,000 RPM</span>
                  <span className="font-mono text-[10px] text-[#4d5f7c] ml-1">PR 1.84</span>
                </div>
                <div className="bg-white rounded-md px-3 py-1.5 shadow-sm border border-[#e2e8f0] text-center">
                  <span className="font-mono text-[10px] text-[#4d5f7c] uppercase block">
                    INTERCOOLER CORE
                  </span>
                  <span className="font-mono text-[12px] text-[#004f35] font-bold">T-OUT: 44.1°C</span>
                  <span className="font-mono text-[10px] text-[#4d5f7c] ml-1">dP 0.8 PSI</span>
                </div>
              </div>
            </div>
          </div>

          {/* Isothermal Delta Rate Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <div className="bg-[#eff4ff] rounded-lg p-2 text-center border border-[#dce9ff]">
              <span className="font-mono text-[10px] text-[#4d5f7c] block font-semibold">CYL 1 ISOTHERM</span>
              <span className="font-mono text-[12px] text-[#0f233d] font-bold">+0.12 °C/s</span>
            </div>
            <div className="bg-[#eff4ff] rounded-lg p-2 text-center border border-[#dce9ff]">
              <span className="font-mono text-[10px] text-[#4d5f7c] block font-semibold">CYL 2 ISOTHERM</span>
              <span className="font-mono text-[12px] text-[#0f233d] font-bold">+0.09 °C/s</span>
            </div>
            <div className={`rounded-lg p-2 text-center border transition-all ${
              isEnriched 
                ? 'bg-[#eafaf1] border-[#bbf7d0]' 
                : 'bg-[#fffbeb] border-[#fde68a]'
            }`}>
              <span className={`font-mono text-[10px] block font-bold ${
                isEnriched ? 'text-[#004f35]' : 'text-[#d97706]'
              }`}>
                CYL 3 ISOTHERM
              </span>
              <span className={`font-mono text-[12px] font-bold ${
                isEnriched ? 'text-[#004f35]' : 'text-[#d97706]'
              }`}>
                {isEnriched ? '+0.11 °C/s ↓' : '+0.68 °C/s ↗'}
              </span>
            </div>
            <div className="bg-[#eff4ff] rounded-lg p-2 text-center border border-[#dce9ff]">
              <span className="font-mono text-[10px] text-[#4d5f7c] block font-semibold">CYL 4 ISOTHERM</span>
              <span className="font-mono text-[12px] text-[#0f233d] font-bold">+0.14 °C/s</span>
            </div>
          </div>
        </div>

        {/* Right: Physics-Informed Neural Network (PINN) Model Residuals & Live Action (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl p-4 shadow-sm border border-[#e2e8f0] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b pb-3 border-[#e2e8f0]">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-[#0037b0]">model_training</span>
                  <h3 className="font-bold text-[14px] text-[#0f233d] uppercase tracking-wide">
                    PINN Model Residuals
                  </h3>
                </div>
                <p className="font-mono text-[10px] text-[#4d5f7c]">
                  PHYSICS RECONCILIATION · LOSS: 2.14e-5
                </p>
              </div>
              <div className="flex flex-col items-end">
                <span className="px-1.5 py-0.5 rounded bg-[#eafaf1] text-[#004f35] font-mono text-[10px] font-bold">
                  95% CI 99.4% NOMINAL
                </span>
                <span className="font-mono text-[10px] text-[#4d5f7c] mt-0.5">Surrogate Fidelity</span>
              </div>
            </div>

            {/* Residuals Data Table */}
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-left font-mono text-[12px]">
                <thead>
                  <tr className="text-[#4d5f7c] font-mono text-[10px] uppercase border-b border-[#e2e8f0]">
                    <th className="py-2">Subsystem Node</th>
                    <th className="py-2 text-right">Physical</th>
                    <th className="py-2 text-right">PINN Surr</th>
                    <th className="py-2 text-right">Residual</th>
                    <th className="py-2 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eff4ff]">
                  <tr>
                    <td className="py-2 text-[#0f233d] font-medium">MAP Plenum</td>
                    <td className="py-2 text-right text-[#0f233d]">39.40 inHg</td>
                    <td className="py-2 text-right text-[#4d5f7c]">39.38 inHg</td>
                    <td className="py-2 text-right text-[#004f35] font-bold">+0.05%</td>
                    <td className="py-2 text-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-[#10b981]"></span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-[#0f233d] font-medium">Cyl 1 CHT</td>
                    <td className="py-2 text-right text-[#0f233d]">138.2 °C</td>
                    <td className="py-2 text-right text-[#4d5f7c]">137.9 °C</td>
                    <td className="py-2 text-right text-[#004f35] font-bold">+0.22%</td>
                    <td className="py-2 text-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-[#10b981]"></span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-[#0f233d] font-medium">Cyl 2 CHT</td>
                    <td className="py-2 text-right text-[#0f233d]">142.1 °C</td>
                    <td className="py-2 text-right text-[#4d5f7c]">141.8 °C</td>
                    <td className="py-2 text-right text-[#004f35] font-bold">+0.21%</td>
                    <td className="py-2 text-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-[#10b981]"></span>
                    </td>
                  </tr>
                  <tr className={`font-bold transition-colors ${
                    isEnriched ? 'bg-[#eafaf1]' : 'bg-[#fffbeb]'
                  }`}>
                    <td className={`py-2 flex items-center gap-1 ${
                      isEnriched ? 'text-[#004f35]' : 'text-[#d97706]'
                    }`}>
                      <span>Cyl 3 Exh Vlv</span>
                      <span className="material-symbols-outlined text-[14px]">
                        {isEnriched ? 'check' : 'report_problem'}
                      </span>
                    </td>
                    <td className={`py-2 text-right ${isEnriched ? 'text-[#004f35]' : 'text-[#d97706]'}`}>
                      {cyl3Egt}
                    </td>
                    <td className={`py-2 text-right ${isEnriched ? 'text-[#004f35]' : 'text-[#d97706]'}`}>
                      833.4 °C
                    </td>
                    <td className={`py-2 text-right ${isEnriched ? 'text-[#004f35]' : 'text-[#d97706]'}`}>
                      {cyl3Residual}
                    </td>
                    <td className="py-2 text-center">
                      <span className={`inline-block w-2 h-2 rounded-full ${
                        isEnriched ? 'bg-[#10b981]' : 'bg-[#f59e0b] animate-ping'
                      }`}></span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-[#0f233d] font-medium">Cyl 4 CHT</td>
                    <td className="py-2 text-right text-[#0f233d]">139.0 °C</td>
                    <td className="py-2 text-right text-[#4d5f7c]">138.5 °C</td>
                    <td className="py-2 text-right text-[#004f35] font-bold">+0.36%</td>
                    <td className="py-2 text-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-[#10b981]"></span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-[#0f233d] font-medium">Turbo RPM</td>
                    <td className="py-2 text-right text-[#0f233d]">132.0 k</td>
                    <td className="py-2 text-right text-[#4d5f7c]">131.8 k</td>
                    <td className="py-2 text-right text-[#004f35] font-bold">+0.15%</td>
                    <td className="py-2 text-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-[#10b981]"></span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-[#0f233d] font-medium">Oil Gallery P</td>
                    <td className="py-2 text-right text-[#0f233d]">4.20 bar</td>
                    <td className="py-2 text-right text-[#4d5f7c]">4.21 bar</td>
                    <td className="py-2 text-right text-[#004f35] font-bold">-0.24%</td>
                    <td className="py-2 text-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-[#10b981]"></span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Live Contingency Actions Widget */}
          <div className="bg-[#eff4ff] rounded-lg p-3 space-y-2 border border-[#dce9ff]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#4d5f7c] uppercase font-bold">
                Dynamic Actuation & Mitigation
              </span>
              <span className="font-mono text-[11px] text-[#0037b0] font-bold">
                FADEC CHANNEL A
              </span>
            </div>
            <p className="text-[12px] text-[#4d5f7c] leading-relaxed">
              Recommended mitigation for Cylinder 3 excursion: Command adaptive mixture enrichment (+8%) or shift sortie waypoint to climb profile FL210.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
              <button
                onClick={handleEnrichToggle}
                className={`w-full sm:flex-1 py-2 px-3 font-bold text-[13px] rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5 ${
                  isEnriched 
                    ? 'bg-[#10b981] hover:bg-[#059669] text-white' 
                    : 'bg-[#1d4ed8] hover:bg-[#0037b0] text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">local_gas_station</span>
                <span>{isEnriched ? 'Enrichment Active (Reset)' : 'Enrich Mixture (+8%)'}</span>
              </button>
              <button
                onClick={handleLogBurst}
                disabled={isLogging}
                className="w-full sm:w-auto py-2 px-3 bg-white hover:bg-[#dce9ff] text-[#0f233d] font-bold text-[13px] rounded-lg border border-[#e2e8f0] transition-colors flex items-center justify-center gap-1"
              >
                <span className={`material-symbols-outlined text-[16px] ${isLogging ? 'animate-spin text-[#1b64da]' : ''}`}>
                  stream
                </span>
                <span>{isLogging ? 'Logging...' : 'Log Burst 500Hz'}</span>
              </button>
              <button
                onClick={() => {
                  setToastMessage('Sensor Calibrations zeroed against ground bench reference');
                  setTimeout(() => setToastMessage(null), 2500);
                }}
                className="w-full sm:w-auto py-2 px-3 bg-white hover:bg-[#dce9ff] text-[#4d5f7c] font-bold text-[13px] rounded-lg border border-[#e2e8f0] transition-colors flex items-center justify-center"
                title="Zero Sensor Calibrations"
              >
                <span className="material-symbols-outlined text-[16px]">tune</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Diagnostics Strip (4 Columns) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 w-full">
        {/* Acoustic Knock FFT */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e2e8f0] flex flex-col justify-between group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#4d5f7c] uppercase tracking-wider font-semibold">
              Acoustic Knock FFT
            </span>
            <span className="px-1.5 py-0.5 rounded bg-[#fffbeb] text-[#d97706] font-mono text-[10px] font-bold">
              6.8 kHz SPIKE
            </span>
          </div>
          <div className="my-2">
            <svg className="w-full h-14" preserveAspectRatio="none" viewBox="0 0 200 60">
              <path
                d="M0 45 L20 44 L40 46 L60 42 L80 43 L100 45 L115 42 L120 10 L125 40 L140 44 L160 43 L180 45 L200 44"
                fill="none"
                stroke="#f59e0b"
                strokeLinecap="round"
                strokeWidth="2"
              />
              <line stroke="#f59e0b" strokeDasharray="2,2" strokeWidth="1" x1="120" x2="120" y1="0" y2="60" />
              <text className="font-mono text-[9px]" fill="#d97706" x="126" y="16">
                Cyl 3 Knock
              </text>
            </svg>
          </div>
          <div className="flex items-center justify-between font-mono text-[11px] text-[#4d5f7c]">
            <span>Window: 2048 pts</span>
            <span className="text-[#d97706] font-bold">SNR: 18.2 dB</span>
          </div>
        </div>

        {/* P-Theta In-cylinder Indicator Diagram */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e2e8f0] flex flex-col justify-between group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#4d5f7c] uppercase tracking-wider font-semibold">
              P-Theta Indicator
            </span>
            <span className="px-1.5 py-0.5 rounded bg-[#ebf3ff] text-[#0037b0] font-mono text-[10px] font-bold">
              CYL 3 ΔP
            </span>
          </div>
          <div className="my-2">
            <svg className="w-full h-14" preserveAspectRatio="none" viewBox="0 0 200 60">
              <path
                d="M0 50 Q60 50 90 20 Q100 6 110 20 Q140 50 200 50"
                fill="none"
                stroke="#cbd5e1"
                strokeDasharray="3,3"
                strokeWidth="1.5"
              />
              <path
                d="M0 50 Q60 50 90 26 Q100 18 110 26 Q140 50 200 50"
                fill="none"
                stroke="#1d4ed8"
                strokeWidth="2"
              />
              <text className="font-mono text-[9px]" fill="#1d4ed8" x="115" y="24">
                -12% P-Max
              </text>
            </svg>
          </div>
          <div className="flex items-center justify-between font-mono text-[11px] text-[#4d5f7c]">
            <span>IMEP: 14.2 bar</span>
            <span className="text-[#0037b0] font-bold">Peak @ 14° ATDC</span>
          </div>
        </div>

        {/* Turbo Dynamics & Wastegate Duty */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e2e8f0] flex flex-col justify-between group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#4d5f7c] uppercase tracking-wider font-semibold">
              Turbo & Wastegate
            </span>
            <span className="px-1.5 py-0.5 rounded bg-[#eff4ff] text-[#4d5f7c] font-mono text-[10px] font-bold">
              30s TREND
            </span>
          </div>
          <div className="my-2">
            <svg className="w-full h-14" preserveAspectRatio="none" viewBox="0 0 200 60">
              <path
                d="M0 35 Q40 38 80 32 T140 30 T200 28"
                fill="none"
                stroke="#004f35"
                strokeWidth="2"
              />
              <rect fill="#10b981" height="4" rx="2" width="84" x="0" y="48" />
            </svg>
          </div>
          <div className="flex items-center justify-between font-mono text-[11px] text-[#4d5f7c]">
            <span>Duty Cycle: 42%</span>
            <span className="text-[#004f35] font-bold">132k RPM Stable</span>
          </div>
        </div>

        {/* Lubrication Tribology Metrics */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e2e8f0] flex flex-col justify-between group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#4d5f7c] uppercase tracking-wider font-semibold">
              Lubrication Tribology
            </span>
            <span className="px-1.5 py-0.5 rounded bg-[#eafaf1] text-[#004f35] font-mono text-[10px] font-bold">
              ONLINE
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 my-2 font-mono text-[11px]">
            <div className="bg-[#eff4ff] p-1.5 rounded border border-[#dce9ff]">
              <span className="font-mono text-[9px] text-[#4d5f7c] block">OIL PRESSURE</span>
              <span className="text-[#0f233d] font-bold">4.20 bar</span>
            </div>
            <div className="bg-[#eff4ff] p-1.5 rounded border border-[#dce9ff]">
              <span className="font-mono text-[9px] text-[#4d5f7c] block">OIL TEMP</span>
              <span className="text-[#0f233d] font-bold">98.2 °C</span>
            </div>
            <div className="bg-[#eff4ff] p-1.5 rounded border border-[#dce9ff]">
              <span className="font-mono text-[9px] text-[#4d5f7c] block">DIELECTRIC</span>
              <span className="text-[#0f233d] font-bold">2.38 εr</span>
            </div>
            <div className="bg-[#eff4ff] p-1.5 rounded border border-[#dce9ff]">
              <span className="font-mono text-[9px] text-[#4d5f7c] block">ACID NO. TAN</span>
              <span className="text-[#004f35] font-bold">1.18 mg/g</span>
            </div>
          </div>
          <div className="flex items-center gap-1 font-mono text-[10px] text-[#004f35]">
            <span className="material-symbols-outlined text-[14px]">verified</span>
            <span>Spectrometry: Fe/Cu Below 8 PPM</span>
          </div>
        </div>
      </section>
    </div>
  );
};
