@echo off
node build-all.js
git add .
git commit -m "auto build"
git push
echo 部署完成！
pause