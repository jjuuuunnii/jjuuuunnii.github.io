// 문서 내용을 프로젝트별로 렌더링한다. 입력 데이터는 로컬 정적 파일만 사용한다.
const escapeHTML = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const text = escapeHTML;

function renderDirectory(projects) {
  document.getElementById("project-nav-links").innerHTML = `<a class="project-nav-index" href="#projects">목록 <span aria-hidden="true">↑</span></a>${projects.map((project) => `<a href="#${project.id}" data-project="${project.id}"><span>${project.number}</span>${text(project.name)}</a>`).join("")}`;
  document.getElementById("directory-list").innerHTML = projects.map((project) => `
    <a class="directory-row ${project.id}" href="#${project.id}">
      <span class="directory-number">${project.number}</span>
      <h3>${text(project.name)}</h3>
      <span class="directory-description">${text(project.short)}</span>
      <span class="directory-type">${text(project.type)}</span>
      <span class="directory-arrow" aria-hidden="true">↗</span>
    </a>`).join("");
}

function renderDiagram() {
  return `<figure class="flow-diagram">
    <figcaption><span class="eyebrow">FLOAD / V1 → V2</span><strong>대여 요청과 장비 회신을 나눈 흐름</strong></figcaption>
    <div class="diagram-lanes">
      <div class="diagram-lane"><span class="lane-label">요청</span><div>사용자 앱</div><span class="connector" aria-hidden="true">→</span><div>대여 요청 접수<span>접수 응답 후 스레드 반환</span></div><span class="connector" aria-hidden="true">→</span><div>Kafka · 바이크 서버<span>MQTT로 명령 전달</span></div><span class="connector" aria-hidden="true">→</span><div>자전거</div></div>
      <div class="diagram-lane response-lane"><span class="lane-label">회신</span><div>자전거 응답</div><span class="connector" aria-hidden="true">→</span><div>바이크 서버<span>성공 · 오류 이벤트 발행</span></div><span class="connector" aria-hidden="true">→</span><div>Kafka · SSE 서버<span>회신 이벤트 소비</span></div><span class="connector" aria-hidden="true">→</span><div>앱에 결과 전달</div></div>
    </div>
    <p>Kafka는 V1에도 사용했습니다. V2에서는 저장된 응답을 반복 확인하는 대신, 회신 이벤트가 후속 처리를 이어가도록 바꿨습니다.</p>
  </figure>`;
}

function renderEvidence(project) {
  if (!project.evidence) return "";
  return `<div class="evidence-grid">${project.evidence.map((item) => `<div class="evidence-item"><strong>${text(item.value)}</strong><h4>${text(item.label)}</h4><p>${text(item.text)}</p></div>`).join("")}</div>`;
}

