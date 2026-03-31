// ============================================================
// 포트폴리오 렌더링 로직
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const d = PORTFOLIO_DATA;

  renderHero(d.hero);
  renderSkills(d.skills);
  renderExperience(d.experience);
  renderProjects(d.projects);
  renderActivities(d.activities, d.awards, d.education, d.military);
  initNavbar();
  initModal();
  initAnimations();
});

// --- 히어로 ---
function renderHero(hero) {
  const section = document.getElementById("hero");

  const nameEl = section.querySelector(".hero-name");
  nameEl.innerHTML = `${hero.name} <span class="accent">${hero.nickname}</span>`;

  document.getElementById("about-profile-img").src = hero.profileImage;
  document.getElementById("about-profile-img").alt = `${hero.name} 프로필 사진`;
  document.getElementById("about-description").textContent = hero.description;

  const contacts = document.getElementById("about-contacts");
  contacts.innerHTML = `
    <a href="mailto:${hero.contacts.email}" class="btn-icon" title="Email">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>
    </a>
    <a href="${hero.contacts.github}" target="_blank" rel="noopener" class="btn-icon" title="GitHub">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
    </a>
  `;
}

// --- 스킬 ---
function renderSkills(skills) {
  const grid = document.getElementById("skills-grid");
  grid.innerHTML = skills
    .map(
      (skill, i) => `
    <div class="skill-row reveal-stagger" style="transition-delay: ${i * 60}ms">
      <div class="skill-category">${skill.category}</div>
      <div class="skill-tags">
        ${skill.items.map((item) => `<span class="skill-tag">${item}</span>`).join("")}
      </div>
    </div>
  `
    )
    .join("");
}

// --- 경력 ---
function renderExperience(exp) {
  const header = document.getElementById("experience-header");
  header.innerHTML = `
    <div class="exp-meta">
      <span class="exp-company">${exp.company}</span>
      <span class="exp-role">${exp.role}</span>
    </div>
    <div class="exp-period">${exp.period}</div>
    <div class="exp-product">${exp.product} — ${exp.productDescription}</div>
    <div class="exp-summary">${exp.summary}</div>
  `;

  const timeline = document.getElementById("timeline");
  timeline.innerHTML = exp.achievements
    .map(
      (a, i) => `
    <div class="timeline-item reveal" style="transition-delay: ${i * 80}ms">
      <div class="timeline-card" data-index="${i}">
        <div class="timeline-card-header">
          <div class="timeline-card-left">
            ${a.version ? `<span class="version-badge">${a.version}</span>` : ""}
            <span class="timeline-title">${a.title}</span>
          </div>
          <svg class="timeline-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
        <div class="timeline-card-body">
          <div class="timeline-card-content">
            <div class="timeline-section">
              <div class="timeline-section-label problem">Problem</div>
              <p>${a.problem}</p>
            </div>
            <div class="timeline-section">
              <div class="timeline-section-label solution">Solution</div>
              <ul>
                ${a.solution.map((s) => `<li>${s}</li>`).join("")}
              </ul>
            </div>
            <div class="timeline-section">
              <div class="timeline-section-label result">Result</div>
              <p>${a.result}</p>
            </div>
            <div class="timeline-tags">
              ${a.tags.map((t) => `<span class="timeline-tag">${t}</span>`).join("")}
            </div>
          </div>
        </div>
      </div>
    </div>
  `
    )
    .join("");

  timeline.querySelectorAll(".timeline-card").forEach((card) => {
    card.addEventListener("click", () => {
      const isOpen = card.classList.contains("open");
      timeline.querySelectorAll(".timeline-card.open").forEach((c) => c.classList.remove("open"));
      if (!isOpen) card.classList.add("open");
    });
  });
}

