/**
 * Visual Lab 2026 - 核心转场与内容管理系统 (Optimized)
 */

const pageTemplates = {
    works: `
        <div class="page-secondary vertical-feed">
            <button class="btn-close" onclick="backToHome()">× EXIT_DATABASE</button>
            <div class="feed-container">
                <section class="feed-item">
                    <div class="video-wrapper">
                        <video class="lazy-video" loop muted playsinline 
                               data-src="assets/videos/case01.mp4"></video>
                        <div class="video-loader"></div>
                    </div>
                    <div class="project-info">
                        <h3>PROJECT_01 // CREATIVE_ADS</h3>
                        <p>ROI 4.8 / Global Market Strategy</p>
                    </div>
                </section>
                <section class="feed-item">
                    <div class="video-wrapper">
                        <video class="lazy-video" loop muted playsinline 
                               data-src="assets/videos/case02.mp4"></video>
                        <div class="video-loader"></div>
                    </div>
                    <div class="project-info">
                        <h3>PROJECT_02 // MOTION_DESIGN</h3>
                        <p>High Conversion Visual Assets</p>
                    </div>
                </section>
            </div>
        </div>
    `,
    cinematic: `<div class="page-secondary"><button class="btn-close" onclick="backToHome()">× CLOSE</button><h1>COMING SOON</h1></div>`,
    about: `<div class="page-secondary"><button class="btn-close" onclick="backToHome()">× CLOSE</button><h1>RESUME DATA</h1></div>`
};

const Transitioner = {
    isAnimating: false,
    async animateTo(pageKey) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        // 1. 进入转场状态 (拉窗帘)
        document.body.classList.add('is-transitioning');
        
        // 【新增】给首页画布添加模糊动画类（需要在 CSS 中定义 transition: filter 0.5s）
        const canvas = document.getElementById('canvas-webgl');
        if(canvas) canvas.classList.add('bg-blur');

        // 等待遮罩完全覆盖
        await new Promise(resolve => setTimeout(resolve, 800));

        // 2. 内容替换
        const anchor = document.getElementById('content-anchor');
        if (anchor && pageTemplates[pageKey]) {
            anchor.innerHTML = pageTemplates[pageKey];
            
            // 【优化】平滑滚动回顶
            window.scrollTo({ top: 0, behavior: 'instant' });
            
            // 3. 激活视频监听
            initLazyVideos(); 
        }

        // 4. 退出转场状态 (开窗帘)
        setTimeout(() => {
            document.body.classList.remove('is-transitioning');
            // 【新增】标识当前已进入二级页面，可用于 CSS 差异化控制
            document.body.classList.add('in-subpage');
            this.isAnimating = false;
        }, 300);
    }
};

/**
 * 视频流核心监听逻辑
 */
function initLazyVideos() {
    console.log("System: Syncing Video Streams...");
    const observerOptions = { 
        threshold: 0.3, // 视频露出 30% 即开始播放
        rootMargin: "0px 0px 200px 0px" // 提前 200px 预加载
    };

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                // 执行预加载与播放
                if (!video.src) {
                    video.src = video.dataset.src;
                    video.load(); // 强制触发加载
                }
                video.play().catch(() => {});
                video.parentElement.classList.add('is-playing');
            } else {
                video.pause();
                video.parentElement.classList.remove('is-playing');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.lazy-video').forEach(v => videoObserver.observe(v));
}

// 统一接口
function loadPage(key) { Transitioner.animateTo(key); }

// transition.js

/**
 * 优化后的返回首页逻辑：不再刷新页面
 */
async function backToHome() {
    if (Transitioner.isAnimating) return;
    Transitioner.isAnimating = true;

    // 1. 启动转场遮罩
    document.body.classList.add('is-transitioning');
    
    // 2. 等待遮罩完全合拢
    await new Promise(r => setTimeout(r, 800));

    // 3. 恢复首页内容 (此处需存储原始 HTML，或手动还原)
    const anchor = document.getElementById('content-anchor');
    // 这里的 contentHTML 建议在页面首次加载时存为全局变量
    if (window.initialHomeHTML) {
        anchor.innerHTML = window.initialHomeHTML;
    }

    // 4. 移除状态类，恢复 3D 效果
    document.body.classList.remove('in-subpage');
    const canvas = document.getElementById('canvas-webgl');
    if(canvas) canvas.classList.remove('bg-blur');
    
    // 5. 滚动回顶并开启窗帘
    window.scrollTo(0, 0);
    setTimeout(() => {
        document.body.classList.remove('is-transitioning');
        Transitioner.isAnimating = false;
    }, 300);
}

// 在页面初始化时存一份首页 HTML 备份
document.addEventListener('DOMContentLoaded', () => {
    window.initialHomeHTML = document.getElementById('content-anchor').innerHTML;
});
