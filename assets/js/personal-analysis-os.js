(function(){
  const i18n = window.ErnestI18n;
  const DOB = new Date(1996, 0, 19);
  const LIFE_EXPECTANCY = 80;
  const SINGAPORE_START = new Date(2021, 7, 1);

  const model = {
    traits: [
      [{ zh:"野心", en:"Ambition" }, 86],
      [{ zh:"独处", en:"Solitude" }, 74],
      [{ zh:"移动", en:"Movement" }, 91],
      [{ zh:"纪律", en:"Discipline" }, 88],
      [{ zh:"情感强度", en:"Emotional intensity" }, 79],
      [{ zh:"好奇心", en:"Curiosity" }, 93],
      [{ zh:"浪漫性", en:"Romanticism" }, 82],
      [{ zh:"韧性", en:"Resilience" }, 84]
    ],
    values: [
      [{ zh:"长期性", en:"Long-termness" }, { zh:"你会反复把生活折回到十年尺度：身份、房子、职业、网站、记录，都不是一次性成果，而是可以持续生长的结构。", en:"You keep folding life back into a ten-year horizon: identity, housing, career, the website, and records are not one-off outputs, but structures that can keep growing." }],
      [{ zh:"可证明的能力", en:"Provable competence" }, { zh:"简历、证书、SCAQ、工作履历对你很重要，因为它们把不安转换成可被世界承认的证据。", en:"The resume, credentials, SCAQ, and work history matter because they turn unease into evidence the world can recognize." }],
      [{ zh:"温柔的归属", en:"Tender belonging" }, { zh:"你想要的不是静止，而是一个能让你离开后仍然愿意回来的地方。", en:"You do not want stillness. You want a place warm enough to return to after leaving." }]
    ],
    emotions: [
      [{ zh:"行动后的安静", en:"Quiet after action" }, { zh:"你常在完成、抵达、记录之后感到安定。焦虑不一定靠想明白解决，常常靠把事情推进一点解决。", en:"You often settle after finishing, arriving, or recording. Anxiety is not always solved by thinking harder; often it is solved by moving something forward." }],
      [{ zh:"夜晚与交通工具", en:"Night and transport" }, { zh:"机场、火车、夜路会让情绪变得清晰。它们给你一种临时脱离日常、重新看见自己的距离。", en:"Airports, trains, and night roads clarify emotion. They give you temporary distance from daily life and let you see yourself again." }],
      [{ zh:"亲密感的延迟", en:"Delayed intimacy" }, { zh:"很多情绪不是在现场立刻出现，而是在回看、写下、整理之后慢慢显影。", en:"Many feelings do not arrive in the moment. They develop later, through reviewing, writing, and arranging memory." }]
    ],
    axis: [
      [{ zh:"野心", en:"Ambition" }, { zh:"稳定", en:"Stability" }, 58, { zh:"野心推动你上升，稳定感决定你能不能长期承受上升。", en:"Ambition moves you upward; stability determines whether you can bear the climb." }],
      [{ zh:"移动", en:"Movement" }, { zh:"扎根", en:"Rootedness" }, 62, { zh:"移动给你氧气，扎根给你重量。真正适合你的生活需要两者共存。", en:"Movement gives you oxygen; rootedness gives you weight. The life that fits you needs both." }],
      [{ zh:"记录", en:"Archive" }, { zh:"体验", en:"Experience" }, 54, { zh:"你很会保存生活，但要小心不要让记录替代生活本身。", en:"You are good at preserving life, but need to avoid letting the archive replace the experience." }]
    ],
    movement: {
      psychology: [{ zh:"移动心理", en:"Movement psychology" }, { zh:"旅行对你不是简单逃离，而是换一个视角确认自己仍然自由。你会被边境、车站、海、旧城和夜晚吸引，因为它们都像人生的过渡地带。", en:"Travel is not simple escape for you; it is a way to confirm that you are still free. Borders, stations, seas, old cities, and nights attract you because they are transitional spaces." }],
      loneliness: [{ zh:"孤独模式", en:"Loneliness pattern" }, { zh:"孤独在你这里不是纯粹负面。它经常变成观察力、写作欲和审美敏感。但如果没有稳定关系承接，它也会变成反复出发的冲动。", en:"Solitude is not purely negative for you. It often becomes observation, writing, and aesthetic sensitivity. Without stable connection, though, it can become the urge to keep leaving." }]
    },
    taste: [
      [{ zh:"视觉偏好", en:"Visual preference" }, { zh:"暖白、旧街、雨后路面、车窗、海边、公寓灯光、纸质感、慢镜头。", en:"Warm white, old streets, wet pavement, train windows, coastlines, apartment light, paper texture, slow shots." }],
      [{ zh:"文学气质", en:"Literary temperament" }, { zh:"你偏爱把普通生活写出重量的作者：他们不大声，但会把时间、失去、迁徙和家庭写得很深。", en:"You lean toward writers who give ordinary life weight: not loud, but deep on time, loss, migration, and family." }],
      [{ zh:"电影气质", en:"Cinematic temperament" }, { zh:"你的审美接近安静的人文电影：小津的家庭时间、王家卫的城市情绪、是枝裕和的温柔观察、旅行电影里的短暂相遇。", en:"Your taste sits near quiet humanist cinema: Ozu's domestic time, Wong Kar-wai's urban mood, Kore-eda's gentle observation, and travel films built around brief encounters." }]
    ],
    aesthetics: [
      [{ zh:"书", en:"Books" }, { zh:"奥威尔、川端、村上、鲁迅、林语堂、盖茨比、金融、政治、心理学和普通人的忍耐。", en:"Orwell, Kawabata, Murakami, Lu Xun, Lin Yutang, Gatsby, finance, politics, psychology, and ordinary endurance." }],
      [{ zh:"电影", en:"Films" }, { zh:"家庭、城市、时间、青春、失去、路途和克制的浪漫反复出现。", en:"Family, cities, time, youth, loss, roads, and restrained romanticism recur." }],
      [{ zh:"建筑与地理", en:"Architecture and geography" }, { zh:"你更容易被可步行街区、老校园、车站附近、厨房、阳台和有生活痕迹的房间打动。", en:"You are moved by walkable neighborhoods, old campuses, station-adjacent streets, kitchens, balconies, and rooms with signs of life." }]
    ],
    financialBehavior: [
      [{ zh:"钱的心理功能", en:"Psychological role of money" }, { zh:"钱在你这里首先不是炫耀物，而是安全感、选择权和长期居住权。财务记录是一种降低漂浮感的方式。", en:"Money is not primarily display for you. It is security, optionality, and the right to stay. Financial tracking reduces the feeling of drift." }],
      [{ zh:"记忆型消费", en:"Memory spending" }, { zh:"旅行、书、电影、生活体验的支出常常被你理解为记忆投资，而不是单纯消费。", en:"Travel, books, films, and life experiences often register as memory investment rather than simple consumption." }],
      [{ zh:"需要小心的地方", en:"Watch point" }, { zh:"如果安全感完全依赖账户数字，身体、亲密关系和日常节奏就容易被推迟。", en:"If safety depends entirely on account numbers, body, intimacy, and daily rhythm can be postponed." }]
    ],
    places: [
      [{ zh:"新加坡", en:"Singapore" }, { zh:"被选择的未来：工作、PR、家、长期生活。", en:"Chosen future: work, PR, home, and long-term life." }],
      [{ zh:"烟台 / 青岛", en:"Yantai / Qingdao" }, { zh:"起源的海岸：家人、旧友、海风和早期自我。", en:"Origin coast: family, old friends, sea air, and the early self." }],
      [{ zh:"北京", en:"Beijing" }, { zh:"野心和训练：教育、火车、离开、证明能力。", en:"Ambition and training: education, trains, departure, proving capability." }],
      [{ zh:"台湾 / 日本", en:"Taiwan / Japan" }, { zh:"柔软的卫星：铁路、克制、孤独、电影感。", en:"Soft satellites: rail, restraint, solitude, cinematic feeling." }]
    ],
    timeline: [
      [{ zh:"起源", en:"Origin" }, { zh:"家庭海岸、中文世界、早期野心", en:"family coast, Chinese world, early ambition" }, { zh:"最早的你在亲情、海边和证明自己的压力里形成。", en:"The earliest self forms around family, coastlines, and the pressure to prove capability." }],
      [{ zh:"大学", en:"University" }, { zh:"书、电影、火车、航班", en:"books, films, trains, flights" }, { zh:"记录系统开始成形：你用文化和路线把人生向外打开。", en:"The archive begins: culture and routes open life outward." }],
      [{ zh:"新加坡", en:"Singapore" }, { zh:"SMU、工作、PR、长期生活", en:"SMU, work, PR, long-term life" }, { zh:"临时生活开始要求自己成为一个可以停留的地方。", en:"Temporary life starts asking to become a place where you can stay." }],
      [{ zh:"未来", en:"Future" }, { zh:"家、职业、写作、记忆宫殿", en:"home, career, writing, memory palace" }, { zh:"下一章不是停止移动，而是建立一个能支撑移动的基地。", en:"The next chapter is not stopping movement, but building a base that can support it." }]
    ],
    future: [
      [{ zh:"职业", en:"Career" }, { zh:"从执行型专业人士走向更成熟的判断者：治理、咨询、金融、公共利益或跨文化桥梁。", en:"From execution-focused professional toward a more mature judge: governance, advisory, finance, public interest, or cross-cultural bridge." }],
      [{ zh:"关系", en:"Relationships" }, { zh:"你会寻找既能共享日常、又不压扁自由的人。稳定关系对你不是束缚，而是让移动不再漂浮。", en:"You will seek someone who can share daily life without flattening freedom. Stability is not a cage; it makes movement less weightless." }],
      [{ zh:"身份", en:"Identity" }, { zh:"中国出身、新加坡扎根、世界移动的档案型人格会越来越清晰。", en:"A Chinese-origin, Singapore-rooted, globally mobile archivist identity will become clearer." }]
    ],
    blind: [
      [{ zh:"把安全感外包给数字", en:"Outsourcing safety to numbers" }, { zh:"数字很重要，但它们不能完全替代亲密、身体和日常节奏。", en:"Numbers matter, but they cannot fully replace intimacy, body, and daily rhythm." }],
      [{ zh:"把离开误认成更新", en:"Mistaking departure for renewal" }, { zh:"旅行能更新你，但不是每一次不安都需要靠出发解决。", en:"Travel renews you, but not every unease needs departure as its answer." }],
      [{ zh:"对自己过度审计", en:"Over-auditing the self" }, { zh:"你很会复盘，但生活不需要每一刻都被解释为长期意义。", en:"You are good at reviewing yourself, but not every moment needs to be converted into long-term meaning." }]
    ],
    hidden: [
      [{ zh:"你的浪漫主义很务实", en:"Your romanticism is practical" }, { zh:"你并不是只追求诗意。你要的是能落地、能存钱、能申请、能买房、能写下来的诗意。", en:"You are not chasing pure poetry. You want poetry that can land: saved, applied for, bought, written down." }],
      [{ zh:"你用公共身份处理私人不安", en:"You process private unease through public identity" }, { zh:"工作、证书、校友、献血、PR路径，都在把内部漂浮感转换成外部可见的归属。", en:"Work, credentials, alumni work, blood donation, and the PR path turn inner drift into visible belonging." }],
      [{ zh:"你最爱的地方常是边界", en:"Your favorite places are often thresholds" }, { zh:"机场、车站、海边、旧城、夜路：这些地方都不是终点，而是变化发生前后的缝隙。", en:"Airports, stations, coasts, old cities, night roads: these are not endpoints, but the spaces around change." }]
    ],
    becoming: {
      zh: "如果当前模式继续，你会成为一个安静而有结构的人：在新加坡扎根，保留旅行的氧气，用财务换取自由，用写作保存记忆，用稳定关系学习不再总是独自向前。",
      en: "If the current pattern continues, you become a quiet, structured person: rooted in Singapore, still keeping travel as oxygen, using finance to buy freedom, writing to preserve memory, and stable connection to learn that forward does not always have to mean alone."
    }
  };

  function lang(){
    return i18n ? i18n.lang() : (localStorage.getItem("ernest_journal_lang") || "zh");
  }

  function pick(value){
    return value && typeof value === "object" && !Array.isArray(value) ? (value[lang()] || value.zh || value.en || "") : value;
  }

  function card(title, body){
    return `<article class="analysis-card"><b>${pick(title)}</b><h3>${pick(title)}</h3><p>${pick(body)}</p></article>`;
  }

  function daysBetween(a, b){
    const msPerDay = 24 * 60 * 60 * 1000;
    const aa = new Date(a.getFullYear(), a.getMonth(), a.getDate(), 12);
    const bb = new Date(b.getFullYear(), b.getMonth(), b.getDate(), 12);
    return Math.floor((bb - aa) / msPerDay);
  }

  function formatAge(dob, now){
    let years = now.getFullYear() - dob.getFullYear();
    let months = now.getMonth() - dob.getMonth();
    let days = now.getDate() - dob.getDate();
    if(days < 0){
      days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      months -= 1;
    }
    if(months < 0){
      months += 12;
      years -= 1;
    }
    return { years, months, days };
  }

  function metric(label, value, note){
    return `<article class="analysis-metric"><span>${label}</span><strong>${value}</strong><small>${note}</small></article>`;
  }

  function renderLifeCoordinates(){
    const root = document.getElementById("lifeCoordinates");
    const bar = document.getElementById("lifeProgressBar");
    const note = document.getElementById("lifeProgressNote");
    if(!root || !bar || !note) return;

    const now = new Date();
    const target = new Date(DOB.getFullYear() + LIFE_EXPECTANCY, DOB.getMonth(), DOB.getDate());
    const age = formatAge(DOB, now);
    const lived = daysBetween(DOB, now);
    const total = daysBetween(DOB, target);
    const pct = Math.min(100, Math.max(0, lived / total * 100));
    const sgDays = Math.max(0, daysBetween(SINGAPORE_START, now));

    if(lang() === "zh"){
      root.innerHTML = [
        metric("当前年龄", `${age.years} 岁 ${age.months} 个月 ${age.days} 天`, "根据生日 1996-01-19 自动计算"),
        metric("人生进度", `${pct.toFixed(2)}%`, "以 80 年为温柔参照"),
        metric("新加坡生活", sgDays.toLocaleString(), "以 2021-08-01 作为锚点"),
        metric("分析对象", "一整个人", "简历、日记、旅行、书影、消费与生活记录")
      ].join("");
      note.textContent = `你已经走过 ${lived.toLocaleString()} / ${total.toLocaleString()} 天。这个数字不是倒计时，而是用来提醒时间正在塑造你。`;
    }else{
      root.innerHTML = [
        metric("Current age", `${age.years}y ${age.months}m ${age.days}d`, "Calculated from birthday 1996-01-19"),
        metric("Life progress", `${pct.toFixed(2)}%`, "Using 80 years as a gentle reference"),
        metric("Singapore life", sgDays.toLocaleString(), "Using 2021-08-01 as anchor"),
        metric("Analysis object", "One whole person", "Resume, diaries, travel, books, films, spending, and life records")
      ].join("");
      note.textContent = `You have lived ${lived.toLocaleString()} / ${total.toLocaleString()} days. This is not a countdown, but a reminder that time is shaping you.`;
    }

    bar.style.width = `${pct.toFixed(2)}%`;
  }

  function renderRadar(){
    const traits = model.traits;
    const size = 420;
    const cx = size / 2;
    const cy = size / 2;
    const radius = 150;
    const angleStep = (Math.PI * 2) / traits.length;
    const points = traits.map(([, value], i) => {
      const angle = -Math.PI / 2 + i * angleStep;
      const r = radius * (value / 100);
      return [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r];
    });
    const grid = [0.25, 0.5, 0.75, 1].map((level) => {
      const ring = traits.map((_, i) => {
        const angle = -Math.PI / 2 + i * angleStep;
        const r = radius * level;
        return `${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`;
      }).join(" ");
      return `<polygon points="${ring}" fill="none" stroke="rgba(154,111,104,.18)" />`;
    }).join("");
    const axes = traits.map(([label], i) => {
      const angle = -Math.PI / 2 + i * angleStep;
      const x = cx + Math.cos(angle) * (radius + 42);
      const y = cy + Math.sin(angle) * (radius + 42);
      const ax = cx + Math.cos(angle) * radius;
      const ay = cy + Math.sin(angle) * radius;
      return `<line x1="${cx}" y1="${cy}" x2="${ax}" y2="${ay}" stroke="rgba(154,111,104,.13)" /><text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle">${pick(label)}</text>`;
    }).join("");
    const root = document.getElementById("analysisRadar");
    if(root) root.innerHTML = `<svg viewBox="0 0 ${size} ${size}">${grid}${axes}<polygon points="${points.map((p) => p.join(",")).join(" ")}" fill="rgba(154,111,104,.24)" stroke="#9a6f68" stroke-width="2" />${points.map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="4" fill="#9a6f68" />`).join("")}</svg>`;
  }

  function renderCards(){
    const mapping = [
      ["coreValues", model.values],
      ["emotionalPatterns", model.emotions],
      ["tasteProfile", model.taste],
      ["aestheticArchive", model.aesthetics],
      ["financialBehavior", model.financialBehavior],
      ["futureTrajectory", model.future],
      ["blindSpots", model.blind],
      ["hiddenPatterns", model.hidden]
    ];
    mapping.forEach(([id, items]) => {
      const root = document.getElementById(id);
      if(root) root.innerHTML = items.map(([title, body]) => card(title, body)).join("");
    });
  }

  function renderAxis(){
    const root = document.getElementById("ambitionAxis");
    if(!root) return;
    root.innerHTML = model.axis.map(([left, right, value, note]) => `
      <article class="analysis-axis-row">
        <header><b>${pick(left)}</b><span>${pick(right)}</span></header>
        <div class="analysis-axis-track"><span style="--value:${value}%"></span></div>
        <p>${pick(note)}</p>
      </article>
    `).join("");
  }

  function renderMovement(){
    const movement = document.getElementById("movementPsychology");
    const loneliness = document.getElementById("lonelinessPattern");
    if(movement){
      movement.innerHTML = `<b>${pick(model.movement.psychology[0])}</b><h3>${pick(model.movement.psychology[0])}</h3><p>${pick(model.movement.psychology[1])}</p>`;
    }
    if(loneliness){
      loneliness.innerHTML = `<b>${pick(model.movement.loneliness[0])}</b><h3>${pick(model.movement.loneliness[0])}</h3><p>${pick(model.movement.loneliness[1])}</p>`;
    }
  }

  function renderMap(){
    const root = document.getElementById("movementMap");
    if(root) root.innerHTML = model.places.map(([place, body]) => `<article class="analysis-place"><b>${pick(place)}</b><h3>${pick(place)}</h3><p>${pick(body)}</p></article>`).join("");
  }

  function renderTimeline(){
    const root = document.getElementById("analysisTimeline");
    if(root) root.innerHTML = model.timeline.map(([title, meta, body]) => `<article class="analysis-event"><span>${pick(meta)}</span><div><h3>${pick(title)}</h3><p>${pick(body)}</p></div></article>`).join("");
  }

  function renderBecoming(){
    const root = document.getElementById("becomingQuote");
    if(root) root.textContent = pick(model.becoming);
  }

  function renderAll(){
    renderLifeCoordinates();
    renderRadar();
    renderCards();
    renderAxis();
    renderMovement();
    renderMap();
    renderTimeline();
    renderBecoming();
  }

  function bindLanguageSwitch(){
    document.querySelectorAll("[data-lang-option]").forEach((button) => {
      button.addEventListener("click", () => {
        if(i18n) i18n.apply(button.dataset.langOption);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindLanguageSwitch();
    if(i18n) i18n.apply(lang());
    renderAll();
  });
  window.addEventListener("ernest:languagechange", renderAll);
})();
