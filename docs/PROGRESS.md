# 开发进度记录 · 现代艺术 150 年

> 每完成一个迭代更新此文件，保证推进顺序可追溯。
> 最近更新：M2 进行中（2026-08-08）

## 技术栈与常用命令

- Vite + React 18 + TypeScript + Tailwind CSS v4 + Framer Motion + React Router
- `npm run dev` —— 日常开发（默认端口 5173，热更新）
- `npm run build` —— 生产构建（tsc 类型检查 + 打包），**仅在需要验收时执行**，
  验收用 `npx vite preview --port 4173`，验完即关，不常驻
- 内容全部数据驱动：`src/data/`（movements / artworks / relations / types）

## 图片工作流（重要，照此操作不会乱）

1. **新增作品图**：在 `scripts/fetch-art.sh` 追加显式 Commons 文件标题 → `bash scripts/fetch-art.sh`
2. **不确定标题的补图**：`node scripts/fetch-missing.mjs`（内置 `mustMatch` 标题护栏，
   标题不含艺术家名的结果一律拒收——防止全文搜索带回无关文件）
3. **核验**：`node scripts/verify-art.mjs` 做字节级身份比对（本地 vs 远端 content-length），
   全部 ✅ 才算完成
4. **版权策略**：仅收录公有领域图（Commons / Met isPublicDomain / AIC is_public_domain）；
   找不到的留空 `image` 字段，前端自动渲染流派母题占位，后续找到再补
5. 已知无公有领域图：毕加索《亚威农少女》（版权未过期）、罗琴科《读书海报》（2027 年解禁）

## 里程碑

### M1 · 六节点骨架（已完成 2026-08-08）

- [x] 2.5D 空间关系图：拖拽 / 滚轮缩放 / Hover 联动高亮 / 相机边界 clamp（内容四周最多露 72px 虚空）
- [x] 六个节点详情页：印象派、后印象派、塞尚、立体主义、构成主义、包豪斯
  （概念 Hero → 艺术家行 → 作品画廊 → 关系导航，展览式米白页面）
- [x] 动效：Hero 视差、镜头推进/拉回过渡、节点漂浮、逐行 reveal
- [x] 作品图 17 张公有领域图，全部字节级核验通过；占位 3 件（亚威农少女 / 读书海报 / 布拉克）
- [x] 幽灵节点 4 个占位（野兽派 / 未来主义 / 至上主义 / 风格派）

### M2 · 全节点打通 + 星图体验打磨（进行中）

- [x] Hero 层穿透修复：欢迎层可透点到底下星图 → 改为整层拦截 + 点击任意处进入
- [x] 四幽灵节点转正：fauvism/futurism/suprematism/de-stijl 数据全部填充
  （artists/description/关系对称，补了 `cubism→suprematism` 反向关系）
- [x] 新母题 4 种：wild（野兽派）/ speed（未来主义）/ square（至上主义）/ grid（风格派）
- [x] 四流派作品数据各 3 件（共 12 件）
- [x] 四流派作品图：**26 张真图全部接线、零悬空引用**（woman-with-hat/matisse-dance/derain-charing/
  city-rises/unique-forms/black-square/mondrian-composition-ii/doesburg-counter-composition 等）
- [x] 占位 4 件（公有领域确实无图，留待后续）：Balla 狗、Malevich 白上白 + 至上构成、Mondrian 胜利百老汇
- [x] 构建验收通过（tsc + build 干净）
- [x] 修复 fetch-missing.mjs 重试 bug（429 时 for 循环提前 throw）+ demoiselles 改为跳过

**当前规模**：11 个节点（10 上线 + realism 幽灵）、12 条连线、32 件作品、26 张真图。

**踩坑记录**：Commons 全文搜索会带回无关文件（蝴蝶/街道/White Plains），必须用 `mustMatch` 标题护栏 + 字节级核验；
429 限流需间隔重跑；直接探测精准 Commons 文件标题再喂 fetch-art.sh 比全文搜索更可靠。

### M3 · 21 节点全骨架（已完成 2026-08-08）

