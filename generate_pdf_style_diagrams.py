import os
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, Circle, Polygon, Wedge

# Ensure output directory exists
os.makedirs('assets', exist_ok=True)

# Set global matplotlib font settings for ultra-clean rendering
plt.rcParams['font.sans-serif'] = 'DejaVu Sans'
plt.rcParams['font.family'] = 'sans-serif'

# =========================================================================
# 1. SLIDE 2: END-TO-END WORKFLOW DIAGRAM
# =========================================================================
def create_slide2_workflow():
    fig, ax = plt.subplots(figsize=(8.0, 2.7), dpi=260)
    fig.patch.set_facecolor('#FFFFFF')
    ax.set_facecolor('#FFFFFF')
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 4.0)
    ax.axis('off')

    # Flowchart Title
    ax.text(5.0, 3.72, "AERIS-TWIN End-to-End Operational Workflow", fontsize=11.5, fontweight='bold', color='#0F172A', ha='center')

    # Row 3 (Top Row): Start & Nominal Flight
    start_pill = FancyBboxPatch((0.15, 2.7), 1.6, 0.6, boxstyle="round,pad=0.08,rounding_size=0.25",
                                facecolor='#FCE7F3', edgecolor='#DB2777', lw=1.5)
    ax.add_patch(start_pill)
    ax.text(0.95, 3.0, "Start Sortie", fontsize=9.2, fontweight='bold', color='#BE185D', ha='center', va='center')

    b_no = FancyBboxPatch((6.9, 2.7), 2.9, 0.6, boxstyle="round,pad=0.05,rounding_size=0.08",
                          facecolor='#DCFCE7', edgecolor='#16A34A', lw=1.5)
    ax.add_patch(b_no)
    ax.text(8.35, 3.0, "Nominal Flight (Sortie OK)", fontsize=9.0, fontweight='bold', color='#15803D', ha='center', va='center')

    # Row 2 (Middle Row): Rotax CAN Telemetry -> Physics-AI Residuals -> Diamond -> Causal DAG
    b1 = FancyBboxPatch((0.15, 1.4), 1.85, 0.85, boxstyle="round,pad=0.05,rounding_size=0.08",
                        facecolor='#FEF3C7', edgecolor='#D97706', lw=1.5)
    ax.add_patch(b1)
    ax.text(1.07, 1.95, "Rotax CAN Telemetry", fontsize=8.8, fontweight='bold', color='#000000', ha='center')
    ax.text(1.07, 1.62, "5 Hz CHT, EGT, RPM, MAP", fontsize=7.6, color='#000000', ha='center')

    b3 = FancyBboxPatch((2.4, 1.35), 2.2, 0.95, boxstyle="round,pad=0.06,rounding_size=0.08",
                        facecolor='#FEF08A', edgecolor='#CA8A04', lw=1.5)
    ax.add_patch(b3)
    ax.text(3.5, 2.05, "Physics-AI Residuals", fontsize=9.0, fontweight='bold', color='#000000', ha='center')
    ax.text(3.5, 1.77, "Energy Conservation Model", fontsize=7.6, color='#000000', ha='center')
    ax.text(3.5, 1.52, "& Engine DNA Baseline", fontsize=7.6, color='#000000', ha='center')

    # Diamond Anomaly Detected
    diamond = Polygon([[5.6, 2.35], [6.35, 1.825], [5.6, 1.30], [4.85, 1.825]], closed=True,
                      facecolor='#2563EB', edgecolor='#1D4ED8', lw=1.5)
    ax.add_patch(diamond)
    ax.text(5.6, 1.95, "Anomaly", fontsize=8.8, fontweight='bold', color='#FFFFFF', ha='center')
    ax.text(5.6, 1.70, "Detected?", fontsize=8.8, fontweight='bold', color='#FFFFFF', ha='center')

    b_yes = FancyBboxPatch((6.9, 1.4), 2.9, 0.85, boxstyle="round,pad=0.05,rounding_size=0.08",
                           facecolor='#E0E7FF', edgecolor='#4338CA', lw=1.5)
    ax.add_patch(b_yes)
    ax.text(8.35, 1.95, "Causal DAG Attribution", fontsize=9.0, fontweight='bold', color='#3730A3', ha='center')
    ax.text(8.35, 1.62, "Isolates Injector vs Sensor", fontsize=7.8, color='#000000', ha='center')

    # Row 1 (Bottom Row): Sensor Guard Hub -> Cockpit Alert & HUD -> Prescriptive Trim Calc
    b2 = FancyBboxPatch((0.15, 0.15), 1.85, 0.85, boxstyle="round,pad=0.05,rounding_size=0.08",
                        facecolor='#FEF3C7', edgecolor='#D97706', lw=1.5)
    ax.add_patch(b2)
    ax.text(1.07, 0.70, "Sensor Guard Hub", fontsize=8.8, fontweight='bold', color='#000000', ha='center')
    ax.text(1.07, 0.38, "Trust Score T in [0,1] & 8σ", fontsize=7.6, color='#000000', ha='center')

    b_hud = FancyBboxPatch((2.4, 0.15), 2.2, 0.85, boxstyle="round,pad=0.05,rounding_size=0.08",
                           facecolor='#FEF3C7', edgecolor='#D97706', lw=1.5)
    ax.add_patch(b_hud)
    ax.text(3.5, 0.70, "Cockpit Alert & HUD", fontsize=8.8, fontweight='bold', color='#000000', ha='center')
    ax.text(3.5, 0.38, "FADEC Harmonizer Sync", fontsize=7.6, color='#000000', ha='center')

    b_trim = FancyBboxPatch((6.9, 0.15), 2.9, 0.85, boxstyle="round,pad=0.05,rounding_size=0.08",
                            facecolor='#FFEDD5', edgecolor='#EA580C', lw=1.5)
    ax.add_patch(b_trim)
    ax.text(8.35, 0.70, "Prescriptive Trim Calc", fontsize=9.0, fontweight='bold', color='#C2410C', ha='center')
    ax.text(8.35, 0.38, "Pareto: Step -800m, 85%", fontsize=7.8, color='#000000', ha='center')

    # Arrows
    def arrow(x1, y1, x2, y2, label=""):
        ax.annotate("", xy=(x2, y2), xytext=(x1, y1),
                    arrowprops=dict(arrowstyle="->", color='#000000', lw=1.4))
        if label:
            ax.text((x1+x2)/2, (y1+y2)/2 + 0.12, label, fontsize=8.5, fontweight='bold', color='#000000', ha='center')

    arrow(0.95, 2.7, 0.95, 2.25)
    arrow(1.07, 1.4, 1.07, 1.0)
    arrow(2.0, 1.825, 2.4, 1.825)
    arrow(2.0, 0.575, 2.4, 1.4)
    arrow(4.6, 1.825, 4.85, 1.825)

    ax.plot([5.6, 5.6, 6.9], [2.35, 3.0, 3.0], color='#000000', lw=1.4)
    arrow(6.8, 3.0, 6.9, 3.0)
    ax.text(6.25, 3.12, "No", fontsize=8.5, fontweight='bold', color='#15803D')

    arrow(6.35, 1.825, 6.9, 1.825, label="Yes")
    arrow(8.35, 1.4, 8.35, 1.0)
    arrow(6.9, 0.575, 4.6, 0.575)

    plt.tight_layout()
    plt.savefig('assets/pdf_slide2_workflow.png', dpi=300, bbox_inches='tight', facecolor='#FFFFFF')
    plt.close()
    print("Created assets/pdf_slide2_workflow.png")

