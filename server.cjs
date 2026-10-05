const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
http.createServer((req,res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname); } catch { res.writeHead(400); return res.end(); }
  const file = path.resolve(root,'.'+pathname);
  if (!file.startsWith(root+path.sep) && file !== root) { res.writeHead(403); return res.end(); }
  const target = fs.existsSync(file) && fs.statSync(file).isFile() ? file : path.join(root,'index.html');
  const types = {'.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8'};
  res.writeHead(200,{'Content-Type':types[path.extname(target)] || 'application/octet-stream'});
  fs.createReadStream(target).pipe(res);
}).listen(5173,'127.0.0.1',()=>console.log('Preview: http://127.0.0.1:5173'));

