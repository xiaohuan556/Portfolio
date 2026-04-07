@echo off
setlocal enabledelayedexpansion

echo 开始批量压缩 MP4 视频...
for %%f in (*.mp4) do (
    echo 正在处理: %%f
    ffmpeg -i "%%f" -c:v libx264 -crf 23 -preset fast -vf "scale=720:-2" -c:a aac -b:a 96k -movflags +faststart "temp_%%f"
    if !errorlevel! equ 0 (
        move /y "temp_%%f" "%%f" >nul
        echo 完成: %%f
    ) else (
        echo 失败: %%f
        del "temp_%%f" 2>nul
    )
)
echo 全部处理完成！
pause