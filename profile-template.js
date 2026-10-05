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
  const icons = { github: 'GH', email: '✉', weibo: '微', zhihu: '知', bilibili: '哔', xiaohongshu: '红', x: '𝕏', linkedin: 'in', website: '↗' };
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
  return `<div class="profile-content">${avatar}<span class="eyebrow">个人资料</span>
    ${name ? `<h2>${escapeProfile(name)}</h2>` : ''}${bio ? `<p class="bio">${escapeProfile(bio)}</p>` : ''}
    ${links.length ? `<div class="profile-links">${links.map(link => `<a href="${escapeProfile(link.url)}" aria-label="${escapeProfile(link.name)}" title="${escapeProfile(link.name)}"${link.icon === 'email' ? '' : ' target="_blank" rel="noopener noreferrer"'}><span aria-hidden="true">${icons[link.icon] || '↗'}</span></a>`).join('')}</div>` : ''}
    <div class="profile-bottom"><span class="copyright">© ${new Date().getFullYear()}${name ? ' ' + escapeProfile(name) : ''}</span></div></div>`;
}
