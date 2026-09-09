# 现代艺术 150 年 · 互动艺术史

一个数据驱动的互动艺术史网站：桌面端把 1840 至今的 21 个现代艺术流派放进可漫游的 2.5D 时间-思想星图，窄屏则转换为保留谱系关系的线性时间轨道；点进流派后进入展览式详情页。

## 开发

```bash
npm install
npm run dev        # http://localhost:5173
```

其它命令：

```bash
npm run build      # 类型检查 + 生产构建到 dist/
npm run preview    # 本地预览构建产物
npm run verify:art # 图片结构、尺寸、哈希、重复与溯源字段校验
npm run verify:content # 发布前严格校验；来源待复核也会失败
```

调试参数：`http://localhost:5173/?entered=1` 跳过首屏直接进入当前宽度对应的浏览模式。响应式开发验收可打开 `scripts/responsive-harness.html?width=390&height=844&path=%2F%3Fentered%3D1`。

## 内容如何扩展（全部数据驱动）

- **流派节点** → `src/data/movements.ts`（含 `ghost: true` 的占位节点）
- **代表作品** → `src/data/artworks.ts`
- **作品身份、馆藏与资料来源** → `src/data/artworks.ts` 中的 `reference`
- **作品图片来源与许可** → `src/data/artworkImageMeta.ts`（与作品资料来源分开）
- **流派关系连线** → `src/data/relations.ts`
- **节点生成式母题** → `src/components/map/NodeMotif.tsx`

新增一个流派：在 `movements.ts` 加一条记录（去掉 `ghost` 即上线），配 `artworks` 与 `relations` 即可，无需改组件。

## 作品图与可信状态

网站有 54 件作品。当前展示 40 张本地图：15 张已完成作品身份与许可核验，25 张历史图片标记为 `needs-review`；14 件使用版权、待补或条目存疑占位。25 件已补作品身份/馆藏资料来源，剩余 29 件由严格校验继续提示。

- `scripts/fetch-art.sh` 已停用，避免把候选图片直接写入正式目录。
- `node scripts/fetch-missing.mjs` 只把候选与来源 sidecar 下载到系统临时目录。
- 候选需人工核对题名、艺术家、年份、构图与许可，再转为 WebP 并登记到 `artworkImageMeta.ts`。
- `npm run verify:art` 检查全部作品、本地资源和作品资料字段；只有 `verified` 代表图片完成人工核验。

找不到可靠授权图的作品不设 `image` 字段，前端按版权受限、待补或条目存疑显示不同占位。

原 19 件无图作品的馆藏页、图片候选、处理结果与法域判断见 [`docs/IMAGE_SOURCE_CANDIDATES.md`](docs/IMAGE_SOURCE_CANDIDATES.md)；按中国大陆主要发布口径接入 5 件后，当前剩余 14 件。非营利、科普或标注来源不自动产生图片使用许可。

## 进度

详见 [`docs/PROGRESS.md`](docs/PROGRESS.md) 与 [`docs/CONTENT_AUDIT.md`](docs/CONTENT_AUDIT.md)：当前 21 个节点全部上线，内容可信度第二阶段首轮与移动端/无障碍第三阶段已完成。
