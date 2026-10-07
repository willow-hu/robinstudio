const arrow =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
function art(a) {
  if (a.cover)
    return `<div class="art">
  <img class="app-cover" src="${a.cover}" alt="${a.name}界面预览">
  </div>`;
  return '<div class="art"></div>';
}
function profile() {
  return renderProfile(profileConfig);
}
const root = document.querySelector('#root');
const match = location.pathname.match(/^\/(projects)\/([^/]+)\/?$/);
const current = match && apps.find((a) => a.id === match[2]);
if (location.pathname === '/') {
  root.innerHTML = `<aside class="sidebar">${profile()}</aside>
  <header class="mobile-header">
  <button id="menu" aria-label="打开个人资料" aria-haspopup="dialog">☰</button>
  <span>ROBIN STUDIO</span>
  </header>
  <main class="home">
  <header class="page-heading">
  <h1>我的应用</h1>
  </header>
  <div class="grid">${apps.map(renderAppCard).join('')}</div>
  </main>
  <dialog id="profile-drawer">
  <button class="close" aria-label="关闭个人资料">×</button>${profile()}</dialog>`;
  const drawer = document.querySelector('dialog');
  document.querySelector('#menu').onclick = () => {
    drawer.showModal();
    document.body.classList.add('drawer-open');
  };
  function close() {
    drawer.close();
    document.body.classList.remove('drawer-open');
  }
  drawer.querySelector('.close').onclick = close;
  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) {
      const r = drawer.getBoundingClientRect();
      if (
        e.clientX > r.right ||
        e.clientY > r.bottom ||
        e.clientX < r.left ||
        e.clientY < r.top
      )
        close();
    }
  });
  drawer.addEventListener('close', () =>
    document.body.classList.remove('drawer-open'),
  );
} else if (current && match[1] === 'projects') {
  document.title = current.name + ' — ROBIN STUDIO';
  root.innerHTML = renderAppDetail(current);
  loadMarkdownDetail(current, root.querySelector('.prose'));
} else {
  root.innerHTML =
    '<main class="detail"><h1>这个页面还不存在。</h1><a class="primary" href="/">返回主页</a></main>';
}
