import React, { useState } from 'react';
import { ShieldCheck, Activity, Cpu, Gauge, Zap, Warehouse, Plane, Compass, Lightbulb, MapPin } from 'lucide-react';

interface SketchfabViewerProps {
  onOpenCockpit?: () => void;
}

export function SketchfabViewer({ onOpenCockpit }: SketchfabViewerProps) {
  const [activeTelemetry, setActiveTelemetry] = useState<'nominal' | 'stress'>('nominal');
  const [currentEnv, setCurrentEnv] = useState<'hangar' | 'runway' | 'cyber'>('hangar');
  const [showPins, setShowPins] = useState<boolean>(true);
  const [spotlightsOn, setSpotlightsOn] = useState<boolean>(true);

  return (
    <div className="w-full bg-[#0a0f18] text-white rounded-3xl border border-gray-800 shadow-2xl overflow-hidden p-4 sm:p-6 lg:p-8 transition-colors duration-500">
      {/* Header Info Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-800 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[12px] font-mono tracking-wider text-emerald-400 font-semibold uppercase">
              Tactical Surveillance Asset • In-Flight Telemetry
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white flex items-center gap-3">
            UAV Elang Hitam (MALE Recon Airframe)
            <span className="text-xs bg-gray-800/80 border border-gray-700 text-gray-300 px-2.5 py-1 rounded-full font-mono font-normal">
              UAV-014 Reference
            </span>
          </h3>
          <p className="text-gray-400 text-sm mt-1">
            4-Cylinder Turbocharged Rotax 914/915 iS Aero-Piston Propulsion Unit • 18,000 ft Mission Envelope
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-3">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-1 flex items-center text-xs">
            <button
              onClick={() => setActiveTelemetry('nominal')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTelemetry === 'nominal'
                  ? 'bg-white text-gray-900 font-medium shadow-xs'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Nominal Cruise (FL140)
            </button>
            <button
              onClick={() => setActiveTelemetry('stress')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTelemetry === 'stress'
                  ? 'bg-[#F26522] text-white font-medium shadow-xs'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Himalayan Climb (+5,800m)
            </button>
          </div>

          {onOpenCockpit && (
            <button
              onClick={onOpenCockpit}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-[#F26522] hover:from-orange-600 hover:to-[#e05a1a] text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <Activity size={15} />
              Open Live Twin Cockpit
            </button>
          )}
        </div>
      </div>

      {/* Environment Switcher Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-5 px-1">
        <div className="flex items-center gap-2 bg-gray-900/90 border border-gray-800 p-1 rounded-xl">
          <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider px-2">Environment:</span>
          <button
            onClick={() => setCurrentEnv('hangar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentEnv === 'hangar'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
            }`}
          >
            <Warehouse size={14} />
            <span>Tactical Hangar</span>
          </button>
          <button
            onClick={() => setCurrentEnv('runway')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentEnv === 'runway'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
            }`}
          >
            <Plane size={14} />
            <span>Mountain Runway</span>
          </button>
          <button
            onClick={() => setCurrentEnv('cyber')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentEnv === 'cyber'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
            }`}
          >
            <Compass size={14} />
            <span>Cyber Telemetry HUD</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPins(!showPins)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all ${
              showPins
                ? 'bg-gray-900 border-gray-700 text-emerald-400'
                : 'bg-gray-950 border-gray-800 text-gray-500'
            }`}
          >
            <MapPin size={13} className={showPins ? 'text-emerald-400' : 'text-gray-600'} />
            <span>Pins: {showPins ? 'ON' : 'OFF'}</span>
          </button>
          <button
            onClick={() => setSpotlightsOn(!spotlightsOn)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all ${
              spotlightsOn
                ? 'bg-gray-900 border-gray-700 text-amber-300'
                : 'bg-gray-950 border-gray-800 text-gray-500'
            }`}
          >
            <Lightbulb size={13} className={spotlightsOn ? 'text-amber-400' : 'text-gray-600'} />
            <span>Spotlights</span>
          </button>
        </div>
      </div>

      {/* Main 3D Stage with Embedded Sketchfab Viewer & Multi-Environment Backdrop */}
      <div className="relative mt-4 rounded-2xl overflow-hidden border border-gray-800 aspect-[16/9] min-h-[480px] lg:min-h-[600px] select-none">
        {/* ========================================================================= */}
        {/* 1. TACTICAL HANGAR BAY ENVIRONMENT                                       */}
        {/* ========================================================================= */}
        {currentEnv === 'hangar' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden bg-gradient-to-b from-[#0b101b] via-[#121927] to-[#070b12]">
            {/* Ceiling Industrial Truss Beams */}
            <div
              className="absolute top-0 inset-x-0 h-44 opacity-25"
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 2px, transparent 2px, transparent 60px), repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 60px)'
              }}
            />
            {/* Overhead Spotlight Cone */}
            {spotlightsOn && (
              <div
                className="absolute -top-10 left-1/2 -translate-x-1/2 w-[700px] h-[550px] opacity-80 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 55% 45% at 50% 15%, rgba(220, 240, 255, 0.22) 0%, rgba(100, 160, 255, 0.08) 50%, transparent 80%)'
                }}
              />
            )}
            {/* Reflective Concrete Ground Plane */}
            <div
              className="absolute bottom-0 inset-x-0 h-48 opacity-90"
              style={{
                background: 'linear-gradient(to top, rgba(14, 20, 32, 0.95), rgba(18, 25, 40, 0.4) 60%, transparent)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)'
              }}
            />
            {/* Yellow/Black Hangar Safety Marking Line */}
            <div className="absolute bottom-6 inset-x-8 flex items-center justify-between opacity-70">
              <div className="h-1 flex-1 bg-[repeating-linear-gradient(45deg,#eab308,#eab308_10px,#000_10px,#000_20px)] rounded" />
              <span className="font-mono text-[10px] text-yellow-500/80 px-4 tracking-wider">
                BAY 04 // TACTICAL AIRFRAME INSPECTION // READY
              </span>
              <div className="h-1 flex-1 bg-[repeating-linear-gradient(45deg,#eab308,#eab308_10px,#000_10px,#000_20px)] rounded" />
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. MOUNTAIN RUNWAY TARMAC ENVIRONMENT                                    */}
        {/* ========================================================================= */}
        {currentEnv === 'runway' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden bg-gradient-to-b from-[#090e17] via-[#161c28] to-[#0a0e14]">
            {/* Twilight Horizon Atmospheric Glow */}
            <div
              className="absolute top-1/3 inset-x-0 h-44 opacity-60"
              style={{
                background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(242, 101, 34, 0.22) 0%, rgba(67, 56, 202, 0.12) 60%, transparent 90%)'
              }}
            />
            {/* Distant Mountain Silhouettes */}
            <svg
              className="absolute bottom-36 inset-x-0 w-full h-32 opacity-25 text-[#1a2333]"
              viewBox="0 0 1200 200"
              preserveAspectRatio="none"
              fill="currentColor"
            >
              <polygon points="0,200 0,140 180,70 320,120 460,50 640,110 820,40 1000,100 1200,60 1200,200" />
            </svg>
            {/* Asphalt Tarmac Runway */}
            <div
              className="absolute bottom-0 inset-x-0 h-52"
              style={{
                background: 'linear-gradient(to top, #0f131a 0%, #151a24 70%, transparent 100%)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)'
              }}
            >
              {/* Runway Centerline Dashes */}
              <div className="absolute bottom-16 inset-x-0 flex justify-center gap-12 opacity-60">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-16 h-1.5 bg-yellow-400 rounded-sm shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
                ))}
              </div>
              {/* Flashing Runway Threshold Beacons */}
              <div className="absolute bottom-8 inset-x-12 flex justify-between">
                <div className="flex gap-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shadow-[0_0_12px_#34d399]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                </div>
                <div className="flex gap-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping shadow-[0_0_12px_#fbbf24]" />
                </div>
              </div>
            </div>
            {/* Runway Readout Status */}
            <div className="absolute bottom-4 inset-x-0 text-center font-mono text-[10px] text-emerald-400/80 tracking-widest">
              RWY 09L · ELEV 1,420M · QNH 1013 HPA · FL195 SORTIE READY
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. CYBER TELEMETRY HUD ENVIRONMENT                                       */}
        {/* ========================================================================= */}
        {currentEnv === 'cyber' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden bg-[#030712]">
            {/* Perspective Cyber Grid Floor */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'linear-gradient(rgba(16, 185, 129, 0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.18) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                transform: 'perspective(600px) rotateX(60deg) translateY(120px) scale(1.6)',
                transformOrigin: 'bottom center'
              }}
            />
            {/* Concentric Radar Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-emerald-500/20 pointer-events-none">
              <div className="absolute inset-10 rounded-full border border-emerald-500/15" />
              <div className="absolute inset-24 rounded-full border border-dashed border-emerald-500/25 animate-spin [animation-duration:30s]" />
              <div className="absolute inset-40 rounded-full border border-emerald-500/10" />
            </div>
            {/* Telemetry Corner Targeting Reticles */}
            <div className="absolute top-16 left-8 font-mono text-[10px] text-emerald-400/70 border-l border-t border-emerald-500/40 p-2">
              GEO-LOCK: 34°22&apos;N, 77°35&apos;E<br />ALT: 5,800M ASL
            </div>
            <div className="absolute top-16 right-8 font-mono text-[10px] text-emerald-400/70 border-r border-t border-emerald-500/40 p-2 text-right">
              TARGET HDG: 084°<br />SPEED: MACH 0.38
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SKETCHFAB 3D MODEL IFRAME EMBED (TRANSPARENT BACKGROUND)                 */}
        {/* ========================================================================= */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-10">
          <iframe
            title="UAV Elang Hitam Tactical MALE Airframe"
            frameBorder="0"
            allowFullScreen
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            xr-spatial-tracking
            execution-while-out-of-viewport
            execution-while-not-rendered
            web-share
            src="https://sketchfab.com/models/51ea139d20a248398d42a9404f197516/embed?autostart=1&camera=0&preload=0&transparent=1&ui_theme=dark&ui_controls=0&ui_watermark=0&ui_infos=0&ui_stop=0"
            className="w-[calc(100%+60px)] h-[calc(100%+104px)] -mt-[52px] -mb-[52px] -ml-[30px] block"
          />
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE TELEMETRY PINS OVERLAY                                       */}
        {/* ========================================================================= */}
        {showPins && (
          <div className="absolute inset-0 z-20 pointer-events-none">
            {/* Pin 1: Nose Sensor Gimbal */}
            <div className="absolute top-[56%] left-[33%] pointer-events-auto group">
              <div className="relative flex items-center justify-center">
                <span className="w-4 h-4 rounded-full bg-emerald-500/40 animate-ping absolute" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-white shadow-lg cursor-pointer" />
              </div>
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-900/95 border border-emerald-500/50 rounded-lg p-2 shadow-xl whitespace-nowrap z-30">
                <div className="text-[10px] font-mono text-emerald-400 font-bold">EO/IR FLIR GIMBAL</div>
                <div className="text-[9.5px] text-gray-300">4K Multi-Spectral Target Tracking</div>
              </div>
            </div>

            {/* Pin 2: Rotax 915 iS Turbo Engine */}
            <div className="absolute top-[38%] left-[68%] pointer-events-auto group">
              <div className="relative flex items-center justify-center">
                <span className="w-4 h-4 rounded-full bg-orange-500/40 animate-ping absolute" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#F26522] border border-white shadow-lg cursor-pointer" />
              </div>
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-900/95 border border-orange-500/50 rounded-lg p-2 shadow-xl whitespace-nowrap z-30">
                <div className="text-[10px] font-mono text-orange-400 font-bold">ROTAX 915 iS TURBO</div>
                <div className="text-[9.5px] text-gray-300">141 HP · PINN Surrogate Active</div>
              </div>
            </div>

            {/* Pin 3: Pusher Propeller Governor */}
            <div className="absolute top-[48%] left-[74%] pointer-events-auto group">
              <div className="relative flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 border border-white shadow-lg cursor-pointer" />
              </div>
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-900/95 border border-blue-500/50 rounded-lg p-2 shadow-xl whitespace-nowrap z-30">
                <div className="text-[10px] font-mono text-blue-400 font-bold">PUSHER PROPELLER</div>
                <div className="text-[9.5px] text-gray-300">3-Blade Constant Speed Hydr. Prop</div>
              </div>
            </div>
          </div>
        )}

        {/* Live Flight Telemetry Status (Top-Right) */}
        <div className="absolute top-4 right-4 z-20 pointer-events-none">
          <div className="bg-gray-900/85 backdrop-blur-md border border-gray-700/80 text-gray-200 text-[11px] font-mono px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>360° LIVE ORBIT</span>
          </div>
        </div>

        {/* Live HUD Floating Badges Overlay (Top-Left) */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none flex flex-col gap-2">
          <div className="bg-gray-900/85 backdrop-blur-md border border-gray-700/80 rounded-xl p-3 shadow-lg max-w-xs text-xs pointer-events-auto">
            <div className="flex items-center justify-between font-mono text-[11px] text-gray-400 mb-1 border-b border-gray-800 pb-1">
              <span>CAN 2.0B TELEMETRY</span>
              <span className="text-emerald-400 font-bold">5 Hz SYNCHRONIZED</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2 font-mono text-[12px]">
              <div>
                <span className="text-gray-400 text-[10px] block">ENGINE RPM</span>
                <span className="text-white font-semibold">{activeTelemetry === 'nominal' ? '5,180' : '5,640'} RPM</span>
              </div>
              <div>
                <span className="text-gray-400 text-[10px] block">MAP BOOST</span>
                <span className="text-white font-semibold">{activeTelemetry === 'nominal' ? '36.2 inHg' : '41.5 inHg'}</span>
              </div>
              <div>
                <span className="text-gray-400 text-[10px] block">CYL #3 CHT</span>
                <span className={activeTelemetry === 'nominal' ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-semibold'}>
                  {activeTelemetry === 'nominal' ? '184.2°C' : '208.6°C'}
                </span>
              </div>
              <div>
                <span className="text-gray-400 text-[10px] block">TRUST INDEX T</span>
                <span className="text-blue-400 font-semibold">0.984 (HEALTHY)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Corner Watermark Mask (Bottom-Left) */}
        <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
          <div className="bg-gray-900/85 backdrop-blur-md border border-gray-700/80 text-gray-300 text-[11px] font-mono px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>
              {currentEnv === 'hangar' && 'AERIS-TWIN · HANGAR BAY 04'}
              {currentEnv === 'runway' && 'AERIS-TWIN · TACTICAL RUNWAY 09L'}
              {currentEnv === 'cyber' && 'AERIS-TWIN · CYBER HUD'}
            </span>
          </div>
        </div>

        {/* Diagnostic Hotspot Overlay (Bottom-Right) */}
        <div className="absolute bottom-4 right-4 z-20 pointer-events-none flex flex-col gap-2">
          <div className="bg-gray-900/85 backdrop-blur-md border border-gray-700/80 rounded-xl p-3 shadow-lg max-w-sm text-xs pointer-events-auto">
            <div className="flex items-center gap-2 text-white font-semibold mb-1">
              <ShieldCheck size={16} className="text-emerald-400" />
              <span>AERIS-TWIN Non-Intrusive Sniffer</span>
            </div>
            <p className="text-gray-400 text-[11.5px] leading-relaxed">
              Passively monitoring dual-redundant CAN bus without FADEC flight disruption. DO-178C software-first architecture verified.
            </p>
          </div>
        </div>
      </div>

      {/* Subsystem Telemetry Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
        <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-3.5 hover:border-gray-700 transition-all">
          <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
            <Gauge size={14} className="text-blue-400" />
            <span>ASI Index</span>
          </div>
          <div className="text-lg font-bold text-white">
            {activeTelemetry === 'nominal' ? '12.4' : '31.8'}{' '}
            <span className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-1.5 py-0.5 rounded-full font-mono font-medium">NORMAL</span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">Isolation forest anomaly score</p>
        </div>

        <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-3.5 hover:border-gray-700 transition-all">
          <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
            <Cpu size={14} className="text-[#F26522]" />
            <span>Edge Compute SWaP</span>
          </div>
          <div className="text-lg font-bold text-white">
            1.42 W <span className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-1.5 py-0.5 rounded-full font-mono font-medium">&lt; 2W LIMIT</span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">TensorRT INT8 optimized pipeline</p>
        </div>

        <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-3.5 hover:border-gray-700 transition-all">
          <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
            <Zap size={14} className="text-amber-400" />
            <span>RUL Horizon</span>
          </div>
          <div className="text-lg font-bold text-white">
            482.5 hrs <span className="text-xs text-blue-400 bg-blue-950/60 border border-blue-800/80 px-1.5 py-0.5 rounded-full font-mono font-medium">Q50 MEDIAN</span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">PINN + EKF dynamic forecasting</p>
        </div>

        <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-3.5 hover:border-gray-700 transition-all">
          <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Prescriptive Trim</span>
          </div>
          <div className="text-lg font-bold text-emerald-400">
            {activeTelemetry === 'nominal' ? 'STANDBY' : '-600m / 88%'}
          </div>
          <p className="text-[11px] text-gray-500 mt-1">Pareto in-flight thermal trim</p>
        </div>
      </div>
    </div>
  );
}