// --- 프로젝트 ---
function renderProjects(projects) {
  const grid = document.getElementById("projects-grid");
  grid.innerHTML = projects
    .map(
      (p, i) => {
        // 이미지 영역: 복수 이미지(슬라이드), 단일 이미지, 플레이스홀더
        let imageHTML;
        if (p.images && p.images.length > 1) {
          imageHTML = `
            <div class="project-carousel" data-carousel>
              <div class="carousel-track">
                ${p.images.map((img, idx) => `<img src="${img}" alt="${p.title} ${idx + 1}" class="${idx === 0 ? "active" : ""}" loading="lazy">`).join("")}
              </div>
              <button class="carousel-btn carousel-prev" data-dir="prev" aria-label="이전">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button class="carousel-btn carousel-next" data-dir="next" aria-label="다음">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 6 15 12 9 18"/></svg>
              </button>
              <div class="carousel-dots">
                ${p.images.map((_, idx) => `<span class="carousel-dot ${idx === 0 ? "active" : ""}" data-index="${idx}"></span>`).join("")}
              </div>
            </div>`;
        } else if (p.image) {
          imageHTML = `<div class="project-image"><img src="${p.image}" alt="${p.title}" loading="lazy"></div>`;
        } else {
          imageHTML = `<div class="project-image-placeholder gradient-${(i % 2) + 1}"><span class="placeholder-title">${p.title}</span></div>`;
        }

        const metaParts = [p.team, p.period].filter(Boolean);
        const metaHTML = metaParts.join(`<span class="dot"></span>`);

        return `
    <div class="project-card reveal" style="transition-delay: ${i * 100}ms">
      ${imageHTML}
      <div class="project-body">
        <div class="project-meta">${metaHTML}</div>
        <h3 class="project-title">${p.title}</h3>
        <div class="project-subtitle">${p.subtitle}</div>
        <p class="project-description">${p.description}</p>
        <p class="project-role">${p.role}</p>
        ${
          p.highlights && p.highlights.length > 0
            ? `<ul class="project-highlights">
            ${p.highlights.map((h) => `<li>${h}</li>`).join("")}
          </ul>`
            : ""
        }
        <div class="project-tech">
          ${p.tech.map((t) => `<span class="project-tech-tag">${t}</span>`).join("")}
        </div>
      </div>
    </div>`;
      }
    )
    .join("");

  // 캐러셀 초기화
  initCarousels();
}

// --- 캐러셀 ---
function initCarousels() {
  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const images = carousel.querySelectorAll(".carousel-track img");
    const dots = carousel.querySelectorAll(".carousel-dot");
    let current = 0;

    function goTo(idx) {
      images[current].classList.remove("active");
      dots[current].classList.remove("active");
      current = (idx + images.length) % images.length;
      images[current].classList.add("active");
      dots[current].classList.add("active");
    }

    carousel.querySelector(".carousel-prev").addEventListener("click", (e) => {
      e.stopPropagation();
      goTo(current - 1);
    });

    carousel.querySelector(".carousel-next").addEventListener("click", (e) => {
      e.stopPropagation();
      goTo(current + 1);
    });

    dots.forEach((dot) => {
      dot.addEventListener("click", (e) => {
        e.stopPropagation();
        goTo(parseInt(dot.dataset.index));
      });
    });

    // 자동 슬라이드 (5초 간격)
    let autoSlide = setInterval(() => goTo(current + 1), 5000);
    carousel.addEventListener("mouseenter", () => clearInterval(autoSlide));
    carousel.addEventListener("mouseleave", () => {
      autoSlide = setInterval(() => goTo(current + 1), 5000);
    });
  });
}

