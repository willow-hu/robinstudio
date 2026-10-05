// 共享模板：结构统一，详情正文可以按应用自由编排。
function renderAppCard(app) {
  return `<a class="card" href="/projects/${app.id}">${art(app)}<div class="card-copy"><h2>${app.name}</h2><p>${app.desc}</p></div></a>`;
}

function renderAppDetail(app) {
  return `<header class="detail-nav"><a href="/">← 返回主页</a><span>HU / STUDIO</span></header><main class="detail"><div class="detail-title"><h1>${app.name}<span class="dot">.</span></h1><a class="primary" href="${app.appUrl || `/app/${app.id}/`}" target="_blank" rel="noopener noreferrer">打开应用 ${arrow}</a></div><p class="lead">${app.desc}</p>${art(app)}<div class="prose">${app.contentHtml || `<h2>${app.heading || '一个小想法，变成一个小应用'}</h2><p>${app.body}</p><p>这是用于确认网站设计的示例作品。这里可以自由加入你的制作故事、使用说明和更多图片，按作品需要编排。</p>`}</div></main>`;
}
