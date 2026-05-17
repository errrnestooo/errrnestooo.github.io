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
      "loading": "正在加载",
      "home.subtitle": "一段正在进行的人生，被安静地保存。",
      "home.meta.building": "日记 - 2026-03-29 - 建站",
      "home.meta.hello": "日记 - 2026-01-30 - 开始",
      "home.title.building": "搭建我的网站",
      "home.title.hello": "Hello World",
      "home.excerpt.building.1": "今天我继续把计划页面打磨成不只是本地笔记的东西：它开始像一个小系统，能记住旅行念头、公假，以及未来时间的形状。",
      "home.excerpt.building.2": "从 GitHub Pages 到 Cloudflare，这个网站正在变成我人生档案的一扇安静入口。",
      "home.excerpt.hello.1": "今天我正式开始用 songyangao.com 记录生活。希望十年后回头看，这个开始依然值得。",
      "home.excerpt.hello.2": "Ernest 的网站会在这里保存那些普通的日子，慢慢陪我往前走。",
      "home.read": "阅读全文 ->",
      "diary.title": "日记",
      "diary.subtitle": "小小的记录、心情，和以后还想回来看的片刻。",
      "diary.read": "阅读全文 ->",
      "diary.previous": "上一篇",
      "diary.next": "下一篇",
      "diary.minutes": "分钟阅读",
      "post.back": "返回日记",
      "post.next.building": "下一篇：搭建我的网站 ->",
      "post.prev.hello": "<- 上一篇：Hello World",
      "post.hello.meta": "新加坡 - 期待 - 1 分钟阅读 - #开始 #日记",
      "post.hello.p1": "今天我正式开始用 songyangao.com 记录生活。希望十年后回头看，我不会后悔今天做下的决定。",
      "post.hello.p2": "Ernest 的网站会把普通日子安静地放在一个地方，也陪我走很长一段路。",
      "post.building.title": "2026-03-29 - 搭建我的网站",
      "post.building.meta": "新加坡 - 专注 - 2 分钟阅读 - #网站 #计划 #学习",
      "post.building.p1": "今天我终于让 Plans 页面像一个真正的数据系统。它不再只是本地笔记，也开始具备让朋友看到计划的可能。",
      "post.building.p2": "从 GitHub Pages 到 Cloudflare Worker，再到 KV 存储，这是我第一次完整尝试为这个小网站做前后端分离。",
      "post.building.p3": "它仍然很简单，但这种简单现在有了框架。这个网站正在慢慢成为一个可以同时保存旅行念头、日记和未来计划的个人档案。",
      "stories.title": "小说",
      "stories.subtitle": "更长一点的文字：旅行片段、想象中的路、像日记一样的短篇，以及对人声的保存。",
      "stories.note": "未来的故事可以继续作为文章页加入，也可以从 markdown 风格的内容生成。",
      "stories.kicker.petra": "公路小说",
      "stories.kicker.rain": "日记小说",
      "stories.title.petra": "去佩特拉之前的路",
      "stories.title.rain": "丹戎巴葛的雨",
      "stories.excerpt.petra": "一条沙漠公路、一辆租来的车，以及抵达某个早已住进想象里的地方之前，那种奇异的安静。",
      "stories.excerpt.rain": "下班后的一个小时，城市变得会反光：玻璃楼、湿路面，还有一个跟着人回家的小念头。",
      "stories.tag.travel": "旅行",
      "stories.tag.road": "公路小说",
      "stories.tag.fiction": "虚构",
      "stories.tag.diary": "日记",
      "stories.readtime.petra": "6 分钟阅读",
      "stories.readtime.rain": "4 分钟阅读",
      "story.back": "返回小说",
      "story.next.rain": "下一篇：丹戎巴葛的雨 ->",
      "story.prev.petra": "<- 上一篇：去佩特拉之前的路",
      "story.petra.deck": "一条沙漠公路、一辆租来的车，以及抵达古老之地之前的安静。",
      "story.rain.deck": "下班以后，城市开始反光，并把一个人送回家。",
      "story.petra.p1": "去佩特拉的路并没有高声宣布自己。它没有像帷幕一样升起，也没有带着音乐抵达。它只是继续向前，苍白、耐心，穿过一片石头构成的国度。",
      "story.petra.p2": "我原以为沙漠会显得空旷。可它更像是被时间占据着：每一座山丘都仿佛记得什么，每一个转弯都带着比车里任何地图更古老的脚步声。",
      "story.petra.p3": "租来的车在辽阔土地上发出很小的、家常的声音：空调、转向灯、轮胎轻微的抱怨。这些普通声响反而让人安心，因为窗外的一切太大了，无法直接交谈。",
      "story.petra.p4": "在抵达佩特拉之前，有一段奇特的时刻：你已经近到相信自己快到了，却仍然属于路。我想，旅行最诚实的部分常常就在这里，不在地标，不在照片，而在尚未完成的靠近。",
      "story.petra.p5": "后来会有石壁、狭窄通道，以及从阴影里发光的第一眼立面。但在那之前，只有一个温暖的下午、一瓶在副驾驶座下滚动的水，和一种世界短暂地比恐惧更古老的感觉。",
      "story.rain.p1": "他到丹戎巴葛的时候，雨已经让城市变得更诚实。玻璃不再假装透明，路面接住了所有递给它的光。",
      "story.rain.p2": "他站在遮雨棚下，和其他人一起临时成为天气的居民。没有人说话。手机在各自手里亮着，像一间间小小的私人房间。",
      "story.rain.p3": "这一天并没有戏剧性地困难，只是太满了：会议、数字、办公室里礼貌的天气。但雨一来，他身体里某个地方就松开了一点。",
      "story.rain.p4": "路对面，一辆出租车缓慢穿过红绿灯的倒影。有一秒钟，整座城市像是画在水上。他想，也许记忆也是这样：保存的不是事物本身，而是它留下的微光。",
      "story.rain.p5": "雨小下来的时候，他朝地铁站走去。鞋湿了，包也比刚才更重。但这个傍晚给了他一个可以带回家的小句子，而此刻这已经足够。",
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
      "travel.completed": "已完成",
      "travel.planned": "计划中",
      "plans.title": "计划",
      "plans.year": "年份",
      "plans.month": "月份",
      "plans.today": "今天",
      "plans.clearMonth": "清空本月草稿",
      "plans.clearAll": "清空全部草稿",
      "plans.helper": "点击或拖动日期加入/取消 Draft；按住 Shift 可连续选择同月区间。PH 表示新加坡公假。",
      "plans.sync": "云同步准备：API + 本地草稿 + JSON 备份",
      "plans.colorAmber": "琥珀色标签",
      "plans.colorCocoa": "可可色标签",
      "plans.colorMist": "雾蓝色标签",
      "plans.colorOlive": "橄榄色标签",
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
      "plans.summaryYear": "年份",
      "plans.summaryDays": "天数",
      "plans.summaryDetails": "明细",
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
      "about.basedValue": "新加坡",
      "about.work": "工作",
      "about.interests": "兴趣",
      "about.interestsValue": "旅行 - 写作 - 学习",
      "about.milestones": "人生节点",
      "about.timeline.birth": "出生，时间安静地开始往前走。",
      "about.timeline.bit": "本科几年：学习、成长，也开始离开熟悉的房间。",
      "about.timeline.smu": "在新加坡读硕士的日子。",
      "about.timeline.pwc": "Senior Associate，慢慢搭建自己的职业生活。",
      "about.timeline.site": "songyangao.com 成为个人生活档案。",
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
      "loading": "Loading",
      "home.subtitle": "A life in progress, kept quietly.",
      "home.meta.building": "Diary - 2026-03-29 - Building",
      "home.meta.hello": "Diary - 2026-01-30 - Beginning",
      "home.title.building": "Building My Website",
      "home.title.hello": "Hello World",
      "home.excerpt.building.1": "Today I kept shaping the plans page into something more than a local note: a small system that can remember travel ideas, public holidays, and the shape of future time.",
      "home.excerpt.building.2": "From GitHub Pages to Cloudflare, this site is becoming a quiet front door to my life archive.",
      "home.excerpt.hello.1": "Today I officially started using songyangao.com to record life. I hope that ten years later, looking back, this beginning still feels worth keeping.",
      "home.excerpt.hello.2": "Ernest's website will stay here, saving the ordinary days with care.",
      "home.read": "Read full entry ->",
      "diary.title": "Diary",
      "diary.subtitle": "Small records, moods, and moments worth returning to.",
      "diary.read": "Read full entry ->",
      "diary.previous": "Previous",
      "diary.next": "Next",
      "diary.minutes": "min read",
      "post.back": "<- Back to Diary",
      "post.next.building": "Next entry: Building My Website ->",
      "post.prev.hello": "<- Previous entry: Hello World",
      "post.hello.meta": "Singapore - Hopeful - 1 min read - #beginning #journal",
      "post.hello.p1": "Today I officially started using songyangao.com to record life. I hope that ten years later, looking back, I will not regret the decision I made today.",
      "post.hello.p2": "Ernest's website will keep ordinary days in one quiet place, and walk with me for a long time.",
      "post.building.title": "2026-03-29 - Building My Website",
      "post.building.meta": "Singapore - Focused - 2 min read - #website #plans #learning",
      "post.building.p1": "Today I finally made the Plans page feel like a real data system. It is no longer only a local note; it can become something friends can see too.",
      "post.building.p2": "From GitHub Pages to Cloudflare Worker, and then toward KV storage, this is my first complete attempt at separating the front end and the back end for this little website.",
      "post.building.p3": "It still feels simple, but the simplicity now has a frame. The site is slowly becoming a personal archive that can hold travel ideas, diary entries, and future plans together.",
      "stories.title": "Stories",
      "stories.subtitle": "Longer pieces from the same archive: travel fragments, imagined roads, diary-shaped essays, and small attempts to keep a human voice on the page.",
      "stories.note": "Future stories can be added as simple article pages or generated later from markdown-style entries.",
      "stories.kicker.petra": "Road Novel",
      "stories.kicker.rain": "Diary Fiction",
      "stories.title.petra": "The Road Before Petra",
      "stories.title.rain": "Rain at Tanjong Pagar",
      "stories.excerpt.petra": "A desert road, a rental car, and the strange quiet before arriving at a place that has already lived inside your imagination for years.",
      "stories.excerpt.rain": "In the hour after work, the city becomes reflective: glass towers, wet pavement, and one small thought that follows a person home.",
      "stories.tag.travel": "Travel",
      "stories.tag.road": "Road Novel",
      "stories.tag.fiction": "Fiction",
      "stories.tag.diary": "Diary",
      "stories.readtime.petra": "6 min read",
      "stories.readtime.rain": "4 min read",
      "story.back": "<- Stories",
      "story.next.rain": "Next story: Rain at Tanjong Pagar ->",
      "story.prev.petra": "<- Previous story: The Road Before Petra",
      "story.petra.deck": "A desert road, a rental car, and the quiet before arriving somewhere ancient.",
      "story.rain.deck": "After work, the city turns reflective and follows one person home.",
      "story.petra.p1": "The road to Petra did not announce itself. It did not rise like a curtain or arrive with music. It simply continued, pale and patient, through a country of stone.",
      "story.petra.p2": "I had expected the desert to feel empty. Instead, it felt occupied by time. Every hill seemed to be remembering something, every turn in the road carrying the pressure of footsteps older than any map in the car.",
      "story.petra.p3": "The rental car made a small domestic sound against the wide land. Air-conditioning, turn signal, the soft complaint of tires. These ordinary noises became comforting because everything outside the window was too large to speak to directly.",
      "story.petra.p4": "Before Petra, there is a strange hour when you are close enough to believe in arrival but still far enough to belong to the road. I think travel lives there most honestly: not in the landmark, not in the photograph, but in the unfinished approach.",
      "story.petra.p5": "Later, there would be stone walls and narrow passages and the first glimpse of a facade glowing through shadow. But before all that, there was this: a warm afternoon, a bottle of water rolling under the passenger seat, and the feeling that the world had briefly become older than fear.",
      "story.rain.p1": "By the time he reached Tanjong Pagar, the rain had already made the city more honest. Glass stopped pretending to be invisible. Pavement held every light it was given.",
      "story.rain.p2": "He stood under the shelter with other people who had also become temporary citizens of the weather. No one spoke. Their phones glowed in their hands like small private rooms.",
      "story.rain.p3": "The day had not been difficult in any dramatic way. It had only been full: meetings, numbers, the polite weather of office conversation. Still, when rain arrived, something inside him loosened.",
      "story.rain.p4": "Across the road, a taxi moved slowly through the reflection of a traffic light. For a second it looked as if the whole city had been painted on water, and he wondered whether memory worked the same way: not preserving the thing itself, but the shimmer it left behind.",
      "story.rain.p5": "When the rain softened, he walked toward the station. His shoes were wet. His bag felt heavier than before. But the evening had given him one small sentence to carry home, and for now that was enough.",
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
      "travel.completed": "completed",
      "travel.planned": "planned",
      "plans.title": "Plans",
      "plans.year": "Year",
      "plans.month": "Month",
      "plans.today": "Today",
      "plans.clearMonth": "Clear Draft (This Month)",
      "plans.clearAll": "Clear Draft (All)",
      "plans.helper": "Click or drag dates to add/remove Draft days. Hold Shift to select a same-month range. PH marks Singapore public holidays.",
      "plans.sync": "Cloud sync ready: API + local draft + JSON backup",
      "plans.colorAmber": "Amber label",
      "plans.colorCocoa": "Cocoa label",
      "plans.colorMist": "Mist label",
      "plans.colorOlive": "Olive label",
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
      "plans.summaryYear": "Year",
      "plans.summaryDays": "Days",
      "plans.summaryDetails": "Details",
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
      "about.basedValue": "Singapore",
      "about.work": "Work",
      "about.interests": "Interests",
      "about.interestsValue": "Travel - Writing - Learning",
      "about.milestones": "Life Milestones",
      "about.timeline.birth": "Born, and the clock quietly began.",
      "about.timeline.bit": "Bachelor's years: study, growth, and leaving familiar rooms.",
      "about.timeline.smu": "Master's years in Singapore.",
      "about.timeline.pwc": "Senior Associate, building a professional life.",
      "about.timeline.site": "songyangao.com becomes a personal life archive.",
      "about.progress": "Life Progress",
      "about.assumption": "Assumption: I will live to 80 years old.",
      "about.age": "Current age",
      "about.completed": "Life completed",
      "about.daysLived": "Days lived",
      "about.daysLeft": "Estimated days remaining",
      "about.progressBar": "Progress bar"
    }
  };

  function currentLang(){
    const lang = localStorage.getItem(langKey) || "zh";
    return translations[lang] ? lang : "zh";
  }

  function t(key, lang = currentLang()){
    return translations[lang]?.[key] || translations.en[key] || key;
  }

  window.ErnestI18n = { t, lang: currentLang, apply: applyLanguage };

  function translateNav(lang){
    const map = {
      "index.html": "nav.home",
      "": "nav.home",
      "diary.html": "nav.diary",
      "stories.html": "nav.stories",
      "travel.html": "nav.travel",
      "plans.html": "nav.plans",
      "about.html": "nav.about"
    };
    document.querySelectorAll(".nav a").forEach((link) => {
      const file = (link.getAttribute("href") || "").split("/").pop();
      const key = map[file];
      if(key) link.textContent = t(key, lang);
    });
  }

  function applyLanguage(lang = currentLang()){
    const safeLang = translations[lang] ? lang : "zh";
    localStorage.setItem(langKey, safeLang);
    document.documentElement.lang = safeLang === "zh" ? "zh-CN" : "en";
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = t(node.getAttribute("data-i18n"), safeLang);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
      node.setAttribute("placeholder", t(node.getAttribute("data-i18n-placeholder"), safeLang));
    });
    document.querySelectorAll("[data-lang-option]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.langOption === safeLang);
    });
    translateNav(safeLang);
    applyTheme(localStorage.getItem(storageKey) || "light");
    window.dispatchEvent(new CustomEvent("ernest:languagechange", { detail: { lang: safeLang } }));
  }

  function applyTheme(theme){
    document.body.classList.toggle("dark-mode", theme === "dark");
    const btn = document.querySelector("[data-theme-toggle]");
    if(btn) btn.textContent = theme === "dark" ? t("theme.light") : t("theme.dark");
  }

  function buildTools(){
    const tools = document.createElement("div");
    tools.className = "site-tools";
    tools.innerHTML = `
      <div class="language-switch" aria-label="Language switch">
        <button type="button" data-lang-option="zh">中文</button>
        <button type="button" data-lang-option="en">EN</button>
      </div>
      <button class="theme-toggle" type="button" data-theme-toggle>${t("theme.dark")}</button>
      <section class="music-player" aria-label="Floating music player">
        <div class="music-player-title">
          <span data-i18n="music.title">${t("music.title")}</span>
          <span id="musicState" data-i18n="music.paused">${t("music.paused")}</span>
        </div>
        <input id="musicVolume" type="range" min="0" max="100" value="36" aria-label="Ambient volume placeholder">
      </section>
      <div class="visitor-counter" id="visitorCounter"><span data-i18n="visits">${t("visits")}</span>: 1</div>
    `;
    document.body.appendChild(tools);

    const visits = Number(localStorage.getItem(countKey) || "0") + 1;
    localStorage.setItem(countKey, String(visits));
    document.getElementById("visitorCounter").innerHTML = `<span data-i18n="visits">${t("visits")}</span>: ${visits}`;

    document.getElementById("musicVolume").addEventListener("input", (event) => {
      const key = Number(event.target.value) === 0 ? "music.muted" : "music.ready";
      document.getElementById("musicState").textContent = t(key);
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
    veil.innerHTML = `<div class="loading-mark" aria-label="${t("loading")}"></div>`;
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
