const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

// 配置路径
const excelPath = path.join(__dirname, '作品集管理.xlsx');
const videoDir = path.join(__dirname, 'assets/videos');
const metaFile = path.join(videoDir, 'meta.json');
const outputFile = path.join(__dirname, 'js/projects.js');

// 读取 Excel
if (!fs.existsSync(excelPath)) {
    console.error('❌ 找不到 Excel 文件:', excelPath);
    process.exit(1);
}

const workbook = XLSX.readFile(excelPath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const rows = XLSX.utils.sheet_to_json(sheet);

// 存储 meta 和分类数据
const meta = {};
const projectData = {
    works: [],
    cinematic: [],
    commercial: []
};

// 有效的分类映射
const validCategories = ['works', 'cinematic', 'commercial'];

// 获取所有视频文件（用于检查是否存在）
let existingVideos = [];
if (fs.existsSync(videoDir)) {
    existingVideos = fs.readdirSync(videoDir).filter(f => f.endsWith('.mp4'));
} else {
    console.warn('⚠️ assets/videos 目录不存在，将只生成数据，不检查视频文件');
}

console.log(`📊 读取到 ${rows.length} 行数据\n`);

rows.forEach((row, index) => {
    const key = row['分类标识 (Key)'] || row['分类标识'] || row['Key'];
    const title = row['核心标题 (Title)'] || row['核心标题'] || row['Title'];
    const desc = row['专业描述 (Description)'] || row['专业描述'] || row['Description'];

    if (!key || !title) {
        console.warn(`⚠️ 第 ${index + 2} 行缺少必要字段，跳过`);
        return;
    }

    // 解析分类：从 key 中提取，如 "01__works" -> "works"
    const parts = key.split('__');
    let category = parts[1] ? parts[1].toLowerCase() : null;
    
    if (!category || !validCategories.includes(category)) {
        console.warn(`⚠️ 无效的分类标识: ${key}，跳过`);
        return;
    }

    // 存入 meta
    meta[key] = { title, desc };

    // 检查视频文件是否存在
    const videoFileName = `${key}.mp4`;
    const videoExists = existingVideos.includes(videoFileName);
    if (!videoExists) {
        console.warn(`⚠️ 视频文件不存在: ${videoFileName}，请在 assets/videos/ 中添加`);
    }

    // 存入 projectData
    projectData[category].push({
        videoUrl: `assets/videos/${encodeURIComponent(videoFileName)}`,
        title: title,
        desc: desc
    });
});

// 写入 meta.json
if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
}
fs.writeFileSync(metaFile, JSON.stringify(meta, null, 2));
console.log(`\n📝 meta.json 已生成，共 ${Object.keys(meta).length} 条记录`);

// 写入 projects.js
const projectsContent = `const projectData = ${JSON.stringify(projectData, null, 2)};`;
fs.writeFileSync(outputFile, projectsContent);
console.log(`✅ projects.js 已生成`);

// 打印统计
console.log('\n📊 分类统计：');
Object.keys(projectData).forEach(cat => {
    console.log(`   ${cat}: ${projectData[cat].length} 个作品`);
});

console.log('\n🎉 构建完成！');