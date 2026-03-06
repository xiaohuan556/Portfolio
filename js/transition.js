// 通用渲染函数：根据分类过滤并生成 HTML
function generateFeedHtml(categoryName, pageTitle) {
    // 客观逻辑：从总库里滤出属于当前页面的视频
    const filteredItems = projectData.works.filter(item => item.category === categoryName);
    
    // 如果该分类下没视频，显示个提示（防止页面空白太尴尬）
    const contentHtml = filteredItems.length > 0 
        ? filteredItems.map(item => `
            <section class="feed-item" id="${item.id}">
                <div class="video-container">
                    <div class="video-wrapper" onclick="toggleVideoFullscreen(this)">
                        <video class="lazy-video" loop muted playsinline data-src="${item.videoUrl}"></video>
                        <div class="video-overlay">
                            <div class="play-hint"><p>点击全屏播放（含音频）</p></div>
                        </div>
                    </div>
                </div>
                <div class="project-info-simple">
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                </div>
            </section>
        `).join('')
        : `<div style="text-align:center; padding:100px; opacity:0.3;">DATA_NULL // 暂无归档内容</div>`;

    return `
        <div class="page-secondary vertical-feed">
            <div class="sub-nav-simple">
                <button class="btn-back-plain" onclick="backToHome()">← 返回</button>
            </div>
            <div class="feed-container">
                <header class="feed-header-simple">
                    <h1 class="main-title-simple">${pageTitle}</h1>
                </header>
                ${contentHtml}
                <footer class="feed-footer"><p>— ${pageTitle} 档案底部 —</p></footer>
            </div>
        </div>
    `;
}


