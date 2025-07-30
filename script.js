/* Custom Animated Cursor */
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

/* Cursor grow effect on links/buttons */
function setCursorHover(e) {
  if (e.target.closest('a,button,.cta-btn')) {
    document.body.classList.add('cursor-hover');
  } else {
    document.body.classList.remove('cursor-hover');
  }
}
document.addEventListener('mouseover', setCursorHover);
document.addEventListener('mouseout', setCursorHover);

/* Parallax effect for hero background */
const parallax = document.querySelector('.parallax-bg');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  // Move parallax background slower than scroll
  parallax.style.transform = `translateY(${scrolled * 0.22}px) scale(1.02)`;
});

/* Smooth reveal of sections on scroll */
const sections = document.querySelectorAll('section, .footer');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08 });

sections.forEach(sec => observer.observe(sec));

/* Optional: Smooth scroll for anchor links */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href').slice(1);
    const section = document.getElementById(id);
    if(section){
      window.scrollTo({
        top: section.offsetTop - 24, // for padding
        behavior: 'smooth'
      });
    }
  });
});
