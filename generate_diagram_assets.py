import os
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFont

os.makedirs('assets/icons', exist_ok=True)

def create_donut_ring():
    size = 800
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    center = size / 2
    r_outer = 370
    r_inner = 230

    # 5 sectors matching card positions:
    # Top (234 to 306): Blue (UAV Pilots)
    # Top-Right (306 to 18): Teal (Ground Engineers)
    # Bottom-Right (18 to 90): Purple (Safety Officers)
    # Bottom-Left (90 to 162): Green (Tri-Services Fleet)
    # Mid-Left (162 to 234): Orange (Nation & MoD)
    sectors = [
        (234, 306, (2, 132, 199)),   # Blue (Top)
        (306, 378, (13, 148, 136)),  # Teal (Top-Right, 378 % 360 = 18)
        (18, 90, (124, 58, 237)),    # Purple (Bottom-Right)
        (90, 162, (22, 163, 74)),    # Green (Bottom-Left)
        (162, 234, (234, 88, 12))    # Orange (Mid-Left)
    ]

    # Draw sectors using pie slices
    for start_deg, end_deg, rgb in sectors:
        # Convert degrees (Pillow 0 is at 3 o'clock, goes clockwise)
        # We adjust to match our angles:
        draw.pieslice([center - r_outer, center - r_outer, center + r_outer, center + r_outer],
                      start=start_deg, end=end_deg, fill=rgb + (255,))

    # Draw white dividing lines between sectors
    for start_deg, _, _ in sectors:
        rad = math.radians(start_deg)
        x_out = center + r_outer * math.cos(rad)
        y_out = center + r_outer * math.sin(rad)
        x_in = center + (r_inner - 10) * math.cos(rad)
        y_in = center + (r_inner - 10) * math.sin(rad)
        draw.line([(x_in, y_in), (x_out, y_out)], fill=(255, 255, 255, 255), width=8)

    # Cut out inner hole
    draw.ellipse([center - r_inner, center - r_inner, center + r_inner, center + r_inner],
                 fill=(0, 0, 0, 0))

    img.save('assets/icons/donut_wheel_ring.png', 'PNG')
    print("Created assets/icons/donut_wheel_ring.png")

def overlay_icons_on_donut():
    ring = Image.open('assets/icons/donut_wheel_ring.png').convert('RGBA')
    center = ring.size[0] / 2
    r_mid = 300

    icon_placements = [
        (270, 'assets/icons/icon_drone.png', 72),      # Blue (Top)
        (342, 'assets/icons/icon_gears.png', 68),      # Teal (Top-Right)
        (54, 'assets/icons/icon_safety.png', 70),      # Purple (Bottom-Right)
        (126, 'assets/icons/icon_fleet.png', 72),      # Green (Bottom-Left)
        (198, 'assets/icons/icon_govt.png', 68)        # Orange (Mid-Left)
    ]

    for deg, icon_path, ic_size in icon_placements:
        if os.path.exists(icon_path):
            ic = Image.open(icon_path).convert('RGBA')
            ic = ic.resize((ic_size, ic_size), Image.Resampling.LANCZOS)
            rad = math.radians(deg)
            ix = int(center + r_mid * math.cos(rad) - ic_size / 2)
            iy = int(center + r_mid * math.sin(rad) - ic_size / 2)
            ring.paste(ic, (ix, iy), ic)

    ring.save('assets/icons/donut_wheel_ring.png', 'PNG')
    print("Overlaid sector icons onto assets/icons/donut_wheel_ring.png")

def create_drone_icon():
    size = 200
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    c = size // 2
    # Drone center fuselage
    d.ellipse([c-24, c-18, c+24, c+18], fill=(255, 255, 255, 255))
    # 4 arms
    d.line([c-45, c-35, c+45, c+35], fill=(255, 255, 255, 255), width=8)
    d.line([c-45, c+35, c+45, c-35], fill=(255, 255, 255, 255), width=8)
    # 4 rotor rings
    for rx, ry in [(c-45, c-35), (c+45, c-35), (c-45, c+35), (c+45, c+35)]:
        d.ellipse([rx-16, ry-10, rx+16, ry+10], outline=(255, 255, 255, 255), width=5)
        d.ellipse([rx-4, ry-4, rx+4, ry+4], fill=(255, 255, 255, 255))
    img.save('assets/icons/icon_drone.png', 'PNG')

def create_govt_icon():
    size = 200
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    c = size // 2
    # Pediment roof
    d.polygon([(c-55, c-20), (c, c-55), (c+55, c-20)], fill=(255, 255, 255, 255))
    # Architrave
    d.rectangle([c-55, c-18, c+55, c-10], fill=(255, 255, 255, 255))
    # 4 Pillars
    for px in [c-42, c-14, c+14, c+42]:
        d.rectangle([px-5, c-6, px+5, c+35], fill=(255, 255, 255, 255))
    # Base
    d.rectangle([c-60, c+36, c+60, c+48], fill=(255, 255, 255, 255))
    img.save('assets/icons/icon_govt.png', 'PNG')

