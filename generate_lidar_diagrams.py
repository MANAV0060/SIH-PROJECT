import os
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import Wedge, Circle, Rectangle, FancyBboxPatch

os.makedirs('assets', exist_ok=True)

# -------------------------------------------------------------
# 1. Slide 2 Visual: Foveated Concentric 2.5D Grid Engine
# -------------------------------------------------------------
fig, ax = plt.subplots(figsize=(8, 5.5), dpi=300)
fig.patch.set_facecolor('#0B132B')
ax.set_facecolor('#0B132B')

# Draw concentric foveated radar circles
radii = [1.2, 2.8, 4.2]
colors = ['#1C2541', '#3A506B', '#486581']
zone_labels = [
    "ZONE A: 0-10m\nHigh-Res (5cm Cells)\nCurbs, Steps, Potholes",
    "ZONE B: 10-35m\nMid-Res (20cm Cells)\nTactical Maneuver Zone",
    "ZONE C: 35-100m\nCoarse (50cm Cells)\nFar Horizon Guidance"
]

# Outer circle
c3 = Circle((0, 0), radii[2], color='#111D4A', alpha=0.6, ec='#486581', lw=1.5, ls='--')
ax.add_patch(c3)
# Mid circle
c2 = Circle((0, 0), radii[1], color='#1C2541', alpha=0.7, ec='#00B4D8', lw=1.8, ls='--')
ax.add_patch(c2)
# Inner circle (Reaction Zone)
c1 = Circle((0, 0), radii[0], color='#2B3A67', alpha=0.85, ec='#FF5A5F', lw=2.2)
ax.add_patch(c1)

# Radial scan lines
angles = np.linspace(0, 2*np.pi, 16, endpoint=False)
for ang in angles:
    ax.plot([0, radii[2]*np.cos(ang)], [0, radii[2]*np.sin(ang)], color='#00B4D8', alpha=0.25, lw=0.8)

# Center Autonomous Vehicle (AGV)
veh = Rectangle((-0.25, -0.4), 0.5, 0.8, color='#FF5A5F', ec='#FFFFFF', lw=1.5, zorder=5)
ax.add_patch(veh)
ax.text(0, -0.65, "TACTICAL AGV\nSENSOR ORIGIN", color='#FFFFFF', fontsize=7.5, fontweight='bold', ha='center', zorder=6)

# Negative Obstacle (Pothole/Trench in Zone A)
pothole = Circle((-0.6, 0.5), 0.22, color='#9B5DE5', ec='#F15BB5', lw=1.8, zorder=5)
ax.add_patch(pothole)
ax.text(-0.6, 0.82, "NEGATIVE HAZARD\n(Pothole: Δz = -18cm)", color='#F15BB5', fontsize=6.5, fontweight='bold', ha='center', zorder=6)

# Positive Obstacle (Curb / Boulder in Zone A)
curb = Rectangle((0.45, 0.35), 0.45, 0.25, color='#FEE440', ec='#FF9F1C', lw=1.5, zorder=5)
ax.add_patch(curb)
ax.text(0.68, 0.70, "POSITIVE OBSTACLE\n(Curb: Δz = +16cm)", color='#FF9F1C', fontsize=6.5, fontweight='bold', ha='center', zorder=6)

# Dynamic Moving Target (Zone B)
moving = Rectangle((-2.0, -1.2), 0.5, 0.35, color='#00F5D4', ec='#FFFFFF', lw=1.5, zorder=5)
ax.add_patch(moving)
ax.annotate("", xy=(-2.5, -1.0), xytext=(-2.0, -1.0), arrowprops=dict(arrowstyle="->", color='#00F5D4', lw=2))
ax.text(-1.75, -1.55, "DYNAMIC TARGET\n(v = 4.2 m/s, Purged Smear)", color='#00F5D4', fontsize=6.5, fontweight='bold', ha='center', zorder=6)

# Far Horizon Hazard (Zone C)
far_obs = Circle((2.6, 1.8), 0.35, color='#E63946', ec='#FFFFFF', lw=1.2, zorder=5)
ax.add_patch(far_obs)
ax.text(2.6, 2.3, "DISTANT TERRAIN\n(50cm Grid Cell)", color='#E63946', fontsize=6.5, fontweight='bold', ha='center', zorder=6)

# Title & Metrics Banner
ax.text(0, 4.4, "FOVEA-MAP 2.5D: CONCENTRIC ADAPTIVE TESSELLATION", color='#FFFFFF', fontsize=10.5, fontweight='bold', ha='center')
ax.text(0, -4.5, "Sub-Centimeter Reactivity (0-10m) | >85% Memory Reduction | Zero Smearing", color='#00B4D8', fontsize=7.5, fontweight='bold', ha='center')

# Zone Callouts
ax.text(0, 1.4, "ZONE A: 0-10m (5cm High-Res)", color='#FF5A5F', fontsize=7, fontweight='bold', ha='center')
ax.text(0, 3.0, "ZONE B: 10-35m (20cm Mid-Res)", color='#00B4D8', fontsize=7, fontweight='bold', ha='center')
ax.text(0, 4.0, "ZONE C: 35-100m (50cm Coarse)", color='#486581', fontsize=7, fontweight='bold', ha='center')

ax.set_xlim(-4.8, 4.8)
ax.set_ylim(-4.8, 4.8)
ax.axis('off')

plt.tight_layout()
plt.savefig('assets/lidar_slide2_foveated_grid.png', dpi=300, facecolor=fig.get_facecolor(), edgecolor='none')
plt.close()
print("Created assets/lidar_slide2_foveated_grid.png")

