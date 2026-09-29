import os
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch, Circle, Rectangle
import numpy as np

os.makedirs('assets', exist_ok=True)

# Set global matplotlib font styling for clean crisp rendering
plt.rcParams['font.sans-serif'] = 'Arial'
plt.rcParams['font.family'] = 'sans-serif'

# -------------------------------------------------------------
# 1. Slide 2 Visual: Aero-Piston Digital Twin HUD Display
# -------------------------------------------------------------
def create_slide2_hud():
    fig, ax = plt.subplots(figsize=(7.2, 4.2), dpi=250)
    fig.patch.set_facecolor('#0B132B')
    ax.set_facecolor('#0B132B')
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 6)
    ax.axis('off')

    # Main HUD Container
    hud_bg = FancyBboxPatch((0.2, 0.2), 9.6, 5.6, boxstyle="round,pad=0.1,rounding_size=0.25",
                            facecolor='#1C2541', edgecolor='#00F5D4', linewidth=2.0, alpha=0.98)
    ax.add_patch(hud_bg)

    # Header Bar
    ax.text(0.5, 5.4, "AERIS-TWIN 3.0 // REAL-TIME COCKPIT HUD", color='#00F5D4', fontsize=12, fontweight='bold')
    ax.text(9.5, 5.4, "EXEC: 5 Hz  |  TRUST: 0.98", color='#48CAE4', fontsize=10, fontweight='bold', ha='right')
    ax.plot([0.5, 9.5], [5.12, 5.12], color='#00F5D4', lw=1.2, alpha=0.6)

    # 4 Cylinders telemetry status
    ax.text(0.5, 4.75, "ROTAX 914 TURBOCHARGED ENGINE — 4-CYLINDER THERMAL STATUS", color='#FFFFFF', fontsize=9.5, fontweight='bold')
    
    cyl_data = [
        ("CYLINDER 1", "182°C", "760°C", "#48CAE4", "NOMINAL"),
        ("CYLINDER 2", "224°C", "835°C", "#FF5964", "HOT (ANOMALY)"),
        ("CYLINDER 3", "185°C", "765°C", "#48CAE4", "NOMINAL"),
        ("CYLINDER 4", "181°C", "758°C", "#48CAE4", "NOMINAL"),
    ]
    
    for i, (name, cht, egt, col, status) in enumerate(cyl_data):
        x = 0.5 + i * 2.25
        card = FancyBboxPatch((x, 3.1), 2.1, 1.45, boxstyle="round,pad=0.06,rounding_size=0.12",
                              facecolor='#0B132B', edgecolor=col, linewidth=1.8)
        ax.add_patch(card)
        ax.text(x + 0.15, 4.25, name, color=col, fontsize=9, fontweight='bold')
        ax.text(x + 0.15, 3.9, status, color=col, fontsize=7.5, fontweight='bold')
        ax.text(x + 0.15, 3.55, f"CHT: {cht}", color='#FFFFFF', fontsize=8.5, fontweight='bold')
        ax.text(x + 0.15, 3.25, f"EGT: {egt}", color='#94A3B8', fontsize=8)

    # Lower Panel Left: Diagnostic Disambiguation
    panel_left = FancyBboxPatch((0.5, 0.4), 4.35, 2.5, boxstyle="round,pad=0.06,rounding_size=0.12",
                                facecolor='#0B132B', edgecolor='#00F5D4', linewidth=1.5)
    ax.add_patch(panel_left)
    ax.text(0.7, 2.6, "DIAGNOSTIC DISAMBIGUATION", color='#00F5D4', fontsize=9.5, fontweight='bold')
    ax.text(0.7, 2.2, "• Severity: 64/100 (WARNING TRIGGERED)", color='#FBBF24', fontsize=8.5, fontweight='bold')
    ax.text(0.7, 1.85, "• Fault: INJECTOR CLOGGING (89.4% Prob)", color='#FF5964', fontsize=8.5, fontweight='bold')
    ax.text(0.7, 1.5, "• Root Cause (SHAP): Cyl 2 CHT (+38°C, 74%)", color='#FFFFFF', fontsize=8)
    ax.text(0.7, 1.15, "• Trust Index: 0.98 (Confirmed Physical Fault)", color='#48CAE4', fontsize=8)
    ax.text(0.7, 0.8, "• Hybrid RUL: Q10=4.2h | Q50=5.8h | Q90=7.1h", color='#E2E8F0', fontsize=8)

    # Lower Panel Right: Counterfactual Recovery Plan
    panel_right = FancyBboxPatch((5.05, 0.4), 4.45, 2.5, boxstyle="round,pad=0.06,rounding_size=0.12",
                                 facecolor='#0B132B', edgecolor='#FBBF24', linewidth=1.5)
    ax.add_patch(panel_right)
    ax.text(5.25, 2.6, "PRESCRIPTIVE COUNTERFACTUAL TRIM", color='#FBBF24', fontsize=9.5, fontweight='bold')
    ax.text(5.25, 2.25, "Optimal Pareto Recovery Trim (Generated in 12ms):", color='#FFFFFF', fontsize=8)
    
    # Trim cards
    trim_box = FancyBboxPatch((5.25, 0.95), 4.05, 1.15, boxstyle="round,pad=0.05,rounding_size=0.08",
                              facecolor='#1C2541', edgecolor='#00F5D4', linewidth=1.2)
    ax.add_patch(trim_box)
    ax.text(5.4, 1.8, "1. Step Down Altitude: -800 m (Boost Ram-Air)", color='#00F5D4', fontsize=8, fontweight='bold')
    ax.text(5.4, 1.5, "2. Derate Throttle: 92% -> 85% (Reduce Pressure)", color='#00F5D4', fontsize=8, fontweight='bold')
    ax.text(5.4, 1.2, "3. Airspeed Trim: +12 KIAS (Optimal Cooling)", color='#00F5D4', fontsize=8, fontweight='bold')

    ax.text(5.25, 0.65, "=> Restores Safe Margin (+3.4 hrs) | Sortie Saved", color='#34D399', fontsize=8.5, fontweight='bold')

    plt.tight_layout()
    plt.savefig('assets/slide2_hud_preview.png', dpi=300, bbox_inches='tight', facecolor=fig.get_facecolor(), edgecolor='none')
    plt.close()
    print("Regenerated assets/slide2_hud_preview.png")

