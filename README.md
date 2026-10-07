# 个人应用展厅

运行 `npm run dev`，打开 http://127.0.0.1:5173。

Markdown 解析使用项目内的 Marked 和 DOMPurify，无需安装依赖。主页、详情页和示例应用使用独立 URL，支持直接访问与刷新。

- `apps.js`：应用列表，每项数据自动生成一张卡片和一个详情页。
- `templates.js`：所有卡片和详情页共用的模板。
- `main.js`：路由、个人资料与交互。
- `style.css`：桌面与手机布局。
- `forest.css`：林中女巫主题；在基础样式后加载，优先在这里修改视觉样式。
- `server.cjs`：本地预览服务器，仅监听本机。

已接入双塔导览剧情游戏、ScrAIter 只读展示版和文物探索前端原型。首页展示内容由 `apps.js` 配置。

正式发布时，需要服务器支持 `/projects/*` 和现有 `/app/*` 示例页的页面回退；`/apps/twin_pagoda_interaction_game/` 独立提供游戏静态文件。

## 添加应用

## 填写个人资料

编辑 `profile-config.js`，无需修改页面模板：

- `name`：姓名，可留空；为空不显示。
- `bio`：简介，可留空；使用 `\n` 换行，为空不显示。
- `avatar`：头像图片路径，如 `/images/me.jpg`；把图片放入 `images/` 目录。留空隐藏图片。默认头像为占位图。
- `socials`：统一配置 GitHub、Email 和其他社媒，均可选；填写对应 `url`，空地址不显示，也可以增加条目。Email 条目的 `icon` 使用 `email`，`url` 只填邮箱地址。

`profile-template.js` 是桌面侧栏和手机资料抽屉共享的模板。链接带图标、悬停名称和无障碍名称；不合法的网页地址不会显示。图标使用 images/icons/ 下的 SVG 文件，以 CSS mask 统一采用主题颜色，不依赖外部图标服务。icon 字段对应 profile-template.js 中的文件映射；未知类型使用 link.svg。

## 应用数据与 Markdown 详情

在 apps.js 添加条目，id 使用唯一的 YYYYMMDD 日期，列表按日期倒序展示：

```js
{
  id: '20251024',
  name: '我的应用',
  desc: '一句话介绍',
  cover: '/images/my-app.png',
  appUrl: '/apps/my-app/',
  detailFile: '/details/20251024/detail.md'
}
```

每个项目使用 details/<id>/detail.md，图片、PDF 等文件放在同一个项目目录。detailFile 可省略，展示引擎默认按 id 查找此路径。编辑对应 Markdown 文件即可编写正文：

```md
## 项目介绍

正文支持 **加粗**、列表、引用、代码块和表格。

![应用截图](/images/my-app.png)

[打开相关网站](https://example.com)
```

建议图片使用 /images/... 根路径。相对图片和链接按 Markdown 文件目录解析。例如 ![截图](poster_grid.png) 和 [项目说明](ProjectOverview.pdf) 会访问当前项目文件夹中的文件。
只有顶部导航栏与打开应用按钮由公共模板生成。详情标题、简介、图片及全部正文由 Markdown 文件控制；apps.js 的 name、desc、cover 用于主页卡片（name 也用于浏览器标签标题）。旧 contentHtml/body 字段不再用于详情页。
保存文件后刷新详情页，无需构建。新增的 .md 文件需要随网站一起发布。
Markdown 由本地 vendor/marked.js 解析，再经 vendor/purify.js 清理 HTML；文件缺失时显示重试入口。

## 游戏接入与更新

- 介绍页：`/projects/20250825`
- 游戏入口：`/apps/twin_pagoda_interaction_game/`（末尾斜杠用于正确解析相对资源路径；本地服务器会自动补齐）
- 发布文件：`apps/twin_pagoda_interaction_game/`，包含 HTML、配置、脚本、样式、剧情 JSON 和图片。
- 原项目：`E:\Study\scraiter\game\interaction_game_demo`，保持独立开发。

修改原项目后，在网站目录执行 `npm run sync:twin_pagoda_interaction_game`。也可以直接运行：

```powershell
powershell -NoProfile -File scripts/sync-twin_pagoda_interaction_game.ps1
```

原项目换位置时可指定 `-Source "新的游戏目录"`。同步只复制运行文件，不复制 `.git`、`node_modules` 或临时上传目录；覆盖同名文件，但不自动删除目标里旧文件。删除或重命名游戏资源后，应手动核对发布目录。

