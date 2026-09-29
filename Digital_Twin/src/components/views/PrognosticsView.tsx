import React, { useState } from 'react';

export const PrognosticsView: React.FC = () => {
  const [simulating, setSimulating] = useState(false);
  const [orderDispatched, setOrderDispatched] = useState(false);
  const [dispatching, setDispatching] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeTabSubsystem, setActiveTabSubsystem] = useState<string>('cyl3');

  const handleSimulateForward = () => {
    setSimulating(true);
    setToastMessage('Forward Monte Carlo Propagation running (10,000 steps)...');
    setTimeout(() => {
      setSimulating(false);
      setToastMessage('PINN DeepKoopman v4.8 Projected: RUL 118.0 FLT HRS confirmed with 99.4% physics adherence.');
      setTimeout(() => setToastMessage(null), 3000);
    }, 1200);
  };

  const handleDispatchWorkOrder = () => {
    setDispatching(true);
    setTimeout(() => {
      setDispatching(false);
      setOrderDispatched(true);
      setToastMessage('OEM Work Order #WO-8915 successfully transmitted to Hangar Bay 4 logistics queue.');
      setTimeout(() => setToastMessage(null), 3500);
    }, 1200);
  };

  const handleExportHdf5 = () => {
    setToastMessage('Exporting full HDF5 raw sensor & tensor residual dataset (14.2 MB)...');
    setTimeout(() => {
      setToastMessage('HDF5 telemetry package downloaded: uav704_pinn_residuals_2026.h5');
      setTimeout(() => setToastMessage(null), 3000);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full px-4 lg:px-6 py-4 max-w-7xl mx-auto space-y-4">
      {/* Toast banner */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#0f233d] text-white px-4 py-2.5 rounded-lg shadow-xl border border-[#1b64da] flex items-center gap-2 animate-bounce text-sm">
          <span className="material-symbols-outlined text-[#10b981] text-[18px]">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* SECTION 1: PROGNOSTIC ENGINE & PINN MODEL SPECS */}
      <div className="w-full bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#0037b0] shrink-0 shadow-sm border border-[#dce9ff]">
              <span className="material-symbols-outlined text-[28px]">psychology</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-[16px] text-[#0f233d] uppercase tracking-wider font-sans">
                  PINN-DeepKoopman v4.8
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#ebf3ff] text-[#0037b0] font-mono text-[10px] font-bold uppercase tracking-wider">
                  Hybrid Navier-Stokes &amp; Thermo-Kinetic
                </span>
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#eafaf1] text-[#004f35] font-mono text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
                  ACTIVE CONTINUOUS SOLVER
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#4d5f7c] mt-1">
                Propulsion Twin Dynamics · Cylinder Head Residual Field &amp; High-Frequency Manifold Sensor Fusion
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 self-end lg:self-auto">
            <div className="px-3 py-1.5 rounded-lg bg-[#eff4ff] border border-[#dce9ff] flex flex-col text-right">
              <span className="font-mono text-[10px] text-[#4d5f7c] uppercase tracking-widest font-semibold">
                Inference Rate
              </span>
              <span className="font-mono text-[12px] text-[#0b1c30] font-bold">50 Hz REAL-TIME</span>
            </div>
            <button
              onClick={handleSimulateForward}
              disabled={simulating}
              className="px-4 py-2 rounded-lg bg-[#1d4ed8] text-white font-bold text-[13px] flex items-center gap-2 shadow-sm hover:bg-[#0037b0] transition-all"
            >
              <span className={`material-symbols-outlined text-[18px] ${simulating ? 'animate-spin' : ''}`}>
                sync
              </span>
              <span>{simulating ? 'Simulating...' : 'Simulate Forward'}</span>
            </button>
          </div>
        </div>

        {/* Live Physics Constraint Telemetry Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 pt-4 bg-[#eff4ff]/60 rounded-lg p-3 border border-[#dce9ff]">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-[#4d5f7c] uppercase font-semibold">Loss Convergence</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-mono text-[14px] text-[#0b1c30] font-bold">1.84e-5</span>
              <span className="text-[10px] font-bold text-[#004f35]">Optimal Fit</span>
            </div>
            <div className="w-full bg-[#dce9ff] h-1 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-[#10b981] h-full rounded-full" style={{ width: '96%' }}></div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-[#4d5f7c] uppercase font-semibold">Physics Adherence</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-mono text-[14px] text-[#0b1c30] font-bold">99.42%</span>
              <span className="text-[10px] font-bold text-[#0037b0]">Constrained</span>
            </div>
            <div className="w-full bg-[#dce9ff] h-1 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-[#0037b0] h-full rounded-full" style={{ width: '99.4%' }}></div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-[#4d5f7c] uppercase font-semibold">Anomaly Confidence</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-mono text-[14px] text-[#d97706] font-bold">94.8%</span>
              <span className="text-[10px] font-bold text-[#d97706]">High Deviation</span>
            </div>
            <div className="w-full bg-[#dce9ff] h-1 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-[#f59e0b] h-full rounded-full" style={{ width: '94.8%' }}></div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-[#4d5f7c] uppercase font-semibold">Epistemic Uncertainty</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-mono text-[14px] text-[#0b1c30] font-bold">±2.18%</span>
              <span className="text-[10px] font-bold text-[#4d5f7c]">Monte Carlo 10k</span>
            </div>
            <div className="w-full bg-[#dce9ff] h-1 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-[#4d5f7c] h-full rounded-full" style={{ width: '82%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: 4 SUBSYSTEM PROGNOSTIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* SUB-01: Exhaust Valve */}
        <div
          onClick={() => setActiveTabSubsystem('cyl3')}
          className={`bg-white rounded-xl p-4 shadow-sm border transition-all cursor-pointer relative flex flex-col justify-between overflow-hidden ${
            activeTabSubsystem === 'cyl3' ? 'ring-2 ring-[#f59e0b] border-[#f59e0b]' : 'border-[#e2e8f0]'
          }`}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#f59e0b]"></div>
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#4d5f7c] font-bold">SUB-01 // CYL3</span>
              <span className="px-1.5 py-0.5 rounded bg-[#fffbeb] text-[#d97706] font-mono text-[10px] font-bold uppercase">
                Warning
              </span>
            </div>
            <h2 className="font-bold text-[14px] text-[#0f233d] mt-1">Exhaust Valve &amp; Seat</h2>
            <p className="font-mono text-[10px] text-[#4d5f7c]">Micro-fretting &amp; Thermal Creep</p>
            <div className="mt-3 flex items-baseline justify-between">
              <div>
                <span className="font-mono text-[10px] text-[#4d5f7c] uppercase">Health Index</span>
                <div className="font-extrabold text-[28px] text-[#d97706]">82%</div>
              </div>
              <div className="text-right">
                <span className="font-mono text-[10px] text-[#4d5f7c] uppercase">Degradation</span>
                <div className="font-mono text-[12px] text-[#ef4444] font-bold">+0.034 mm/100h</div>
              </div>
            </div>
            <div className="mt-2 p-1.5 bg-[#fffbeb] rounded border border-[#fde68a] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#d97706] text-[16px]">priority_high</span>
              <span className="font-mono text-[10px] text-[#d97706] font-semibold">
                Early compression loss bound active
              </span>
            </div>
          </div>
          <div className="mt-3 pt-1 bg-[#eff4ff] rounded p-1.5 flex items-center justify-between border border-[#dce9ff]">
            <span className="font-mono text-[10px] text-[#4d5f7c] uppercase font-semibold">Projected RUL Limit</span>
            <span className="font-mono text-[12px] text-[#d97706] font-bold">118 FLT HRS</span>
          </div>
        </div>

        {/* SUB-02: Turbo Bearing */}
        <div
          onClick={() => setActiveTabSubsystem('turbo')}
          className={`bg-white rounded-xl p-4 shadow-sm border transition-all cursor-pointer relative flex flex-col justify-between overflow-hidden ${
            activeTabSubsystem === 'turbo' ? 'ring-2 ring-[#10b981] border-[#10b981]' : 'border-[#e2e8f0]'
          }`}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#10b981]"></div>
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#4d5f7c] font-bold">SUB-02 // TURBO</span>
              <span className="px-1.5 py-0.5 rounded bg-[#eafaf1] text-[#004f35] font-mono text-[10px] font-bold uppercase">
                Nominal
              </span>
            </div>
            <h2 className="font-bold text-[14px] text-[#0f233d] mt-1">Hydrodynamic Film</h2>
            <p className="font-mono text-[10px] text-[#4d5f7c]">Bearing Eccentricity &amp; Vibs</p>
            <div className="mt-3 flex items-baseline justify-between">
              <div>
                <span className="font-mono text-[10px] text-[#4d5f7c] uppercase">Health Index</span>
                <div className="font-extrabold text-[28px] text-[#004f35]">96%</div>
              </div>
              <div className="text-right">
                <span className="font-mono text-[10px] text-[#4d5f7c] uppercase">Radial Gap</span>
                <div className="font-mono text-[12px] text-[#0b1c30] font-bold">0.018 mm</div>
              </div>
            </div>
            <div className="mt-2 p-1.5 bg-[#eafaf1] rounded border border-[#bbf7d0] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#004f35] text-[16px]">check_circle</span>
              <span className="font-mono text-[10px] text-[#004f35] font-semibold">
                Pressure film stiffness optimal
              </span>
            </div>
          </div>
          <div className="mt-3 pt-1 bg-[#eff4ff] rounded p-1.5 flex items-center justify-between border border-[#dce9ff]">
            <span className="font-mono text-[10px] text-[#4d5f7c] uppercase font-semibold">Projected RUL Limit</span>
            <span className="font-mono text-[12px] text-[#004f35] font-bold">640 FLT HRS</span>
          </div>
        </div>

        {/* SUB-03: HP Injector */}
        <div
          onClick={() => setActiveTabSubsystem('fuel')}
          className={`bg-white rounded-xl p-4 shadow-sm border transition-all cursor-pointer relative flex flex-col justify-between overflow-hidden ${
            activeTabSubsystem === 'fuel' ? 'ring-2 ring-[#1b64da] border-[#1b64da]' : 'border-[#e2e8f0]'
          }`}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#1b64da]"></div>
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#4d5f7c] font-bold">SUB-03 // FUEL</span>
              <span className="px-1.5 py-0.5 rounded bg-[#ebf3ff] text-[#1b64da] font-mono text-[10px] font-bold uppercase">
                Attention
              </span>
            </div>
            <h2 className="font-bold text-[14px] text-[#0f233d] mt-1">HP Injector Cavitation</h2>
            <p className="font-mono text-[10px] text-[#4d5f7c]">Piezo Needle Orifice Erosion</p>
            <div className="mt-3 flex items-baseline justify-between">
              <div>
                <span className="font-mono text-[10px] text-[#4d5f7c] uppercase">Health Index</span>
                <div className="font-extrabold text-[28px] text-[#0037b0]">89%</div>
              </div>
              <div className="text-right">
                <span className="font-mono text-[10px] text-[#4d5f7c] uppercase">Pattern Drift</span>
                <div className="font-mono text-[12px] text-[#1b64da] font-bold">+4.1%</div>
              </div>
            </div>
            <div className="mt-2 p-1.5 bg-[#ebf3ff] rounded border border-[#dce9ff] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#1b64da] text-[16px]">info</span>
              <span className="font-mono text-[10px] text-[#1b64da] font-semibold">
                Clean pulse purge recommended
              </span>
            </div>
          </div>
          <div className="mt-3 pt-1 bg-[#eff4ff] rounded p-1.5 flex items-center justify-between border border-[#dce9ff]">
            <span className="font-mono text-[10px] text-[#4d5f7c] uppercase font-semibold">Projected RUL Limit</span>
            <span className="font-mono text-[12px] text-[#0037b0] font-bold">290 FLT HRS</span>
          </div>
        </div>

        {/* SUB-04: Piston Ring Pack */}
        <div
          onClick={() => setActiveTabSubsystem('piston')}
          className={`bg-white rounded-xl p-4 shadow-sm border transition-all cursor-pointer relative flex flex-col justify-between overflow-hidden ${
            activeTabSubsystem === 'piston' ? 'ring-2 ring-[#10b981] border-[#10b981]' : 'border-[#e2e8f0]'
          }`}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#10b981]"></div>
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#4d5f7c] font-bold">SUB-04 // CELL</span>
              <span className="px-1.5 py-0.5 rounded bg-[#eafaf1] text-[#004f35] font-mono text-[10px] font-bold uppercase">
                Nominal
              </span>
            </div>
            <h2 className="font-bold text-[14px] text-[#0f233d] mt-1">Piston Ring &amp; Liner</h2>
            <p className="font-mono text-[10px] text-[#4d5f7c]">Cylinder 1-4 Compression Seals</p>
            <div className="mt-3 flex items-baseline justify-between">
              <div>
                <span className="font-mono text-[10px] text-[#4d5f7c] uppercase">Health Index</span>
                <div className="font-extrabold text-[28px] text-[#004f35]">94%</div>
              </div>
              <div className="text-right">
                <span className="font-mono text-[10px] text-[#4d5f7c] uppercase">Blowby Pressure</span>
                <div className="font-mono text-[12px] text-[#0b1c30] font-bold">18 mbar</div>
              </div>
            </div>
            <div className="mt-2 p-1.5 bg-[#eafaf1] rounded border border-[#bbf7d0] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#004f35] text-[16px]">check_circle</span>
              <span className="font-mono text-[10px] text-[#004f35] font-semibold">
                Blowby seal within aero tolerance
              </span>
            </div>
          </div>
          <div className="mt-3 pt-1 bg-[#eff4ff] rounded p-1.5 flex items-center justify-between border border-[#dce9ff]">
            <span className="font-mono text-[10px] text-[#4d5f7c] uppercase font-semibold">Projected RUL Limit</span>
            <span className="font-mono text-[12px] text-[#004f35] font-bold">520 FLT HRS</span>
          </div>
        </div>
      </div>

      {/* SECTION 3: MID-SECTION SPLIT (TRAJECTORY & XAI ATTRIBUTION) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT COL: RUL Trajectory Graph (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-[#e2e8f0] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[15px] text-[#0f233d]">
                    Remaining Useful Life (RUL) Trajectory
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-[#fffbeb] text-[#d97706] font-mono text-[10px] font-bold uppercase">
                    Cyl 3 Critical
                  </span>
                </div>
                <p className="text-[12px] text-[#4d5f7c]">
                  Physics-Informed Neural Network extrapolation vs. Standard OEM Degradation
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-[#0037b0] inline-block"></span>
                  <span className="font-mono text-[10px] text-[#4d5f7c]">Historical</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-[#f59e0b] inline-block"></span>
                  <span className="font-mono text-[10px] text-[#4d5f7c]">PINN Proj</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-2 bg-[#f59e0b]/20 rounded-sm inline-block"></span>
                  <span className="font-mono text-[10px] text-[#4d5f7c]">95% CI</span>
                </div>
              </div>
            </div>

            {/* SVG Degradation Curve Chart */}
            <div className="relative w-full h-72 bg-[#eff4ff]/30 rounded-xl p-2 overflow-hidden flex flex-col justify-between border border-[#e2e8f0]">
              <svg className="w-full h-full relative z-10 overflow-visible" preserveAspectRatio="none" viewBox="0 0 700 240">
                <defs>
                  <linearGradient id="ci-grad-prognostics" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.04" />
                  </linearGradient>
                </defs>

                {/* Background Grid Lines */}
                <line x1="40" y1="30" x2="680" y2="30" stroke="#c4c5d7" strokeDasharray="3 3" opacity="0.4" />
                <line x1="40" y1="80" x2="680" y2="80" stroke="#c4c5d7" strokeDasharray="3 3" opacity="0.4" />
                <line x1="40" y1="130" x2="680" y2="130" stroke="#c4c5d7" strokeDasharray="3 3" opacity="0.4" />
                <line x1="40" y1="185" x2="680" y2="185" stroke="#ef4444" strokeDasharray="3 3" strokeWidth="1.2" opacity="0.75" />

                {/* OEM Target Baseline Curve (nominal 1200 h TBO) */}
                <path d="M 40,30 C 240,40 480,90 680,180" fill="none" opacity="0.55" stroke="#747686" strokeDasharray="4,4" strokeWidth="1.5" />
                <text fill="#747686" fontFamily="JetBrains Mono" fontSize="10" x="590" y="170">
                  OEM TBO 1200h
                </text>

                {/* Early Intervention Boundary (Threshold at 960.6h) */}
                <text fill="#ef4444" fontFamily="JetBrains Mono" fontSize="9" fontWeight="700" x="50" y="180">
                  SERVICE INTERVENTION LIMIT (CRITICAL HEALTH 70%)
                </text>

                {/* 95% Confidence Interval Monte Carlo Area (from 842.6h to projection) */}
                <path d="M 490,126 C 540,140 590,165 630,200 L 610,215 C 570,185 530,160 490,126 Z" fill="url(#ci-grad-prognostics)" />

                {/* Historical Flight Operating Curve (0h to 842.6h) */}
                <path
                  d="M 40,30 C 120,32 180,45 250,56 C 320,68 410,95 490,126"
                  fill="none"
                  stroke="#0037b0"
                  strokeLinecap="round"
                  strokeWidth="3"
                />

                {/* PINN Predicted Trajectory Curve (842.6h to early limit at 960.6h) */}
                <path
                  d="M 490,126 C 535,148 575,178 610,205"
                  fill="none"
                  stroke="#f59e0b"
                  strokeDasharray="5,3"
                  strokeLinecap="round"
                  strokeWidth="3"
                />

                {/* Current Operating Point (842.6h) */}
                <circle cx="490" cy="126" fill="#0037b0" r="6" stroke="#ffffff" strokeWidth="2" />
                <circle cx="490" cy="126" fill="none" opacity="0.4" r="12" stroke="#0037b0" strokeWidth="1" className="animate-ping" />
                <line stroke="#0037b0" strokeDasharray="2,2" strokeWidth="1" x1="490" x2="490" y1="20" y2="220" />
                <text fill="#0037b0" fontFamily="JetBrains Mono" fontSize="10" fontWeight="700" x="495" y="50">
                  NOW: 842.6 FLT HRS
                </text>
                <text fill="#4d5f7c" fontFamily="Inter" fontSize="9" x="495" y="62">
                  Operating Point
                </text>

                {/* Predicted Limit Intersect (960.6h) */}
                <circle cx="560" cy="185" fill="#ef4444" r="5" stroke="#ffffff" strokeWidth="2" />
                <text fill="#ef4444" fontFamily="JetBrains Mono" fontSize="10" fontWeight="700" x="540" y="200">
                  960.6h CRITICAL INTERSECT
                </text>
              </svg>

              {/* Chart Horizontal Axis Labels */}
              <div className="flex justify-between px-4 font-mono text-[10px] text-[#4d5f7c] border-t border-[#e2e8f0]/60 pt-1">
                <span>0h (Depot Out)</span>
                <span>300h</span>
                <span>600h</span>
                <span className="text-[#0037b0] font-bold">842.6h (Current)</span>
                <span className="text-[#d97706] font-bold">960.6h (Limit)</span>
                <span>1200h (OEM TBO)</span>
              </div>
            </div>
          </div>

          {/* Metric KPI Cards Under Trajectory */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 bg-[#eff4ff]/60 rounded-xl p-3 border border-[#dce9ff]">
            <div className="flex flex-col">
              <span className="font-mono text-[10px] text-[#4d5f7c] uppercase tracking-wider font-semibold">
                Calculated Residual RUL
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-extrabold text-[24px] text-[#d97706]">118.0</span>
                <span className="font-mono text-[11px] text-[#0b1c30] font-bold">FLT HRS</span>
              </div>
              <span className="font-mono text-[10px] text-[#4d5f7c] mt-0.5">Uncertainty Bound ±14.2 hrs</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[10px] text-[#4d5f7c] uppercase tracking-wider font-semibold">
                Sortie Missions Left
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-extrabold text-[24px] text-[#0f233d]">14</span>
                <span className="font-mono text-[11px] text-[#4d5f7c] font-bold">SORTIES</span>
              </div>
              <span className="font-mono text-[10px] text-[#004f35] font-semibold mt-0.5">
                Assumed 8.4h / mission profile
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[10px] text-[#4d5f7c] uppercase tracking-wider font-semibold">
                Primary Degradation Vector
              </span>
              <div className="font-bold text-[13px] text-[#0f233d] mt-1">Cyl 3 Exhaust Seat</div>
              <span className="font-mono text-[10px] text-[#ef4444] font-medium mt-0.5">
                Fretting wear &amp; localized hotspot
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COL: Explainable AI & Physics Attribution (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-[#e2e8f0] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[15px] text-[#0f233d]">
                    Physics Attribution &amp; XAI
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#ebf3ff] text-[#0037b0] font-mono text-[10px] font-bold">
                    SHAP ENGINE
                  </span>
                </div>
                <p className="text-[12px] text-[#4d5f7c]">
                  Identified physical drivers forcing early overhaul trajectory
                </p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#0037b0] border border-[#dce9ff]">
                <span className="material-symbols-outlined text-[20px]">bubble_chart</span>
              </div>
            </div>

            {/* SHAP Waterfall Feature Contribution List */}
            <div className="space-y-2.5 mt-3">
              {/* Attribution 1 */}
              <div className="p-2.5 rounded-lg bg-[#eff4ff]/60 hover:bg-[#dce9ff]/60 transition-colors border border-[#dce9ff]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#0f233d] font-bold">
                    EGT #3 Thermal Bias Drift
                  </span>
                  <span className="font-mono text-[11px] text-[#ef4444] font-extrabold">+38.4%</span>
                </div>
                <div className="w-full bg-[#dce9ff] h-2 rounded-full mt-2 overflow-hidden flex">
                  <div className="bg-[#ef4444] h-full rounded-full" style={{ width: '38.4%' }}></div>
                </div>
                <div className="flex items-center justify-between mt-1 text-[#4d5f7c]">
                  <span className="font-mono text-[10px]">Sensor Delta: +48°C vs Cyl 1/2/4</span>
                  <span className="font-mono text-[10px] font-bold text-[#ef4444]">Weight: HIGH</span>
                </div>
              </div>

              {/* Attribution 2 */}
              <div className="p-2.5 rounded-lg bg-[#eff4ff]/60 hover:bg-[#dce9ff]/60 transition-colors border border-[#dce9ff]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#0f233d] font-bold">
                    Knock Sensor Kurtosis Peak
                  </span>
                  <span className="font-mono text-[11px] text-[#d97706] font-extrabold">+24.2%</span>
                </div>
                <div className="w-full bg-[#dce9ff] h-2 rounded-full mt-2 overflow-hidden flex">
                  <div className="bg-[#f59e0b] h-full rounded-full" style={{ width: '24.2%' }}></div>
                </div>
                <div className="flex items-center justify-between mt-1 text-[#4d5f7c]">
                  <span className="font-mono text-[10px]">Micro-impact frequency ~6.8 kHz</span>
                  <span className="font-mono text-[10px] font-bold text-[#d97706]">Weight: MED</span>
                </div>
              </div>

              {/* Attribution 3 */}
              <div className="p-2.5 rounded-lg bg-[#eff4ff]/60 hover:bg-[#dce9ff]/60 transition-colors border border-[#dce9ff]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#0f233d] font-bold">
                    MAP Plenum Pulse Oscillation
                  </span>
                  <span className="font-mono text-[11px] text-[#1b64da] font-extrabold">+16.5%</span>
                </div>
                <div className="w-full bg-[#dce9ff] h-2 rounded-full mt-2 overflow-hidden flex">
                  <div className="bg-[#1b64da] h-full rounded-full" style={{ width: '16.5%' }}></div>
                </div>
                <div className="flex items-center justify-between mt-1 text-[#4d5f7c]">
                  <span className="font-mono text-[10px]">Dynamic manifold delta 110 hPa</span>
                  <span className="font-mono text-[10px] font-bold text-[#1b64da]">Weight: MED</span>
                </div>
              </div>

              {/* Attribution 4 */}
              <div className="p-2.5 rounded-lg bg-[#eff4ff]/60 hover:bg-[#dce9ff]/60 transition-colors border border-[#dce9ff]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#0f233d] font-bold">
                    ECU Lambda Trim Compensator
                  </span>
                  <span className="font-mono text-[11px] text-[#004f35] font-extrabold">-12.1%</span>
                </div>
                <div className="w-full bg-[#dce9ff] h-2 rounded-full mt-2 overflow-hidden flex">
                  <div className="bg-[#004f35] h-full rounded-full" style={{ width: '12.1%' }}></div>
                </div>
                <div className="flex items-center justify-between mt-1 text-[#4d5f7c]">
                  <span className="font-mono text-[10px]">Rich fuel dampening mitigation active</span>
                  <span className="font-mono text-[10px] font-bold text-[#004f35]">Negative Driver</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mechanistic Physics Callout */}
          <div className="p-3 bg-[#ebf3ff]/70 rounded-xl border border-[#dce9ff] flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[#0037b0] text-[20px] shrink-0 mt-0.5">science</span>
            <div className="flex flex-col">
              <span className="font-bold text-[13px] text-[#0037b0]">Thermo-Kinetic Solver Synthesis</span>
              <p className="text-[12px] text-[#434655] mt-0.5 leading-relaxed">
                Transient heat transfer equations indicate exhaust valve stem guide friction spiked at FL180 high-throttle cruise. Valve seating velocity deviated by 14%, triggering micro-fretting on the bronze seat insert.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: CONDITION-BASED MAINTENANCE (CBM) ACTION & SOLVER INTEGRITY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* CBM Overhaul Recommendation Card (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-[#e2e8f0] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]"></span>
                <span className="font-bold text-[15px] text-[#0f233d]">
                  Automated CBM Fleet Directive
                </span>
                <span className="px-2 py-0.5 rounded bg-[#fffbeb] text-[#d97706] font-mono text-[10px] font-bold">
                  EXPEDITE TOP OVERHAUL
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#4d5f7c]">REC-ID: CBM-99-704-B</span>
            </div>

            {/* Schedule Comparison Callout */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-[#eff4ff]/60 rounded-xl my-3 border border-[#dce9ff]">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-[#4d5f7c] uppercase">Original Scheduled Overhaul</span>
                <div className="font-mono text-[14px] text-[#4d5f7c] line-through font-bold mt-0.5">
                  Sortie 42 (1,080h)
                </div>
                <span className="font-mono text-[10px] text-[#ef4444] mt-0.5 font-semibold">High Failure Risk if Unaltered</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-[#4d5f7c] uppercase">Recommended CBM Window</span>
                <div className="font-mono text-[14px] text-[#d97706] font-extrabold mt-0.5">
                  Sortie 28 (960h)
                </div>
                <span className="font-mono text-[10px] text-[#004f35] mt-0.5 font-semibold">
                  Safe Remaining Margin: ~34 FLT HRS
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-[#4d5f7c] uppercase">Turnaround Impact</span>
                <div className="font-mono text-[14px] text-[#0b1c30] font-bold mt-0.5">14.5 HRS DOWNTIME</div>
                <span className="font-mono text-[10px] text-[#4d5f7c] mt-0.5">Hangar Bay 4 · Tech Crew Alpha</span>
              </div>
            </div>

            {/* Action Checklist Detail */}
            <div className="space-y-1.5 text-[#434655] text-[13px]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#10b981] text-[18px]">task_alt</span>
                <span>Stage-2 Top-End Overhaul: Cylinder 3 head inspection, exhaust valve &amp; guide replacement.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#10b981] text-[18px]">task_alt</span>
                <span>OEM Rotax Service Kit #RTX-915-C3 reserved in Forward Logistics Depot (Sigonella Hub).</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#10b981] text-[18px]">task_alt</span>
                <span>Sensor Recalibration: EGT probe #3 thermocouple offset verification post-maintenance.</span>
              </div>
            </div>
          </div>

          {/* Action Buttons Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#e2e8f0]">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleDispatchWorkOrder}
                disabled={dispatching || orderDispatched}
                className={`px-4 py-2 rounded-lg font-bold text-[13px] flex items-center gap-2 shadow transition-all ${
                  orderDispatched
                    ? 'bg-[#10b981] text-white'
                    : 'bg-[#0037b0] hover:bg-[#1d4ed8] text-white'
                }`}
              >
                <span className={`material-symbols-outlined text-[18px] ${dispatching ? 'animate-spin' : ''}`}>
                  {orderDispatched ? 'verified' : 'assignment_turned_in'}
                </span>
                <span>
                  {dispatching
                    ? 'Transmitting C2 Order...'
                    : orderDispatched
                    ? 'Work Order Dispatched (#WO-8915)'
                    : 'Approve & Dispatch OEM Work Order'}
                </span>
              </button>
              <button
                onClick={handleExportHdf5}
                className="px-4 py-2 rounded-lg bg-[#dce9ff] text-[#0b1c30] font-bold text-[13px] hover:bg-[#c4c5d7] transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>Export HDF5 Telemetry</span>
              </button>
            </div>
            <button
              onClick={() => {
                setToastMessage('Bayesian Priors reset to factory standard aero-profile calibration.');
                setTimeout(() => setToastMessage(null), 2500);
              }}
              className="px-3 py-2 rounded-lg text-[#4d5f7c] hover:text-[#0f233d] hover:bg-[#eff4ff] font-bold text-[13px] flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
              <span>Adjust Priors</span>
            </button>
          </div>
        </div>

        {/* Right Solver Verification Checksum (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-[#e2e8f0] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0]">
              <span className="font-bold text-[15px] text-[#0f233d]">PINN Verification</span>
              <span className="material-symbols-outlined text-[#004f35] text-[20px]">verified</span>
            </div>
            <p className="text-[12px] text-[#4d5f7c] mt-1">
              Navier-Stokes dynamic PDE convergence verification check
            </p>
            <div className="mt-4 space-y-2 font-mono text-[11px]">
              <div className="flex items-center justify-between p-2 rounded bg-[#eff4ff]/70 border border-[#dce9ff]">
                <span className="text-[#4d5f7c] uppercase">PDE Continuity Residual</span>
                <span className="text-[#004f35] font-bold">1.04e-6 (Stable)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-[#eff4ff]/70 border border-[#dce9ff]">
                <span className="text-[#4d5f7c] uppercase">Momentum Balance L2</span>
                <span className="text-[#004f35] font-bold">4.22e-5 (Valid)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-[#eff4ff]/70 border border-[#dce9ff]">
                <span className="text-[#4d5f7c] uppercase">Boundary Dirichlet Check</span>
                <span className="text-[#004f35] font-bold">99.89% Pass</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-[#eff4ff]/70 border border-[#dce9ff]">
                <span className="text-[#4d5f7c] uppercase">Model SHA-256 Digest</span>
                <span className="text-[#4d5f7c] font-mono truncate max-w-[150px]">8f4b...19e0</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#eff4ff] rounded-lg flex items-center justify-between border border-[#dce9ff]">
            <div className="flex flex-col">
              <span className="font-mono text-[9px] text-[#4d5f7c] uppercase font-bold">Digital Signature</span>
              <span className="font-mono text-[11px] text-[#0b1c30] font-semibold">AIR-FORCE-CERT-AERO</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#eafaf1] text-[#004f35] font-mono text-[10px] font-bold">
              SECURE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
