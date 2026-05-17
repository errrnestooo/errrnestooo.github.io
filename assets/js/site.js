(function(){
  const storageKey = "ernest_journal_theme";
  const countKey = "ernest_journal_visits";

  function applyTheme(theme){
    document.body.classList.toggle("dark-mode", theme === "dark");
    const btn = document.querySelector("[data-theme-toggle]");
    if(btn) btn.textContent = theme === "dark" ? "Light" : "Dark";
  }

  function buildTools(){
    const tools = document.createElement("div");
    tools.className = "site-tools";
    tools.innerHTML = `
      <button class="theme-toggle" type="button" data-theme-toggle>Dark</button>
      <section class="music-player" aria-label="Floating music player">
        <div class="music-player-title">
          <span>Quiet Room</span>
          <span id="musicState">Paused</span>
        </div>
        <input id="musicVolume" type="range" min="0" max="100" value="36" aria-label="Ambient volume placeholder">
      </section>
      <div class="visitor-counter" id="visitorCounter">Visits: 1</div>
    `;
    document.body.appendChild(tools);

    const visits = Number(localStorage.getItem(countKey) || "0") + 1;
    localStorage.setItem(countKey, String(visits));
    document.getElementById("visitorCounter").textContent = `Visits on this browser: ${visits}`;

    document.getElementById("musicVolume").addEventListener("input", (event) => {
      const state = Number(event.target.value) === 0 ? "Muted" : "Ready";
      document.getElementById("musicState").textContent = state;
    });

    document.querySelector("[data-theme-toggle]").addEventListener("click", () => {
      const next = document.body.classList.contains("dark-mode") ? "light" : "dark";
      localStorage.setItem(storageKey, next);
      applyTheme(next);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const veil = document.createElement("div");
    veil.className = "loading-veil";
    veil.innerHTML = `<div class="loading-mark" aria-label="Loading"></div>`;
    document.body.prepend(veil);

    buildTools();
    applyTheme(localStorage.getItem(storageKey) || "light");

    requestAnimationFrame(() => {
      document.body.classList.add("is-loaded");
      veil.classList.add("is-hidden");
      setTimeout(() => veil.remove(), 420);
    });
  });
})();
