import win32com.client
import os

ppt_path = os.path.abspath("SIH26053_LiDAR_Mapping_Master_Submission.pptx")
out_dir = os.path.abspath("slide_previews")
os.makedirs(out_dir, exist_ok=True)

ppt = win32com.client.Dispatch("PowerPoint.Application")
try:
    prs = ppt.Presentations.Open(ppt_path, WithWindow=False)
    for i in range(1, len(prs.Slides) + 1):
        out_file = os.path.join(out_dir, f"slide_{i}.png")
        prs.Slides(i).Export(out_file, "PNG", 1920, 1080)
        print(f"Exported Slide {i} -> {out_file}")
    prs.Close()
finally:
    ppt.Quit()
print("All slides exported successfully.")