const pageTemplates = {
    works: generateFeedHtml('works', '精选案例'),
    cinematic: generateFeedHtml('cinematic', '动态创意'),
    commercial: generateFeedHtml('commercial', '投放实效'),
    about: `
   <div class="page-secondary resume-root">
        <div class="system-selection-trigger" id="whyMeBtn">
            <span class="scan-line"></span>
            <span class="btn-text">WHY_CHOOSE_ME // 为什么选择我?</span>
        </div>

        <div id="whyMePanel" class="selection-panel">
            <div class="panel-header">CORE_VALUE_REPORT // 核心人才价值报告</div>
            <div class="panel-content">
                <div class="why-me-item">
                    <span class="item-id">01</span>
                    <div class="item-body">
                        <h4>商业级产品思维 (PM Mindset)</h4>
                        <p>拒绝“自嗨式”创作。我能深度拆解素材背后的转化逻辑，通过数据埋点反馈反推视频结构优化。在过往项目中，通过视觉心理学重构黄金3秒，实现核心功能 CVR 暴增 150%，将视觉直接转化为商业产出。</p>
                    </div>
                </div>
                <div class="why-me-item">
                    <span class="item-id">02</span>
                    <div class="item-body">
                        <h4>工业化效率专家 (Efficiency Guru)</h4>
                        <p>精通 JS 自动化流与三维管线整合。我不仅是使用者，更是工具开发者。自研一键式资源整合与多维度动态报表生成系统，将团队传统耗时 4 小时的周报月报等数据表格缩短至 5 分钟，实现生产力 300% 的阶跃式提升。</p>
                    </div>
                </div>
                <div class="why-me-item">
                    <span class="item-id">03</span>
                    <div class="item-body">
                        <h4>AIGC 落地先锋 (AI Strategist)</h4>
                        <p>具备 700万播放级 AI 内容实战背书，深刻理解 AI 音乐、视觉、语言模型的边界。我能为公司构建一套“零版权、高并发、极速出片”的内容生产库，实现单人产出量释放 300% 以上。   </p>
                    </div>
                </div>
                <div class="why-me-item">
                    <span class="item-id">04</span>
                    <div class="item-body">
                        <h4>全栈技术壁垒 (Full-Stack Vision)</h4>
                        <p>打破设计与研发的沟通黑盒。具备小程序与 个人简历网站独立开发经验，在视频设计上我拥有全逻辑视野，可以从数据反馈上提供产品内容的优化建议，以及对全团队视频逻辑整合，帮助团队生产更出色的视频</p>
                    </div>
                </div>
                <div class="why-me-item">
                    <span class="item-id">05</span>
                    <div class="item-body">
                        <h4>精英级职业素养 (Extreme Discipline)</h4>
                        <p>NSCA-CPT 国际认证与 8% 体脂代表的不只是身材，更是近乎苛刻的自我管理能力。这种极致的自律被我带入工作交付中：在亿级流量的高压环境下，始终保持 0 偏差、高质量、高并发的卓越产出状态。</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="resume-nav-top">
            <button class="btn-back-plain" onclick="backToHome()">← 返回系统</button>
        </div>

        <div class="resume-scroll-container">
            <header class="resume-header">
                <h1 class="expert-name">郭欢</h1>
                <div class="header-info">
                    <div class="expert-title-wrap">
                        <span class="expert-title">资深海外视觉技术专家</span>
                        <span class="expert-en">SENIOR VISUAL TECH EXPERT</span>
                    </div>
                    <div class="expert-tags">
                        <span>字节背景</span>
                        <span>全球榜单TOP 1</span>
                        <span>AI+3D工作流</span>
                        <span>全栈开发</span>
                        <span>NSCA-CPT认证</span>
                        <span>体脂8%极致自律</span>
                    </div>
                </div>
            </header>

            <section class="resume-section">
                <h2 class="section-label">// 核心战绩与全能特质 CORE_IMPACT</h2>
                <div class="impact-grid">
                    <div class="impact-card highlight">
                        <div class="card-head">全球榜单统治力</div>
                        <p>产品稳居 iOS & Android 全球榜单第一。具备亿级流量视觉处理经验，爆款产出量蝉联组内第一。</p>
                    </div>
                    <div class="impact-card">
                        <div class="card-head">全栈技术储备</div>
                        <p>独立搭建 3D 交互求职网站及自研小程序。利用代码手段解决视觉痛点，实现技术与艺术深度耦合。</p>
                    </div>
                    <div class="impact-card">
                        <div class="card-head">AI 工业级提效</div>
                        <p>深度实操 AIGC 管线。自研 JS 自动化工作流，单人生产力释放 300%，实现数据报告秒级流转。</p>
                    </div>
                    <div class="impact-card">
                        <div class="card-head">3D 视觉压制力</div>
                        <p>熟练运用 C4D/Blender 辅助产出。通过空间建模重构视觉感官，使产品核心功能 CVR 暴增 150%。</p>
                    </div>
                    <div class="impact-card highlight">
                        <div class="card-head">极致自律交付</div>
                        <p>持有 NSCA-CPT 国际认证，体脂 8%。将运动员级别的自律转化为高压环境下零偏差、高质量的交付。</p>
                    </div>
                    <div class="impact-card">
                        <div class="card-head">36个月长效跑量</div>
                        <p>产出素材跑量周期超 36 个月。在行业素材寿命仅 1-2 周的现状下，展现极强的原创生命力。</p>
                    </div>
                </div>
            </section>

            <section class="resume-section">
                <h2 class="section-label">// 职业档案 EXPERIENCE</h2>
                <div class="exp-box">
                    <div class="exp-header">
                        <h3>Kika Tech | 资深专家</h3>
                        <span class="exp-date">2022.07 - 至今</span>
                    </div>
                    <ul class="exp-list">
                        <li>主导全球榜单 TOP 1 产品视觉。通过 3D 与 AI 技术重构产品卖点，提升转化率 150%。</li>
                        <li>自研脚本库提升团队协作效率 50% 以上，实现视觉与数据的闭环复盘。</li>
                    </ul>
                </div>
                <div class="exp-box">
                    <div class="exp-header">
                        <h3>ByteDance | 视觉设计</h3>
                        <span class="exp-date">2020.11 - 2021.06</span>
                    </div>
                    <ul class="exp-list">
                        <li>深度参与教育业务核心线素材制作。优化“黄金 3 秒”视觉钩子，显著提升素材完播率。</li>
                    </ul>
                </div>
            </section>

            <footer class="resume-footer">
                <a href="assets/郭欢_简历.pdf" target="_blank" class="pdf-btn">下载完整简历 (PDF)</a>
                <div class="footer-meta">西安 / 5年经验 / gh132746@gmail.com / 微信: gh132746</div>
            </footer>
        </div>
    </div>
`
};
/**
 * 转场核心控制器 (保持不变)
 */
