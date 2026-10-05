# 个人应用展厅

运行 `npm run dev`，打开 http://127.0.0.1:5173。

无第三方依赖。主页、详情页和示例应用使用独立 URL，支持直接访问与刷新。

- `apps.js`：应用列表，每项数据自动生成一张卡片和一个详情页。
- `templates.js`：所有卡片和详情页共用的模板。
- `main.js`：路由、个人资料与交互。
- `style.css`：桌面与手机布局。
- `forest.css`：林中女巫主题；在基础样式后加载，优先在这里修改视觉样式。
- `server.cjs`：本地预览服务器，仅监听本机。

当前名称、资料、联系地址、作品与封面均为设计示例。专注计时器可体验，其余应用页为占位预览。

正式发布时，需要服务器支持 `/projects/*` 的页面回退，并将 `/app/*` 路径交给对应的真实应用。

## 添加应用

在 `apps.js` 的数组中添加对象，`id` 使用唯一的英文、数字或连字符名称：

```js
{
  id: 'my-app',
  name: '我的应用',
  desc: '一句话介绍',
  cover: '/images/my-app.png',
  color: 'green',
  body: '详情介绍正文'
}
```

把封面图片放在项目 `images/` 目录。新对象会自动得到 `/projects/my-app` 详情页和 `/app/my-app/` 应用入口；入口的真实应用仍需单独接入。

详情正文需要自由排版时，用 `contentHtml` 替代默认正文，例如：

```js
contentHtml: `<h2>为什么做这个应用</h2>
<p>你的介绍。</p>
<img src="/images/my-app-detail.png" alt="功能截图">
<p>更多说明。</p>`
```

`contentHtml` 仅用于开发者在代码中编写的可信内容，不接收用户提交的 HTML。

修改 `renderAppCard` 会作用于所有卡片；修改 `renderAppDetail` 会作用于所有详情页的公共结构。公共 CSS 修改也会统一生效，封面配色或各自正文的专用样式只作用于对应内容。
