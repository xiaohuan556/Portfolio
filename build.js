const fs = require('fs');
const path = require('path');

// 设置路径：视频来源和数据去向
const videoDir = path.join(__dirname, 'assets/videos'); 
const outputFile = path.join(__dirname, 'js/projects.js'); 

// 初始化分类
const projectData = { works: [], cinematic: [], commercial: [] };

try {
    // 1. 扫描文件夹里的 mp4
    const files = fs.readdirSync(videoDir).filter(f => f.endsWith('.mp4'));
    
    files.forEach(file => {
        // 2. 按照“分类_序号_标题_描述.mp4”拆分文件名
        const [category, id, title, desc] = file.replace('.mp4', '').split('_');
        
        if (projectData[category]) {
            projectData[category].push({
                id: id || "case",
                category: category,
                title: title ? title.replace(/-/g, ' ') : "未命名项目",
                desc: desc ? desc.replace(/-/g, ' ') : "",
                videoUrl: `assets/videos/${file}`
            });
        }
    });

    // 3. 写入 js/projects.js
    const content = `// 自动生成文件，请勿手动修改\nconst projectData = ${JSON.stringify(projectData, null, 4)};`;
    fs.writeFileSync(outputFile, content, 'utf-8');
    
    console.log(`✅ 成功！已自动识别并归类 ${files.length} 个作品。`);
} catch (e) {
    console.error("❌ 出错了，请确保 assets/videos 文件夹存在。");
}