# -------------------------------------------------------------
# 2. Slide 3 Architecture Flowchart
# -------------------------------------------------------------
fig, ax = plt.subplots(figsize=(10, 5.2), dpi=300)
fig.patch.set_facecolor('#FFFFFF')
ax.set_facecolor('#FFFFFF')

def draw_node(x, y, w, h, title, subtitle, bg_color, border_color, title_color='#FFFFFF'):
    box = FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.08,rounding_size=0.12",
                         facecolor=bg_color, edgecolor=border_color, linewidth=1.5, zorder=3)
    ax.add_patch(box)
    ax.text(x + w/2, y + h*0.62, title, color=title_color, fontsize=8.5, fontweight='bold', ha='center', va='center', zorder=4)
    ax.text(x + w/2, y + h*0.28, subtitle, color=title_color, fontsize=6.8, ha='center', va='center', zorder=4)

def draw_arrow(x1, y1, x2, y2, label=""):
    ax.annotate("", xy=(x2, y2), xytext=(x1, y1),
                arrowprops=dict(arrowstyle="-|>", color='#005B94', lw=2, mutation_scale=12), zorder=2)
    if label:
        ax.text((x1+x2)/2, (y1+y2)/2 + 0.12, label, color='#0F172A', fontsize=6.5, fontweight='bold', ha='center', zorder=5)

# Pipeline Nodes
draw_node(0.5, 3.2, 1.8, 1.2, "3D LiDAR Input", "128-Beam Point Cloud\n1.8M pts/sec @ 20Hz", "#0F172A", "#334155")
draw_arrow(2.3, 3.8, 3.0, 3.8, "Raw Stream")

draw_node(3.0, 3.2, 2.0, 1.2, "Patchwork++ Ground", "Cylindrical RANSAC\nZ_ground Extraction", "#005B94", "#0284C7")
draw_arrow(5.0, 3.8, 5.7, 3.8, "Separated")

draw_node(5.7, 3.2, 2.1, 1.2, "Foveated Grid Engine", "Concentric Zones\n5cm -> 20cm -> 50cm", "#0369A1", "#38BDF8")
draw_arrow(7.8, 3.8, 8.5, 3.8, "Polar Bins")

draw_node(8.5, 3.2, 2.0, 1.2, "2.5D Tensor Store", "Z_max, Z_min, Normal n\nRoughness σ_z²", "#1E293B", "#64748B")

# Branch Downwards to Deep Learning & Bayesian Tracker
draw_arrow(9.5, 3.2, 9.5, 2.2, "Grid Tensors")

draw_node(8.2, 0.9, 2.5, 1.2, "Sparse Polar CNN", "TensorRT INT8 Quantized\n4-Class Semantic Inference", "#7C3AED", "#A855F7")
draw_arrow(8.2, 1.5, 7.2, 1.5, "Class Masks")

draw_node(4.8, 0.9, 2.4, 1.2, "Bayesian Tracker", "Log-Odds Evidence\nKalman Dynamic Filter", "#059669", "#34D399")
draw_arrow(4.8, 1.5, 3.8, 1.5, "Clean Costs")

draw_node(1.2, 0.9, 2.6, 1.2, "ROS2 Nav2 / Autoware", "/costmap_2d @ 50+ FPS\nSub-20ms Planning Loop", "#DC2626", "#F87171")

ax.set_xlim(0, 11.2)
ax.set_ylim(0.2, 5.0)
ax.axis('off')

plt.tight_layout()
plt.savefig('assets/lidar_slide3_architecture.png', dpi=300, facecolor=fig.get_facecolor(), edgecolor='none')
plt.close()
print("Created assets/lidar_slide3_architecture.png")

# -------------------------------------------------------------
# 3. Slide 5 Market Sizing (TAM-SAM-SOM)
# -------------------------------------------------------------
fig, ax = plt.subplots(figsize=(6, 5), dpi=300)
fig.patch.set_facecolor('#FFFFFF')
ax.set_facecolor('#FFFFFF')

# Concentric Circles
c_tam = Circle((0, 0), 2.4, color='#005B94', alpha=0.9, ec='#0F172A', lw=2)
c_sam = Circle((0, 0), 1.6, color='#0284C7', alpha=0.95, ec='#FFFFFF', lw=2)
c_som = Circle((0, 0), 0.85, color='#38BDF8', alpha=1.0, ec='#FFFFFF', lw=2.2)

ax.add_patch(c_tam)
ax.add_patch(c_sam)
ax.add_patch(c_som)

# Text Callouts
ax.text(0, 1.9, "TAM: $6.2 BILLION\nGlobal Autonomous & Defense LiDAR Market", color='#FFFFFF', fontsize=7.5, fontweight='bold', ha='center')
ax.text(0, 1.15, "SAM: $1.15 BILLION\nIndian Defense & Tactical AGVs", color='#FFFFFF', fontsize=7.5, fontweight='bold', ha='center')
ax.text(0, -0.05, "SOM: $85M\nImmediate 3-Yr\nDefense Capture", color='#0F172A', fontsize=8, fontweight='bold', ha='center')

ax.set_xlim(-2.8, 2.8)
ax.set_ylim(-2.8, 2.8)
ax.axis('off')

plt.tight_layout()
plt.savefig('assets/lidar_slide5_tam_sam_som.png', dpi=300, facecolor=fig.get_facecolor(), edgecolor='none')
plt.close()
print("Created assets/lidar_slide5_tam_sam_som.png")
