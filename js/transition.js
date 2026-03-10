function generateFeedHtml(categoryKey) {
    // 1. 核心自动化修改：直接从 projectData 中按 key 取对应的数组
    // 比如传入 'works'，就取 projectData.works
    const data = (typeof projectData !== 'undefined') ? projectData : { works:[], cinematic:[], commercial:[] };
    const filteredItems = data[categoryKey] || [];

    
    const isMobile = window.innerWidth <= 768;

    // 2. 数据防御：如果没有数据，返回提示
    if (filteredItems.length === 0) {
        return `
            <div class="page-secondary">
                <div class="sub-nav-simple"><button class="btn-back-cyber" onclick="backToHome()">返回主站</button></div>
                <div style="color:var(--accent); text-align:center; margin-top:100px; font-family:monospace;">
                    DATA_NOT_FOUND // 暂无数据，请检查 build.js 运行情况
                </div>
            </div>`;
    }

    const contentHtml = filteredItems.map((item, index) => {
        // 电脑端结构
        if (!isMobile) {
            return `
                <section class="feed-item">
                    <div class="video-container">
                        <div class="video-wrapper" onclick="toggleVideoFullscreen(this)">
                            <video class="lazy-video" loop muted playsinline data-src="${item.videoUrl}"></video>
                        </div>
                    </div>
                    <div class="project-info-simple">
                        <h3>${item.title}</h3>
                        <p>${item.desc}</p>
                    </div>
                </section>
            `;
        } 
        // 手机端结构（维持你调试好的原样）
        else {
            return `
                <div class="system-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
                    <div class="video-container" onclick="toggleVideoFullscreen(this)">
                        <video class="lazy-video" loop muted playsinline data-src="${item.videoUrl}"></video>
                    </div>
                    <div class="project-info-simple">
                        <div class="index-tag">CASE_${(index + 1).toString().padStart(2, '0')}</div>
                        <h3>${item.title}</h3>
                        <p>${item.desc}</p>
                    </div>
                </div>
            `;
        }
    }).join('');

    const mobileControls = isMobile ? `
        <div class="system-controls-mobile">
            <button class="ctrl-btn" onclick="moveSlide(-1)">PREV</button>
            <div class="progress-info"><span id="current-idx">1</span> / ${filteredItems.length}</div>
            <button class="ctrl-btn" onclick="moveSlide(1)">NEXT</button>
        </div>
    ` : '';

    return `
        <div class="page-secondary ${isMobile ? 'virtual-scroll-system' : ''}">
            <div class="sub-nav-simple">
                <button class="btn-back-cyber" onclick="backToHome()">返回主站</button>
            </div>
            <div class="${isMobile ? 'slides-viewport' : 'resume-scroll-container'}">
                <div class="${isMobile ? '' : 'resume-content'}">
                    ${contentHtml}
                </div>
            </div>
            ${mobileControls}
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

    const isMobile = window.innerWidth <= 768; // 增加环境判断

    document.body.classList.add('is-transitioning');
    const canvas = document.getElementById('canvas-webgl');
    if(canvas) canvas.classList.add('bg-blur');

    await new Promise(resolve => setTimeout(resolve, 800));

    const anchor = document.getElementById('content-anchor');
    if (anchor && pageTemplates[pageKey]) {
        
        // --- 修改 1: 渲染内容 ---
        anchor.innerHTML = (pageKey === 'about') 
            ? pageTemplates.about 
            : generateFeedHtml(pageKey, getDisplayTitle(pageKey));
        
        // --- 修改 2: 逻辑初始化（增加 isMobile 判断） ---
       if (pageKey === 'about') {
    const btn = document.getElementById('whyMeBtn');
    const panel = document.getElementById('whyMePanel');    
    const root = document.querySelector('.resume-root');
    const isMobile = window.innerWidth <= 768; // 环境检查

    if (isMobile) {
        // --- 手机端补丁：彻底禁用干扰 ---
        if (btn) btn.style.display = 'none';
        if (panel) panel.style.display = 'none';
        
        // 关键一步：确保滚动容器是可交互且溢出滚动的
        const scrollBox = document.querySelector('.resume-scroll-container');
        if (scrollBox) {
            scrollBox.style.pointerEvents = 'auto'; // 恢复点击/滑动
            scrollBox.style.overflowY = 'auto';     // 开启滚动
            scrollBox.style.height = '100vh';       // 强制满屏高度
        }
        
        // 恢复 body 滚动，防止被之前的动画逻辑锁死
        document.body.style.overflow = 'auto';
    } 
    else if (btn && panel && root) {
        // --- 电脑端：维持原有的弹出报告逻辑 ---
        btn.onclick = (e) => {
            const isVisible = panel.style.display === 'block';
            if (!isVisible) {
                panel.style.display = 'block';
                root.classList.add('panel-active');
                btn.innerHTML = 'CLOSE // 关闭报告';
            } else {
                panel.style.display = 'none';
                root.classList.remove('panel-active');
                btn.innerHTML = 'WHY_CHOOSE_ME // 为什么选择我?';
            }
            e.stopPropagation();
        };

        document.addEventListener('click', (e) => {
            if (panel.style.display === 'block' && !panel.contains(e.target) && e.target !== btn) {
                panel.style.display = 'none';
                root.classList.remove('panel-active');
                btn.innerHTML = 'WHY_CHOOSE_ME // 为什么选择我?';
            }
        }, { once: false });
    }
}else {
    // 作品集页面逻辑
    if (typeof initVideoFirstFrame === 'function') {
        initVideoFirstFrame(); // 改用你新写的函数名
    }
    window.currentSlide = 0; 
}
    }

    setTimeout(() => {
        document.body.classList.remove('is-transitioning');
        document.body.classList.add('in-subpage');
        this.isAnimating = false;
        // --- 关键补丁：确保简历页加载后可以被触摸和滚动 ---
    const resumeContainer = document.querySelector('.resume-scroll-container');
    if (resumeContainer) {
        resumeContainer.style.pointerEvents = 'auto';
        resumeContainer.style.overflowY = 'auto';
        resumeContainer.style.webkitOverflowScrolling = 'touch';
    }
    }, 300);
},

    
};  


// 统一接口 (保持不变)
function loadPage(key) { Transitioner.animateTo(key); }

/**
 * 返回首页逻辑 (保持不变)
 */
async function backToHome() {
    document.body.classList.add('is-transitioning');
    
    // 只停止正在播放的视频，不要 remove 它们
    const videos = document.querySelectorAll('video');
    videos.forEach(v => {
        v.pause();
        // v.remove(); // 删掉这一行！不要删除元素
    });

    await new Promise(r => setTimeout(r, 800));

    const anchor = document.getElementById('content-anchor');
    if (window.initialHomeHTML) {
        anchor.innerHTML = window.initialHomeHTML;
    }

    // 状态重置
    document.body.classList.remove('in-subpage');
    const canvas = document.getElementById('canvas-webgl');
    if(canvas) canvas.classList.remove('bg-blur');
    
    // 恢复 body 的滚动（如果之前被锁死的话）
    document.body.style.overflow = ''; 

    window.scrollTo(0, 0);

    setTimeout(() => {
        document.body.classList.remove('is-transitioning');
    }, 300);
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

    if (!video.src && video.dataset.src) {
        video.src = video.dataset.src;
        video.load();
    }

    const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;

    if (!isFullscreen) {
        const requestFS = wrapper.requestFullscreen || wrapper.webkitRequestFullscreen;
        if (requestFS) {
            requestFS.call(wrapper).then(() => {
                video.controls = true; // 激活进度条
                video.muted = false;   // 开启声音
                video.play();
            });
        } else if (video.webkitEnterFullscreen) {
            video.webkitEnterFullscreen(); // iOS 适配
            video.controls = true;
            video.muted = false;
        }
    } else {
        document.exitFullscreen?.() || document.webkitExitFullscreen?.();
    }
};

// 监听全屏状态变化：退出全屏时隐藏进度条并重设静音
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        const videos = document.querySelectorAll('video');
        videos.forEach(v => {
            v.controls = false; // 退出全屏后隐藏进度条
            v.muted = true;     // 恢复静音自动播放模式
        });
    }
});
function getDisplayTitle(key) {
    const titles = { works: '精选案例', cinematic: '动态创意', commercial: '投放实效' };
    return titles[key] || '作品详情';
}




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




// 手机端专用：翻页控制
window.currentSlide = 0;
window.moveSlide = function(direction) {
    const slides = document.querySelectorAll('.system-slide');
    if (!slides || slides.length === 0) return;

    // 暂停当前视频并重置进度
    const oldVid = slides[window.currentSlide].querySelector('video');
    if(oldVid) {
        oldVid.pause();
        oldVid.currentTime = 0; 
    }
    slides[window.currentSlide].classList.remove('active');

    window.currentSlide = (window.currentSlide + direction + slides.length) % slides.length;

    const nextSlide = slides[window.currentSlide];
    nextSlide.classList.add('active');

    const idxSpan = document.getElementById('current-idx');
    if(idxSpan) idxSpan.innerText = window.currentSlide + 1;

    // 播放下一张视频并确保从头开始
    const newVid = nextSlide.querySelector('video');
    if(newVid) {
        if(!newVid.src) newVid.src = newVid.dataset.src;
        newVid.currentTime = 0; 
        newVid.play().catch(() => {});
    }
};