const fs = require('fs');
const path = require('path');

const videoDir = path.join(__dirname, 'assets/videos');
const metaFile = path.join(videoDir, 'meta.json');
const outputFile = path.join(__dirname, 'js/projects.js');

// 读取现有 meta（如果存在）
let meta = {};
if (fs.existsSync(metaFile)) {
    try {
        meta = JSON.parse(fs.readFileSync(metaFile, 'utf8'));
        console.log('📖 已读取现有 meta.json');
    } catch(e) {
        console.log('⚠️ meta.json 解析失败，将创建新文件');
    }
}

// 获取所有视频文件
const files = fs.readdirSync(videoDir).filter(f => f.endsWith('.mp4'));

let metaChanged = false;
let renamedCount = 0;

console.log('📁 扫描到', files.length, '个视频文件\n');

files.forEach(oldName => {
    // 判断是否已经是短格式（如 01__works.mp4）
    const isShort = /^\d+__[a-z]+\.mp4$/.test(oldName);
    if (isShort) {
        console.log(`⏩ 跳过（已是短格式）: ${oldName}`);
        return;
    }

    // 长文件名：编号__分类__标题__描述.mp4
    const nameWithoutExt = oldName.replace('.mp4', '');
    const parts = nameWithoutExt.split('__');
    
    if (parts.length < 4) {
        console.log(`⚠️ 格式不正确，跳过: ${oldName}`);
        return;
    }

    const id = `${parts[0]}__${parts[1]}`;      // 例如 "01__works"
    const category = parts[1].toLowerCase();
    const title = parts[2];
    const desc = parts.slice(3).join('__');     // 描述可能包含 __

    // 更新 meta
    if (!meta[id]) {
        meta[id] = { title, desc };
        metaChanged = true;
        console.log(`📝 添加 meta: ${id}`);
    }

    // 重命名文件
    const newName = `${id}.mp4`;
    const oldPath = path.join(videoDir, oldName);
    const newPath = path.join(videoDir, newName);
    
    if (oldPath !== newPath) {
        fs.renameSync(oldPath, newPath);
        console.log(`✅ 重命名: ${oldName.substring(0, 50)}... → ${newName}`);
        renamedCount++;
    }
});

// 如果有新视频，保存 meta.json
if (metaChanged) {
    fs.writeFileSync(metaFile, JSON.stringify(meta, null, 2));
    console.log(`\n📝 meta.json 已保存（共 ${Object.keys(meta).length} 条记录）`);
}

console.log(`\n📊 重命名了 ${renamedCount} 个文件\n`);

// 读取所有短格式文件，生成 projects.js
const shortFiles = fs.readdirSync(videoDir)
    .filter(f => f.endsWith('.mp4') && /^\d+__[a-z]+\.mp4$/.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

const projectData = {
    works: [],
    cinematic: [],
    commercial: []
};

shortFiles.forEach(file => {
    const id = file.replace('.mp4', '');
    const parts = id.split('__');
    const category = parts[1].toLowerCase();
    const metaItem = meta[id] || { title: '未命名', desc: '' };

    projectData[category].push({
        videoUrl: `assets/videos/${encodeURIComponent(file)}`,
        title: metaItem.title,
        desc: metaItem.desc
    });
});

// 生成 projects.js
const content = `const projectData = ${JSON.stringify(projectData, null, 2)};`;
fs.writeFileSync(outputFile, content);

console.log('✅ projects.js 生成成功！');
console.log('📊 分类统计：', Object.keys(projectData).map(k => `${k}: ${projectData[k].length}`).join(', '));