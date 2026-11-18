// id 使用 YYYYMMDD 日期格式；主页自动按日期倒序展示。
const apps = [
  {
    id: '20250825',
    name: '双塔导览剧情游戏',
    en: 'Interactive Story Game of Twin Pagoda',
    desc: '在实地游览苏州双塔的过程中游玩该交互游戏，以更有趣、更沉浸式的方式了解双塔的历史。',
    cover: '/apps/twin_pagoda_interaction_game/imgs/twin_pagoda/bg.png',
    appUrl: '/apps/twin_pagoda_interaction_game/',
    detailFile: '/details/20250825/detail.md',
  },
  {
    id: '20251024',
    name: 'ScrAIter',
    en: 'ScrAIter',
    desc: '基于RAG技术的AI驱动交互游戏脚本创作工具。',
    cover: '/images/scraiter-cover.png',
    appUrl: '/apps/scraiter/',
    detailFile: '/details/20251024/detail.md',
  },
  {
    id: '20251225',
    name: '博物馆UGC展示原型',
    en: 'Museum UGC Prototype',
    desc: '博物馆内游客想法（UGC）的展示原型。',
    cover: '/images/museum-ugc-cover.png',
    appUrl: '/apps/museum-ugc/',
    detailFile: '/details/20251225/detail.md',
  },
].sort((a, b) => b.id.localeCompare(a.id));
