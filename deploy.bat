@echo off
:: 设置编码为 UTF-8 解决乱码
chcp 65001 >nul

echo ------------------------------------------
echo 🚀 [Step 1] 正在生成项目索引 (Running build.js)
node build.js

echo.
echo 📦 [Step 2] 正在提交更改 (Git Add and Commit)
git add .
:: 简化提交备注，避免符号引起报错
git commit -m "site_update_%date%_%time%"

echo.
echo ☁️ [Step 3] 正在推送至 GitHub (Git Push)
git push -f

echo.
echo ✅ [FINISH] 更新完成！请等待 1 分钟后访问 guohuan.xyz
echo ------------------------------------------
pause