- [x] 全部 21 个流派节点录入（10 上线 + 11 幽灵占位），坐标用 `yearToX` 布局，分支巷道分层
- [x] 需求文档 §13 全部关系收录（去重后 25 条连线）
- [x] 时间标尺 / 底部时间轴扩展至 1840—2020；巨型年份 [1870,1900,1930,1960,1990]
- [x] 相机 fit/clamp 动态适配全 21 节点包围盒（fit zoom ≈ 0.31–0.41）
- [x] 验证：21 个流派英文名渲染、时间刻度 1840→2020、幽灵节点跳首页、已上线详情页正常
- [ ] 待体验反馈：1905—1935 爆发段节点较密，关注视觉密度与连线可读性

**当前规模**：21 个节点（10 上线 + 11 幽灵）、25 条连线、32 件作品、26 张真图。

### M4 · 好收集的 7 节点转正（已完成 2026-08-08）

**按公有领域资料可得性分级**：
- 🟢 好收集 → 现实主义、抽象艺术、极简主义（本轮转正）
- 🟡 中 → 原始主义、达达、超现实、观念（本轮转正）
- 🔴 难（无 PD 图，保持幽灵）→ 抽象表现、波普、后现代、当代

**本轮转正 7 个**：realism / primitivism / abstraction / dada / surrealism / conceptual-art / minimalism
- [x] 去 ghost 标记 + 配色 + 母题（新增 orbit 抽象 / mask 原始主义 / minimal 极简 3 种母题；
  realism 暂用 facets·大地色、dada 用 shatter·暗灰、surrealism 用 swirl·紫、conceptual 用 square·绿）
- [x] 每流派代表作品录入（realism 3、abstraction 2、dada 2、surrealism 2、minimalism 2、conceptual 2、primitivism 暂 0 用母题）
- [x] 公有领域图本轮新接 4 张：库尔贝《奥尔南的葬礼》、米勒《拾穗者》、杜尚《泉》、康定斯基《构成 VII》
- [x] 构建通过；realism 详情页验证正常（标题/核心问题/作品齐）

**待补图（MISS，需精准标题或护栏搜索）**：库尔贝《碎石工》、马尔克《蓝马》、马格利特《人类之子》《形象的背叛》、弗拉文《塔特林纪念碑》——前端暂以母题占位。

**当前规模**：21 节点（**17 上线** + 4 幽灵：抽象表现/波普/后现代/当代）、25 连线、44 件作品、30 张真图接线。

### M4b · 补缺图（已完成 2026-08-08）

跑 fetch-missing.mjs（Commons/Met/AIC 三来源 + mustMatch 护栏）补 M4 的缺图：
- [x] 新接 5 张：库尔贝《碎石工》、马尔克《蓝马》、马列维奇《白上白》《至上构成》、蒙德里安《胜利百老汇》
- [x] 顺带补回 city-rises（之前候选不准 MISS，用 `The City Rises by Umberto Boccioni 1910.jpg` 精准命中）
- [x] 清错图 3 张：magritte-treachery（误抓"抽烟斗的胡子男"照片）、flavin-monument（误抓 1987 另一件）、dog-leash（误抓 "Dogging on a Leash Only" 无关照片）—— 全是护栏过宽/标题巧合
- [x] 最终校验：**零悬空引用、零孤儿图**，构建通过

**确认公有领域无图（留母题占位）**：马格利特《形象的背叛》《人类之子》、弗拉文《塔特林纪念碑》、巴拉《拴着皮带的狗》（1964/1912 年作品版权期，Commons 只有艺术家本人照片/签名，无作品图）

**当前规模**：21 节点（17 上线 + 4 幽灵）、25 连线、44 件作品、**35 张真图接线**。

## Backlog（已确认排序）

1. 4 个难节点定方向：抽象表现/波普/后现代/当代（文档未指定艺术家；图为版权期，需决策：少量图+说明 or 纯生成式母题）
2. 作品 / 艺术家二级详情页（数据字段已备好）
3. 动效强度 / 节奏调参（待体验反馈）
4. 星图增强：Hover 预览卡、小地图、连线标签
5. 移动端适配（当前桌面优先）
6. 404 页与幽灵节点访问重定向打磨

## 约定

- UI 语言：标题英文、正文中文混排
- 幽灵节点不可点击，点击跳转回首页
- 调试参数：`/?entered=1` 跳过 Hero 直接进星图
