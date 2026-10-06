// id 使用 YYYYMMDD 日期格式；主页自动按日期倒序展示。
const apps = [
  {
    id: '20250825',
    name: '双塔导览剧情游戏',
    en: 'Interactive Story Game of Twin Pagoda',
    desc: '在实地游览苏州双塔的过程中游玩该交互游戏，以更有趣、更沉浸式的方式了解双塔的历史。',
    cover: '/apps/twin_pagoda_interaction_game/imgs/twin_pagoda/bg.png',
    appUrl: '/apps/twin_pagoda_interaction_game/',
    detailFile: '/details/20250825.md',
  },
  {
    id: '20251024',
    name: 'ScrAIter',
    en: 'ScrAIter',
    desc: 'AI驱动的交互游戏脚本创作工具。',
    cover: '/images/scraiter-cover.png',
    appUrl: '/apps/scraiter/',
    detailFile: '/details/20251024.md',
  },
  {
    id: '20251225',
    name: '博物馆UGC展示原型',
    en: 'Museum UGC Prototype',
    desc: '以不同方式展示游客对文物发表的想法。',
    cover: '/images/museum-ugc-cover.png',
    appUrl: '/apps/museum-ugc/',
    detailFile: '/details/20251225.md',
  },
].sort((a, b) => b.id.localeCompare(a.id));

