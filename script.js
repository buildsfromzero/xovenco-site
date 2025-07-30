// --- Three.js Motion Story Scene ---
const canvasContainer = document.getElementById('three-canvas');
if (canvasContainer) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, canvasContainer.offsetWidth / canvasContainer.offsetHeight, 0.1, 1000);
  camera.position.z = 3;
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
  canvasContainer.appendChild(renderer.domElement);
  window.addEventListener('resize', () => {
    renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
    camera.aspect = canvasContainer.offsetWidth / canvasContainer.offsetHeight;
    camera.updateProjectionMatrix();
  });
  const geometry = new THREE.SphereGeometry(1, 84, 84);
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xe96ce6,
    emissive: 0x5b2bff,
    roughness: 0.16,
    transmission: 0.39,
    thickness: 1.1,
    clearcoat: 0.99
  });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);
  // Particles
  const starGeo = new THREE.BufferGeometry();
  const starCount = 85;
  const positions = [];
  for (let i = 0; i < starCount; i++) {
    positions.push((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8);
  }
  starGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.11, opacity: 0.5, transparent: true });
  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);
  // Animate
  function animate() {
    sphere.rotation.y += 0.003;
    stars.rotation.y -= 0.001;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
  // GSAP Scroll scene movement
  gsap.registerPlugin(ScrollTrigger);
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#motion-story",
      start: "top center",
      end: "bottom center",
      scrub: true
    }
  });
  tl.to(camera.position, { z: 1.2, ease: "power2.out" })
    .to(camera.position, { x: 2, y: 1.1, ease: "expo.inOut" }, "<+0.7");
}

// --- Section/Element Animations ---
document.querySelectorAll('.animate-fadeIn').forEach((el, idx) => {
  gsap.fromTo(el, { autoAlpha: 0, y: 20 }, {
    autoAlpha: 1, y: 0, delay: idx * 0.07, duration: 1.1,
    scrollTrigger: {trigger:el, start:"top 90%"}
  });
});

// --- Lenis Smooth Scroll ---
const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 1.2 });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// --- Custom Cursor ---
const cursor = document.getElementById('custom-cursor');
if (cursor) {
  window.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
  const hoverTargets = 'a, button, input, .group, [role="button"], .cursor-pointer';
  document.querySelectorAll(hoverTargets).forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
  });
}

// --- Prevent default form submit (static) ---
document.querySelectorAll('form').forEach(f => {
  f.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Thank you! You'll get early access soon.");
  });
});

