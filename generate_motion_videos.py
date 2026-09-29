import os
import math
import shutil
import subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFont

def make_engine_video():
    print("Generating Engine Twin Motion Video...")
    src_img_path = r"C:\Users\manav\.gemini\antigravity-ide\brain\722ca0eb-bec6-4f3b-8282-7d3f2a30a765\engine_twin_hologram_1790680224988.jpg"
    base_img = Image.open(src_img_path).convert('RGB')
    
    # Target resolution: 988 x 738 (Aspect ~329:246, both even numbers for H.264)
    target_w, target_h = 988, 738
    fps = 30
    duration_sec = 6
    total_frames = fps * duration_sec
    
    temp_dir = "temp_engine_frames"
    os.makedirs(temp_dir, exist_ok=True)
    
    # Pre-crop base image to target aspect ratio
    src_w, src_h = base_img.size
    src_aspect = src_w / src_h
    target_aspect = target_w / target_h
    
    if src_aspect > target_aspect:
        new_w = int(src_h * target_aspect)
        left = (src_w - new_w) // 2
        cropped_base = base_img.crop((left, 0, left + new_w, src_h))
    else:
        new_h = int(src_w / target_aspect)
        top = (src_h - new_h) // 2
        cropped_base = base_img.crop((0, top, src_w, top + new_h))
        
    cw, ch = cropped_base.size
    
    for f in range(total_frames):
        t = f / total_frames
        # Smooth looping sine for camera breathing zoom (1.0 to 1.07)
        zoom = 1.0 + 0.07 * (0.5 - 0.5 * math.cos(2 * math.pi * t))
        
        # Crop with zoom centered around the cylinders
        crop_w = int(cw / zoom)
        crop_h = int(ch / zoom)
        center_x = int(cw * 0.52)
        center_y = int(ch * 0.46)
        
        left = max(0, min(cw - crop_w, center_x - crop_w // 2))
        top = max(0, min(ch - crop_h, center_y - crop_h // 2))
        
        frame = cropped_base.crop((left, top, left + crop_w, top + crop_h)).resize((target_w, target_h), Image.Resampling.LANCZOS)
        
        # Draw dynamic telemetry scanline and HUD overlays
        draw = ImageDraw.Draw(frame, 'RGBA')
        
        # 1. Scanning laser beam sweeping down
        scan_y = int(((t * 1.5) % 1.0) * target_h)
        for offset in range(-6, 7):
            alpha = int(max(0, 180 - abs(offset) * 28))
            draw.line([(0, scan_y + offset), (target_w, scan_y + offset)], fill=(0, 220, 255, alpha), width=1)
        # Scan glow head
        draw.line([(0, scan_y), (target_w, scan_y)], fill=(200, 255, 255, 240), width=2)
        
        # 2. Pulsing thermal cylinder glow (5 Hz cycle)
        pulse = 0.5 + 0.5 * math.sin(f * (5 * 2 * math.pi / fps))
        glow_alpha = int(40 + 55 * pulse)
        # Cylinder B1 / A1 area
        draw.ellipse([int(target_w * 0.38), int(target_h * 0.22), int(target_w * 0.56), int(target_h * 0.42)],
                     outline=(255, 95, 3, glow_alpha), width=2)
        # Cylinder B2 / A2 area
        draw.ellipse([int(target_w * 0.60), int(target_h * 0.34), int(target_w * 0.78), int(target_h * 0.54)],
                     outline=(255, 95, 3, glow_alpha), width=2)
        
        # 3. Dynamic Real-time HUD stats
        rpm_val = int(5180 + 35 * math.sin(t * 8 * math.pi) + 15 * math.cos(t * 14 * math.pi))
        cht_val = round(248.5 + 2.5 * math.sin(t * 2 * math.pi), 1)
        fps_cadence = "5.0 Hz SYNCHRONIZED"
        
        # Top-left HUD badge
        draw.rectangle([20, 20, 290, 75], fill=(10, 20, 35, 200), outline=(0, 180, 255, 180), width=1)
        draw.text((32, 28), "AERIS-TWIN DIGITAL TWIN", fill=(0, 240, 255, 255))
        draw.text((32, 48), f"ROTAX 915 iS • RPM: {rpm_val}", fill=(255, 255, 255, 255))
        
        # Bottom-right live status
        draw.rectangle([target_w - 270, target_h - 60, target_w - 20, target_h - 20],
                       fill=(10, 20, 35, 200), outline=(0, 255, 128, 180), width=1)
        status_dot_col = (0, 255, 128, 255) if f % 20 < 14 else (0, 100, 50, 255)
        draw.ellipse([target_w - 256, target_h - 45, target_w - 244, target_h - 33], fill=status_dot_col)
        draw.text((target_w - 235, target_h - 46), f"CHT: {cht_val}°C | {fps_cadence}", fill=(255, 255, 255, 240))
        
        frame_path = os.path.join(temp_dir, f"frame_{f:04d}.png")
        frame.save(frame_path)
        
    out_video = r"d:\sih ppt\Digital_Twin\public\assets\video_engine_twin.mp4"
    ffmpeg_cmd = [
        "ffmpeg", "-y", "-framerate", str(fps),
        "-i", os.path.join(temp_dir, "frame_%04d.png"),
        "-c:v", "libx264", "-pix_fmt", "yuv420p",
        "-crf", "19", "-preset", "fast", "-movflags", "+faststart",
        out_video
    ]
    subprocess.run(ffmpeg_cmd, check=True)
    shutil.rmtree(temp_dir)
    print(f"Engine video successfully created at {out_video}")

def make_uav_mission_video():
    print("Generating UAV Mission Motion Video...")
    src_img_path = r"C:\Users\manav\.gemini\antigravity-ide\brain\722ca0eb-bec6-4f3b-8282-7d3f2a30a765\male_uav_mission_hud_1790680255950.jpg"
    base_img = Image.open(src_img_path).convert('RGB')
    
    # Target resolution: 720 x 720 (Square 1:1)
    target_w, target_h = 720, 720
    fps = 30
    duration_sec = 6
    total_frames = fps * duration_sec
    
    temp_dir = "temp_uav_frames"
    os.makedirs(temp_dir, exist_ok=True)
    
    # Square crop center
    sw, sh = base_img.size
    min_dim = min(sw, sh)
    base_cropped = base_img.crop(((sw - min_dim) // 2, (sh - min_dim) // 2, (sw + min_dim) // 2, (sh + min_dim) // 2))
    cw, ch = base_cropped.size
    
    for f in range(total_frames):
        t = f / total_frames
        # Smooth camera breathing zoom (1.0 to 1.06)
        zoom = 1.0 + 0.06 * (0.5 - 0.5 * math.cos(2 * math.pi * t))
        
        crop_dim = int(cw / zoom)
        center_x = int(cw * 0.50)
        center_y = int(ch * 0.48)
        left = max(0, min(cw - crop_dim, center_x - crop_dim // 2))
        top = max(0, min(ch - crop_dim, center_y - crop_dim // 2))
        
        frame = base_cropped.crop((left, top, left + crop_dim, top + crop_dim)).resize((target_w, target_h), Image.Resampling.LANCZOS)
        draw = ImageDraw.Draw(frame, 'RGBA')
        
        # 1. Rotating / sweeping radar line across grid area (bottom-right)
        radar_cx, radar_cy = int(target_w * 0.65), int(target_h * 0.62)
        radar_ang = t * 2 * math.pi
        radar_len = int(target_w * 0.28)
        rx = int(radar_cx + radar_len * math.cos(radar_ang))
        ry = int(radar_cy + radar_len * math.sin(radar_ang))
        draw.line([(radar_cx, radar_cy), (rx, ry)], fill=(0, 240, 255, 200), width=2)
        
        # Radar beam cone gradient
        for step in range(1, 12):
            step_ang = radar_ang - step * 0.05
            sx = int(radar_cx + radar_len * math.cos(step_ang))
            sy = int(radar_cy + radar_len * math.sin(step_ang))
            beam_alpha = int(140 / step)
            draw.line([(radar_cx, radar_cy), (sx, sy)], fill=(0, 200, 255, beam_alpha), width=2)
            
        # 2. Pulsing target waypoint box
        tgt_x, tgt_y = int(target_w * 0.58), int(target_h * 0.81)
        pulse = 0.5 + 0.5 * math.sin(t * 6 * math.pi)
        box_pad = int(14 + 4 * pulse)
        box_alpha = int(160 + 95 * pulse)
        # Target corner reticle
        draw.line([(tgt_x - box_pad, tgt_y - box_pad), (tgt_x - box_pad + 8, tgt_y - box_pad)], fill=(0, 255, 180, box_alpha), width=2)
        draw.line([(tgt_x - box_pad, tgt_y - box_pad), (tgt_x - box_pad, tgt_y - box_pad + 8)], fill=(0, 255, 180, box_alpha), width=2)
        draw.line([(tgt_x + box_pad, tgt_y - box_pad), (tgt_x + box_pad - 8, tgt_y - box_pad)], fill=(0, 255, 180, box_alpha), width=2)
        draw.line([(tgt_x + box_pad, tgt_y - box_pad), (tgt_x + box_pad, tgt_y - box_pad + 8)], fill=(0, 255, 180, box_alpha), width=2)
        draw.line([(tgt_x - box_pad, tgt_y + box_pad), (tgt_x - box_pad + 8, tgt_y + box_pad)], fill=(0, 255, 180, box_alpha), width=2)
        draw.line([(tgt_x - box_pad, tgt_y + box_pad), (tgt_x - box_pad, tgt_y + box_pad - 8)], fill=(0, 255, 180, box_alpha), width=2)
        draw.line([(tgt_x + box_pad, tgt_y + box_pad), (tgt_x + box_pad - 8, tgt_y + box_pad)], fill=(0, 255, 180, box_alpha), width=2)
        draw.line([(tgt_x + box_pad, tgt_y + box_pad), (tgt_x + box_pad, tgt_y + box_pad - 8)], fill=(0, 255, 180, box_alpha), width=2)
        
        # 3. Dynamic Flight HUD Updates
        spd_val = int(180 + 3 * math.sin(t * 4 * math.pi))
        alt_val = int(28500 - 30 * t)
        
        # Top-right live telemetry badge
        draw.rectangle([target_w - 240, 20, target_w - 20, 68], fill=(10, 20, 35, 200), outline=(0, 180, 255, 180), width=1)
        draw.text((target_w - 225, 28), f"AIRSPEED: {spd_val} KTS", fill=(255, 255, 255, 255))
        draw.text((target_w - 225, 46), f"ALT: {alt_val:,} FT | Q50 RUL", fill=(0, 240, 255, 255))
        
        # Bottom-left Mission badge
        draw.rectangle([20, target_h - 55, 240, target_h - 20], fill=(10, 20, 35, 200), outline=(0, 255, 128, 180), width=1)
        rec_dot = (255, 60, 60, 255) if f % 24 < 16 else (100, 20, 20, 255)
        draw.ellipse([30, target_h - 43, 40, target_h - 33], fill=rec_dot)
        draw.text((48, target_h - 44), "MISSION SORTIE ACTIVE", fill=(255, 255, 255, 240))
        
        frame_path = os.path.join(temp_dir, f"frame_{f:04d}.png")
        frame.save(frame_path)
        
    out_video = r"d:\sih ppt\Digital_Twin\public\assets\video_uav_mission.mp4"
    ffmpeg_cmd = [
        "ffmpeg", "-y", "-framerate", str(fps),
        "-i", os.path.join(temp_dir, "frame_%04d.png"),
        "-c:v", "libx264", "-pix_fmt", "yuv420p",
        "-crf", "19", "-preset", "fast", "-movflags", "+faststart",
        out_video
    ]
    subprocess.run(ffmpeg_cmd, check=True)
    shutil.rmtree(temp_dir)
    print(f"UAV mission video successfully created at {out_video}")

if __name__ == '__main__':
    make_engine_video()
    make_uav_mission_video()
    print("All motion videos successfully generated!")
