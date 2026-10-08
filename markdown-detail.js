async function loadMarkdownDetail(app, container) {
  try {
    const detailFile = app.detailFile || `/details/${app.id}/detail.md`;
    const response = await fetch(detailFile, { cache: 'no-cache' });
    if (
      !response.ok ||
      response.headers.get('content-type')?.includes('text/html')
    ) {
      throw new Error('无法读取详情文件');
    }
    const source = await response.text();
    container.innerHTML = DOMPurify.sanitize(marked.parse(source), {
      USE_PROFILES: { html: true },
    });
    // 相对图片和链接以 Markdown 文件所在目录为基准。
    const base = new URL(response.url || detailFile, location.href);
    for (const element of container.querySelectorAll('img[src], a[href]')) {
      const attribute = element.tagName === 'IMG' ? 'src' : 'href';
      const value = element.getAttribute(attribute);
      if (value.startsWith('#')) continue;
      const url = new URL(value, base);
      element.setAttribute(attribute, url.href);
      if (
        element.tagName === 'A' &&
        ['http:', 'https:'].includes(url.protocol) &&
        (url.origin !== location.origin || /\.pdf$/i.test(url.pathname))
      ) {
        element.setAttribute('target', '_blank');
        element.setAttribute('rel', 'noopener noreferrer');
      }
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
