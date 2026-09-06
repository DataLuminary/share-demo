# DataLuminary share-demo

独立静态演示站：用 React + Ant Design 演示仪表盘四种嵌入方式（iframe / JS SDK / Micro App / Wujie）。

- 在线演示：https://share.dataluminary.dev
- 源码仓库：https://github.com/DataLuminary/share-demo
- 产品文档：https://docs.dataluminary.dev/share/embed（或 ProductWhitePaper `docs/share/embed.md`）

## 本地运行

```bash
cp .env.example .env
# 填写 PUBLIC_SHARE_UID / PUBLIC_SHARE_TOKEN（专用公开演示分享）
pnpm install
pnpm dev
```

默认端口 `13033`。布局：左侧选择嵌入方式（iframe / JS SDK / Micro App / Wujie）；右侧上方为嵌入配置（表单 + 代码），下方为全高度嵌入预览。支持中英文切换（右上角，写入 localStorage）。可覆盖 uid / token / appOrigin / proxy 并写入 localStorage；「恢复默认」回到环境变量。

## 环境变量

| 变量 | 说明 |
|------|------|
| `PUBLIC_APP_ORIGIN` | DataView 源站，默认 `https://app.dataluminary.dev` |
| `PUBLIC_SHARE_UID` | 默认分享配置 uid |
| `PUBLIC_SHARE_TOKEN` | 默认公开令牌（会打进静态包，请用专用 demo 分享） |
| `PUBLIC_PROXY` | 可选，反向代理后的 DataTalk 基址 |
| `PUBLIC_SDK_CDN_URL` | 可选，覆盖 JS SDK CDN |

## 构建

```bash
pnpm build
# 产物在 dist/，含 public/CNAME → share.dataluminary.dev
```

## GitHub Pages

1. 将本目录推送到 `DataLuminary/share-demo`（`main`）
2. 仓库 Settings → Pages → Source: GitHub Actions
3. 在 Variables / Secrets 中配置 `PUBLIC_SHARE_UID`、`PUBLIC_SHARE_TOKEN` 等
4. DNS：`share.dataluminary.dev` CNAME 到组织 Pages 地址，并在 Pages 设置自定义域名 + HTTPS

推送 `main` 或手动 Run workflow `Deploy GitHub Pages` 即可发布。

## 品牌资产

Logo / favicon 以 MetaRepo `assets/` 为准。在 MetaRepo 根执行：

```bash
pnpm sync:brand
```

会同步到 `share-demo/public/`。