# =========================================================================
# 2. SLIDE 2: INNOVATION & UNIQUENESS BRANCHING CARDS
# =========================================================================
def create_slide2_innovation():
    fig, ax = plt.subplots(figsize=(8.0, 3.2), dpi=260)
    fig.patch.set_facecolor('#FFFFFF')
    ax.set_facecolor('#FFFFFF')
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 4.6)
    ax.axis('off')

    badge = FancyBboxPatch((3.3, 3.55), 3.4, 0.9, boxstyle="round,pad=0.1,rounding_size=0.35",
                           facecolor='#3F5E4D', edgecolor='#284033', lw=1.8)
    ax.add_patch(badge)
    ax.text(5.0, 4.15, "Innovation", fontsize=12.5, fontweight='bold', color='#FFFFFF', ha='center')
    ax.text(5.0, 3.80, "and Uniqueness", fontsize=12.5, fontweight='bold', color='#FFFFFF', ha='center')

    cards = [
        ("Sensor Integrity\nGuard", "Computes real-time Trust\nIndex T in [0,1], 8σ test,\nrejects cyber-spoofing.", "#B45309", "#FEF3C7", 0.1),
        ("Personalized\nEngine DNA", "Serial-specific wear\nprofiling with online\nanti-poisoning gating.", "#92400E", "#FDE68A", 2.05),
        ("3-Way Residual\nDisambiguator", "Physical wear vs sensor\ndrift vs model split;\nzero false aborts.", "#4D7C0F", "#ECFDF5", 4.0),
        ("Ensemble\nQuantile RUL", "LSTM + Physics hybrid;\nQ10/Q50/Q90 envelopes;\n29.3% variance cut.", "#DC2626", "#FEE2E2", 5.95),
        ("Prescriptive\nFlight Trims", "Calculates Pareto trims\n(-800m, 85% throttle);\nsaves engine & sortie.", "#0F766E", "#CCFBF1", 7.9),
    ]

    for title, desc, border_col, bg_col, x in cards:
        ax.annotate("", xy=(x + 0.94, 2.45), xytext=(5.0, 3.55),
                    arrowprops=dict(arrowstyle="-", color='#3F5E4D', lw=1.6))
        
        c = FancyBboxPatch((x, 0.12), 1.88, 2.33, boxstyle="round,pad=0.08,rounding_size=0.18",
                           facecolor=bg_col, edgecolor=border_col, lw=1.5, linestyle='--')
        ax.add_patch(c)

        ax.text(x + 0.94, 1.95, title, fontsize=9.6, fontweight='bold', color=border_col, ha='center', va='center')
        ax.text(x + 0.94, 0.95, desc, fontsize=8.2, color='#000000', ha='center', va='center')

    plt.tight_layout()
    plt.savefig('assets/pdf_slide2_innovation.png', dpi=300, bbox_inches='tight', facecolor='#FFFFFF')
    plt.close()
    print("Created assets/pdf_slide2_innovation.png")

