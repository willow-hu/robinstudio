// 共享模板：结构统一，详情正文可以按应用自由编排。
function renderAppCard(app) {
  return `<a class="card" href="/projects/${app.id}">${art(app)}<div class="card-copy">
  <h2>${app.name}</h2>
  <p>${app.desc}</p>
  </div>
  </a>`;
}

function renderAppDetail(app) {
  return `<header class="detail-nav">
  <a href="/"><span class="back-chevron" aria-hidden="true"></span>返回主页</a>
  <span>ROBIN STUDIO</span>
  </header>
  <main class="detail">
  <div class="detail-actions">${app.appUrl ? `<a class="primary" href="${app.appUrl}" target="_blank" rel="noopener noreferrer">打开应用 ${arrow}</a>` : ''}</div>
  <div class="prose">
  <p role="status">正在加载介绍…</p>
  </div>
  </main>`;
}
