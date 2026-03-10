const fs = require('fs');
const path = require('path');

const videoDir = path.join(__dirname, 'assets/videos');
const outputFile = path.join(__dirname, 'js/projects.js');

// 1. 读取所有视频并进行自然排序（01, 02...）
const files = fs.readdirSync(videoDir)
    .filter(f => f.endsWith('.mp4'))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

// 2. 初始化分类对象（必须匹配你 HTML 里的 works, cinematic, commercial）
const projectData = {
    works: [],
    cinematic: [],
    commercial: []
};

// 3. 解析文件名并填入对应分类
files.forEach(file => {
    const parts = file.split('__');
    
    // 结构：编号__分类__标题__描述
    // 强制转小写防止意外，如果没分类默认丢进 works
    const category = (parts[1] || 'works').toLowerCase(); 
    const title = parts[2] || '未命名作品';
    const desc = (parts[3] || '').replace('.mp4', '');

    const item = {
        // 使用 encodeURIComponent 彻底解决 GitHub 中文 404 问题
        videoUrl: `assets/videos/${encodeURIComponent(file)}`,
        title: title,
        desc: desc
    };

    // 如果文件名里的分类在我们的字典里，就塞进去
    if (projectData.hasOwnProperty(category)) {
        projectData[category].push(item);
    } else {
        // 如果你写了新的分类（如 motion），这里会自动创建一个
        projectData[category] = [item];
    }
});

// 4. 导出为网页 transition.js 正在寻找的变量名：projectData
const content = `const projectData = ${JSON.stringify(projectData, null, 2)};`;

try {
    fs.writeFileSync(outputFile, content);
    console.log('🚀 [Build Success]');
    console.log('已自动归类：', Object.keys(projectData).map(k => `${k}(${projectData[k].length})`).join(' | '));
} catch (err) {
    console.error('❌ 写入失败:', err);
}