# =========================================================================
# 3. SLIDE 3: 4-ZONE TECHNICAL ARCHITECTURE DIAGRAM
# =========================================================================
def create_slide3_architecture():
    fig, ax = plt.subplots(figsize=(9.2, 6.2), dpi=260)
    fig.patch.set_facecolor('#FFFFFF')
    ax.set_facecolor('#FFFFFF')
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 7.0)
    ax.axis('off')

    zones = [
        ("Zone 1\nSensors Suite", 0.1, 2.3, "#EFF6FF", "#BFDBFE"),
        ("Zone 2\nEdge Platform", 2.5, 2.3, "#F0FDF4", "#BBF7D0"),
        ("Zone 3\nAI Core Brain", 4.9, 2.6, "#FAF5FF", "#DDD6FE"),
        ("Zone 4\nCockpit & MFD", 7.6, 2.3, "#ECFEFF", "#A5F3FC")
    ]

    for title, x, w, bg, bd in zones:
        z = FancyBboxPatch((x, 0.9), w, 5.9, boxstyle="round,pad=0.05,rounding_size=0.12",
                           facecolor=bg, edgecolor=bd, lw=1.5)
        ax.add_patch(z)
        ax.text(x + w/2, 6.55, title, fontsize=9.6, fontweight='bold', color='#1E293B', ha='center')

    # Zone 1 Cards
    c1 = FancyBboxPatch((0.2, 4.4), 2.1, 1.6, boxstyle="round,pad=0.04,rounding_size=0.08",
                        facecolor='#FFFFFF', edgecolor='#3B82F6', lw=1.2)
    ax.add_patch(c1)
    ax.text(1.25, 5.75, "Rotax 914/915 Sensor Suite", fontsize=9.0, fontweight='bold', color='#1D4ED8', ha='center')
    ax.text(0.35, 5.42, "• 4x CHT & 4x EGT Probes", fontsize=8.0, color='#000000')
    ax.text(0.35, 5.15, "• MAP & Crankshaft RPM", fontsize=8.0, color='#000000')
    ax.text(0.35, 4.88, "• Piezo Oil & Flowmeter", fontsize=8.0, color='#000000')
    ax.text(0.35, 4.62, "• High-G Vibration Probes", fontsize=8.0, color='#000000')

    c2 = FancyBboxPatch((0.2, 2.7), 2.1, 1.4, boxstyle="round,pad=0.04,rounding_size=0.08",
                        facecolor='#FFFFFF', edgecolor='#3B82F6', lw=1.2)
    ax.add_patch(c2)
    ax.text(1.25, 3.85, "Aircraft Bus & Power", fontsize=9.0, fontweight='bold', color='#1D4ED8', ha='center')
    ax.text(0.35, 3.52, "• 28V DC MIL-STD-704F", fontsize=8.0, color='#000000')
    ax.text(0.35, 3.25, "• Low-SWaP Inverter", fontsize=8.0, color='#000000')
    ax.text(0.35, 2.98, "• < 2W Operational Draw", fontsize=8.0, color='#000000')

    c3 = FancyBboxPatch((0.2, 1.1), 2.1, 1.3, boxstyle="round,pad=0.04,rounding_size=0.08",
                        facecolor='#FFFFFF', edgecolor='#3B82F6', lw=1.2)
    ax.add_patch(c3)
    ax.text(1.25, 2.15, "Ambient Telemetry", fontsize=9.0, fontweight='bold', color='#1D4ED8', ha='center')
    ax.text(0.35, 1.82, "• Altitude Barometer", fontsize=8.0, color='#000000')
    ax.text(0.35, 1.55, "• Ambient Air Density", fontsize=8.0, color='#000000')
    ax.text(0.35, 1.28, "• GPS-Denied Local Clock", fontsize=8.0, color='#000000')

    # Zone 2 Cards
    z2_box = FancyBboxPatch((2.6, 1.1), 2.1, 4.9, boxstyle="round,pad=0.04,rounding_size=0.08",
                            facecolor='#FFFFFF', edgecolor='#16A34A', lw=1.2)
    ax.add_patch(z2_box)
    ax.text(3.65, 5.75, "Embedded Computing Edge", fontsize=9.0, fontweight='bold', color='#15803D', ha='center')
    ax.text(3.65, 5.48, "Jetson Orin / STM32H7 / MIL-STD", fontsize=7.8, color='#475569', ha='center')

    z2_items = [
        ("CAN / ARINC-429 Driver", "5 Hz Non-Intrusive Sniffer"),
        ("Sensor Integrity Guard", "Trust Score T, 8σ Spike Check"),
        ("Anti-Poisoning Gateway", "Rejects Malicious Injections"),
        ("Ring Buffer Telemetry", "5 Hz Low-Latency Sync Hub"),
        ("Deterministic RTOS", "Guaranteed 200ms Execution")
    ]
    y_pos = 4.8
    for it, sub in z2_items:
        card = FancyBboxPatch((2.7, y_pos - 0.55), 1.9, 0.65, boxstyle="round,pad=0.03,rounding_size=0.06",
                              facecolor='#F0FDF4', edgecolor='#86EFAC', lw=1.0)
        ax.add_patch(card)
        ax.text(3.65, y_pos - 0.15, it, fontsize=8.2, fontweight='bold', color='#000000', ha='center')
        ax.text(3.65, y_pos - 0.38, sub, fontsize=7.5, color='#475569', ha='center')
        y_pos -= 0.8

    # Zone 3 Cards (The Brain)
    z3_box = FancyBboxPatch((5.0, 1.1), 2.4, 4.9, boxstyle="round,pad=0.04,rounding_size=0.08",
                            facecolor='#FFFFFF', edgecolor='#7C3AED', lw=1.2)
    ax.add_patch(z3_box)
    ax.text(6.2, 5.75, "Digital Twin AI Engine", fontsize=9.0, fontweight='bold', color='#6D28D9', ha='center')
    ax.text(6.2, 5.48, "30+ Defense Intelligence Layers", fontsize=7.8, color='#475569', ha='center')

    z3_items = [
        ("Thermodynamic Residual Twin", "First-principles conservation model"),
        ("Personalized Engine DNA", "Serial-specific wear coefficients"),
        ("Causal Inference DAG", "Root-cause fault disambiguation"),
        ("Hybrid LSTM-RUL Ensemble", "Conformal 90% Q10/Q50/Q90"),
        ("Monte Carlo Mission Twin", "500 stochastic sortie projections")
    ]
    y_pos = 4.8
    for it, sub in z3_items:
        card = FancyBboxPatch((5.1, y_pos - 0.55), 2.2, 0.65, boxstyle="round,pad=0.03,rounding_size=0.06",
                              facecolor='#FAF5FF', edgecolor='#C4B5FD', lw=1.0)
        ax.add_patch(card)
        ax.text(6.2, y_pos - 0.15, it, fontsize=8.2, fontweight='bold', color='#000000', ha='center')
        ax.text(6.2, y_pos - 0.38, sub, fontsize=7.5, color='#475569', ha='center')
        y_pos -= 0.8

    # Zone 4 Cards
    z4_box = FancyBboxPatch((7.7, 1.1), 2.1, 4.9, boxstyle="round,pad=0.04,rounding_size=0.08",
                            facecolor='#FFFFFF', edgecolor='#0891B2', lw=1.2)
    ax.add_patch(z4_box)
    ax.text(8.75, 5.75, "Cockpit & Telemetry Output", fontsize=9.0, fontweight='bold', color='#0E7490', ha='center')
    ax.text(8.75, 5.48, "Operator Action & Flight Safe", fontsize=7.8, color='#475569', ha='center')

    z4_items = [
        ("FADEC Cockpit Harmonizer", "5-15 min pre-alarm advisory"),
        ("Counterfactual Trim Engine", "Pareto optimal altitude/throttle"),
        ("Cockpit MFD OLED Unit", "Real-time ASI & RUL margin"),
        ("Mobile GCS Telemetry HUD", "Encrypted pilot situational tablet"),
        ("SHA-256 Sortie Black Box", "Immutable military audit logger")
    ]
    y_pos = 4.8
    for it, sub in z4_items:
        card = FancyBboxPatch((7.8, y_pos - 0.55), 1.9, 0.65, boxstyle="round,pad=0.03,rounding_size=0.06",
                              facecolor='#ECFEFF', edgecolor='#67E8F9', lw=1.0)
        ax.add_patch(card)
        ax.text(8.75, y_pos - 0.15, it, fontsize=8.2, fontweight='bold', color='#000000', ha='center')
        ax.text(8.75, y_pos - 0.38, sub, fontsize=7.5, color='#475569', ha='center')
        y_pos -= 0.8

    # Flow arrows between zones
    for y_ar in [5.2, 4.4, 3.6, 2.8, 2.0]:
        ax.annotate("", xy=(2.5, y_ar), xytext=(2.3, y_ar), arrowprops=dict(arrowstyle="->", color='#000000', lw=1.3))
        ax.annotate("", xy=(4.9, y_ar), xytext=(4.7, y_ar), arrowprops=dict(arrowstyle="->", color='#000000', lw=1.3))
        ax.annotate("", xy=(7.7, y_ar), xytext=(7.4, y_ar), arrowprops=dict(arrowstyle="->", color='#000000', lw=1.3))

    # Bottom Technology Stack Bar
    tech_bar = FancyBboxPatch((0.1, 0.1), 9.8, 0.68, boxstyle="round,pad=0.04,rounding_size=0.1",
                              facecolor='#F8FAFC', edgecolor='#CBD5E1', lw=1.4)
    ax.add_patch(tech_bar)
    ax.text(0.18, 0.44, "Tech Stack:", fontsize=9.0, fontweight='bold', color='#000000', va='center')
    
    stacks = ["Embedded C", "PyTorch", "TensorRT INT8", "FreeRTOS", "CANAerospace", "ROS2 / MAVLink"]
    for i, st in enumerate(stacks):
        sx = 1.65 + i * 1.35
        badge = FancyBboxPatch((sx, 0.18), 1.25, 0.50, boxstyle="round,pad=0.04,rounding_size=0.08",
                               facecolor='#FFFFFF', edgecolor='#0284C7', lw=1.0)
        ax.add_patch(badge)
        ax.text(sx + 0.625, 0.44, st, fontsize=8.0, fontweight='bold', color='#0F172A', ha='center', va='center')

    plt.tight_layout()
    plt.savefig('assets/pdf_slide3_architecture.png', dpi=300, bbox_inches='tight', facecolor='#FFFFFF')
    plt.close()
    print("Created assets/pdf_slide3_architecture.png")

