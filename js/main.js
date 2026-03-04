/* ==========================================================================
   1. 变量声明
   ========================================================================== */
   const canvas = document.querySelector('#canvas-webgl');
   let scene, camera, renderer, mesh, clock, composer;
   
   // 物理交互变量
   let targetRotationX = 0;
   let targetRotationY = 0;
   let mouseX = 0;
   let mouseY = 0;
   let lastTouchX = 0;
   let lastTouchY = 0;
   let isInteracting = false;
   
   /* ==========================================================================
      2. 初始化 (Three.js)
      ========================================================================== */
   function init() {
       scene = new THREE.Scene();
       camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
       camera.position.z = window.innerWidth < 768 ? 3.5 : 2.2;
   
       renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
       renderer.setSize(window.innerWidth, window.innerHeight);
       renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
   
       clock = new THREE.Clock();
   
       // 效果合成 (Bloom)
       const renderScene = new THREE.RenderPass(scene, camera);
       const bloomPass = new THREE.UnrealBloomPass(
           new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85
       );
       composer = new THREE.EffectComposer(renderer);
       composer.addPass(renderScene);
       composer.addPass(bloomPass);
   
       // 几何体与点云
       const geometry = new THREE.SphereGeometry(1, 128, 128);
       const material = new THREE.PointsMaterial({
           color: 0x00f2ff,
           size: window.innerWidth < 768 ? 0.008 : 0.005,
           transparent: true,
           opacity: 0.6
       });
   
       mesh = new THREE.Points(geometry, material);
       scene.add(mesh);
   
       // 加载动画逻辑 (保持你的进度条逻辑)
       let progress = 0;
       const interval = setInterval(() => {
           progress += Math.random() * 15;
           const pBar = document.querySelector('.progress');
           if(pBar) pBar.style.width = Math.min(progress, 100) + '%';
           if(progress >= 100) {
               clearInterval(interval);
               setTimeout(() => {
                   const loader = document.getElementById('loader');
                   if(loader) {
                       loader.style.transform = 'translateY(-100%)'; 
                       document.body.classList.add('loaded');
                   }
               }, 500);
           }
       }, 100);
   
       setupEvents();
       animate();
   }
   
   /* ==========================================================================
      3. 交互逻辑重构 (核心改进区)
      ========================================================================== */
   function setupEvents() {
       // --- 电脑端：保持平滑跟随 ---
       window.addEventListener('mousemove', (e) => {
           if (!isInteracting) {
               mouseX = (e.clientX / window.innerWidth) * 2 - 1;
               mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
           }
       });
   
       // --- 手机端：重构为“滑动感” ---
       window.addEventListener('touchstart', (e) => {
           isInteracting = true;
           lastTouchX = e.touches[0].clientX;
           lastTouchY = e.touches[0].clientY;
       });
   
       window.addEventListener('touchmove', (e) => {
           const touchX = e.touches[0].clientX;
           const touchY = e.touches[0].clientY;
   
           // 计算滑动差值 (Delta)
           const deltaX = touchX - lastTouchX;
           const deltaY = touchY - lastTouchY;
   
           // 手指划多少，球转多少 (增量逻辑)
           targetRotationY += deltaX * 0.005;
           targetRotationX += deltaY * 0.005;
   
           lastTouchX = touchX;
           lastTouchY = touchY;
   
           // 如果在球体中心区域滑动，阻止页面滚动
           if(touchY < window.innerHeight * 0.7 && e.cancelable) {
               e.preventDefault();
           }
       }, { passive: false });
   
       window.addEventListener('touchend', () => {
           isInteracting = false;
       });
   }
   
   /* ==========================================================================
      4. 动画循环 (阻尼逻辑)
      ========================================================================== */
   function animate() {
       requestAnimationFrame(animate);
       const t = clock.getElapsedTime();
   
       // 1. 旋转逻辑：PC端跟随，手机端旋转
       if (window.innerWidth < 768) {
           // 手机端：带阻尼的增量旋转
           mesh.rotation.y += (targetRotationY - mesh.rotation.y) * 0.1;
           mesh.rotation.x += (targetRotationX - mesh.rotation.x) * 0.1;
           // 自动缓慢自转，增加动态感
           mesh.rotation.y += 0.002;
       } else {
           // PC端：轻微跟随鼠标位移
           mesh.rotation.x += (mouseY * 0.2 - mesh.rotation.x) * 0.05;
           mesh.rotation.y += (mouseX * 0.2 - mesh.rotation.y) * 0.05;
       }
   
       // 2. 呼吸效果
       const s = 1 + Math.sin(t * 0.8) * 0.04;
       mesh.scale.set(s, s, s);
   
       // 3. 字体固定逻辑：手机端彻底锁定位移，防止乱飘
       const titleWrap = document.querySelector('.title-wrap');
       const navWrap = document.querySelector('.main-nav');
       if (titleWrap && navWrap) {
           if (window.innerWidth > 768) {
               // 仅 PC 端开启视差位移
               titleWrap.style.transform = `translate(${mouseX * -20}px, ${mouseY * -20}px)`;
               navWrap.style.transform = `translate(${mouseX * 15}px, ${mouseY * 15}px)`;
           } else {
               // 手机端锁定，保证阅读清晰度
               titleWrap.style.transform = `none`;
               navWrap.style.transform = `none`;
           }
       }
   
       composer.render();
   }
   
   window.addEventListener('resize', () => {
       camera.aspect = window.innerWidth / window.innerHeight;
       camera.updateProjectionMatrix();
       renderer.setSize(window.innerWidth, window.innerHeight);
       composer.setSize(window.innerWidth, window.innerHeight);
   });
   
   init();
   /**
 * 核心转场逻辑控制
 */

