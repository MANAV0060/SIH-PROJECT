import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def build_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Ultra-Clean Aerospace Typography & Contrast Palette
    # Strictly Bold Black Headings & Solid Black Text
    C_BLACK = RGBColor(0, 0, 0)            # 100% Solid Black for readable body text
    C_BOLD_BLACK = RGBColor(0, 0, 0)       # 100% Bold Black for all headings & titles
    C_WHITE = RGBColor(255, 255, 255)
    
    # Neutral Defense Card Fills & Borders (Eliminates excessive colors)
    C_CARD_BG = RGBColor(248, 250, 252)    # Subtle high-clarity off-white
    C_CARD_BD = RGBColor(203, 213, 225)    # Clean slate border (Pt 1.5)
    C_TABLE_HDR_BG = RGBColor(15, 23, 42)  # Charcoal-black header for tables
    C_ROW_ALT_BG = RGBColor(241, 245, 249) # Subtle alternating row tint

    def add_header(slide, title_text):
        # Team Name / Logo (Left)
        tx_box = slide.shapes.add_textbox(Inches(0.6), Inches(0.18), Inches(2.8), Inches(0.68))
        tf = tx_box.text_frame
        tf.word_wrap = True
        tf.margin_top = tf.margin_bottom = tf.margin_left = tf.margin_right = 0
        p = tf.paragraphs[0]
        p.text = "AERIS-TWIN"
        p.font.size = Pt(22)
        p.font.bold = True
        p.font.color.rgb = C_BOLD_BLACK
        p2 = tf.add_paragraph()
        p2.text = "Defense UAV Prognostics"
        p2.font.size = Pt(11)
        p2.font.bold = True
        p2.font.color.rgb = C_BOLD_BLACK

        # Slide Title (Center)
        tx_title = slide.shapes.add_textbox(Inches(3.2), Inches(0.18), Inches(6.8), Inches(0.68))
        tf_t = tx_title.text_frame
        tf_t.word_wrap = True
        tf_t.margin_top = tf_t.margin_bottom = tf_t.margin_left = tf_t.margin_right = 0
        p_t = tf_t.paragraphs[0]
        p_t.text = title_text
        p_t.alignment = PP_ALIGN.CENTER
        p_t.font.size = Pt(24)
        p_t.font.bold = True
        p_t.font.color.rgb = C_BOLD_BLACK

        # Top Right SIH Header Logo
        if os.path.exists('assets/sih_header_logo.png'):
            slide.shapes.add_picture('assets/sih_header_logo.png', Inches(10.5), Inches(0.14), width=Inches(2.2))

        # Horizontal divider line
        line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.6), Inches(0.92), Inches(12.133), Inches(0.02))
        line.fill.solid()
        line.fill.fore_color.rgb = RGBColor(203, 213, 225)
        line.line.color.rgb = RGBColor(203, 213, 225)

    # =========================================================================
    # SLIDE 1: Title Slide
    # =========================================================================
    slide1 = prs.slides.add_slide(blank_layout)
    add_header(slide1, "SMART INDIA HACKATHON 2026")

    # Main Big Title (High-impact defense header in Bold Black)
    t_box = slide1.shapes.add_textbox(Inches(0.6), Inches(1.15), Inches(12.13), Inches(1.15))
    tf1 = t_box.text_frame
    tf1.word_wrap = True
    p = tf1.paragraphs[0]
    p.text = "AI-Enabled Real-Time Digital Twin System for Health Monitoring, Fault Prediction and Mission Reliability Enhancement of Aero Piston Engines used in MALE UAVs"
    p.font.size = Pt(21)
    p.font.bold = True
    p.alignment = PP_ALIGN.CENTER
    p.font.color.rgb = C_BOLD_BLACK

    # Left Details Box (Structured Defense Credential Card)
    det_box = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(2.45), Inches(7.8), Inches(4.65))
    det_box.fill.solid()
    det_box.fill.fore_color.rgb = C_CARD_BG
    det_box.line.color.rgb = C_CARD_BD
    det_box.line.width = Pt(1.5)

    tf_det = det_box.text_frame
    tf_det.word_wrap = True
    tf_det.margin_left = Inches(0.4)
    tf_det.margin_top = Inches(0.35)
    tf_det.margin_right = Inches(0.35)

    items = [
        ("Problem Statement ID", "25266  (Aerospace & Defense Aviation Category)"),
        ("Problem Statement Title", "AI-Enabled Real-Time Digital Twin for MALE UAV Piston Powerplants"),
        ("Strategic Defense Theme", "Defense, Aerospace & Security / Smart Operational Flight Readiness"),
        ("Competition Category", "Hardware & Software Integration (Edge Avionics / DO-178C Aligned)"),
        ("Target Airframes", "MALE UAVs (DRDO TAPAS-BH-201, Rustom-II, Archer-NG)"),
        ("Aero-Propulsion Unit", "Rotax 914 / 915 iS Turbocharged 4-Cylinder Aero Piston Engine"),
        ("Team Identification", "Mindsmiths  /  Aero-Intelligence Core")
    ]

    for idx, (label, val) in enumerate(items):
        p = tf_det.paragraphs[0] if idx == 0 else tf_det.add_paragraph()
        p.space_after = Pt(10)
        run_lbl = p.add_run()
        run_lbl.text = f"•  {label} :  "
        run_lbl.font.bold = True
        run_lbl.font.size = Pt(13.5)
        run_lbl.font.color.rgb = C_BOLD_BLACK

        run_val = p.add_run()
        run_val.text = val
        run_val.font.size = Pt(13.5)
        run_val.font.color.rgb = C_BLACK

    # Right Hero Graphic / Shield Emblem
    if os.path.exists('assets/slide1_hero_emblem.png'):
        slide1.shapes.add_picture('assets/slide1_hero_emblem.png', Inches(8.75), Inches(2.55), width=Inches(3.9))

    # =========================================================================
    # SLIDE 2: PROPOSED SOLUTION
    # =========================================================================
    slide2 = prs.slides.add_slide(blank_layout)
    add_header(slide2, "PROPOSED SOLUTION")

    # Column 1 Header: Problem at Hand
    p_hdr = slide2.shapes.add_textbox(Inches(0.6), Inches(1.05), Inches(3.6), Inches(0.35))
    p_tf = p_hdr.text_frame
    p_tf.margin_top = p_tf.margin_bottom = p_tf.margin_left = p_tf.margin_right = 0
    p = p_tf.paragraphs[0]
    p.text = "Operational Crises at Hand"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = C_BOLD_BLACK

    # 3 Focused High-Impact Pain Cards (Clean neutral styling, bold black titles, black text)
    problems = [
        ("Late Alarm Latency (Fixed Limits)", "Legacy FADEC ECUs rely on rigid static limits. When CHT > 250°C alarm sounds, irreversible piston micro-welding and cylinder scoring has already occurred."),
        ("Zero Engine Personalization", "A fresh 50-hr engine and an 850-hr operational workhorse are evaluated by identical factory limits, ignoring individual thermal hysteresis and mechanical wear."),
        ("The 'Abort vs Crash' Dilemma", "In-flight sensor anomalies force pilots into binary panic: either prematurely ditching a multi-crore border mission or risking total airframe loss."),
    ]

    card_y = 1.45
    card_h = 1.75
    for title, desc in problems:
        c_box = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(card_y), Inches(3.6), Inches(card_h))
        c_box.fill.solid()
        c_box.fill.fore_color.rgb = C_CARD_BG
        c_box.line.color.rgb = C_CARD_BD
        c_box.line.width = Pt(1.5)

        tf = c_box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = Inches(0.18)
        tf.margin_top = Inches(0.15)

        p1 = tf.paragraphs[0]
        p1.text = title
        p1.font.bold = True
        p1.font.size = Pt(13)
        p1.font.color.rgb = C_BOLD_BLACK
        p1.space_after = Pt(4)

        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(11.5)
        p2.font.color.rgb = C_BLACK

        card_y += 1.85

    # Column 2: Center Solution & Live HUD
    s_hdr = slide2.shapes.add_textbox(Inches(4.45), Inches(1.05), Inches(5.1), Inches(0.35))
    s_tf = s_hdr.text_frame
    s_tf.margin_top = s_tf.margin_bottom = s_tf.margin_left = s_tf.margin_right = 0
    p = s_tf.paragraphs[0]
    p.text = "Our Solution: AERIS-TWIN 3.0 Platform"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = C_BOLD_BLACK

    # Insert Slide 2 HUD preview
    if os.path.exists('assets/slide2_hud_preview.png'):
        slide2.shapes.add_picture('assets/slide2_hud_preview.png', Inches(4.45), Inches(1.45), width=Inches(5.1), height=Inches(3.0))

    # Center: 3 Hero Metric Stat Badges (Bold Black numbers and labels)
    stats = [
        ("5–15 MIN", "Pre-FADEC Lead Time"),
        ("29.3%", "NASA Variance Cut"),
        ("< 1.5%", "False Abort Rate")
    ]
    st_x = 4.45
    st_w = 1.63
    for num, lbl in stats:
        s_box = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(st_x), Inches(4.55), Inches(st_w), Inches(0.75))
        s_box.fill.solid()
        s_box.fill.fore_color.rgb = C_CARD_BG
        s_box.line.color.rgb = C_CARD_BD
        s_box.line.width = Pt(1.4)

        tf = s_box.text_frame
        tf.word_wrap = True
        tf.margin_top = Inches(0.06)
        tf.margin_left = tf.margin_right = Inches(0.08)

        p = tf.paragraphs[0]
        p.text = num
        p.font.bold = True
        p.font.size = Pt(16)
        p.alignment = PP_ALIGN.CENTER
        p.font.color.rgb = C_BOLD_BLACK

        p2 = tf.add_paragraph()
        p2.text = lbl
        p2.font.size = Pt(10)
        p2.font.bold = True
        p2.alignment = PP_ALIGN.CENTER
        p2.font.color.rgb = C_BLACK

        st_x += 1.73

    # Center Bottom: Why We Stand Out Card (Clean neutral styling, bold black titles)
    stand_box = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.45), Inches(5.4), Inches(5.1), Inches(1.7))
    stand_box.fill.solid()
    stand_box.fill.fore_color.rgb = C_CARD_BG
    stand_box.line.color.rgb = C_CARD_BD
    stand_box.line.width = Pt(1.5)

    tf_st = stand_box.text_frame
    tf_st.word_wrap = True
    tf_st.margin_left = tf_st.margin_right = Inches(0.2)
    tf_st.margin_top = Inches(0.12)

    p_wh = tf_st.paragraphs[0]
    p_wh.text = "Why We Stand Out (Core Innovation)"
    p_wh.font.bold = True
    p_wh.font.size = Pt(13)
    p_wh.font.color.rgb = C_BOLD_BLACK
    p_wh.space_after = Pt(4)

    st_points = [
        ("Hybrid Physics-AI Residual Geometry", "Combines first-principles energy conservation with ML to disambiguate physical wear from sensor drift with zero false alarms."),
        ("Prescriptive In-Flight Recovery", "Calculates optimal Pareto trims (step down 800m, derate throttle 7%) to save both the engine and sortie.")
    ]

    for title, desc in st_points:
        p = tf_st.add_paragraph()
        p.space_after = Pt(3)
        run_b = p.add_run()
        run_b.text = f"•  {title}: "
        run_b.font.bold = True
        run_b.font.size = Pt(11)
        run_b.font.color.rgb = C_BOLD_BLACK

        run_d = p.add_run()
        run_d.text = desc
        run_d.font.size = Pt(10.5)
        run_d.font.color.rgb = C_BLACK

    # Column 3: Key Features (Right) - 4 Solid Pillars with Bold Black Titles
    f_hdr = slide2.shapes.add_textbox(Inches(9.8), Inches(1.05), Inches(2.9), Inches(0.35))
    f_tf = f_hdr.text_frame
    f_tf.margin_top = f_tf.margin_bottom = f_tf.margin_left = f_tf.margin_right = 0
    p = f_tf.paragraphs[0]
    p.text = "Key Technical Pillars"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = C_BOLD_BLACK

    features = [
        ("Sensor Integrity Guard", "Computes real-time Trust Index T in [0, 1] rejecting electrical drift, noise & cyber-spoofing."),
        ("Personalized Engine DNA", "Serial-number-calibrated wear tracking with anti-poisoning online calibration gating."),
        ("3-Way Disambiguation", "Concurrently tests Physical Wear vs Sensor Fault vs Model Divergence with zero false aborts."),
        ("Ensemble Quantile RUL", "LSTM + Physics hybrid predicting Q10/Q50/Q90 flight envelopes with 29.3% variance cut."),
    ]

    feat_y = 1.45
    feat_h = 1.3
    for title, desc in features:
        box = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(9.8), Inches(feat_y), Inches(2.9), Inches(feat_h))
        box.fill.solid()
        box.fill.fore_color.rgb = C_CARD_BG
        box.line.color.rgb = C_CARD_BD
        box.line.width = Pt(1.4)

        tf = box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = Inches(0.15)
        tf.margin_top = Inches(0.12)

        p = tf.paragraphs[0]
        p.text = "• " + title
        p.font.bold = True
        p.font.size = Pt(12.5)
        p.font.color.rgb = C_BOLD_BLACK
        p.space_after = Pt(2)

        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(10.5)
        p2.font.color.rgb = C_BLACK

        feat_y += 1.4

    # =========================================================================
    # SLIDE 3: TECHNICAL APPROACH (Matches Hardware Architecture Diagram)
    # =========================================================================
    slide3 = prs.slides.add_slide(blank_layout)
    add_header(slide3, "TECHNICAL APPROACH")

    # Insert Full-Width Hardware & Edge Digital Twin Architecture Diagram
    if os.path.exists('assets/slide3_technical_architecture.png'):
        slide3.shapes.add_picture('assets/slide3_technical_architecture.png', Inches(0.5), Inches(1.02), width=Inches(12.333), height=Inches(6.25))

    # =========================================================================
    # SLIDE 4: FEASIBILITY AND VIABILITY
    # =========================================================================
    slide4 = prs.slides.add_slide(blank_layout)
    add_header(slide4, "FEASIBILITY AND VIABILITY")

    # Box 1: Technical Feasibility (Top-Left)
    b1 = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(1.15), Inches(3.4), Inches(2.8))
    b1.fill.solid()
    b1.fill.fore_color.rgb = C_CARD_BG
    b1.line.color.rgb = C_CARD_BD
    b1.line.width = Pt(1.5)
    tf1 = b1.text_frame
    tf1.word_wrap = True
    tf1.margin_left = tf1.margin_right = Inches(0.18)
    tf1.margin_top = Inches(0.15)
    p = tf1.paragraphs[0]
    p.text = "Technical & Edge Feasibility"
    p.font.bold = True
    p.font.size = Pt(13.5)
    p.font.color.rgb = C_BOLD_BLACK
    p.space_after = Pt(4)
    
    t_points = [
        "Sub-2 ms Inference Latency: Runs on low-SWaP edge computers (Jetson Orin, Pi 4, MIL-STD avionics).",
        "Zero Internet Dependency: Operates 100% locally in edge GCS or onboard compute during GPS denied sorties.",
        "Deterministic Execution: 5 Hz telemetry loop with guaranteed 200 ms non-blocking cycle.",
        "Avionics Bus Compatibility: Native support for Rotax CAN bus and ARINC-429 telemetry streams."
    ]
    for pt in t_points:
        p = tf1.add_paragraph()
        p.text = "• " + pt
        p.font.size = Pt(10.8)
        p.font.color.rgb = C_BLACK
        p.space_after = Pt(3)

    # Box 2: Economical Feasibility Table (Top-Center)
    tbl_shape = slide4.shapes.add_table(5, 3, Inches(4.2), Inches(1.15), Inches(5.0), Inches(2.8))
    tbl = tbl_shape.table
    tbl.columns[0].width = Inches(1.8)
    tbl.columns[1].width = Inches(1.6)
    tbl.columns[2].width = Inches(1.6)

    table_data = [
        ("Parameter", "Legacy FADEC / DTC", "AERIS-TWIN 3.0 System"),
        ("Early Warning Lead", "0 min (Post-failure)", "5 to 15 min pre-alarm"),
        ("False Alarm Aborts", "12% - 18%", "< 1.5% (Disambiguated)"),
        ("Maintenance Model", "Static calendar hours", "Condition-based dynamic TBO"),
        ("Cost Savings / Year", "Baseline (Nil)", "₹35–50 Lakhs per airframe"),
    ]

    for r_idx, row in enumerate(table_data):
        for c_idx, val in enumerate(row):
            cell = tbl.cell(r_idx, c_idx)
            cell.text = val
            cell.vertical_anchor = MSO_ANCHOR.MIDDLE
            p = cell.text_frame.paragraphs[0]
            p.font.size = Pt(11) if r_idx == 0 else Pt(10.5)
            p.alignment = PP_ALIGN.CENTER if c_idx > 0 else PP_ALIGN.LEFT
            if r_idx == 0:
                p.font.bold = True
                p.font.color.rgb = C_WHITE
                cell.fill.solid()
                cell.fill.fore_color.rgb = C_TABLE_HDR_BG
            else:
                p.font.color.rgb = C_BLACK
                cell.fill.solid()
                cell.fill.fore_color.rgb = C_ROW_ALT_BG if r_idx % 2 == 1 else C_WHITE

    # Box 3: Maintenance & Safety Feasibility (Top-Right)
    b3 = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(9.4), Inches(1.15), Inches(3.33), Inches(2.8))
    b3.fill.solid()
    b3.fill.fore_color.rgb = C_CARD_BG
    b3.line.color.rgb = C_CARD_BD
    b3.line.width = Pt(1.5)
    tf3 = b3.text_frame
    tf3.word_wrap = True
    tf3.margin_left = tf3.margin_right = Inches(0.18)
    tf3.margin_top = Inches(0.15)
    p = tf3.paragraphs[0]
    p.text = "Safety & Maintenance Feasibility"
    p.font.bold = True
    p.font.size = Pt(13.5)
    p.font.color.rgb = C_BOLD_BLACK
    p.space_after = Pt(4)

    m_points = [
        "Certified Fail-Passive Logic: If digital twin confidence drops, OEM FADEC baseline operates unaltered.",
        "Non-Intrusive Drop-In: Sniffs existing CAN telemetry without voiding airframe airworthiness warranties.",
        "Automated Debrief Work Orders: Layer 19 produces ground crew maintenance work orders instantly on landing.",
        "Tamper-Evident Black Box: 5 Hz ring buffer stores full incident replay for military flight safety boards."
    ]
    for pt in m_points:
        p = tf3.add_paragraph()
        p.text = "• " + pt
        p.font.size = Pt(10.8)
        p.font.color.rgb = C_BLACK
        p.space_after = Pt(3)

    # Box 4: Economic & Operational Viability (Bottom-Left)
    b4 = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(4.15), Inches(3.4), Inches(3.0))
    b4.fill.solid()
    b4.fill.fore_color.rgb = C_CARD_BG
    b4.line.color.rgb = C_CARD_BD
    b4.line.width = Pt(1.5)
    tf4 = b4.text_frame
    tf4.word_wrap = True
    tf4.margin_left = tf4.margin_right = Inches(0.18)
    tf4.margin_top = Inches(0.15)
    p = tf4.paragraphs[0]
    p.text = "Economic & Operational Viability"
    p.font.bold = True
    p.font.size = Pt(13.5)
    p.font.color.rgb = C_BOLD_BLACK
    p.space_after = Pt(4)

    e_points = [
        "Protects ₹25–40+ Cr Airframes: Prevents catastrophic in-flight engine seizure of DRDO TAPAS & Rustom-II.",
        "28% Higher Squadron Availability: Dynamic TBO eliminates unnecessary premature engine strip-downs.",
        "ROI > 350%: System cost recovered in first avoided mid-mission abort or extended overhaul cycle.",
        "Operator Workload Reduction: Plain English NLP operational commands & automated debriefs."
    ]
    for pt in e_points:
        p = tf4.add_paragraph()
        p.text = "• " + pt
        p.font.size = Pt(10.8)
        p.font.color.rgb = C_BLACK
        p.space_after = Pt(3)

    # Box 5: Implementation Viability Table (Bottom-Center)
    tbl2_shape = slide4.shapes.add_table(6, 2, Inches(4.2), Inches(4.15), Inches(5.0), Inches(3.0))
    tbl2 = tbl2_shape.table
    tbl2.columns[0].width = Inches(1.8)
    tbl2.columns[1].width = Inches(3.2)

    imp_data = [
        ("Factor", "Support Element"),
        ("Compute Architecture", "x86-64, ARM64, Embedded Linux (<2W SWaP-C)"),
        ("Engine Compatibility", "Rotax 914/915 iS, easily tuned to any aero piston"),
        ("Certification Alignment", "Designed to meet DO-178C (Software) & DO-254"),
        ("Fleet Scalability", "Simultaneous squadron tracking (UAV-014 to 017)"),
        ("Deployment Readiness", "NASA C-MAPSS validated; ready for HIL test rig"),
    ]

    for r_idx, row in enumerate(imp_data):
        for c_idx, val in enumerate(row):
            cell = tbl2.cell(r_idx, c_idx)
            cell.text = val
            cell.vertical_anchor = MSO_ANCHOR.MIDDLE
            p = cell.text_frame.paragraphs[0]
            p.font.size = Pt(11) if r_idx == 0 else Pt(10.5)
            p.alignment = PP_ALIGN.LEFT
            if r_idx == 0:
                p.font.bold = True
                p.font.color.rgb = C_WHITE
                cell.fill.solid()
                cell.fill.fore_color.rgb = C_TABLE_HDR_BG
            else:
                p.font.color.rgb = C_BLACK
                cell.fill.solid()
                cell.fill.fore_color.rgb = C_ROW_ALT_BG if r_idx % 2 == 1 else C_WHITE

    # Box 6: Environmental & Strategic Viability (Bottom-Right)
    b6 = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(9.4), Inches(4.15), Inches(3.33), Inches(3.0))
    b6.fill.solid()
    b6.fill.fore_color.rgb = C_CARD_BG
    b6.line.color.rgb = C_CARD_BD
    b6.line.width = Pt(1.5)
    tf6 = b6.text_frame
    tf6.word_wrap = True
    tf6.margin_left = tf6.margin_right = Inches(0.18)
    tf6.margin_top = Inches(0.15)
    p = tf6.paragraphs[0]
    p.text = "Strategic & National Viability"
    p.font.bold = True
    p.font.size = Pt(13.5)
    p.font.color.rgb = C_BOLD_BLACK
    p.space_after = Pt(4)

    s_points = [
        "Atmanirbhar Bharat in Defence: Eliminates dependency on foreign propulsion OEM health diagnostics.",
        "Border Persistence: Validated for Thar Desert (48°C) and Himalayan high-altitude (6,500m) surveillance.",
        "Carbon & Fuel Reduction: Counterfactual throttle/altitude trims cut fuel burn by 6-9% during sorties.",
        "Tri-Services Scalability: Extensible to Indian Army, Navy, and Air Force unmanned surveillance wings."
    ]
    for pt in s_points:
        p = tf6.add_paragraph()
        p.text = "• " + pt
        p.font.size = Pt(10.8)
        p.font.color.rgb = C_BLACK
        p.space_after = Pt(3)

    # =========================================================================
    # SLIDE 5: RESEARCH AND REFERENCES
    # =========================================================================
    slide5 = prs.slides.add_slide(blank_layout)
    add_header(slide5, "RESEARCH AND REFERENCES")

    # Top-Left: TAM - SAM - SOM Diagram
    if os.path.exists('assets/slide5_tam_sam_som.png'):
        slide5.shapes.add_picture('assets/slide5_tam_sam_som.png', Inches(0.6), Inches(1.15), width=Inches(4.5))

    # Top-Right: 3 Bold Market Value Cards (Bold Black typography)
    market_cards = [
        ("TAM — Total Market", "(Global & Indian UAV Propulsion)", "₹1,200 Cr", "$145 Million", "Assuming 100% telemetry modernization across global military & commercial UAVs."),
        ("SAM — Available Market", "(Indian Tri-Services & DRDO)", "₹380 Cr", "$45 Million", "Targeting Indian military UAV powerplants (TAPAS, Rustom-II, Archer, Heron)."),
        ("SOM — Obtainable Market", "(3-Year Near-Term Retrofit)", "₹45 Cr", "$5.5 Million", "Immediate retrofit across 100–150 active indigenous MALE UAVs (10-15% initial fleet).")
    ]

    m_x = 5.35
    m_w = 2.45
    for title, sub, val_cr, val_usd, calc in market_cards:
        m_box = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(m_x), Inches(1.15), Inches(m_w), Inches(2.7))
        m_box.fill.solid()
        m_box.fill.fore_color.rgb = C_CARD_BG
        m_box.line.color.rgb = C_CARD_BD
        m_box.line.width = Pt(1.5)

        tf = m_box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = Inches(0.15)
        tf.margin_top = Inches(0.12)

        p = tf.paragraphs[0]
        p.text = title
        p.font.bold = True
        p.font.size = Pt(12)
        p.font.color.rgb = C_BOLD_BLACK

        p_s = tf.add_paragraph()
        p_s.text = sub
        p_s.font.size = Pt(9.5)
        p_s.font.bold = True
        p_s.font.color.rgb = C_BLACK
        p_s.space_after = Pt(4)

        p_v = tf.add_paragraph()
        p_v.text = val_cr
        p_v.font.bold = True
        p_v.font.size = Pt(20)
        p_v.font.color.rgb = C_BOLD_BLACK

        p_u = tf.add_paragraph()
        p_u.text = val_usd
        p_u.font.bold = True
        p_u.font.size = Pt(11)
        p_u.font.color.rgb = C_BLACK
        p_u.space_after = Pt(4)

        p_c = tf.add_paragraph()
        p_c.text = calc
        p_c.font.size = Pt(10)
        p_c.font.color.rgb = C_BLACK

        m_x += 2.53

    # Bottom-Left: References Box (Bold Black Title & Clean Black Text)
    ref_box = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(4.0), Inches(6.8), Inches(3.15))
    ref_box.fill.solid()
    ref_box.fill.fore_color.rgb = C_CARD_BG
    ref_box.line.color.rgb = C_CARD_BD
    ref_box.line.width = Pt(1.5)

    tf_ref = ref_box.text_frame
    tf_ref.word_wrap = True
    tf_ref.margin_left = tf_ref.margin_right = Inches(0.2)
    tf_ref.margin_top = Inches(0.15)

    p = tf_ref.paragraphs[0]
    p.text = "RESEARCH REFERENCES"
    p.font.bold = True
    p.font.size = Pt(13)
    p.font.color.rgb = C_BOLD_BLACK
    p.space_after = Pt(4)

    refs = [
        "1) A. Saxena, K. Goebel, D. Simon and N. Eklund, 'Damage Propagation Modeling for Aircraft Engine Run-to-Failure Simulation', NASA Ames Research Center (NASA TM-2008-215379), 2008.",
        "2) N. Gebraeel, M. A. Lawley, R. Li and J. K. Ryan, 'Residual-Life Distributions from Component Degradation Signals', IEEE Transactions on Reliability, vol. 54, no. 4, pp. 532-541, 2005.",
        "3) S. M. Lundberg and S.-I. Lee, 'A Unified Approach to Interpreting Model Predictions (SHAP)', Advances in Neural Information Processing Systems (NeurIPS), 2017.",
        "4) Rotax Aircraft Engines, 'Operators Manual & Maintenance Schedule for Rotax Engine Type 914 F and 915 iS Series', BRP-Rotax GmbH & Co KG, 2024.",
        "5) NASA Prognostics Center of Excellence (PCoE), 'Turbofan Engine Degradation Simulation Data Set (C-MAPSS)', NASA Ames, Moffett Field, CA."
    ]

    for ref in refs:
        p = tf_ref.add_paragraph()
        p.text = ref
        p.font.size = Pt(10.2)
        p.font.color.rgb = C_BLACK
        p.space_after = Pt(3)

    # Bottom-Right: Links Box (Bold Black Title & Clean Black Text)
    link_box = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.6), Inches(4.0), Inches(5.13), Inches(3.15))
    link_box.fill.solid()
    link_box.fill.fore_color.rgb = C_CARD_BG
    link_box.line.color.rgb = C_CARD_BD
    link_box.line.width = Pt(1.5)

    tf_lk = link_box.text_frame
    tf_lk.word_wrap = True
    tf_lk.margin_left = tf_lk.margin_right = Inches(0.2)
    tf_lk.margin_top = Inches(0.15)

    p = tf_lk.paragraphs[0]
    p.text = "SYSTEM VERIFICATION & DEMO LINKS"
    p.font.bold = True
    p.font.size = Pt(13)
    p.font.color.rgb = C_BOLD_BLACK
    p.space_after = Pt(6)

    links = [
        ("1) System Technical Documentation", "Full 20-layer mathematical whitepaper & equations"),
        ("2) NASA C-MAPSS Benchmark Suite", "Validation test scripts & 29.3% variance reduction logs"),
        ("3) Interactive 3D Digital Twin HUD", "React 18 + Three.js 60 FPS real-time cockpit demo"),
        ("4) Hardware-in-the-Loop (HIL) Rig", "Rotax 914 CAN bus emulator & sensor injection"),
        ("5) 2-Minute Operational Video", "Sortie simulation showing in-flight counterfactual trim"),
        ("6) Flight Black Box Telemetry Store", "SQLite WAL database schema & audit replay logs")
    ]

    for title, desc in links:
        p = tf_lk.add_paragraph()
        run_t = p.add_run()
        run_t.text = f"{title}: "
        run_t.font.bold = True
        run_t.font.size = Pt(10.8)
        run_t.font.color.rgb = C_BOLD_BLACK

        run_d = p.add_run()
        run_d.text = desc
        run_d.font.size = Pt(10.2)
        run_d.font.color.rgb = C_BLACK
        p.space_after = Pt(3)

    # Save presentation
    output_path = 'd:/sih ppt/AERIS_TWIN_SIH2026_Presentation.pptx'
    prs.save(output_path)
    print(f"Presentation successfully created at: {output_path}")

if __name__ == '__main__':
    build_presentation()