# =========================================================================
# 4. SLIDE 3: IMPLEMENTATION PROCESS VERTICAL CHAIN
# =========================================================================
def create_slide3_process():
    fig, ax = plt.subplots(figsize=(3.4, 6.2), dpi=260)
    fig.patch.set_facecolor('#FFFFFF')
    ax.set_facecolor('#FFFFFF')
    ax.set_xlim(0, 4)
    ax.set_ylim(0, 7.0)
    ax.axis('off')

    c_all = FancyBboxPatch((0.1, 0.1), 3.8, 6.8, boxstyle="round,pad=0.06,rounding_size=0.15",
                           facecolor='#FFFFFF', edgecolor='#DC2626', lw=1.8)
    ax.add_patch(c_all)

    ax.text(2.0, 6.55, "Implementation Process", fontsize=12.5, fontweight='bold', color='#B91C1C', ha='center')

    steps = [
        ("Telemetry Ingestion", "5 Hz Rotax CAN bus streaming\ncaptures raw engine sensor state.", "#1E293B", 5.6),
        ("Sensor Integrity Check", "Computes Trust Index T in [0,1];\nrejects noise & cyber-spoofing.", "#0284C7", 4.6),
        ("Digital Twin Modeling", "Thermodynamic energy residuals\ncompared with engine DNA wear.", "#D97706", 3.6),
        ("Causal Root-Cause DAG", "SHAP + do-calculus isolates\ntrue root injector/bearing fault.", "#EAB308", 2.6),
        ("Prescriptive Flight Trim", "Pareto in-flight advisory trims\n(step -800m, throttle 85%).", "#16A34A", 1.6),
        ("Sortie Logging & Debrief", "5 Hz SHA-256 black box buffer;\nauto ground crew work orders.", "#EA580C", 0.6),
    ]

    for i in range(len(steps)-1):
        y1 = steps[i][3] + 0.1
        y2 = steps[i+1][3] + 0.1
        ax.plot([0.65, 0.65], [y1, y2], color='#94A3B8', lw=2.2, zorder=1)

    for idx, (title, desc, col, y) in enumerate(steps):
        circ = Circle((0.65, y + 0.1), 0.36, facecolor=col, edgecolor='#FFFFFF', lw=2.0, zorder=2)
        ax.add_patch(circ)
        ax.text(0.65, y + 0.1, str(idx+1), color='#FFFFFF', fontsize=11.5, fontweight='bold', ha='center', va='center', zorder=3)

        ax.text(1.18, y + 0.30, title, fontsize=9.8, fontweight='bold', color='#000000')
        ax.text(1.18, y - 0.08, desc, fontsize=8.2, color='#000000')

    plt.tight_layout()
    plt.savefig('assets/pdf_slide3_process.png', dpi=300, bbox_inches='tight', facecolor='#FFFFFF')
    plt.close()
    print("Created assets/pdf_slide3_process.png")

