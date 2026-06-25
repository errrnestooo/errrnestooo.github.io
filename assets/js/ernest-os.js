(function(){
  const i18n = window.ErnestI18n;

  const finance = {
    metrics: [
      [{ zh:"总资产", en:"Total assets" }, "SGD 120,729.88", { zh:"当前财务 OS 口径", en:"Current Financial OS view" }],
      [{ zh:"购房准备资金", en:"Property-ready funds" }, "SGD 52,297.96", { zh:"现金类与可调动资金估计", en:"Cash-like and available funds estimate" }],
      [{ zh:"储蓄姿态", en:"Savings posture" }, { zh:"耐心", en:"Patient" }, { zh:"安全感优先", en:"Security first" }],
      [{ zh:"投资节奏", en:"Investment rhythm" }, { zh:"长期", en:"Long-term" }, { zh:"避免情绪化交易", en:"Avoid emotional trading" }],
      [{ zh:"支出观察", en:"Spending watch" }, { zh:"按月追踪", en:"Monthly tracking" }, { zh:"类别、频率、异常波动", en:"Categories, frequency, unusual movements" }],
      [{ zh:"财务目标", en:"Financial goal" }, { zh:"家 / 自由", en:"Home / freedom" }, { zh:"钱服务于长期生活", en:"Money serves long-term life" }]
    ],
    spending: [
      [{ zh:"住房与固定成本", en:"Housing and fixed costs" }, 42],
      [{ zh:"日常生活", en:"Daily life" }, 28],
      [{ zh:"旅行与记忆消费", en:"Travel and memory spending" }, 18],
      [{ zh:"学习与职业", en:"Learning and career" }, 7],
      [{ zh:"健康与身体", en:"Health and body" }, 5]
    ],
    savings: [
      [{ zh:"现金缓冲", en:"Cash buffer" }, { zh:"优先保持", en:"Keep protected" }, { zh:"覆盖突发事件、签证/PR不确定性和职业转折。", en:"Covers emergencies, visa/PR uncertainty, and career transitions." }],
      [{ zh:"月度结余", en:"Monthly surplus" }, { zh:"持续观察", en:"Track consistently" }, { zh:"记录收入、必要支出、弹性支出与真实储蓄率。", en:"Track income, essentials, flexible spending, and true savings rate." }],
      [{ zh:"大额目标池", en:"Major-goal pool" }, { zh:"购房导向", en:"Property-oriented" }, { zh:"把首付、装修、搬家和家庭形成成本放在同一张表里。", en:"Keep down payment, renovation, moving, and household formation costs in one view." }]
    ],
    investments: [
      [{ zh:"核心资产", en:"Core assets" }, { zh:"稳态仓位", en:"Steady allocation" }, { zh:"用于长期复利，不承担短期情绪任务。", en:"For long-term compounding, not short-term emotional work." }],
      [{ zh:"补充资产", en:"Satellite assets" }, { zh:"小比例", en:"Small allocation" }, { zh:"允许探索，但不让探索破坏安全感。", en:"Room for exploration without damaging security." }],
      [{ zh:"复盘节奏", en:"Review rhythm" }, { zh:"月度 / 季度", en:"Monthly / quarterly" }, { zh:"只在固定节奏里调整，减少噪音驱动的动作。", en:"Adjust on a fixed cadence to reduce noise-driven action." }]
    ],
    projections: [
      [{ zh:"12 个月", en:"12 months" }, { zh:"现金流稳定性", en:"Cash-flow stability" }, { zh:"重点看储蓄率、固定成本占比和旅行预算边界。", en:"Focus on savings rate, fixed-cost ratio, and travel-budget boundaries." }],
      [{ zh:"3 年", en:"3 years" }, { zh:"购房可行性", en:"Property feasibility" }, { zh:"把收入增长、投资回报、首付款和PR路径放进同一个模型。", en:"Model income growth, returns, down payment, and PR path together." }],
      [{ zh:"10 年", en:"10 years" }, { zh:"自由度", en:"Optionality" }, { zh:"目标不是最大化数字，而是最大化可选择的生活。", en:"The goal is not only bigger numbers, but a life with more choices." }]
    ],
    property: {
      ready: 52297.96,
      target: 120000
    }
  };

  function lang(){
    return i18n ? i18n.lang() : (localStorage.getItem("ernest_journal_lang") || "zh");
  }

  function pick(value){
    if(value && typeof value === "object" && !Array.isArray(value)) return value[lang()] || value.zh || value.en || "";
    return value;
  }

  function metric(label, value, note){
    return `<article class="os-metric"><span>${pick(label)}</span><strong>${pick(value)}</strong><small>${pick(note)}</small></article>`;
  }

  function card(title, value, body){
    return `<article class="os-card"><b>${pick(title)}</b><h3>${pick(value)}</h3><p>${pick(body)}</p></article>`;
  }

  function renderMetrics(){
    const root = document.getElementById("financialMetrics");
    if(root) root.innerHTML = finance.metrics.map(([label, value, note]) => metric(label, value, note)).join("");
  }

  function renderSpending(){
    const root = document.getElementById("spendingBars");
    if(!root) return;
    root.innerHTML = finance.spending.map(([label, value]) => `
      <div class="os-bar">
        <header><b>${pick(label)}</b><span>${value}%</span></header>
        <span><i style="--value:${value}%"></i></span>
      </div>
    `).join("");
  }

  function renderCards(){
    const savings = document.getElementById("savingsCards");
    const investments = document.getElementById("investmentCards");
    const projections = document.getElementById("projectionCards");
    if(savings) savings.innerHTML = finance.savings.map(([title, value, body]) => card(title, value, body)).join("");
    if(investments) investments.innerHTML = finance.investments.map(([title, value, body]) => card(title, value, body)).join("");
    if(projections) projections.innerHTML = finance.projections.map(([title, value, body]) => card(title, value, body)).join("");
  }

  function renderProperty(){
    const bar = document.getElementById("propertyProgress");
    const note = document.getElementById("propertyNote");
    if(!bar || !note) return;
    const pct = Math.min(100, (finance.property.ready / finance.property.target) * 100);
    bar.style.width = `${pct.toFixed(1)}%`;
    note.textContent = lang() === "zh"
      ? `以 SGD ${finance.property.target.toLocaleString()} 为阶段性目标，目前约 ${pct.toFixed(1)}%。`
      : `Against a working target of SGD ${finance.property.target.toLocaleString()}, current readiness is about ${pct.toFixed(1)}%.`;
  }

  function renderAll(){
    renderMetrics();
    renderSpending();
    renderCards();
    renderProperty();
  }

  document.addEventListener("DOMContentLoaded", renderAll);
  window.addEventListener("ernest:languagechange", renderAll);
})();