// 二级页面模板库 (先放个简单的测试)
const pageTemplates = {
    works: `
        <div class="page-secondary">
            <div class="container">
                <button class="btn-close" onclick="backToHome()">× CLOSE _BACK_TO_CORE</button>
                <h1 class="main-title" style="font-size: 4rem;">SELECTED<br>WORKS</h1>
                <div style="margin-top: 50px; color: #00f2ff; font-family: monospace;">
                    > LOADING VIDEO_DATABASE... [SUCCESS]<br>
                    > INITIALIZING GRID_LAYOUT... [ACTIVE]
                </div>
                </div>
        </div>
    `
    // 其他页面可以在这里继续添加模板
};

async function loadPage(pageKey) {
    if (document.body.classList.contains('is-transitioning')) return;

    // 1. 拉上窗帘
    document.body.classList.add('is-transitioning');

    // 2. 等待窗帘完全合拢
    await new Promise(resolve => setTimeout(resolve, 800));

    // 3. 替换内容
    const anchor = document.getElementById('content-anchor');
    if (pageTemplates[pageKey]) {
        anchor.innerHTML = pageTemplates[pageKey];
        window.scrollTo(0, 0);
    }

    // 4. 拉开窗帘
    setTimeout(() => {
        document.body.classList.remove('is-transitioning');
    }, 200);
}

function backToHome() {
    document.body.classList.add('is-transitioning');
    setTimeout(() => {
        // 返回首页最简单的客观方案是刷新，确保 3D 状态完全重置
        location.reload();
    }, 800);
}
   /* ==========================================================================
      5. PC 光标装饰 (仅限大屏)
      ========================================================================== */
   document.addEventListener('DOMContentLoaded', () => {
       if (window.innerWidth > 768) {
           const dot = document.querySelector('.cursor-dot');
           const ringI = document.querySelector('.cursor-ring-inner');
           const ringO = document.querySelector('.cursor-ring-outer');
           let mX = 0, mY = 0, pX = 0, pY = 0;
   
           window.addEventListener('mousemove', e => { mX = e.clientX; mY = e.clientY; });
   
           function updateCursor() {
               pX += (mX - pX) * 0.2; pY += (mY - pY) * 0.2;
               if(dot) {
                   dot.style.transform = `translate(${pX}px, ${pY}px) translate(-50%, -50%)`;
                   ringI.style.transform = `translate(${pX}px, ${pY}px) translate(-50%, -50%)`;
                   ringO.style.transform = `translate(${pX}px, ${pY}px) translate(-50%, -50%)`;
               }
               requestAnimationFrame(updateCursor);
           }
           updateCursor();
   
           document.querySelectorAll('a').forEach(l => {
               l.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
               l.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
           });
       }
   });