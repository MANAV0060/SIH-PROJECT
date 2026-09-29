import os
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch, Circle, Rectangle, Polygon
import numpy as np

os.makedirs('assets', exist_ok=True)
plt.rcParams['font.sans-serif'] = 'Arial'
plt.rcParams['font.family'] = 'sans-serif'

def build_hardware_architecture_diagram():
    # 16:9 canvas matching the template layout in WhatsApp Image 2026-09-24 at 1.25.25 PM (1).jpeg
    fig, ax = plt.subplots(figsize=(13.333, 7.5), dpi=260)
    fig.patch.set_facecolor('#FFFFFF')
    ax.set_facecolor('#FFFFFF')
    ax.set_xlim(0, 13.333)
    ax.set_ylim(0, 7.5)
    ax.axis('off')

    # Unified Professional Slate Palette (Clean neutral borders, 100% black text)
    c_card_bg = '#F8FAFC'
    c_border_slate = '#475569'   # Crisp neutral slate border (eliminates color clutter)
    c_black = '#000000'          # 100% Solid Black for all text
    c_red_line = '#DC2626'       # Subtle power line accent

    def draw_dashed_card(x, y, w, h, bg=c_card_bg, border=c_border_slate, lw=1.6):
        box = FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.08,rounding_size=0.18",
                             facecolor=bg, edgecolor=border, linewidth=lw, linestyle='--')
        ax.add_patch(box)
        return box

    # =========================================================================
    # 1. LEFT COLUMN: SENSOR UNITS & ENGINE TELEMETRY
    # =========================================================================
    
    # 1A. Top Left: 4-Cylinder Thermal Sensor Array
    draw_dashed_card(0.4, 5.1, 2.7, 1.95)
    circ1 = Circle((0.85, 6.45), 0.32, facecolor='#E2E8F0', edgecolor='#0F172A', lw=1.8)
    ax.add_patch(circ1)
    # Vector thermometer inside circle
    ax.plot([0.85, 0.85], [6.32, 6.58], color='#000000', lw=3.2, solid_capstyle='round')
    ax.add_patch(Circle((0.85, 6.3), 0.08, facecolor='#000000', edgecolor='none'))
    
    ax.text(1.3, 6.58, "4-Cylinder Thermal", fontsize=11.5, fontweight='bold', color=c_black)
    ax.text(1.3, 6.30, "Sensor Array", fontsize=11.5, fontweight='bold', color=c_black)
    ax.text(0.55, 5.92, "• 4x CHT Thermocouples (K-Type)", fontsize=9.6, color=c_black, fontweight='bold')
    ax.text(0.55, 5.58, "• 4x Fast-Response EGT Probes", fontsize=9.6, color=c_black, fontweight='bold')
    ax.text(0.55, 5.24, "• Sub-2ms sampling per cylinder", fontsize=9.2, color=c_black)

    # 1B. Middle Left: Manifold Pressure & RPM Pulse Probes
    draw_dashed_card(0.4, 2.8, 2.7, 2.05)
    circ2 = Circle((0.85, 4.25), 0.32, facecolor='#E2E8F0', edgecolor='#0F172A', lw=1.8)
    ax.add_patch(circ2)
    # Vector gear inside circle
    ax.add_patch(Circle((0.85, 4.25), 0.18, facecolor='none', edgecolor='#000000', lw=2.0))
    for ang in range(0, 360, 45):
        rad = np.radians(ang)
        ax.plot([0.85 + 0.16*np.cos(rad), 0.85 + 0.24*np.cos(rad)],
                [4.25 + 0.16*np.sin(rad), 4.25 + 0.24*np.sin(rad)], color='#000000', lw=2.0)
    ax.add_patch(Circle((0.85, 4.25), 0.07, facecolor='#000000', edgecolor='none'))

    ax.text(1.3, 4.38, "Manifold Pressure &", fontsize=11.5, fontweight='bold', color=c_black)
    ax.text(1.3, 4.10, "RPM Pulse Probes", fontsize=11.5, fontweight='bold', color=c_black)
    ax.text(0.55, 3.72, "• Crankshaft 60-2 Trigger Wheel", fontsize=9.6, color=c_black, fontweight='bold')
    ax.text(0.55, 3.38, "• Turbo MAP Absolute Pressure", fontsize=9.6, color=c_black, fontweight='bold')
    ax.text(0.55, 3.04, "• Ambient Air Density / Barometer", fontsize=9.6, color=c_black, fontweight='bold')

    # 1C. Bottom Left: Lubrication & Fuel Flow Transducers
    draw_dashed_card(0.4, 0.5, 2.7, 2.05)
    circ3 = Circle((0.85, 1.95), 0.32, facecolor='#E2E8F0', edgecolor='#0F172A', lw=1.8)
    ax.add_patch(circ3)
    # Vector drop inside circle
    drop = Polygon([[0.85, 2.12], [0.75, 1.9], [0.85, 1.8], [0.95, 1.9]], closed=True, facecolor='#000000', edgecolor='none')
    ax.add_patch(drop)

    ax.text(1.3, 2.08, "Lubrication & Fuel", fontsize=11.5, fontweight='bold', color=c_black)
    ax.text(1.3, 1.80, "Flow Dynamics", fontsize=11.5, fontweight='bold', color=c_black)
    ax.text(0.55, 1.42, "• Piezo Oil Pressure & Viscosity", fontsize=9.6, color=c_black, fontweight='bold')
    ax.text(0.55, 1.08, "• Ultrasonic Fuel Mass Flowmeter", fontsize=9.6, color=c_black, fontweight='bold')
    ax.text(0.55, 0.74, "• High-G Broadband Vibration", fontsize=9.6, color=c_black, fontweight='bold')

    # =========================================================================
    # 2. TOP CENTER: POWER & TELEMETRY LINK
    # =========================================================================

    # Sensor Integration Hub / DAQ (between left sensors and core)
    draw_dashed_card(3.5, 5.1, 1.9, 1.95)
    ax.text(4.45, 6.58, "CAN / ARINC-429", fontsize=11.5, fontweight='bold', color=c_black, ha='center')
    ax.text(4.45, 6.30, "Telemetry Bus", fontsize=11.5, fontweight='bold', color=c_black, ha='center')
    # Microchip graphic icon
    chip = Rectangle((4.15, 5.65), 0.6, 0.45, facecolor='#1E293B', edgecolor='#000000', lw=1.5)
    ax.add_patch(chip)
    ax.text(4.45, 5.87, "CAN", color='#FFFFFF', fontsize=8.5, fontweight='bold', ha='center', va='center')
    ax.text(4.45, 5.30, "5 Hz Sync Hub", fontsize=9.6, color=c_black, ha='center', fontweight='bold')

    # Top Center-Right: 28V DC Aircraft Power & Telemetry Downlink
    pwr_box = FancyBboxPatch((5.8, 5.5), 2.2, 1.55, boxstyle="round,pad=0.08,rounding_size=0.15",
                             facecolor='#F8FAFC', edgecolor=c_border_slate, linewidth=1.6, linestyle='--')
    ax.add_patch(pwr_box)
    ax.text(6.9, 6.68, "28V DC Aircraft Bus", fontsize=11.5, fontweight='bold', color=c_black, ha='center')
    ax.text(6.9, 6.38, "& Avionics Inverter", fontsize=11, fontweight='bold', color=c_black, ha='center')
    ax.text(6.9, 5.96, "Low-SWaP (<2W Power)", fontsize=9.6, color=c_black, ha='center', fontweight='bold')
    ax.text(6.9, 5.64, "MIL-STD-704F Regulated", fontsize=9.2, color=c_black, ha='center')

    # Encrypted Telemetry Downlink Antenna
    ant_box = FancyBboxPatch((8.4, 5.5), 1.6, 1.55, boxstyle="round,pad=0.08,rounding_size=0.15",
                             facecolor='#F8FAFC', edgecolor=c_border_slate, linewidth=1.6, linestyle='--')
    ax.add_patch(ant_box)
    # Vector antenna
    ax.plot([9.2, 9.2], [6.2, 6.65], color='#000000', lw=2.8)
    ax.plot([8.95, 9.45], [6.65, 6.65], color='#000000', lw=2.8)
    ax.text(9.2, 5.96, "AES-256 Link", fontsize=9.6, color=c_black, ha='center', fontweight='bold')
    ax.text(9.2, 5.64, "Real-Time RF", fontsize=9.2, color=c_black, ha='center')

    # =========================================================================
    # 3. CENTER: CORE EMBEDDED COMPUTING ENGINE (THE DIGITAL TWIN BRAIN)
    # =========================================================================
    
    # Outer dashed frame for Edge AI Unit
    core_outer = FancyBboxPatch((3.5, 0.5), 3.6, 4.35, boxstyle="round,pad=0.1,rounding_size=0.22",
                                facecolor='#FFFFFF', edgecolor='#0F172A', linewidth=2.0, linestyle='--')
    ax.add_patch(core_outer)

    # Inner Microcontroller / Edge Computer Visual Card
    mcu_card = FancyBboxPatch((3.7, 2.65), 3.2, 2.05, boxstyle="round,pad=0.06,rounding_size=0.15",
                             facecolor='#0F172A', edgecolor='#0284C7', linewidth=2.0)
    ax.add_patch(mcu_card)
    ax.text(5.3, 4.38, "AERIS-TWIN EDGE RUNTIME", color='#FFFFFF', fontsize=11, fontweight='bold', ha='center')
    ax.text(5.3, 4.08, "Embedded Avionics Core (Jetson/Pi 4)", color='#E2E8F0', fontsize=9.2, ha='center')
    
    # Board layout pins simulation
    ax.plot([3.9, 6.7], [3.88, 3.88], color='#38BDF8', lw=1.5, alpha=0.8)
    ax.text(5.3, 3.55, ">> 5 Hz Closed-Loop Execution <<", color='#FDE047', fontsize=9.5, fontweight='bold', ha='center')
    ax.text(5.3, 3.22, "Sub-2ms Deterministic Inference", color='#FFFFFF', fontsize=9, ha='center')
    ax.text(5.3, 2.90, "DO-178C & DO-254 Certifiable Path", color='#A5F3FC', fontsize=8.8, ha='center')

    # Models running inside the engine (All Bold Black & Clean Black Text)
    ax.text(3.7, 2.30, "[GUARD]  Sensor Integrity Guard (Trust Index T)", fontsize=9.2, fontweight='bold', color=c_black)
    ax.text(3.7, 1.95, "[DNA]  Engine DNA Profiling (Serial-Specific Wear)", fontsize=9.2, fontweight='bold', color=c_black)
    ax.text(3.7, 1.60, "[PHYSICS]  Thermodynamic Conservation Model", fontsize=9.2, fontweight='bold', color=c_black)
    ax.text(3.7, 1.25, "[3-WAY]  Residual Disambiguator (Zero False Abort)", fontsize=9.2, fontweight='bold', color=c_black)
    ax.text(3.7, 0.90, "[RUL]  Hybrid LSTM Quantile RUL (Q10/Q50/Q90)", fontsize=9.2, fontweight='bold', color=c_black)

    # =========================================================================
    # 4. MIDDLE-RIGHT: ACTUATION & FADEC HARMONIZATION
    # =========================================================================
    
    # =========================================================================
    # 4. MIDDLE-RIGHT: ACTUATION & FADEC HARMONIZATION
    # =========================================================================
    
    # 4A. Rotax OEM FADEC ECU Interface (h=1.65, spans [3.85, 5.5])
    draw_dashed_card(7.5, 3.85, 2.5, 1.65)
    ax.text(8.75, 5.25, "FADEC Cockpit Alert", fontsize=11.5, fontweight='bold', color=c_black, ha='center')
    ax.text(8.75, 4.98, "Harmonizer Unit", fontsize=11.5, fontweight='bold', color=c_black, ha='center')
    ax.text(7.7, 4.60, "• Pre-FADEC 5-15 min Advisory", fontsize=9.5, color=c_black, fontweight='bold')
    ax.text(7.7, 4.28, "• Fail-Passive Airframe Control", fontsize=9.5, color=c_black, fontweight='bold')
    ax.text(7.7, 3.98, "• Dual ECU Redundancy Check", fontsize=9.2, color=c_black)

    # 4B. Pareto Counterfactual Actuators & Trims (h=1.55, spans [2.15, 3.7])
    draw_dashed_card(7.5, 2.15, 2.5, 1.55)
    ax.text(8.75, 3.44, "Counterfactual Flight", fontsize=11.5, fontweight='bold', color=c_black, ha='center')
    ax.text(8.75, 3.18, "Trim Optimizer", fontsize=11.5, fontweight='bold', color=c_black, ha='center')
    ax.text(7.7, 2.82, "• Altitude Step-Down (-800m)", fontsize=9.5, color=c_black, fontweight='bold')
    ax.text(7.7, 2.52, "• Throttle Derate (92% -> 85%)", fontsize=9.5, color=c_black, fontweight='bold')
    ax.text(7.7, 2.24, "• Airspeed Trim (+12 KIAS cooling)", fontsize=9.2, color=c_black)

    # 4C. Flight Recorder & Tamper-Evident Black Box (h=1.55, spans [0.45, 2.0])
    draw_dashed_card(7.5, 0.45, 2.5, 1.55)
    ax.text(8.75, 1.74, "High-Rate Flight Data", fontsize=11.5, fontweight='bold', color=c_black, ha='center')
    ax.text(8.75, 1.48, "Black Box (Layer 12)", fontsize=11.5, fontweight='bold', color=c_black, ha='center')
    ax.text(7.7, 1.14, "• 5 Hz Ring Buffer Telemetry", fontsize=9.5, color=c_black, fontweight='bold')
    ax.text(7.7, 0.84, "• Cryptographic Audit Trail", fontsize=9.5, color=c_black, fontweight='bold')
    ax.text(7.7, 0.54, "• Post-Sortie Work Orders", fontsize=9.2, color=c_black)

    # =========================================================================
    # 5. FAR RIGHT: PILOT / OPERATOR INTERFACES (MOBILE GCS & COCKPIT MFD)
    # =========================================================================

    # 5A. Top Right: Real-Time Mobile GCS & Pilot Tablet Mockup
    tablet_box = FancyBboxPatch((10.3, 2.85), 2.65, 4.2, boxstyle="round,pad=0.08,rounding_size=0.25",
                                facecolor='#0B132B', edgecolor='#475569', linewidth=2.0)
    ax.add_patch(tablet_box)
    
    # Tablet Screen
    screen = FancyBboxPatch((10.45, 3.0), 2.35, 3.9, boxstyle="round,pad=0.04,rounding_size=0.15",
                            facecolor='#1E293B', edgecolor='#64748B', linewidth=1.2)
    ax.add_patch(screen)
    
    # Screen Header
    ax.text(11.62, 6.62, "GCS TELEMETRY HUD", color='#38BDF8', fontsize=9.5, fontweight='bold', ha='center')
    ax.text(11.62, 6.35, "UAV-014 (TAPAS MALE)", color='#FFFFFF', fontsize=8.5, ha='center')
    ax.plot([10.6, 12.65], [6.2, 6.2], color='#38BDF8', lw=1.0)
    
    # Telemetry Bars on Screen
    ax.text(10.6, 5.92, "ENGINE HEALTH: 84%", color='#34D399', fontsize=8.5, fontweight='bold')
    bar_bg = Rectangle((10.6, 5.62), 2.05, 0.16, facecolor='#334155')
    bar_fg = Rectangle((10.6, 5.62), 1.72, 0.16, facecolor='#10B981')
    ax.add_patch(bar_bg)
    ax.add_patch(bar_fg)

    ax.text(10.6, 5.30, "CYL 2 CHT: 224°C [WARN]", color='#F87171', fontsize=8.5, fontweight='bold')
    ax.text(10.6, 4.98, "RPM: 5420  |  MAP: 36 inHg", color='#FFFFFF', fontsize=8.2)
    ax.text(10.6, 4.68, "TRUST INDEX: 0.98 (PASS)", color='#38BDF8', fontsize=8.2, fontweight='bold')
    
    # Counterfactual callout on screen
    cf_badge = FancyBboxPatch((10.55, 3.65), 2.15, 0.9, boxstyle="round,pad=0.04,rounding_size=0.08",
                              facecolor='#0B132B', edgecolor='#F59E0B', linewidth=1.0)
    ax.add_patch(cf_badge)
    ax.text(11.62, 4.30, "ADVISORY TRIM:", color='#F59E0B', fontsize=8.5, fontweight='bold', ha='center')
    ax.text(11.62, 4.05, "STEP DOWN -800m", color='#FFFFFF', fontsize=8.2, fontweight='bold', ha='center')
    ax.text(11.62, 3.80, "RUL EXTENDED +3.4h", color='#34D399', fontsize=8.2, fontweight='bold', ha='center')

    ax.text(11.62, 3.25, "[ ENCRYPTED LINK OK ]", color='#10B981', fontsize=8.5, fontweight='bold', ha='center')

    # 5B. Bottom Right: Cockpit MFD / Hardware OLED Unit
    mfd_box = FancyBboxPatch((10.3, 0.45), 2.65, 2.15, boxstyle="round,pad=0.06,rounding_size=0.15",
                             facecolor='#020617', edgecolor='#475569', linewidth=2.0)
    ax.add_patch(mfd_box)
    for sx, sy in [(10.45, 2.45), (12.8, 2.45), (10.45, 0.60), (12.8, 0.60)]:
        ax.add_patch(Circle((sx, sy), 0.04, facecolor='#94A3B8'))

    # OLED Green display text
    ax.text(10.55, 2.15, "RPM: 5420  |  MAP: 36 inHg", color='#22C55E', fontsize=8.5, fontweight='bold')
    ax.text(10.55, 1.75, "FADEC: NOMINAL (PRE-BREACH)", color='#22C55E', fontsize=8.5, fontweight='bold')
    ax.text(10.55, 1.35, "ASI: 64 [WATCHLIST - INJ 2]", color='#EAB308', fontsize=8.5, fontweight='bold')
    ax.text(10.55, 0.95, "Q10 RUL: 4.8 HRS | SORTIE OK", color='#22C55E', fontsize=8.5, fontweight='bold')

    # =========================================================================
    # 6. SIGNAL & POWER BUS ARROWS (ROUTED CLEANLY)
    # =========================================================================

    # Telemetry Solid Black Lines from Left Sensors to Hub
    ax.plot([3.1, 3.5], [6.05, 6.05], color=c_black, lw=2.0)
    ax.plot([3.1, 3.3, 3.3, 3.5], [3.8, 3.8, 5.8, 5.8], color=c_black, lw=1.8)
    ax.plot([3.1, 3.3, 3.3, 3.5], [1.5, 1.5, 5.5, 5.5], color=c_black, lw=1.8)

    # From Sync Hub to Core AI Unit
    ax.plot([4.45, 4.45], [5.1, 4.85], color=c_black, lw=2.2)
    ax.annotate("", xy=(4.45, 4.75), xytext=(4.45, 5.1),
                arrowprops=dict(arrowstyle="->", color=c_black, lw=2.2))

    # Power Dashed Red Lines from 28V DC Bus (routed below boxes cleanly without intersecting any text)
    ax.plot([6.9, 6.9], [5.5, 4.85], color=c_red_line, lw=1.8, linestyle=':')
    ax.plot([6.9, 5.5], [4.85, 4.85], color=c_red_line, lw=1.8, linestyle=':')
    ax.plot([6.9, 7.5], [4.85, 4.85], color=c_red_line, lw=1.8, linestyle=':')

    # RF Wireless Wave Symbols from Antenna to Tablet
    ax.text(9.9, 6.3, "((( RF )))", color=c_black, fontsize=9.5, fontweight='bold', ha='center', va='center')
    ax.plot([10.15, 10.3], [6.3, 6.3], color=c_black, lw=1.8, linestyle='--')

    # Core AI Unit to Actuation & FADEC Units (Solid black stepped arrows)
    ax.annotate("", xy=(7.5, 4.4), xytext=(7.1, 3.8),
                arrowprops=dict(arrowstyle="->", color=c_black, lw=2.0, connectionstyle="arc3,rad=-0.1"))
    ax.annotate("", xy=(7.5, 2.8), xytext=(7.1, 2.5),
                arrowprops=dict(arrowstyle="->", color=c_black, lw=2.0))
    ax.annotate("", xy=(7.5, 1.2), xytext=(7.1, 1.2),
                arrowprops=dict(arrowstyle="->", color=c_black, lw=2.0))

    # Actuation to Displays
    ax.annotate("", xy=(10.3, 4.5), xytext=(10.0, 4.5),
                arrowprops=dict(arrowstyle="->", color=c_black, lw=2.0))
    ax.annotate("", xy=(10.3, 1.5), xytext=(10.0, 1.5),
                arrowprops=dict(arrowstyle="->", color=c_black, lw=2.0))

    plt.tight_layout()
    plt.savefig('assets/slide3_technical_architecture.png', dpi=300, bbox_inches='tight', facecolor='#FFFFFF')
    plt.close()
    print("Successfully built cleaned black-text aerospace hardware diagram: assets/slide3_technical_architecture.png")

if __name__ == '__main__':
    build_hardware_architecture_diagram()
