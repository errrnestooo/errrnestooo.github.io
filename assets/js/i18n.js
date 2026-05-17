(function(){
  const storageKey = "ernest_journal_lang";

  const translations = {
    zh: {
      "nav.home": "\u9996\u9875",
      "nav.diary": "\u65e5\u8bb0",
      "nav.stories": "\u5c0f\u8bf4",
      "nav.notes": "\u672d\u8bb0",
      "nav.now": "\u8fd1\u51b5",
      "nav.timeline": "\u65f6\u95f4\u7ebf",
      "nav.travel": "\u65c5\u884c",
      "nav.map": "\u5730\u56fe",
      "nav.library": "\u4e66\u5f71\u97f3",
      "nav.photos": "\u7167\u7247",
      "nav.life": "\u751f\u6d3b",
      "nav.plans": "\u8ba1\u5212",
      "nav.about": "\u5173\u4e8e",
      "theme.dark": "\u591c\u95f4",
      "theme.light": "\u65e5\u95f4",
      "loading": "\u6b63\u5728\u8f7d\u5165",
      "visits": "\u5230\u8bbf",
      "music.title": "\u9759\u5ba4",
      "music.paused": "\u5b89\u9759",
      "music.ready": "\u5df2\u5c31\u7eea",
      "music.muted": "\u9759\u97f3",
      "music.preset.rain": "\u96e8",
      "music.preset.cafe": "\u5496\u5561\u9986",
      "music.preset.train": "\u5217\u8f66",
      "music.preset.city": "\u591c\u57ce",
      "music.preset.desert": "\u6c99\u98ce",
      "footer": "Ernest's Journal - \u5728\u65b0\u52a0\u5761\u7f13\u6162\u5efa\u9020\u7684\u4e2a\u4eba\u6863\u6848",

      "now.date": "\u66f4\u65b0\u4e8e 2026 \u5e74 5 \u6708",
      "now.title": "\u8fd1\u51b5",
      "now.subtitle": "\u5b89\u9759\u5730\u5728\u65b0\u52a0\u5761\u642d\u5efa\u4e00\u79cd\u957f\u671f\u751f\u6d3b\u3002",
      "now.focus": "\u6b63\u5728\u4e13\u6ce8",
      "now.focus.body": "\u628a\u5de5\u4f5c\u3001\u5199\u4f5c\u3001\u65c5\u884c\u548c\u81ea\u6211\u5efa\u8bbe\u653e\u8fdb\u4e00\u4e2a\u66f4\u7a33\u5b9a\u7684\u8282\u594f\u91cc\u3002",
      "now.studying": "\u6b63\u5728\u5b66\u4e60",
      "now.studying.body": "\u7ecf\u6d4e\u5b66\u3001\u516c\u5171\u4f1a\u8ba1\u3001SCAQ\uff0c\u4ee5\u53ca\u5982\u4f55\u628a\u590d\u6742\u77e5\u8bc6\u5199\u5f97\u66f4\u6e05\u695a\u3002",
      "now.building": "\u6b63\u5728\u642d\u5efa",
      "now.building.body": "Ernest's Journal\uff1a\u4e00\u4e2a\u6162\u6162\u751f\u957f\u7684\u4e2a\u4eba\u6863\u6848\u548c\u6570\u5b57\u82b1\u56ed\u3002",
      "now.traveling": "\u6b63\u5728\u6574\u7406\u65c5\u884c",
      "now.traveling.body": "\u6574\u7406\u4e2d\u4e1c\u4e0e\u4e2d\u4e9a\u8def\u4e0a\u7684\u7b14\u8bb0\uff0c\u4e5f\u4e3a\u4e0b\u4e00\u6bb5\u65c5\u7a0b\u7559\u51fa\u7a7a\u95f4\u3002",
      "now.fitness": "\u8eab\u4f53",
      "now.fitness.body": "\u9a91\u8f66\u3001\u7761\u7720\u3001\u732e\u8840\u8bb0\u5f55\uff0c\u4ee5\u53ca\u4e0d\u8ba9\u8eab\u4f53\u843d\u5728\u91ce\u5fc3\u540e\u9762\u3002",
      "now.thoughts": "\u6700\u8fd1\u7684\u60f3\u6cd5",
      "now.thoughts.body": "\u771f\u6b63\u957f\u671f\u7684\u4e1c\u897f\uff0c\u901a\u5e38\u770b\u8d77\u6765\u90fd\u4e0d\u592a\u55a7\u95f9\u3002",

      "timeline.kicker": "\u4e2a\u4eba\u7eaa\u5f55\u7247",
      "timeline.title": "\u4eba\u751f\u65f6\u95f4\u7ebf",
      "timeline.subtitle": "\u4e0d\u662f\u7b80\u5386\uff0c\u800c\u662f\u4e00\u6761\u751f\u6d3b\u5982\u4f55\u6162\u6162\u5f62\u6210\u7684\u7ebf\u3002",
      "timeline.singapore": "\u6765\u5230\u65b0\u52a0\u5761",
      "timeline.singapore.body": "\u4ece\u719f\u6089\u7684\u4e2d\u6587\u4e16\u754c\u6765\u5230\u70ed\u5e26\u57ce\u5e02\uff0c\u5f00\u59cb\u91cd\u65b0\u5b66\u4e60\u751f\u6d3b\u7684\u5c3a\u5ea6\u3002",
      "timeline.smu": "SMU",
      "timeline.smu.body": "\u5728\u65b0\u52a0\u5761\u8bfb\u4e66\uff0c\u628a\u5b66\u672f\u8bad\u7ec3\u3001\u82f1\u6587\u73af\u5883\u548c\u672a\u6765\u7684\u804c\u4e1a\u65b9\u5411\u6162\u6162\u63a5\u4e0a\u3002",
      "timeline.pwc": "PwC Singapore",
      "timeline.pwc.body": "\u8fdb\u5165\u516c\u5171\u4f1a\u8ba1\u884c\u4e1a\uff0c\u5728\u6570\u5b57\u3001\u5236\u5ea6\u548c\u771f\u5b9e\u5546\u4e1a\u4e4b\u95f4\u5efa\u7acb\u8010\u5fc3\u3002",
      "timeline.blood": "\u7b2c\u4e00\u6b21\u732e\u8840",
      "timeline.blood.body": "\u4e00\u4e2a\u5f88\u5c0f\u4f46\u5f88\u5177\u4f53\u7684\u51b3\u5b9a\uff1a\u628a\u8eab\u4f53\u7684\u4e00\u90e8\u5206\u4ea4\u7ed9\u964c\u751f\u4eba\u3002",
      "timeline.research": "\u7814\u7a76\u53d1\u8868",
      "timeline.research.body": "\u628a\u957f\u671f\u9605\u8bfb\u548c\u95ee\u9898\u610f\u8bc6\uff0c\u6574\u7406\u6210\u53ef\u4ee5\u88ab\u4ed6\u4eba\u5f15\u7528\u7684\u6587\u5b57\u3002",
      "timeline.middleeast": "\u4e2d\u4e1c\u65c5\u884c",
      "timeline.middleeast.body": "\u7ea6\u65e6\u3001\u963f\u66fc\u3001\u4ee5\u8272\u5217\u3001\u571f\u8033\u5176\uff1a\u9053\u8def\u3001\u77f3\u5934\u3001\u6d77\u98ce\u548c\u53e4\u8001\u57ce\u5e02\u3002",
      "timeline.promotion": "\u5347\u4efb Senior Associate",
      "timeline.promotion.body": "\u804c\u4e1a\u751f\u6d3b\u8fdb\u5165\u65b0\u7684\u5bc6\u5ea6\uff0c\u4e5f\u5f00\u59cb\u66f4\u8ba4\u771f\u5730\u5b89\u6392\u81ea\u5df1\u7684\u957f\u671f\u6210\u957f\u3002",
      "timeline.journal": "\u642d\u5efa Ernest's Journal",
      "timeline.journal.body": "\u628a\u65e5\u8bb0\u3001\u65c5\u884c\u3001\u8ba1\u5212\u3001\u9605\u8bfb\u548c\u751f\u6d3b\u6307\u6807\u653e\u5728\u540c\u4e00\u4e2a\u5b89\u9759\u5165\u53e3\u3002",

      "map.title": "\u65c5\u884c\u5730\u56fe",
      "map.subtitle": "\u4e00\u5f20\u66f4\u50cf\u8bb0\u5fc6\u800c\u4e0d\u662f\u653b\u7565\u7684\u4e16\u754c\u5730\u56fe\u3002",
      "map.hint": "\u70b9\u51fb\u4e00\u4e2a\u56fd\u5bb6\uff0c\u67e5\u770b\u8def\u7ebf\u548c\u77ed\u8bb0\u3002",
      "map.oman": "\u963f\u66fc",
      "map.oman.body": "Muscat \u4e0e\u6d77\u8fb9\u516c\u8def\uff0c\u9ece\u660e\u524d\u7684\u98ce\u5f88\u8f7b\u3002",
      "map.jordan": "\u7ea6\u65e6",
      "map.jordan.body": "Amman \u5230 Petra\uff0c\u77f3\u5934\u50cf\u628a\u65f6\u95f4\u4fdd\u5b58\u4e86\u4e0b\u6765\u3002",
      "map.israel": "\u4ee5\u8272\u5217",
      "map.israel.body": "\u8036\u8def\u6492\u51b7\u7684\u51ac\u5929\uff0c\u5386\u53f2\u4e0e\u65e5\u5e38\u5e76\u6392\u884c\u8d70\u3002",
      "map.turkey": "\u571f\u8033\u5176",
      "map.turkey.body": "\u4f0a\u65af\u5766\u5e03\u5c14\u7684\u6d77\u5ce1\uFF0c\u50cf\u4e00\u6761\u7f13\u6162\u7684\u8fb9\u754c\u3002",
      "map.uzbekistan": "\u4e4c\u5179\u522b\u514b\u65af\u5766",
      "map.uzbekistan.body": "\u6492\u9a6c\u5c14\u7f55\u7684\u591c\u8f66\uff0c\u4e2d\u4e9a\u5728\u7a97\u5916\u6162\u6162\u540e\u9000\u3002",
      "map.bahrain": "\u5df4\u6797",
      "map.bahrain.body": "\u77ed\u6682\u505c\u7559\uff0c\u4e00\u5ea7\u6d77\u6e7e\u57ce\u5e02\u7684\u70ed\u548c\u5149\u3002",
      "map.singapore": "\u65b0\u52a0\u5761",
      "map.singapore.body": "\u4e0d\u53ea\u662f\u5730\u56fe\u4e0a\u7684\u70b9\uff0c\u4e5f\u662f\u73b0\u5728\u751f\u6d3b\u7684\u5750\u6807\u3002",
      "map.australia": "\u6fb3\u5927\u5229\u4e9a",
      "map.australia.body": "\u66f4\u5bbd\u7684\u5929\u5149\uff0c\u66f4\u6162\u7684\u8def\u3002",
      "map.thailand": "\u6cf0\u56fd",
      "map.thailand.body": "\u70ed\u5e26\u7684\u5468\u672b\uFF0c\u5728\u6f6e\u6e7f\u7a7a\u6c14\u91cc\u77ed\u6682\u9003\u79bb\u3002",

      "library.title": "\u4e66\u5f71\u97f3",
      "library.subtitle": "\u4e00\u5c42\u5b89\u9759\u7684\u79c1\u4eba\u4e66\u67b6\uff0c\u653e\u7740\u6700\u8fd1\u8bfb\u8fc7\u3001\u770b\u8fc7\u548c\u542c\u8fc7\u7684\u4e1c\u897f\u3002",
      "library.reading": "\u6b63\u5728\u8bfb",
      "library.watching": "\u6b63\u5728\u770b",
      "library.listening": "\u6b63\u5728\u542c",
      "library.book1": "\u7ecf\u6d4e\u5b66\u4e0e\u5236\u5ea6\uFF1A\u5173\u4e8e\u793e\u4f1a\u5982\u4f55\u8fd0\u8f6c\u7684\u6162\u9605\u8bfb\u3002",
      "library.book2": "\u65c5\u884c\u6587\u5b66\uFF1A\u8def\u4e0a\u7684\u89c2\u5bdf\u5982\u4f55\u53d8\u6210\u8bb0\u5fc6\u3002",
      "library.film1": "Before Sunrise\uff1a\u8c08\u8bdd\u3001\u706b\u8f66\u548c\u57ce\u5e02\u7684\u77ed\u6682\u5149\u4eae\u3002",
      "library.film2": "\u65e7\u7535\u5f71\u91cc\u7684\u6b65\u884c\u901f\u5ea6\uff0c\u6bd4\u5927\u591a\u6570\u5267\u60c5\u66f4\u4ee4\u4eba\u96be\u5fd8\u3002",
      "library.music1": "\u96e8\u58f0\u3001\u706b\u8f66\u548c\u4f4e\u97f3\u91cf\u7684\u591c\u95f4\u64ad\u5ba2\u3002",
      "library.music2": "\u9002\u5408\u5199\u5b57\u7684\u65e0\u4eba\u58f0\u6b4c\u5355\uff1a\u4e0d\u5360\u7528\u592a\u591a\u60c5\u7eea\u3002",

      "photos.title": "\u7167\u7247",
      "photos.subtitle": "\u4e00\u4e9b\u8def\u8fc7\u7684\u5149\u3001\u7a97\u53e3\u3001\u673a\u573a\u548c\u591c\u665a\u3002",
      "photos.streets": "\u8857\u9053",
      "photos.airports": "\u673a\u573a",
      "photos.desert": "\u6c99\u6f20",
      "photos.singapore": "\u65b0\u52a0\u5761",
      "photos.night": "\u591c\u665a",
      "photos.motion": "\u79fb\u52a8\u4e2d",

      "life.title": "\u65b0\u52a0\u5761\u751f\u6d3b\u4eea\u8868\u76d8",
      "life.subtitle": "\u4e00\u4e9b\u5b89\u9759\u7684\u6570\u5b57\uff0c\u7528\u6765\u770b\u89c1\u957f\u671f\u751f\u6d3b\u7684\u5f62\u72b6\u3002",
      "life.days": "\u5728\u65b0\u52a0\u5761\u7684\u5929\u6570",
      "life.countries": "\u53bb\u8fc7\u7684\u56fd\u5bb6",
      "life.articles": "\u5199\u4e0b\u7684\u6587\u7ae0",
      "life.blood": "\u732e\u8840\u6b21\u6570",
      "life.cycling": "\u9a91\u884c\u8ddd\u79bb",
      "life.scaq": "SCAQ \u8fdb\u5ea6",
      "life.books": "\u4eca\u5e74\u8bfb\u5b8c\u7684\u4e66",
      "life.inProgress": "\u7f13\u6162\u8fdb\u884c\u4e2d",

      "notes.kicker": "\u73b0\u4ee3\u516c\u8def\u6587\u5b66",
      "notes.title": "\u8def\u4e0a\u672d\u8bb0",
      "notes.subtitle": "\u8def\u4e0a\u7684\u77ed\u7ae0\uff0c\u57ce\u5e02\u8fb9\u7f18\u7684\u58f0\u97f3\uff0c\u4ee5\u53ca\u4e00\u4e9b\u8fd8\u6ca1\u6709\u957f\u6210\u5c0f\u8bf4\u7684\u8bb0\u5fc6\u3002",
      "notes.note1.title": "\u53bb\u6492\u9a6c\u5c14\u7f55\u7684\u591c\u8f66",
      "notes.note1.body": "\u8f66\u7a97\u50cf\u4e00\u5757\u9ed1\u8272\u73bb\u7483\uff0c\u628a\u4e2d\u4e9a\u7684\u591c\u8272\u548c\u81ea\u5df1\u7684\u8138\u53e0\u5728\u4e00\u8d77\u3002",
      "notes.note2.title": "\u9ece\u660e\u524d\u7684\u9a6c\u65af\u5580\u7279",
      "notes.note2.body": "\u57ce\u5e02\u8fd8\u6ca1\u6709\u5b8c\u5168\u9192\u6765\uff0c\u6d77\u8fb9\u7684\u98ce\u5148\u66ff\u5b83\u8bf4\u8bdd\u3002",
      "notes.note3.title": "\u51ac\u5929\u7684\u8036\u8def\u6492\u51b7",
      "notes.note3.body": "\u77f3\u5934\u5728\u51b7\u7a7a\u6c14\u91cc\u663e\u5f97\u66f4\u53e4\u8001\uff0c\u4eba\u7fa4\u5374\u50cf\u65e5\u5e38\u4e00\u6837\u7ecf\u8fc7\u3002",
      "notes.note4.title": "\u4e39\u620e\u5df4\u845b\uff0c\u51cc\u6668\u4e00\u70b9",
      "notes.note4.body": "\u529e\u516c\u697c\u5b89\u9759\u4e0b\u6765\u4ee5\u540e\uff0c\u8857\u9053\u624d\u5f00\u59cb\u9732\u51fa\u81ea\u5df1\u7684\u4f53\u6e29\u3002"
    },
    en: {
      "nav.home": "Home",
      "nav.diary": "Diary",
      "nav.stories": "Stories",
      "nav.notes": "Field Notes",
      "nav.now": "Now",
      "nav.timeline": "Timeline",
      "nav.travel": "Travel",
      "nav.map": "Map",
      "nav.library": "Library",
      "nav.photos": "Photos",
      "nav.life": "Life",
      "nav.plans": "Plans",
      "nav.about": "About",
      "theme.dark": "Night",
      "theme.light": "Day",
      "loading": "Loading",
      "visits": "Visits",
      "music.title": "Quiet Room",
      "music.paused": "Still",
      "music.ready": "Ready",
      "music.muted": "Muted",
      "music.preset.rain": "Rain",
      "music.preset.cafe": "Cafe",
      "music.preset.train": "Train",
      "music.preset.city": "Night city",
      "music.preset.desert": "Desert wind",
      "footer": "Ernest's Journal - a personal archive slowly built in Singapore",

      "now.date": "Updated May 2026",
      "now.title": "Now",
      "now.subtitle": "Quietly building a long-term life in Singapore.",
      "now.focus": "What I am focused on",
      "now.focus.body": "Finding a steadier rhythm for work, writing, travel, and the patient work of becoming.",
      "now.studying": "Studying",
      "now.studying.body": "Economics, public accounting, SCAQ, and the craft of making complicated ideas legible.",
      "now.building": "Building",
      "now.building.body": "Ernest's Journal: a slowly growing personal archive and digital garden.",
      "now.traveling": "Traveling",
      "now.traveling.body": "Sorting notes from the Middle East and Central Asia while leaving room for the next road.",
      "now.fitness": "Body",
      "now.fitness.body": "Cycling, sleep, blood donation records, and not letting the body fall behind ambition.",
      "now.thoughts": "Current thoughts",
      "now.thoughts.body": "The truly long-term things rarely look loud while they are being built.",

      "timeline.kicker": "Personal documentary",
      "timeline.title": "Life Timeline",
      "timeline.subtitle": "Not a resume, but a quiet line showing how a life slowly takes shape.",
      "timeline.singapore": "Coming to Singapore",
      "timeline.singapore.body": "Leaving a familiar Chinese-speaking world for a tropical city, learning a new scale of life.",
      "timeline.smu": "SMU",
      "timeline.smu.body": "Studying in Singapore, connecting academic discipline, English environments, and a future profession.",
      "timeline.pwc": "PwC Singapore",
      "timeline.pwc.body": "Entering public accounting and learning patience among numbers, systems, and real businesses.",
      "timeline.blood": "First blood donation",
      "timeline.blood.body": "A small but concrete decision: giving part of the body to someone unknown.",
      "timeline.research": "Research publications",
      "timeline.research.body": "Turning long reading and restless questions into words that others can cite.",
      "timeline.middleeast": "Middle East travels",
      "timeline.middleeast.body": "Jordan, Oman, Israel, Turkey: roads, stones, sea wind, and ancient cities.",
      "timeline.promotion": "Promotion to Senior Associate",
      "timeline.promotion.body": "A denser chapter of professional life, and a more serious arrangement with long-term growth.",
      "timeline.journal": "Building Ernest's Journal",
      "timeline.journal.body": "Gathering diary, travel, plans, reading, and life metrics into one quiet entrance.",

      "map.title": "Travel Map",
      "map.subtitle": "A map that behaves more like memory than itinerary.",
      "map.hint": "Click a country to read the route and a small reflection.",
      "map.oman": "Oman",
      "map.oman.body": "Muscat and the coastal road, with a light wind before dawn.",
      "map.jordan": "Jordan",
      "map.jordan.body": "From Amman to Petra, stone seemed to keep time for everyone.",
      "map.israel": "Israel",
      "map.israel.body": "Jerusalem in winter, history and daily life walking side by side.",
      "map.turkey": "Turkey",
      "map.turkey.body": "The Bosphorus in Istanbul, a slow border made of water.",
      "map.uzbekistan": "Uzbekistan",
      "map.uzbekistan.body": "The night bus to Samarkand, Central Asia moving past the window.",
      "map.bahrain": "Bahrain",
      "map.bahrain.body": "A brief stop, a Gulf city made of heat and light.",
      "map.singapore": "Singapore",
      "map.singapore.body": "Not only a point on the map, but the coordinate of daily life now.",
      "map.australia": "Australia",
      "map.australia.body": "Wider light, slower roads.",
      "map.thailand": "Thailand",
      "map.thailand.body": "A tropical weekend, a short escape in humid air.",

      "library.title": "Reading / Watching / Listening",
      "library.subtitle": "A quiet private shelf of what has recently been read, watched, and heard.",
      "library.reading": "Reading",
      "library.watching": "Watching",
      "library.listening": "Listening",
      "library.book1": "Economics and institutions: slow reading about how societies operate.",
      "library.book2": "Travel writing: how observation on the road becomes memory.",
      "library.film1": "Before Sunrise: conversation, trains, and the brief brightness of a city.",
      "library.film2": "The walking pace of old films often stays longer than plot.",
      "library.music1": "Rain, trains, and low-volume night podcasts.",
      "library.music2": "Wordless playlists for writing, quiet enough not to occupy the whole room.",

      "photos.title": "Photos",
      "photos.subtitle": "Some passing light, windows, airports, and nights.",
      "photos.streets": "Streets",
      "photos.airports": "Airports",
      "photos.desert": "Desert",
      "photos.singapore": "Singapore",
      "photos.night": "Night",
      "photos.motion": "In motion",

      "life.title": "Singapore Life Dashboard",
      "life.subtitle": "Quiet numbers for seeing the shape of a long-term life.",
      "life.days": "Days in Singapore",
      "life.countries": "Countries visited",
      "life.articles": "Articles written",
      "life.blood": "Blood donations",
      "life.cycling": "Cycling distance",
      "life.scaq": "SCAQ progress",
      "life.books": "Books finished this year",
      "life.inProgress": "Slowly in progress",

      "notes.kicker": "Modern road literature",
      "notes.title": "Field Notes",
      "notes.subtitle": "Short pieces from the road, city edges, and memories not yet grown into stories.",
      "notes.note1.title": "Night Bus to Samarkand",
      "notes.note1.body": "The bus window was black glass, folding Central Asian night over my own face.",
      "notes.note2.title": "Muscat Before Dawn",
      "notes.note2.body": "Before the city fully woke, the wind by the sea spoke first.",
      "notes.note3.title": "Jerusalem in Winter",
      "notes.note3.body": "Stone felt older in the cold air, while people passed as if it were ordinary.",
      "notes.note4.title": "Tanjong Pagar, 1AM",
      "notes.note4.body": "After the office buildings quieted down, the street began to show its own temperature."
    }
  };

  function normalize(lang){
    return lang === "en" ? "en" : "zh";
  }

  function lang(){
    return normalize(localStorage.getItem(storageKey) || "zh");
  }

  function t(key, selectedLang){
    const activeLang = normalize(selectedLang || lang());
    return translations[activeLang][key] || translations.zh[key] || translations.en[key] || "";
  }

  function apply(selectedLang){
    const activeLang = normalize(selectedLang || lang());
    localStorage.setItem(storageKey, activeLang);
    document.documentElement.lang = activeLang === "zh" ? "zh-CN" : "en";

    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const value = t(node.getAttribute("data-i18n"), activeLang);
      if(value) node.textContent = value;
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
      const value = t(node.getAttribute("data-i18n-aria"), activeLang);
      if(value) node.setAttribute("aria-label", value);
    });

    document.querySelectorAll("[data-lang-option]").forEach((button) => {
      button.classList.toggle("active", button.dataset.langOption === activeLang);
      button.textContent = button.dataset.langOption === "zh" ? "\u4e2d\u6587" : "EN";
    });

    document.body.classList.add("language-fade");
    window.setTimeout(() => document.body.classList.remove("language-fade"), 220);
    window.dispatchEvent(new CustomEvent("ernest:languagechange", { detail: { lang: activeLang } }));
  }

  window.ErnestI18n = { translations, lang, t, apply };
})();
