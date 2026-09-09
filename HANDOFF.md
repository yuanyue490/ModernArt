# HANDOFF — 现代艺术 150 年互动星图

> 交接文档：记录当前进度、架构决策、工作流与待办，供下一位 AI / 协作者无缝接手。
> 最后更新：2026-08-28（中国大陆口径首批图片接入完成）。**每次里程碑完成后请更新本文件。**

---

## 1. 项目是什么

基于《现代艺术 150 年》（Will Gompertz）一书脉络的互动艺术史网站：
宽屏是一张可拖拽/缩放的 **2.5D 空间关系星图**，`1024px` 以下转换为保留谱系信息的**线性时间轨道**；每个流派都有展览式详情页（深色浏览入口 / 米白详情页）。

需求源头：根目录《现代艺术 150 年》互动艺术史网站需求文档.md（§12 定义 21 流派、§13 定义 30 条关系，是唯一内容权威来源）。

## 2. 当前状态（数字以此为准）

| 维度 | 状态 |
|---|---|
| 流派节点 | **21/21 全部上线**（0 ghost，全部可点进详情页） |
| 关系连线 | **25 条**（§13 去重收录，含 rebel/fusion 类型） |
| 作品数据 | **54 件**，21 流派全覆盖 |
| 作品图 | **40 张本地 webp**：40 张展示（15 verified / 25 needs-review） |
| 作品资料来源 | **25/54 件**已记录馆藏/身份来源、对象编号与核验日期；29 件待补 |
| 生成式母题 | **17 种**（NodeMotif.tsx，作为节点视觉 + 无图作品的视觉占位） |
| 响应式 | **390 / 768px 线性时间轨道；1280px 空间星图**，三档实看通过 |
| 无障碍 | Hero 单一原生入口；星图支持方向键/缩放/复位；时间轴使用原生 range；详情页移动导航带标签 |
| 构建 | ✅ `npm run build` 干净（gzip ~156KB） |
| git | main 分支，最新 commit `6112e34`（"线上线"）；**AGENTS.md 未提交** |
| 开发服务 | `npm run dev` → http://localhost:5173（调试跳 Hero：`/?entered=1`） |

### 无图作品现状
14 件作品没有 `image` 字段。ArtworkGallery 会按 `copyright-restricted`、`pending` 或 `questionable` 显示不同说明，不使用来源不明的图片顶替。

2026-08-28 已确定以中国大陆为主要发布法域和主要受众，并接入《亚威农少女》《拴着皮带的狗的动态》《胜利百老汇爵士乐》《L.H.O.O.Q.》与《形象的背叛》5 张图。每张均分别记录底层作品的 `PD-China` 判断，以及摄影开放许可或馆方教育用途来源；Rodchenko《读书》和 Magritte《人类之子》因具体文件来源仍不充分而继续占位。

## 3. 技术架构

- **栈**：Vite + React 19 + TypeScript + Tailwind CSS + Framer Motion + React Router
- **路由**：`/`（Home：Hero + 宽屏 SpatialMap / 窄屏 MobileTimeline）、`/movement/:slug`（详情页）
- **数据驱动**（改内容只动 data 层，不动组件）：
  - `src/data/types.ts` — Movement / Artist / Artwork / Relation 类型 + MotifKind 联合类型
  - `src/data/movements.ts` — 21 个流派（id、中英文标题、年份、color、motif、artists、description、ghost 标记）
  - `src/data/relations.ts` — 25 条关系（from/to/type/label）
  - `src/data/artworks.ts` — 按 movement id 分组的作品（含 title/artist/year/note/image?）
  - 作品的 `reference` 记录身份/馆藏依据；`imageMeta` 只记录图片身份、来源与许可，两者不得混用
- **空间系统**：
  - `src/lib/world.ts` — 世界坐标（yearToX 年份→x 映射、WORLD_W、OY 巷道偏移）
  - `src/lib/cameraStore.ts` — 相机状态（x/y/scale）
  - `src/lib/fit.ts` — fit 计算 + **clampCamera 边界钳制**（内容包围盒 + 72px 虚空上限）
- **关键组件**：
  - `map/SpatialMap.tsx` — 星图容器（拖拽/滚轮缩放/Hover 联动/点击镜头推进）
  - `home/MobileTimeline.tsx` — `1024px` 以下的线性时间与谱系浏览
  - `home/TimelineNav.tsx` — 宽屏原生 range 时间轴，可触控与键盘操作
  - `map/NodeMotif.tsx` — 17 种生成式母题（SVG/CSS 图案，每流派一种视觉语言）
  - `map/EdgeLines.tsx` / `MovementNode.tsx` / `TimeRuler.tsx` / `DustLayer.tsx`
  - `movement/MovementHero|ArtistRow|ArtworkGallery|RelationFooter.tsx` — 详情页四层
  - `home/Hero.tsx` — 欢迎层，只保留一个原生进入按钮；未进入时星图退出可访问树

## 4. 图片工作流（重要，别踩坑）

1. `node scripts/fetch-missing.mjs` 只下载临时候选和来源 sidecar，不直接写正式目录。
2. 人工核对题名、艺术家、年份、构图、具体版本和许可。
3. 合格候选转为 `public/artworks/` 下的小写 kebab-case WebP。
4. 在 `src/data/artworkImageMeta.ts` 登记 provider ID、来源 URL、许可、核验日期与 SHA-256，再在 `artworks.ts` 接入。
5. 运行 `npm run verify:art` 与 `npm run build`；发布前运行严格的 `npm run verify:content`。

**找图脚本**：
- `scripts/fetch-art.sh` — 已停用，仅保留历史候选文件名记录。
- `scripts/fetch-missing.mjs` — 多来源临时候选工具；标题护栏只负责初筛，不能替代人工核验。
-  Commons 限流会 429，脚本有重试；大批量跑时留意日志

**血泪教训（已踩过）**：不能仅凭文件名/视觉相似度判断图对不对——曾抓到蝴蝶照片冒充布拉克、街道照片冒充《亚维农少女》。标题护栏和自动校验都不能证明作品身份，必须回到具体馆藏/文件页人工核对。

## 5. 协作规则（AGENTS.md 摘要）

- 内容准确性 > 页面数量；图片必须可追溯来源
- 不删文件；废弃资源先标记；不动 .env/CI/数据库；不执行发布/推送/破坏性 git 操作（除非授权）
- 存疑内容统一记入 `docs/CONTENT_AUDIT.md`
- 里程碑记录见 `docs/PROGRESS.md`

## 6. 待办（按当前可信度优先级排序）

1. **完成来源迁移**：29 件作品资料来源待补；25 张历史图片待从搜索路径升级为明确文件页
2. **处理剩余图片质量**：`derain-charing-cross.webp` 与 `white-on-white.webp` 是低质量现场照；找不到可靠替代就回退占位
3. **处理无图 P1**：先决定采用“中国大陆主要发布法域”还是“全球保守口径”；随后按 `docs/IMAGE_SOURCE_CANDIDATES.md` 接图或申请许可
4. **原始主义策展审查**：当前作品卡已明确标为不可核验，不得在未定范围前补图
5. **后现代/当代艺术家名单待用户确认**：当前名单尚未锁定策展口径
6. **作品/艺术家二级详情页**
7. **学习体验增强**：星图语义缩放、搜索与定位、主线导览、关系图例

## 7. 给接手者的第一句话

先读 `AGENTS.md`、`docs/CONTENT_AUDIT.md` 和 `docs/PROGRESS.md`，再跑 `npm run verify:art` 看剩余来源清单；碰图片前必读本文 §4。
