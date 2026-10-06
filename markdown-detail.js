async function loadMarkdownDetail(app, container) {
  try {
    if (!app.detailFile) throw new Error('未配置详情文件');
    const response = await fetch(app.detailFile, { cache: 'no-cache' });
    if (!response.ok || response.headers.get('content-type')?.includes('text/html')) {
      throw new Error('无法读取详情文件');
    }
    const source = await response.text();
    container.innerHTML = DOMPurify.sanitize(marked.parse(source), { USE_PROFILES: { html: true } });
    // 相对图片和链接以 Markdown 文件所在目录为基准。
    const base = new URL(app.detailFile, location.href);
    for (const element of container.querySelectorAll('img[src], a[href]')) {
      const attribute = element.tagName === 'IMG' ? 'src' : 'href';
      const value = element.getAttribute(attribute);
      if (value.startsWith('#')) continue;
      element.setAttribute(attribute, new URL(value, base).href);
    }
  } catch (error) {
    container.replaceChildren();
    const message = document.createElement('p');
    message.setAttribute('role', 'alert');
    message.textContent = '介绍加载失败，请刷新重试。';
    const retry = document.createElement('button');
    retry.type = 'button';
    retry.className = 'primary';
    retry.textContent = '重新加载';
    retry.onclick = () => loadMarkdownDetail(app, container);
    container.append(message, retry);
  }
}
