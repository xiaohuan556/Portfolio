@echo off
echo 🚀 [Step 1/3] 正在生成项目索引 (Running build.js)...
node build.js

echo.
echo 📦 [Step 2/3] 正在提交更改到本地 Git (Git Add & Commit)...
git add .
git commit -m "site update: %date% %time%"

echo.
echo ☁️ [Step 3/3] 正在推送至 GitHub Pages (Git Push)...
git push -f

echo.
echo ✅ [FINISH] 作品集已更新！请等待 1-2 分钟查看 guohuan.xyz
pause