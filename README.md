# 个人应用展厅

运行 `npm run dev`，打开 http://127.0.0.1:5173。

无第三方依赖。主页、详情页和示例应用使用独立 URL，支持直接访问与刷新。

- `apps.js`：应用列表，每项数据自动生成一张卡片和一个详情页。
- `templates.js`：所有卡片和详情页共用的模板。
- `main.js`：路由、个人资料与交互。
- `style.css`：桌面与手机布局。
- `forest.css`：林中女巫主题；在基础样式后加载，优先在这里修改视觉样式。
- `server.cjs`：本地预览服务器，仅监听本机。

已接入“塔影千年”剧情游戏。专注计时器可体验，随记应用页为占位预览。

正式发布时，需要服务器支持 `/projects/*` 和现有 `/app/*` 示例页的页面回退；`/apps/game/` 独立提供游戏静态文件。

## 添加应用

## 填写个人资料

编辑 `profile-config.js`，无需修改页面模板：

- `name`：姓名，可留空；为空不显示。
- `bio`：简介，可留空；使用 `\n` 换行，为空不显示。
- `avatar`：头像图片路径，如 `/images/me.jpg`；把图片放入 `images/` 目录。留空隐藏图片。默认头像为占位图。
- `socials`：统一配置 GitHub、Email 和其他社媒，均可选；填写对应 `url`，空地址不显示，也可以增加条目。Email 条目的 `icon` 使用 `email`，`url` 只填邮箱地址。

`profile-template.js` 是桌面侧栏和手机资料抽屉共享的模板。链接带图标、悬停名称和无障碍名称；不合法的网页地址不会显示。图标使用 images/icons/ 下的 SVG 文件，以 CSS mask 统一采用主题颜色，不依赖外部图标服务。icon 字段对应 profile-template.js 中的文件映射；未知类型使用 link.svg。

## 应用数据示例

在 `apps.js` 的数组中添加对象，`id` 使用唯一的英文、数字或连字符名称：

```js
{
  id: 'my-app',
  name: '我的应用',
  desc: '一句话介绍',
  cover: '/images/my-app.png',
  color: 'green',
  appUrl: '/apps/my-app/', // 可选：真实应用入口，不填则使用 /app/my-app/
  body: '详情介绍正文'
}
```

把封面图片放在项目 `images/` 目录。新对象会自动得到 `/projects/my-app` 详情页；真实应用通过 `appUrl` 指定入口，文件仍需单独接入。

详情正文需要自由排版时，用 `contentHtml` 替代默认正文，例如：

```js
contentHtml: `<h2>为什么做这个应用</h2>
<p>你的介绍。</p>
<img src="/images/my-app-detail.png" alt="功能截图">
<p>更多说明。</p>`
```

`contentHtml` 仅用于开发者在代码中编写的可信内容，不接收用户提交的 HTML。

修改 `renderAppCard` 会作用于所有卡片；修改 `renderAppDetail` 会作用于所有详情页的公共结构。公共 CSS 修改也会统一生效，封面配色或各自正文的专用样式只作用于对应内容。

## 游戏接入与更新

- 介绍页：`/projects/game`
- 游戏入口：`/apps/game/`（末尾斜杠用于正确解析相对资源路径；本地服务器会自动补齐）
- 发布文件：`apps/game/`，包含 HTML、配置、脚本、样式、剧情 JSON 和图片。
- 原项目：`E:\Study\scraiter\game\interaction_game_demo`，保持独立开发。

修改原项目后，在网站目录执行 `npm run sync:game`。也可以直接运行：

```powershell
powershell -NoProfile -File scripts/sync-game.ps1
```

原项目换位置时可指定 `-Source "新的游戏目录"`。同步只复制运行文件，不复制 `.git`、`node_modules` 或临时上传目录；覆盖同名文件，但不自动删除目标里旧文件。删除或重命名游戏资源后，应手动核对发布目录。

当前原项目的 `scripts/uiManager.js` 在类结束后重复了一段 `reset()` 代码，会在加载时触发 `npcText` 未定义错误。同步脚本仅在发布副本中删除这段已识别的重复内容；原项目不变。原项目修复后，同步脚本会正常保留完整文件。

本地运行 `node server.cjs`（或 `npm run dev`），访问 `http://127.0.0.1:5173/apps/game/`。服务器默认仅监听本机；端口被占用时可使用：

```powershell
$env:PORT = '5174'
node server.cjs
```

检查：`npm run check`、`npm test`。无需安装第三方依赖，也无需构建游戏。

## 部署到域名

网站与游戏均可由静态服务器提供。上传根目录的 `index.html`、各个网站 JS/CSS 文件，以及 `images/`、`apps/game/`；无需上传 Git 元数据、测试、文档或本地开发服务器。

若使用 Nginx，将以下规则合并到已有域名的 `server` 块内，把 `root` 改成实际发布目录。示例保留项目的页面回退，同时让缺失的游戏文件返回 404。

```nginx
root /var/www/studio-website;
index index.html;

location = /apps/game {
    return 308 /apps/game/$is_args$args;
}

location ^~ /apps/ {
    try_files $uri $uri/ =404;
}

location / {
    try_files $uri $uri/ /index.html;
}
```

Nginx 的 `http` 块需要加载其 `mime.types`，使 HTML、JS、CSS、JSON 和图片获得正确类型。配置依据：[Nginx 官方文档](https://nginx.org/en/docs/http/ngx_http_core_module.html#try_files)。实际域名、HTTPS 证书和服务器发布目录需要根据部署环境设置；本仓库尚未部署到公网。
