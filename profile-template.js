function escapeProfile(value) {
  return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}

function profileWebUrl(value) {
  try {
    const url = new URL(String(value).trim());
    return ['https:', 'http:'].includes(url.protocol) ? url.href : '';
  } catch { return ''; }
}

function renderProfile(config) {
  const name = String(config.name || '').trim();
  const bio = String(config.bio || '').trim();
  const icons = { github: 'github.svg', email: 'email.svg', weibo: 'weibo.svg', zhihu: 'zhihu.svg', bilibili: 'bilibili.svg', xiaohongshu: 'rednote.svg', x: 'twitter-x.svg', linkedin: 'linkedin.svg', website: 'personal_webpage.svg' };
  const links = [];
  for (const social of config.socials || []) {
    const value = String(social.url || '').trim();
    const url = social.icon === 'email'
      ? (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'mailto:' + encodeURIComponent(value) : '')
      : profileWebUrl(value);
    if (url) links.push({...social, url});
  }
  let avatar = '';
  const image = String(config.avatar || '').trim();
  if (image && (image.startsWith('/') && !image.startsWith('//') || profileWebUrl(image))) {
    avatar = `<img class="profile-avatar" src="${escapeProfile(image)}" alt="${name ? escapeProfile(name) + '的头像' : '个人头像'}">`;
  }
  return `<div class="profile-content">${avatar}
    ${name ? `<h2>${escapeProfile(name)}</h2>` : ''}${bio ? `<p class="bio">${escapeProfile(bio)}</p>` : ''}
    ${links.length ? `<div class="profile-links">${links.map(link => `<a href="${escapeProfile(link.url)}" aria-label="${escapeProfile(link.name)}" title="${escapeProfile(link.name)}"${link.icon === 'email' ? '' : ' target="_blank" rel="noopener noreferrer"'}><span class="social-icon" aria-hidden="true" style="--icon-url:url('/images/icons/${icons[link.icon] || 'link.svg'}')"></span></a>`).join('')}</div>` : ''}
    <div class="profile-bottom"><span class="copyright">© ${new Date().getFullYear()}${name ? ' ' + escapeProfile(name) : ''}</span></div></div>`;
}
