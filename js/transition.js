function generateFeedHtml(categoryKey) {
    // 清理旧的视频元素，防止残留
    const oldVideos = document.querySelectorAll('.lazy-video');
    oldVideos.forEach(v => {
        v.pause();
        v.src = '';
        v.remove();
    });

    const data = (typeof projectData !== 'undefined') ? projectData : { works: [], cinematic: [], commercial: [] };
    const filteredItems = data[categoryKey] || [];
    const isMobile = window.innerWidth <= 768;

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
        if (!isMobile) {
            return `
                <section class="feed-item">
                    <div class="video-container">
                        <div class="video-wrapper" onclick="toggleVideoFullscreen(this)">
                            <video class="lazy-video" loop muted playsinline preload="metadata" data-src="${item.videoUrl}"></video>
                            <div class="video-loading"></div>
                        </div>
                    </div>
                    <div class="project-info-simple">
                        <h3>${item.title}</h3>
                        <p>${item.desc}</p>
                    </div>
                </section>
            `;
        } else {
            return `
                <div class="system-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
                    <div class="video-container" onclick="toggleVideoFullscreen(this)">
                        <video class="lazy-video" loop muted playsinline preload="metadata" src="${item.videoUrl}"></video>
                        <div class="video-loading"></div>
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
            <button class="ctrl-btn" onclick="SlideshowManager.moveSlide(-1)">PREV</button>
            <div class="progress-info"><span id="current-idx">1</span> / ${filteredItems.length}</div>
            <button class="ctrl-btn" onclick="SlideshowManager.moveSlide(1)">NEXT</button>
        </div>
    ` : '';

    return `
    <div class="page-secondary ${isMobile ? 'virtual-scroll-system' : ''}">
        <div class="back-btn-cyber" onclick="backToHome()">
            <div class="back-btn-icon">
                <svg viewBox="0 0 24 24" width="16" height="16">
                    <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" stroke-width="2.5"/>
                </svg>
            </div>
            <div class="back-btn-text">
                <span class="back-label">RETURN</span>
                <span class="back-id">SYS_ROOT</span>
            </div>
        </div>
        <div class="${isMobile ? 'slides-viewport' : 'resume-scroll-container'}">
            <div class="${isMobile ? '' : 'resume-content'}">
                ${contentHtml}
            </div>
        </div>
        ${mobileControls}
    </div>`;
}

// 页面模板（已移除无用第二参数）
const pageTemplates = {
    works: generateFeedHtml('works'),
    cinematic: generateFeedHtml('cinematic'),
    commercial: generateFeedHtml('commercial'),
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
                        <p>打破设计与研发的沟通黑盒。具备小程序与个人简历网站独立开发经验，在视频设计上我拥有全逻辑视野，可以从数据反馈上提供产品内容的优化建议，以及对全团队视频逻辑整合，帮助团队生产更出色的视频</p>
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

// ======================= 手机滑动管理器（封装全局变量，避免污染） =======================
const SlideshowManager = {
    currentSlide: 0,
    slidesCount: 0,
    container: null,
    touchStartX: 0,
    touchEndX: 0,
    init() {
        if (window.innerWidth > 768) return;
        this.container = document.querySelector('.slides-viewport');
        if (!this.container) return;
        const slides = document.querySelectorAll('.system-slide');
        this.slidesCount = slides.length;
        if (this.slidesCount === 0) return;
        this.currentSlide = 0;
        this.updateVisibility();
        this.updateProgress();
        this.controlPlayback();
        // 绑定事件
        this.container.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
        this.container.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
        this.container.addEventListener('touchend', this.handleTouchEnd.bind(this));
        this.container.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
    },
    destroy() {
        if (this.container) {
            this.container.removeEventListener('touchstart', this.handleTouchStart);
            this.container.removeEventListener('touchmove', this.handleTouchMove);
            this.container.removeEventListener('touchend', this.handleTouchEnd);
            this.container.removeEventListener('wheel', this.handleWheel);
        }
        this.container = null;
        // 恢复所有slide显示
        const slides = document.querySelectorAll('.system-slide');
        slides.forEach(slide => slide.style.display = '');
    },
    updateVisibility() {
        const slides = document.querySelectorAll('.system-slide');
        slides.forEach((slide, idx) => {
            if (idx === this.currentSlide) {
                slide.classList.add('active');
                slide.style.display = 'flex';
            } else {
                slide.classList.remove('active');
                slide.style.display = 'none';
            }
        });
    },
    updateProgress() {
        const span = document.getElementById('current-idx');
        if (span) span.innerText = this.currentSlide + 1;
    },
    controlPlayback() {
        const slides = document.querySelectorAll('.system-slide');
        slides.forEach((slide, idx) => {
            const video = slide.querySelector('video');
            if (!video) return;
            if (idx === this.currentSlide) {
                if (video.paused && video.readyState >= 2) {
                    video.play().catch(e => console.log('自动播放失败', e));
                }
            } else {
                if (!video.paused) video.pause();
                video.currentTime = 0;
            }
        });
    },
    moveSlide(delta) {
        let newIdx = this.currentSlide + delta;
        if (newIdx < 0) newIdx = 0;
        if (newIdx >= this.slidesCount) newIdx = this.slidesCount - 1;
        if (newIdx === this.currentSlide) return;
        this.currentSlide = newIdx;
        this.updateVisibility();
        this.updateProgress();
        this.controlPlayback();
    },
    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
    },
    handleTouchMove(e) {
        if (!this.touchStartX) return;
        this.touchEndX = e.touches[0].clientX;
        const diff = this.touchEndX - this.touchStartX;
        if (Math.abs(diff) > 10) e.preventDefault();
    },
    handleTouchEnd() {
        if (!this.touchStartX || !this.touchEndX) {
            this.touchStartX = 0;
            return;
        }
        const diff = this.touchEndX - this.touchStartX;
        const threshold = 50;
        if (diff > threshold) this.moveSlide(-1);
        else if (diff < -threshold) this.moveSlide(1);
        this.touchStartX = 0;
        this.touchEndX = 0;
    },
    handleWheel(e) {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            e.preventDefault();
            if (e.deltaX > 0) this.moveSlide(1);
            else if (e.deltaX < 0) this.moveSlide(-1);
        }
    }
};

