(function(){
  const themeKey = "ernest_journal_theme";
  const countKey = "ernest_journal_visits";
  const i18n = window.ErnestI18n;

  function t(key){
    return i18n ? i18n.t(key) : key;
  }

  function currentLang(){
    return i18n ? i18n.lang() : "zh";
  }

  function applyTheme(theme){
    document.body.classList.toggle("dark-mode", theme === "dark");
    const btn = document.querySelector("[data-theme-toggle]");
    if(btn) btn.textContent = theme === "dark" ? t("theme.light") : t("theme.dark");
  }

  function pagePrefix(){
    const path = window.location.pathname.replace(/\\/g, "/");
    return /\/posts\//.test(path) ? "../" : "";
  }

  function languageSwitchMarkup(className){
    return `
      <span class="${className}" aria-label="Language switch">
        <button type="button" data-lang-option="zh">涓枃</button>
        <span>|</span>
        <button type="button" data-lang-option="en">EN</button>
      </span>
    `;
  }

  function translateNav(){
    const map = {
      "index.html": "nav.home",
      "": "nav.home",
      "diary.html": "nav.diary",
      "stories.html": "nav.stories",
      "field-notes.html": "nav.notes",
      "now.html": "nav.now",
      "timeline.html": "nav.timeline",
      "travel.html": "nav.travel",
      "travel-map.html": "nav.map",
      "library.html": "nav.library",
      "photos.html": "nav.photos",
      "life.html": "nav.life",
      "plans.html": "nav.plans",
      "about.html": "nav.about"
    };
    document.querySelectorAll(".nav a").forEach((link) => {
      const file = (link.getAttribute("href") || "").split("/").pop();
      if(map[file]) link.textContent = t(map[file]);
    });
  }

  function buildTools(){
    if(document.querySelector(".site-tools")) return;
    const tools = document.createElement("aside");
    tools.className = "site-tools";
    tools.innerHTML = `
      ${languageSwitchMarkup("language-switch")}
      <button class="theme-toggle" type="button" data-theme-toggle>${t("theme.dark")}</button>
      <div class="visitor-counter" id="visitorCounter"><span data-i18n="visits">${t("visits")}</span>: 1</div>
    `;
    document.body.appendChild(tools);

    const ambientDock = document.createElement("aside");
    ambientDock.className = "ambient-dock";
    ambientDock.setAttribute("aria-label", "Ambient sound controls");
    ambientDock.innerHTML = `
      <button class="ambient-toggle" type="button" data-ambient-toggle aria-expanded="false" aria-controls="ambientPanel">
        <span data-zh="\u73af\u5883" data-en="Ambience">\u73af\u5883</span>
      </button>
      <section class="ambient-panel music-player" id="ambientPanel" aria-label="Quiet Room">
        <div class="music-player-title">
          <span data-i18n="music.title">${t("music.title")}</span>
          <span id="musicState" data-i18n="music.paused">${t("music.paused")}</span>
        </div>
        <button class="ambient-close" type="button" data-ambient-close aria-label="Minimize ambient panel">\u00d7</button>
        <div class="ambient-presets">
          <button type="button" data-ambient="rain" data-i18n="music.preset.rain">${t("music.preset.rain")}</button>
          <button type="button" data-ambient="cafe" data-i18n="music.preset.cafe">${t("music.preset.cafe")}</button>
          <button type="button" data-ambient="train" data-i18n="music.preset.train">${t("music.preset.train")}</button>
          <button type="button" data-ambient="city" data-i18n="music.preset.city">${t("music.preset.city")}</button>
          <button type="button" data-ambient="desert" data-i18n="music.preset.desert">${t("music.preset.desert")}</button>
        </div>
        <input id="musicVolume" type="range" min="0" max="100" value="36" data-i18n-aria="music.title" aria-label="Quiet Room">
      </section>
    `;
    document.body.appendChild(ambientDock);

    const nav = document.querySelector(".nav");
    if(nav && !nav.querySelector(".nav-language-switch")){
      nav.insertAdjacentHTML("beforeend", languageSwitchMarkup("nav-language-switch"));
    }

    const visits = Number(localStorage.getItem(countKey) || "0") + 1;
    localStorage.setItem(countKey, String(visits));
    document.getElementById("visitorCounter").innerHTML = `<span data-i18n="visits">${t("visits")}</span>: ${visits}`;

    document.querySelectorAll("[data-lang-option]").forEach((btn) => {
      btn.addEventListener("click", () => i18n && i18n.apply(btn.dataset.langOption));
    });

    document.querySelector("[data-theme-toggle]").addEventListener("click", () => {
      const next = document.body.classList.contains("dark-mode") ? "light" : "dark";
      localStorage.setItem(themeKey, next);
      applyTheme(next);
    });

    const ambientToggle = ambientDock.querySelector("[data-ambient-toggle]");
    const ambientClose = ambientDock.querySelector("[data-ambient-close]");
    let ambientOpen = window.matchMedia("(min-width: 1280px)").matches;
    function renderAmbientState(){
      ambientDock.classList.toggle("is-expanded", ambientOpen);
      ambientDock.classList.toggle("is-collapsed", !ambientOpen);
      ambientDock.dataset.ambientOpen = ambientOpen ? "true" : "false";
      ambientToggle.setAttribute("aria-expanded", ambientOpen ? "true" : "false");
    }
    function setAmbientOpen(nextOpen){
      ambientOpen = Boolean(nextOpen);
      renderAmbientState();
    }
    renderAmbientState();
    ambientToggle.addEventListener("click", () => setAmbientOpen(!ambientOpen));
    ambientClose.addEventListener("click", () => setAmbientOpen(false));
    window.addEventListener("resize", () => {
      if(window.innerWidth <= 1024 && ambientOpen) setAmbientOpen(false);
    });

    document.querySelectorAll("[data-ambient]").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("[data-ambient]").forEach((item) => item.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById("musicState").textContent = t(`music.preset.${btn.dataset.ambient}`);
      });
    });

    document.getElementById("musicVolume").addEventListener("input", (event) => {
      if(Number(event.target.value) === 0){
        document.getElementById("musicState").textContent = t("music.muted");
      }
    });
  }

  function setupFadeObserver(){
    const items = document.querySelectorAll(".fade-in, .journal-card, .timeline-item, .photo-tile");
    if(!("IntersectionObserver" in window)){
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting){
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
  }

  document.addEventListener("DOMContentLoaded", () => {
    const veil = document.createElement("div");
    veil.className = "loading-veil";
    veil.innerHTML = `<div class="loading-mark" aria-label="${t("loading")}"></div>`;
    document.body.prepend(veil);

    buildTools();
    translateNav();
    if(i18n) i18n.apply(currentLang());
    applyTheme(localStorage.getItem(themeKey) || "light");
    setupFadeObserver();

    requestAnimationFrame(() => {
      document.body.classList.add("is-loaded");
      veil.classList.add("is-hidden");
      setTimeout(() => veil.remove(), 420);
    });
  });

  window.addEventListener("ernest:languagechange", () => {
    translateNav();
    applyTheme(localStorage.getItem(themeKey) || "light");
  });
})();