const Transitioner = {
    isAnimating: false,
    async animateTo(pageKey) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        document.body.classList.add('is-transitioning');
        
        const canvas = document.getElementById('canvas-webgl');
        if(canvas) canvas.classList.add('bg-blur');

        await new Promise(resolve => setTimeout(resolve, 800));

        const anchor = document.getElementById('content-anchor');
       // 在 Transitioner.animateTo 内部
if (anchor && pageTemplates[pageKey]) {
    anchor.innerHTML = (pageKey === 'about') 
        ? pageTemplates.about 
        : generateFeedHtml(pageKey, getDisplayTitle(pageKey));
    
    // 渲染后立即绑定
    if (pageKey === 'about') {
        const btn = document.getElementById('whyMeBtn');
        const panel = document.getElementById('whyMePanel');    
        const root = document.querySelector('.resume-root'); // 获取根容器
        if (btn && panel && root) {
            btn.onclick = (e) => {
                const isVisible = panel.style.display === 'block';
                if (!isVisible) {
                    // --- 展开状态 ---
                    panel.style.display = 'block';
                    panel.classList.add('active-mobile'); // 手机端适配类
                    root.classList.add('panel-active');   // 【激活模糊效果】
                    btn.innerHTML = 'CLOSE // 关闭报告';
                } else {
                    // --- 收起状态 ---
                    panel.style.display = 'none';
                    panel.classList.remove('active-mobile');
                    root.classList.remove('panel-active'); // 【移除模糊效果】
                    btn.innerHTML = 'WHY_CHOOSE_ME // 为什么选择我?';
                }
                e.stopPropagation();
            };
            // 点击外部自动收起（增加体验感）
            document.addEventListener('click', (e) => {
                if (panel.style.display === 'block' && !panel.contains(e.target) && e.target !== btn) {
                    panel.style.display = 'none';
                    panel.classList.remove('active-mobile');
                    root.classList.remove('panel-active');
                    btn.innerHTML = 'WHY_CHOOSE_ME // 为什么选择我?';
                }
            }, { once: false });
        }
    }
}

        setTimeout(() => {
            document.body.classList.remove('is-transitioning');
            document.body.classList.add('in-subpage');
            this.isAnimating = false;
        }, 300);
    },

    // 新增：专门处理简历页按钮点击的方法
    initWhyMeLogic() {
        const btn = document.getElementById('whyMeBtn');
        const panel = document.getElementById('whyMePanel');
        
        if (btn && panel) {
            btn.onclick = (e) => {
                const isShow = panel.classList.contains('active');
                if (isShow) {
                    panel.classList.remove('active');
                    btn.innerHTML = 'WHY<br>ME?';
                } else {
                    panel.classList.add('active');
                    btn.innerHTML = 'CLOSE';
                }
                e.stopPropagation();
            };

           
        }
    }
};  

/**
 * 视频流懒加载核心监听逻辑 (保持不变)
 */
function initLazyVideos() {
    console.log("System: Syncing Video Streams...");
    const observerOptions = { 
        threshold: 0.3, 
        rootMargin: "0px 0px 200px 0px" 
    };

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                if (!video.src) {
                    video.src = video.dataset.src;
                    video.load();
                }
                video.play().then(() => {
                    video.style.opacity = "1"; 
                }).catch(() => {});
                video.parentElement.classList.add('is-playing');
            } else {
                video.pause();
                video.parentElement.classList.remove('is-playing');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.lazy-video').forEach(v => videoObserver.observe(v));
}

// 统一接口 (保持不变)
function loadPage(key) { Transitioner.animateTo(key); }

/**
 * 返回首页逻辑 (保持不变)
 */