当前原项目的 `scripts/uiManager.js` 在类结束后重复了一段 `reset()` 代码，会在加载时触发 `npcText` 未定义错误。同步脚本仅在发布副本中删除这段已识别的重复内容；原项目不变。原项目修复后，同步脚本会正常保留完整文件。

本地运行 `node server.cjs`（或 `npm run dev`），访问 `http://127.0.0.1:5173/apps/twin_pagoda_interaction_game/`。服务器默认仅监听本机；端口被占用时可使用：

```powershell
$env:PORT = '5174'
node server.cjs
```

检查：`npm run check`、`npm test`。无需安装第三方依赖，也无需构建游戏。

## 部署到域名

### ScrAIter 展示版

- 介绍页：`/projects/002`。
- 应用入口：`/apps/scraiter/`，在新标签页打开。
- 原项目：`E:\Study\scraiter\Human-AI_Col\web-app\ScrAIter`。
- 发布目录：`apps/scraiter/`，同步自原项目的 `frontend/dist/`。

当前原项目已经提供只读展示模式，项目、剧本、资料和知识库数据来自前端内置快照。上传、编辑、保存和 AI 生成被禁用；无需 Python 后端或 API 密钥。现有构建使用相对资源路径和 HashRouter，因此支持子目录部署及刷新。

更新时，先在原项目的 `frontend` 目录运行 `npm run build`，然后在本网站目录执行 `npm run sync:scraiter`；也可以直接执行：

```powershell
powershell -NoProfile -File scripts/sync-scraiter.ps1
```

源项目换位置时使用 `-Source "新的 ScrAIter 项目目录"`。同步只复制已有构建产物，不复制后端、依赖、共享原始资料或环境配置；覆盖同名文件，不自动删除旧资源。发布副本会将 Vite 默认图标替换为网站图标。封面 `images/scraiter-cover.png` 是实际剧情树界面的截图，需在界面变化后单独更新。

现有 `/apps/` 静态文件规则同样适用于 ScrAIter，上线时一并上传 `apps/scraiter/` 和封面。接入展示版不等于部署完整的 AI 创作服务。

### 文物探索（Museum UGC）

- 介绍页：`/projects/003`。
- 应用入口：`/apps/museum-ugc/`，在新标签页打开。
- 原项目：`E:\Study\Game_as_UGC\Codes\museum-ugc-prototype`。
- 发布目录：`apps/museum-ugc/`，同步自原项目已有的 `dist/`，包含 JS 和 `data/` 下的文物、用户 JSON。

项目仅有前端，无需后端或 API 密钥。留言、话题回复和导览进度只保存在页面内存中，刷新会重置。原项目使用 Tailwind CDN、外部字体和部分远程图片/头像，需要网络连接；浏览器会提示 Tailwind CDN 的生产使用警告。语音输入需浏览器麦克风权限和 HTTPS 或 localhost。

更新时，先在原项目运行 `npm run typecheck`、`npm run build`，然后在网站目录执行 `npm run sync:museum-ugc`，或直接运行：

```powershell
powershell -NoProfile -File scripts/sync-museum-ugc.ps1
```

源项目换位置时使用 `-Source "新的原型项目目录"`。同步只复制 `dist`，不复制源码、依赖或 `.env.local`；覆盖同名文件，不自动删除旧文件。实际界面封面为 `images/museum-ugc-cover.png`。上线时上传发布目录和封面，沿用 `/apps/` 静态文件规则。

### 静态站点部署规则

网站与游戏均可由静态服务器提供。上传根目录的 `index.html`、各个网站 JS/CSS 文件，以及 `images/`、`apps/twin_pagoda_interaction_game/`；无需上传 Git 元数据、测试、文档或本地开发服务器。

若使用 Nginx，将以下规则合并到已有域名的 `server` 块内，把 `root` 改成实际发布目录。示例保留项目的页面回退，同时让缺失的游戏文件返回 404。

```nginx
root /var/www/studio-website;
index index.html;

location = /apps/twin_pagoda_interaction_game {
    return 308 /apps/twin_pagoda_interaction_game/$is_args$args;
}

location ^~ /apps/ {
    try_files $uri $uri/ =404;
}

location / {
    try_files $uri $uri/ /index.html;
}
```

Nginx 的 `http` 块需要加载其 `mime.types`，使 HTML、JS、CSS、JSON 和图片获得正确类型。配置依据：[Nginx 官方文档](https://nginx.org/en/docs/http/ngx_http_core_module.html#try_files)。实际域名、HTTPS 证书和服务器发布目录需要根据部署环境设置；本仓库尚未部署到公网。
