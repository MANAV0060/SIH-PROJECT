import React, { useState, useMemo } from 'react';

export const ContingencyView: React.FC = () => {
  const [fl, setFl] = useState<number>(195);
  const [isa, setIsa] = useState<number>(8);
  const [powerRegime, setPowerRegime] = useState<number>(75);
  const [cyl3Leakage, setCyl3Leakage] = useState<number>(18);
  const [heatSoak, setHeatSoak] = useState<number>(6.5);
  const [wastegateSeized, setWastegateSeized] = useState<boolean>(true);
  const [selectedVector, setSelectedVector] = useState<string>('bravo');
  const [isSimulatingMonteCarlo, setIsSimulatingMonteCarlo] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [presetExecuted, setPresetExecuted] = useState<boolean>(false);

  // Thermodynamic degradation calculations
  const sim = useMemo(() => {
    const powerFactor = powerRegime / 75.0;
    const altitudePenalty = (fl - 180) * 0.008;
    const tempRise = (isa * 1.1) + (cyl3Leakage * 0.42) + (heatSoak * 1.35) + (wastegateSeized ? 8.5 : 0);

    const calculatedCHT = Math.min(172, Math.round((122 + (powerFactor * 14) + tempRise + altitudePenalty) * 10) / 10);
    const calculatedMAP = Math.round((30 + (powerRegime * 0.1) + (wastegateSeized ? 1.8 : 0)) * 10) / 10;

    let basePFSD = 0.02 + (cyl3Leakage * 0.008) + (wastegateSeized ? 0.045 : 0) + (isa * 0.003);
    if (calculatedCHT > 165) basePFSD += 0.85;
    const formattedPFSD = Math.min(4.5, Math.max(0.015, basePFSD)).toFixed(3);

    const burn = (8.5 * powerFactor + (cyl3Leakage * 0.04) + (wastegateSeized ? 0.8 : 0) + (isa * 0.05)).toFixed(1);

    const maxLoiterHours = Math.max(3.2, ((94.2 - 18.0) / parseFloat(burn)));
    const loiterHrs = Math.floor(maxLoiterHours);
    const loiterMins = Math.round((maxLoiterHours - loiterHrs) * 60);

    // Chart coordinates mapping
    const svgX = 40 + ((calculatedMAP - 25) / 20) * 310;
    const svgY = 155 - ((calculatedCHT - 100) / 80) * 135;

    return {
      cht: calculatedCHT,
      map: calculatedMAP,
      pfsd: formattedPFSD,
      burn,
      loiterHrs,
      loiterMins,
      svgX: Math.min(350, Math.max(45, svgX)),
      svgY: Math.min(150, Math.max(25, svgY)),
    };
  }, [fl, isa, powerRegime, cyl3Leakage, heatSoak, wastegateSeized]);

  const handleResetBaseline = () => {
    setFl(195);
    setIsa(0);
    setPowerRegime(75);
    setCyl3Leakage(0);
    setHeatSoak(0);
    setWastegateSeized(false);
    setPresetExecuted(false);
    setToastMessage('Simulation reset to nominal factory baseline');
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleRunMonteCarlo = () => {
    setIsSimulatingMonteCarlo(true);
    setToastMessage('Running 1,000x Monte Carlo physics iterations...');
    setTimeout(() => {
      setIsSimulatingMonteCarlo(false);
      setToastMessage('Monte Carlo 1,000x completed: 95% Confidence bounds updated.');
      setTimeout(() => setToastMessage(null), 3000);
    }, 1200);
  };

  const handleExecutePreset = () => {
    setPresetExecuted(true);
    setFl(160);
    setPowerRegime(65);
    setToastMessage('Preset SYN-ADVISE-915 executed: descending to FL160, power at 65% ECO, vectoring to Recovery Strip Bravo.');
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="flex flex-col w-full px-4 lg:px-6 py-4 max-w-7xl mx-auto space-y-4">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#0f233d] text-white px-4 py-2.5 rounded-lg shadow-xl border border-[#1b64da] flex items-center gap-2 animate-bounce text-sm">
          <span className="material-symbols-outlined text-[#10b981] text-[18px]">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sortie Context Strip */}
      <section className="w-full">
        <div className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-4 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 lg:gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#ebf3ff] flex items-center justify-center text-[#1b64da] border border-[#dce9ff]">
                <span className="material-symbols-outlined text-[24px]">alt_route</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[14px] text-[#0f233d]">SORTIE SR-9402</span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#ebf3ff] text-[#0037b0] uppercase font-bold">
                    Sector Tango-7 Loiter
                  </span>
                </div>
                <p className="font-mono text-[10px] text-[#4d5f7c] tracking-wide mt-0.5">
                  UAV ROTAX 915 iSA // TWIN PINN PHYSICS CALIBRATED
                </p>
              </div>
            </div>

            <div className="h-8 w-px bg-[#dce9ff] hidden md:block"></div>

            <div className="flex items-center gap-4 sm:gap-6">
              <div>
                <span className="font-mono text-[10px] text-[#4d5f7c] block uppercase font-semibold">
                  Elapsed / Required
                </span>
                <span className="font-mono text-[12px] text-[#0b1c30] font-bold">
                  07h 14m <span className="text-[#4d5f7c] font-normal">/ 18h 30m</span>
                </span>
              </div>

              <div className="h-6 w-px bg-[#dce9ff]"></div>

              <div>
                <span className="font-mono text-[10px] text-[#4d5f7c] block uppercase font-semibold">
                  Usable Propellant
                </span>
                <span className="font-mono text-[12px] text-[#0037b0] font-bold">
                  94.2 KG <span className="font-normal text-[#4d5f7c] text-[10px]">(JET-A / AVGAS)</span>
                </span>
              </div>

              <div className="h-6 w-px bg-[#dce9ff]"></div>

              <div>
                <span className="font-mono text-[10px] text-[#4d5f7c] block uppercase font-semibold">
                  Physics Solver
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
                  <span className="font-mono text-[10px] text-[#004f35] font-bold uppercase">
                    Synchronous 60Hz
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full xl:w-auto justify-end">
            <button
              onClick={handleRunMonteCarlo}
              disabled={isSimulatingMonteCarlo}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dce9ff] transition-colors font-bold text-[13px] border border-[#dce9ff]"
            >
              <span className={`material-symbols-outlined text-[18px] text-[#1b64da] ${isSimulatingMonteCarlo ? 'animate-spin' : ''}`}>
                sync
              </span>
              <span>{isSimulatingMonteCarlo ? 'Simulating 1,000x...' : 'Run 1,000x Monte Carlo'}</span>
            </button>
            <button
              onClick={() => {
                setToastMessage('Tactical Mission Advisory uplinked to Air Wing 14 C2 Operations.');
                setTimeout(() => setToastMessage(null), 3000);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1d4ed8] text-white font-bold text-[13px] shadow-sm hover:bg-[#0037b0] transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">cell_tower</span>
              <span>Send Advisory</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Split: Controls vs Real-time Simulation Engine */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full">
        {/* LEFT PANEL: Interactive What-If Contingency Modeler */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-4 sm:p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b pb-3 border-[#e2e8f0]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#1b64da] text-[20px]">tune</span>
                <h2 className="font-bold text-[14px] text-[#0f233d] uppercase tracking-wider">
                  What-If Injections
                </h2>
              </div>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#eff4ff] text-[#4d5f7c] font-bold uppercase border border-[#dce9ff]">
                Physics Model V4.2
              </span>
            </div>

            {/* Flight Level Slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-bold text-[13px] text-[#0b1c30]" htmlFor="flSlider">
                  Flight Level / Ambient Alt
                </label>
                <span className="font-mono text-[12px] text-[#0037b0] font-bold">
                  FL {fl} ({ (fl * 100).toLocaleString() } FT)
                </span>
              </div>
              <input
                id="flSlider"
                type="range"
                min={160}
                max={260}
                step={5}
                value={fl}
                onChange={(e) => setFl(parseInt(e.target.value, 10))}
                className="w-full accent-[#1d4ed8] cursor-pointer bg-[#eff4ff] h-2 rounded-lg"
              />
              <div className="flex justify-between font-mono text-[10px] text-[#4d5f7c]">
                <span>FL 160 (Descend Min)</span>
                <span>FL 260 (Service Ceiling)</span>
              </div>
            </div>

            {/* Hot & High ISA Penalty */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-bold text-[13px] text-[#0b1c30]" htmlFor="isaSlider">
                  Hot &amp; High ISA Deviation
                </label>
                <span className="font-mono text-[12px] text-[#d97706] font-bold">
                  +{isa}°C ISA
                </span>
              </div>
              <input
                id="isaSlider"
                type="range"
                min={0}
                max={20}
                step={1}
                value={isa}
                onChange={(e) => setIsa(parseInt(e.target.value, 10))}
                className="w-full accent-[#f59e0b] cursor-pointer bg-[#eff4ff] h-2 rounded-lg"
              />
              <div className="flex justify-between font-mono text-[10px] text-[#4d5f7c]">
                <span>+0°C ISA (Standard)</span>
                <span>+20°C ISA (Extreme Hot)</span>
              </div>
            </div>

            {/* Power Demand Regime */}
            <div className="space-y-1.5">
              <label className="font-bold text-[13px] text-[#0b1c30] block">
                Power Demand Regime
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { regime: 65, label: '65% ECO' },
                  { regime: 75, label: '75% LOITER' },
                  { regime: 92, label: '92% CONT' },
                  { regime: 100, label: '100% MAX' },
                ].map((item) => (
                  <button
                    key={item.regime}
                    type="button"
                    onClick={() => setPowerRegime(item.regime)}
                    className={`py-2 rounded-lg font-mono text-[10px] text-center font-bold transition-all border ${
                      powerRegime === item.regime
                        ? 'bg-[#0037b0] text-white border-[#0037b0] shadow-sm'
                        : 'bg-[#eff4ff] text-[#4d5f7c] border-[#dce9ff] hover:bg-[#dce9ff]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Component Degradation Injections */}
            <div className="pt-2 space-y-3 border-t border-[#e2e8f0]">
              <span className="font-mono text-[10px] text-[#4d5f7c] uppercase font-bold tracking-wider block">
                Stress &amp; Degradation Multipliers
              </span>

              {/* Cyl 3 Compression Loss */}
              <div className="bg-[#eff4ff] p-3 rounded-lg space-y-1 border border-[#dce9ff]">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[12px] text-[#0b1c30]">Cylinder 3 Blow-by / Loss</span>
                  <span className="font-mono text-[11px] text-[#ef4444] font-bold">
                    {cyl3Leakage}% Leakage
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={80}
                  step={2}
                  value={cyl3Leakage}
                  onChange={(e) => setCyl3Leakage(parseInt(e.target.value, 10))}
                  className="w-full accent-[#ef4444] cursor-pointer bg-white h-1.5 rounded-lg"
                />
                <div className="flex justify-between font-mono text-[9px] text-[#4d5f7c]">
                  <span>0% Sealed</span>
                  <span>80% Catastrophic</span>
                </div>
              </div>

              {/* Intercooler Heat Soak */}
              <div className="bg-[#eff4ff] p-3 rounded-lg space-y-1 border border-[#dce9ff]">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[12px] text-[#0b1c30]">Intercooler Duct Heat Soak</span>
                  <span className="font-mono text-[11px] text-[#d97706] font-bold">
                    +{heatSoak.toFixed(1)}°C
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={15}
                  step={0.5}
                  value={heatSoak}
                  onChange={(e) => setHeatSoak(parseFloat(e.target.value))}
                  className="w-full accent-[#f59e0b] cursor-pointer bg-white h-1.5 rounded-lg"
                />
              </div>

              {/* Wastegate Partial Seizure */}
              <div className="bg-[#eff4ff] p-3 rounded-lg flex items-center justify-between border border-[#dce9ff]">
                <div>
                  <span className="font-bold text-[12px] text-[#0b1c30] block">
                    Turbo Wastegate Friction
                  </span>
                  <span className="font-mono text-[10px] text-[#4d5f7c]">
                    Stuck at 22% backpressure limit
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setWastegateSeized(!wastegateSeized)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                    wastegateSeized ? 'bg-[#f59e0b]' : 'bg-[#cbd5e1]'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      wastegateSeized ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Modeler Action Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-[#e2e8f0]">
              <button
                onClick={() => {
                  setToastMessage('Simulation snapshot saved to local contingency bank.');
                  setTimeout(() => setToastMessage(null), 2000);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dce9ff] transition-colors font-bold text-[12px] border border-[#dce9ff]"
              >
                <span className="material-symbols-outlined text-[16px]">bookmark_add</span>
                <span>Save Scenario</span>
              </button>
              <button
                onClick={handleResetBaseline}
                className="font-mono text-[10px] text-[#4d5f7c] hover:text-[#0b1c30] underline uppercase font-semibold"
              >
                Reset To Baseline
              </button>
            </div>
          </div>

          {/* Live Physics Kernel Status Card */}
          <div className="bg-[#eff4ff] rounded-xl p-4 flex items-center gap-3 border border-[#dce9ff]">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#0037b0] shadow-sm shrink-0">
              <span className="material-symbols-outlined text-[20px]">hub</span>
            </div>
            <div>
              <span className="font-mono text-[10px] text-[#4d5f7c] uppercase font-semibold">
                Neural-PINN Convergence
              </span>
              <div className="font-mono text-[12px] text-[#0b1c30] font-bold">
                L2 Residual = 1.08e-5 <span className="text-[#004f35]">(Optimal)</span>
              </div>
              <span className="font-mono text-[10px] text-[#4d5f7c]">
                AeroBench R915 Surrogate · Ep. 14,200
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Visual Diagnostics & Dual Simulation Charts */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Key Outcome Risk HUD Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#4d5f7c] uppercase font-semibold">
                  Probability of PFSD
                </span>
                <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase ${
                  parseFloat(sim.pfsd) > 0.5 
                    ? 'bg-[#fee2e2] text-[#ef4444]' 
                    : parseFloat(sim.pfsd) > 0.1 
                    ? 'bg-[#fffbeb] text-[#d97706]' 
                    : 'bg-[#eafaf1] text-[#004f35]'
                }`}>
                  {parseFloat(sim.pfsd) > 0.5 ? 'CRITICAL' : parseFloat(sim.pfsd) > 0.1 ? 'ELEVATED' : 'SAFE MARGIN'}
                </span>
              </div>
              <div className="mt-2">
                <div className="font-extrabold text-[28px] text-[#0b1c30] tracking-tight">
                  {sim.pfsd}%
                </div>
                <span className="font-mono text-[10px] text-[#4d5f7c]">
                  In-flight shutdown threshold: 1.500%
                </span>
              </div>
              <div className="w-full bg-[#eff4ff] h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    parseFloat(sim.pfsd) > 0.5 ? 'bg-[#ef4444]' : parseFloat(sim.pfsd) > 0.1 ? 'bg-[#f59e0b]' : 'bg-[#10b981]'
                  }`}
                  style={{ width: `${Math.min(100, Math.max(8, parseFloat(sim.pfsd) * 40))}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#4d5f7c] uppercase font-semibold">
                  Max Safe Remaining Loiter
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#ebf3ff] text-[#0037b0] font-mono text-[10px] font-bold uppercase">
                  Contingent
                </span>
              </div>
              <div className="mt-2">
                <div className="font-extrabold text-[28px] text-[#0f233d] tracking-tight">
                  {sim.loiterHrs < 10 ? `0${sim.loiterHrs}` : sim.loiterHrs}h {sim.loiterMins < 10 ? `0${sim.loiterMins}` : sim.loiterMins}m
                </div>
                <span className="font-mono text-[10px] text-[#4d5f7c]">
                  Includes 45m reserve + diverts
                </span>
              </div>
              <div className="w-full bg-[#eff4ff] h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-[#1b64da] h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(15, (sim.loiterHrs / 10) * 100))}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#4d5f7c] uppercase font-semibold">
                  Estimated Fuel Burn
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#fffbeb] text-[#d97706] font-mono text-[10px] font-bold uppercase">
                  Degraded
                </span>
              </div>
              <div className="mt-2">
                <div className="font-extrabold text-[28px] text-[#d97706] tracking-tight">
                  {sim.burn} <span className="text-[13px] font-normal text-[#4d5f7c]">kg/h</span>
                </div>
                <span className="font-mono text-[10px] text-[#4d5f7c]">
                  Baseline clean: 8.9 kg/h (+{Math.round(((parseFloat(sim.burn) - 8.9) / 8.9) * 100)}%)
                </span>
              </div>
              <div className="w-full bg-[#eff4ff] h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-[#f59e0b] h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(25, (parseFloat(sim.burn) / 14) * 100))}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Visual Graphic Stage: Thermal Envelope & Endurance Curves */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Chart 1: Manifold Pressure (MAP) vs Cylinder Head Temp (CHT) */}
            <div className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-2">
                <div>
                  <h3 className="font-bold text-[14px] text-[#0f233d]">Thermal Operating Boundary</h3>
                  <p className="font-mono text-[10px] text-[#4d5f7c]">
                    Manifold Pressure vs CHT (Rotax 915 Max 165°C)
                  </p>
                </div>
                <span className="material-symbols-outlined text-[18px] text-[#4d5f7c]">thermostat</span>
              </div>

              {/* SVG Chart 1 */}
              <div className="relative w-full h-52 my-1 bg-[#eff4ff]/60 rounded-lg p-2 overflow-hidden flex items-center justify-center border border-[#dce9ff]">
                <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 380 180">
                  {/* Grid Lines */}
                  <line opacity="0.4" stroke="#c4c5d7" strokeDasharray="3 3" x1="40" x2="360" y1="20" y2="20" />
                  <line opacity="0.4" stroke="#c4c5d7" strokeDasharray="3 3" x1="40" x2="360" y1="60" y2="60" />
                  <line opacity="0.4" stroke="#c4c5d7" strokeDasharray="3 3" x1="40" x2="360" y1="100" y2="100" />
                  <line opacity="0.4" stroke="#c4c5d7" strokeDasharray="3 3" x1="40" x2="360" y1="140" y2="140" />
                  <line stroke="#747686" strokeWidth="1.5" x1="40" x2="360" y1="160" y2="160" />
                  <line stroke="#747686" strokeWidth="1.5" x1="40" x2="40" y1="15" y2="160" />

                  {/* Axis labels */}
                  <text fill="#4d5f7c" fontFamily="JetBrains Mono" fontSize="9" textAnchor="end" x="35" y="24">175°C</text>
                  <text fill="#ba1a1a" fontFamily="JetBrains Mono" fontSize="9" fontWeight="bold" textAnchor="end" x="35" y="64">165°C</text>
                  <text fill="#4d5f7c" fontFamily="JetBrains Mono" fontSize="9" textAnchor="end" x="35" y="104">140°C</text>
                  <text fill="#4d5f7c" fontFamily="JetBrains Mono" fontSize="9" textAnchor="end" x="35" y="144">110°C</text>
                  <text fill="#4d5f7c" fontFamily="JetBrains Mono" fontSize="9" textAnchor="middle" x="90" y="174">28 inHg</text>
                  <text fill="#4d5f7c" fontFamily="JetBrains Mono" fontSize="9" textAnchor="middle" x="180" y="174">34 inHg</text>
                  <text fill="#4d5f7c" fontFamily="JetBrains Mono" fontSize="9" textAnchor="middle" x="270" y="174">39 inHg</text>
                  <text fill="#4d5f7c" fontFamily="JetBrains Mono" fontSize="9" textAnchor="middle" x="350" y="174">44 inHg</text>

                  {/* Safe Operating Zone Shade */}
                  <polygon fill="#10b981" fillOpacity="0.08" points="40,160 80,140 180,110 270,80 340,70 340,160 40,160" />

                  {/* Critical Limit Line (165 CHT) */}
                  <line stroke="#ba1a1a" strokeDasharray="4 2" strokeWidth="1.5" x1="40" x2="360" y1="60" y2="60" />
                  <text fill="#ba1a1a" fontFamily="Inter" fontSize="8" fontWeight="bold" textAnchor="end" x="355" y="55">
                    CRITICAL CHT LIMIT (165°C)
                  </text>

                  {/* Simulated Degradation Curve */}
                  <path d="M 40 148 Q 140 135, 220 95 T 350 48" fill="none" stroke="#f59e0b" strokeWidth="2.5" />

                  {/* Nominal Baseline Curve */}
                  <path d="M 40 152 Q 150 144, 240 115 T 350 78" fill="none" opacity="0.6" stroke="#1b64da" strokeDasharray="3 3" strokeWidth="1.5" />

                  {/* Current Simulated Operating Point (dynamically positioned) */}
                  <circle cx={sim.svgX} cy={sim.svgY} fill="#f59e0b" r="6" stroke="#ffffff" strokeWidth="2" className="animate-pulse" />
                  <circle cx={sim.svgX} cy={sim.svgY} opacity="0.5" r="12" stroke="#f59e0b" strokeDasharray="2 2" strokeWidth="1" />
                  <text fill="#0f233d" fontFamily="JetBrains Mono" fontSize="10" fontWeight="bold" x={Math.min(260, sim.svgX + 10)} y={Math.max(35, sim.svgY - 4)}>
                    OP: {sim.map} inHg · {sim.cht}°C
                  </text>
                </svg>
              </div>

              <div className="flex items-center justify-between text-[#4d5f7c] pt-2 font-mono text-[10px]">
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#f59e0b]"></span> Simulated Path</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#1b64da] border-dashed"></span> Baseline</span>
                <span className="text-[#ef4444] font-bold">ΔT Margin: +{ (sim.cht - 138).toFixed(1) }°C</span>
              </div>
            </div>

            {/* Chart 2: Fuel Consumption Rate vs Remaining Mission Horizon */}
            <div className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-2">
                <div>
                  <h3 className="font-bold text-[14px] text-[#0f233d]">Endurance vs Degradation</h3>
                  <p className="font-mono text-[10px] text-[#4d5f7c]">
                    Cumulative Fuel Burn Curve &amp; Mission Abort Line
                  </p>
                </div>
                <span className="material-symbols-outlined text-[18px] text-[#4d5f7c]">local_gas_station</span>
              </div>

              {/* SVG Chart 2 */}
              <div className="relative w-full h-52 my-1 bg-[#eff4ff]/60 rounded-lg p-2 overflow-hidden flex items-center justify-center border border-[#dce9ff]">
                <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 380 180">
                  {/* Grid lines */}
                  <line opacity="0.4" stroke="#c4c5d7" strokeDasharray="3 3" x1="40" x2="360" y1="20" y2="20" />
                  <line opacity="0.4" stroke="#c4c5d7" strokeDasharray="3 3" x1="40" x2="360" y1="60" y2="60" />
                  <line opacity="0.4" stroke="#c4c5d7" strokeDasharray="3 3" x1="40" x2="360" y1="100" y2="100" />
                  <line opacity="0.4" stroke="#c4c5d7" strokeDasharray="3 3" x1="40" x2="360" y1="140" y2="140" />
                  <line stroke="#747686" strokeWidth="1.5" x1="40" x2="360" y1="160" y2="160" />
                  <line stroke="#747686" strokeWidth="1.5" x1="40" x2="40" y1="15" y2="160" />

                  {/* Axis labels */}
                  <text fill="#4d5f7c" fontFamily="JetBrains Mono" fontSize="9" textAnchor="end" x="35" y="24">100kg</text>
                  <text fill="#4d5f7c" fontFamily="JetBrains Mono" fontSize="9" textAnchor="end" x="35" y="75">60kg</text>
                  <text fill="#4d5f7c" fontFamily="JetBrains Mono" fontSize="9" textAnchor="end" x="35" y="125">20kg</text>
                  <text fill="#4d5f7c" fontFamily="JetBrains Mono" fontSize="9" textAnchor="middle" x="40" y="174">0h</text>
                  <text fill="#4d5f7c" fontFamily="JetBrains Mono" fontSize="9" textAnchor="middle" x="120" y="174">4h</text>
                  <text fill="#4d5f7c" fontFamily="JetBrains Mono" fontSize="9" textAnchor="middle" x="200" y="174">8h</text>
                  <text fill="#4d5f7c" fontFamily="JetBrains Mono" fontSize="9" textAnchor="middle" x="280" y="174">12h</text>
                  <text fill="#4d5f7c" fontFamily="JetBrains Mono" fontSize="9" textAnchor="middle" x="350" y="174">16h</text>

                  {/* Safe minimum reserves band (18kg) */}
                  <rect fill="#ef4444" fillOpacity="0.08" height="32" width="320" x="40" y="128" />
                  <line stroke="#ef4444" strokeDasharray="3 3" strokeWidth="1" x1="40" x2="360" y1="128" y2="128" />
                  <text fill="#ef4444" fontFamily="JetBrains Mono" fontSize="8" textAnchor="end" x="355" y="124">
                    MIN RESERVES FLIGHT RULE (18 KG)
                  </text>

                  {/* Fuel depletion curve (Baseline) */}
                  <path d="M 40 30 L 120 54 L 200 82 L 280 110 L 350 134" fill="none" stroke="#10b981" strokeDasharray="2 2" strokeWidth="1.8" />

                  {/* Simulated higher burn curve */}
                  <path d="M 40 30 L 120 62 L 200 98 L 270 128 L 330 156" fill="none" stroke="#1b64da" strokeWidth="2.5" />

                  {/* Intercept dot: Bingo Fuel */}
                  <circle cx="270" cy="128" fill="#ba1a1a" r="5" stroke="#ffffff" strokeWidth="1.5" />
                  <text fill="#ba1a1a" fontFamily="JetBrains Mono" fontSize="9" fontWeight="bold" textAnchor="end" x="265" y="120">
                    BINGO INTERCEPT: {sim.loiterHrs < 10 ? `0${sim.loiterHrs}` : sim.loiterHrs}h {sim.loiterMins < 10 ? `0${sim.loiterMins}` : sim.loiterMins}m
                  </text>
                </svg>
              </div>

              <div className="flex items-center justify-between text-[#4d5f7c] pt-2 font-mono text-[10px]">
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#1b64da]"></span> Degraded Trajectory</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#10b981] border-dashed"></span> Nominal Float</span>
                <span className="text-[#0037b0] font-bold">Burn Rate: {sim.burn} kg/h</span>
              </div>
            </div>
          </div>

          {/* AI Contingency Recommendation Banner */}
          <div className="bg-[#eff4ff] border border-[#dce9ff] rounded-xl p-4 shadow-sm relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#0037b0] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">psychology</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[14px] text-[#0f233d] uppercase">
                      Autonomous Contingency Advisory
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#ebf3ff] text-[#0037b0] font-mono text-[10px] font-bold">
                      SYN-ADVISE-915
                    </span>
                  </div>
                  <p className="text-[13px] text-[#0b1c30] mt-1 leading-relaxed">
                    Reduce MAP to <span className="font-mono text-[#0037b0] font-bold">34.2 inHg</span> (70% Max Cont.), descend from{' '}
                    <span className="font-mono text-[#0f233d] font-bold">FL195</span> to{' '}
                    <span className="font-mono text-[#0f233d] font-bold">FL160</span> to increase cooling air mass flow by{' '}
                    <span className="text-[#004f35] font-bold">+18%</span>. Maintain on-station loiter for{' '}
                    <span className="font-mono text-[#0f233d] font-bold">04h 30m</span>, then route directly to{' '}
                    <strong className="text-[#0b1c30]">Recovery Strip Bravo</strong>.
                  </p>
                </div>
              </div>

              <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-2 shrink-0">
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-[#dce9ff]">
                  <span className="material-symbols-outlined text-[#10b981] text-[18px]">verified</span>
                  <div className="text-right">
                    <span className="font-mono text-[9px] text-[#4d5f7c] uppercase block">Success Probability</span>
                    <span className="font-extrabold text-[15px] text-[#004f35]">97.4%</span>
                  </div>
                </div>
                <button
                  onClick={handleExecutePreset}
                  className={`px-4 py-1.5 rounded font-mono text-[11px] font-bold transition-colors shadow-sm ${
                    presetExecuted
                      ? 'bg-[#10b981] text-white'
                      : 'bg-[#1b64da] hover:bg-[#0037b0] text-white'
                  }`}
                >
                  {presetExecuted ? 'Preset Active' : 'Execute Preset'}
                </button>
              </div>
            </div>
          </div>

          {/* Tactical Divert Airfield Matrix */}
          <div className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between border-b pb-2 border-[#e2e8f0]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4d5f7c] text-[20px]">flight_land</span>
                <h3 className="font-bold text-[14px] text-[#0f233d] uppercase tracking-wider">
                  Certified Divert Airfield Matrix
                </h3>
              </div>
              <span className="font-mono text-[10px] text-[#4d5f7c]">Sorted by Simulated Risk &amp; ETE</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#eff4ff] text-[#4d5f7c] font-mono text-[10px] uppercase">
                    <th className="py-2 px-3 rounded-l-lg">Airfield / Designation</th>
                    <th className="py-2 px-3">Distance</th>
                    <th className="py-2 px-3">Fuel Req</th>
                    <th className="py-2 px-3">ETE</th>
                    <th className="py-2 px-3">Risk Assessment</th>
                    <th className="py-2 px-3 text-right rounded-r-lg">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eff4ff]">
                  {/* Airfield Row 1: Bravo */}
                  <tr className={`transition-colors ${selectedVector === 'bravo' ? 'bg-[#eafaf1]/70' : 'hover:bg-[#eff4ff]/50'}`}>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
                        <div>
                          <span className="font-bold text-[13px] text-[#0f233d] block">Recovery Strip Bravo</span>
                          <span className="font-mono text-[10px] text-[#4d5f7c]">Tactical FOB · Rwy 04/22 (2,100m)</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[12px] text-[#0b1c30]">65 NM</td>
                    <td className="py-2.5 px-3 font-mono text-[12px] text-[#0037b0] font-bold">12.4 KG</td>
                    <td className="py-2.5 px-3 font-mono text-[12px] text-[#0b1c30]">00h 28m</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded bg-[#eafaf1] text-[#004f35] font-mono text-[10px] font-bold uppercase">
                        Low Risk / Nominal
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => {
                          setSelectedVector('bravo');
                          setToastMessage('Vector programmed: Autopilot course set for Recovery Strip Bravo (04h 30m loiter remaining)');
                          setTimeout(() => setToastMessage(null), 3000);
                        }}
                        className={`px-3 py-1 rounded font-mono text-[10px] font-bold transition-all shadow-sm ${
                          selectedVector === 'bravo'
                            ? 'bg-[#10b981] text-white'
                            : 'bg-[#1d4ed8] text-white hover:bg-[#0037b0]'
                        }`}
                      >
                        {selectedVector === 'bravo' ? 'Vector Active' : 'Select Vector'}
                      </button>
                    </td>
                  </tr>

                  {/* Airfield Row 2: Alpha */}
                  <tr className={`transition-colors ${selectedVector === 'alpha' ? 'bg-[#fffbeb]/70' : 'hover:bg-[#eff4ff]/50'}`}>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]"></span>
                        <div>
                          <span className="font-bold text-[13px] text-[#0f233d] block">Forward Base Alpha</span>
                          <span className="font-mono text-[10px] text-[#4d5f7c]">Co-located Drone Hub · ILS Cat I</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[12px] text-[#0b1c30]">140 NM</td>
                    <td className="py-2.5 px-3 font-mono text-[12px] text-[#d97706] font-bold">26.8 KG</td>
                    <td className="py-2.5 px-3 font-mono text-[12px] text-[#0b1c30]">01h 02m</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded bg-[#fffbeb] text-[#d97706] font-mono text-[10px] font-bold uppercase">
                        Moderate Wear Risk
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => {
                          setSelectedVector('alpha');
                          setToastMessage('Vector set to Forward Base Alpha on standby');
                          setTimeout(() => setToastMessage(null), 2500);
                        }}
                        className="px-3 py-1 rounded bg-[#eff4ff] text-[#0b1c30] font-mono text-[10px] font-bold hover:bg-[#dce9ff] transition-colors border border-[#dce9ff]"
                      >
                        {selectedVector === 'alpha' ? 'Standby (Sel)' : 'Standby'}
                      </button>
                    </td>
                  </tr>

                  {/* Airfield Row 3: Echo */}
                  <tr className="hover:bg-[#eff4ff]/50 transition-colors opacity-75">
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]"></span>
                        <div>
                          <span className="font-bold text-[13px] text-[#0f233d] block">Alternate Airbase Echo</span>
                          <span className="font-mono text-[10px] text-[#4d5f7c]">Civilian Joint Center · Complex Approach</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[12px] text-[#0b1c30]">280 NM</td>
                    <td className="py-2.5 px-3 font-mono text-[12px] text-[#ef4444] font-bold">58.2 KG</td>
                    <td className="py-2.5 px-3 font-mono text-[12px] text-[#0b1c30]">02h 10m</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded bg-[#fee2e2] text-[#b91c1c] font-mono text-[10px] font-bold uppercase">
                        Elevated Degradation
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        disabled
                        className="px-3 py-1 rounded bg-[#eff4ff] text-[#4d5f7c] font-mono text-[10px] font-bold opacity-60 cursor-not-allowed border border-[#dce9ff]"
                      >
                        Restricted
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Imagery Inset: Digital Twin Engine Sensor Diagnostic Bay */}
      <section className="w-full">
        <div className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-[#4d5f7c] uppercase font-bold">
              Physical Twin Benchmark
            </span>
            <h4 className="font-bold text-[15px] text-[#0f233d]">AeroTwin HIL Testbed Feed</h4>
            <p className="text-[12px] text-[#434655]">
              Hardware-in-the-loop Rotax 915 dynamometer bench correlating live manifold backpressure real-time data against PINN simulation kernels.
            </p>
          </div>

          <div className="rounded-lg overflow-hidden relative shadow-sm h-32 md:h-28 border border-[#e2e8f0]">
            <img
              className="w-full h-full object-cover"
              alt="Engine dynamometer test bench in aerospace lab"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrISLx-OWhE9iUQQh14P9Ae-Uq0qkxyYNlFaqdKTwSlGCF02AkbHyR9OLEAvg2oH3Vk85nYJFs6q2AbcGkPmxF5jRN8COIwIc0htA-e7Vw34zDf7okbnr2HGFawMJrkSSIM11gRhubZNN9AjYoH9cmwkyIv1UFSIIJepyvBukfcTMaVNwfMPsAoOLV5ni0MUJ_-AcLBtGBbWVARiN9B27dQtRiAU6ga-RaQjKJZ8TCvMmc6na4RCm6BQ"
            />
            <div className="absolute bottom-1.5 left-2 px-1.5 py-0.5 rounded bg-[#0f233d]/80 text-white font-mono text-[9px] backdrop-blur-sm">
              BENCH CELL #4 · LIVE
            </div>
          </div>

          <div className="rounded-lg overflow-hidden relative shadow-sm h-32 md:h-28 border border-[#e2e8f0]">
            <img
              className="w-full h-full object-cover"
              alt="Digital twin wireframe overlay of aircraft boxer engine"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7I2HDQ9J8PRPs8Za2hq5e8hBM7jESp36hqRSBV-VOPg9-cC7t0zHCeFaqnEM6ku86xYzkQJE39eKvx8L5RWdu-kQ4XrGczJlwI_qohN6tB7Xhf6D6vTeuvu1n2A5zH5pwB93DfnciVfVD1ne7OWfApX3FWdobpYvsd2xJ42smN43cCdjBvHikue1_WZ7w6Xdqd4oi6Ex9mHb0YdXbT3qijXkg9f3IUSJYqWWKg6Y2jsIFtiClYXqlLw"
            />
            <div className="absolute bottom-1.5 left-2 px-1.5 py-0.5 rounded bg-[#0f233d]/80 text-white font-mono text-[9px] backdrop-blur-sm">
              PINN FLOW PROFILE · C3 EXHAUST
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