async function backToHome() {
    if (Transitioner.isAnimating) return;
    Transitioner.isAnimating = true;
    document.body.classList.add('is-transitioning');
    await new Promise(r => setTimeout(r, 800));
    const anchor = document.getElementById('content-anchor');
    if (window.initialHomeHTML) { anchor.innerHTML = window.initialHomeHTML; }
    document.body.classList.remove('in-subpage');
    const canvas = document.getElementById('canvas-webgl');
    if(canvas) canvas.classList.remove('bg-blur');
    window.scrollTo(0, 0);
    setTimeout(() => {
        document.body.classList.remove('is-transitioning');
        Transitioner.isAnimating = false;
    }, 300);
    // 关键补丁：销毁二级页面的视频资源
    const videos = document.querySelectorAll('video');
    videos.forEach(v => {
        v.pause();
        v.src = ""; // 清空地址
        v.load();   // 强制释放内存
        v.remove(); // 从 DOM 删除
    });
}

// 在页面初始化时存一份首页 HTML 备份 (保持不变)
document.addEventListener('DOMContentLoaded', () => {
    window.initialHomeHTML = document.getElementById('content-anchor').innerHTML;
});

/**
 * 修正版：点击 Wrapper 进入全屏，全屏下点击 Wrapper 退出
 */
window.toggleVideoFullscreen = function(wrapper) {
    const video = wrapper.querySelector('video');
    if (!video) return;

    // 1. 懒加载补丁
    if (!video.src && video.dataset.src) {
        video.src = video.dataset.src;
        video.load();
    }
    video.style.opacity = "1";

    // 2. 判断全屏状态
    const isFullscreen = document.fullscreenElement || 
                         document.webkitFullscreenElement;

    if (!isFullscreen) {
        // --- 进入全屏 ---
        // 注意：这里是对 wrapper 调用全屏，确保点击事件能持续生效
        const requestFS = wrapper.requestFullscreen || wrapper.webkitRequestFullscreen;
        
        if (requestFS) {
            requestFS.call(wrapper).then(() => {
                video.muted = false; // 进入后开声
                video.play();
            });
        } else if (video.webkitEnterFullscreen) {
            // 特殊情况：iOS 真机 Safari 不支持 div 全屏，只能视频全屏
            // 这种情况下只能靠系统自带的“完成”按钮退出
            video.webkitEnterFullscreen();
            video.muted = false;
        }
    } else {
        // --- 退出全屏 ---
        const exitFS = document.exitFullscreen || document.webkitExitFullscreen;
        if (exitFS) {
            exitFS.call(document);
        }
    }
};

// 退出全屏时自动静音保护
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        document.querySelectorAll('video').forEach(v => v.muted = true);
    }
});
function getDisplayTitle(key) {
    const titles = { works: '精选案例', cinematic: '动态创意', commercial: '投放实效' };
    return titles[key] || '作品详情';
}


/* =========================================================
   VIDEO FIRST FRAME SYSTEM (non-intrusive enhancement)
   Loads metadata so the first frame appears without autoplay.
   Does NOT modify existing fullscreen or click logic.
   ========================================================= */

function initVideoFirstFrame(){
    const videos = document.querySelectorAll(".lazy-video");
    videos.forEach(video=>{
        if(!video.src && video.dataset && video.dataset.src){
            video.preload = "metadata";
            video.src = video.dataset.src;
            video.load();

            video.addEventListener("loadeddata",()=>{
                try{
                    video.currentTime = 0.01;
                }catch(e){}
                video.style.opacity = 1;
            },{once:true});
        }
    });
}


function observeVideoInjection(){
    const observer = new MutationObserver(()=>{
        initVideoFirstFrame();
    });

    observer.observe(document.body,{
        childList:true,
        subtree:true
    });
}


document.addEventListener("DOMContentLoaded",()=>{
    initVideoFirstFrame();
    observeVideoInjection();
});


// Lazy load logic for videos when they enter the viewport
const lazyLoadVideos = () => {
    const lazyVideos = document.querySelectorAll('video.lazy-load');
    
    const loadVideo = (video) => {
        const videoSrc = video.getAttribute('data-src');
        video.setAttribute('src', videoSrc);
        video.classList.remove('lazy-load'); // Optionally remove the lazy-load class once video is loaded
    };

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.25
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadVideo(entry.target);
                observer.unobserve(entry.target); // Stop observing after video has been loaded
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    lazyVideos.forEach(video => {
        observer.observe(video);
    });
};

// Call lazy load function after the page is ready or videos are rendered
document.addEventListener("DOMContentLoaded", () => {
    lazyLoadVideos();
});