# =========================================================================
# 5. SLIDE 4: CHALLENGES VS MITIGATION SYMMETRIC DUAL-HUB
# =========================================================================
def create_slide4_challenges_mitigation():
    fig, ax = plt.subplots(figsize=(12.4, 4.0), dpi=260)
    fig.patch.set_facecolor('#FFFFFF')
    ax.set_facecolor('#FFFFFF')
    ax.set_xlim(0, 14)
    ax.set_ylim(0, 5.0)
    ax.axis('off')

    card_all = FancyBboxPatch((0.1, 0.1), 13.8, 4.8, boxstyle="round,pad=0.08,rounding_size=0.15",
                              facecolor='#FFFFFF', edgecolor='#E2E8F0', lw=1.5)
    ax.add_patch(card_all)

    ax.plot([7.0, 7.0], [0.3, 4.7], color='#CBD5E1', lw=1.5, linestyle=':')

    # Left: Challenges
    hub_left = Circle((1.2, 2.5), 0.90, facecolor='#F1F5F9', edgecolor='#94A3B8', lw=1.5)
    ax.add_patch(hub_left)
    ax.text(1.2, 2.70, "Potential", fontsize=10.5, fontweight='bold', color='#000000', ha='center')
    ax.text(1.2, 2.42, "Challenges &", fontsize=10.5, fontweight='bold', color='#000000', ha='center')
    ax.text(1.2, 2.14, "Risks", fontsize=10.5, fontweight='bold', color='#000000', ha='center')

    challenges = [
        ("Hostile Environmental Extremes: Thar Desert 48°C & Ladakh 5,800m altitude non-linear drift.", 4.2),
        ("Sensor Noise & Cyber Spoofing: In-flight electrical interference triggers false abort panic.", 3.4),
        ("Inter-Engine Wear Divergence: Factory thresholds fail on individual degradation profiles.", 2.5),
        ("Severe Edge Compute SWaP Limits: MALE UAVs restrict avionics payload power to < 2W.", 1.6),
        ("Military Airworthiness Certification: Strict DO-178C / DO-254 software determinism.", 0.8),
    ]

    for idx, (text, y) in enumerate(challenges):
        num_str = f"0{idx+1}"
        ax.plot([1.95, 2.6, 2.6], [2.5, 2.5, y], color='#DC2626', lw=1.3)
        ax.plot([2.6, 2.8], [y, y], color='#DC2626', lw=1.3)
        
        c = Circle((2.8, y), 0.24, facecolor='#DC2626', edgecolor='none')
        ax.add_patch(c)
        ax.text(2.8, y, num_str, color='#FFFFFF', fontsize=9.2, fontweight='bold', ha='center', va='center')

        colon_idx = text.find(":")
        bold_pt = text[:colon_idx+1]
        rest = text[colon_idx+1:]
        ax.text(3.18, y + 0.08, bold_pt, fontsize=9.0, fontweight='bold', color='#000000')
        ax.text(3.18, y - 0.18, rest, fontsize=8.0, color='#000000')

    # Right: Strategies
    hub_right = Circle((12.8, 2.5), 0.90, facecolor='#F0FDF4', edgecolor='#86EFAC', lw=1.5)
    ax.add_patch(hub_right)
    ax.text(12.8, 2.70, "Strategies For", fontsize=10.5, fontweight='bold', color='#15803D', ha='center')
    ax.text(12.8, 2.42, "Overcoming", fontsize=10.5, fontweight='bold', color='#15803D', ha='center')
    ax.text(12.8, 2.14, "Challenges", fontsize=10.5, fontweight='bold', color='#15803D', ha='center')

    strategies = [
        ("India Theatre Wargaming: Pre-stresses models against desert and Himalayan profiles.", 4.2),
        ("8σ Adversarial Guard: Real-time Trust Index & sensor check reject spoofing.", 3.4),
        ("Personalized Engine DNA: Serial-calibrated wear tracking with anti-poisoning updates.", 2.5),
        ("Edge-Optimized TensorRT: Lightweight quantized INT8 models running deterministic 5 Hz cycles.", 1.6),
        ("Certified Fail-Passive Logic: Non-intrusive CAN sniffer with automatic OEM FADEC fallback.", 0.8),
    ]

    for idx, (text, y) in enumerate(strategies):
        num_str = f"0{idx+1}"
        ax.plot([12.05, 11.4, 11.4], [2.5, 2.5, y], color='#16A34A', lw=1.3)
        ax.plot([11.4, 11.2], [y, y], color='#16A34A', lw=1.3)

        c = Circle((11.2, y), 0.24, facecolor='#16A34A', edgecolor='none')
        ax.add_patch(c)
        ax.text(11.2, y, num_str, color='#FFFFFF', fontsize=9.2, fontweight='bold', ha='center', va='center')

        colon_idx = text.find(":")
        bold_pt = text[:colon_idx+1]
        rest = text[colon_idx+1:]
        ax.text(7.15, y + 0.08, bold_pt, fontsize=9.0, fontweight='bold', color='#000000')
        ax.text(7.15, y - 0.18, rest, fontsize=8.0, color='#000000')

    plt.tight_layout()
    plt.savefig('assets/pdf_slide4_challenges_mitigation.png', dpi=300, bbox_inches='tight', facecolor='#FFFFFF')
    plt.close()
    print("Created assets/pdf_slide4_challenges_mitigation.png")