// 全局 moveSlide 兼容旧调用
window.moveSlide = (delta) => SlideshowManager.moveSlide(delta);

// ======================= 转场核心控制器 =======================
const Transitioner = {
    isAnimating: false,
    aboutListenerAttached: false,  // 防止重复绑定click

    async animateTo(pageKey) {
        if (this.isAnimating) return;
        this.isAnimating = true;
        const isMobile = window.innerWidth <= 768;

        document.body.classList.add('is-transitioning');
        const canvas = document.getElementById('canvas-webgl');
        if (canvas) canvas.classList.add('bg-blur');
        await new Promise(resolve => setTimeout(resolve, 800));

        const anchor = document.getElementById('content-anchor');
        if (anchor && pageTemplates[pageKey]) {
            anchor.innerHTML = (pageKey === 'about') ? pageTemplates.about : generateFeedHtml(pageKey);

            if (pageKey === 'about') {
                // --- 简历页逻辑 ---
                const btn = document.getElementById('whyMeBtn');
                const panel = document.getElementById('whyMePanel');
                const root = document.querySelector('.resume-root');
                const scrollBox = document.querySelector('.resume-scroll-container');

                if (isMobile) {
                    // 手机端：不隐藏按钮，改为弹窗模式
                    if (btn && panel) {
                        btn.style.display = 'flex';
                        // 移除原来的panel内联样式，使用移动端优化样式
                        panel.style.display = 'none';
                        panel.style.position = 'fixed';
                        panel.style.top = '10%';
                        panel.style.left = '5%';
                        panel.style.width = '90%';
                        panel.style.maxHeight = '80%';
                        panel.style.overflowY = 'auto';
                        panel.style.zIndex = '1000';
                        panel.style.background = '#0a0a0a';
                        panel.style.border = '1px solid #0f0';
                        panel.style.padding = '1rem';
                        panel.style.borderRadius = '8px';
                        // 添加关闭按钮
                        if (!panel.querySelector('.close-panel-mobile')) {
                            const closeBtn = document.createElement('button');
                            closeBtn.innerText = '✕ 关闭';
                            closeBtn.className = 'close-panel-mobile';
                            closeBtn.style.cssText = 'position: sticky; top:0; float:right; background:#0f0; color:#000; border:none; padding:4px 12px; margin-bottom:10px; cursor:pointer';
                            closeBtn.onclick = () => { panel.style.display = 'none'; };
                            panel.prepend(closeBtn);
                        }
                        btn.onclick = () => {
                            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
                        };
                    }
                    if (scrollBox) {
                        scrollBox.style.pointerEvents = 'auto';
                        scrollBox.style.overflowY = 'auto';
                        // 动态计算高度，避免双滚动条
                        const topBar = document.querySelector('.back-btn-cyber');
                        const topHeight = topBar ? topBar.offsetHeight : 0;
                        scrollBox.style.height = `calc(100vh - ${topHeight}px)`;
                    }
                    document.body.style.overflow = 'auto';
                } else {
                    // 电脑端：维持原有弹出逻辑，并修复重复监听
                    if (btn && panel && root) {
                        // 移除旧监听器（如果已添加）
                        if (this.aboutListenerAttached) {
                            btn.onclick = null;
                            document.removeEventListener('click', this.globalClickHandler);
                        }
                        const clickHandler = (e) => {
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
                        btn.onclick = clickHandler;

                        this.globalClickHandler = (e) => {
                            if (panel.style.display === 'block' && !panel.contains(e.target) && e.target !== btn) {
                                panel.style.display = 'none';
                                root.classList.remove('panel-active');
                                btn.innerHTML = 'WHY_CHOOSE_ME // 为什么选择我?';
                            }
                        };
                        document.addEventListener('click', this.globalClickHandler);
                        this.aboutListenerAttached = true;
                    }
                }
            } else {
                // 作品集页面：重新初始化滑动和视频
                // 先销毁旧的滑动管理器
                SlideshowManager.destroy();
                // 重置当前滑动索引（已包含在init中）
                if (window.innerWidth <= 768) {
                    SlideshowManager.init();
                }
                // 初始化视频（懒加载+自动播放首帧）
                initVideoFirstFrame();
            }
        }

        setTimeout(() => {
            document.body.classList.remove('is-transitioning');
            document.body.classList.add('in-subpage');
            this.isAnimating = false;
        }, 300);
    }
};

// 统一接口
function loadPage(key) { Transitioner.animateTo(key); }

// 返回首页（增加动画锁）
async function backToHome() {
    if (Transitioner.isAnimating) return;
    document.body.classList.add('is-transitioning');
    // 清理视频
    const videos = document.querySelectorAll('video');
    videos.forEach(v => {
        v.pause();
        v.src = '';
        v.load();
        v.remove();
    });
    await new Promise(r => setTimeout(r, 800));
    const anchor = document.getElementById('content-anchor');
    if (window.initialHomeHTML) anchor.innerHTML = window.initialHomeHTML;
    document.body.classList.remove('in-subpage');
    const canvas = document.getElementById('canvas-webgl');
    if (canvas) canvas.classList.remove('bg-blur');
    document.body.style.overflow = '';
    window.scrollTo(0, 0);
    setTimeout(() => document.body.classList.remove('is-transitioning'), 300);
}

// 保存首页HTML
document.addEventListener('DOMContentLoaded', () => {
    window.initialHomeHTML = document.getElementById('content-anchor').innerHTML;
});

// ======================= 视频首帧 + 自动播放（解决无画面） =======================
function initVideoFirstFrame() {
    const isMobile = window.innerWidth <= 768;
    const allVideos = document.querySelectorAll('.lazy-video');

    if (isMobile) {
        // 手机端：设置首帧并尝试播放当前激活视频
        allVideos.forEach(video => {
            const container = video.closest('.video-container');
            if (container) container.classList.remove('loading');
            if (video.readyState >= 1) {
                video.currentTime = 0.01;
            } else {
                video.addEventListener('loadedmetadata', () => { video.currentTime = 0.01; }, { once: true });
            }
            video.style.opacity = 1;
            // 自动播放由 SlideshowManager.controlPlayback 负责，这里不额外播放
        });
    } else {
        // 电脑端：懒加载 + 自动播放
        const lazyVideos = document.querySelectorAll('.lazy-video[data-src]:not([data-loaded])');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    const src = video.dataset.src;
                    const container = video.closest('.video-container');
                    if (src && !video.src) {
                        if (container) container.classList.add('loading');
                        video.src = src;
                        video.load();
                        video.addEventListener('loadedmetadata', () => { video.currentTime = 0.01; }, { once: true });
                        const onCanPlay = () => {
                            if (container) container.classList.remove('loading');
                            // 关键：自动播放视频（静音自动播放允许）
                            video.play().catch(e => console.log('自动播放失败', e));
                            video.removeEventListener('canplay', onCanPlay);
                        };
                        video.addEventListener('canplay', onCanPlay, { once: true });
                        setTimeout(() => {
                            if (container && container.classList.contains('loading')) {
                                container.classList.remove('loading');
                            }
                        }, 5000);
                        video.setAttribute('data-loaded', 'true');
                    }
                    observer.unobserve(video);
                }
            });
        }, { rootMargin: '200px' });
        lazyVideos.forEach(video => observer.observe(video));
    }
}

