const fs = require('fs');
const path = require('path');

const videoDir = path.join(__dirname, 'assets/videos');
const outputFile = path.join(__dirname, 'js/projects.js');

// 读取视频并按 01, 02 这种数字编号排序
const files = fs.readdirSync(videoDir)
    .filter(f => f.endsWith('.mp4'))
    .sort((a, b) => a.localeCompare(b, undefined, {numeric: true}));

const projects = files.map(file => {
    const parts = file.split('__');
    
    // 逻辑：编号__分类__标题__描述
    const category = parts[1] || 'works'; // 如果没写分类，默认归到 works
    const title = parts[2] || '未命名作品';
    const desc = (parts[3] || '').replace('.mp4', '');

    return {
        // 【核心】encodeURIComponent 保证中文路径在 GitHub 上不报 404
        videoUrl: `assets/videos/${encodeURIComponent(file)}`,
        category: category,
        title: title,
        desc: desc
    };
});

const content = `const projects = ${JSON.stringify(projects, null, 2)};`;
fs.writeFileSync(outputFile, content);

console.log(`✅ 同步成功！当前分类包含: ${[...new Set(projects.map(p => p.category))].join(', ')}`);