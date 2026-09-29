import React, { useState } from 'react';
import { ShieldCheck, Activity, Cpu, Gauge, Zap } from 'lucide-react';

interface SketchfabViewerProps {
  onOpenCockpit?: () => void;
}

export function SketchfabViewer({ onOpenCockpit }: SketchfabViewerProps) {
  const [activeTelemetry, setActiveTelemetry] = useState<'nominal' | 'stress'>('nominal');

  return (
    <div className="w-full bg-white text-gray-900 rounded-3xl border border-gray-200/90 shadow-xl shadow-gray-200/40 overflow-hidden p-4 sm:p-6 lg:p-8">
      {/* Header Info Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-200/80 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[12px] font-mono tracking-wider text-emerald-700 font-semibold uppercase">
              Tactical Surveillance Asset • In-Flight Telemetry
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900 flex items-center gap-3">
            UAV Elang Hitam (MALE Recon Airframe)
            <span className="text-xs bg-gray-100 border border-gray-200 text-gray-700 px-2.5 py-1 rounded-full font-mono font-normal">
              UAV-014 Reference
            </span>
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            4-Cylinder Turbocharged Rotax 914/915 iS Aero-Piston Propulsion Unit • 18,000 ft Mission Envelope
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-gray-100 border border-gray-200/80 rounded-xl p-1 flex items-center text-xs">
            <button
              onClick={() => setActiveTelemetry('nominal')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTelemetry === 'nominal'
                  ? 'bg-gray-900 text-white font-medium shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Nominal Cruise (FL140)
            </button>
            <button
              onClick={() => setActiveTelemetry('stress')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTelemetry === 'stress'
                  ? 'bg-[#F26522] text-white font-medium shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
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

      {/* Main 3D Stage with Embedded Sketchfab Viewer */}
      <div className="relative mt-6 rounded-2xl overflow-hidden bg-[#f4f6f8] border border-gray-200/90 aspect-[16/9] min-h-[460px] lg:min-h-[580px]">
        {/* Sketchfab Iframe Wrapper with top and bottom crop to eliminate store, share, and watermark buttons */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            title="UAV Elang Hitam"
            frameBorder="0"
            allowFullScreen
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            xr-spatial-tracking
            execution-while-out-of-viewport
            execution-while-not-rendered
            web-share
            src="https://sketchfab.com/models/51ea139d20a248398d42a9404f197516/embed?autostart=1&camera=0&preload=0&ui_theme=dark&ui_controls=0&ui_watermark=0&ui_infos=0&ui_stop=0"
            className="w-[calc(100%+60px)] h-[calc(100%+104px)] -mt-[52px] -mb-[52px] -ml-[30px] block"
          />
        </div>

        {/* Live Flight Telemetry Status (Top-Right) */}
        <div className="absolute top-4 right-4 z-20 pointer-events-none">
          <div className="bg-white/92 backdrop-blur-md border border-gray-200 text-gray-800 text-[11px] font-mono px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>360° LIVE ORBIT</span>
          </div>
        </div>

        {/* Live HUD Floating Badges Overlay (Top-Left) */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none flex flex-col gap-2">
          <div className="bg-white/92 backdrop-blur-md border border-gray-200/90 rounded-xl p-3 shadow-md max-w-xs text-xs pointer-events-auto">
            <div className="flex items-center justify-between font-mono text-[11px] text-gray-500 mb-1 border-b border-gray-100 pb-1">
              <span>CAN 2.0B TELEMETRY</span>
              <span className="text-emerald-600 font-bold">5 Hz SYNCHRONIZED</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2 font-mono text-[12px]">
              <div>
                <span className="text-gray-400 text-[10px] block">ENGINE RPM</span>
                <span className="text-gray-900 font-semibold">{activeTelemetry === 'nominal' ? '5,180' : '5,640'} RPM</span>
              </div>
              <div>
                <span className="text-gray-400 text-[10px] block">MAP BOOST</span>
                <span className="text-gray-900 font-semibold">{activeTelemetry === 'nominal' ? '36.2 inHg' : '41.5 inHg'}</span>
              </div>
              <div>
                <span className="text-gray-400 text-[10px] block">CYL #3 CHT</span>
                <span className={activeTelemetry === 'nominal' ? 'text-emerald-700 font-semibold' : 'text-amber-600 font-semibold'}>
                  {activeTelemetry === 'nominal' ? '184.2°C' : '208.6°C'}
                </span>
              </div>
              <div>
                <span className="text-gray-400 text-[10px] block">TRUST INDEX T</span>
                <span className="text-blue-600 font-semibold">0.984 (HEALTHY)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Corner Watermark Mask (Bottom-Left) */}
        <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
          <div className="bg-white/92 backdrop-blur-md border border-gray-200 text-gray-700 text-[11px] font-mono px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>AERIS-TWIN 3D MISSION ASSET</span>
          </div>
        </div>

        {/* Diagnostic Hotspot Overlay (Bottom-Right) */}
        <div className="absolute bottom-4 right-4 z-20 pointer-events-none flex flex-col gap-2">
          <div className="bg-white/92 backdrop-blur-md border border-gray-200/90 rounded-xl p-3 shadow-md max-w-sm text-xs pointer-events-auto">
            <div className="flex items-center gap-2 text-gray-900 font-semibold mb-1">
              <ShieldCheck size={16} className="text-emerald-600" />
              <span>AERIS-TWIN Non-Intrusive Sniffer</span>
            </div>
            <p className="text-gray-600 text-[11.5px] leading-relaxed">
              Passively monitoring dual-redundant CAN bus without FADEC flight disruption. DO-178C software-first architecture verified.
            </p>
          </div>
        </div>
      </div>

      {/* Subsystem Telemetry Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
        <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-3.5 hover:border-gray-300 transition-all">
          <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
            <Gauge size={14} className="text-blue-600" />
            <span>ASI Index</span>
          </div>
          <div className="text-lg font-bold text-gray-900">
            {activeTelemetry === 'nominal' ? '12.4' : '31.8'}{' '}
            <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full font-mono font-medium">NORMAL</span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">Isolation forest anomaly score</p>
        </div>

        <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-3.5 hover:border-gray-300 transition-all">
          <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
            <Cpu size={14} className="text-[#F26522]" />
            <span>Edge Compute SWaP</span>
          </div>
          <div className="text-lg font-bold text-gray-900">
            1.42 W <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full font-mono font-medium">&lt; 2W LIMIT</span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">TensorRT INT8 optimized pipeline</p>
        </div>

        <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-3.5 hover:border-gray-300 transition-all">
          <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
            <Zap size={14} className="text-amber-500" />
            <span>RUL Horizon</span>
          </div>
          <div className="text-lg font-bold text-gray-900">
            482.5 hrs <span className="text-xs text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded-full font-mono font-medium">Q50 MEDIAN</span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">PINN + EKF dynamic forecasting</p>
        </div>

        <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-3.5 hover:border-gray-300 transition-all">
          <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>Prescriptive Trim</span>
          </div>
          <div className="text-lg font-bold text-emerald-700">
            {activeTelemetry === 'nominal' ? 'STANDBY' : '-600m / 88%'}
          </div>
          <p className="text-[11px] text-gray-500 mt-1">Pareto in-flight thermal trim</p>
        </div>
      </div>
    </div>
  );
}
