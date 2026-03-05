/* ==========================================================================
   1. 变量声明
   ========================================================================== */
   const canvas = document.querySelector('#canvas-webgl');
   let scene, camera, renderer, mesh, clock, composer;
   
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
       
       // 修复变量定义：在这里定义 isMobile 供后续使用
       const isMobile = window.innerWidth < 768;
       camera.position.z = isMobile ? 3.5 : 2.2;
   
       renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
       renderer.setSize(window.innerWidth, window.innerHeight);
       renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
   
       clock = new THREE.Clock();
   
       const renderScene = new THREE.RenderPass(scene, camera);
       const bloomPass = new THREE.UnrealBloomPass(
           new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85
       );
       composer = new THREE.EffectComposer(renderer);
       composer.addPass(renderScene);
       composer.addPass(bloomPass);
   
       // --- 核心分支逻辑 ---
       /* 优化后的移动端线条合并逻辑 */
if (isMobile) {
    const geometry = new THREE.BufferGeometry();
    const points = [];
    const size = 100; // 适当减小范围
    const step = 2;   // 增加步长，保持视觉精细的同时减少顶点

    for (let i = -size; i <= size; i += step) {
        // 横向线顶点
        points.push(new THREE.Vector3(-size, i, 0), new THREE.Vector3(size, i, 0));
        // 纵向线顶点
        points.push(new THREE.Vector3(i, -size, 0), new THREE.Vector3(i, size, 0));
    }

    geometry.setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ 
        color: 0x00f2ff, 
        transparent: true, 
        opacity: 0.4,
        blending: THREE.AdditiveBlending 
    });

    mesh = new THREE.LineSegments(geometry, material); // 合并为一个渲染单元
    mesh.rotation.x = -0.8;
    scene.add(mesh);
}
   
       // 加载动画逻辑 (保持不变)
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
      3. 交互逻辑 (保持不变)
      ========================================================================== */
   function setupEvents() {
       window.addEventListener('mousemove', (e) => {
           if (!isInteracting) {
               mouseX = (e.clientX / window.innerWidth) * 2 - 1;
               mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
           }
       });
   
       // 移动端：监听整个 body，但只有在 target 是 body 或非交互元素时才旋转
    window.addEventListener('touchmove', (e) => {
        // 如果点击的是链接或按钮，不触发 3D 旋转
        if (e.target.closest('a') || e.target.closest('button')) {
            return; 
        }

        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        const deltaX = touchX - lastTouchX;
        const deltaY = touchY - lastTouchY;
        
        targetRotationY += deltaX * 0.005;
        targetRotationX += deltaY * 0.005;
        
        lastTouchX = touchX;
        lastTouchY = touchY;
        
        // 防止在操作 3D 时触发页面滚动
        if(e.cancelable) e.preventDefault();
    }, { passive: false });
   }
   
   /* ==========================================================================
      4. 动画循环
      ========================================================================== */
   function animate() {
       requestAnimationFrame(animate);
       const t = clock.getElapsedTime();
       const isMobile = window.innerWidth < 768;
   
       if (isMobile) {
           if (mesh) {
               mesh.position.y = Math.sin(t * 0.2) * 0.1;
               mesh.rotation.z = t * 0.02;
           }
       } else {
           if (mesh) {
               mesh.rotation.x += (mouseY * 0.2 - mesh.rotation.x) * 0.05;
               mesh.rotation.y += (mouseX * 0.2 - mesh.rotation.y) * 0.05;
           }
       }
   
       const s = 1 + Math.sin(t * 0.8) * 0.04;
       if (mesh) mesh.scale.set(s, s, s);
   
       const titleWrap = document.querySelector('.title-wrap');
       const navWrap = document.querySelector('.main-nav');
       if (titleWrap && navWrap) {
           if (!isMobile) {
               titleWrap.style.transform = `translate(${mouseX * -20}px, ${mouseY * -20}px)`;
               navWrap.style.transform = `translate(${mouseX * 15}px, ${mouseY * 15}px)`;
           } else {
               // 手机端解锁 transform，由 CSS 控制位置
               titleWrap.style.removeProperty('transform');
               navWrap.style.removeProperty('transform');
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
   
  
   /* ==========================================================================
   6. PC 光标装饰 (强制顶层显示)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // 只有电脑端才执行光标逻辑
    if (window.innerWidth > 768) {
        const dot = document.querySelector('.cursor-dot');
        const ringI = document.querySelector('.cursor-ring-inner');
        const ringO = document.querySelector('.cursor-ring-outer');
        
        // 确保光标在所有元素之上
        [dot, ringI, ringO].forEach(el => {
            if(el) el.style.zIndex = "9999";
        });

        let mX = 0, mY = 0, pX = 0, pY = 0;
        window.addEventListener('mousemove', e => { 
            mX = e.clientX; 
            mY = e.clientY; 
        });

        function updateCursor() {
            pX += (mX - pX) * 0.2; 
            pY += (mY - pY) * 0.2;
            if(dot) {
                // 这里的 transform 逻辑完全保留你原始的跟随效果
                dot.style.transform = `translate(${pX}px, ${pY}px) translate(-50%, -50%)`;
                ringI.style.transform = `translate(${pX}px, ${pY}px) translate(-50%, -50%)`;
                ringO.style.transform = `translate(${pX}px, ${pY}px) translate(-50%, -50%)`;
            }
            requestAnimationFrame(updateCursor);
        }
        updateCursor();
    }
});
