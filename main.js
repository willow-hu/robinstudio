const apps = [
  {id:'focus',name:'片刻',en:'A little room to focus',desc:'留一段时间，只做眼前的一件事。',type:'focus',color:'green',body:'忙碌的时候，给自己留一个安静的角落。片刻是一个简单的专注计时器，打开就可以开始，不需要注册，也没有复杂的设置。'},
  {id:'notes',name:'随记',en:'Catch a passing thought',desc:'把一闪而过的想法，轻轻记下来。',type:'notes',color:'yellow',body:'一些想法值得被记住。随记用轻巧的便签收集灵感，让文字回到最简单的样子。'},
  {id:'palette',name:'拾色',en:'Colors that belong together',desc:'发现喜欢的颜色，组合自己的配色。',type:'palette',color:'pink',body:'从一个喜欢的颜色开始，寻找与它相处融洽的色彩。拾色是一场关于颜色的小实验。'},
  {id:'game',name:'方块之间',en:'One more little move',desc:'一个不用着急的小小拼图游戏。',type:'game',color:'blue',body:'把散落的方块放回它们的位置。没有排行榜，也不用争分夺秒，只享受完成拼图的那一刻。'},
  {id:'weather',name:'晴日',en:'A window to the outside',desc:'看看窗外的天气，再决定今天的计划。',type:'weather',color:'peach',body:'晴日把天气变成一张简单的日常卡片，用清楚的数字与柔和的色彩，呈现一天的变化。'},
  {id:'links',name:'小书签',en:'Good things, kept close',desc:'为值得再看的网页，留一个位置。',type:'links',color:'purple',body:'有趣的文章、好用的工具、值得收藏的灵感。小书签把它们放到一个容易找到的地方。'}
];
const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
function art(a) {
 const visuals={focus:'<div class="timer"><span>FOCUS TIME</span><strong>25:00</strong><i>开始专注 &nbsp; ▶</i></div>',notes:'<div class="note note-back"></div><div class="note"><span>随手记下</span><b>让想法<br>有处可去。</b><small>今天，慢一点也可以。</small></div>',palette:'<div class="swatches"><i></i><i></i><i></i><i></i><i></i></div><span class="art-caption">A PALETTE FOR A SLOW AFTERNOON</span>',game:'<div class="tiles">'+[1,2,3,4,5,6,7,8,''].map(n=>`<i>${n}</i>`).join('')+'</div>',weather:'<div class="weather"><span>MONDAY, A GOOD DAY</span><div class="sun"></div><strong>24°</strong><small>晴，适合出去走走。</small></div>',links:'<div class="bookmark"><b>My little collection <span>↗</span></b><p><i>✳</i> 灵感与设计 <span>↗</span></p><p><i>◈</i> 好用的小工具 <span>↗</span></p><p><i>≋</i> 留待阅读 <span>↗</span></p></div>'};
 return `<div class="art ${a.color}">${visuals[a.type]}</div>`;
}
function profile(){return `<div class="profile-content"><div class="monogram">H<span>u</span></div><span class="eyebrow">个人资料</span><h2>Hu<span class="dot">.</span></h2><p class="bio">开发者。<br>偶尔做工具，偶尔做游戏。</p><div class="profile-rule"></div><p class="intro">这里收集我做过的 Web App。<br>点击右侧卡片，了解或试用。</p><div class="socials"><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="mailto:hello@example.com">Email ↗</a></div><div class="profile-bottom"><span class="online-dot"></span> 正在做新的东西<span class="copyright">© 2026 Hu</span></div></div>`;}
const root=document.querySelector('#root');
const match=location.pathname.match(/^\/(projects|app)\/([^/]+)\/?$/);
const current=match && apps.find(a=>a.id===match[2]);
if(location.pathname==='/'){
 root.innerHTML=`<aside class="sidebar">${profile()}</aside><header class="mobile-header"><button id="menu" aria-label="打开个人资料" aria-haspopup="dialog">☰</button><span>HU / STUDIO</span></header><main class="home"><header class="page-heading"><div><span class="eyebrow">应用收集册</span><h1>我的应用<span class="dot">.</span></h1><p>我做的工具、游戏和实验。</p></div><span class="count">${String(apps.length).padStart(2,'0')} 个作品</span></header><div class="grid">${apps.map(a=>`<a class="card" href="/projects/${a.id}">${art(a)}<div class="card-copy"><span class="card-arrow">${arrow}</span><h2>${a.name}</h2><p>${a.desc}</p></div></a>`).join('')}</div><footer class="home-footer"><span>HU / 个人作品</span><span>持续更新</span></footer></main><dialog id="profile-drawer"><button class="close" aria-label="关闭个人资料">×</button>${profile()}</dialog>`;
 const drawer=document.querySelector('dialog');
 document.querySelector('#menu').onclick=()=>{drawer.showModal();document.body.classList.add('drawer-open');};
 function close(){drawer.close();document.body.classList.remove('drawer-open');}
 drawer.querySelector('.close').onclick=close;
 drawer.addEventListener('click',e=>{if(e.target===drawer){const r=drawer.getBoundingClientRect();if(e.clientX>r.right||e.clientY>r.bottom||e.clientX<r.left||e.clientY<r.top)close();}});
 drawer.addEventListener('close',()=>document.body.classList.remove('drawer-open'));
}else if(current && match[1]==='projects'){
 document.title=current.name+' — HU';
 root.innerHTML=`<header class="detail-nav"><a href="/">← 返回主页</a><span>HU / STUDIO</span></header><main class="detail"><span class="eyebrow">${current.en.toUpperCase()}</span><div class="detail-title"><h1>${current.name}<span class="dot">.</span></h1><a class="primary" href="/app/${current.id}/">打开应用 ${arrow}</a></div><p class="lead">${current.desc}</p>${art(current)}<div class="prose"><h2>${current.id==='focus'?'给专注一点空间':'一个小想法，变成一个小应用'}</h2><p>${current.body}</p><p>这是用于确认网站设计的示例作品。这里可以自由加入你的制作故事、使用说明和更多图片，按作品需要编排。</p></div><a class="text-back" href="/">← 看看其他应用</a></main>`;
}else if(current){
 document.title=current.name+' — 示例应用';
 root.innerHTML=`<main class="demo"><a class="demo-back" href="/projects/${current.id}">← 作品介绍</a><span class="eyebrow">示例应用</span><h1>${current.name}</h1>${art(current)}<p>${current.id==='focus'?'点击下方按钮，试试专注计时。':'此处用于演示应用独立打开的效果，之后替换为你的真实 App。'}</p>${current.id==='focus'?'<button class="primary" id="start">开始专注</button>':''}</main>`;
 if(current.id==='focus'){let remaining=1500,interval;const btn=document.querySelector('#start');btn.onclick=()=>{if(interval){clearInterval(interval);interval=null;btn.textContent='继续专注';return;}btn.textContent='暂停';interval=setInterval(()=>{remaining=Math.max(0,remaining-1);document.querySelector('.timer strong').textContent=String(Math.floor(remaining/60)).padStart(2,'0')+':'+String(remaining%60).padStart(2,'0');if(!remaining){clearInterval(interval);interval=null;btn.textContent='已完成';btn.disabled=true;}},1000);};}
}else{
 root.innerHTML='<main class="detail"><h1>这个页面还不存在。</h1><a class="primary" href="/">返回主页</a></main>';
}

