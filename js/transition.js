/**
 * Visual Lab 2026 - 核心转场与内容管理系统
 */

// 【唯一声明】所有的页面模板都统一写在这个对象里
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
    commercial: `<div class="page-secondary"><button class="btn-close" onclick="backToHome()">× CLOSE</button><h1>COMING SOON</h1></div>`,
    about: `<div class="page-secondary"><button class="btn-close" onclick="backToHome()">× CLOSE</button><h1>RESUME DATA</h1></div>`
};

const Transitioner = {
    isAnimating: false,
    async animateTo(pageKey) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        // 1. 拉窗帘
        document.body.classList.add('is-transitioning');
        await new Promise(resolve => setTimeout(resolve, 800));

        // 2. 替换内容
        const anchor = document.getElementById('content-anchor');
        if (anchor && pageTemplates[pageKey]) {
            anchor.innerHTML = pageTemplates[pageKey];
            window.scrollTo(0, 0);
            
            // 3. 首页 3D 球体模糊处理
            const canvas = document.getElementById('canvas-webgl');
            if(canvas) canvas.style.filter = 'blur(10px) brightness(0.5)';
            
            // 4. 激活视频监听
            initLazyVideos(); 
        }

        // 5. 开窗帘
        setTimeout(() => {
            document.body.classList.remove('is-transitioning');
            this.isAnimating = false;
        }, 300);
    }
};

// 视频懒加载与滚动控制逻辑
function initLazyVideos() {
    console.log("System: Initializing Video Streams...");
    const observerOptions = { threshold: 0.5 };
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                if (!video.src) video.src = video.dataset.src;
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

// 全局调用函数
function loadPage(key) { Transitioner.animateTo(key); }
function backToHome() {
    document.body.classList.add('is-transitioning');
    setTimeout(() => { location.reload(); }, 800);
}