# -------------------------------------------------------------
# 2. Slide 3 Visual: Technical Architecture Diagram (High Contrast)
# -------------------------------------------------------------
def create_slide3_architecture():
    fig, ax = plt.subplots(figsize=(11.5, 5.6), dpi=260)
    fig.patch.set_facecolor('#FFFFFF')
    ax.set_facecolor('#FFFFFF')
    ax.set_xlim(0, 13)
    ax.set_ylim(0, 6.8)
    ax.axis('off')

    def draw_node(x, y, w, h, title, lines=[], bg='#F8FAFC', border='#0F2C59', title_col='#0F2C59', lw=1.8, is_dashed=False):
        ls = '--' if is_dashed else '-'
        box = FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.06,rounding_size=0.18",
                             facecolor=bg, edgecolor=border, linewidth=lw, linestyle=ls)
        ax.add_patch(box)
        if title:
            ax.text(x + w/2, y + h - 0.32, title, ha='center', va='center', fontsize=9.5, fontweight='bold', color=title_col)
        for i, line in enumerate(lines):
            ax.text(x + 0.15, y + h - 0.65 - i*0.27, line, ha='left', va='top', fontsize=8.2, color='#0F172A', fontweight='medium')

    # 1. Telemetry Ingestion (Left Column)
    draw_node(0.4, 4.4, 2.6, 2.1, "Telemetry Stream (5 Hz)", [
        "• 4x CHT & 4x EGT Cylinders",
        "• Engine RPM & MAP Boost",
        "• Oil Pressure & Temp",
        "• Fuel Flow & Broadband Vib",
        "• Ambient Altitude & OAT"
    ], bg='#F0F9FF', border='#0284C7', title_col='#0369A1', is_dashed=True)

    draw_node(0.4, 2.3, 2.6, 1.8, "Physical Powerplant", [
        "• Rotax 914 / 915 iS Engine",
        "• 4-Cyl Turbocharged Aero",
        "• 14+ Hr Border ISR Sorties",
        "• DRDO TAPAS / Rustom-II"
    ], bg='#FEF3C7', border='#D97706', title_col='#B45309')

    draw_node(0.4, 0.4, 2.6, 1.6, "CAN Bus / ARINC-429", [
        "• High-Rate Avionics Bus",
        "• Sub-2ms Edge Interfacing",
        "• Non-Intrusive Sniffing"
    ], bg='#F1F5F9', border='#475569', title_col='#334155')

    # Flow Arrow 1 to Sensor Integrity Guard
    ax.annotate("", xy=(3.4, 5.45), xytext=(3.0, 5.45),
                arrowprops=dict(arrowstyle="->", color='#0284C7', lw=2.5))

    # 2. Sensor Integrity Guard
    draw_node(3.4, 4.4, 2.7, 2.1, "Sensor Integrity Guard", [
        "• Physical Bounds Filter",
        "• Thermodynamic Rate Limit",
        "• Cross-Sensor Thermal Check",
        "• Trust Index T in [0.0, 1.0]",
        "• Eliminates False Drift"
    ], bg='#ECFDF5', border='#059669', title_col='#047857', lw=2.2)

    # Arrow down to Physics and DNA
    ax.annotate("Verified Telemetry (T > 0.90)", xy=(4.75, 4.0), xytext=(4.75, 4.4),
                ha='center', fontsize=7.5, color='#047857', fontweight='bold',
                arrowprops=dict(arrowstyle="->", color='#059669', lw=2.0))

    # Dual Engines: Physics & DNA
    draw_node(3.4, 2.2, 2.7, 1.7, "Thermodynamic Physics", [
        "• First-Principles Conservation",
        "• Heat Transfer & Ram Cooling",
        "• Analytic Physical Prediction",
        "• Deterministic Baseline"
    ], bg='#EFF6FF', border='#2563EB', title_col='#1D4ED8')

    draw_node(3.4, 0.4, 2.7, 1.6, "Personalized Engine DNA", [
        "• Serial-Calibrated Model",
        "• Online RLS Wear Tracking",
        "• Anti-Poisoning Gate (ASI<30)",
        "• Tracks True Engine Aging"
    ], bg='#FAF5FF', border='#7C3AED', title_col='#6D28D9')

    # Curved arrows into 3-Way Residual Disambiguator
    ax.annotate("", xy=(6.6, 4.3), xytext=(6.1, 5.4),
                arrowprops=dict(arrowstyle="->", color='#059669', lw=2.0, connectionstyle="arc3,rad=-0.15"))
    ax.annotate("", xy=(6.6, 3.3), xytext=(6.1, 3.1),
                arrowprops=dict(arrowstyle="->", color='#2563EB', lw=2.0))
    ax.annotate("", xy=(6.6, 2.3), xytext=(6.1, 1.2),
                arrowprops=dict(arrowstyle="->", color='#7C3AED', lw=2.0, connectionstyle="arc3,rad=0.15"))

    # 3. 3-Way Residual Disambiguation Engine (Center Core)
    draw_node(6.6, 2.0, 2.8, 2.8, "3-Way Residual Engine", [
        "Disambiguation Geometry:",
        " • R_phys = |Y_act - Y_phys|",
        " • R_AI   = |Y_act - Y_DNA|",
        " • D_PA   = |Y_phys - Y_DNA|",
        "Hypothesis Resolution:",
        " • P(True Physical Wear)",
        " • P(Sensor Fault / Drift)",
        " • P(Model Uncertainty)"
    ], bg='#FFF7ED', border='#EA580C', title_col='#C2410C', lw=2.2)

    # Diagnostic & Prognostic Branch Arrows
    ax.annotate("", xy=(9.8, 5.5), xytext=(9.4, 4.3),
                arrowprops=dict(arrowstyle="->", color='#DC2626', lw=2.2))
    ax.annotate("", xy=(9.8, 3.4), xytext=(9.4, 3.4),
                arrowprops=dict(arrowstyle="->", color='#2563EB', lw=2.2))
    ax.annotate("", xy=(9.8, 1.3), xytext=(9.4, 2.5),
                arrowprops=dict(arrowstyle="->", color='#059669', lw=2.2))

    # 4. Diagnostic & Prognostics Core (Right-Center)
    draw_node(9.8, 4.5, 2.8, 2.0, "Diagnostics & XAI Layer", [
        "• Isolation Forest Severity (ASI)",
        "• 6-Class Fault Mode Classifier",
        "  (Injector, Misfire, Oil, Leak)",
        "• Real-time SHAP Attribution"
    ], bg='#FEF2F2', border='#DC2626', title_col='#B91C1C', lw=1.8)

    draw_node(9.8, 2.4, 2.8, 1.9, "Mission Digital Twin & RUL", [
        "• Forward Monte Carlo Sortie",
        "• Hybrid LSTM + Physics RUL",
        "• Quantile (Q10 / Q50 / Q90)",
        "• Sortie Policy: GO / CAUTION"
    ], bg='#EFF6FF', border='#2563EB', title_col='#1D4ED8', lw=1.8)

    draw_node(9.8, 0.4, 2.8, 1.8, "Counterfactual Optimization", [
        "• Pareto Optimal Flight Profiles",
        "• Altitude Step-Down (-800m)",
        "• Throttle Derate (92% -> 85%)",
        "• Saves Airframe & Mission"
    ], bg='#ECFDF5', border='#059669', title_col='#047857', lw=2.2)

    plt.tight_layout()
    plt.savefig('assets/slide3_technical_architecture.png', dpi=300, bbox_inches='tight', facecolor='#FFFFFF')
    plt.close()
    print("Regenerated assets/slide3_technical_architecture.png")

