(function(){
  const i18n = window.ErnestI18n;
  const birthday = new Date(1996, 0, 19);
  const lifespan = 80;
  const reflectionKey = "ernest_personal_os_reflections";
  let audioContext = null;
  let activeNoise = null;
  let focusInterval = null;
  let activeView = "";

  const data = {
    focus: [
      { zh:"把新加坡从居住地变成长期基地", en:"Turn Singapore from residence into long-term base" },
      { zh:"让消费服务于自由，而不是替代情绪", en:"Let spending serve freedom, not replace emotion" },
      { zh:"保留旅行的氧气，同时建立日常的重量", en:"Keep travel as oxygen while building daily weight" }
    ],
    travel: [
      { place:{zh:"阿曼",en:"Oman"}, date:"2025-05", mood:{zh:"边缘、海风、古老时间",en:"edges, sea wind, old time"} },
      { place:{zh:"约旦",en:"Jordan"}, date:"2025-05", mood:{zh:"公路、石头、抵达之前",en:"roads, stone, before arrival"} },
      { place:{zh:"巴厘",en:"Bali"}, date:"2024-11", mood:{zh:"身体、海水、松开的秩序",en:"body, sea, loosened order"} }
    ],
    thought: {
      zh:"真正长期的生活，不是把自己变成稳定机器，而是让自由和稳定可以在同一个房间里共存。",
      en:"A truly long-term life is not turning yourself into a stability machine. It is letting freedom and stability live in the same room."
    },
    goals: [
      [{zh:"新加坡长期身份",en:"Singapore rootedness"}, 76],
      [{zh:"财务安全感",en:"Financial security"}, 64],
      [{zh:"身体与精力",en:"Body and energy"}, 48],
      [{zh:"写作与记忆系统",en:"Writing and memory system"}, 72],
      [{zh:"亲密关系与家庭感",en:"Connection and home feeling"}, 58]
    ],
    balance: [
      [{zh:"自由",en:"Freedom"}, 78],
      [{zh:"稳定",en:"Stability"}, 66],
      [{zh:"亲密",en:"Connection"}, 54],
      [{zh:"成长",en:"Growth"}, 82],
      [{zh:"身体",en:"Body"}, 46]
    ],
    timeline: [
      ["2015", {zh:"大学与移动开始",en:"University and movement begin"}, {zh:"火车、航班、城市记录开始变成你理解世界的方式。",en:"Trains, flights, and city records begin becoming a way to understand the world."}, "Beijing / China"],
      ["2019", {zh:"新加坡成为可能",en:"Singapore becomes possible"}, {zh:"世界从短期旅行变成长期居住的命题。",en:"The world shifts from short trips to the question of long-term living."}, "Singapore"],
      ["2021", {zh:"SMU 与身份重建",en:"SMU and identity rebuild"}, {zh:"学习、英文环境、经济学和新加坡日常把你推向新的坐标。",en:"Study, English, economics, and Singapore daily life move you toward a new coordinate."}, "SMU"],
      ["2023", {zh:"PwC 与职业密度",en:"PwC and career density"}, {zh:"职业开始要求你在制度、数字和真实生活之间建立耐心。",en:"Career asks you to build patience between systems, numbers, and real life."}, "PwC"],
      ["2025", {zh:"旅行觉醒与系统化自我",en:"Travel awakening and system self"}, {zh:"中东、公路、PR、SCAQ、网站和 Self OS 开始汇合。",en:"Middle East, roads, PR, SCAQ, website, and Self OS begin converging."}, "Middle East / Singapore"],
      ["2026", {zh:"长期方向校准",en:"Long-term direction calibration"}, {zh:"重点从更多记录，转向让记录真正帮助你生活。",en:"The focus shifts from more recording to records that actually help you live."}, "Singapore"]
    ],
    traits: [
      [{zh:"长期主义",en:"Long-termism"}, 88],
      [{zh:"探索欲",en:"Exploration"}, 86],
      [{zh:"稳定感",en:"Stability"}, 68],
      [{zh:"自由感",en:"Freedom"}, 81],
      [{zh:"孤独敏感",en:"Solitude sensitivity"}, 73],
      [{zh:"纪律",en:"Discipline"}, 78],
      [{zh:"浪漫性",en:"Romanticism"}, 82]
    ],
    indices: [
      [{zh:"消费人格",en:"Spending self"}, 67, {zh:"体验与安全并重，旅行和房租同时是精神支柱。",en:"Experience and safety both matter; travel and rent are both psychological pillars."}],
      [{zh:"情绪周期",en:"Emotional cycle"}, 62, {zh:"疲惫时更容易外食、Grab、小额刺激；稳定来自记录和推进。",en:"When tired, food delivery, Grab, and small stimuli rise; stability comes from recording and progress."}],
      [{zh:"孤独指数",en:"Solitude index"}, 74, {zh:"孤独常转化为观察力，但也会推动你想离开。",en:"Solitude often becomes observation, but can also push you toward departure."}],
      [{zh:"探索欲",en:"Exploration"}, 91, {zh:"边境、海、机场、公路会重新点亮你。",en:"Borders, sea, airports, and roads relight you."}],
      [{zh:"稳定感",en:"Stability"}, 66, {zh:"稳定不够高，所以你会不断建设身份、储蓄和家。",en:"Stability is not fully settled, so you keep building identity, savings, and home."}],
      [{zh:"长期主义指数",en:"Long-termism"}, 87, {zh:"你擅长把生活放进十年尺度，但要避免把当下完全工具化。",en:"You are good at ten-year thinking, but must avoid turning the present into pure utility."}]
    ],
    atlas: [
      { id:"singapore", x:720, y:285, country:{zh:"新加坡",en:"Singapore"}, time:"2021-now", state:{zh:"长期生活、工作、PR、家",en:"long-term life, work, PR, home"}, why:{zh:"不是旅行目的地，而是你试图让未来落地的地方。",en:"Not a travel destination, but where you try to make the future land."} },
      { id:"jordan", x:545, y:215, country:{zh:"约旦",en:"Jordan"}, time:"2025-05", state:{zh:"公路感、抵达前的安静",en:"road feeling, quiet before arrival"}, why:{zh:"你被石头、沙漠、古老城市吸引，因为它们让时间变得可见。",en:"Stone, desert, and old cities attract you because they make time visible."} },
      { id:"oman", x:595, y:250, country:{zh:"阿曼",en:"Oman"}, time:"2025-05", state:{zh:"海风、边缘地带、独自行走",en:"sea wind, edge lands, walking alone"}, why:{zh:"那里有一种不急着解释自己的辽阔。",en:"It carries a spaciousness that does not rush to explain itself."} },
      { id:"taiwan", x:745, y:245, country:{zh:"台湾",en:"Taiwan"}, time:"recurring", state:{zh:"柔软、铁路、青春感",en:"softness, rail, youth feeling"}, why:{zh:"你在台湾寻找一种更温柔、更生活化的自己。",en:"In Taiwan you look for a softer, more everyday version of yourself."} },
      { id:"japan", x:780, y:205, country:{zh:"日本",en:"Japan"}, time:"recurring", state:{zh:"克制、电影感、孤独美学",en:"restraint, cinema, solitude aesthetics"}, why:{zh:"日本像你审美里的安静房间。",en:"Japan feels like a quiet room inside your aesthetic self."} },
      { id:"bali", x:705, y:325, country:{zh:"巴厘",en:"Bali"}, time:"2024-11", state:{zh:"身体、海水、风险",en:"body, sea, risk"}, why:{zh:"它提醒你身体也需要参与人生，而不只是脑子和计划。",en:"It reminds you that the body must participate in life, not only the mind and plans."} }
    ],
    relationships: [
      { label:{zh:"家人",en:"Family"}, type:"root", x:.48, y:.48, note:{zh:"提供最早的归属，也让你不断思考家和责任。",en:"The earliest belonging, and the source of many questions about home and responsibility."} },
      { label:{zh:"旧友",en:"Old friends"}, type:"memory", x:.32, y:.38, note:{zh:"他们把你和过去的自己连接起来。",en:"They connect you with earlier versions of yourself."} },
      { label:{zh:"新加坡关系",en:"Singapore ties"}, type:"future", x:.62, y:.36, note:{zh:"同事、校友、社区让新加坡不只是地理位置。",en:"Colleagues, alumni, and community make Singapore more than geography."} },
      { label:{zh:"亲密关系",en:"Intimacy"}, type:"heart", x:.56, y:.62, note:{zh:"你真正想要的是能共享日常、又不压扁自由的关系。",en:"You want a relationship that shares daily life without flattening freedom."} },
      { label:{zh:"城市记忆",en:"City memories"}, type:"place", x:.72, y:.55, note:{zh:"有些人和城市绑定，关系因此变成地点。",en:"Some people bind to cities, so relationships become places."} }
    ],
    memories: {
      "2024-11": {
        theme:{zh:"身体重新进入生活",en:"The body re-enters life"},
        spending:"SGD 6.6k+",
        places:{zh:"巴厘 / 新加坡",en:"Bali / Singapore"},
        emotion:{zh:"松动、海水、短暂脱离秩序",en:"loosened, sea, temporary break from order"},
        note:{zh:"这类月份说明你需要的不只是稳定，也需要能让身体记住自己的经历。",en:"Months like this show you need not only stability, but experiences the body can remember."}
      },
      "2025-05": {
        theme:{zh:"中东与边缘地带",en:"Middle East and edge lands"},
        spending:"SGD 8.0k+",
        places:{zh:"阿曼 / 约旦 / 以色列 / 土耳其",en:"Oman / Jordan / Israel / Turkey"},
        emotion:{zh:"古老时间、公路、身份感",en:"old time, roads, identity"},
        note:{zh:"高消费背后不是奢侈，而是一次强烈的人生章节更新。",en:"The high spending is not luxury; it is a strong life chapter update."}
      },
      "2025-11": {
        theme:{zh:"消费与压力叠加",en:"Spending and pressure overlap"},
        spending:"SGD 10.4k+",
        places:{zh:"新加坡 / 旅行准备",en:"Singapore / travel preparation"},
        emotion:{zh:"补偿、健康、购物、移动欲",en:"compensation, health, shopping, movement desire"},
        note:{zh:"这是需要被 Self OS 标记的月份：不是批判，而是看见什么在同时拉扯你。",en:"This is a month the Self OS should mark: not for judgment, but to see what pulls you at once."}
      },
      "2026-03": {
        theme:{zh:"稳定恢复",en:"Stability restored"},
        spending:"SGD 2.7k+",
        places:{zh:"新加坡",en:"Singapore"},
        emotion:{zh:"收束、储蓄、重新校准",en:"contained, saving, recalibration"},
        note:{zh:"低支出高储蓄月份证明你的系统可以恢复，只是需要节奏。",en:"Low-spend high-saving months show your system can recover when rhythm returns."}
      }
    },
    lifeStates: [
      {
        name:{zh:"建设期",en:"Building phase"},
        score:86,
        duration:{zh:"约 18 个月，并仍在延续",en:"Around 18 months, still continuing"},
        trend:{zh:"从记录转向系统化生活",en:"From recording toward operating life"},
        reason:{zh:"PR/SCAQ、职业现金流、网站、自我系统和长期居住目标正在汇合。",en:"PR/SCAQ, career cash flow, website, self-system, and long-term residence goals are converging."},
        evidence:{zh:"简历、账本、PR/SCAQ、网站结构、长期记录。",en:"Resume, finance records, PR/SCAQ, website structure, long-term records."}
      },
      {
        name:{zh:"探索期",en:"Exploration phase"},
        score:79,
        duration:{zh:"在旅行月明显升高",en:"Rises strongly in travel months"},
        trend:{zh:"由目的地旅行转向人生章节旅行",en:"From destination travel to chapter travel"},
        reason:{zh:"中东、公路、机场、台湾、日本和海反复出现，说明移动仍是感知自我的方式。",en:"Middle East, roads, airports, Taiwan, Japan, and sea recur, showing movement remains a way to sense the self."},
        evidence:{zh:"航班、火车、旅行预算、日记意象。",en:"Flights, trains, travel budgets, journal imagery."}
      },
      {
        name:{zh:"扎根期",en:"Rooting phase"},
        score:72,
        duration:{zh:"从新加坡学习阶段延伸至工作阶段",en:"From Singapore study into work stage"},
        trend:{zh:"稳定感正在从外部身份变成生活结构",en:"Stability is moving from external status into life structure"},
        reason:{zh:"新加坡不只是地点，而逐渐成为职业、身份、资产与亲密关系的长期容器。",en:"Singapore is becoming a long-term container for career, identity, assets, and intimacy."},
        evidence:{zh:"SMU、PwC、PR、租房、储蓄目标。",en:"SMU, PwC, PR, rent, saving goals."}
      }
    ],
    temperature: [
      [{zh:"精神能量",en:"Mental energy"}, 74],
      [{zh:"孤独度",en:"Solitude"}, 68],
      [{zh:"稳定度",en:"Stability"}, 64],
      [{zh:"自由度",en:"Freedom"}, 82],
      [{zh:"长期幸福感",en:"Long-term happiness"}, 71],
      [{zh:"生活温度",en:"Life temperature"}, 76]
    ],
    contradictionsDeep: [
      {
        pair:{zh:"想稳定 vs 想流浪",en:"Stability vs wandering"},
        effect:{zh:"它让你一边重视新加坡身份、储蓄和居住权，一边不断用旅行确认自己没有被固定。",en:"It makes you value Singapore status, savings, and residency while using travel to confirm you are not fixed in place."},
        impacts:[
          {zh:"消费：房租与旅行同时成为大项。",en:"Spending: rent and travel both become major categories."},
          {zh:"职业：偏好稳定平台，但渴望跨文化空间。",en:"Career: prefers stable platforms but wants cross-cultural space."},
          {zh:"决策：会在安全和离开之间反复校准。",en:"Decisions: repeatedly calibrates between safety and departure."}
        ]
      },
      {
        pair:{zh:"想被理解 vs 想独处",en:"Being understood vs being alone"},
        effect:{zh:"你需要安静空间整理自己，也需要有人能读懂你沉默背后的复杂性。",en:"You need quiet space to organize yourself, and someone who can read the complexity behind your silence."},
        impacts:[
          {zh:"感情：会寻找不压扁自由的亲密。",en:"Relationships: seeks intimacy that does not flatten freedom."},
          {zh:"写作：孤独会转化为观察力。",en:"Writing: solitude becomes observation."},
          {zh:"旅行：一个人移动时反而更容易恢复主体感。",en:"Travel: solo movement restores agency."}
        ]
      },
      {
        pair:{zh:"理性规划 vs 浪漫主义",en:"Rational planning vs romanticism"},
        effect:{zh:"你用账本、时间线和系统保护内心的浪漫，而不是消灭它。",en:"You use ledgers, timelines, and systems to protect romanticism, not erase it."},
        impacts:[
          {zh:"消费：高支出月份常是人生叙事更新。",en:"Spending: high-spend months often update the life narrative."},
          {zh:"职业：需要结构，但不能只剩结构。",en:"Career: needs structure, but cannot be only structure."},
          {zh:"决策：会把情绪翻译成计划。",en:"Decisions: often translate emotion into plans."}
        ]
      }
    ],
    futureTrajectory: [
      {
        year:"2027",
        title:{zh:"扎根的流动者",en:"A rooted mover"},
        body:{zh:"你会继续把新加坡作为基地，同时保留高强度旅行作为精神换气。",en:"You continue using Singapore as a base while keeping travel as psychological ventilation."}
      },
      {
        year:"2029",
        title:{zh:"跨文化长期主义结构",en:"Cross-cultural long-termist structure"},
        body:{zh:"职业资本、身份安全、资产目标与个人作品会逐渐合并成同一套生活结构。",en:"Career capital, status security, asset goals, and personal work merge into one life structure."}
      },
      {
        year:"2031",
        title:{zh:"私人档案馆式的人生",en:"A private-archive life"},
        body:{zh:"如果记录持续，你会成为一个用系统保存记忆、用旅行保持感知、用资产保护自由的人。",en:"If recording continues, you become someone who preserves memory with systems, keeps perception alive through travel, and protects freedom with assets."}
      }
    ],
    principles: [
      [{zh:"用记录抵抗遗忘",en:"Use records against forgetting"}, {zh:"重要的不是记录更多，而是让记录帮你认出自己。",en:"The point is not more recording, but records that help you recognize yourself."}],
      [{zh:"用旅行抵抗麻木",en:"Use travel against numbness"}, {zh:"旅行不是逃离日常，而是在章节之间恢复感知。",en:"Travel is not leaving daily life, but restoring perception between chapters."}],
      [{zh:"用系统抵抗焦虑",en:"Use systems against anxiety"}, {zh:"系统不是控制人生，而是给自由一个可以返回的房间。",en:"A system does not control life; it gives freedom a room to return to."}],
      [{zh:"克制消费，但不克制生命感",en:"Restrain spending, not aliveness"}, {zh:"钱应服务长期自由，也允许真正有记忆重量的经验。",en:"Money should serve long-term freedom while allowing experiences with real memory weight."}],
      [{zh:"扎根不是停止移动",en:"Rooting is not stopping movement"}, {zh:"真正的基地不是限制你离开，而是让你回来时仍然有家。",en:"A true base does not stop you leaving; it lets you return to a home."}]
    ],
    intelligence: {
      brief: [
        {
          label:{zh:"核心判断",en:"Core reading"},
          value:{zh:"你不是单纯追求自由，而是在用移动、记录和长期规划反复校准“我到底属于哪里”。",en:"You are not simply chasing freedom. You use movement, records, and long-range planning to keep calibrating where you belong."},
          confidence:86
        },
        {
          label:{zh:"主要张力",en:"Main tension"},
          value:{zh:"自由感很强，但自由必须被账本、身份、职业路径和居住基地承托，否则会变成漂浮。",en:"The need for freedom is strong, but it has to be held by money, status, career path, and a home base, otherwise it turns into drift."},
          confidence:82
        },
        {
          label:{zh:"系统任务",en:"System task"},
          value:{zh:"不是让你更高效，而是让你在旅行、消费、孤独和野心之间看见自己的真实动机。",en:"The task is not higher productivity. It is seeing your real motives across travel, spending, solitude, and ambition."},
          confidence:79
        }
      ],
      cards: {
        consumption: {
          title:{zh:"消费心理",en:"Consumption Psychology"},
          subtitle:{zh:"钱在你这里既是安全边界，也是体验入口。",en:"Money is both a safety boundary and an entrance to experience."},
          score:78,
          confidence:84,
          observed:[
            {zh:"剔除换汇和转账后，31 个月中月均收入约 SGD 6.0k，月均支出约 SGD 4.7k，平均储蓄约 SGD 1.35k，储蓄率约 20.6%。",en:"After excluding transfers and FX movements, 31 months show around SGD 6.0k monthly income, SGD 4.7k monthly expense, SGD 1.35k monthly saving, and a 20.6% saving rate."},
            {zh:"主要支出集中在住房、购物、餐饮、旅行；Grab、外食、Apple、礼物、游戏和订阅反复出现。",en:"The main spending clusters are housing, shopping, food, and travel; Grab, eating out, Apple, gifts, games, and subscriptions recur."},
            {zh:"高支出月份常与旅行、健康/购物、阶段性补偿和生活转换重叠。",en:"High-spend months often overlap with travel, health/shopping, compensation, and life transition."}
          ],
          inferred:[
            {zh:"你更接近体验驱动型消费，而不是地位炫耀型消费；昂贵月份背后通常是“人生章节更新”而不是纯奢侈。",en:"You are more experience-driven than status-driven; expensive months usually mark life chapter updates rather than pure luxury."},
            {zh:"房租和居住不是单纯成本，而是身份稳定器；旅行不是娱乐，而是确认自己仍然有选择权。",en:"Rent and housing are not just costs but identity stabilizers; travel is not entertainment but proof that choice still exists."},
            {zh:"即时交通、外食、小额娱乐像疲惫时的情绪缓冲层，长期快乐更可能来自旅行、身体经验、学习和记忆整理。",en:"Ride-hailing, eating out, and small entertainment act as emotional buffers when tired; longer happiness comes more from travel, body experience, learning, and memory-making."}
          ],
          sources:{zh:"G&L FY24/FY25/FY26、资产负债表、旅行预算表、供应商和类别频率。",en:"G&L FY24/FY25/FY26, balance sheet, travel budget sheets, merchant and category frequency."}
        },
        movement: {
          title:{zh:"移动与逃离",en:"Movement & Escape"},
          subtitle:{zh:"移动对你不是离开现实，而是重启感知。",en:"Movement is less about leaving reality than rebooting perception."},
          score:91,
          confidence:86,
          observed:[
            {zh:"航班、火车、旅行记录里反复出现北京、青岛、烟台、台北、日本、新加坡、中东和东南亚。",en:"Flight, train, and travel logs repeatedly return to Beijing, Qingdao, Yantai, Taiwan, Japan, Singapore, the Middle East, and Southeast Asia."},
            {zh:"日记词频里“路、机场、海、家、新加坡、台湾、日本、骑车”很密集。",en:"Journal term density is high around roads, airports, sea, home, Singapore, Taiwan, Japan, and cycling."},
            {zh:"你记录交通工具本身，而不只记录目的地。",en:"You record the vehicles and routes themselves, not only destinations."}
          ],
          inferred:[
            {zh:"你迷恋公路、火车、机场和夜间移动，是因为它们提供一种“中间状态”：不必立即成为谁，也不必马上给生活下结论。",en:"Roads, trains, airports, and night movement attract you because they create an in-between state: you do not have to be someone immediately or conclude life too soon."},
            {zh:"中东、边缘地带和古老城市吸引你，因为它们让时间、孤独和身份变得可见。",en:"The Middle East, edge lands, and old cities attract you because they make time, solitude, and identity visible."},
            {zh:"移动有逃离成分，但更强的是控制感与自我确认：当生活卡住，你通过路线重新获得方向。",en:"Movement contains escape, but the stronger pattern is control and self-confirmation: when life feels stuck, a route returns direction."}
          ],
          sources:{zh:"航班表、火车表、旅行预算、日记地点和意象词频。",en:"Flight logs, train logs, travel budgets, journal place and imagery frequency."}
        },
        discipline: {
          title:{zh:"纪律与自控",en:"Discipline & Self-Control"},
          subtitle:{zh:"你的自控不是禁欲，而是反复把散乱生活收回轨道。",en:"Your self-control is not austerity; it is repeatedly pulling scattered life back onto track."},
          score:76,
          confidence:78,
          observed:[
            {zh:"你长期维护账本、航班、火车、书影音、网站、日记和职业资料。",en:"You maintain long-running finance, flights, trains, books, films, website, journal, and career records."},
            {zh:"简历与职业路径显示你能在制度环境里持续推进目标。",en:"Resume and career path show sustained progress inside structured systems."},
            {zh:"储蓄存在恢复性月份，说明你能从高支出阶段回到收束状态。",en:"There are recovery months in savings, showing you can return from high-spend phases to containment."}
          ],
          inferred:[
            {zh:"你有延迟满足能力，但不是线性的；你更像“周期型纪律”：一段探索、一段消耗、一段收束、一段重新规划。",en:"You have delayed gratification, but not linearly. Your discipline is cyclical: exploration, expenditure, containment, recalibration."},
            {zh:"真正能稳定你的不是强行减少欲望，而是给欲望一个长期位置。",en:"What stabilizes you is not suppressing desire, but giving desire a long-term position."},
            {zh:"健身和身体记录若能接入，会成为判断情绪恢复力的关键变量。",en:"If fitness/body records are connected, they will become a key variable for emotional recovery."}
          ],
          sources:{zh:"账本连续性、简历、SCAQ/PR记录、旅行与学习记录。",en:"Finance continuity, resume, SCAQ/PR records, travel and learning records."}
        },
        emotion: {
          title:{zh:"情绪模式",en:"Emotional Pattern Analysis"},
          subtitle:{zh:"你会把孤独转化成观察力，但也会在疲惫时用移动和消费止痛。",en:"You turn solitude into observation, but when tired you also use movement and spending for relief."},
          score:81,
          confidence:80,
          observed:[
            {zh:"日记中“家、海、路、工作、累、机场、写、难过、开心”等词反复出现。",en:"Journal language repeatedly returns to home, sea, road, work, tiredness, airport, writing, sadness, and happiness."},
            {zh:"记录密度很高，说明你习惯把情绪变成材料，而不是只让它流走。",en:"The density of records suggests you turn emotion into material rather than letting it pass unexamined."},
            {zh:"旅行与写作经常互相激发：走出去之后，意义整理会变强。",en:"Travel and writing reinforce each other: after movement, meaning-making gets stronger."}
          ],
          inferred:[
            {zh:"你的怀旧强度高，但它不是单纯留恋过去，而是害怕某些版本的自己消失。",en:"Your nostalgia is strong, but it is less about the past itself than fear that certain versions of yourself may disappear."},
            {zh:"未来焦虑常被你包装成计划、考试、身份、储蓄和系统搭建。",en:"Future anxiety often gets converted into planning, exams, identity, saving, and system-building."},
            {zh:"孤独不是你的敌人；失去方向的孤独才是。",en:"Solitude is not the enemy; directionless solitude is."}
          ],
          sources:{zh:"Journal.docx 词频与主题、旅行节点、消费高低波动、长期记录习惯。",en:"Journal.docx term and theme patterns, travel nodes, spending fluctuations, long-term recording behavior."}
        },
        personality: {
          title:{zh:"人格结构",en:"Personality Structure"},
          subtitle:{zh:"高开放性、高审美感、较强尽责性，外部克制，内部浪漫。",en:"High openness, strong aesthetic sensitivity, solid conscientiousness, restrained outside, romantic inside."},
          score:83,
          confidence:77,
          observed:[
            {zh:"阅读横跨文学、政治、经济、历史、心理与投资；影像偏向华语、日本、经典、成长和城市气质。",en:"Reading spans literature, politics, economics, history, psychology, and investing; films lean Chinese-language, Japanese, classic, coming-of-age, and urban moods."},
            {zh:"职业路径和个人系统体现分析、结构化与长期主义。",en:"Career path and personal systems reflect analysis, structure, and long-termism."},
            {zh:"写作和旅行选择显示强审美驱动。",en:"Writing and travel choices show a strong aesthetic drive."}
          ],
          inferred:[
            {zh:"你更像内向型开放者：需要独处整理世界，但也渴望被真正理解和看见。",en:"You are closer to an introverted high-openness person: you need solitude to organize the world, but also want to be understood and seen."},
            {zh:"你对成功的想象不是单纯职位上升，而是身份、自由、财富、作品和地理归属共同成立。",en:"Success for you is not merely career ascent, but identity, freedom, wealth, work, and geographical belonging all standing together."},
            {zh:"你的情绪表达克制，但感受强度不低；系统化是你保存敏感的一种方式。",en:"You express emotion with restraint, but the intensity is not low; systematizing is one way you preserve sensitivity."}
          ],
          sources:{zh:"书影音记录、简历、日记主题、网站结构与 Self OS 需求。",en:"Books/films logs, resume, journal themes, website structure, and Self OS requirements."}
        },
        contradictions: {
          title:{zh:"内在矛盾",en:"Contradictions"},
          subtitle:{zh:"真正塑造你的，不是单一优势，而是几组长期拉扯。",en:"What shapes you is not a single strength, but several durable tensions."},
          score:74,
          confidence:82,
          observed:[
            {zh:"你同时在追求 PR/居住稳定、财富安全、旅行自由和个人作品化。",en:"You pursue PR/rootedness, financial security, travel freedom, and personal authorship at the same time."},
            {zh:"你喜欢极简、秩序和系统，但实际记录中也有大量收藏、清单、账目和记忆累积。",en:"You like minimalism, order, and systems, while your records also show accumulation of lists, ledgers, archives, and memories."},
            {zh:"你既珍惜独处，又不断建构能被看见的个人网站与身份叙事。",en:"You value solitude while building a visible personal website and identity narrative."}
          ],
          inferred:[
            {zh:"自由 vs 控制：你想随时出发，但不想人生失控。",en:"Freedom vs control: you want to be able to leave anytime, but not to lose control of life."},
            {zh:"极简 vs 累积：审美上向往干净，心理上害怕重要经历消失。",en:"Minimalism vs accumulation: aesthetically you want clean space; psychologically you fear losing meaningful experience."},
            {zh:"敏感 vs 理性：你用数据、计划和页面结构给敏感情绪搭骨架。",en:"Sensitivity vs rationality: you use data, plans, and page structure as scaffolding for sensitive emotion."}
          ],
          sources:{zh:"消费类别、私人网站、日记意象、旅行与身份目标。",en:"Spending categories, private website, journal imagery, travel and identity goals."}
        },
        future: {
          title:{zh:"未来轨迹",en:"Future Trajectory"},
          subtitle:{zh:"如果当前模式延续，你会走向“有基地的流动者”。",en:"If current patterns continue, you move toward a rooted mover."},
          score:88,
          confidence:73,
          observed:[
            {zh:"你持续把生活系统化：财务、写作、旅行、资料、网页、身份申请都被纳入同一个长期工程。",en:"You continuously systematize life: finance, writing, travel, documents, website, and status applications become one long project."},
            {zh:"你不满足于只工作或只旅行，而是在寻找一套能同时容纳职业、地理、记忆和自由的生活结构。",en:"You are not satisfied by work alone or travel alone; you are seeking a structure that can hold career, geography, memory, and freedom together."}
          ],
          inferred:[
            {zh:"5-10 年内，你很可能更重视跨文化职业资本、资产安全、长期居住权和个人叙事资产。",en:"In 5-10 years, you will likely value cross-cultural career capital, asset security, long-term residency, and personal narrative assets more."},
            {zh:"职业可能从纯执行型岗位，逐渐转向结构化分析、跨境/跨文化、知识型系统、个人品牌或长期研究型工作。",en:"Career may move from purely executional roles toward structured analysis, cross-border/cross-cultural work, knowledge systems, personal brand, or long-form research."},
            {zh:"主要风险不是懒惰，而是过度把人生工具化，导致当下体验被未来目标吞掉。",en:"The main risk is not laziness, but over-instrumentalizing life until present experience is consumed by future goals."}
          ],
          sources:{zh:"简历路径、PR/SCAQ、财务储蓄、网站建设、长期记录与旅行偏好。",en:"Resume path, PR/SCAQ, savings, website-building, long-term records, and travel preference."}
        }
      },
      heatmap: [
        [{zh:"住房/基地",en:"Housing/base"}, 92, {zh:"安全感",en:"security"}],
        [{zh:"旅行/路线",en:"Travel/routes"}, 88, {zh:"自由与身份",en:"freedom and identity"}],
        [{zh:"外食/Grab",en:"Eating out/Grab"}, 70, {zh:"疲惫缓冲",en:"fatigue buffer"}],
        [{zh:"购物/数码",en:"Shopping/digital"}, 66, {zh:"优化与补偿",en:"optimization and compensation"}],
        [{zh:"学习/考试",en:"Learning/exams"}, 61, {zh:"长期身份建设",en:"long-term identity"}],
        [{zh:"礼物/社交",en:"Gifts/social"}, 52, {zh:"关系维护",en:"relationship maintenance"}]
      ],
      contradictions: [
        [{zh:"自由",en:"Freedom"}, {zh:"控制",en:"Control"}, 82],
        [{zh:"极简",en:"Minimalism"}, {zh:"记忆累积",en:"Accumulation"}, 76],
        [{zh:"独处",en:"Solitude"}, {zh:"被看见",en:"Recognition"}, 71],
        [{zh:"现实主义",en:"Pragmatism"}, {zh:"浪漫主义",en:"Romanticism"}, 85]
      ]
    }
  };

  function lang(){
    return i18n ? i18n.lang() : (localStorage.getItem("ernest_journal_lang") || "zh");
  }

  function pick(value){
    return value && typeof value === "object" && !Array.isArray(value) ? (value[lang()] || value.zh || value.en || "") : value;
  }

  function daysBetween(a,b){
    const day = 24 * 60 * 60 * 1000;
    const aa = new Date(a.getFullYear(), a.getMonth(), a.getDate(), 12);
    const bb = new Date(b.getFullYear(), b.getMonth(), b.getDate(), 12);
    return Math.floor((bb - aa) / day);
  }

  function formatAge(){
    const now = new Date();
    let years = now.getFullYear() - birthday.getFullYear();
    let months = now.getMonth() - birthday.getMonth();
    let days = now.getDate() - birthday.getDate();
    if(days < 0){
      days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      months -= 1;
    }
    if(months < 0){
      months += 12;
      years -= 1;
    }
    return lang() === "zh" ? `${years} 岁 ${months} 个月` : `${years}y ${months}m`;
  }

  function lifeProgress(){
    const target = new Date(birthday.getFullYear() + lifespan, birthday.getMonth(), birthday.getDate());
    return (daysBetween(birthday, new Date()) / daysBetween(birthday, target)) * 100;
  }

  function renderDashboard(){
    document.getElementById("todayState").textContent = lang() === "zh" ? "校准中" : "Calibrating";
    document.getElementById("ageText").textContent = formatAge();
    document.getElementById("lifeProgressText").textContent = `${lifeProgress().toFixed(2)}%`;

    const mood = document.getElementById("moodRiver");
    const values = [5,6,5,7,4,5,6,8,6,5,4,7,6,6,8,5,4,5,6,7,5,6,4,5,7,8,6,5,6,7];
    mood.innerHTML = values.map((v,i) => `<span style="height:${22 + v * 10}px; opacity:${0.38 + i / 60}"></span>`).join("");

    renderSpendingOrbit();
    document.getElementById("focusList").innerHTML = data.focus.map((x) => `<li>${pick(x)}</li>`).join("");
    document.getElementById("recentTravel").innerHTML = data.travel.map((x) => `<div class="travel-pill"><span>${pick(x.place)}</span><small>${x.date} · ${pick(x.mood)}</small></div>`).join("");
    document.getElementById("recentThought").textContent = pick(data.thought);
    document.getElementById("goalStack").innerHTML = data.goals.map(([label,value]) => `<div class="goal-row"><header><b>${pick(label)}</b><span>${value}%</span></header><div class="track"><span style="--value:${value}%"></span></div></div>`).join("");
    renderBalance();
    renderDashboardIntelligence();
  }

  function renderDashboardIntelligence(){
    const current = data.lifeStates[0];
    const memoryKey = "2026-03";
    const memory = data.memories[memoryKey];
    const stateName = document.getElementById("stateInline");
    const stateReason = document.getElementById("stateInlineReason");
    const memoryInline = document.getElementById("memoryInline");
    const memoryNote = document.getElementById("memoryInlineNote");
    const mini = document.getElementById("temperatureMini");
    if(stateName) stateName.textContent = pick(current.name);
    if(stateReason) stateReason.textContent = pick(current.reason);
    if(memoryInline) memoryInline.textContent = `${memoryKey} · ${pick(memory.theme)}`;
    if(memoryNote) memoryNote.textContent = pick(memory.note);
    if(mini){
      mini.innerHTML = data.temperature.map(([label,value]) => `
        <div class="temp-mini-row"><span>${pick(label)}</span><i><b style="--value:${value}%"></b></i><em>${value}</em></div>
      `).join("");
    }
  }

  function renderLifeState(){
    const current = data.lifeStates[0];
    const orb = document.getElementById("lifeStateOrb");
    const reading = document.getElementById("lifeStateReading");
    const cards = document.getElementById("lifeStateCards");
    if(!orb || !reading || !cards) return;
    orb.innerHTML = `<span>${current.score}</span><small>${pick(current.name)}</small>`;
    reading.innerHTML = `
      <div class="panel-head"><span>${lang()==="zh"?"当前推断":"Current inference"}</span><b>${lang()==="zh"?"置信度":"Confidence"} ${current.score}%</b></div>
      <h3>${pick(current.name)}</h3>
      <p>${pick(current.reason)}</p>
      <dl>
        <div><dt>${lang()==="zh"?"持续时间":"Duration"}</dt><dd>${pick(current.duration)}</dd></div>
        <div><dt>${lang()==="zh"?"变化趋势":"Trend"}</dt><dd>${pick(current.trend)}</dd></div>
        <div><dt>${lang()==="zh"?"证据来源":"Evidence"}</dt><dd>${pick(current.evidence)}</dd></div>
      </dl>
    `;
    cards.innerHTML = data.lifeStates.map((item) => `
      <article class="state-card">
        <span>${item.score}</span>
        <h3>${pick(item.name)}</h3>
        <p>${pick(item.reason)}</p>
        <small>${pick(item.trend)}</small>
      </article>
    `).join("");
  }

  function renderTemperature(){
    const readings = document.getElementById("temperatureReadings");
    const canvas = document.getElementById("temperatureCanvas");
    if(!readings || !canvas) return;
    readings.innerHTML = data.temperature.map(([label,value]) => `
      <div class="temperature-row"><span>${pick(label)}</span><i><b style="--value:${value}%"></b></i><strong>${value}</strong></div>
    `).join("");
    drawTemperatureCanvas(canvas);
  }

  function drawTemperatureCanvas(canvas){
    if(canvas.dataset.animating === "true") return;
    canvas.dataset.animating = "true";
    const ctx = canvas.getContext("2d");
    const dpr = devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    const w = canvas.width, h = canvas.height;
    let t = 0;
    function draw(){
      ctx.clearRect(0,0,w,h);
      const g = ctx.createRadialGradient(w*.45,h*.48,20,w*.48,h*.5,Math.min(w,h)*.55);
      g.addColorStop(0,"rgba(176,146,98,.28)");
      g.addColorStop(.45,"rgba(162,110,105,.18)");
      g.addColorStop(1,"rgba(120,131,111,.04)");
      ctx.fillStyle = g;
      ctx.beginPath();
      for(let i=0;i<180;i++){
        const a = i/180*Math.PI*2;
        const pulse = Math.sin(t/70 + i*.08)*18*dpr;
        const r = (Math.min(w,h)*.26) + pulse + Math.sin(i*.21)*10*dpr;
        const x = w*.48 + Math.cos(a)*r;
        const y = h*.5 + Math.sin(a)*r;
        if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
      }
      ctx.closePath();
      ctx.fill();
      t += 1;
      requestAnimationFrame(draw);
    }
    draw();
  }

  function renderSpendingOrbit(){
    const root = document.getElementById("spendingOrbit");
    const items = [
      ["housing", 38, "var(--moss)"],
      ["food", 21, "var(--rose)"],
      ["travel", 19, "var(--blue)"],
      ["shopping", 16, "var(--gold)"],
      ["other", 6, "var(--soft)"]
    ];
    let offset = 0;
    const circles = items.map(([name,value,color]) => {
      const dash = `${value} ${100-value}`;
      const node = `<circle r="72" cx="94" cy="94" fill="none" stroke="${color}" stroke-width="18" stroke-dasharray="${dash}" stroke-dashoffset="${-offset}" pathLength="100" />`;
      offset += value;
      return node;
    }).join("");
    root.innerHTML = `<svg viewBox="0 0 188 188"><g transform="rotate(-90 94 94)">${circles}</g><text x="94" y="88" text-anchor="middle" fill="currentColor" style="font:500 24px Georgia">4.6k</text><text x="94" y="112" text-anchor="middle" fill="currentColor" opacity=".58" style="font:12px sans-serif">monthly avg</text></svg>`;
  }

  function renderBalance(){
    const root = document.getElementById("balanceCompass");
    const size = 260, cx = 130, cy = 130, r = 82;
    const points = data.balance.map(([,v],i) => {
      const a = -Math.PI/2 + i * Math.PI * 2 / data.balance.length;
      return [cx + Math.cos(a) * r * v / 100, cy + Math.sin(a) * r * v / 100];
    });
    const labels = data.balance.map(([label],i) => {
      const a = -Math.PI/2 + i * Math.PI * 2 / data.balance.length;
      return `<text x="${cx + Math.cos(a)*(r+30)}" y="${cy + Math.sin(a)*(r+30)}" text-anchor="middle" dominant-baseline="middle" fill="currentColor" opacity=".65" font-size="12">${pick(label)}</text>`;
    }).join("");
    root.innerHTML = `<svg viewBox="0 0 ${size} ${size}"><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="currentColor" opacity=".12"/><polygon points="${points.map(p=>p.join(",")).join(" ")}" fill="rgba(162,110,105,.24)" stroke="var(--rose)" stroke-width="2"/>${labels}</svg>`;
  }

  function renderTimeline(){
    document.getElementById("lifeTimeline").innerHTML = data.timeline.map(([year,title,body,place]) => `<article class="timeline-item"><div class="timeline-year">${year}</div><div><h3>${pick(title)}</h3><p>${pick(body)}</p></div></article>`).join("");
    document.getElementById("timelineMap").innerHTML = data.timeline.map(([,title,,place]) => `<div class="map-node"><i></i><div><b>${place}</b><p>${pick(title)}</p></div></div>`).join("");
  }

  function renderAnalytics(){
    const root = document.getElementById("traitField");
    root.className = "trait-field";
    const size = 480, cx = 240, cy = 250, r = 150;
    const points = data.traits.map(([,v],i) => {
      const a = -Math.PI/2 + i * Math.PI * 2 / data.traits.length;
      return [cx + Math.cos(a)*r*v/100, cy + Math.sin(a)*r*v/100];
    });
    const labels = data.traits.map(([label],i) => {
      const a = -Math.PI/2 + i * Math.PI * 2 / data.traits.length;
      return `<text x="${cx + Math.cos(a)*(r+48)}" y="${cy + Math.sin(a)*(r+48)}" text-anchor="middle" dominant-baseline="middle" fill="currentColor" opacity=".66" font-size="13">${pick(label)}</text>`;
    }).join("");
    root.innerHTML = `<svg viewBox="0 0 ${size} ${size}"><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="currentColor" opacity=".12"/><circle cx="${cx}" cy="${cy}" r="${r*.66}" fill="none" stroke="currentColor" opacity=".10"/><circle cx="${cx}" cy="${cy}" r="${r*.33}" fill="none" stroke="currentColor" opacity=".08"/><polygon points="${points.map(p=>p.join(",")).join(" ")}" fill="rgba(120,131,111,.24)" stroke="var(--moss)" stroke-width="2"/>${labels}</svg>`;
    document.getElementById("spendingSelf").textContent = lang() === "zh" ? "你的消费不是享乐主义，而是安全感与人生体验之间的拉扯：房租让你留在新加坡，旅行让你确认自己仍然自由。" : "Your spending is not hedonism. It is a tension between safety and lived experience: rent lets you stay in Singapore; travel confirms you are still free.";
    document.getElementById("emotionCycle").textContent = lang() === "zh" ? "情绪低点常伴随疲惫、外食、即时移动和小额刺激；恢复通常来自记录、计划、旅行后的意义整理。" : "Low emotional points often pair with tiredness, eating out, instant movement, and small stimuli; recovery usually comes from recording, planning, and meaning-making after travel.";
    document.getElementById("indexCards").innerHTML = data.indices.map(([label,value,note]) => `<div class="index-row"><header><b>${pick(label)}</b><span>${value}</span></header><div class="track"><span style="--value:${value}%"></span></div><p>${pick(note)}</p></div>`).join("");
  }

  function renderIntelligence(){
    const brief = document.getElementById("intelligenceBrief");
    if(!brief) return;
    brief.innerHTML = data.intelligence.brief.map((item) => `
      <article class="brief-card">
        <span>${pick(item.label)}</span>
        <strong>${item.confidence}%</strong>
        <p>${pick(item.value)}</p>
      </article>
    `).join("");

    Object.entries(data.intelligence.cards).forEach(([key, card]) => {
      const root = document.querySelector(`[data-intel-card="${key}"]`);
      if(!root) return;
      root.innerHTML = `
        <div class="intel-head">
          <div>
            <span>${lang() === "zh" ? "行为分析" : "Behavioral analysis"}</span>
            <h3>${pick(card.title)}</h3>
            <p>${pick(card.subtitle)}</p>
          </div>
          <div class="confidence-ring" style="--score:${card.score}">
            <b>${card.score}</b>
            <small>${lang() === "zh" ? "强度" : "signal"}</small>
          </div>
        </div>
        <div class="evidence-split">
          <div>
            <h4>${lang() === "zh" ? "观察事实" : "Observed facts"}</h4>
            ${card.observed.map((x) => `<p>${pick(x)}</p>`).join("")}
          </div>
          <div>
            <h4>${lang() === "zh" ? "推断结论" : "Inferred conclusions"}</h4>
            ${card.inferred.map((x) => `<p>${pick(x)}</p>`).join("")}
          </div>
        </div>
        <footer class="intel-source">
          <span>${lang() === "zh" ? "置信度" : "Confidence"} ${card.confidence}%</span>
          <span>${lang() === "zh" ? "证据来源" : "Evidence source"}: ${pick(card.sources)}</span>
        </footer>
      `;
    });

    const heatmap = document.getElementById("consumptionHeatmap");
    heatmap.innerHTML = data.intelligence.heatmap.map(([label,value,why]) => `
      <div class="heat-row" style="--heat:${value}%">
        <span>${pick(label)}</span>
        <i><b></b></i>
        <small>${pick(why)} · ${value}</small>
      </div>
    `).join("");

    const map = document.getElementById("contradictionMap");
    map.innerHTML = data.intelligence.contradictions.map(([left,right,value]) => `
      <div class="tension-row">
        <span>${pick(left)}</span>
        <div class="tension-axis"><i style="left:${value}%"></i></div>
        <span>${pick(right)}</span>
      </div>
    `).join("");
  }

  function renderContradictionEngine(){
    const root = document.getElementById("contradictionEngine");
    if(!root) return;
    root.innerHTML = data.contradictionsDeep.map((item, index) => `
      <article class="contradiction-sheet" style="--delay:${index * 90}ms">
        <header>
          <span>0${index + 1}</span>
          <h3>${pick(item.pair)}</h3>
        </header>
        <p>${pick(item.effect)}</p>
        <div>${item.impacts.map(x => `<small>${pick(x)}</small>`).join("")}</div>
      </article>
    `).join("");
  }

  function renderFutureEngine(){
    const root = document.getElementById("futureEngine");
    if(!root) return;
    root.innerHTML = `
      <div class="future-line">${data.futureTrajectory.map(item => `
        <article>
          <span>${item.year}</span>
          <h3>${pick(item.title)}</h3>
          <p>${pick(item.body)}</p>
        </article>
      `).join("")}</div>
      <aside class="future-note">
        <span>${lang()==="zh"?"行为轨迹推断":"Behavioral trajectory"}</span>
        <p>${lang()==="zh"?"如果当前模式延续，你会逐渐走向一种跨文化长期主义生活结构：有基地、有资产安全、有个人作品，也保留周期性的远行。":"If current patterns continue, you move toward a cross-cultural long-termist life structure: a base, asset security, personal work, and periodic long-distance movement."}</p>
      </aside>
    `;
  }

  function renderPrinciples(){
    const root = document.getElementById("principlesGrid");
    if(!root) return;
    root.innerHTML = data.principles.map(([title,body], index) => `
      <article class="principle-card">
        <span>${String(index + 1).padStart(2,"0")}</span>
        <h3>${pick(title)}</h3>
        <p>${pick(body)}</p>
      </article>
    `).join("");
  }

  function renderAtlas(selectedId){
    const selected = data.atlas.find(x => x.id === selectedId) || data.atlas[0];
    const map = document.getElementById("worldMap");
    const dots = data.atlas.map((x) => `<g class="country-dot" data-country="${x.id}" transform="translate(${x.x} ${x.y})"><circle r="9" fill="var(--rose)"/><circle r="24" fill="none" stroke="var(--rose)" opacity=".25"/><text x="16" y="-12" fill="currentColor" opacity=".72" font-size="13">${pick(x.country)}</text></g>`).join("");
    map.innerHTML = `<svg viewBox="0 0 1000 520"><path d="M80 260 C210 160 330 170 450 210 S690 300 900 190" fill="none" stroke="currentColor" opacity=".10" stroke-width="64" stroke-linecap="round"/><path d="M150 350 C300 280 430 335 560 300 S760 260 880 345" fill="none" stroke="currentColor" opacity=".08" stroke-width="48" stroke-linecap="round"/><path class="atlas-route" d="M720 285 C660 240 610 238 595 250 S565 230 545 215 M720 285 C760 260 765 225 780 205 M720 285 C735 270 745 255 745 245" fill="none" stroke="var(--rose)" stroke-width="2" stroke-linecap="round" stroke-dasharray="8 10"/>${dots}</svg>`;
    map.querySelectorAll("[data-country]").forEach(el => el.addEventListener("click", () => renderAtlas(el.dataset.country)));
    document.getElementById("atlasCard").innerHTML = `<span>${selected.time}</span><h3>${pick(selected.country)}</h3><div class="atlas-photo"></div><p><b>${lang()==="zh"?"当时状态":"Life state"}:</b> ${pick(selected.state)}</p><p><b>${lang()==="zh"?"为什么想去":"Why there"}:</b> ${pick(selected.why)}</p>`;
    document.getElementById("atlasTimeline").innerHTML = data.atlas.map(x => `<button type="button" class="${x.id===selected.id?"active":""}" data-country="${x.id}">${x.time} · ${pick(x.country)}</button>`).join("");
    document.querySelectorAll(".atlas-timeline [data-country]").forEach(btn => btn.addEventListener("click", () => renderAtlas(btn.dataset.country)));
  }

  function renderMemory(){
    const select = document.getElementById("memoryMonth");
    select.innerHTML = Object.keys(data.memories).map(m => `<option value="${m}">${m}</option>`).join("");
    select.addEventListener("change", () => updateMemory(select.value));
    updateMemory(select.value || Object.keys(data.memories)[0]);
  }

  function updateMemory(month){
    const item = data.memories[month];
    const lens = document.getElementById("memoryLens");
    if(lens){
      lens.innerHTML = `<span>${month}</span><h3>${pick(item.theme)}</h3><p>${pick(item.note)}</p><div class="memory-photo-stack"><i></i><i></i><i></i></div>`;
    }
    document.getElementById("memoryBoard").innerHTML = [
      [lang()==="zh"?"主题":"Theme", pick(item.theme)],
      [lang()==="zh"?"消费":"Spending", item.spending],
      [lang()==="zh"?"地点":"Places", pick(item.places)],
      [lang()==="zh"?"情绪":"Emotion", pick(item.emotion)],
      [lang()==="zh"?"生活关键词":"Life keywords", `${pick(item.places)} / ${pick(item.emotion)}`],
      [lang()==="zh"?"当时焦虑":"Anxiety", lang()==="zh"?"身份、未来、稳定是否足够承托自由。":"Identity, future, and whether stability can hold freedom."],
      [lang()==="zh"?"当时期望":"Expectation", lang()==="zh"?"让生活重新变得可感、可写、可返回。":"To make life feel perceptible, writable, and returnable."],
      [lang()==="zh"?"系统观察":"System note", pick(item.note)]
    ].map(([k,v]) => `<article class="memory-card"><h3>${k}</h3><p>${v}</p></article>`).join("");
  }

  function renderReflection(){
    const output = document.getElementById("reflectionOutput");
    const saved = JSON.parse(localStorage.getItem(reflectionKey) || "[]");
    output.innerHTML = saved.length
      ? saved.slice(-5).reverse().map(x => `<div class="memory-card"><h3>${x.date}</h3><p>${lang()==="zh"?"情绪":"Mood"} ${x.mood}/10 · ${lang()==="zh"?"能量":"Energy"} ${x.energy}/10 · ${lang()==="zh"?"花费":"Spending"} SGD ${x.spending || 0}</p><p>${x.thought || ""}</p></div>`).join("")
      : `<p>${lang()==="zh"?"还没有记录。今天写一句真实的话就够了。":"No records yet. One true sentence today is enough."}</p>`;
  }

  function bindReflection(){
    document.getElementById("reflectionForm").addEventListener("submit", (event) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const saved = JSON.parse(localStorage.getItem(reflectionKey) || "[]");
      saved.push({
        date: new Date().toISOString().slice(0,10),
        mood: form.get("mood"),
        spending: form.get("spending"),
        energy: form.get("energy"),
        loneliness: form.get("loneliness"),
        fulfillment: form.get("fulfillment"),
        thought: form.get("thought")
      });
      localStorage.setItem(reflectionKey, JSON.stringify(saved));
      event.currentTarget.reset();
      renderReflection();
    });
  }

  function renderConstellation(){
    const canvas = document.getElementById("constellationCanvas");
    const note = document.getElementById("constellationNote");
    const ctx = canvas.getContext("2d");
    function resize(){
      canvas.width = canvas.clientWidth * devicePixelRatio;
      canvas.height = canvas.clientHeight * devicePixelRatio;
    }
    resize();
    let t = 0;
    function draw(){
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0,0,w,h);
      ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--line");
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--rose");
      const nodes = data.relationships.map((n,i) => ({
        ...n,
        px: n.x*w + Math.sin(t/70+i)*12*devicePixelRatio,
        py: n.y*h + Math.cos(t/90+i)*12*devicePixelRatio
      }));
      ctx.lineWidth = 1 * devicePixelRatio;
      nodes.forEach((a,i) => nodes.slice(i+1).forEach(b => {
        ctx.globalAlpha = .22;
        ctx.beginPath(); ctx.moveTo(a.px,a.py); ctx.lineTo(b.px,b.py); ctx.stroke();
      }));
      ctx.globalAlpha = 1;
      nodes.forEach((n) => {
        ctx.beginPath(); ctx.arc(n.px,n.py,8*devicePixelRatio,0,Math.PI*2); ctx.fill();
        ctx.font = `${13*devicePixelRatio}px sans-serif`;
        ctx.fillText(pick(n.label), n.px + 14*devicePixelRatio, n.py - 10*devicePixelRatio);
      });
      t += 1;
      requestAnimationFrame(draw);
    }
    note.innerHTML = `<h3>${lang()==="zh"?"关系不是网络，而是重力":"Relationships are not a network, but gravity"}</h3><p>${pick(data.relationships[0].note)}</p>`;
    canvas.addEventListener("click", () => {
      const item = data.relationships[Math.floor(Math.random()*data.relationships.length)];
      note.innerHTML = `<h3>${pick(item.label)}</h3><p>${pick(item.note)}</p>`;
    });
    draw();
  }

  function setupQuiet(){
    const clock = document.getElementById("quietClock");
    setInterval(() => {
      const d = new Date();
      clock.textContent = `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
    }, 1000);
    document.querySelectorAll("[data-sound]").forEach(btn => btn.addEventListener("click", () => startNoise(btn.dataset.sound, btn)));
    document.getElementById("quietStop").addEventListener("click", stopNoise);
  }

  function startNoise(type, button){
    stopNoise();
    document.body.classList.toggle("epos-night", type === "night" || type === "focus");
    document.querySelectorAll("[data-sound]").forEach(x => x.classList.remove("active"));
    button.classList.add("active");
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const bufferSize = 2 * audioContext.sampleRate;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const dataArr = buffer.getChannelData(0);
    for(let i=0;i<bufferSize;i++) dataArr[i] = Math.random()*2-1;
    const noise = audioContext.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    const gain = audioContext.createGain();
    gain.gain.value = type === "focus" ? .035 : (type === "wind" ? .045 : .06);
    noise.connect(gain).connect(audioContext.destination);
    noise.start();
    activeNoise = noise;
    if(type === "focus") startFocusTimer();
  }

  function stopNoise(){
    document.querySelectorAll("[data-sound]").forEach(x => x.classList.remove("active"));
    clearInterval(focusInterval);
    focusInterval = null;
    const timer = document.getElementById("focusTimer");
    if(timer) timer.textContent = "25:00";
    if(activeNoise) activeNoise.stop();
    activeNoise = null;
    if(audioContext) audioContext.close();
    audioContext = null;
  }

  function startFocusTimer(){
    clearInterval(focusInterval);
    const timer = document.getElementById("focusTimer");
    let remaining = 25 * 60;
    focusInterval = setInterval(() => {
      remaining = Math.max(0, remaining - 1);
      if(timer){
        const m = String(Math.floor(remaining / 60)).padStart(2,"0");
        const s = String(remaining % 60).padStart(2,"0");
        timer.textContent = `${m}:${s}`;
      }
      if(remaining === 0) stopNoise();
    }, 1000);
  }

  function setupAmbientCanvas(){
    const canvas = document.getElementById("ambientCanvas");
    const ctx = canvas.getContext("2d");
    let particles = [];
    function resize(){
      canvas.width = innerWidth * devicePixelRatio;
      canvas.height = innerHeight * devicePixelRatio;
      particles = Array.from({length:42}, () => ({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*2+1,s:Math.random()*.25+.08}));
    }
    resize();
    addEventListener("resize", resize);
    function draw(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle = "rgba(120,105,90,.16)";
      particles.forEach(p => {
        p.y += p.s * devicePixelRatio;
        if(p.y > canvas.height) p.y = -10;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r*devicePixelRatio,0,Math.PI*2); ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    draw();
  }

  function showView(view){
    if(!document.querySelector(`[data-view-panel="${view}"]`)) view = "dashboard";
    activeView = view;
    document.querySelectorAll("[data-view-panel]").forEach(panel => panel.classList.toggle("is-active", panel.dataset.viewPanel === view));
    document.querySelectorAll("[data-view]").forEach(link => link.classList.toggle("active", link.dataset.view === view));
    history.replaceState(null, "", `#${view}`);
  }

  function bindNavigation(){
    document.querySelectorAll("[data-view]").forEach(link => link.addEventListener("click", (event) => {
      event.preventDefault();
      showView(link.dataset.view);
    }));
    window.addEventListener("hashchange", () => showView((location.hash || "#dashboard").slice(1)));
    setInterval(() => {
      const view = (location.hash || "#dashboard").slice(1);
      if(view !== activeView) showView(view);
    }, 300);
    showView((location.hash || "#dashboard").slice(1));
  }

  function bindLanguage(){
    document.querySelectorAll("[data-lang-option]").forEach(button => button.addEventListener("click", () => {
      if(i18n) i18n.apply(button.dataset.langOption);
    }));
  }

  function renderAll(){
    renderDashboard();
    renderLifeState();
    renderTemperature();
    renderTimeline();
    renderAnalytics();
    renderIntelligence();
    renderContradictionEngine();
    renderFutureEngine();
    renderAtlas();
    renderReflection();
    renderPrinciples();
    updateMemory(document.getElementById("memoryMonth")?.value || Object.keys(data.memories)[0]);
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindLanguage();
    if(i18n) i18n.apply(lang());
    bindNavigation();
    setupAmbientCanvas();
    renderDashboard();
    renderLifeState();
    renderTemperature();
    renderTimeline();
    renderAnalytics();
    renderIntelligence();
    renderContradictionEngine();
    renderFutureEngine();
    renderAtlas();
    renderMemory();
    renderReflection();
    bindReflection();
    renderConstellation();
    renderPrinciples();
    setupQuiet();
  });

  window.addEventListener("ernest:languagechange", renderAll);
})();