function renderTable(table) {
  if (!table) return "";
  return `<div class="result-table-wrap"><table><caption>${text(table.caption)}</caption><thead><tr>${table.headers.map((heading) => `<th scope="col">${text(heading)}</th>`).join("")}</tr></thead><tbody>${table.rows.map((row) => `<tr>${row.map((cell, index) => index === 0 ? `<th scope="row">${text(cell)}</th>` : `<td${index === 3 ? ` class="verdict ${cell === "통과" ? "pass" : cell === "미달" ? "miss" : "unknown"}"` : ""}>${text(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table><p class="table-note">${text(table.note)}</p></div>`;
}

function renderProject(project) {
  return `<article class="case-study case-${project.id}" id="${project.id}" aria-labelledby="${project.id}-title">
    <header class="case-cover"><div class="shell">
      <div class="case-topline"><span class="case-number">${project.number} / ${text(project.english)}</span><span>${text(project.type)}</span><span>${text(project.period)}</span></div>
      <div class="case-heading"><div><p class="project-name">${text(project.name)}</p><h2 id="${project.id}-title">${project.title.split("<br>").map(text).join("<br>")}</h2></div><p class="project-status">${text(project.status)}</p></div>
      <nav class="case-contents" aria-label="${text(project.name)} 내용"><a href="#${project.id}-overview">01 소개</a><a href="#${project.id}-work">02 내가 한 일</a><a href="#${project.id}-outcome">03 결과와 판단</a></nav>
    </div></header>
    <div class="shell case-body">
      <div class="case-overview-heading" id="${project.id}-overview"><p class="eyebrow">01 / OVERVIEW</p><h3>프로젝트 소개</h3></div>
      <div class="case-intro">
        <div class="intro-copy"><h3>시작한 이유</h3><p>${text(project.background)}</p><h3>어떤 서비스인가</h3><p>${text(project.description)}</p><dl class="project-meta"><div><dt>내 역할</dt><dd>${text(project.role)}</dd></div><div><dt>작업 범위</dt><dd>${text(project.scope)}</dd></div><div><dt>함께한 사람</dt><dd>${text(project.team)}</dd></div></dl></div>
        <figure class="project-figure ${project.imageStyle}"><div class="project-image-wrap"><img src="${project.image}" alt="${text(project.imageAlt)}" loading="lazy" decoding="async"></div><figcaption>${text(project.imageCaption)}</figcaption></figure>
      </div>
      <div class="user-flow"><span class="flow-label">이용 흐름</span><ol>${project.flow.map((step, i) => `<li><span>${String(i + 1).padStart(2, "0")}</span>${text(step)}</li>`).join("")}</ol></div>
      ${project.facts ? `<div class="project-facts">${project.facts.map((fact) => `<div><strong>${text(fact.value)}</strong><span>${text(fact.label)}</span></div>`).join("")}</div>` : ""}
      <div class="work-section" id="${project.id}-work"><div class="case-section-label"><p class="eyebrow">02 / MY WORK</p><h3>내가 한 일</h3></div><div class="work-content"><h3 class="work-title">${text(project.workTitle)}</h3>${project.work.map((item, index) => `<section class="work-item"><div class="work-item-title"><span>${String(index + 1).padStart(2, "0")}</span><h4>${text(item.title)}</h4></div><p>${text(item.text)}</p><p class="work-result"><span>바뀐 점</span>${text(item.result)}</p></section>`).join("")}</div></div>
      ${project.diagram ? renderDiagram() : ""}
      ${project.details?.length ? `<div class="technical-details"><p class="detail-intro">구현과 운영 더 보기</p>${project.details.map((detail) => `<details><summary>${text(detail.title)}<span class="detail-sign" aria-hidden="true">＋</span></summary><div class="detail-content">${detail.paragraphs.map((paragraph) => `<p>${text(paragraph)}</p>`).join("")}</div></details>`).join("")}</div>` : ""}
      <div class="outcome-section" id="${project.id}-outcome"><div class="case-section-label"><p class="eyebrow">03 / OUTCOME</p><h3>결과와 판단</h3></div><div class="outcome-content">${renderTable(project.table)}${renderEvidence(project)}<h3>${text(project.outcomeTitle)}</h3><p>${text(project.outcome)}</p>${project.note ? `<p class="outcome-note">${text(project.note)}</p>` : ""}</div></div>
      <div class="case-bottom"><div class="tech-list"><span class="eyebrow">${project.id === "offstage" ? "TOOLS" : "STACK"}</span><p>${project.tech.map(text).join("<span aria-hidden=\"true\"> / </span>")}</p></div>${project.repo ? `<a class="text-link" href="${project.repo}" target="_blank" rel="noopener noreferrer">프로젝트 저장소 <span aria-hidden="true">↗</span></a>` : ""}<a class="index-link" href="#projects">목록으로 ↑</a></div>
    </div>
  </article>`;
}

function renderEarlier(projects) {
  document.getElementById("earlier-list").innerHTML = projects.map((project) => `<article class="earlier-project ${project.image ? "" : "no-image"}">${project.image ? `<div class="earlier-image"><img src="${project.image}" alt="${text(project.name)} 서비스 소개" loading="lazy" decoding="async"></div>` : `<div class="earlier-monogram" aria-hidden="true">URL<br><span>CHECK</span></div>`}<div class="earlier-copy"><p class="earlier-meta">${text(project.period)} · ${text(project.role)}</p><h3>${text(project.name)}</h3><p>${text(project.description)}</p>${project.work ? `<p class="earlier-work">${text(project.work)}</p>` : ""}<p class="earlier-tech">${text(project.tech)}</p></div><p class="earlier-result">${text(project.result)}</p></article>`).join("");
}

function renderBackground(data) {
  document.getElementById("career-list").innerHTML = data.career.map((item) => `<article class="career-item"><p class="career-date">${text(item.date)}</p><h4>${text(item.title)}</h4><p>${text(item.text)}</p></article>`).join("");
  document.getElementById("activity-list").innerHTML = data.activities.map((item) => `<article class="activity-item"><h4>${text(item.title)}</h4><p>${text(item.text)}</p></article>`).join("");
  document.getElementById("awards-list").innerHTML = data.awards.map((award) => `<div class="award-row"><span>${text(award[0])}</span><strong>${text(award[1])}</strong><span>${text(award[2])}</span></div>`).join("");
  document.getElementById("skills-list").innerHTML = data.skills.map((skill) => `<div class="skill-row"><h3>${text(skill.name)}</h3><p>${text(skill.tools)}</p><p>${text(skill.context)}</p></div>`).join("");
}

function initNavigation() {
  const button = document.querySelector(".menu-toggle");
  const links = document.getElementById("nav-links");
  function closeMenu() { button.setAttribute("aria-expanded", "false"); links.classList.remove("is-open"); }
  button.addEventListener("click", () => { const open = button.getAttribute("aria-expanded") === "true"; button.setAttribute("aria-expanded", String(!open)); links.classList.toggle("is-open", !open); });
  links.addEventListener("click", (event) => { if (event.target.closest("a")) closeMenu(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") { closeMenu(); button.focus(); } });
  document.addEventListener("click", (event) => { if (!event.target.closest(".nav")) closeMenu(); });
  window.matchMedia("(min-width: 761px)").addEventListener("change", closeMenu);

  // 이전 배포에서 쓰던 링크도 해당 내용으로 이어 준다.
  const legacyAnchors = { experience: "fload", ventures: "forget", activities: "about" };
  function resolveLegacyHash() {
    const originalHash = location.hash.slice(1);
    if (legacyAnchors[originalHash]) {
      history.replaceState(null, "", `#${legacyAnchors[originalHash]}`);
      document.getElementById(legacyAnchors[originalHash])?.scrollIntoView({ behavior: "instant" });
    }
  }
  resolveLegacyHash();
  window.addEventListener("hashchange", resolveLegacyHash);
  if (location.hash) requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: "instant" }));
}

function initProjectNavigation() {
  const articles = [...document.querySelectorAll(".case-study")];
  const links = [...document.querySelectorAll("[data-project]")];
  const nav = document.getElementById("project-nav-links");
  let activeId = "";
  let queued = false;
  function update() {
    queued = false;
    const offset = document.querySelector(".site-header").offsetHeight + nav.offsetHeight + 48;
    const current = articles.findLast((article) => article.getBoundingClientRect().top <= offset) || articles[0];
    if (current.id === activeId) return;
    activeId = current.id;
    links.forEach((link) => {
      if (link.dataset.project === activeId) {
        link.setAttribute("aria-current", "location");
        // 좁은 화면에서도 현재 프로젝트 이름이 메뉴 안에 보이도록 한다.
        if (nav.scrollWidth > nav.clientWidth) nav.scrollTo({ left: link.offsetLeft - nav.offsetLeft - 20, behavior: "instant" });
      } else link.removeAttribute("aria-current");
    });
  }
  window.addEventListener("scroll", () => {
    if (!queued) { queued = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener("resize", () => { activeId = ""; update(); });
  update();
}

renderDirectory(PORTFOLIO_DATA.projects);
document.getElementById("case-studies").innerHTML = PORTFOLIO_DATA.projects.map(renderProject).join("");
renderEarlier(PORTFOLIO_DATA.earlier);
renderBackground(PORTFOLIO_DATA);
initNavigation();
initProjectNavigation();
