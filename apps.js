// 在数组中增加一项，即可生成卡片和详情页。
const apps = [
  {
    id: '001',
    name: '双塔导览剧情游戏',
    en: 'Interactive Story Game of Twin Pagoda',
    desc: '在实地游览苏州双塔的过程中游玩该交互游戏，以更有趣、更沉浸式的方式了解双塔的历史。',
    cover: '/apps/game/imgs/twin_pagoda/bg.png',
    color: 'green',
    appUrl: '/apps/twin_pagoda/',
    contentHtml: `
      <h2>在对话中探索苏州双塔</h2>
      <p>以苏州罗汉院双塔及正殿遗址为背景，通过与妙思住持对话，了解寺院历史、双塔建筑和文化价值。</p>

      <h2>如何体验</h2>
      <p>打开应用后点击“开始游戏”，阅读对话并选择感兴趣的话题。可以查看历史对话、探索不同分支，完整探索可解锁成就。</p>
      <p>游戏适合在手机上体验，无需注册或上传文件。</p>
    `,
  },
  {
    id: '002',
    name: 'ScrAIter',
    en: 'AI Script Co-creator',
    desc: '面向文化遗产的 AI 辅助交互剧本创作工具，浏览资料、知识库和剧情结构。',
    cover: '/images/scraiter-cover.png',
    color: 'green',
    appUrl: '/apps/scraiter/',
    contentHtml: `
      <h2>与 AI 共创文化遗产故事</h2>
      <p>ScrAIter 将资料管理、知识库和交互剧本编辑整合在同一个工作空间，通过可视化剧情结构组织故事分支与角色对话。</p>

      <h2>如何体验</h2>
      <p>打开应用后，可以浏览预设项目、查看剧情树和场景内容，也可以查看资料与知识库列表。</p>
      <p>当前为只读展示版，上传、修改、保存和 AI 生成功能不开放。</p>
    `,
  },
  {
    id: '003',
    name: '文物探索',
    en: 'Museum UGC Prototype',
    desc: '通过留言、话题和导览，从不同观众的视角探索文物故事。',
    cover: '/images/museum-ugc-cover.png',
    color: 'yellow',
    appUrl: '/apps/museum-ugc/',
    contentHtml: `
      <h2>从观众的视角探索文物</h2>
      <p>围绕文物与观众创作的内容，尝试不同的观展方式，在故事、交流和导览中发现文物的更多细节。</p>

      <h2>如何体验</h2>
      <p>打开应用后，可以选择“TA在说”“跟TA走”“TA们说”或“跟TA们走”，浏览文物、阅读预设内容并体验互动导览。</p>
      <p>这是纯前端原型。留言、话题回复和导览进度仅保存在当前页面，刷新后重置。</p>
    `,
  },
];
