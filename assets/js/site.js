(function(){
  const storageKey = "ernest_journal_theme";
  const countKey = "ernest_journal_visits";
  const langKey = "ernest_journal_lang";

  const translations = {
    zh: {
      "nav.home": "首页",
      "nav.diary": "日记",
      "nav.stories": "小说",
      "nav.travel": "旅行",
      "nav.plans": "计划",
      "nav.about": "关于",
      "theme.dark": "深色",
      "theme.light": "浅色",
      "music.title": "安静房间",
      "music.paused": "暂停",
      "music.ready": "就绪",
      "music.muted": "静音",
      "visits": "本浏览器访问次数",
      "home.subtitle": "一段正在进行的人生，被安静地保存。",
      "home.meta.building": "日记 - 2026-03-29 - 建站",
      "home.meta.hello": "日记 - 2026-01-30 - 开始",
      "home.read": "阅读全文 ->",
      "diary.title": "日记",
      "diary.subtitle": "小小的记录、心情，和以后还想回来看的片刻。",
      "diary.read": "阅读全文 ->",
      "diary.previous": "上一篇",
      "diary.next": "下一篇",
      "stories.title": "小说",
      "stories.subtitle": "更长一点的文字：旅行片段、想象中的路、像日记一样的短篇，以及对人声的保存。",
      "stories.note": "未来的故事可以继续作为文章页加入，也可以从 markdown 风格的内容生成。",
      "stories.readtime.petra": "6 分钟阅读",
      "stories.readtime.rain": "4 分钟阅读",
      "travel.title": "旅行地图",
      "travel.subtitle": "去过的地方，和将要抵达的地方。",
      "travel.continent": "大洲",
      "travel.year": "年份",
      "travel.allContinents": "所有大洲",
      "travel.allYears": "所有年份",
      "travel.details": "查看详情",
      "travel.hide": "收起详情",
      "travel.memory": "记忆",
      "travel.budget": "预算",
      "travel.footer": "每一次旅行都会留下痕迹。",
      "plans.title": "计划",
      "plans.year": "年份",
      "plans.month": "月份",
      "plans.today": "今天",
      "plans.clearMonth": "清空本月草稿",
      "plans.clearAll": "清空全部草稿",
      "plans.helper": "点击或拖动日期加入/取消 Draft；按住 Shift 可连续选择同月区间。PH 表示新加坡公假。",
      "plans.sync": "云同步准备：API + 本地草稿 + JSON 备份",
      "plans.export": "导出 JSON",
      "plans.import": "导入 JSON",
      "plans.draftTitle": "草稿计划",
      "plans.draftHelp": "先在日历里选择日期，再填写名称、颜色和备注，保存成一条计划。",
      "plans.save": "保存计划",
      "plans.update": "更新计划",
      "plans.cancel": "取消编辑",
      "plans.savedTitle": "已保存计划",
      "plans.savedHelp": "每次保存是一条计划。你可以继续新增、编辑或删除。",
      "plans.summaryTitle": "年度汇总",
      "plans.summaryHelp": "按年份汇总所有已保存计划的日期：总天数和明细。",
      "plans.statsTitle": "旅行统计",
      "plans.statsHelp": "一个安静的计划仪表盘，用来查看年度假期使用和未来 AI/云功能。",
      "plans.statPlans": "已保存计划",
      "plans.statDays": "计划天数",
      "plans.statThisYear": "今年",
      "plans.statPH": "已显示公假",
      "plans.future": "未来结构已预留：AI 旅行总结、AI 日记助手、行程生成器、Cloudflare KV 同步和登录系统都可以接入同一份计划数据。",
      "about.title": "关于 Ernest",
      "about.subtitle": "一个用来记住自己从哪里开始的小页面。",
      "about.self": "自我介绍",
      "about.intro": "Hi，我是 Ernest。我用这个网站记录日记、旅行和计划：把回忆、想法和成长放在一个安静的地方。",
      "about.birthday": "生日",
      "about.based": "所在地",
      "about.work": "工作",
      "about.interests": "兴趣",
      "about.milestones": "人生节点",
      "about.progress": "生命进度",
      "about.assumption": "假设：我会活到 80 岁。",
      "about.age": "当前年龄",
      "about.completed": "已完成",
      "about.daysLived": "已生活天数",
      "about.daysLeft": "预计剩余天数",
      "about.progressBar": "进度条"
    },
    en: {
      "nav.home": "Home",
      "nav.diary": "Diary",
      "nav.stories": "Stories",
      "nav.travel": "Travel",
      "nav.plans": "Plans",
      "nav.about": "About",
      "theme.dark": "Dark",
      "theme.light": "Light",
      "music.title": "Quiet Room",
      "music.paused": "Paused",
      "music.ready": "Ready",
      "music.muted": "Muted",
      "visits": "Visits on this browser",
      "home.subtitle": "A life in progress, kept quietly.",
      "home.meta.building": "Diary - 2026-03-29 - Building",
      "home.meta.hello": "Diary - 2026-01-30 - Beginning",
      "home.read": "Read full entry ->",
      "diary.title": "Diary",
      "diary.subtitle": "Small records, moods, and moments worth returning to.",
      "diary.read": "Read full entry ->",
      "diary.previous": "Previous",
      "diary.next": "Next",
      "stories.title": "Stories",
      "stories.subtitle": "Longer pieces from the same archive: travel fragments, imagined roads, diary-shaped essays, and small attempts to keep a human voice on the page.",
      "stories.note": "Future stories can be added as simple article pages or generated later from markdown-style entries.",
      "stories.readtime.petra": "6 min read",
      "stories.readtime.rain": "4 min read",
      "travel.title": "Travel Map",
      "travel.subtitle": "Places I have been - places I will go.",
      "travel.continent": "Continent",
      "travel.year": "Year",
      "travel.allContinents": "All continents",
      "travel.allYears": "All years",
      "travel.details": "View details",
      "travel.hide": "Hide details",
      "travel.memory": "Memory",
      "travel.budget": "Budget",
      "travel.footer": "Every journey leaves a mark.",
      "plans.title": "Plans",
      "plans.year": "Year",
      "plans.month": "Month",
      "plans.today": "Today",
      "plans.clearMonth": "Clear Draft (This Month)",
      "plans.clearAll": "Clear Draft (All)",
      "plans.helper": "Click or drag dates to add/remove Draft days. Hold Shift to select a same-month range. PH marks Singapore public holidays.",
      "plans.sync": "Cloud sync ready: API + local draft + JSON backup",
      "plans.export": "Export JSON",
      "plans.import": "Import JSON",
      "plans.draftTitle": "Draft Plan",
      "plans.draftHelp": "Choose dates in the calendar, then add a name, color, and note before saving.",
      "plans.save": "Save Plan",
      "plans.update": "Update Plan",
      "plans.cancel": "Cancel Edit",
      "plans.savedTitle": "Saved Plans",
      "plans.savedHelp": "Each save creates one plan. You can keep adding, editing, or deleting.",
      "plans.summaryTitle": "Yearly Summary",
      "plans.summaryHelp": "Summarizes all saved plan dates by year: total days and details.",
      "plans.statsTitle": "Travel Statistics",
      "plans.statsHelp": "A quiet planning dashboard for annual vacation usage and future AI/cloud features.",
      "plans.statPlans": "Saved plans",
      "plans.statDays": "Planned days",
      "plans.statThisYear": "This year",
      "plans.statPH": "Public holidays shown",
      "plans.future": "Future structure prepared: AI travel summaries, AI diary assistant, itinerary generator, Cloudflare KV sync, and login can connect to the same plan objects without changing the page layout.",
      "about.title": "About Ernest",
      "about.subtitle": "A small page to remember where I started.",
      "about.self": "Self Introduction",
      "about.intro": "Hi, I'm Ernest. I use this website to record diaries, travels, and plans: a quiet space to keep memories, ideas, and growth in one place.",
      "about.birthday": "Birthday",
      "about.based": "Based in",
      "about.work": "Work",
      "about.interests": "Interests",
      "about.milestones": "Life Milestones",
      "about.progress": "Life Progress",
      "about.assumption": "Assumption: I will live to 80 years old.",
      "about.age": "Current age",
      "about.completed": "Life completed",
      "about.daysLived": "Days lived",
      "about.daysLeft": "Estimated days remaining",
      "about.progressBar": "Progress bar"
    }
  };

  window.ErnestI18n = {
    t(key){
      const lang = localStorage.getItem(langKey) || "zh";
      return translations[lang]?.[key] || translations.en[key] || key;
    },
    apply: applyLanguage
  };

  function currentLang(){
    const lang = localStorage.getItem(langKey) || "zh";
    return translations[lang] ? lang : "zh";
  }

  function translateNav(lang){
    const map = {
      "index.html": "nav.home",
      "diary.html": "nav.diary",
      "stories.html": "nav.stories",
      "travel.html": "nav.travel",
      "plans.html": "nav.plans",
      "about.html": "nav.about"
    };
    document.querySelectorAll(".nav a").forEach((link) => {
      const href = link.getAttribute("href") || "";
      const file = href.split("/").pop();
      const key = map[file];
      if(key) link.textContent = translations[lang][key];
    });
  }

  function applyLanguage(lang = currentLang()){
    localStorage.setItem(langKey, lang);
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      if(translations[lang][key]) node.textContent = translations[lang][key];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
      const key = node.getAttribute("data-i18n-placeholder");
      if(translations[lang][key]) node.setAttribute("placeholder", translations[lang][key]);
    });
    translateNav(lang);
    document.querySelectorAll("[data-lang-option]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.langOption === lang);
    });
    applyTheme(localStorage.getItem(storageKey) || "light");
  }

  function applyTheme(theme){
    document.body.classList.toggle("dark-mode", theme === "dark");
    const btn = document.querySelector("[data-theme-toggle]");
    if(btn) btn.textContent = theme === "dark" ? translations[currentLang()]["theme.light"] : translations[currentLang()]["theme.dark"];
  }

  function buildTools(){
    const tools = document.createElement("div");
    tools.className = "site-tools";
    tools.innerHTML = `
      <div class="language-switch" aria-label="Language switch">
        <button type="button" data-lang-option="zh">中文</button>
        <button type="button" data-lang-option="en">EN</button>
      </div>
      <button class="theme-toggle" type="button" data-theme-toggle>Dark</button>
      <section class="music-player" aria-label="Floating music player">
        <div class="music-player-title">
          <span data-i18n="music.title">Quiet Room</span>
          <span id="musicState" data-i18n="music.paused">Paused</span>
        </div>
        <input id="musicVolume" type="range" min="0" max="100" value="36" aria-label="Ambient volume placeholder">
      </section>
      <div class="visitor-counter" id="visitorCounter">Visits: 1</div>
    `;
    document.body.appendChild(tools);

    const visits = Number(localStorage.getItem(countKey) || "0") + 1;
    localStorage.setItem(countKey, String(visits));
    document.getElementById("visitorCounter").innerHTML = `<span data-i18n="visits">Visits on this browser</span>: ${visits}`;

    document.getElementById("musicVolume").addEventListener("input", (event) => {
      const state = Number(event.target.value) === 0 ? translations[currentLang()]["music.muted"] : translations[currentLang()]["music.ready"];
      document.getElementById("musicState").textContent = state;
    });

    document.querySelectorAll("[data-lang-option]").forEach((btn) => {
      btn.addEventListener("click", () => applyLanguage(btn.dataset.langOption));
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
    applyLanguage(currentLang());
    applyTheme(localStorage.getItem(storageKey) || "light");

    requestAnimationFrame(() => {
      document.body.classList.add("is-loaded");
      veil.classList.add("is-hidden");
      setTimeout(() => veil.remove(), 420);
    });
  });
})();
