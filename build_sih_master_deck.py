import os
import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def create_deck():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Color Palette - Professional Defense Grade
    C_NAVY_BANNER = RGBColor(0, 91, 148)     # #005B94 Official SIH Reference Blue
    C_FOOTER_BLUE = RGBColor(0, 91, 148)     # Matching bottom ribbon
    C_BLACK = RGBColor(0, 0, 0)              # 100% Solid Black for maximum contrast & readability
    C_BOLD_BLACK = RGBColor(15, 23, 42)      # Deep Black / Charcoal
    C_WHITE = RGBColor(255, 255, 255)
    C_CARD_BG = RGBColor(255, 255, 255)      # Clean crisp white card fill
    C_CARD_BD = RGBColor(203, 213, 225)      # Slate border
    C_SUBTLE_BG = RGBColor(248, 250, 252)    # Subtle off-white
    C_BLUE_TAG = RGBColor(238, 246, 255)     # Tag fill
    C_TAG_BD = RGBColor(186, 218, 255)       # Tag border
    C_ARROW = RGBColor(71, 85, 105)          # Slate arrow color

    def add_footer(slide, slide_num):
        # Full width bottom blue ribbon
        footer_bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.0), Inches(7.05), Inches(13.333), Inches(0.45))
        footer_bar.fill.solid()
        footer_bar.fill.fore_color.rgb = C_FOOTER_BLUE
        footer_bar.line.fill.background()

        # Center Text
        tx = slide.shapes.add_textbox(Inches(3.0), Inches(7.08), Inches(7.333), Inches(0.38))
        tf = tx.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
        p = tf.paragraphs[0]
        p.text = "SMART INDIA HACKATHON 2026"
        p.font.size = Pt(12)
        p.font.bold = True
        p.font.color.rgb = C_WHITE
        p.alignment = PP_ALIGN.CENTER

        # Slide Number Right
        tx_num = slide.shapes.add_textbox(Inches(12.0), Inches(7.08), Inches(1.0), Inches(0.38))
        tf_num = tx_num.text_frame
        tf_num.word_wrap = True
        tf_num.margin_left = tf_num.margin_right = tf_num.margin_top = tf_num.margin_bottom = 0
        p_num = tf_num.paragraphs[0]
        p_num.text = str(slide_num)
        p_num.font.size = Pt(12)
        p_num.font.bold = True
        p_num.font.color.rgb = C_WHITE
        p_num.alignment = PP_ALIGN.RIGHT

    def add_banner_header(slide, title_text):
        # Blue pill banner leaving room for top-right official SIH logo
        banner = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(0.20), Inches(9.8), Inches(0.60))
        banner.fill.solid()
        banner.fill.fore_color.rgb = C_NAVY_BANNER
        banner.line.fill.background()

        tf = banner.text_frame
        tf.vertical_anchor = MSO_ANCHOR.MIDDLE
        tf.margin_left = Inches(0.3)
        tf.margin_right = Inches(0.3)
        tf.margin_top = Inches(0.0)
        tf.margin_bottom = Inches(0.0)
        p = tf.paragraphs[0]
        p.text = title_text
        p.font.size = Pt(19)
        p.font.bold = True
        p.font.color.rgb = C_WHITE
        p.alignment = PP_ALIGN.LEFT

        # Add Official SIH 2026 Header logo on clean white background
        if os.path.exists('assets/sih_header_logo.png'):
            slide.shapes.add_picture('assets/sih_header_logo.png', Inches(10.8), Inches(0.12), width=Inches(1.9))

    # =========================================================================
    # SLIDE 1: Title Slide (Official SIH 2026 Format matching reference template)
    # =========================================================================
    slide1 = prs.slides.add_slide(blank_layout)

    # 1. Background with Official SIH Watermark & Bulb Emblem
    if os.path.exists('assets/slide1_sih_official_background.png'):
        slide1.shapes.add_picture('assets/slide1_sih_official_background.png', Inches(0), Inches(0), width=Inches(13.333), height=Inches(7.5))

    # 2. Top-Left Title: SMART INDIA HACKATHON 2026
    tx_title = slide1.shapes.add_textbox(Inches(0.8), Inches(0.55), Inches(9.5), Inches(0.85))
    tf_title = tx_title.text_frame
    tf_title.word_wrap = True
    tf_title.margin_left = tf_title.margin_top = tf_title.margin_right = tf_title.margin_bottom = 0
    p_title = tf_title.paragraphs[0]
    p_title.text = "SMART INDIA HACKATHON 2026"
    p_title.font.name = "Times New Roman"
    p_title.font.size = Pt(36)
    p_title.font.bold = True
    p_title.font.color.rgb = RGBColor(31, 73, 125)

    # 3. Top-Right Header Logo with 2026
    if os.path.exists('assets/sih_header_logo.png'):
        slide1.shapes.add_picture('assets/sih_header_logo.png', Inches(10.7), Inches(0.38), width=Inches(2.1))

    # 4. Left Bullets with Bold Headlines - Exact SIH Details & SIH26054
    tx_body = slide1.shapes.add_textbox(Inches(0.8), Inches(1.80), Inches(7.6), Inches(5.2))
    tf_body = tx_body.text_frame
    tf_body.word_wrap = True
    tf_body.margin_left = tf_body.margin_top = tf_body.margin_right = tf_body.margin_bottom = 0

    slide1_items = [
        ("Problem Statement ID", "SIH26054"),
        ("Problem Statement  Title", "AI-Enabled Real-Time Digital Twin System for Health Monitoring, Fault Prediction and Mission Reliability Enhancement of Aero Piston Engines used in MALE UAVs"),
        ("Theme", "Defense, Aerospace & Security / Smart Aviation Readiness"),
        ("PS Category", "Software"),
        ("Team ID", ""),
        ("Team Name", "Mindsmiths")
    ]

    for i, (headline, val) in enumerate(slide1_items):
        p = tf_body.paragraphs[0] if i == 0 else tf_body.add_paragraph()
        if i > 0:
            p.space_before = Pt(13)

        # Bullet dot
        r_bullet = p.add_run()
        r_bullet.text = "• "
        r_bullet.font.name = "Calibri"
        r_bullet.font.size = Pt(20.5)
        r_bullet.font.bold = True
        r_bullet.font.color.rgb = C_BLACK

        # Bold headline label
        r_head = p.add_run()
        r_head.text = f"{headline}  –  "
        r_head.font.name = "Calibri"
        r_head.font.size = Pt(20.5)
        r_head.font.bold = True
        r_head.font.color.rgb = C_BLACK

        # Value
        if val:
            r_val = p.add_run()
            r_val.text = val
            r_val.font.name = "Calibri"
            r_val.font.size = Pt(20.5)
            r_val.font.bold = (headline == "Problem Statement ID")
            r_val.font.color.rgb = RGBColor(15, 23, 42)

    # =========================================================================
    # SLIDE 2: Proposed Solution / Approach (Native Editable Diagram)
    # =========================================================================
    slide2 = prs.slides.add_slide(blank_layout)
    add_banner_header(slide2, "Proposed Solution / Approach")

    # Left Column: "Brief Idea of Proposed Solution"
    left_pill = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(0.92), Inches(3.9), Inches(0.44))
    left_pill.fill.solid()
    left_pill.fill.fore_color.rgb = C_NAVY_BANNER
    left_pill.line.fill.background()
    p_lp = left_pill.text_frame.paragraphs[0]
    p_lp.text = "Brief Idea of Proposed Solution"
    p_lp.font.size = Pt(13.5)
    p_lp.font.bold = True
    p_lp.font.color.rgb = C_WHITE
    p_lp.alignment = PP_ALIGN.CENTER

    left_card = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(1.42), Inches(3.9), Inches(5.48))
    left_card.fill.solid()
    left_card.fill.fore_color.rgb = C_WHITE
    left_card.line.color.rgb = C_CARD_BD
    left_card.line.width = Pt(1.5)

    tf_sol = left_card.text_frame
    tf_sol.word_wrap = True
    tf_sol.margin_left = Inches(0.20)
    tf_sol.margin_right = Inches(0.20)
    tf_sol.margin_top = Inches(0.18)

    solution_bullets = [
        ("Multi-Modal Digital Twin Software:", " Fuses Physics-Informed Neural Networks (PINN) and Extended Kalman Filtering (EKF) calibrated for Rotax 914/915 iS aero engines powering MALE UAVs."),
        ("3-Tier Predictive Horizon:", " Ingests 100 Hz sensor telemetry streams (CHT, EGT, MAP, Vibration, Fuel Flow) to forecast critical anomalies 5 to 15 minutes before threshold breaches."),
        ("Causal DAG Disambiguation:", " Employs Directed Acyclic Graphs & 3-way residual analysis to isolate sensor drift from true mechanical faults, cutting false aborts to <1.5%."),
        ("Prescriptive Trim Vectors:", " Automatically computes Pareto-optimal throttle and altitude de-rate trims (e.g. -800m descent, 85% throttle) to preserve engine life & sortie recovery."),
        ("Software-First Edge Execution:", " Highly optimized C++/TensorRT software pipeline running non-intrusively on standard UAV Mission Computers or GCS (<2W CPU) with zero flight interference.")
    ]

    for i, (b_title, b_desc) in enumerate(solution_bullets):
        p = tf_sol.paragraphs[0] if i == 0 else tf_sol.add_paragraph()
        p.space_before = Pt(7.0)
        run_t = p.add_run()
        run_t.text = "• " + b_title
        run_t.font.bold = True
        run_t.font.size = Pt(12.5)
        run_t.font.color.rgb = C_NAVY_BANNER
        run_d = p.add_run()
        run_d.text = b_desc
        run_d.font.bold = False
        run_d.font.size = Pt(11.8)
        run_d.font.color.rgb = C_BLACK

    # Right Column Top: Native Operational Workflow Diagram
    wf_box = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.7), Inches(0.92), Inches(8.033), Inches(2.72))
    wf_box.fill.solid()
    wf_box.fill.fore_color.rgb = C_WHITE
    wf_box.line.color.rgb = C_CARD_BD
    wf_box.line.width = Pt(1.5)

    # Workflow Title
    tx_wf_t = slide2.shapes.add_textbox(Inches(4.8), Inches(1.00), Inches(7.8), Inches(0.32))
    p = tx_wf_t.text_frame.paragraphs[0]
    p.text = "AERIS-TWIN End-to-End Operational Workflow (Software Pipeline)"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = C_NAVY_BANNER
    p.alignment = PP_ALIGN.CENTER

    # Workflow Blocks (Row 1, Row 2, Row 3)
    def add_wf_block(slide, left, top, width, height, title, subtitle, bg_rgb, bd_rgb, title_rgb=C_BOLD_BLACK):
        box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(left), Inches(top), Inches(width), Inches(height))
        box.fill.solid()
        box.fill.fore_color.rgb = bg_rgb
        box.line.color.rgb = bd_rgb
        box.line.width = Pt(1.2)
        tf = box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = Inches(0.04)
        tf.margin_top = tf.margin_bottom = Inches(0.02)
        p0 = tf.paragraphs[0]
        p0.text = title
        p0.font.size = Pt(10.5)
        p0.font.bold = True
        p0.font.color.rgb = title_rgb
        p0.alignment = PP_ALIGN.CENTER
        if subtitle:
            p1 = tf.add_paragraph()
            p1.text = subtitle
            p1.font.size = Pt(9.2)
            p1.font.color.rgb = C_BLACK
            p1.alignment = PP_ALIGN.CENTER
        return box

    # Start Sortie (Top-Left)
    add_wf_block(slide2, 4.9, 1.34, 1.45, 0.46, "Start Sortie", "", RGBColor(252, 231, 243), RGBColor(219, 39, 119), RGBColor(190, 24, 93))
    # Down arrow to Telemetry
    a1 = slide2.shapes.add_shape(MSO_SHAPE.DOWN_ARROW, Inches(5.5), Inches(1.83), Inches(0.2), Inches(0.24))
    a1.fill.solid()
    a1.fill.fore_color.rgb = C_ARROW
    a1.line.fill.background()

    # Telemetry Ingestion Box
    add_wf_block(slide2, 4.9, 2.10, 1.75, 0.68, "Telemetry Ingestion", "5 Hz CHT, EGT, RPM, MAP", RGBColor(254, 243, 199), RGBColor(217, 119, 6))

    # Right Arrow to Physics-AI Residuals
    a2 = slide2.shapes.add_shape(MSO_SHAPE.RIGHT_ARROW, Inches(6.70), Inches(2.32), Inches(0.28), Inches(0.2))
    a2.fill.solid()
    a2.fill.fore_color.rgb = C_ARROW
    a2.line.fill.background()

    # Physics-AI Residuals
    add_wf_block(slide2, 7.02, 2.10, 1.95, 0.68, "Physics-AI Residuals", "Thermodynamic Model & DNA", RGBColor(254, 240, 138), RGBColor(202, 138, 4))

    # Right Arrow to Anomaly Decision
    a3 = slide2.shapes.add_shape(MSO_SHAPE.RIGHT_ARROW, Inches(9.02), Inches(2.32), Inches(0.26), Inches(0.2))
    a3.fill.solid()
    a3.fill.fore_color.rgb = C_ARROW
    a3.line.fill.background()

    # Diamond Anomaly Decision
    dm = slide2.shapes.add_shape(MSO_SHAPE.DIAMOND, Inches(9.32), Inches(2.06), Inches(1.15), Inches(0.78))
    dm.fill.solid()
    dm.fill.fore_color.rgb = RGBColor(37, 99, 235)
    dm.line.color.rgb = RGBColor(29, 78, 216)
    tf_dm = dm.text_frame
    tf_dm.word_wrap = True
    tf_dm.vertical_anchor = MSO_ANCHOR.MIDDLE
    tf_dm.margin_left = tf_dm.margin_right = tf_dm.margin_top = tf_dm.margin_bottom = 0
    p_dm = tf_dm.paragraphs[0]
    p_dm.text = "Anomaly?"
    p_dm.font.size = Pt(9.5)
    p_dm.font.bold = True
    p_dm.font.color.rgb = C_WHITE
    p_dm.alignment = PP_ALIGN.CENTER

    # Branch NO -> Up to Nominal Flight
    tx_no = slide2.shapes.add_textbox(Inches(9.95), Inches(1.36), Inches(0.45), Inches(0.32))
    tx_no.text_frame.paragraphs[0].text = "No"
    tx_no.text_frame.paragraphs[0].font.size = Pt(10.5)
    tx_no.text_frame.paragraphs[0].font.bold = True
    tx_no.text_frame.paragraphs[0].font.color.rgb = RGBColor(21, 128, 61)

    a_no = slide2.shapes.add_shape(MSO_SHAPE.UP_ARROW, Inches(9.80), Inches(1.72), Inches(0.2), Inches(0.30))
    a_no.fill.solid()
    a_no.fill.fore_color.rgb = RGBColor(22, 163, 74)
    a_no.line.fill.background()

    add_wf_block(slide2, 10.45, 1.34, 2.15, 0.46, "Nominal Flight (Sortie OK)", "", RGBColor(220, 252, 231), RGBColor(22, 163, 74), RGBColor(21, 128, 61))

    # Branch YES -> Right to Causal DAG
    tx_yes = slide2.shapes.add_textbox(Inches(10.50), Inches(2.06), Inches(0.45), Inches(0.32))
    tx_yes.text_frame.paragraphs[0].text = "Yes"
    tx_yes.text_frame.paragraphs[0].font.size = Pt(10.5)
    tx_yes.text_frame.paragraphs[0].font.bold = True
    tx_yes.text_frame.paragraphs[0].font.color.rgb = RGBColor(67, 56, 202)

    a_yes = slide2.shapes.add_shape(MSO_SHAPE.RIGHT_ARROW, Inches(10.52), Inches(2.32), Inches(0.28), Inches(0.2))
    a_yes.fill.solid()
    a_yes.fill.fore_color.rgb = RGBColor(67, 56, 202)
    a_yes.line.fill.background()

    add_wf_block(slide2, 10.84, 2.10, 1.76, 0.68, "Causal DAG Analysis", "Isolates Injector vs Sensor", RGBColor(224, 231, 255), RGBColor(67, 56, 202), RGBColor(55, 48, 163))

    # Row 3 (Bottom Row of Workflow)
    # Down arrow from Causal DAG to Prescriptive Trim
    a_down = slide2.shapes.add_shape(MSO_SHAPE.DOWN_ARROW, Inches(11.60), Inches(2.82), Inches(0.2), Inches(0.24))
    a_down.fill.solid()
    a_down.fill.fore_color.rgb = C_ARROW
    a_down.line.fill.background()

    add_wf_block(slide2, 10.5, 3.10, 2.10, 0.46, "Prescriptive Flight Trims", "Pareto: Step -800m, 85%", RGBColor(255, 237, 213), RGBColor(234, 88, 12), RGBColor(194, 65, 12))

    # Left arrow to Cockpit Alert
    a_left = slide2.shapes.add_shape(MSO_SHAPE.LEFT_ARROW, Inches(10.05), Inches(3.22), Inches(0.38), Inches(0.2))
    a_left.fill.solid()
    a_left.fill.fore_color.rgb = C_ARROW
    a_left.line.fill.background()

    add_wf_block(slide2, 7.68, 3.10, 2.32, 0.46, "Cockpit Alert & HUD Advisory", "FADEC Synchronized Sync", RGBColor(254, 243, 199), RGBColor(217, 119, 6))

    add_wf_block(slide2, 4.90, 3.10, 2.65, 0.46, "Sensor Guard Hub (Trust T)", "8σ Noise & Spoof Filter", RGBColor(254, 243, 199), RGBColor(217, 119, 6))

    # Right Column Bottom: Native Innovation and Uniqueness Branching Diagram
    inn_box = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.7), Inches(3.75), Inches(8.033), Inches(3.15))
    inn_box.fill.solid()
    inn_box.fill.fore_color.rgb = C_WHITE
    inn_box.line.color.rgb = C_CARD_BD
    inn_box.line.width = Pt(1.5)

    # Top Central Pill: Innovation and Uniqueness
    top_inn = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.0), Inches(3.86), Inches(3.4), Inches(0.44))
    top_inn.fill.solid()
    top_inn.fill.fore_color.rgb = RGBColor(51, 65, 85)
    top_inn.line.fill.background()
    p_ti = top_inn.text_frame.paragraphs[0]
    p_ti.text = "Innovation and Uniqueness"
    p_ti.font.size = Pt(13.5)
    p_ti.font.bold = True
    p_ti.font.color.rgb = C_WHITE
    p_ti.alignment = PP_ALIGN.CENTER

    # 5 Branching Cards
    inn_cards = [
        ("Sensor Integrity\nGuard", "Trust Index T in [0,1]; 8σ statistical spike test; rejects cyber-spoofing.", RGBColor(254, 243, 199), RGBColor(217, 119, 6)),
        ("Personalized\nEngine DNA", "Serial-specific wear profiling with online anti-poisoning gating.", RGBColor(254, 249, 195), RGBColor(202, 138, 4)),
        ("3-Way Residual\nDisambiguator", "Physical wear vs sensor drift vs model split; zero false aborts.", RGBColor(220, 252, 231), RGBColor(22, 163, 74)),
        ("Ensemble\nQuantile RUL", "LSTM + Physics hybrid; Q10/Q50/Q90 envelopes; 29.3% variance cut.", RGBColor(255, 228, 230), RGBColor(225, 29, 72)),
        ("Prescriptive\nFlight Trims", "Calculates Pareto trims (-800m, 85% throttle); saves engine & sortie.", RGBColor(204, 251, 241), RGBColor(13, 148, 136))
    ]

    card_w = 1.48
    gap_w = 0.1
    start_x = 4.82
    y_card = 4.46

    for idx, (c_title, c_desc, bg_col, bd_col) in enumerate(inn_cards):
        cx = start_x + idx * (card_w + gap_w)
        c_shape = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(cx), Inches(y_card), Inches(card_w), Inches(2.32))
        c_shape.fill.solid()
        c_shape.fill.fore_color.rgb = bg_col
        c_shape.line.color.rgb = bd_col
        c_shape.line.width = Pt(1.4)

        tf = c_shape.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = Inches(0.06)
        tf.margin_top = Inches(0.12)
        p0 = tf.paragraphs[0]
        p0.text = c_title
        p0.font.size = Pt(11)
        p0.font.bold = True
        p0.font.color.rgb = C_BOLD_BLACK
        p0.alignment = PP_ALIGN.CENTER

        p1 = tf.add_paragraph()
        p1.space_before = Pt(6)
        p1.text = c_desc
        p1.font.size = Pt(9.6)
        p1.font.color.rgb = C_BLACK
        p1.alignment = PP_ALIGN.CENTER

    add_footer(slide2, 2)

    # =========================================================================
    # SLIDE 3: Technical Approach (Native Editable Diagram)
    # =========================================================================
    slide3 = prs.slides.add_slide(blank_layout)
    add_banner_header(slide3, "Technical Approach")

    # Left Section: 4-Zone Technical Architecture Diagram
    arch_bg = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(0.92), Inches(9.1), Inches(5.4))
    arch_bg.fill.solid()
    arch_bg.fill.fore_color.rgb = C_WHITE
    arch_bg.line.color.rgb = C_CARD_BD
    arch_bg.line.width = Pt(1.5)

    # 4 Zone Columns
    zones_data = [
        ("Zone 1\nIngested Telemetry", RGBColor(239, 246, 255), RGBColor(147, 197, 253), [
            ("Rotax 914/915 Sensor Suite", "4x CHT & 4x EGT Probes\nMAP & Crankshaft RPM\nPiezo Oil & Flowmeter\nHigh-G Vibration Probes"),
            ("Aircraft Bus Interface", "28V DC MIL-STD-704F\nPassive Sniffer Driver\n< 2W Operational Draw"),
            ("Ambient Telemetry", "Altitude Barometer\nAmbient Air Density\nGPS-Denied Local Clock")
        ]),
        ("Zone 2\nEdge Computing Stack", RGBColor(240, 253, 244), RGBColor(134, 239, 172), [
            ("CAN / ARINC Driver", "5 Hz Non-Intrusive Sniffer"),
            ("Sensor Guard Hub", "Trust Score T & 8σ Spike Check"),
            ("Anti-Poisoning Gateway", "Rejects Malicious Injections"),
            ("Ring Buffer Telemetry", "5 Hz Low-Latency Sync Hub"),
            ("Deterministic RTOS", "Guaranteed 200ms Execution")
        ]),
        ("Zone 3\nDigital Twin AI Core", RGBColor(250, 245, 255), RGBColor(216, 180, 254), [
            ("Thermodynamic Twin", "First-principles energy model"),
            ("Personalized Engine DNA", "Serial-specific wear vectors"),
            ("Causal Inference DAG", "Root-cause fault isolation"),
            ("Hybrid LSTM-RUL", "Conformal 90% Q10/Q50/Q90"),
            ("Monte Carlo Mission", "500 stochastic projections")
        ]),
        ("Zone 4\nCockpit & GCS Output", RGBColor(236, 254, 255), RGBColor(103, 232, 249), [
            ("FADEC Harmonizer", "5-15 min pre-alarm advisory"),
            ("Counterfactual Engine", "Pareto optimal altitude/trim"),
            ("Cockpit MFD OLED Unit", "Real-time ASI & RUL margin"),
            ("Mobile GCS HUD", "Encrypted pilot situational tablet"),
            ("SHA-256 Black Box", "Immutable military audit log")
        ])
    ]

    z_w = 2.12
    z_gap = 0.12
    z_start_x = 0.72

    for z_idx, (z_title, z_bg, z_bd, z_cards) in enumerate(zones_data):
        zx = z_start_x + z_idx * (z_w + z_gap)

        # Zone Container
        z_box = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(zx), Inches(1.02), Inches(z_w), Inches(5.2))
        z_box.fill.solid()
        z_box.fill.fore_color.rgb = z_bg
        z_box.line.color.rgb = z_bd
        z_box.line.width = Pt(1.2)

        # Zone Header
        tx_zh = slide3.shapes.add_textbox(Inches(zx), Inches(1.04), Inches(z_w), Inches(0.50))
        p = tx_zh.text_frame.paragraphs[0]
        p.text = z_title
        p.font.size = Pt(10.5)
        p.font.bold = True
        p.font.color.rgb = C_NAVY_BANNER
        p.alignment = PP_ALIGN.CENTER

        # Sub-cards inside Zone
        c_count = len(z_cards)
        c_h = 4.35 / c_count - 0.08
        for c_idx, (ct, cd) in enumerate(z_cards):
            cy = 1.6 + c_idx * (c_h + 0.08)
            card = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(zx + 0.07), Inches(cy), Inches(z_w - 0.14), Inches(c_h))
            card.fill.solid()
            card.fill.fore_color.rgb = C_WHITE
            card.line.color.rgb = z_bd
            card.line.width = Pt(1.0)
            tf = card.text_frame
            tf.word_wrap = True
            tf.margin_left = tf.margin_right = Inches(0.04)
            tf.margin_top = Inches(0.04)
            tf.margin_bottom = Inches(0.02)

            p0 = tf.paragraphs[0]
            p0.text = ct
            p0.font.size = Pt(10) if c_count == 3 else Pt(9.5)
            p0.font.bold = True
            p0.font.color.rgb = C_BOLD_BLACK
            p0.alignment = PP_ALIGN.CENTER

            p1 = tf.add_paragraph()
            p1.text = cd
            p1.font.size = Pt(9.0) if c_count == 3 else Pt(8.6)
            p1.font.color.rgb = C_BLACK
            p1.alignment = PP_ALIGN.CENTER

    # Bottom Tech Stack Bar
    ts_bar = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(6.40), Inches(9.1), Inches(0.54))
    ts_bar.fill.solid()
    ts_bar.fill.fore_color.rgb = C_SUBTLE_BG
    ts_bar.line.color.rgb = C_CARD_BD
    ts_bar.line.width = Pt(1.2)

    tx_ts = slide3.shapes.add_textbox(Inches(0.7), Inches(6.44), Inches(1.3), Inches(0.42))
    p = tx_ts.text_frame.paragraphs[0]
    p.text = "Tech Stack:"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = C_NAVY_BANNER

    badges = ["Embedded C/C++", "PyTorch", "TensorRT INT8", "FreeRTOS", "CANAerospace", "ROS2 / MAVLink"]
    for b_idx, b_txt in enumerate(badges):
        bx = 2.1 + b_idx * 1.25
        b_box = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(bx), Inches(6.46), Inches(1.18), Inches(0.40))
        b_box.fill.solid()
        b_box.fill.fore_color.rgb = C_WHITE
        b_box.line.color.rgb = C_NAVY_BANNER
        b_box.line.width = Pt(1.0)
        p = b_box.text_frame.paragraphs[0]
        p.text = b_txt
        p.font.size = Pt(9.5)
        p.font.bold = True
        p.font.color.rgb = C_NAVY_BANNER
        p.alignment = PP_ALIGN.CENTER

    # Right Section: Implementation Process Chain (Native Editable Diagram)
    proc_bg = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(9.85), Inches(0.92), Inches(2.88), Inches(6.02))
    proc_bg.fill.solid()
    proc_bg.fill.fore_color.rgb = C_WHITE
    proc_bg.line.color.rgb = RGBColor(225, 29, 72)
    proc_bg.line.width = Pt(1.5)

    tx_pr_t = slide3.shapes.add_textbox(Inches(9.95), Inches(1.02), Inches(2.68), Inches(0.42))
    p = tx_pr_t.text_frame.paragraphs[0]
    p.text = "Implementation Process"
    p.font.size = Pt(13.5)
    p.font.bold = True
    p.font.color.rgb = RGBColor(190, 24, 93)
    p.alignment = PP_ALIGN.CENTER

    steps_data = [
        ("1", RGBColor(15, 23, 42), "Telemetry Ingestion", "5 Hz Rotax CAN bus streaming captures engine sensor state."),
        ("2", RGBColor(2, 132, 199), "Sensor Integrity Check", "Computes Trust Index T in [0,1]; rejects noise & spoofing."),
        ("3", RGBColor(217, 119, 6), "Digital Twin Modeling", "Thermodynamic energy residuals compared with engine DNA."),
        ("4", RGBColor(202, 138, 4), "Causal Root-Cause DAG", "SHAP + do-calculus isolates true root injector/bearing fault."),
        ("5", RGBColor(22, 163, 74), "Prescriptive Flight Trim", "Pareto in-flight advisory trims (step -800m, throttle 85%)."),
        ("6", RGBColor(225, 29, 72), "Sortie Logging & Debrief", "5 Hz SHA-256 black box buffer; auto ground work orders.")
    ]

    for s_idx, (num, col, s_title, s_desc) in enumerate(steps_data):
        sy = 1.58 + s_idx * 0.88

        # Circle Number
        circ = slide3.shapes.add_shape(MSO_SHAPE.OVAL, Inches(9.98), Inches(sy + 0.06), Inches(0.46), Inches(0.46))
        circ.fill.solid()
        circ.fill.fore_color.rgb = col
        circ.line.fill.background()
        p = circ.text_frame.paragraphs[0]
        p.text = num
        p.font.size = Pt(12)
        p.font.bold = True
        p.font.color.rgb = C_WHITE
        p.alignment = PP_ALIGN.CENTER

        # Step Text
        tx_s = slide3.shapes.add_textbox(Inches(10.52), Inches(sy), Inches(2.15), Inches(0.84))
        tf = tx_s.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
        p0 = tf.paragraphs[0]
        p0.text = s_title
        p0.font.size = Pt(11)
        p0.font.bold = True
        p0.font.color.rgb = C_BOLD_BLACK

        p1 = tf.add_paragraph()
        p1.text = s_desc
        p1.font.size = Pt(9.5)
        p1.font.color.rgb = C_BLACK

    add_footer(slide3, 3)

    # =========================================================================
    # SLIDE 4: Feasibility and Viability (Native Challenges vs Strategies Diagram)
    # =========================================================================
    slide4 = prs.slides.add_slide(blank_layout)
    add_banner_header(slide4, "Feasibility and Viability")

    # Outer Container Card
    c_all = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(0.92), Inches(12.133), Inches(6.03))
    c_all.fill.solid()
    c_all.fill.fore_color.rgb = C_WHITE
    c_all.line.color.rgb = C_CARD_BD
    c_all.line.width = Pt(1.5)

    # Center Vertical Dotted Divider
    div_line = slide4.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(6.66), Inches(1.15), Inches(0.02), Inches(5.55))
    div_line.fill.solid()
    div_line.fill.fore_color.rgb = RGBColor(203, 213, 225)
    div_line.line.fill.background()

    # Dotted divider accent nodes
    dot_top = slide4.shapes.add_shape(MSO_SHAPE.OVAL, Inches(6.62), Inches(1.12), Inches(0.10), Inches(0.10))
    dot_top.fill.solid()
    dot_top.fill.fore_color.rgb = RGBColor(148, 163, 184)
    dot_top.line.fill.background()

    dot_bot = slide4.shapes.add_shape(MSO_SHAPE.OVAL, Inches(6.62), Inches(6.70), Inches(0.10), Inches(0.10))
    dot_bot.fill.solid()
    dot_bot.fill.fore_color.rgb = RGBColor(148, 163, 184)
    dot_bot.line.fill.background()

    # Left Circular Hub: "Potential Challenges & Risks"
    hub_l = slide4.shapes.add_shape(MSO_SHAPE.OVAL, Inches(0.85), Inches(2.95), Inches(1.95), Inches(1.95))
    hub_l.fill.solid()
    hub_l.fill.fore_color.rgb = RGBColor(241, 245, 249)
    hub_l.line.color.rgb = RGBColor(148, 163, 184)
    hub_l.line.width = Pt(1.8)

    tf_hl = hub_l.text_frame
    tf_hl.word_wrap = True
    tf_hl.vertical_anchor = MSO_ANCHOR.MIDDLE
    tf_hl.margin_left = tf_hl.margin_right = tf_hl.margin_top = tf_hl.margin_bottom = 0
    p = tf_hl.paragraphs[0]
    p.text = "Potential"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = C_BOLD_BLACK
    p.alignment = PP_ALIGN.CENTER

    p2 = tf_hl.add_paragraph()
    p2.text = "Challenges &"
    p2.font.size = Pt(13)
    p2.font.bold = True
    p2.font.color.rgb = C_BOLD_BLACK
    p2.alignment = PP_ALIGN.CENTER

    p3 = tf_hl.add_paragraph()
    p3.text = "Risks"
    p3.font.size = Pt(13)
    p3.font.bold = True
    p3.font.color.rgb = C_BOLD_BLACK
    p3.alignment = PP_ALIGN.CENTER

    # Left Red Accent Bar under hub text
    bar_l = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.60), Inches(4.35), Inches(0.45), Inches(0.04))
    bar_l.fill.solid()
    bar_l.fill.fore_color.rgb = RGBColor(220, 38, 38)
    bar_l.line.fill.background()

    # Right Circular Hub: "Strategies For Overcoming Challenges"
    hub_r = slide4.shapes.add_shape(MSO_SHAPE.OVAL, Inches(10.53), Inches(2.95), Inches(1.95), Inches(1.95))
    hub_r.fill.solid()
    hub_r.fill.fore_color.rgb = RGBColor(240, 253, 244)
    hub_r.line.color.rgb = RGBColor(34, 197, 94)
    hub_r.line.width = Pt(1.8)

    tf_hr = hub_r.text_frame
    tf_hr.word_wrap = True
    tf_hr.vertical_anchor = MSO_ANCHOR.MIDDLE
    tf_hr.margin_left = tf_hr.margin_right = tf_hr.margin_top = tf_hr.margin_bottom = 0
    p = tf_hr.paragraphs[0]
    p.text = "Strategies For"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = RGBColor(21, 128, 61)
    p.alignment = PP_ALIGN.CENTER

    p2 = tf_hr.add_paragraph()
    p2.text = "Overcoming"
    p2.font.size = Pt(13)
    p2.font.bold = True
    p2.font.color.rgb = RGBColor(21, 128, 61)
    p2.alignment = PP_ALIGN.CENTER

    p3 = tf_hr.add_paragraph()
    p3.text = "Challenges"
    p3.font.size = Pt(13)
    p3.font.bold = True
    p3.font.color.rgb = RGBColor(21, 128, 61)
    p3.alignment = PP_ALIGN.CENTER

    # Right Green Accent Bar under hub text
    bar_r = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(11.28), Inches(4.35), Inches(0.45), Inches(0.04))
    bar_r.fill.solid()
    bar_r.fill.fore_color.rgb = RGBColor(22, 163, 74)
    bar_r.line.fill.background()

    # Data for 5 Challenges and 5 Strategies (Matching user's Image 1 exactly!)
    challenges_data = [
        ("Hostile Environmental Extremes:", "Thar Desert 48°C & Ladakh 5,800m altitude non-linear drift."),
        ("Sensor Noise & Cyber Spoofing:", "In-flight electrical interference triggers false abort panic."),
        ("Inter-Engine Wear Divergence:", "Factory thresholds fail on individual degradation profiles."),
        ("Severe Edge Compute SWaP Limits:", "MALE UAVs restrict avionics payload power to < 2W."),
        ("Military Airworthiness Certification:", "Strict DO-178C / DO-254 software determinism.")
    ]

    strategies_data = [
        ("India Theatre Wargaming:", "Pre-stresses models against desert and Himalayan profiles."),
        ("8σ Adversarial Guard:", "Real-time Trust Index & sensor check reject spoofing."),
        ("Personalized Engine DNA:", "Serial-calibrated wear tracking with anti-poisoning updates."),
        ("Edge-Optimized TensorRT:", "Lightweight quantized INT8 models running deterministic 5 Hz cycles."),
        ("Certified Fail-Passive Logic:", "Non-intrusive CAN sniffer with automatic OEM FADEC fallback.")
    ]

    # Tree Connector Geometry
    # Left Red Trunk: X = 2.98
    trunk_l = slide4.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(2.98), Inches(1.68), Inches(0.03), Inches(4.48))
    trunk_l.fill.solid()
    trunk_l.fill.fore_color.rgb = RGBColor(220, 38, 38)
    trunk_l.line.fill.background()

    # Horizontal connector from Hub to Trunk
    conn_hl = slide4.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(2.80), Inches(3.91), Inches(0.18), Inches(0.03))
    conn_hl.fill.solid()
    conn_hl.fill.fore_color.rgb = RGBColor(220, 38, 38)
    conn_hl.line.fill.background()

    # Right Green Trunk: X = 10.32
    trunk_r = slide4.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(10.32), Inches(1.68), Inches(0.03), Inches(4.48))
    trunk_r.fill.solid()
    trunk_r.fill.fore_color.rgb = RGBColor(22, 163, 74)
    trunk_r.line.fill.background()

    # Horizontal connector from Hub to Trunk
    conn_hr = slide4.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(10.35), Inches(3.91), Inches(0.18), Inches(0.03))
    conn_hr.fill.solid()
    conn_hr.fill.fore_color.rgb = RGBColor(22, 163, 74)
    conn_hr.line.fill.background()

    for idx in range(5):
        y_center = 1.68 + idx * 1.12
        y_top = 1.24 + idx * 1.12

        # --- LEFT: Challenge Item ---
        # Branch from trunk to badge
        b_l = slide4.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(2.98), Inches(y_center - 0.015), Inches(0.14), Inches(0.03))
        b_l.fill.solid()
        b_l.fill.fore_color.rgb = RGBColor(220, 38, 38)
        b_l.line.fill.background()

        # Badge Circle (Red)
        circ_l = slide4.shapes.add_shape(MSO_SHAPE.OVAL, Inches(3.10), Inches(y_center - 0.24), Inches(0.48), Inches(0.48))
        circ_l.fill.solid()
        circ_l.fill.fore_color.rgb = RGBColor(220, 38, 38)
        circ_l.line.fill.background()
        tf_cl = circ_l.text_frame
        tf_cl.word_wrap = False
        tf_cl.vertical_anchor = MSO_ANCHOR.MIDDLE
        tf_cl.margin_left = tf_cl.margin_right = tf_cl.margin_top = tf_cl.margin_bottom = 0
        p = tf_cl.paragraphs[0]
        p.text = f"0{idx+1}"
        p.font.size = Pt(11.5)
        p.font.bold = True
        p.font.color.rgb = C_WHITE
        p.alignment = PP_ALIGN.CENTER

        # Challenge Text Card
        card_l = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(3.68), Inches(y_top), Inches(2.80), Inches(0.88))
        card_l.fill.solid()
        card_l.fill.fore_color.rgb = RGBColor(255, 241, 242)
        card_l.line.color.rgb = RGBColor(254, 205, 211)
        card_l.line.width = Pt(1.2)
        tf_l = card_l.text_frame
        tf_l.word_wrap = True
        tf_l.vertical_anchor = MSO_ANCHOR.MIDDLE
        tf_l.margin_left = tf_l.margin_right = Inches(0.12)
        tf_l.margin_top = tf_l.margin_bottom = Inches(0.04)

        c_title, c_desc = challenges_data[idx]
        p0 = tf_l.paragraphs[0]
        p0.text = c_title
        p0.font.size = Pt(11.0)
        p0.font.bold = True
        p0.font.color.rgb = RGBColor(159, 18, 57)

        p1 = tf_l.add_paragraph()
        p1.text = c_desc
        p1.font.size = Pt(9.6)
        p1.font.color.rgb = C_BLACK

        # --- RIGHT: Strategy Item ---
        # Strategy Text Card
        card_r = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.85), Inches(y_top), Inches(2.80), Inches(0.88))
        card_r.fill.solid()
        card_r.fill.fore_color.rgb = RGBColor(236, 253, 245)
        card_r.line.color.rgb = RGBColor(167, 243, 208)
        card_r.line.width = Pt(1.2)
        tf_r = card_r.text_frame
        tf_r.word_wrap = True
        tf_r.vertical_anchor = MSO_ANCHOR.MIDDLE
        tf_r.margin_left = tf_r.margin_right = Inches(0.12)
        tf_r.margin_top = tf_r.margin_bottom = Inches(0.04)

        s_title, s_desc = strategies_data[idx]
        p0 = tf_r.paragraphs[0]
        p0.text = s_title
        p0.font.size = Pt(11.0)
        p0.font.bold = True
        p0.font.color.rgb = RGBColor(6, 95, 70)

        p1 = tf_r.add_paragraph()
        p1.text = s_desc
        p1.font.size = Pt(9.6)
        p1.font.color.rgb = C_BLACK

        # Badge Circle (Green)
        circ_r = slide4.shapes.add_shape(MSO_SHAPE.OVAL, Inches(9.74), Inches(y_center - 0.24), Inches(0.48), Inches(0.48))
        circ_r.fill.solid()
        circ_r.fill.fore_color.rgb = RGBColor(22, 163, 74)
        circ_r.line.fill.background()
        tf_cr = circ_r.text_frame
        tf_cr.word_wrap = False
        tf_cr.vertical_anchor = MSO_ANCHOR.MIDDLE
        tf_cr.margin_left = tf_cr.margin_right = tf_cr.margin_top = tf_cr.margin_bottom = 0
        p = tf_cr.paragraphs[0]
        p.text = f"0{idx+1}"
        p.font.size = Pt(11.5)
        p.font.bold = True
        p.font.color.rgb = C_WHITE
        p.alignment = PP_ALIGN.CENTER

        # Branch from badge to trunk
        b_r = slide4.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(10.20), Inches(y_center - 0.015), Inches(0.14), Inches(0.03))
        b_r.fill.solid()
        b_r.fill.fore_color.rgb = RGBColor(22, 163, 74)
        b_r.line.fill.background()

    add_footer(slide4, 4)

    # =========================================================================
    # SLIDE 5: Impact and Benefits (Native Radial Wheel & Benefit Cards Diagram)
    # =========================================================================
    slide5 = prs.slides.add_slide(blank_layout)
    add_banner_header(slide5, "Impact and Benefits")

    # Outer Container Card
    c_all5 = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(0.88), Inches(12.133), Inches(6.08))
    c_all5.fill.solid()
    c_all5.fill.fore_color.rgb = C_WHITE
    c_all5.line.color.rgb = C_CARD_BD
    c_all5.line.width = Pt(1.5)

    # Center Vertical Dotted Divider
    div_line5 = slide5.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(6.55), Inches(1.05), Inches(0.02), Inches(5.12))
    div_line5.fill.solid()
    div_line5.fill.fore_color.rgb = RGBColor(203, 213, 225)
    div_line5.line.fill.background()

    # Bottom Quote Card
    q_bar = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.75), Inches(6.28), Inches(11.833), Inches(0.58))
    q_bar.fill.solid()
    q_bar.fill.fore_color.rgb = C_SUBTLE_BG
    q_bar.line.color.rgb = C_CARD_BD
    q_bar.line.width = Pt(1.2)
    tf_qb = q_bar.text_frame
    tf_qb.vertical_anchor = MSO_ANCHOR.MIDDLE
    tf_qb.margin_left = Inches(0.2)
    tf_qb.margin_right = Inches(0.2)
    p_qb = tf_qb.paragraphs[0]
    p_qb.text = "“India's first real-time edge AI digital twin for defense UAVs — preventing crashes, maximizing sortie readiness, and powering Atmanirbhar Bharat.”"
    p_qb.font.size = Pt(11.5)
    p_qb.font.bold = True
    p_qb.font.color.rgb = C_BOLD_BLACK
    p_qb.alignment = PP_ALIGN.CENTER

    # -------------------------------------------------------------------------
    # LEFT HALF: "Potential Impact on Defense" Donut Wheel & 5 Stakeholder Cards
    # -------------------------------------------------------------------------
    center_x, center_y = 3.60, 3.65

    # Donut Ring (5 color segments)
    if os.path.exists('assets/icons/donut_wheel_ring.png'):
        slide5.shapes.add_picture('assets/icons/donut_wheel_ring.png',
                                  Inches(center_x - 1.25), Inches(center_y - 1.25),
                                  width=Inches(2.50), height=Inches(2.50))

    # Center White Circle
    inner_circle = slide5.shapes.add_shape(MSO_SHAPE.OVAL, Inches(center_x - 0.78), Inches(center_y - 0.78), Inches(1.56), Inches(1.56))
    inner_circle.fill.solid()
    inner_circle.fill.fore_color.rgb = C_WHITE
    inner_circle.line.color.rgb = C_CARD_BD
    inner_circle.line.width = Pt(1.2)

    # Center Emblem Icon
    if os.path.exists('assets/icons/icon_center_shield.png'):
        slide5.shapes.add_picture('assets/icons/icon_center_shield.png',
                                  Inches(center_x - 0.16), Inches(center_y - 0.58),
                                  width=Inches(0.32), height=Inches(0.32))

    # Center Circle Text
    tx_ic = slide5.shapes.add_textbox(Inches(center_x - 0.70), Inches(center_y - 0.22), Inches(1.40), Inches(0.90))
    tf_ic = tx_ic.text_frame
    tf_ic.word_wrap = True
    tf_ic.margin_left = tf_ic.margin_right = tf_ic.margin_top = tf_ic.margin_bottom = 0
    p = tf_ic.paragraphs[0]
    p.text = "Potential"
    p.font.size = Pt(10.5)
    p.font.bold = True
    p.font.color.rgb = C_BOLD_BLACK
    p.alignment = PP_ALIGN.CENTER

    p1 = tf_ic.add_paragraph()
    p1.text = "Impact on"
    p1.font.size = Pt(10.5)
    p1.font.bold = True
    p1.font.color.rgb = C_BOLD_BLACK
    p1.alignment = PP_ALIGN.CENTER

    p2 = tf_ic.add_paragraph()
    p2.text = "Defense"
    p2.font.size = Pt(11.5)
    p2.font.bold = True
    p2.font.color.rgb = RGBColor(2, 132, 199)
    p2.alignment = PP_ALIGN.CENTER

    # 1. Top Card: UAV Remote Pilots & Mission Commanders (Blue)
    c1 = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.55), Inches(1.05), Inches(4.10), Inches(1.08))
    c1.fill.solid()
    c1.fill.fore_color.rgb = RGBColor(240, 249, 255)
    c1.line.color.rgb = RGBColor(56, 189, 248)
    c1.line.width = Pt(1.2)

    # Connector line from top card to donut
    conn1 = slide5.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(3.59), Inches(2.13), Inches(0.03), Inches(0.28))
    conn1.fill.solid()
    conn1.fill.fore_color.rgb = RGBColor(2, 132, 199)
    conn1.line.fill.background()

    # Number Badge 01 (Top-Left corner)
    nb1 = slide5.shapes.add_shape(MSO_SHAPE.OVAL, Inches(1.40), Inches(0.92), Inches(0.36), Inches(0.36))
    nb1.fill.solid()
    nb1.fill.fore_color.rgb = RGBColor(2, 132, 199)
    nb1.line.fill.background()
    tf_nb1 = nb1.text_frame
    tf_nb1.word_wrap = False
    tf_nb1.vertical_anchor = MSO_ANCHOR.MIDDLE
    tf_nb1.margin_left = tf_nb1.margin_right = tf_nb1.margin_top = tf_nb1.margin_bottom = 0
    p = tf_nb1.paragraphs[0]
    p.text = "01"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = C_WHITE
    p.alignment = PP_ALIGN.CENTER

    # Icon badge inside card
    b1_circ = slide5.shapes.add_shape(MSO_SHAPE.OVAL, Inches(1.85), Inches(1.18), Inches(0.40), Inches(0.40))
    b1_circ.fill.solid()
    b1_circ.fill.fore_color.rgb = RGBColor(2, 132, 199)
    b1_circ.line.fill.background()
    if os.path.exists('assets/icons/icon_drone.png'):
        slide5.shapes.add_picture('assets/icons/icon_drone.png', Inches(1.90), Inches(1.23), width=Inches(0.30), height=Inches(0.30))

    tx_c1 = slide5.shapes.add_textbox(Inches(2.35), Inches(1.10), Inches(3.20), Inches(0.98))
    tf1 = tx_c1.text_frame
    tf1.word_wrap = True
    tf1.margin_left = tf1.margin_right = tf1.margin_top = tf1.margin_bottom = 0
    p = tf1.paragraphs[0]
    p.text = "UAV Remote Pilots & Mission Commanders"
    p.font.size = Pt(11.0)
    p.font.bold = True
    p.font.color.rgb = RGBColor(2, 132, 199)
    p1 = tf1.add_paragraph()
    p1.text = "5–15 min pre-FADEC warnings; eliminates panic aborts with clear optimal Pareto flight recovery trims."
    p1.font.size = Pt(9.2)
    p1.font.color.rgb = C_BLACK

    # 2. Mid-Left Card: Nation & MoD (Orange)
    c2 = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.75), Inches(2.30), Inches(1.78), Inches(1.55))
    c2.fill.solid()
    c2.fill.fore_color.rgb = RGBColor(255, 247, 237)
    c2.line.color.rgb = RGBColor(251, 146, 60)
    c2.line.width = Pt(1.2)

    # Connector line
    conn2 = slide5.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(2.53), Inches(3.07), Inches(0.24), Inches(0.03))
    conn2.fill.solid()
    conn2.fill.fore_color.rgb = RGBColor(234, 88, 12)
    conn2.line.fill.background()

    # Number Badge 02 (Top-Left corner)
    nb2 = slide5.shapes.add_shape(MSO_SHAPE.OVAL, Inches(0.60), Inches(2.15), Inches(0.36), Inches(0.36))
    nb2.fill.solid()
    nb2.fill.fore_color.rgb = RGBColor(234, 88, 12)
    nb2.line.fill.background()
    tf_nb2 = nb2.text_frame
    tf_nb2.word_wrap = False
    tf_nb2.vertical_anchor = MSO_ANCHOR.MIDDLE
    tf_nb2.margin_left = tf_nb2.margin_right = tf_nb2.margin_top = tf_nb2.margin_bottom = 0
    p = tf_nb2.paragraphs[0]
    p.text = "02"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = C_WHITE
    p.alignment = PP_ALIGN.CENTER

    b2_circ = slide5.shapes.add_shape(MSO_SHAPE.OVAL, Inches(0.92), Inches(2.40), Inches(0.38), Inches(0.38))
    b2_circ.fill.solid()
    b2_circ.fill.fore_color.rgb = RGBColor(234, 88, 12)
    b2_circ.line.fill.background()
    if os.path.exists('assets/icons/icon_govt.png'):
        slide5.shapes.add_picture('assets/icons/icon_govt.png', Inches(0.97), Inches(2.45), width=Inches(0.28), height=Inches(0.28))

    tx_c2 = slide5.shapes.add_textbox(Inches(0.85), Inches(2.82), Inches(1.58), Inches(0.98))
    tf2 = tx_c2.text_frame
    tf2.word_wrap = True
    tf2.margin_left = tf2.margin_right = tf2.margin_top = tf2.margin_bottom = 0
    p = tf2.paragraphs[0]
    p.text = "Nation & MoD:"
    p.font.size = Pt(10.5)
    p.font.bold = True
    p.font.color.rgb = RGBColor(234, 88, 12)
    p1 = tf2.add_paragraph()
    p1.text = "100% sovereign defense IP; eliminates Austrian OEM lock-in; ₹35–50L saved per airframe annually."
    p1.font.size = Pt(8.8)
    p1.font.color.rgb = C_BLACK

    # 3. Top-Right Card: Ground Engineers (Teal)
    c3 = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.67), Inches(2.30), Inches(1.78), Inches(1.55))
    c3.fill.solid()
    c3.fill.fore_color.rgb = RGBColor(240, 253, 250)
    c3.line.color.rgb = RGBColor(45, 212, 191)
    c3.line.width = Pt(1.2)

    # Connector line
    conn3 = slide5.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(4.45), Inches(3.07), Inches(0.22), Inches(0.03))
    conn3.fill.solid()
    conn3.fill.fore_color.rgb = RGBColor(13, 148, 136)
    conn3.line.fill.background()

    # Number Badge 03 (Top-Left corner)
    nb3 = slide5.shapes.add_shape(MSO_SHAPE.OVAL, Inches(4.52), Inches(2.15), Inches(0.36), Inches(0.36))
    nb3.fill.solid()
    nb3.fill.fore_color.rgb = RGBColor(13, 148, 136)
    nb3.line.fill.background()
    tf_nb3 = nb3.text_frame
    tf_nb3.word_wrap = False
    tf_nb3.vertical_anchor = MSO_ANCHOR.MIDDLE
    tf_nb3.margin_left = tf_nb3.margin_right = tf_nb3.margin_top = tf_nb3.margin_bottom = 0
    p = tf_nb3.paragraphs[0]
    p.text = "03"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = C_WHITE
    p.alignment = PP_ALIGN.CENTER

    b3_circ = slide5.shapes.add_shape(MSO_SHAPE.OVAL, Inches(4.84), Inches(2.40), Inches(0.38), Inches(0.38))
    b3_circ.fill.solid()
    b3_circ.fill.fore_color.rgb = RGBColor(13, 148, 136)
    b3_circ.line.fill.background()
    if os.path.exists('assets/icons/icon_gears.png'):
        slide5.shapes.add_picture('assets/icons/icon_gears.png', Inches(4.89), Inches(2.45), width=Inches(0.28), height=Inches(0.28))

    tx_c3 = slide5.shapes.add_textbox(Inches(4.77), Inches(2.82), Inches(1.58), Inches(0.98))
    tf3 = tx_c3.text_frame
    tf3.word_wrap = True
    tf3.margin_left = tf3.margin_right = tf3.margin_top = tf3.margin_bottom = 0
    p = tf3.paragraphs[0]
    p.text = "Ground Engineers:"
    p.font.size = Pt(10.5)
    p.font.bold = True
    p.font.color.rgb = RGBColor(13, 148, 136)
    p1 = tf3.add_paragraph()
    p1.text = "Causal DAG pinpoints root injector/bearing fault; auto maintenance debrief orders on landing."
    p1.font.size = Pt(8.8)
    p1.font.color.rgb = C_BLACK

    # 4. Bottom-Left Card: Tri-Services Fleet (Green)
    c4 = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.75), Inches(4.35), Inches(1.78), Inches(1.55))
    c4.fill.solid()
    c4.fill.fore_color.rgb = RGBColor(240, 253, 244)
    c4.line.color.rgb = RGBColor(74, 222, 128)
    c4.line.width = Pt(1.2)

    # Connector line to donut
    conn4 = slide5.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(2.53), Inches(4.65), Inches(0.26), Inches(0.03))
    conn4.fill.solid()
    conn4.fill.fore_color.rgb = RGBColor(22, 163, 74)
    conn4.line.fill.background()

    # Number Badge 04 (Top-Left corner)
    nb4 = slide5.shapes.add_shape(MSO_SHAPE.OVAL, Inches(0.60), Inches(4.20), Inches(0.36), Inches(0.36))
    nb4.fill.solid()
    nb4.fill.fore_color.rgb = RGBColor(22, 163, 74)
    nb4.line.fill.background()
    tf_nb4 = nb4.text_frame
    tf_nb4.word_wrap = False
    tf_nb4.vertical_anchor = MSO_ANCHOR.MIDDLE
    tf_nb4.margin_left = tf_nb4.margin_right = tf_nb4.margin_top = tf_nb4.margin_bottom = 0
    p = tf_nb4.paragraphs[0]
    p.text = "04"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = C_WHITE
    p.alignment = PP_ALIGN.CENTER

    b4_circ = slide5.shapes.add_shape(MSO_SHAPE.OVAL, Inches(0.92), Inches(4.45), Inches(0.38), Inches(0.38))
    b4_circ.fill.solid()
    b4_circ.fill.fore_color.rgb = RGBColor(22, 163, 74)
    b4_circ.line.fill.background()
    if os.path.exists('assets/icons/icon_fleet.png'):
        slide5.shapes.add_picture('assets/icons/icon_fleet.png', Inches(0.97), Inches(4.50), width=Inches(0.28), height=Inches(0.28))

    tx_c4 = slide5.shapes.add_textbox(Inches(0.85), Inches(4.87), Inches(1.58), Inches(0.98))
    tf4 = tx_c4.text_frame
    tf4.word_wrap = True
    tf4.margin_left = tf4.margin_right = tf4.margin_top = tf4.margin_bottom = 0
    p = tf4.paragraphs[0]
    p.text = "Tri-Services Fleet:"
    p.font.size = Pt(10.5)
    p.font.bold = True
    p.font.color.rgb = RGBColor(22, 163, 74)
    p1 = tf4.add_paragraph()
    p1.text = "Unified prognostics across Army, Navy & IAF MALE UAVs (TAPAS, Rustom-II); 28% higher availability."
    p1.font.size = Pt(8.8)
    p1.font.color.rgb = C_BLACK

    # 5. Bottom-Right Card: Flight Safety Officers (Purple)
    c5 = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.67), Inches(4.35), Inches(1.78), Inches(1.55))
    c5.fill.solid()
    c5.fill.fore_color.rgb = RGBColor(250, 245, 255)
    c5.line.color.rgb = RGBColor(192, 132, 252)
    c5.line.width = Pt(1.2)

    # Connector line to donut
    conn5 = slide5.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(4.45), Inches(4.65), Inches(0.22), Inches(0.03))
    conn5.fill.solid()
    conn5.fill.fore_color.rgb = RGBColor(124, 58, 237)
    conn5.line.fill.background()

    # Number Badge 05 (Top-Left corner)
    nb5 = slide5.shapes.add_shape(MSO_SHAPE.OVAL, Inches(4.52), Inches(4.20), Inches(0.36), Inches(0.36))
    nb5.fill.solid()
    nb5.fill.fore_color.rgb = RGBColor(124, 58, 237)
    nb5.line.fill.background()
    tf_nb5 = nb5.text_frame
    tf_nb5.word_wrap = False
    tf_nb5.vertical_anchor = MSO_ANCHOR.MIDDLE
    tf_nb5.margin_left = tf_nb5.margin_right = tf_nb5.margin_top = tf_nb5.margin_bottom = 0
    p = tf_nb5.paragraphs[0]
    p.text = "05"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = C_WHITE
    p.alignment = PP_ALIGN.CENTER

    b5_circ = slide5.shapes.add_shape(MSO_SHAPE.OVAL, Inches(4.84), Inches(4.45), Inches(0.38), Inches(0.38))
    b5_circ.fill.solid()
    b5_circ.fill.fore_color.rgb = RGBColor(124, 58, 237)
    b5_circ.line.fill.background()
    if os.path.exists('assets/icons/icon_safety.png'):
        slide5.shapes.add_picture('assets/icons/icon_safety.png', Inches(4.89), Inches(4.50), width=Inches(0.28), height=Inches(0.28))

    tx_c5 = slide5.shapes.add_textbox(Inches(4.77), Inches(4.87), Inches(1.58), Inches(0.98))
    tf5 = tx_c5.text_frame
    tf5.word_wrap = True
    tf5.margin_left = tf5.margin_right = tf5.margin_top = tf5.margin_bottom = 0
    p = tf5.paragraphs[0]
    p.text = "Flight Safety Officers:"
    p.font.size = Pt(10.5)
    p.font.bold = True
    p.font.color.rgb = RGBColor(124, 58, 237)
    p1 = tf5.add_paragraph()
    p1.text = "500-run Monte Carlo sortie risk assessment; zero unpredicted in-flight engine seizures."
    p1.font.size = Pt(8.8)
    p1.font.color.rgb = C_BLACK

    # -------------------------------------------------------------------------
    # RIGHT HALF: "Operational, Economic & Strategic Benefits"
    # -------------------------------------------------------------------------
    # Header Pill
    hdr_pill = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.75), Inches(1.05), Inches(5.82), Inches(0.48))
    hdr_pill.fill.solid()
    hdr_pill.fill.fore_color.rgb = RGBColor(2, 132, 199)
    hdr_pill.line.fill.background()

    if os.path.exists('assets/icons/icon_barchart.png'):
        slide5.shapes.add_picture('assets/icons/icon_barchart.png', Inches(6.92), Inches(1.13), width=Inches(0.32), height=Inches(0.32))

    tx_hp = slide5.shapes.add_textbox(Inches(7.30), Inches(1.08), Inches(5.15), Inches(0.40))
    p = tx_hp.text_frame.paragraphs[0]
    p.text = "Operational, Economic & Strategic Benefits"
    p.font.size = Pt(13.5)
    p.font.bold = True
    p.font.color.rgb = C_WHITE

    # 3 Large Benefit Cards (Matching user's Image 2 exactly!)
    benefits_data = [
        ("Operational & Mission Safety (Airframe Preservation)",
         "“Eliminates the catastrophic 'abort-vs-crash' panic. Delivers 5–15 minute early warning before mechanical failure, cutting false aborts to <1.5% and preserving multi-crore border surveillance missions.”",
         RGBColor(234, 88, 12),
         "assets/icons/icon_shield.png",
         "01"),
        ("Economic & Fleet Availability (Condition-Based TBO)",
         "“Dynamic wear-calibrated maintenance replaces static calendar strip-downs, saving ₹35–50 Lakhs per airframe/year, increasing squadron availability by 28%, and delivering >350% system ROI.”",
         RGBColor(22, 163, 74),
         "assets/icons/icon_coins.png",
         "02"),
        ("Strategic Defense Sovereignty (Atmanirbhar Bharat)",
         "“100% indigenous propulsion telemetry intelligence eliminating foreign OEM diagnostic dependence. Delivers 6–9% fuel reduction via optimal trims and verified high-altitude border persistence.”",
         RGBColor(2, 132, 199),
         "assets/icons/icon_india.png",
         "03")
    ]

    for b_idx, (b_title, b_desc, b_col, b_icon, b_num) in enumerate(benefits_data):
        by = 1.65 + b_idx * 1.54
        b_box = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.75), Inches(by), Inches(5.82), Inches(1.40))
        b_box.fill.solid()
        b_box.fill.fore_color.rgb = C_WHITE
        b_box.line.color.rgb = b_col
        b_box.line.width = Pt(1.8)

        # Number Badge at Top-Left of Card (Matching Image 2)
        b_num_badge = slide5.shapes.add_shape(MSO_SHAPE.OVAL, Inches(6.58), Inches(by - 0.10), Inches(0.40), Inches(0.40))
        b_num_badge.fill.solid()
        b_num_badge.fill.fore_color.rgb = b_col
        b_num_badge.line.fill.background()
        tf_nb = b_num_badge.text_frame
        tf_nb.word_wrap = False
        tf_nb.vertical_anchor = MSO_ANCHOR.MIDDLE
        tf_nb.margin_left = tf_nb.margin_right = tf_nb.margin_top = tf_nb.margin_bottom = 0
        p = tf_nb.paragraphs[0]
        p.text = b_num
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.color.rgb = C_WHITE
        p.alignment = PP_ALIGN.CENTER

        # Left Circular Icon Button inside card
        b_icon_circ = slide5.shapes.add_shape(MSO_SHAPE.OVAL, Inches(6.88), Inches(by + 0.38), Inches(0.62), Inches(0.62))
        b_icon_circ.fill.solid()
        b_icon_circ.fill.fore_color.rgb = b_col
        b_icon_circ.line.fill.background()

        if os.path.exists(b_icon):
            slide5.shapes.add_picture(b_icon, Inches(6.99), Inches(by + 0.49), width=Inches(0.40), height=Inches(0.40))

        # Content Text Box
        tx_bc = slide5.shapes.add_textbox(Inches(7.62), Inches(by + 0.08), Inches(4.82), Inches(1.24))
        tf = tx_bc.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0

        p0 = tf.paragraphs[0]
        p0.text = b_title
        p0.font.size = Pt(12.0)
        p0.font.bold = True
        p0.font.color.rgb = b_col

        p1 = tf.add_paragraph()
        p1.space_before = Pt(4)
        p1.text = b_desc
        p1.font.size = Pt(10.0)
        p1.font.italic = True
        p1.font.color.rgb = C_BLACK

    add_footer(slide5, 5)

    # =========================================================================
    # SLIDE 6: Research, Empirical Validation & Defense References (Clickable Links)
    # =========================================================================
    slide6 = prs.slides.add_slide(blank_layout)
    add_banner_header(slide6, "Research, Empirical Validation & Defense References")

    # Left Column Header: Field Research & Empirical Flight Validation
    left_pill = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(0.92), Inches(5.9), Inches(0.44))
    left_pill.fill.solid()
    left_pill.fill.fore_color.rgb = C_NAVY_BANNER
    left_pill.line.fill.background()
    p_lp = left_pill.text_frame.paragraphs[0]
    p_lp.text = "Field Research & Empirical Flight Validation"
    p_lp.font.size = Pt(13.5)
    p_lp.font.bold = True
    p_lp.font.color.rgb = C_WHITE
    p_lp.alignment = PP_ALIGN.CENTER

    # Right Column Header: Authoritative Defense & Regulatory Citations
    right_pill = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(0.92), Inches(5.9), Inches(0.44))
    right_pill.fill.solid()
    right_pill.fill.fore_color.rgb = C_NAVY_BANNER
    right_pill.line.fill.background()
    p_rp = right_pill.text_frame.paragraphs[0]
    p_rp.text = "Authoritative Defense & Regulatory Citations"
    p_rp.font.size = Pt(13.5)
    p_rp.font.bold = True
    p_rp.font.color.rgb = C_WHITE
    p_rp.alignment = PP_ALIGN.CENTER

    # 4 Structured Left Cards: Validation & Benchmarks
    left_cards_data = [
        ("DRDO TAPAS-BH-201 Mission Profiles",
         "18,000 FT CEILING",
         "Calibrated against official ADE flight envelopes for 18,000 ft operational altitude, 24-hr high-altitude loiter, and extreme thermal swings from Himalayan rarefaction to Thar desert heat."),
        ("Rotax 914/915 iS Engine Telemetry Baseline",
         "100 Hz OEM ENVELOPE",
         "Extracted empirical baselines (CHT 115–135°C, EGT 800–880°C, MAP 28–39 inHg, fuel burn 25–33 L/h) directly from OEM flight test logs to ground the thermodynamic model."),
        ("Software HIL & Telemetry Emulation Testbed",
         "FAIL-PASSIVE TESTED",
         "Hardware-in-the-Loop bench emulating CAN bus telemetry streams (+15°C CHT drift, 12% injector lean, turbo lag) validating deterministic software fault isolation without flight intrusion."),
        ("500-Run Monte Carlo Verification",
         "29.3% VARIANCE CUT",
         "Simulated 500 stochastic engine degradation runs, demonstrating 29.3% variance reduction in Remaining Useful Life (RUL) estimation and <1.5% false abort rate across full sorties.")
    ]

    y_start_l = 1.46
    card_h_l = 1.28
    card_gap_l = 0.12

    for i, (title, badge, desc) in enumerate(left_cards_data):
        cy = y_start_l + i * (card_h_l + card_gap_l)
        card = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(cy), Inches(5.9), Inches(card_h_l))
        card.fill.solid()
        card.fill.fore_color.rgb = C_WHITE
        card.line.color.rgb = C_CARD_BD
        card.line.width = Pt(1.5)

        # Tag pill at top right of card
        tag = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.35), Inches(cy + 0.08), Inches(2.05), Inches(0.26))
        tag.fill.solid()
        tag.fill.fore_color.rgb = C_BLUE_TAG
        tag.line.color.rgb = C_TAG_BD
        tag.line.width = Pt(1.0)
        p_tag = tag.text_frame.paragraphs[0]
        p_tag.text = badge
        p_tag.font.size = Pt(9.0)
        p_tag.font.bold = True
        p_tag.font.color.rgb = C_NAVY_BANNER
        p_tag.alignment = PP_ALIGN.CENTER

        # Card Title
        tx_c = slide6.shapes.add_textbox(Inches(0.8), Inches(cy + 0.08), Inches(3.5), Inches(0.32))
        tf_c = tx_c.text_frame
        tf_c.word_wrap = True
        tf_c.margin_left = tf_c.margin_right = tf_c.margin_top = tf_c.margin_bottom = 0
        p = tf_c.paragraphs[0]
        r_t = p.add_run()
        r_t.text = title
        r_t.font.bold = True
        r_t.font.size = Pt(13.5)
        r_t.font.color.rgb = C_NAVY_BANNER
        p.alignment = PP_ALIGN.LEFT

        # Card Description (High legibility 12.0pt solid black)
        tx_desc = slide6.shapes.add_textbox(Inches(0.8), Inches(cy + 0.40), Inches(5.5), Inches(0.82))
        tf_d = tx_desc.text_frame
        tf_d.word_wrap = True
        tf_d.margin_left = tf_d.margin_right = tf_d.margin_top = tf_d.margin_bottom = 0
        p_d = tf_d.paragraphs[0]
        r_d = p_d.add_run()
        r_d.text = desc
        r_d.font.size = Pt(12.0)
        r_d.font.color.rgb = C_BLACK
        p_d.alignment = PP_ALIGN.LEFT

    # 3 Structured Right Cards with Verified Clickable Hyperlinks!
    right_cards_data = [
        ("1. Defense & Engine OEM Technical Standards",
         "DEFENSE SPEC",
         [("DRDO Aeronautical Development Establishment (ADE):",
           " TAPAS-BH-201 MALE UAV Technical Specs, Avionics Architecture & Flight Envelope Guidelines (MoD, 2023). ",
           "[DRDO ADE Portal]",
           "https://www.drdo.gov.in/drdo/labs-and-establishments/aeronautical-development-establishment-ade"),
          ("BRP-Rotax GmbH & Co KG Aircraft Engines:",
           " Rotax 914 F & 915 iS Maintenance & Operators Manuals (Ref: EDO-021 / EDO-022, Gunskirchen, Austria). ",
           "[Rotax Documentation]",
           "https://www.rotax-aircraft-engines.com/")]),
        ("2. Peer-Reviewed AI & Prognostics Literature",
         "PEER REVIEWED",
         [("IEEE Trans. Aerospace & Electronic Systems:",
           " Physics-Informed Neural Networks & Extended Kalman Filtering for Aero Engine RUL Prognostics (Vol. 59, Issue 4, 2023). ",
           "[IEEE Xplore Library]",
           "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=7"),
          ("NASA Ames Prognostics Center of Excellence:",
           " C-MAPSS Aero Engine Degradation Benchmarks & Causal DAG Fault Isolation Frameworks. ",
           "[NASA PCoE Repository]",
           "https://www.nasa.gov/intelligent-systems-division/discovery-and-systems-health/pcoe/pcoe-data-set-repository/")]),
        ("3. Aviation Airworthiness & Sovereign Mandate",
         "CERTIFICATION",
         [("RTCA DO-178C (Level C) & DO-254 Standards:",
           " Airborne Software Safety Considerations & Design Assurance Guidance for Airborne Electronic Hardware. ",
           "[RTCA Standards]",
           "https://www.rtca.org/standards/"),
          ("Ministry of Defence Positive Indigenisation Lists:",
           " Department of Military Affairs mandate for 100% indigenous UAV avionics, diagnostics & software (2024). ",
           "[DDP Make-in-India]",
           "https://www.ddpmod.gov.in/")])
    ]

    y_start_r = 1.46
    card_h_r = 1.74
    card_gap_r = 0.13

    for i, (title, badge, items) in enumerate(right_cards_data):
        cy = y_start_r + i * (card_h_r + card_gap_r)
        card = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(cy), Inches(5.9), Inches(card_h_r))
        card.fill.solid()
        card.fill.fore_color.rgb = C_WHITE
        card.line.color.rgb = C_CARD_BD
        card.line.width = Pt(1.5)

        # Tag pill at top right of card
        tag = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(10.8), Inches(cy + 0.08), Inches(1.8), Inches(0.26))
        tag.fill.solid()
        tag.fill.fore_color.rgb = C_BLUE_TAG
        tag.line.color.rgb = C_TAG_BD
        tag.line.width = Pt(1.0)
        p_tag = tag.text_frame.paragraphs[0]
        p_tag.text = badge
        p_tag.font.size = Pt(9.0)
        p_tag.font.bold = True
        p_tag.font.color.rgb = C_NAVY_BANNER
        p_tag.alignment = PP_ALIGN.CENTER

        # Card Title
        tx_t = slide6.shapes.add_textbox(Inches(7.02), Inches(cy + 0.08), Inches(3.7), Inches(0.32))
        tf_t = tx_t.text_frame
        tf_t.word_wrap = True
        tf_t.margin_left = tf_t.margin_right = tf_t.margin_top = tf_t.margin_bottom = 0
        p = tf_t.paragraphs[0]
        r_t = p.add_run()
        r_t.text = title
        r_t.font.bold = True
        r_t.font.size = Pt(13.5)
        r_t.font.color.rgb = C_NAVY_BANNER
        p.alignment = PP_ALIGN.LEFT

        # Bullet Items with Clickable Links
        tx_items = slide6.shapes.add_textbox(Inches(7.02), Inches(cy + 0.42), Inches(5.55), Inches(1.25))
        tf_it = tx_items.text_frame
        tf_it.word_wrap = True
        tf_it.margin_left = tf_it.margin_right = tf_it.margin_top = tf_it.margin_bottom = 0

        for idx, (sub_title, sub_desc, link_label, link_url) in enumerate(items):
            p_sub = tf_it.paragraphs[0] if idx == 0 else tf_it.add_paragraph()
            if idx > 0:
                p_sub.space_before = Pt(4.5)
            r_st = p_sub.add_run()
            r_st.text = "• " + sub_title
            r_st.font.bold = True
            r_st.font.size = Pt(12.0)
            r_st.font.color.rgb = C_BOLD_BLACK

            r_sd = p_sub.add_run()
            r_sd.text = sub_desc
            r_sd.font.bold = False
            r_sd.font.size = Pt(11.5)
            r_sd.font.color.rgb = C_BLACK

            # Clickable Link Run
            r_link = p_sub.add_run()
            r_link.text = link_label
            r_link.font.bold = True
            r_link.font.size = Pt(11.5)
            r_link.font.underline = True
            r_link.font.color.rgb = C_NAVY_BANNER
            r_link.hyperlink.address = link_url

            p_sub.alignment = PP_ALIGN.LEFT

    add_footer(slide6, 6)

    # Save presentations
    output_path = 'd:/sih ppt/AERIS_TWIN_SIH2026_Final_Submission.pptx'
    prs.save(output_path)
    print(f"Presentation saved successfully to {output_path}")

    # Also overwrite the target requested file
    redesigned_path = 'd:/sih ppt/AERIS_TWIN_SIH2026_Redesigned.pptx'
    prs.save(redesigned_path)
    print(f"Updated {redesigned_path} with the official 6-slide reference format!")

if __name__ == '__main__':
    create_deck()
