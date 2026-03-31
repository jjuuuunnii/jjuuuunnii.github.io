// ============================================================
// 스크롤 애니메이션 + 타이핑 효과
// ============================================================

function initAnimations() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    document.querySelectorAll(".reveal, .reveal-stagger").forEach((el) => {
      el.classList.add("revealed");
    });
    const tagline = document.querySelector(".hero-tagline");
    if (tagline) tagline.textContent = PORTFOLIO_DATA.hero.tagline;
    return;
  }

  initScrollReveal();
  initTypingEffect();
}

// --- 스크롤 리빌 ---
function initScrollReveal() {
  const targets = document.querySelectorAll(".reveal, .reveal-stagger");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}

// --- 타이핑 효과 ---
function initTypingEffect() {
  const tagline = document.querySelector(".hero-tagline");
  if (!tagline) return;

  const text = PORTFOLIO_DATA.hero.tagline;
  tagline.innerHTML = '<span class="cursor"></span>';

  let i = 0;
  const speed = 45;

  function type() {
    if (i < text.length) {
      const cursor = tagline.querySelector(".cursor");
      const char = document.createTextNode(text.charAt(i));
      tagline.insertBefore(char, cursor);
      i++;
      setTimeout(type, speed);
    } else {
      setTimeout(() => {
        const cursor = tagline.querySelector(".cursor");
        if (cursor) {
          cursor.style.animation = "none";
          cursor.style.opacity = "0";
          setTimeout(() => cursor.remove(), 300);
        }
      }, 2500);
    }
  }

  setTimeout(type, 600);
}
