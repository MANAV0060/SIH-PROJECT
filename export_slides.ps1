try {
    $ppt = New-Object -ComObject PowerPoint.Application
    $pres = $ppt.Presentations.Open('d:\sih ppt\AERIS_TWIN_SIH2026_Final_Submission.pptx', [Microsoft.Office.Core.MsoTriState]::msoFalse, [Microsoft.Office.Core.MsoTriState]::msoFalse, [Microsoft.Office.Core.MsoTriState]::msoFalse)
    New-Item -ItemType Directory -Force -Path 'd:\sih ppt\final_slide_exports' | Out-Null
    $i = 1
    foreach ($slide in $pres.Slides) {
        $slide.Export("d:\sih ppt\final_slide_exports\slide_$i.png", 'PNG', 1920, 1080)
        $i++
    }
    $pres.Close()
    $ppt.Quit()
    Write-Output "Exported slides successfully with PowerPoint COM"
} catch {
    Write-Output "PowerPoint COM error: $_"
}
