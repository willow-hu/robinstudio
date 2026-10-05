const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
function art(a) {
 if (a.cover) return `<div class="art ${a.color || 'green'}"><img class="app-cover" src="${a.cover}" alt="${a.name}界面预览"></div>`;
 const visuals={focus:'<div class="timer"><span>FOCUS TIME</span><strong>25:00</strong><i>开始专注 &nbsp; ▶</i></div>',notes:'<div class="note note-back"></div><div class="note"><span>随手记下</span><b>让想法<br>有处可去。</b><small>今天，慢一点也可以。</small></div>',palette:'<div class="swatches"><i></i><i></i><i></i><i></i><i></i></div><span class="art-caption">A PALETTE FOR A SLOW AFTERNOON</span>',game:'<div class="tiles">'+[1,2,3,4,5,6,7,8,''].map(n=>`<i>${n}</i>`).join('')+'</div>',weather:'<div class="weather"><span>MONDAY, A GOOD DAY</span><div class="sun"></div><strong>24°</strong><small>晴，适合出去走走。</small></div>',links:'<div class="bookmark"><b>My little collection <span>↗</span></b><p><i>✳</i> 灵感与设计 <span>↗</span></p><p><i>◈</i> 好用的小工具 <span>↗</span></p><p><i>≋</i> 留待阅读 <span>↗</span></p></div>'};
 return `<div class="art ${a.color}">${visuals[a.type]}</div>`;
}
function profile(){return renderProfile(profileConfig);}
const root=document.querySelector('#root');
const match=location.pathname.match(/^\/(projects|app)\/([^/]+)\/?$/);
const current=match && apps.find(a=>a.id===match[2]);
if(location.pathname==='/'){
 root.innerHTML=`<aside class="sidebar">${profile()}</aside><header class="mobile-header"><button id="menu" aria-label="打开个人资料" aria-haspopup="dialog">☰</button><span>HU / STUDIO</span></header><main class="home"><header class="page-heading"><h1>我的应用</h1></header><div class="grid">${apps.map(renderAppCard).join('')}</div></main><dialog id="profile-drawer"><button class="close" aria-label="关闭个人资料">×</button>${profile()}</dialog>`;
 const drawer=document.querySelector('dialog');
 document.querySelector('#menu').onclick=()=>{drawer.showModal();document.body.classList.add('drawer-open');};
 function close(){drawer.close();document.body.classList.remove('drawer-open');}
 drawer.querySelector('.close').onclick=close;
 drawer.addEventListener('click',e=>{if(e.target===drawer){const r=drawer.getBoundingClientRect();if(e.clientX>r.right||e.clientY>r.bottom||e.clientX<r.left||e.clientY<r.top)close();}});
 drawer.addEventListener('close',()=>document.body.classList.remove('drawer-open'));
}else if(current && match[1]==='projects'){
 document.title=current.name+' — HU';
 root.innerHTML=renderAppDetail(current);
}else if(current){
 document.title=current.name+' — 示例应用';
 root.innerHTML=`<main class="demo"><a class="demo-back" href="/projects/${current.id}">← 作品介绍</a><span class="eyebrow">示例应用</span><h1>${current.name}</h1>${art(current)}<p>${current.id==='focus'?'点击下方按钮，试试专注计时。':'此处用于演示应用独立打开的效果，之后替换为你的真实 App。'}</p>${current.id==='focus'?'<button class="primary" id="start">开始专注</button>':''}</main>`;
 if(current.id==='focus'){let remaining=1500,interval;const btn=document.querySelector('#start');btn.onclick=()=>{if(interval){clearInterval(interval);interval=null;btn.textContent='继续专注';return;}btn.textContent='暂停';interval=setInterval(()=>{remaining=Math.max(0,remaining-1);document.querySelector('.timer strong').textContent=String(Math.floor(remaining/60)).padStart(2,'0')+':'+String(remaining%60).padStart(2,'0');if(!remaining){clearInterval(interval);interval=null;btn.textContent='已完成';btn.disabled=true;}},1000);};}
}else{
 root.innerHTML='<main class="detail"><h1>这个页面还不存在。</h1><a class="primary" href="/">返回主页</a></main>';
}






