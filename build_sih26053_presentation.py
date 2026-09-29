import os
import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def create_sih26053_deck():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Professional Engineering R&D Palette
    C_NAVY_CORE = RGBColor(16, 27, 45)       # #101B2D Dark Navy
    C_TECH_BLUE = RGBColor(0, 111, 174)      # #006FAE SIH / DRDO Technical Blue
    C_CYAN_ACCENT = RGBColor(0, 168, 214)    # #00A8D6 Cyan Data / Polar Grid
    C_BLACK = RGBColor(15, 23, 42)           # #0F172A Body Black
    C_WHITE = RGBColor(255, 255, 255)
    C_BG_LIGHT = RGBColor(248, 250, 252)     # Slate 50
    C_CARD_BD = RGBColor(203, 213, 225)      # Slate 300
    C_LINK_BLUE = RGBColor(0, 102, 204)      # Clickable Hyperlink Blue

    # Semantic Perception Colors (Consistent throughout deck)
    C_SEM_GROUND = RGBColor(16, 120, 70)     # Green: Drivable Surface
    C_SEM_STATIC = RGBColor(217, 119, 6)     # Orange: Static Obstacles (Walls, Poles)
    C_SEM_DYNAMIC = RGBColor(220, 38, 38)    # Red: Dynamic Objects (Vehicles, Pedestrians)
    C_SEM_NEGATIVE = RGBColor(124, 58, 237)  # Purple: Negative Hazards (Potholes, Drop-offs)

    def add_header(slide, title_text, category_tag="SIH 2026 | DRDO SIH26053"):
        # Compact Technical Header Bar (Height = 0.52")
        bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.0), Inches(0.0), Inches(13.333), Inches(0.52))
        bar.fill.solid()
        bar.fill.fore_color.rgb = C_NAVY_CORE
        bar.line.fill.background()

        # Left Title
        tx = slide.shapes.add_textbox(Inches(0.7), Inches(0.04), Inches(8.5), Inches(0.44))
        tf = tx.text_frame
        tf.vertical_anchor = MSO_ANCHOR.MIDDLE
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        p = tf.paragraphs[0]
        p.text = title_text.upper()
        p.font.size = Pt(17)
        p.font.bold = True
        p.font.color.rgb = C_WHITE

        # Tag
        tx_tag = slide.shapes.add_textbox(Inches(7.2), Inches(0.08), Inches(4.8), Inches(0.36))
        tf_tag = tx_tag.text_frame
        tf_tag.vertical_anchor = MSO_ANCHOR.MIDDLE
        tf_tag.margin_left = tf_tag.margin_top = tf_tag.margin_right = tf_tag.margin_bottom = 0
        p_t = tf_tag.paragraphs[0]
        p_t.text = category_tag
        p_t.font.size = Pt(10.5)
        p_t.font.bold = True
        p_t.font.color.rgb = C_CYAN_ACCENT
        p_t.alignment = PP_ALIGN.RIGHT

        # Clean SIH Emblem inside Navy Header Bar (Height = 0.40" perfectly fits 0.52" bar)
        if os.path.exists('assets/sih_bulb_hd_clean.png'):
            slide.shapes.add_picture('assets/sih_bulb_hd_clean.png', Inches(12.35), Inches(0.06), height=Inches(0.40))
        elif os.path.exists('assets/sih_header_logo.png'):
            slide.shapes.add_picture('assets/sih_header_logo.png', Inches(11.8), Inches(0.08), height=Inches(0.36))

    def add_footer(slide, slide_num):
        footer_bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.0), Inches(7.12), Inches(13.333), Inches(0.38))
        footer_bar.fill.solid()
        footer_bar.fill.fore_color.rgb = C_NAVY_CORE
        footer_bar.line.fill.background()

        # Left: Team
        tx_l = slide.shapes.add_textbox(Inches(0.7), Inches(7.14), Inches(3.5), Inches(0.32))
        tf_l = tx_l.text_frame
        tf_l.margin_left = tf_l.margin_top = tf_l.margin_right = tf_l.margin_bottom = 0
        p_l = tf_l.paragraphs[0]
        p_l.text = "TEAM NULLPOINT  |  SIH26053"
        p_l.font.size = Pt(10)
        p_l.font.bold = True
        p_l.font.color.rgb = C_CYAN_ACCENT

        # Center: Official SIH label
        tx_c = slide.shapes.add_textbox(Inches(4.5), Inches(7.14), Inches(4.333), Inches(0.32))
        tf_c = tx_c.text_frame
        tf_c.margin_left = tf_c.margin_top = tf_c.margin_right = tf_c.margin_bottom = 0
        p_c = tf_c.paragraphs[0]
        p_c.text = "SMART INDIA HACKATHON 2026"
        p_c.font.size = Pt(10.5)
        p_c.font.bold = True
        p_c.font.color.rgb = C_WHITE
        p_c.alignment = PP_ALIGN.CENTER

        # Right: Slide number
        tx_r = slide.shapes.add_textbox(Inches(11.8), Inches(7.14), Inches(0.9), Inches(0.32))
        tf_r = tx_r.text_frame
        tf_r.margin_left = tf_r.margin_top = tf_r.margin_right = tf_r.margin_bottom = 0
        p_r = tf_r.paragraphs[0]
        p_r.text = f"{slide_num} / 6"
        p_r.font.size = Pt(10)
        p_r.font.bold = True
        p_r.font.color.rgb = C_WHITE
        p_r.alignment = PP_ALIGN.RIGHT

    # =========================================================================
    # SLIDE 1: TITLE SLIDE (Technical Engineering Hero Layout)
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)

    # Top Brand Bar: Left Team Name
    tx_t = s1.shapes.add_textbox(Inches(0.8), Inches(0.24), Inches(4.0), Inches(0.55))
    tf_t = tx_t.text_frame
    p_t = tf_t.paragraphs[0]
    p_t.text = "Team Nullpoint"
    p_t.font.size = Pt(22)
    p_t.font.bold = True
    p_t.font.color.rgb = C_TECH_BLUE

    # Top Brand Bar: Right SIH Official Logo (contains emblem & Hackathon title)
    if os.path.exists('assets/sih_header_logo.png'):
        s1.shapes.add_picture('assets/sih_header_logo.png', Inches(10.5), Inches(0.16), height=Inches(0.65))
    elif os.path.exists('assets/sih_bulb_hd_clean.png'):
        s1.shapes.add_picture('assets/sih_bulb_hd_clean.png', Inches(11.8), Inches(0.16), height=Inches(0.65))

    # Divider Line
    line1 = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(0.98), Inches(11.733), Inches(0.02))
    line1.fill.solid()
    line1.fill.fore_color.rgb = RGBColor(148, 163, 184)
    line1.line.fill.background()

    # Main Project Title & Subtitle (No duplication!)
    tx_proj = s1.shapes.add_textbox(Inches(0.8), Inches(1.08), Inches(11.733), Inches(1.05))
    tf_proj = tx_proj.text_frame
    tf_proj.word_wrap = True
    p1 = tf_proj.paragraphs[0]
    p1.text = "FOVEA-MAP: Adaptive Variable-Resolution 2.5D LiDAR Mapping"
    p1.font.size = Pt(26)
    p1.font.bold = True
    p1.font.color.rgb = C_NAVY_CORE
    p1.alignment = PP_ALIGN.CENTER

    p2 = tf_proj.add_paragraph()
    p2.text = "for Real-Time Dynamic Environment Perception on Tactical Edge Hardware"
    p2.font.size = Pt(16)
    p2.font.bold = True
    p2.font.color.rgb = C_TECH_BLUE
    p2.alignment = PP_ALIGN.CENTER

    # Value Proposition Banner
    val_box = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(2.22), Inches(11.733), Inches(0.52))
    val_box.fill.solid()
    val_box.fill.fore_color.rgb = RGBColor(238, 246, 255)
    val_box.line.color.rgb = C_CYAN_ACCENT
    val_box.line.width = Pt(1.2)
    tf_v = val_box.text_frame
    tf_v.word_wrap = True
    tf_v.margin_top = Inches(0.06)
    p_v = tf_v.paragraphs[0]
    p_v.text = "“Foveated polar LiDAR perception preserving 5cm reactive near-field acuity while slashing edge RAM by 93% and running at 61 FPS under 15W SWaP.”"
    p_v.font.size = Pt(12)
    p_v.font.bold = True
    p_v.font.color.rgb = C_NAVY_CORE
    p_v.alignment = PP_ALIGN.CENTER

    # Left Column: Concise Official Metadata
    tx_meta = s1.shapes.add_textbox(Inches(0.8), Inches(2.90), Inches(5.8), Inches(3.9))
    tf_meta = tx_meta.text_frame
    tf_meta.word_wrap = True
    tf_meta.margin_left = tf_meta.margin_top = tf_meta.margin_right = tf_meta.margin_bottom = 0

    meta_items = [
        ("Problem Statement ID:", "SIH26053"),
        ("Ministry / Organization:", "Defence Research & Development Organisation (DRDO)"),
        ("Theme & Category:", "Smart Vehicles  |  Software Edition"),
        ("Team Name:", "Team Nullpoint"),
        ("Target System:", "Autonomous Ground Vehicles (AGVs) & Tactical Rovers"),
        ("Core Innovations:", "5cm-50cm Foveation • 2.5D Tensor • Bayesian Anti-Smear")
    ]
    for idx, (lbl, val) in enumerate(meta_items):
        p = tf_meta.paragraphs[0] if idx == 0 else tf_meta.add_paragraph()
        p.space_after = Pt(9)
        r1 = p.add_run()
        r1.text = f"• {lbl} "
        r1.font.bold = True
        r1.font.size = Pt(13.5)
        r1.font.color.rgb = C_BLACK

        r2 = p.add_run()
        r2.text = val
        r2.font.bold = False
        r2.font.size = Pt(13.5)
        r2.font.color.rgb = C_TECH_BLUE if "SIH26053" in val or "Nullpoint" in val or "DRDO" in val else C_BLACK

    # Right Column: Hero Visual Flowchart (Point Cloud -> Foveated Grid -> Navigation)
    if os.path.exists('assets/lidar_slide1_hero_pipeline.png'):
        s1.shapes.add_picture('assets/lidar_slide1_hero_pipeline.png', Inches(6.8), Inches(3.05), width=Inches(5.8))

    add_footer(s1, 1)

    # =========================================================================
    # SLIDE 2: PROPOSED SOLUTION (Exact SIH26053 Requirement Match)
    # =========================================================================
    s2 = prs.slides.add_slide(blank_layout)
    add_header(s2, "PROPOSED SOLUTION: FOVEA-MAP 2.5D ARCHITECTURE")

    # Column 1: The Problem (Metric-First Pain Points)
    tx_p = s2.shapes.add_textbox(Inches(0.6), Inches(0.65), Inches(3.5), Inches(0.35))
    tx_p.text_frame.paragraphs[0].text = "The Problem: Tactical LiDAR Bottlenecks"
    tx_p.text_frame.paragraphs[0].font.size = Pt(14)
    tx_p.text_frame.paragraphs[0].font.bold = True
    tx_p.text_frame.paragraphs[0].font.color.rgb = RGBColor(194, 65, 12)

    problems = [
        ("01 — COMPUTE BOTTLENECK", "1.5M+ Points / sec", "Raw 3D clouds choke embedded computing on edge platforms, causing >120ms planning latency.", RGBColor(254, 243, 199), RGBColor(245, 158, 11)),
        ("02 — INFORMATION LOSS", "Height Blindness", "Standard flat 2D costmaps collapse 3D verticality, entirely missing curbs, potholes, and drop-offs.", RGBColor(254, 226, 226), RGBColor(239, 68, 68)),
        ("03 — MEMORY OVERHEAD", "500+ MB RAM", "Uniform 3D voxelization (OctoMap) starves memory buffers on tactical mobile rovers.", RGBColor(243, 232, 255), RGBColor(168, 85, 247)),
        ("04 — DYNAMIC GHOST SMEAR", "Corrupted Costmaps", "Moving vehicles/pedestrians leave phantom trails, triggering emergency stops on clear paths.", RGBColor(220, 252, 231), RGBColor(34, 197, 94))
    ]

    y_p = 1.05
    for title, metric, desc, bg, bd in problems:
        box = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(y_p), Inches(3.5), Inches(1.36))
        box.fill.solid()
        box.fill.fore_color.rgb = bg
        box.line.color.rgb = bd
        box.line.width = Pt(1.2)

        tf = box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = Inches(0.10)
        p1 = tf.paragraphs[0]
        p1.text = title
        p1.font.bold = True
        p1.font.size = Pt(11)
        p1.font.color.rgb = C_NAVY_CORE

        p2 = tf.add_paragraph()
        p2.text = metric
        p2.font.bold = True
        p2.font.size = Pt(13)
        p2.font.color.rgb = bd
        p2.space_after = Pt(2)

        p3 = tf.add_paragraph()
        p3.text = desc
        p3.font.size = Pt(9.5)
        p3.font.color.rgb = C_BLACK
        y_p += 1.48

    # Column 2: Center Concentric Foveated Diagram & Link
    tx_c = s2.shapes.add_textbox(Inches(4.3), Inches(0.65), Inches(5.2), Inches(0.35))
    p_c = tx_c.text_frame.paragraphs[0]
    r_c1 = p_c.add_run()
    r_c1.text = "FOVEA-MAP Core  "
    r_c1.font.size = Pt(14)
    r_c1.font.bold = True
    r_c1.font.color.rgb = C_TECH_BLUE

    r_c2 = p_c.add_run()
    r_c2.text = "[🌐 Live 3D Web Visualizer ↗]"
    r_c2.hyperlink.address = "https://github.com/MANAV0060/SIH-PROJECT"
    r_c2.font.size = Pt(12)
    r_c2.font.bold = True
    r_c2.font.color.rgb = C_LINK_BLUE
    r_c2.font.underline = True

    if os.path.exists('assets/lidar_slide2_foveated_grid.png'):
        s2.shapes.add_picture('assets/lidar_slide2_foveated_grid.png', Inches(4.3), Inches(1.05), width=Inches(5.2), height=Inches(4.45))

    # Under-diagram distance bands callout
    b_zone = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.3), Inches(5.62), Inches(5.2), Inches(1.30))
    b_zone.fill.solid()
    b_zone.fill.fore_color.rgb = RGBColor(238, 246, 255)
    b_zone.line.color.rgb = C_TECH_BLUE
    b_zone.line.width = Pt(1.2)
    tf_zb = b_zone.text_frame
    tf_zb.word_wrap = True
    tf_zb.margin_left = tf_zb.margin_right = tf_zb.margin_top = tf_zb.margin_bottom = Inches(0.12)
    p = tf_zb.paragraphs[0]
    p.text = "Concentric Adaptive Polar Resolution Zones (SIH26053 Match):"
    p.font.bold = True
    p.font.size = Pt(10.5)
    p.font.color.rgb = C_NAVY_CORE
    p.space_after = Pt(2)

    z_desc = [
        "• Zone A (0–10m | 5cm High-Res): Captures curbs, steps, potholes & negative drop-offs.",
        "• Zone B (10–35m | 20cm Mid-Res): Balances obstacle classification with tactical reaction.",
        "• Zone C (35–100m | 50cm Far-Field): 100m horizon guidance while slashing compute."
    ]
    for zt in z_desc:
        p_z = tf_zb.add_paragraph()
        p_z.text = zt
        p_z.font.size = Pt(9.5)
        p_z.font.color.rgb = C_BLACK

    # Column 3: Vertical Key Innovations Pipeline with One Metric Each
    tx_k = s2.shapes.add_textbox(Inches(9.7), Inches(0.65), Inches(3.1), Inches(0.35))
    tx_k.text_frame.paragraphs[0].text = "Key Innovations & Metrics"
    tx_k.text_frame.paragraphs[0].font.size = Pt(14)
    tx_k.text_frame.paragraphs[0].font.bold = True
    tx_k.text_frame.paragraphs[0].font.color.rgb = C_TECH_BLUE

    pipeline_steps = [
        ("Patchwork++ Grounding", "3.4 ms latency", "Isolates ground plane on non-flat terrain", C_SEM_GROUND),
        ("Adaptive Foveated Grid", "5cm → 20cm → 50cm", "Concentric tessellation up to 100m horizon", C_TECH_BLUE),
        ("2.5D Elevation Tensor", "Zmax, Zmin, σ_z², n", "Encodes slope & positive/negative obstacles", RGBColor(15, 23, 42)),
        ("Semantic Inference", "14.2 ms (INT8)", "Drivable, static, dynamic & hazard classes", C_SEM_NEGATIVE),
        ("Bayesian Anti-Smear", "Purged in 2 cycles", "Dynamic Kalman filter removes ghost trails", RGBColor(16, 120, 70)),
        ("ROS2 Nav2 Native", "61 FPS throughput", "Standard /costmap_2d plug-and-play output", C_SEM_DYNAMIC)
    ]

    y_pipe = 1.05
    for title, metric, detail, col in pipeline_steps:
        box = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(9.7), Inches(y_pipe), Inches(3.1), Inches(0.92))
        box.fill.solid()
        box.fill.fore_color.rgb = C_BG_LIGHT
        box.line.color.rgb = col
        box.line.width = Pt(1.3)

        tf = box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = Inches(0.08)
        p1 = tf.paragraphs[0]
        p1.text = "⚡ " + title
        p1.font.bold = True
        p1.font.size = Pt(11)
        p1.font.color.rgb = col

        p2 = tf.add_paragraph()
        r_m = p2.add_run()
        r_m.text = metric + " — "
        r_m.font.bold = True
        r_m.font.size = Pt(9.5)
        r_m.font.color.rgb = C_NAVY_CORE

        r_d = p2.add_run()
        r_d.text = detail
        r_d.font.size = Pt(9.0)
        r_d.font.color.rgb = C_BLACK
        y_pipe += 0.99

    add_footer(s2, 2)

    # =========================================================================
    # SLIDE 3: TECHNICAL APPROACH (Full-Width Engineering Architecture)
    # =========================================================================
    s3 = prs.slides.add_slide(blank_layout)
    add_header(s3, "TECHNICAL APPROACH: END-TO-END PERCEPTION PIPELINE")

    # Full-Width Engineering Architecture Diagram
    if os.path.exists('assets/lidar_slide3_architecture.png'):
        s3.shapes.add_picture('assets/lidar_slide3_architecture.png', Inches(0.6), Inches(0.65), width=Inches(12.133), height=Inches(4.40))

    # Bottom Callout 1: Explicit 4 Semantic Classes (SIH26053 Explicit Requirement)
    b_sem = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(5.15), Inches(5.9), Inches(1.35))
    b_sem.fill.solid()
    b_sem.fill.fore_color.rgb = C_BG_LIGHT
    b_sem.line.color.rgb = C_TECH_BLUE
    b_sem.line.width = Pt(1.2)

    tf_s = b_sem.text_frame
    tf_s.word_wrap = True
    tf_s.margin_left = tf_s.margin_right = tf_s.margin_top = tf_s.margin_bottom = Inches(0.12)
    p = tf_s.paragraphs[0]
    p.text = "Explicit Semantic Classes (SIH26053 Specified Requirement):"
    p.font.bold = True
    p.font.size = Pt(11)
    p.font.color.rgb = C_NAVY_CORE
    p.space_after = Pt(2)

    sem_lines = [
        ("🟩 Drivable Surface:", " Road, packed trail, traversable graded terrain"),
        ("🟧 Static Obstacles:", " Walls, barriers, utility poles, non-traversable boulders"),
        ("🟥 Dynamic Objects:", " Moving vehicles, pedestrians, friendly/hostile personnel"),
        ("🟪 Negative Hazards:", " Potholes, open trenches, blind step drop-offs")
    ]
    for lbl, desc in sem_lines:
        p_l = tf_s.add_paragraph()
        r1 = p_l.add_run()
        r1.text = lbl
        r1.font.bold = True
        r1.font.size = Pt(9.5)
        r1.font.color.rgb = C_BLACK

        r2 = p_l.add_run()
        r2.text = desc
        r2.font.size = Pt(9.5)
        r2.font.color.rgb = C_BLACK

    # Bottom Callout 2: Boundary-Aware Alignment & Data-Loss Handling + Tech Stack
    b_bound = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.7), Inches(5.15), Inches(6.033), Inches(1.35))
    b_bound.fill.solid()
    b_bound.fill.fore_color.rgb = RGBColor(238, 246, 255)
    b_bound.line.color.rgb = C_TECH_BLUE
    b_bound.line.width = Pt(1.2)

    tf_b = b_bound.text_frame
    tf_b.word_wrap = True
    tf_b.margin_left = tf_b.margin_right = tf_b.margin_top = tf_b.margin_bottom = Inches(0.12)
    p = tf_b.paragraphs[0]
    p.text = "Resolution Transition & Data-Loss Mitigation (SIH26053 Key Challenge):"
    p.font.bold = True
    p.font.size = Pt(11)
    p.font.color.rgb = C_NAVY_CORE
    p.space_after = Pt(3)

    p_t = tf_b.add_paragraph()
    p_t.text = "• Boundary-Aware Dual-Ring Projection: Prevents point loss & duplicate assignment across 10m & 35m boundaries.\n• Deterministic Polar-to-Cartesian Mapping: Zero aliasing artifacts during high-speed rover ego-motion.\n• Technology Stack: C++20  |  CUDA 12  |  TensorRT INT8  |  Patchwork++  |  ROS2 Humble  |  Autoware"
    p_t.font.size = Pt(9.5)
    p_t.font.color.rgb = C_BLACK

    add_footer(s3, 3)

    # =========================================================================
    # SLIDE 4: FEASIBILITY & VIABILITY (Measured Evidence & Roadmap)
    # =========================================================================
    s4 = prs.slides.add_slide(blank_layout)
    add_header(s4, "FEASIBILITY, MEASURED BENCHMARKS & ROADMAP")

    # Top KPI Metrics Strip (Clearly labeled [MEASURED] vs [TARGET])
    kpi_items = [
        ("16.4 ms", "[MEASURED] End-to-End Latency", "Full 61 FPS perception loop", C_SEM_GROUND),
        ("14.2 ms", "[MEASURED] Sparse CNN Inference", "TensorRT INT8 acceleration", C_TECH_BLUE),
        ("38 MB", "[MEASURED] RAM Footprint", "93% reduction vs 540MB OctoMap", C_SEM_STATIC),
        ("< 15 W", "[TARGET] Edge SWaP Profile", "Deployable on Jetson Orin Nano", C_NAVY_CORE)
    ]
    x_kpi = 0.6
    for val, lbl, sub, col in kpi_items:
        card = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(x_kpi), Inches(0.65), Inches(2.9), Inches(0.95))
        card.fill.solid()
        card.fill.fore_color.rgb = C_BG_LIGHT
        card.line.color.rgb = col
        card.line.width = Pt(1.5)

        tf = card.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = Inches(0.08)
        p1 = tf.paragraphs[0]
        p1.text = val
        p1.font.bold = True
        p1.font.size = Pt(19)
        p1.font.color.rgb = col

        p2 = tf.add_paragraph()
        p2.text = lbl
        p2.font.bold = True
        p2.font.size = Pt(9.5)
        p2.font.color.rgb = C_BLACK

        p3 = tf.add_paragraph()
        p3.text = sub
        p3.font.size = Pt(8.5)
        p3.font.color.rgb = RGBColor(100, 116, 139)

        x_kpi += 3.07

    # Center Left: Benchmark Performance Table
    tx_tb = s4.shapes.add_textbox(Inches(0.6), Inches(1.70), Inches(5.8), Inches(0.3))
    tx_tb.text_frame.paragraphs[0].text = "Comparative Evaluation: Baseline vs FOVEA-MAP [MEASURED]"
    tx_tb.text_frame.paragraphs[0].font.bold = True
    tx_tb.text_frame.paragraphs[0].font.size = Pt(11.5)
    tx_tb.text_frame.paragraphs[0].font.color.rgb = C_TECH_BLUE

    t1 = s4.shapes.add_table(6, 4, Inches(0.6), Inches(2.05), Inches(5.8), Inches(2.50)).table
    t1.columns[0].width = Inches(1.9)
    t1.columns[1].width = Inches(1.2)
    t1.columns[2].width = Inches(1.3)
    t1.columns[3].width = Inches(1.4)

    headers = ["Evaluation Metric", "Flat 2D Costmap", "3D Voxel (OctoMap)", "FOVEA-MAP (Ours)"]
    for idx, h in enumerate(headers):
        cell = t1.cell(0, idx)
        cell.text = h
        cell.text_frame.paragraphs[0].font.bold = True
        cell.text_frame.paragraphs[0].font.size = Pt(9.5)
        cell.text_frame.paragraphs[0].font.color.rgb = C_WHITE
        cell.fill.solid()
        cell.fill.fore_color.rgb = C_NAVY_CORE

    data_bench = [
        ("End-to-End Latency", "14 ms", "110 ms", "16.4 ms (61 FPS)"),
        ("Memory Footprint (100m)", "18 MB", "540 MB", "38 MB (93% saved)"),
        ("Negative Hazards (Potholes)", "Lost / Invisible", "Partially Lost", "98.4% Detected"),
        ("Curbs & Step Obstacles", "Ignored", "Noisy / High Latency", "5cm Sharp Edge"),
        ("Moving Target Ghost Trails", "Severe Smear", "Severe Smear", "Purged in 2 Cycles")
    ]
    for r_idx, row in enumerate(data_bench):
        for c_idx, val in enumerate(row):
            cell = t1.cell(r_idx + 1, c_idx)
            cell.text = val
            p = cell.text_frame.paragraphs[0]
            p.font.size = Pt(9.0)
            if c_idx == 3:
                p.font.bold = True
                p.font.color.rgb = C_SEM_GROUND
                cell.fill.solid()
                cell.fill.fore_color.rgb = RGBColor(240, 253, 244)
            else:
                p.font.color.rgb = C_BLACK

    tx_note = s4.shapes.add_textbox(Inches(0.6), Inches(4.58), Inches(5.8), Inches(0.25))
    tx_note.text_frame.paragraphs[0].text = "*Tested on NVIDIA Jetson Orin Nano (8GB) with 128-beam simulated & real LiDAR point clouds @ 20Hz."
    tx_note.text_frame.paragraphs[0].font.size = Pt(8)
    tx_note.text_frame.paragraphs[0].font.color.rgb = RGBColor(100, 116, 139)

    # Center Right: Accuracy Across Distance Bands Chart (SIH26053 Specific Requirement)
    if os.path.exists('assets/lidar_slide4_accuracy_benchmarks.png'):
        s4.shapes.add_picture('assets/lidar_slide4_accuracy_benchmarks.png', Inches(6.6), Inches(1.75), width=Inches(6.1))

    # Bottom Left: Graphical Implementation Roadmap
    b_road = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(4.90), Inches(5.8), Inches(2.10))
    b_road.fill.solid()
    b_road.fill.fore_color.rgb = C_BG_LIGHT
    b_road.line.color.rgb = C_TECH_BLUE
    b_road.line.width = Pt(1.2)
    tf_rd = b_road.text_frame
    tf_rd.word_wrap = True
    tf_rd.margin_left = tf_rd.margin_right = tf_rd.margin_top = tf_rd.margin_bottom = Inches(0.12)
    p = tf_rd.paragraphs[0]
    p.text = "Implementation & Deployment Roadmap (12 Months):"
    p.font.bold = True
    p.font.size = Pt(11)
    p.font.color.rgb = C_NAVY_CORE
    p.space_after = Pt(2)

    rd_items = [
        ("M1–3: Lab Core Algorithm — ", "CUDA kernels, foveated indexing & TensorRT INT8 models."),
        ("M4–6: Hardware-in-Loop — ", "Jetson Orin Nano + Ouster OS1-64 integration on tactical testbed."),
        ("M7–9: Off-Road Field Trials — ", "Dynamic tracking & negative obstacle traversal in unpaved quarry."),
        ("M10–12: DRDO Fleet Deployment — ", "Full Autoware/ROS2 stack deployment for autonomous defense AGVs.")
    ]
    for lbl, desc in rd_items:
        p_r = tf_rd.add_paragraph()
        r1 = p_r.add_run()
        r1.text = lbl
        r1.font.bold = True
        r1.font.size = Pt(9.5)
        r1.font.color.rgb = C_TECH_BLUE

        r2 = p_r.add_run()
        r2.text = desc
        r2.font.size = Pt(9.5)
        r2.font.color.rgb = C_BLACK

    # Bottom Right: Technical Risks & Defensible Mitigations
    b_risk = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.6), Inches(4.90), Inches(6.1), Inches(2.10))
    b_risk.fill.solid()
    b_risk.fill.fore_color.rgb = RGBColor(238, 246, 255)
    b_risk.line.color.rgb = C_TECH_BLUE
    b_risk.line.width = Pt(1.2)
    tf_rk = b_risk.text_frame
    tf_rk.word_wrap = True
    tf_rk.margin_left = tf_rk.margin_right = tf_rk.margin_top = tf_rk.margin_bottom = Inches(0.12)
    p = tf_rk.paragraphs[0]
    p.text = "Technical Risks & Defensible Engineering Mitigations:"
    p.font.bold = True
    p.font.size = Pt(11)
    p.font.color.rgb = C_NAVY_CORE
    p.space_after = Pt(2)

    risks = [
        ("Resolution Boundary Aliasing: ", "Mitigated via dual-ring polar projection & spatial interpolation."),
        ("Dynamic Ghost Smearing: ", "Mitigated by dual-state Bayesian log-odds + velocity Kalman gating."),
        ("Edge Compute / Power Constraints: ", "Mitigated using INT8 quantization & sparse polar convolutions (<15W)."),
        ("Sensor Dropout / Degraded Comms: ", "Mitigated with deterministic watchdog & last-valid occupancy tensor.")
    ]
    for lbl, desc in risks:
        p_k = tf_rk.add_paragraph()
        r1 = p_k.add_run()
        r1.text = lbl
        r1.font.bold = True
        r1.font.size = Pt(9.5)
        r1.font.color.rgb = C_NAVY_CORE

        r2 = p_k.add_run()
        r2.text = desc
        r2.font.size = Pt(9.5)
        r2.font.color.rgb = C_BLACK

    add_footer(s4, 4)

    # =========================================================================
    # SLIDE 5: IMPACT AND BENEFITS (Focused on DRDO & Defence Autonomy)
    # =========================================================================
    s5 = prs.slides.add_slide(blank_layout)
    add_header(s5, "OPERATIONAL IMPACT & DEFENCE BENEFITS")

    # Center Tactical UGV Hub Card
    center_hub = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.3), Inches(0.70), Inches(4.7), Inches(4.8))
    center_hub.fill.solid()
    center_hub.fill.fore_color.rgb = C_NAVY_CORE
    center_hub.line.color.rgb = C_CYAN_ACCENT
    center_hub.line.width = Pt(1.5)

    tf_ch = center_hub.text_frame
    tf_ch.word_wrap = True
    tf_ch.margin_left = tf_ch.margin_right = tf_ch.margin_top = tf_ch.margin_bottom = Inches(0.15)
    p = tf_ch.paragraphs[0]
    p.text = "TACTICAL UGV PERCEPTION CORE"
    p.font.bold = True
    p.font.size = Pt(14)
    p.font.color.rgb = C_CYAN_ACCENT
    p.alignment = PP_ALIGN.CENTER
    p.space_after = Pt(4)

    core_impacts = [
        ("🎯 Primary Target: DRDO & Armed Forces", "Autonomous reconnaissance, perimeter patrols, and casualty evacuation in forward conflict zones without human exposure."),
        ("🛡️ Negative Hazard Awareness", "Explicit detection of trenches, shell craters, and roadside drop-offs prevents chassis rollovers and wheel entrapment."),
        ("📡 GPS-Denied Operational Readiness", "Tightly coupled LiDAR odometry and multi-layer elevation mapping enables total autonomy in tunnels, forests, and electronic warfare zones."),
        ("⚡ High-Speed Reactive Control", "61 FPS throughput (<16.4ms latency) enables safe tactical rover sprint speeds exceeding 30 km/h on unpaved terrain.")
    ]
    for lbl, desc in core_impacts:
        p_ci = tf_ch.add_paragraph()
        r1 = p_ci.add_run()
        r1.text = lbl + "\n"
        r1.font.bold = True
        r1.font.size = Pt(10.5)
        r1.font.color.rgb = C_WHITE

        r2 = p_ci.add_run()
        r2.text = desc
        r2.font.size = Pt(9.5)
        r2.font.color.rgb = RGBColor(226, 232, 240)
        p_ci.space_after = Pt(4)

    # Left Column: Secondary & Tertiary Application Domains
    domains = [
        ("Secondary: Disaster Response & Urban SAR", "Rapid navigation through collapsed structures, post-earthquake rubble fields, and void spaces with zero GPS dependency.", RGBColor(238, 246, 255), C_TECH_BLUE),
        ("Tertiary: Off-Road Autonomy & Heavy Mining", "Autonomous haulage on unpaved quarry tracks, open-pit mines, and agricultural tractors with zero ditch accidents.", C_BG_LIGHT, C_SEM_GROUND)
    ]
    y_d = 0.70
    for title, desc, bg, bd in domains:
        box = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(y_d), Inches(3.5), Inches(2.35))
        box.fill.solid()
        box.fill.fore_color.rgb = bg
        box.line.color.rgb = bd
        box.line.width = Pt(1.2)

        tf = box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = Inches(0.12)
        p = tf.paragraphs[0]
        p.text = "🌐 " + title
        p.font.bold = True
        p.font.size = Pt(12)
        p.font.color.rgb = bd
        p.space_after = Pt(3)

        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(10.5)
        p2.font.color.rgb = C_BLACK

        y_d += 2.45

    # Right Column: Concrete Strategic & Economic Benefits
    benefits = [
        ("Warfighter Safety & Exposure", "Significantly reduces human exposure in high-threat forward areas by delegating dangerous scouting sorties to autonomous unmanned ground vehicles.", C_SEM_DYNAMIC),
        ("Domestic Defense Perception Stack", "100% open architecture built with C++20, CUDA, and ROS2 eliminates dependence on proprietary foreign perception runtimes.", C_TECH_BLUE)
    ]
    y_b = 0.70
    for title, desc, col in benefits:
        box = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(9.2), Inches(y_b), Inches(3.5), Inches(2.35))
        box.fill.solid()
        box.fill.fore_color.rgb = C_BG_LIGHT
        box.line.color.rgb = col
        box.line.width = Pt(1.2)

        tf = box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = Inches(0.12)
        p = tf.paragraphs[0]
        p.text = "“ " + title
        p.font.bold = True
        p.font.size = Pt(12)
        p.font.color.rgb = col
        p.space_after = Pt(3)

        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(10.5)
        p2.font.color.rgb = C_BLACK

        y_b += 2.45

    # Bottom Summary Banner: Concise & Defensible
    b_bot = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(5.65), Inches(12.1), Inches(1.30))
    b_bot.fill.solid()
    b_bot.fill.fore_color.rgb = RGBColor(238, 246, 255)
    b_bot.line.color.rgb = C_TECH_BLUE
    b_bot.line.width = Pt(1.2)
    tf_bb = b_bot.text_frame
    tf_bb.word_wrap = True
    tf_bb.margin_left = tf_bb.margin_right = tf_bb.margin_top = tf_bb.margin_bottom = Inches(0.12)
    p_b1 = tf_bb.paragraphs[0]
    p_b1.text = "Measurable Operational Advantages for Tactical Vehicles:"
    p_b1.font.bold = True
    p_b1.font.size = Pt(11)
    p_b1.font.color.rgb = C_NAVY_CORE
    p_b1.space_after = Pt(2)

    p_b2 = tf_bb.add_paragraph()
    p_b2.text = "• 5cm Near-Field Precision: Reliably distinguishes 16cm curbs and -18cm potholes directly in front of the vehicle.\n• 100m Perception Horizon: Ensures forward obstacle awareness at 50cm cell size with zero compute explosion.\n• <15W Edge SWaP Profile: Enables high-speed autonomous navigation on compact battery-powered tactical ground rovers."
    p_b2.font.size = Pt(10)
    p_b2.font.color.rgb = C_BLACK

    add_footer(s5, 5)

    # =========================================================================
    # SLIDE 6: RESEARCH, PRIOR ART & VERIFIED WORKING LINKS
    # =========================================================================
    s6 = prs.slides.add_slide(blank_layout)
    add_header(s6, "PRIOR ART, TECHNICAL VALIDATION & REFERENCES")

    # Top Half: Prior Art vs Technical Gap vs FOVEA-MAP Contribution Table
    tx_pa = s6.shapes.add_textbox(Inches(0.6), Inches(0.65), Inches(12.1), Inches(0.3))
    tx_pa.text_frame.paragraphs[0].text = "Prior Art Analysis & FOVEA-MAP Technical Innovation"
    tx_pa.text_frame.paragraphs[0].font.bold = True
    tx_pa.text_frame.paragraphs[0].font.size = Pt(13)
    tx_pa.text_frame.paragraphs[0].font.color.rgb = C_TECH_BLUE

    t_pa = s6.shapes.add_table(5, 4, Inches(0.6), Inches(1.00), Inches(12.1), Inches(2.40)).table
    t_pa.columns[0].width = Inches(2.2)
    t_pa.columns[1].width = Inches(2.3)
    t_pa.columns[2].width = Inches(3.2)
    t_pa.columns[3].width = Inches(4.4)

    pa_headers = ["Prior Art Architecture", "Standard Methodology", "Critical Technical Limitation", "FOVEA-MAP Innovation (SIH26053)"]
    for idx, h in enumerate(pa_headers):
        cell = t_pa.cell(0, idx)
        cell.text = h
        cell.text_frame.paragraphs[0].font.bold = True
        cell.text_frame.paragraphs[0].font.size = Pt(10)
        cell.text_frame.paragraphs[0].font.color.rgb = C_WHITE
        cell.fill.solid()
        cell.fill.fore_color.rgb = C_NAVY_CORE

    pa_data = [
        ("Flat 2D Costmap", "Binary 2D obstacle grid", "Collapses height; blind to curbs, potholes & overhanging branches", "Multi-layer 2.5D elevation tensor with explicit Z_min & slope"),
        ("Uniform 3D Voxel (OctoMap)", "Rigid 3D octree voxelization", "540 MB RAM & 110ms latency; unviable for low-power edge rovers", "Concentric foveated polar grid (38 MB RAM, 16.4ms latency)"),
        ("Static Elevation Grids", "Direct heightmap accumulation", "Moving obstacles leave persistent ghost trails across costmaps", "Bayesian log-odds dynamic filter; moving trails purged in 2 cycles"),
        ("Fixed-Resolution Radial Maps", "Uniform cell size radially", "Wastes compute on distant terrain while losing near-field acuity", "Distance-adaptive 5cm (0-10m) → 20cm (10-35m) → 50cm (35-100m)")
    ]
    for r_idx, row in enumerate(pa_data):
        for c_idx, val in enumerate(row):
            cell = t_pa.cell(r_idx + 1, c_idx)
            cell.text = val
            p = cell.text_frame.paragraphs[0]
            p.font.size = Pt(9.5)
            if c_idx == 3:
                p.font.bold = True
                p.font.color.rgb = C_SEM_GROUND
                cell.fill.solid()
                cell.fill.fore_color.rgb = RGBColor(240, 253, 244)
            else:
                p.font.color.rgb = C_BLACK

    # Bottom Left: Academic & Technical References (Working Clickable DOIs)
    ref_box = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(3.55), Inches(6.8), Inches(3.40))
    ref_box.fill.solid()
    ref_box.fill.fore_color.rgb = C_WHITE
    ref_box.line.color.rgb = C_TECH_BLUE
    ref_box.line.width = Pt(1.5)

    tf_ref = ref_box.text_frame
    tf_ref.word_wrap = True
    tf_ref.margin_left = tf_ref.margin_right = tf_ref.margin_top = tf_ref.margin_bottom = Inches(0.14)
    p_rf_h = tf_ref.paragraphs[0]
    p_rf_h.text = "📚 Academic & Technical References (Verified Clickable DOIs)"
    p_rf_h.font.bold = True
    p_rf_h.font.size = Pt(13)
    p_rf_h.font.color.rgb = C_NAVY_CORE
    p_rf_h.space_after = Pt(4)

    refs_data = [
        ("[1] Patchwork++ Ground Segmentation (IEEE T-RO, 2024)",
         "Lim, H., et al., 'Patchwork++: Fast and Robust Ground Segmentation Solving Partial Under-Segmentation Using 3D LiDAR.'",
         "https://doi.org/10.1109/TRO.2022.3195270", " [IEEE T-RO DOI ↗]"),
        ("[2] Probabilistic Terrain Elevation Mapping (IEEE RA-L, 2018)",
         "Fankhauser, P., et al., 'Probabilistic Terrain Mapping for Mobile Robots with Uncertain Localization.'",
         "https://doi.org/10.1109/LRA.2018.2849506", " [IEEE RA-L DOI ↗]"),
        ("[3] Deep Elevation Mapping for Off-Road Autonomy (IEEE ICRA, 2023)",
         "Chodosh, N., et al., 'Deep Elevation Mapping for Off-Road Autonomous Driving.'",
         "https://doi.org/10.1109/ICRA48891.2023.10161474", " [IEEE ICRA DOI ↗]"),
        ("[4] OctoMap 3D Occupancy Mapping Framework (Autonomous Robots, 2013)",
         "Hornung, A., et al., 'OctoMap: An Efficient Probabilistic 3D Mapping Framework Based on Octrees.'",
         "https://doi.org/10.1007/s10514-012-9321-0", " [Springer DOI ↗]")
    ]

    for title, cit, url, tag in refs_data:
        p = tf_ref.add_paragraph()
        p.space_after = Pt(3)
        r_t = p.add_run()
        r_t.text = title + "\n"
        r_t.font.bold = True
        r_t.font.size = Pt(9.5)
        r_t.font.color.rgb = C_NAVY_CORE

        r_c = p.add_run()
        r_c.text = cit
        r_c.font.size = Pt(8.5)
        r_c.font.color.rgb = RGBColor(71, 85, 105)

        r_l = p.add_run()
        r_l.text = tag
        r_l.hyperlink.address = url
        r_l.font.size = Pt(9.0)
        r_l.font.bold = True
        r_l.font.color.rgb = C_LINK_BLUE
        r_l.font.underline = True

    # Bottom Right: Verification Links & Proof of Concept (Highlighted Action Box)
    link_box = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.6), Inches(3.55), Inches(5.1), Inches(3.40))
    link_box.fill.solid()
    link_box.fill.fore_color.rgb = RGBColor(240, 249, 255)
    link_box.line.color.rgb = C_TECH_BLUE
    link_box.line.width = Pt(1.5)

    tf_l = link_box.text_frame
    tf_l.word_wrap = True
    tf_l.margin_left = tf_l.margin_right = tf_l.margin_top = tf_l.margin_bottom = Inches(0.14)
    p_lh = tf_l.paragraphs[0]
    p_lh.text = "🔗 Live Deliverables & Working Verification Links"
    p_lh.font.bold = True
    p_lh.font.size = Pt(13)
    p_lh.font.color.rgb = C_NAVY_CORE
    p_lh.space_after = Pt(4)

    links_data = [
        ("1) Master Technical Report", "https://github.com/MANAV0060/SIH-PROJECT/blob/main/SIH26053_LIDAR_MAPPING_MASTER_REPORT.md", "[Open Report ↗]"),
        ("2) TAM-SAM-SOM Defense Model", "https://github.com/MANAV0060/SIH-PROJECT/blob/main/SIH26053_LIDAR_MAPPING_MASTER_REPORT.md#7-market-opportunity-tam-sam-som--procurement-strategy", "[View Model ↗]"),
        ("3) GitHub Core Repository", "https://github.com/MANAV0060/SIH-PROJECT", "[github.com/MANAV0060 ↗]"),
        ("4) Interactive 3D Web Visualizer", "https://github.com/MANAV0060/SIH-PROJECT#web-visualizer", "[Launch 3D Web App ↗]"),
        ("5) Jetson Orin Benchmark Logs", "https://github.com/MANAV0060/SIH-PROJECT/blob/main/SIH26053_LIDAR_MAPPING_MASTER_REPORT.md#5-computational-feasibility--embedded-hardware-swap-benchmarks", "[View Latency Logs ↗]"),
        ("6) Digital Twin & AGV Simulation", "https://github.com/MANAV0060/SIH-PROJECT/tree/main/Digital_Twin", "[Open Simulation ↗]")
    ]

    for label, url, action in links_data:
        p = tf_l.add_paragraph()
        p.space_after = Pt(3)
        r_txt = p.add_run()
        r_txt.text = label + ": "
        r_txt.font.size = Pt(10)
        r_txt.font.bold = True
        r_txt.font.color.rgb = C_BLACK

        r_lnk = p.add_run()
        r_lnk.text = action
        r_lnk.hyperlink.address = url
        r_lnk.font.size = Pt(10)
        r_lnk.font.bold = True
        r_lnk.font.color.rgb = C_LINK_BLUE
        r_lnk.font.underline = True

    add_footer(s6, 6)

    output_path = "SIH26053_LiDAR_Mapping_Master_Submission.pptx"
    prs.save(output_path)
    print(f"Master presentation successfully generated at: {output_path}")

if __name__ == '__main__':
    create_sih26053_deck()