# -------------------------------------------------------------
# 3. Slide 5 Visual: TAM - SAM - SOM Aerospace Market Sizing
# -------------------------------------------------------------
def create_slide5_tam_sam_som():
    fig, ax = plt.subplots(figsize=(6.2, 3.4), dpi=250)
    fig.patch.set_facecolor('#FFFFFF')
    ax.set_facecolor('#FFFFFF')
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 5)
    ax.axis('off')

    # Concentric ellipses with authoritative defense shading
    e_tam = patches.Ellipse((2.7, 2.5), 5.1, 4.3, facecolor='#1E293B', alpha=0.95, edgecolor='#0F172A', lw=2.0)
    ax.add_patch(e_tam)
    ax.text(2.7, 4.25, "TAM", color='#FFFFFF', fontsize=13, fontweight='bold', ha='center')

    e_sam = patches.Ellipse((2.7, 2.1), 3.8, 3.1, facecolor='#475569', alpha=0.95, edgecolor='#1E293B', lw=1.8)
    ax.add_patch(e_sam)
    ax.text(2.7, 3.2, "SAM", color='#FFFFFF', fontsize=13, fontweight='bold', ha='center')

    e_som = patches.Ellipse((2.7, 1.6), 2.4, 1.8, facecolor='#64748B', alpha=1.0, edgecolor='#334155', lw=1.8)
    ax.add_patch(e_som)
    ax.text(2.7, 1.6, "SOM", color='#FFFFFF', fontsize=13, fontweight='bold', ha='center')

    # Callout lines and texts in bold black & black with increased font size
    c_black = '#000000'
    ax.plot([4.7, 5.7], [3.9, 3.9], color=c_black, lw=2.0)
    ax.plot([5.7, 5.7], [3.8, 4.0], color=c_black, lw=2.0)
    ax.text(5.9, 4.12, "TAM: ₹1,200 Cr ($145M)", color=c_black, fontsize=12.5, fontweight='bold')
    ax.text(5.9, 3.70, "Total Addressable Market (Global & Indian UAV Powerplants)", color=c_black, fontsize=9.2, fontweight='bold')

    ax.plot([4.2, 5.7], [2.6, 2.6], color=c_black, lw=2.0)
    ax.plot([5.7, 5.7], [2.5, 2.7], color=c_black, lw=2.0)
    ax.text(5.9, 2.82, "SAM: ₹380 Cr ($45M)", color=c_black, fontsize=12.5, fontweight='bold')
    ax.text(5.9, 2.40, "Serviceable Available Market (Indian Tri-Services Fleets)", color=c_black, fontsize=9.2, fontweight='bold')

    ax.plot([3.7, 5.7], [1.3, 1.3], color=c_black, lw=2.0)
    ax.plot([5.7, 5.7], [1.2, 1.4], color=c_black, lw=2.0)
    ax.text(5.9, 1.52, "SOM: ₹45 Cr ($5.5M)", color=c_black, fontsize=12.5, fontweight='bold')
    ax.text(5.9, 1.10, "Serviceable Obtainable Market (Immediate 3-Yr TAPAS Retrofit)", color=c_black, fontsize=9.2, fontweight='bold')

    plt.tight_layout()
    plt.savefig('assets/slide5_tam_sam_som.png', dpi=300, bbox_inches='tight', facecolor='#FFFFFF')
    plt.close()
    print("Regenerated assets/slide5_tam_sam_som.png with bold black typography")

