const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const server = http.createServer((req,res) => {
  let pathname;
  let url;
  try { url = new URL(req.url,'http://localhost'); pathname = decodeURIComponent(url.pathname); } catch { res.writeHead(400); return res.end(); }
  const file = path.resolve(root,'.'+pathname);
  if (!file.startsWith(root+path.sep) && file !== root) { res.writeHead(403); return res.end(); }
  let target = file;
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    if (!pathname.endsWith('/')) {
      res.writeHead(308, { Location: url.pathname + '/' + url.search });
      return res.end();
    }
    target = path.join(file, 'index.html');
  }
  if (!fs.existsSync(target) || !fs.statSync(target).isFile()) {
    if (pathname === '/apps' || pathname.startsWith('/apps/') || pathname.startsWith('/details/')) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Not found');
    }
    target = path.join(root, 'index.html');
  }
  const types = {'.pdf':'application/pdf','.mp4':'video/mp4','.webm':'video/webm','.mp3':'audio/mpeg','.ogg':'audio/ogg','.wav':'audio/wav','.md':'text/markdown; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8'};
  res.writeHead(200,{'Content-Type':types[path.extname(target)] || 'application/octet-stream'});
  fs.createReadStream(target).pipe(res);
});
server.listen(Number(process.env.PORT ?? 5173),'127.0.0.1',()=>console.log(`Preview: http://127.0.0.1:${server.address().port}`));

