# 现代艺术 150 年 · 互动艺术史

一个数据驱动的 2.5D 空间关系图网站：把 1820 至今的 21 个现代艺术流派放进一张可漫游的时间-思想地图里，点进节点看展览式的流派详情。

## 开发

```bash
npm install
npm run dev        # http://localhost:5173
```

其它命令：

```bash
npm run build      # 类型检查 + 生产构建到 dist/
npm run preview    # 本地预览构建产物
```

调试参数：`http://localhost:5173/?entered=1` 跳过首屏直接进入星图。

## 内容如何扩展（全部数据驱动）

- **流派节点** → `src/data/movements.ts`（含 `ghost: true` 的占位节点）
- **代表作品** → `src/data/artworks.ts`
- **流派关系连线** → `src/data/relations.ts`
- **节点生成式母题** → `src/components/map/NodeMotif.tsx`

新增一个流派：在 `movements.ts` 加一条记录（去掉 `ghost` 即上线），配 `artworks` 与 `relations` 即可，无需改组件。

## 作品图（公有领域）

图片均为 Wikimedia Commons / 大都会 / 芝加哥艺术学院的公有领域图，存放于 `public/artworks/`。

- `bash scripts/fetch-art.sh` —— 按显式 Commons 文件标题下载
- `node scripts/fetch-missing.mjs` —— 多来源搜索补缺（带标题护栏，防误抓）
- `node scripts/verify-art.mjs` —— 字节级核验本地图与远端一致

找不到公有领域图的作品不设 `image` 字段，前端自动用流派母题占位。

## 进度

详见 [`docs/PROGRESS.md`](docs/PROGRESS.md)：当前 21 节点骨架完成，17 个已上线、4 个幽灵占位。