// --- 활동/수상 ---
function renderActivities(activities, awards, education, military) {
  const content = document.getElementById("activities-content");
  content.innerHTML = `
    <div class="activities-section reveal">
      <div class="activities-section-title">Activities</div>
      ${activities
        .map(
          (a) => `
        <div class="activity-item">
          <div class="activity-title">${a.title}</div>
          <div class="activity-desc">${a.description}</div>
        </div>
      `
        )
        .join("")}

      <div class="activities-section-title" style="margin-top: 24px;">Education</div>
      <div class="activity-item">
        <div class="activity-title">${education.university} ${education.major}</div>
        <div class="activity-desc">${education.period}</div>
      </div>
      <div class="activity-item">
        <div class="activity-title">${military.title} (${military.role})</div>
        <div class="activity-desc">${military.period}</div>
      </div>
    </div>

    <div class="activities-section reveal">
      <div class="activities-section-title">Awards</div>
      ${awards
        .map(
          (a) => `
        <div class="award-item">
          <span class="award-icon">&#127942;</span>
          <span class="award-text">${a}</span>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

// --- 모달 ---
function initModal() {
  const modal = document.getElementById("project-modal");
  const imageArea = document.getElementById("modal-image-area");
  const content = document.getElementById("modal-content");
  const closeBtn = modal.querySelector(".modal-close");
  const backdrop = modal.querySelector(".modal-backdrop");
  let modalCarouselInterval = null;

  function openModal(projectIndex) {
    const p = PORTFOLIO_DATA.projects[projectIndex];
    if (!p) return;

    // 이미지 영역
    if (p.images && p.images.length > 1) {
      imageArea.innerHTML = `
        <div class="modal-carousel">
          <div class="modal-carousel-track">
            ${p.images.map((img, i) => `<img src="${img}" alt="${p.title} ${i + 1}" class="${i === 0 ? "active" : ""}">`).join("")}
          </div>
          <button class="modal-carousel-btn prev" aria-label="이전">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button class="modal-carousel-btn next" aria-label="다음">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 6 15 12 9 18"/></svg>
          </button>
          <div class="modal-carousel-dots">
            ${p.images.map((_, i) => `<button class="modal-carousel-dot ${i === 0 ? "active" : ""}" data-index="${i}"></button>`).join("")}
          </div>
        </div>`;
      initModalCarousel();
    } else if (p.image) {
      imageArea.innerHTML = `<img class="modal-single-img" src="${p.image}" alt="${p.title}">`;
    } else {
      imageArea.innerHTML = `<div class="modal-placeholder"><span>${p.title}</span></div>`;
    }

    // 콘텐츠 영역
    const metaParts = [p.team, p.period].filter(Boolean);
    const metaHTML = metaParts.join('<span class="dot"></span>');

    content.innerHTML = `
      <div class="modal-meta">${metaHTML}</div>
      <h2 class="modal-title">${p.title}</h2>
      <div class="modal-subtitle">${p.subtitle}</div>
      <p class="modal-description">${p.description}</p>
      <div class="modal-role">${p.role}</div>
      ${p.highlights && p.highlights.length > 0 ? `
        <div class="modal-highlights-label">Highlights</div>
        <ul class="modal-highlights">
          ${p.highlights.map((h) => `<li>${h}</li>`).join("")}
        </ul>
      ` : ""}
      <div class="modal-tech">
        ${p.tech.map((t) => `<span class="modal-tech-tag">${t}</span>`).join("")}
      </div>
    `;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (modalCarouselInterval) {
      clearInterval(modalCarouselInterval);
      modalCarouselInterval = null;
    }
  }

  function initModalCarousel() {
    const carousel = imageArea.querySelector(".modal-carousel");
    if (!carousel) return;
    const imgs = carousel.querySelectorAll(".modal-carousel-track img");
    const dots = carousel.querySelectorAll(".modal-carousel-dot");
    let cur = 0;

    function go(idx) {
      imgs[cur].classList.remove("active");
      dots[cur].classList.remove("active");
      cur = (idx + imgs.length) % imgs.length;
      imgs[cur].classList.add("active");
      dots[cur].classList.add("active");
    }

    carousel.querySelector(".prev").addEventListener("click", () => go(cur - 1));
    carousel.querySelector(".next").addEventListener("click", () => go(cur + 1));
    dots.forEach((d) => d.addEventListener("click", () => go(parseInt(d.dataset.index))));

    modalCarouselInterval = setInterval(() => go(cur + 1), 4000);
    carousel.addEventListener("mouseenter", () => clearInterval(modalCarouselInterval));
    carousel.addEventListener("mouseleave", () => {
      modalCarouselInterval = setInterval(() => go(cur + 1), 4000);
    });
  }

  // 카드 클릭 이벤트
  document.getElementById("projects-grid").addEventListener("click", (e) => {
    const card = e.target.closest(".project-card");
    if (!card) return;
    // 캐러셀 버튼 클릭은 무시
    if (e.target.closest(".carousel-btn") || e.target.closest(".carousel-dot")) return;
    const index = [...card.parentElement.children].indexOf(card);
    openModal(index);
  });

  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) closeModal();
  });
}

// --- 네비게이션 ---
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const links = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    navLinks.classList.toggle("open");
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      toggle.classList.remove("active");
      navLinks.classList.remove("open");
    });
  });

  const sections = document.querySelectorAll("section[id]");
  const observerOptions = { rootMargin: "-30% 0px -70% 0px" };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((l) => l.classList.remove("active"));
        const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add("active");
      }
    });
  }, observerOptions);

  sections.forEach((s) => sectionObserver.observe(s));
}