# =========================================================================
# 6. SLIDE 5: IMPACT ON TARGET AUDIENCE & BENEFITS
# =========================================================================
def create_slide5_impact():
    fig, ax = plt.subplots(figsize=(12.4, 5.8), dpi=260)
    fig.patch.set_facecolor('#FFFFFF')
    ax.set_facecolor('#FFFFFF')
    ax.set_xlim(0, 14)
    ax.set_ylim(0, 7.2)
    ax.axis('off')

    ax.plot([7.2, 7.2], [0.8, 7.0], color='#CBD5E1', lw=1.5, linestyle=':')

    # Left: Audience Donut
    center_x, center_y = 3.6, 3.8
    w1 = Wedge((center_x, center_y), 1.25, 0, 72, facecolor='#0284C7', edgecolor='#FFFFFF', lw=2.0)
    w2 = Wedge((center_x, center_y), 1.25, 72, 144, facecolor='#0D9488', edgecolor='#FFFFFF', lw=2.0)
    w3 = Wedge((center_x, center_y), 1.25, 144, 216, facecolor='#EA580C', edgecolor='#FFFFFF', lw=2.0)
    w4 = Wedge((center_x, center_y), 1.25, 216, 288, facecolor='#16A34A', edgecolor='#FFFFFF', lw=2.0)
    w5 = Wedge((center_x, center_y), 1.25, 288, 360, facecolor='#7C3AED', edgecolor='#FFFFFF', lw=2.0)
    for w in [w1, w2, w3, w4, w5]:
        ax.add_patch(w)

    inner_c = Circle((center_x, center_y), 0.75, facecolor='#FFFFFF', edgecolor='#CBD5E1', lw=1.5)
    ax.add_patch(inner_c)
    ax.text(center_x, center_y + 0.18, "Potential", fontsize=10.0, fontweight='bold', color='#000000', ha='center')
    ax.text(center_x, center_y - 0.02, "Impact on", fontsize=10.0, fontweight='bold', color='#000000', ha='center')
    ax.text(center_x, center_y - 0.22, "Defense", fontsize=10.0, fontweight='bold', color='#0284C7', ha='center')

    # Stakeholder Cards
    c_p1 = FancyBboxPatch((1.6, 5.9), 4.0, 0.95, boxstyle="round,pad=0.04,rounding_size=0.1",
                          facecolor='#F1F5F9', edgecolor='#CBD5E1', lw=1.2)
    ax.add_patch(c_p1)
    ax.text(3.6, 6.55, "UAV Remote Pilots & Mission Commanders", fontsize=9.2, fontweight='bold', color='#0284C7', ha='center')
    ax.text(3.6, 6.18, "5–15 min pre-FADEC warnings; eliminates panic aborts with clear\noptimal Pareto flight recovery trims.", fontsize=8.0, color='#000000', ha='center')
    ax.plot([3.6, 3.6], [5.05, 5.9], color='#0284C7', lw=1.5)

    c_p2 = FancyBboxPatch((4.7, 4.3), 2.3, 1.25, boxstyle="round,pad=0.04,rounding_size=0.1",
                          facecolor='#F1F5F9', edgecolor='#CBD5E1', lw=1.2)
    ax.add_patch(c_p2)
    ax.text(5.85, 5.25, "Ground Engineers:", fontsize=9.0, fontweight='bold', color='#0D9488', ha='center')
    ax.text(5.85, 4.65, "Causal DAG pinpoints root\ninjector/bearing fault;\nauto maintenance debrief\norders on landing.", fontsize=7.6, color='#000000', ha='center')
    ax.plot([4.6, 4.7], [4.4, 4.4], color='#0D9488', lw=1.5)

    c_p3 = FancyBboxPatch((4.7, 2.3), 2.3, 1.25, boxstyle="round,pad=0.04,rounding_size=0.1",
                          facecolor='#F1F5F9', edgecolor='#CBD5E1', lw=1.2)
    ax.add_patch(c_p3)
    ax.text(5.85, 3.25, "Flight Safety Officers:", fontsize=9.0, fontweight='bold', color='#16A34A', ha='center')
    ax.text(5.85, 2.65, "500-run Monte Carlo\nsortie risk assessment;\nzero unpredicted in-flight\nengine seizures.", fontsize=7.6, color='#000000', ha='center')
    ax.plot([4.6, 4.7], [3.2, 3.2], color='#16A34A', lw=1.5)

    c_p4 = FancyBboxPatch((0.2, 2.3), 2.3, 1.25, boxstyle="round,pad=0.04,rounding_size=0.1",
                          facecolor='#F1F5F9', edgecolor='#CBD5E1', lw=1.2)
    ax.add_patch(c_p4)
    ax.text(1.35, 3.25, "Tri-Services Fleet:", fontsize=9.0, fontweight='bold', color='#7C3AED', ha='center')
    ax.text(1.35, 2.65, "Unified prognostics across\nArmy, Navy & IAF MALE\nUAVs (TAPAS, Rustom-II);\n28% higher availability.", fontsize=7.6, color='#000000', ha='center')
    ax.plot([2.6, 2.5], [3.2, 3.2], color='#7C3AED', lw=1.5)

    c_p5 = FancyBboxPatch((0.2, 4.3), 2.3, 1.25, boxstyle="round,pad=0.04,rounding_size=0.1",
                          facecolor='#F1F5F9', edgecolor='#CBD5E1', lw=1.2)
    ax.add_patch(c_p5)
    ax.text(1.35, 5.25, "Nation & MoD:", fontsize=9.0, fontweight='bold', color='#EA580C', ha='center')
    ax.text(1.35, 4.65, "100% sovereign defense IP;\neliminates Austrian OEM lock-in;\n₹35–50L saved per\nairframe annually.", fontsize=7.6, color='#000000', ha='center')
    ax.plot([2.6, 2.5], [4.4, 4.4], color='#EA580C', lw=1.5)

    # Right: Quotes
    b_banner = FancyBboxPatch((7.6, 6.4), 6.1, 0.55, boxstyle="round,pad=0.06,rounding_size=0.25",
                              facecolor='#0284C7', edgecolor='#0369A1', lw=1.5)
    ax.add_patch(b_banner)
    ax.text(10.65, 6.67, "Operational, Economic & Strategic Benefits", fontsize=11.5, fontweight='bold', color='#FFFFFF', ha='center', va='center')

    benefits = [
        ("Operational & Mission Safety (Airframe Preservation)",
         "Eliminates the catastrophic 'abort-vs-crash' panic. Delivers 5–15 minute early warning before mechanical failure, cutting false aborts to <1.5% and preserving multi-crore border surveillance missions.",
         "#EA580C", 4.75),
        ("Economic & Fleet Availability (Condition-Based TBO)",
         "Dynamic wear-calibrated maintenance replaces static calendar strip-downs, saving ₹35–50 Lakhs per airframe/year, increasing squadron availability by 28%, and delivering >350% system ROI.",
         "#16A34A", 2.95),
        ("Strategic Defense Sovereignty (Atmanirbhar Bharat)",
         "100% indigenous propulsion telemetry intelligence eliminating foreign OEM diagnostic dependence. Delivers 6–9% fuel reduction via optimal trims and verified high-altitude border persistence.",
         "#0284C7", 1.15)
    ]

    for title, desc, col, y in benefits:
        c = FancyBboxPatch((7.6, y), 6.1, 1.50, boxstyle="round,pad=0.06,rounding_size=0.12",
                           facecolor='#FFFFFF', edgecolor=col, lw=1.8)
        ax.add_patch(c)
        ax.text(7.85, y + 1.20, title, fontsize=9.6, fontweight='bold', color=col)
        ax.text(7.85, y + 0.48, f"\"{desc}\"", fontsize=8.0, color='#000000', style='italic', wrap=True)

    # Bottom Quote
    q_bar = FancyBboxPatch((0.2, 0.1), 13.5, 0.6, boxstyle="round,pad=0.06,rounding_size=0.25",
                           facecolor='#F8FAFC', edgecolor='#CBD5E1', lw=1.5)
    ax.add_patch(q_bar)
    ax.text(6.95, 0.40, "\"India's first real-time edge AI digital twin for defense UAVs — preventing crashes, maximizing sortie readiness, and powering Atmanirbhar Bharat.\"",
            fontsize=8.8, fontweight='bold', color='#0F172A', ha='center', va='center')

    plt.tight_layout()
    plt.savefig('assets/pdf_slide5_impact.png', dpi=300, bbox_inches='tight', facecolor='#FFFFFF')
    plt.close()
    print("Created assets/pdf_slide5_impact.png")

if __name__ == '__main__':
    create_slide2_workflow()
    create_slide2_innovation()
    create_slide3_architecture()
    create_slide3_process()
    create_slide4_challenges_mitigation()
    create_slide5_impact()
    print("All reference PDF-style visual diagrams generated successfully with upgraded legible font sizes!")
