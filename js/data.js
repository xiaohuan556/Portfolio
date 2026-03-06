// js/data.js
const projectData = {
    works: [
        {
            id: "case01",
            category: "works", // 对应“精选案例”
            title: "项目_01 // 创意广告方案",
            desc: "实现了全局市场策略的精准打击，ROI 提升至 4.8。",
            videoUrl: "assets/videos/case01.mp4"
        },
        {
            id: "case02",
            category: "cinematic", // 对应“动态创意”
            title: "动态_01 // 粒子流体特效",
            desc: "基于 WebGL 的实时流体渲染，用于品牌发布会背景。",
            videoUrl: "assets/videos/case02.mp4"
        },
        {
            id: "case03",
            category: "commercial", // 对应“投放实效”
            title: "投放_01 // 某电商 618 大促",
            desc: "全渠道投放素材，点击率同比提升 120%。",
            videoUrl: "assets/videos/case03.mp4"
        }
    ]
};
// js/data.js 增加简历数据
const resumeData = {
    name: "郭欢 / GUO HUAN",
    title: "资深海外视觉技术专家",
    tags: ["字节背景", "爆款视频专家", "AI+工作流研发"],
    impact: [
        { label: "业务统治力", desc: "视频爆款产出量长期蝉联组内第一" },
        { label: "增长奇迹", desc: "重构视觉链路使产品转化率增长 400%" },
        { label: "技术压制", desc: "自研 JS 自动化工作流，提效 300%" }
    ],
    experience: [
        {
            time: "2022.07 - 至今",
            co: "Kika Tech | 资深海外视觉专家",
            detail: "主导海外 Meme 热点预判及 AIGC 视频生产管线落地。"
        },
        {
            time: "2020.12 - 2022.07",
            co: "字节跳动 (ByteDance) | 视觉设计师",
            detail: "负责核心产品线视觉产出，达成极致跑量目标。"
        }
    ],
    contact: {
        email: "gh132746@gmail.com",
        wechat: "gh132746",
        pdfUrl: "assets/郭欢_简历.pdf" // 记得把PDF改名放进assets
    }
};
// 增加“为什么选择我”专项数据
const whyChooseMeData = {
    title: "为什么选择我？/ Why Choose Me?",
    subtitle: "产品思维 + 技术自动化 + AIGC 实战验证",
    corePoints: [
        {
            tag: "产品思维",
            content: "以 PM 逻辑拆解爆点，通过数据反馈驱动内容迭代，实现转化率 400% 的增长奇迹。"
        },
        {
            tag: "技术提效",
            content: "精通 JS 自动化流，整合资源并一键生成周/月报，消除 300% 的冗余人工劳动。"
        },
        {
            tag: "AI 专家",
            content: "700万播放级 AI 音频经验，为公司提供免版权、极速出片的 BGM 工业化方案。"
        },
        {
            tag: "全栈能力",
            content: "具备小程序开发经验，思维活跃且学习能力极强，能迅速将新技术转化为业务产出。"
        }
    ]
};