// 全屏功能（保留原样，修复退出时可能黑屏的隐患）
window.toggleVideoFullscreen = function(wrapper) {
    const video = wrapper.querySelector('video');
    if (!video) return;
    if (!video.src && video.dataset.src) {
        video.src = video.dataset.src;
        video.load();
        video.currentTime = 0.01;
    }
    const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;
    if (!isFullscreen) {
        const requestFS = wrapper.requestFullscreen || wrapper.webkitRequestFullscreen;
        if (requestFS) {
            requestFS.call(wrapper).then(() => {
                video.controls = true;
                video.muted = false;
                video.play();
            }).catch(e => console.log('全屏失败', e));
        } else if (video.webkitEnterFullscreen) {
            video.webkitEnterFullscreen();
            video.controls = true;
            video.muted = false;
        }
    } else {
        document.exitFullscreen?.() || document.webkitExitFullscreen?.();
    }
};

document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        const videos = document.querySelectorAll('video');
        videos.forEach(v => {
            v.controls = false;
            v.muted = true;
        });
    }
});

// 手机端点击全屏委托（保持）
document.addEventListener('click', function(e) {
    const videoContainer = e.target.closest('.video-container');
    if (videoContainer && videoContainer.closest('.system-slide')) {
        toggleVideoFullscreen(videoContainer);
    }
});

// 窗口尺寸变化时重新调整滑动管理器
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        if (document.querySelector('.system-slide') && !SlideshowManager.container) {
            SlideshowManager.init();
        }
    } else {
        SlideshowManager.destroy();
        const slides = document.querySelectorAll('.system-slide');
        slides.forEach(slide => slide.style.display = '');
    }
});