# -------------------------------------------------------------
# 4. Slide 1 Hero Emblem / UAV Digital Twin graphic
# -------------------------------------------------------------
def create_slide1_hero():
    fig, ax = plt.subplots(figsize=(4.5, 4.2), dpi=260)
    fig.patch.set_facecolor('#FFFFFF')
    ax.set_facecolor('#FFFFFF')
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 10.5)
    ax.axis('off')

    # Draw Hexagonal / Shield Frame (taller and centered)
    pts = np.array([[5, 10.0], [9.0, 7.8], [9.0, 2.8], [5, 0.3], [1.0, 2.8], [1.0, 7.8]])
    poly = patches.Polygon(pts, closed=True, facecolor='#F8FAFC', edgecolor='#000000', lw=2.5)
    ax.add_patch(poly)

    # Inner rings
    c1 = Circle((5, 6.2), 2.3, fill=False, edgecolor='#334155', lw=2.0, linestyle='--')
    c2 = Circle((5, 6.2), 1.5, fill=False, edgecolor='#64748B', lw=1.8)
    ax.add_patch(c1)
    ax.add_patch(c2)

    # Drone crosshair styling
    ax.plot([3.0, 7.0], [6.2, 6.2], color='#000000', lw=4.5, solid_capstyle='round')
    ax.plot([5, 5], [4.8, 7.6], color='#000000', lw=4.5, solid_capstyle='round')
    ax.plot([2.8, 3.2], [7.3, 7.3], color='#334155', lw=3.0)
    ax.plot([6.8, 7.2], [7.3, 7.3], color='#334155', lw=3.0)
    ax.plot([2.8, 3.2], [5.1, 5.1], color='#334155', lw=3.0)
    ax.plot([6.8, 7.2], [5.1, 5.1], color='#334155', lw=3.0)
    
    # Text inside shield - elevated and bold black
    ax.text(5, 3.1, "AERIS-TWIN 3.0", color='#000000', fontsize=13, fontweight='bold', ha='center')
    ax.text(5, 2.4, "MALE UAV PROGNOSTICS", color='#000000', fontsize=9.5, fontweight='bold', ha='center')
    ax.text(5, 1.8, "DEFENSE DIGITAL TWIN", color='#334155', fontsize=8.5, fontweight='bold', ha='center')

    plt.tight_layout()
    plt.savefig('assets/slide1_hero_emblem.png', dpi=300, bbox_inches='tight', facecolor='#FFFFFF')
    plt.close()
    print("Regenerated assets/slide1_hero_emblem.png with bold black typography")

if __name__ == '__main__':
    create_slide2_hud()
    create_slide3_architecture()
    create_slide5_tam_sam_som()
    create_slide1_hero()
    print("All diagrams regenerated with high-contrast, large text styling!")