def create_gears_icon():
    size = 200
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    c = size // 2
    # Gear 1
    d.ellipse([c-40, c-40, c+40, c+40], fill=(255, 255, 255, 255))
    for i in range(8):
        ang = i * (math.pi / 4)
        gx = c + 44 * math.cos(ang)
        gy = c + 44 * math.sin(ang)
        d.rectangle([gx-8, gy-8, gx+8, gy+8], fill=(255, 255, 255, 255))
    d.ellipse([c-18, c-18, c+18, c+18], fill=(0, 0, 0, 0))
    img.save('assets/icons/icon_gears.png', 'PNG')

def create_fleet_icon():
    size = 200
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    c = size // 2
    # 3 users / military silhouettes
    # Center head & body
    d.ellipse([c-16, c-45, c+16, c-13], fill=(255, 255, 255, 255))
    d.ellipse([c-32, c-6, c+32, c+45], fill=(255, 255, 255, 255))
    # Left head & body
    d.ellipse([c-50, c-35, c-26, c-11], fill=(255, 255, 255, 230))
    d.ellipse([c-62, c-3, c-18, c+40], fill=(255, 255, 255, 230))
    # Right head & body
    d.ellipse([c+26, c-35, c+50, c-11], fill=(255, 255, 255, 230))
    d.ellipse([c+18, c-3, c+62, c+40], fill=(255, 255, 255, 230))
    img.save('assets/icons/icon_fleet.png', 'PNG')

def create_safety_icon():
    size = 200
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    c = size // 2
    # Officer with cap
    # Cap
    d.ellipse([c-35, c-48, c+35, c-28], fill=(255, 255, 255, 255))
    d.polygon([(c-40, c-32), (c, c-24), (c+40, c-32), (c, c-20)], fill=(255, 255, 255, 255))
    # Face
    d.ellipse([c-22, c-28, c+22, c+12], fill=(255, 255, 255, 255))
    # Uniform torso
    d.ellipse([c-38, c+12, c+38, c+60], fill=(255, 255, 255, 255))
    img.save('assets/icons/icon_safety.png', 'PNG')

def create_shield_icon():
    size = 200
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    c = size // 2
    # Shield outline
    points = [
        (c-45, c-45), (c+45, c-45),
        (c+45, c+5), (c, c+55),
        (c-45, c+5)
    ]
    d.polygon(points, fill=(255, 255, 255, 255))
    # Inner checkmark in orange
    d.line([(c-20, c+5), (c-6, c+22), (c+22, c-15)], fill=(234, 88, 12, 255), width=10)
    img.save('assets/icons/icon_shield.png', 'PNG')

def create_coins_icon():
    size = 200
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    c = size // 2
    # Stacked coins
    for y_off in [18, 0, -18]:
        d.ellipse([c-42, c+y_off-15, c+42, c+y_off+15], fill=(255, 255, 255, 255), outline=(22, 163, 74, 255), width=3)
    # Top coin symbol ₹
    d.ellipse([c-42, c-36-15, c+42, c-36+15], fill=(255, 255, 255, 255))
    d.text((c-12, c-46), "₹", fill=(22, 163, 74, 255), font_size=28)
    img.save('assets/icons/icon_coins.png', 'PNG')

def create_india_icon():
    size = 200
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    c = size // 2
    # India map stylized diamond / emblem with star
    d.polygon([(c, c-50), (c+38, c-20), (c+35, c+20), (c, c+55), (c-35, c+20), (c-38, c-20)], fill=(255, 255, 255, 255))
    # Chakra spokes in blue
    d.ellipse([c-18, c-18, c+18, c+18], outline=(2, 132, 199, 255), width=4)
    d.ellipse([c-4, c-4, c+4, c+4], fill=(2, 132, 199, 255))
    img.save('assets/icons/icon_india.png', 'PNG')

def create_barchart_icon():
    size = 200
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    c = size // 2
    # 3 bar chart columns with trendline
    d.rectangle([c-40, c+10, c-20, c+45], fill=(255, 255, 255, 255))
    d.rectangle([c-10, c-15, c+10, c+45], fill=(255, 255, 255, 255))
    d.rectangle([c+20, c-40, c+40, c+45], fill=(255, 255, 255, 255))
    # Arrow
    d.line([(c-40, c-10), (c, c-30), (c+45, c-52)], fill=(255, 255, 255, 255), width=6)
    img.save('assets/icons/icon_barchart.png', 'PNG')

def create_blue_shield_emblem():
    size = 200
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    c = size // 2
    # Blue shield with checkmark for center of wheel
    points = [
        (c-35, c-38), (c+35, c-38),
        (c+35, c+5), (c, c+42),
        (c-35, c+5)
    ]
    d.polygon(points, fill=(2, 132, 199, 255))
    d.line([(c-16, c+4), (c-5, c+16), (c+18, c-12)], fill=(255, 255, 255, 255), width=8)
    img.save('assets/icons/icon_center_shield.png', 'PNG')

if __name__ == '__main__':
    create_donut_ring()
    create_drone_icon()
    create_govt_icon()
    create_gears_icon()
    create_fleet_icon()
    create_safety_icon()
    create_shield_icon()
    create_coins_icon()
    create_india_icon()
    create_barchart_icon()
    create_blue_shield_emblem()
    overlay_icons_on_donut()
    print("All diagram icons generated successfully!")
