import React, { useState } from 'react';
import { AirframeRecord, SpareItem } from '../../types';

export const CbmLogisticsView: React.FC = () => {
  const [synced, setSynced] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [allocatedItems, setAllocatedItems] = useState<{ [key: string]: boolean }>({
    'UAV-704': true,
  });

  const [airframes, setAirframes] = useState<AirframeRecord[]>([
    {
      id: 'UAV-704',
      subsystemFocus: 'Rotax 915 iSA - C3 Exh Valve',
      totalHours: '842.6h',
      health: 82,
      healthColor: 'amber',
      projectedRul: '118 FLT HRS',
      actionRequired: 'CBM-99-704-B: Expedite Cyl 3 Top Overhaul',
      status: 'Expedited (Bay 4)',
      statusColor: 'amber',
    },
    {
      id: 'UAV-702',
      subsystemFocus: 'Rotax 915 iSA - Turbo Bearing',
      totalHours: '1,024.1h',
      health: 96,
      healthColor: 'green',
      projectedRul: '640 FLT HRS',
      actionRequired: 'Routine Inspection at 1,200h TBO',
      status: 'Scheduled',
      statusColor: 'green',
    },
    {
      id: 'UAV-709',
      subsystemFocus: 'Rotax 915 iSA - Piston Ring 2',
      totalHours: '412.0h',
      health: 94,
      healthColor: 'green',
      projectedRul: '520 FLT HRS',
      actionRequired: 'Nominal Sortie Allocation',
      status: 'Cleared FMC',
      statusColor: 'green',
    },
    {
      id: 'UAV-711',
      subsystemFocus: 'Rotax 915 iSA - Fuel HP Rail',
      totalHours: '780.5h',
      health: 89,
      healthColor: 'blue',
      projectedRul: '290 FLT HRS',
      actionRequired: 'Pulse Purge Injector Stage 1',
      status: 'Queued',
      statusColor: 'blue',
    },
    {
      id: 'UAV-715',
      subsystemFocus: 'Rotax 915 iSA - Scavenge Sump',
      totalHours: '1,180.2h',
      health: 72,
      healthColor: 'red',
      projectedRul: '34 FLT HRS',
      actionRequired: 'Urgent Overhaul / Stage-3 Depot',
      status: 'Depot Grounded',
      statusColor: 'red',
    },
  ]);

  const spares: SpareItem[] = [
    {
      partNumber: 'RTX-915-C3-KIT',
      description: 'Cylinder 3 Head & Exhaust Valve Overhaul Kit',
      stock: 4,
      transit: 2,
      transitNote: 'In Air-Route from Ramstein',
      risk: 'LOW',
      preAllocatedTo: 'UAV-704 & UAV-715',
    },
    {
      partNumber: 'TURBO-GT1549',
      description: 'Garrett Aero-Modified Core Assembly',
      stock: 2,
      transit: 0,
      transitNote: 'On Standby in Depot Safe',
      risk: 'MED',
      preAllocatedTo: 'Unassigned Buffer',
    },
    {
      partNumber: 'INJ-PZO-440',
      description: 'High-Pressure Piezo Injector Pack (x4 Matched)',
      stock: 8,
      transit: 4,
      transitNote: 'Inbound via Naval Air Logistics',
      risk: 'LOW',
      preAllocatedTo: 'UAV-711',
    },
    {
      partNumber: 'RNG-LIN-915',
      description: 'Piston Ring & Ceramic-Nikasil Cylinder Liner',
      stock: 1,
      transit: 3,
      transitNote: 'Delayed in Rota Hub (Customs Hold)',
      risk: 'HIGH CRITICAL',
      preAllocatedTo: 'UAV-715',
    },
  ];

  const handleSyncErp = () => {
    setSynced(true);
    setToastMessage('Synchronizing supply ledger with Defense Logistics Agency (DLA) WebFLIS...');
    setTimeout(() => {
      setToastMessage('DLA WebFLIS Sync Complete: Inventory refreshed with Sigonella Depot.');
      setTimeout(() => setToastMessage(null), 3000);
    }, 1200);
  };

  const handleGenerateManifest = () => {
    setToastMessage('Generating Automated DD Form 1348-1A Depot Requisition Manifest...');
    setTimeout(() => {
      setToastMessage('Manifest generated and queued for Flight Line Maintenance Officer sign-off.');
      setTimeout(() => setToastMessage(null), 3000);
    }, 1200);
  };

  const toggleAllocation = (id: string) => {
    setAllocatedItems((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      setToastMessage(next[id] ? `${id} parts kit reserved in Hangar Bay 4` : `${id} parts kit unassigned`);
      setTimeout(() => setToastMessage(null), 2500);
      return next;
    });
  };

  return (
    <div className="flex flex-col w-full px-4 lg:px-6 py-4 max-w-7xl mx-auto space-y-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#0f233d] text-white px-4 py-2.5 rounded-lg shadow-xl border border-[#1b64da] flex items-center gap-2 animate-bounce text-sm">
          <span className="material-symbols-outlined text-[#10b981] text-[18px]">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Fleet Header Strip */}
      <section className="w-full">
        <div className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-4 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 lg:gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#ebf3ff] flex items-center justify-center text-[#1b64da] border border-[#dce9ff]">
                <span className="material-symbols-outlined text-[24px]">precision_manufacturing</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[14px] text-[#0f233d]">
                    FLEET CBM+ READINESS DIRECTIVE
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#ebf3ff] text-[#0037b0] uppercase font-bold">
                    Sigonella AEW
                  </span>
                </div>
                <p className="font-mono text-[10px] text-[#4d5f7c] tracking-wide mt-0.5">
                  14 OF 16 AIRFRAMES MISSION CAPABLE (FMC: 87.5%)
                </p>
              </div>
            </div>

            <div className="h-8 w-px bg-[#dce9ff] hidden md:block"></div>

            <div className="flex items-center gap-4 sm:gap-6">
              <div>
                <span className="font-mono text-[10px] text-[#4d5f7c] block uppercase font-semibold">
                  Critical Spare Kit Allocations
                </span>
                <span className="font-mono text-[12px] text-[#0037b0] font-bold">
                  12 KITS IN THEATER
                </span>
              </div>

              <div className="h-6 w-px bg-[#dce9ff]"></div>

              <div>
                <span className="font-mono text-[10px] text-[#4d5f7c] block uppercase font-semibold">
                  Auto Logistics Optimization
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
                  <span className="font-mono text-[10px] text-[#004f35] font-bold uppercase">
                    Active MIL-STD-3008F
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full xl:w-auto justify-end">
            <button
              onClick={handleSyncErp}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dce9ff] transition-colors font-bold text-[13px] border border-[#dce9ff]"
            >
              <span className={`material-symbols-outlined text-[18px] text-[#1b64da] ${synced ? 'text-[#10b981]' : ''}`}>
                cloud_sync
              </span>
              <span>Sync Supply ERP</span>
            </button>
            <button
              onClick={handleGenerateManifest}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1d4ed8] text-white font-bold text-[13px] shadow-sm hover:bg-[#0037b0] transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">receipt_long</span>
              <span>Generate Depot Manifest</span>
            </button>
          </div>
        </div>
      </section>

      {/* Section 1: Airframes Propulsion Health Table */}
      <section className="w-full bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-4 lg:p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0]">
          <div>
            <h2 className="font-bold text-[15px] text-[#0f233d] uppercase tracking-wide">
              Fleet Propulsion Health &amp; CBM Interventions
            </h2>
            <p className="text-[12px] text-[#4d5f7c]">
              Real-time synchronization between on-wing PINN prognostics and depot work orders
            </p>
          </div>
          <span className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-[#eff4ff] text-[#0037b0] font-bold border border-[#dce9ff]">
            5 ACTIVE PROFILES
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-[12px]">
            <thead>
              <tr className="bg-[#eff4ff] text-[#4d5f7c] font-mono text-[10px] uppercase border-b border-[#e2e8f0]">
                <th className="py-2.5 px-3 rounded-l-lg">Airframe ID</th>
                <th className="py-2.5 px-3">Subsystem Focus</th>
                <th className="py-2.5 px-3 text-right">Airframe Hrs</th>
                <th className="py-2.5 px-3 text-center">Health</th>
                <th className="py-2.5 px-3 text-right">Projected RUL</th>
                <th className="py-2.5 px-3">Action Required</th>
                <th className="py-2.5 px-3 text-right rounded-r-lg">Dispatch Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eff4ff]">
              {airframes.map((airframe) => (
                <tr
                  key={airframe.id}
                  className={`transition-colors hover:bg-[#eff4ff]/60 ${
                    airframe.id === 'UAV-704' ? 'bg-[#fffbeb]/50' : ''
                  }`}
                >
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          airframe.healthColor === 'green'
                            ? 'bg-[#10b981]'
                            : airframe.healthColor === 'amber'
                            ? 'bg-[#f59e0b]'
                            : airframe.healthColor === 'blue'
                            ? 'bg-[#1b64da]'
                            : 'bg-[#ef4444]'
                        }`}
                      ></span>
                      <span className="font-bold text-[13px] text-[#0f233d] font-sans">
                        {airframe.id}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-[#4d5f7c] font-sans text-[13px]">
                    {airframe.subsystemFocus}
                  </td>
                  <td className="py-3 px-3 text-right text-[#0f233d] font-bold">
                    {airframe.totalHours}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                        airframe.healthColor === 'green'
                          ? 'bg-[#eafaf1] text-[#004f35]'
                          : airframe.healthColor === 'amber'
                          ? 'bg-[#fffbeb] text-[#d97706]'
                          : airframe.healthColor === 'blue'
                          ? 'bg-[#ebf3ff] text-[#0037b0]'
                          : 'bg-[#fee2e2] text-[#ef4444]'
                      }`}
                    >
                      {airframe.health}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-[#0f233d]">
                    {airframe.projectedRul}
                  </td>
                  <td className="py-3 px-3 text-[#0b1c30] font-sans text-[12px]">
                    {airframe.actionRequired}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => toggleAllocation(airframe.id)}
                      className={`px-3 py-1 rounded text-[11px] font-bold font-mono transition-all shadow-sm ${
                        allocatedItems[airframe.id]
                          ? 'bg-[#10b981] text-white'
                          : airframe.statusColor === 'red'
                          ? 'bg-[#ef4444] text-white'
                          : 'bg-[#1d4ed8] text-white hover:bg-[#0037b0]'
                      }`}
                    >
                      {allocatedItems[airframe.id] ? 'Allocated ✓' : airframe.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 2: Predictive Spares Allocation & Theater Logistics (8 cols vs 4 cols) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full">
        {/* Left: Forward Stock Level & Pre-positioning Matrix (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-4 lg:p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#1b64da] text-[20px]">inventory_2</span>
                <h3 className="font-bold text-[15px] text-[#0f233d] uppercase tracking-wide">
                  Forward Stock Levels &amp; Pre-positioning Matrix
                </h3>
              </div>
              <span className="font-mono text-[10px] text-[#4d5f7c]">DEPOT: SIGONELLA FORWARD WAREHOUSE</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              {spares.map((spare) => (
                <div
                  key={spare.partNumber}
                  className="bg-[#eff4ff]/60 rounded-xl p-3.5 border border-[#dce9ff] flex flex-col justify-between space-y-2 hover:shadow-sm transition-shadow"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold text-[#0037b0]">
                        {spare.partNumber}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold uppercase ${
                          spare.risk === 'LOW'
                            ? 'bg-[#eafaf1] text-[#004f35]'
                            : spare.risk === 'MED'
                            ? 'bg-[#fffbeb] text-[#d97706]'
                            : 'bg-[#fee2e2] text-[#ef4444] animate-pulse'
                        }`}
                      >
                        Risk: {spare.risk}
                      </span>
                    </div>
                    <h4 className="font-bold text-[13px] text-[#0f233d] mt-1 leading-snug">
                      {spare.description}
                    </h4>
                  </div>

                  <div className="bg-white rounded-lg p-2 border border-[#e2e8f0] space-y-1 font-mono text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-[#4d5f7c]">On Hand:</span>
                      <span className="font-bold text-[#0f233d]">{spare.stock} Units</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#4d5f7c]">In Transit:</span>
                      <span className="font-bold text-[#1b64da]">+{spare.transit} ({spare.transitNote})</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-[#e2e8f0] pt-1">
                      <span className="text-[#4d5f7c]">Reserved:</span>
                      <span className="font-bold text-[#004f35]">{spare.preAllocatedTo}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#e2e8f0] text-[#4d5f7c] font-mono text-[11px]">
            <span>Last inventory cycle count: 2h ago</span>
            <span className="text-[#0037b0] font-bold">Automatic re-order trigger: 2 units</span>
          </div>
        </div>

        {/* Right: Drone Hangar Bay 4 Turnaround Schedule (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-4 lg:p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#f59e0b] text-[20px]">engineering</span>
                <h3 className="font-bold text-[14px] text-[#0f233d] uppercase tracking-wide">
                  Hangar Bay 4 Schedule
                </h3>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-[#fffbeb] text-[#d97706] font-mono text-[10px] font-bold">
                PRIORITY 1
              </span>
            </div>

            <div className="space-y-3 mt-3">
              <div className="p-3 bg-[#eff4ff] rounded-lg border border-[#dce9ff] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[13px] text-[#0f233d]">UAV-704 Top Overhaul</span>
                  <span className="font-mono text-[12px] text-[#d97706] font-bold">14.5 HRS</span>
                </div>
                <p className="text-[12px] text-[#434655]">
                  Cylinder 3 head removal, exhaust valve seat inspection, and precision lap seating.
                </p>
              </div>

              <div className="space-y-2 text-[12px]">
                <div className="flex items-center justify-between p-2 rounded bg-white border border-[#e2e8f0]">
                  <span className="text-[#4d5f7c]">Specialized Tooling:</span>
                  <span className="font-mono font-bold text-[#0f233d]">Rotax Valve Rig #T-915-V</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-white border border-[#e2e8f0]">
                  <span className="text-[#4d5f7c]">Assigned Crew:</span>
                  <span className="font-bold text-[#0f233d]">Tech Sgt Martinez + Spc Chen</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-white border border-[#e2e8f0]">
                  <span className="text-[#4d5f7c]">Target Return to FMC:</span>
                  <span className="font-mono font-bold text-[#10b981]">Tomorrow 0600Z</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#eafaf1] rounded-lg border border-[#bbf7d0] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#10b981] text-[20px]">task_alt</span>
            <span className="font-mono text-[11px] text-[#004f35] font-semibold">
              Restores UAV-704 Full Mission Capability rating to 100%.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
