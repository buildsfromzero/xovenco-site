// Custom Cursor
const cursor = document.getElementById('custom-cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Cursor on links/buttons
const interactiveEls = [
  ...document.querySelectorAll('a, button, .btn-primary, .btn-secondary')
];

interactiveEls.forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('link-hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('link-hover'));
});

// Section Reveal Animations (fade in-up)
function revealOnScroll() {
  const reveals = document.querySelectorAll('.animate-fadeup');
  const windowHeight = window.innerHeight;
  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight * 0.92) {
      el.classList.add('revealed');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Smooth Scroll for nav links (for anchor)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').slice(1);
    if (!targetId) return;
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 64,
        behavior: 'smooth'
      })
    }
  });
});

// GSAP: Parallax hero background + subtle section transitions
if (typeof gsap !== "undefined") {
  // Parallax hero
  gsap.to('.hero', {
    backgroundPosition: "50% 20%",
    ease: "power1.out",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      scrub: true
    }
  });

  // Fade in nav on scroll
  gsap.from(".navbar", {
    y: -40,
    opacity: 0,
    duration: 1.3
  });
}

// Optionally: pointer fallback for unsupported browsers
if(window.matchMedia('(pointer: coarse)').matches){
  cursor.style.display = "none";
}

// Parallax effect for hero logo (on pointer move)
const heroLogo = document.querySelector('.hero-logo');
if (heroLogo) {
  heroLogo.addEventListener('mousemove', (evt) => {
    const { left, width, top, height } = heroLogo.getBoundingClientRect();
    const x = ((evt.clientX - left) / width - 0.5) * 24;
    const y = ((evt.clientY - top) / height - 0.5) * 24;
    heroLogo.style.transform = `rotateX(${ -y }deg) rotateY(${ x }deg) scale(1.05)`;
  });
  heroLogo.addEventListener('mouseleave', () => {
    heroLogo.style.transform = 'none';
  });
}

