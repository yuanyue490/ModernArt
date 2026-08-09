import type { Movement } from './types'
import { yearToX } from '../lib/world'

/**
 * 世界坐标约定：x = (year - 1860) * 26，主巷道 y = 0，上下分支 ±170~320。
 * 本轮上线的 6 个节点 + 5 个幽灵占位节点。
 */

export const movements: Movement[] = [
  {
    id: 'impressionism',
    index: '02',
    name: '印象派',
    nameEn: 'IMPRESSIONISM',
    startYear: 1870,
    endYear: 1890,
    question: '我们真正看到的，是物体，还是光？',
    description:
      '印象派开始关注瞬间的视觉经验。画家走出工作室，在户外捕捉阳光、天气、空气和颜色随时间发生的变化。物体本身不再是唯一重点，"观看"这件事情第一次成为绘画主题。',
    artists: [
      { id: 'monet', name: 'Claude Monet', years: '1840—1926', note: '追逐光的人——同一座干草堆，他画了二十五次。' },
      { id: 'renoir', name: 'Pierre-Auguste Renoir', years: '1841—1919', note: '用画笔记录现代人的欢愉。' },
      { id: 'degas', name: 'Edgar Degas', years: '1834—1917', note: '把瞬间动作画成精确的构图。' },
      { id: 'pissarro', name: 'Camille Pissarro', years: '1830—1903', note: '印象派的长者与桥梁。' },
    ],
    influencedBy: ['realism'],
    influenced: ['post-impressionism'],
    map: { x: 364, y: 0 },
    visualStyle: { motif: 'halo', accent: '#a8c3d8' },
  },
  {
    id: 'post-impressionism',
    index: '03',
    name: '后印象派',
    nameEn: 'POST-IMPRESSIONISM',
    startYear: 1880,
    endYear: 1906,
    question: '艺术是否应该超越眼睛看到的东西？',
    description:
      '后印象派并不是一个统一风格，而是一群艺术家对印象派的不同回应。梵高强调情绪，高更追求象征和精神世界，塞尚研究结构，修拉探索色彩科学。现代艺术由此开始分裂成多条道路。',
    artists: [
      { id: 'van-gogh', name: 'Vincent van Gogh', years: '1853—1890', note: '把情绪直接烧进颜料。' },
      { id: 'gauguin', name: 'Paul Gauguin', years: '1848—1903', note: '逃离文明，寻找原始的精神。' },
      { id: 'cezanne', name: 'Paul Cézanne', years: '1839—1906', note: '用圆柱、球体和圆锥重看世界。' },
      { id: 'seurat', name: 'Georges Seurat', years: '1859—1891', note: '用科学的方法分配色彩。' },
    ],
    influencedBy: ['impressionism'],
    influenced: ['cezanne', 'fauvism'],
    map: { x: 728, y: -20 },
    visualStyle: { motif: 'swirl', accent: '#d9a03f' },
  },
  {
    id: 'cezanne',
    index: '04',
    name: '塞尚',
    nameEn: 'CÉZANNE',
    startYear: 1839,
    endYear: 1906,
    question: '世界能否被重新组织成基本结构？',
    description:
      '塞尚不满足于印象派对光的捕捉，而开始研究自然背后的结构。他逐渐把山、树、人物和静物理解为球体、圆柱和圆锥的组合，使绘画从再现现实转向分析现实，为立体主义奠定基础。',
    artists: [
      { id: 'cezanne', name: 'Paul Cézanne', years: '1839—1906', note: '现代艺术之父——一个人就是一座桥。' },
    ],
    influencedBy: ['post-impressionism'],
    influenced: ['cubism'],
    map: { x: 910, y: 300 },
    visualStyle: { motif: 'facets', accent: '#8a9a6b' },
  },
  {
    id: 'fauvism',
    index: '06',
    name: '野兽派',
    nameEn: 'FAUVISM',
    startYear: 1905,
    endYear: 1910,
    question: '颜色为什么必须真实？',
    description:
      '野兽派让颜色彻底摆脱现实。天空可以是红色，皮肤可以是绿色，树木可以是蓝色。色彩不再描述世界，而开始直接表达情绪。',
    artists: [
      { id: 'matisse', name: 'Henri Matisse', years: '1869—1954', note: '野兽派领袖，把纯色从现实中解放出来。' },
      { id: 'derain', name: 'André Derain', years: '1880—1954', note: '把伦敦的雾画成彩色的光。' },
      { id: 'vlaminck', name: 'Maurice de Vlaminck', years: '1876—1958', note: '凭本能作画的"野兽"本人。' },
    ],
    influencedBy: ['post-impressionism'],
    influenced: [],
    map: { x: 1170, y: -320 },
    visualStyle: { motif: 'wild', accent: '#d6477e' },
  },
  {
    id: 'cubism',
    index: '07',
    name: '立体主义',
    nameEn: 'CUBISM',
    startYear: 1907,
    endYear: 1914,
    question: '一个物体为什么只能从一个角度观看？',
    description:
      '立体主义把物体拆解成不同几何平面，同时表现多个视角，从根本上挑战文艺复兴以来建立的单点透视体系。空间第一次不再只是被描绘，而成为艺术家主动分析和重构的对象。',
    artists: [
      { id: 'picasso', name: 'Pablo Picasso', years: '1881—1973', note: '一个人走完了别人几辈子的路。' },
      { id: 'braque', name: 'Georges Braque', years: '1882—1963', note: '立体主义的共同发明者。' },
      { id: 'gris', name: 'Juan Gris', years: '1887—1927', note: '给立体主义带来秩序与诗。' },
    ],
    influencedBy: ['cezanne'],
    influenced: ['constructivism', 'futurism', 'suprematism'],
    map: { x: 1300, y: 140 },
    visualStyle: { motif: 'shatter', accent: '#a98f5f' },
  },
  {
    id: 'futurism',
    index: '08',
    name: '未来主义',
    nameEn: 'FUTURISM',
    startYear: 1909,
    endYear: 1919,
    question: '机器时代应该拥有怎样的艺术？',
    description:
      '未来主义迷恋汽车、飞机、工业、城市、速度与机械运动。艺术家试图通过重复形态、方向线与连续动作，表现现代世界的动态感。',
    artists: [
      { id: 'boccioni', name: 'Umberto Boccioni', years: '1882—1916', note: '未来主义最锋利的刀刃。' },
      { id: 'balla', name: 'Giacomo Balla', years: '1871—1958', note: '把奔跑的狗画成运动的科学。' },
      { id: 'severini', name: 'Gino Severini', years: '1883—1966', note: '在舞厅灯光里连接巴黎与米兰。' },
    ],
    influencedBy: ['cubism'],
    influenced: [],
    map: { x: 1352, y: -200 },
    visualStyle: { motif: 'speed', accent: '#58b7b3' },
  },
  {
    id: 'suprematism',
    index: '10',
    name: '至上主义',
    nameEn: 'SUPREMATISM',
    startYear: 1915,
    endYear: 1925,
    question: '如果去掉所有现实对象，艺术还剩什么？',
    description:
      '马列维奇将艺术压缩到最基本的几何形式：方形、圆形、十字和纯色关系。艺术不再描绘任何具体对象，而探索纯粹形式与感受本身。',
    artists: [
      { id: 'malevich', name: 'Kazimir Malevich', years: '1879—1935', note: '一个黑方块，终结了五百年的具象。' },
    ],
    influencedBy: ['cubism'],
    influenced: ['constructivism'],
    map: { x: 1456, y: -380 },
    visualStyle: { motif: 'square', accent: '#e8e4da' },
  },
  {
    id: 'constructivism',
    index: '11',
    name: '构成主义',
    nameEn: 'CONSTRUCTIVISM',
    startYear: 1915,
    endYear: 1925,
    question: '艺术是否应该进入真实社会？',
    description:
      '构成主义认为艺术不应该只存在于画廊，而应该参与建筑、工业、海报、字体和社会生产。艺术开始向现代设计转化。',
    artists: [
      { id: 'tatlin', name: 'Vladimir Tatlin', years: '1885—1953', note: '让艺术走进机器与材料。' },
      { id: 'rodchenko', name: 'Alexander Rodchenko', years: '1891—1956', note: '设计即宣传，构成即生活。' },
      { id: 'lissitzky', name: 'El Lissitzky', years: '1890—1941', note: '用 PROUN 连接绘画与建筑。' },
    ],
    influencedBy: ['cubism', 'suprematism'],
    influenced: ['bauhaus', 'de-stijl'],
    map: { x: 1560, y: 20 },
    visualStyle: { motif: 'diagonal', accent: '#c23a22' },
  },
  {
    id: 'de-stijl',
    index: '12',
    name: '风格派',
    nameEn: 'DE STIJL',
    startYear: 1917,
    endYear: 1931,
    question: '世界能否被简化成最基本的视觉秩序？',
    description:
      '风格派把视觉压缩成横线、竖线、矩形、红黄蓝与黑白灰，希望找到一种超越个人风格和自然形态的普遍视觉秩序。',
    artists: [
      { id: 'mondrian', name: 'Piet Mondrian', years: '1872—1944', note: '用横线与竖线寻找宇宙的平衡。' },
      { id: 'van-doesburg', name: 'Theo van Doesburg', years: '1883—1931', note: '把对角线引入风格派的叛逆者。' },
    ],
    influencedBy: ['constructivism'],
    influenced: ['bauhaus'],
    map: { x: 1560, y: -170 },
    visualStyle: { motif: 'grid', accent: '#e3b505' },
  },
  {
    id: 'bauhaus',
    index: '13',
    name: '包豪斯',
    nameEn: 'BAUHAUS',
    startYear: 1919,
    endYear: 1933,
    question: '艺术、设计与工业能否成为同一件事情？',
    description:
      '包豪斯尝试统一艺术、建筑、工艺与工业生产。设计不再只是装饰，而需要解决真实问题。现代平面设计、工业设计、建筑和设计教育都深受其影响。',
    artists: [
      { id: 'gropius', name: 'Walter Gropius', years: '1883—1969', note: '包豪斯的创办者，现代建筑的推手。' },
      { id: 'klee', name: 'Paul Klee', years: '1879—1940', note: '让线条去散步。' },
      { id: 'kandinsky', name: 'Wassily Kandinsky', years: '1866—1944', note: '听见颜色的人。' },
      { id: 'moholy-nagy', name: 'László Moholy-Nagy', years: '1895—1946', note: '用光与机器做艺术。' },
    ],
    influencedBy: ['constructivism', 'de-stijl'],
    influenced: [],
    map: { x: 1664, y: 250 },
    visualStyle: { motif: 'bauhaus', accent: '#2456a6' },
  },

  /* ---------------- 幽灵占位节点（下一阶段上线） ---------------- */

  {
    id: 'realism',
    index: '01',
    name: '现实主义',
    nameEn: 'REALISM',
    startYear: 1820,
    endYear: 1870,
    question: '艺术为什么不能描绘普通人的真实生活？',
    description:
      '现实主义反对学院派对历史、宗教和神话题材的理想化描绘。艺术家开始关注工人、农民、街道与现实社会，让普通生活第一次成为严肃艺术的主体。',
    artists: [
      { id: 'courbet', name: 'Gustave Courbet', years: '1819—1877', note: '"画我看得见的"——现实主义的旗手。' },
      { id: 'millet', name: 'Jean-François Millet', years: '1814—1875', note: '把农民的弯腰画成庄严。' },
      { id: 'daumier', name: 'Honoré Daumier', years: '1808—1879', note: '用石版画讽刺时代的旁观者。' },
    ],
    influencedBy: [],
    influenced: ['impressionism'],
    map: { x: yearToX(1845), y: 0 },
    visualStyle: { motif: 'facets', accent: '#7a6a55' },
  },

  /* ================= 骨架节点 · 后续填充（幽灵占位） ================= */
  {
    id: 'primitivism',
    index: '05',
    name: '原始主义',
    nameEn: 'PRIMITIVISM',
    startYear: 1880,
    endYear: 1930,
    question: '现代文明是否让艺术失去了本能？',
    description:
      '部分欧洲艺术家开始从非洲、大洋洲艺术、日本艺术以及所谓"原始文化"中寻找新的视觉语言，希望摆脱欧洲学院体系的规则，重新获得直接、粗粝、本能的表达方式。',
    artists: [],
    influencedBy: [],
    influenced: ['fauvism', 'cubism'],
    map: { x: yearToX(1900), y: -440 },
    visualStyle: { motif: 'mask', accent: '#b06a3a' },
  },
  {
    id: 'abstraction',
    index: '09',
    name: '抽象艺术',
    nameEn: 'ABSTRACT ART',
    startYear: 1910,
    endYear: 1914,
    question: '绘画一定要表现现实世界吗？',
    description:
      '康定斯基等艺术家开始彻底放弃具象对象，尝试像音乐一样，仅通过颜色、形状、节奏和构成表达情绪与精神状态。纯抽象艺术由此诞生。',
    artists: [
      { id: 'kandinsky', name: 'Wassily Kandinsky', years: '1866—1944', note: '听见颜色的人。' },
      { id: 'marc', name: 'Franz Marc', years: '1880—1916', note: '用蓝色画马匹的灵魂。' },
      { id: 'delaunay', name: 'Robert Delaunay', years: '1885—1941', note: '让色彩自己唱歌。' },
    ],
    influencedBy: [],
    influenced: ['suprematism'],
    map: { x: yearToX(1912), y: -560 },
    visualStyle: { motif: 'orbit', accent: '#5b7fc4' },
  },
  {
    id: 'dada',
    index: '14',
    name: '达达主义',
    nameEn: 'DADA',
    startYear: 1916,
    endYear: 1923,
    question: '如果世界本身已经荒谬，艺术为什么还要合理？',
    description:
      '第一次世界大战之后，达达主义拒绝传统意义、审美和艺术标准。杜尚通过现成品提出：决定一件东西是不是艺术的，究竟是物体本身，还是艺术家的选择和观念？',
    artists: [
      { id: 'duchamp', name: 'Marcel Duchamp', years: '1887—1968', note: '一个小便池，改写了艺术的定义。' },
      { id: 'tzara', name: 'Tristan Tzara', years: '1896—1963', note: '达达的煽动者与诗人。' },
      { id: 'hoch', name: 'Hannah Höch', years: '1889—1978', note: '用剪刀与照片拼贴解剖时代。' },
    ],
    influencedBy: [],
    influenced: ['surrealism', 'conceptual-art', 'pop-art'],
    map: { x: yearToX(1919), y: 480 },
    visualStyle: { motif: 'shatter', accent: '#5a5a54' },
  },
  {
    id: 'surrealism',
    index: '15',
    name: '超现实主义',
    nameEn: 'SURREALISM',
    startYear: 1924,
    endYear: 1945,
    question: '现实之外，潜意识是否存在另一种真实？',
    description:
      '受到弗洛伊德心理学影响，超现实主义试图探索梦境、潜意识、欲望和非理性世界。熟悉的物体被重新组合，创造出介于现实和梦境之间的视觉体验。',
    artists: [
      { id: 'dali', name: 'Salvador Dalí', years: '1904—1989', note: '把梦境画得比现实还精确。' },
      { id: 'magritte', name: 'René Magritte', years: '1898—1967', note: '最平常的物体，最深的谜。' },
      { id: 'ernst', name: 'Max Ernst', years: '1891—1976', note: '在拓印与刮擦中召唤幻象。' },
      { id: 'miro', name: 'Joan Miró', years: '1893—1983', note: '星星、女人与鸟的星座。' },
    ],
    influencedBy: ['dada'],
    influenced: ['abstract-expressionism'],
    map: { x: yearToX(1932), y: 400 },
    visualStyle: { motif: 'swirl', accent: '#6a5a8a' },
  },
  {
    id: 'abstract-expressionism',
    index: '16',
    name: '抽象表现主义',
    nameEn: 'ABSTRACT EXPRESSIONISM',
    startYear: 1943,
    endYear: 1970,
    question: '绘画能否直接记录人的行动和情绪？',
    description:
      '抽象表现主义把创作行为本身变成作品的一部分。滴洒、泼洒、巨大画布和身体动作让绘画成为一种事件。艺术中心从巴黎转向纽约。',
    artists: [
      { id: 'pollock', name: 'Jackson Pollock', years: '1912—1956', note: '把画布铺在地上，绕着它跳舞。' },
      { id: 'rothko', name: 'Mark Rothko', years: '1903—1970', note: '用漂浮的色块包裹观看者的情绪。' },
      { id: 'de-kooning', name: 'Willem de Kooning', years: '1904—1997', note: '在具象与抽象之间反复搏斗。' },
    ],
    influencedBy: ['surrealism'],
    influenced: ['pop-art'],
    map: { x: yearToX(1950), y: 40 },
    visualStyle: { motif: 'gesture', accent: '#3a3a38' },
  },
  {
    id: 'pop-art',
    index: '17',
    name: '波普艺术',
    nameEn: 'POP ART',
    startYear: 1956,
    endYear: 1970,
    question: '广告、漫画和可乐罐为什么不能成为艺术？',
    description:
      '波普艺术主动拥抱消费社会，把明星、广告、包装、漫画和商品带入艺术。所谓高级艺术与大众文化之间的界限开始崩塌。',
    artists: [
      { id: 'warhol', name: 'Andy Warhol', years: '1928—1987', note: '让汤罐和梦露成为新的圣像。' },
      { id: 'lichtenstein', name: 'Roy Lichtenstein', years: '1923—1997', note: '把漫画网点放大成纪念碑。' },
      { id: 'hamilton', name: 'Richard Hamilton', years: '1922—2011', note: '波普的定义者与先驱。' },
    ],
    influencedBy: ['dada', 'abstract-expressionism'],
    influenced: ['postmodernism'],
    map: { x: yearToX(1962), y: 200 },
    visualStyle: { motif: 'pop', accent: '#c23a22' },
  },
  {
    id: 'conceptual-art',
    index: '18',
    name: '观念艺术',
    nameEn: 'CONCEPTUAL ART',
    startYear: 1952,
    endYear: 2020,
    question: '如果思想本身就是作品，还需要艺术品吗？',
    description:
      '观念艺术进一步推进杜尚留下的问题：艺术最重要的可能不是物体，而是一个想法。文字、行为、档案、指令甚至一段描述都可能成为作品。',
    artists: [
      { id: 'kosuth', name: 'Joseph Kosuth', years: '1945—', note: '一把椅子、一张椅子的照片、一段椅子的定义。' },
      { id: 'ono', name: 'Yoko Ono', years: '1933—', note: '用一句指令让观众完成作品。' },
      { id: 'beuys', name: 'Joseph Beuys', years: '1921—1986', note: '"人人都是艺术家"。' },
      { id: 'abramovic', name: 'Marina Abramović', years: '1946—', note: '把身体推向极限的在场。' },
    ],
    influencedBy: ['dada', 'minimalism'],
    influenced: ['contemporary'],
    map: { x: yearToX(1968), y: -320 },
    visualStyle: { motif: 'square', accent: '#4a7a5a' },
  },
  {
    id: 'minimalism',
    index: '19',
    name: '极简主义',
    nameEn: 'MINIMALISM',
    startYear: 1960,
    endYear: 1975,
    question: '艺术最少可以只剩下什么？',
    description:
      '极简主义拒绝个人情绪和复杂叙事，把作品压缩到几何形状、材料、比例、空间和重复关系。作品不再"讲故事"，而让观看者直接感知物体与空间。',
    artists: [
      { id: 'judd', name: 'Donald Judd', years: '1928—1994', note: '等距排列的方盒，拒绝任何隐喻。' },
      { id: 'flavin', name: 'Dan Flavin', years: '1933—1996', note: '用现成荧光灯管作画。' },
      { id: 'andre', name: 'Carl Andre', years: '1935—2024', note: '把金属板平铺在地，邀请你踩上去。' },
      { id: 'martin', name: 'Agnes Martin', years: '1912—2004', note: '铅笔网格里的静默与光。' },
    ],
    influencedBy: [],
    influenced: ['conceptual-art'],
    map: { x: yearToX(1965), y: -120 },
    visualStyle: { motif: 'minimal', accent: '#9a9a94' },
  },
  {
    id: 'postmodernism',
    index: '20',
    name: '后现代主义',
    nameEn: 'POSTMODERNISM',
    startYear: 1970,
    endYear: 1989,
    question: '为什么一定存在一种正确的现代设计和艺术？',
    description:
      '后现代主义质疑现代主义追求统一、理性和纯粹的倾向。引用、拼贴、戏仿、混搭和大众文化重新进入艺术。历史不再被抛弃，而成为可以随意调用的素材库。',
    artists: [
      { id: 'sherman', name: 'Cindy Sherman', years: '1954—', note: '在自拍里扮演无数个“她”。' },
      { id: 'koons', name: 'Jeff Koons', years: '1955—', note: '把庸俗商品做成不锈钢纪念碑。' },
      { id: 'venturi', name: 'Robert Venturi', years: '1925—2018', note: '“少即是乏味”，向拉斯维加斯学习。' },
      { id: 'kruger', name: 'Barbara Kruger', years: '1945—', note: '用广告语反问“谁”在说话。' },
    ],
    influencedBy: ['bauhaus', 'pop-art'],
    influenced: ['contemporary'],
    map: { x: yearToX(1980), y: 120 },
    visualStyle: { motif: 'collage', accent: '#8a4a6a' },
  },
  {
    id: 'contemporary',
    index: '21',
    name: '当代艺术',
    nameEn: 'CONTEMPORARY',
    startYear: 1988,
    endYear: 2020,
    question: '当媒介已经没有边界，艺术还是什么？',
    description:
      '当代艺术不再由一种统一风格定义。装置、影像、互联网、数据、VR、电子游戏、生物技术、人工智能与社会实践都可以成为艺术媒介。艺术的重点越来越从"它看起来是什么"转向"它提出了什么问题"。',
    artists: [
      { id: 'hirst', name: 'Damien Hirst', years: '1965—', note: '把鲨鱼泡进甲醛，命名“死亡”。' },
      { id: 'ai-weiwei', name: 'Ai Weiwei', years: '1957—', note: '用一亿颗陶瓷瓜子铺满大厅。' },
      { id: 'eliasson', name: 'Olafur Eliasson', years: '1967—', note: '在美术馆里造出一轮太阳。' },
      { id: 'teamLab', name: 'teamLab', years: '2001—', note: '让数字花海随观众呼吸。' },
    ],
    influencedBy: ['conceptual-art', 'postmodernism'],
    influenced: [],
    map: { x: yearToX(2002), y: -60 },
    visualStyle: { motif: 'orbit', accent: '#4a6a8a' },
  },
]

/** 本轮可进入详情页的节点 */
export const liveMovements = movements.filter((m) => !m.ghost)

const byId = new Map(movements.map((m) => [m.id, m]))

export function getMovement(id: string): Movement | undefined {
  return byId.get(id)
}

/** 与某节点直接相连的所有节点 id */
export function neighborIds(id: string): Set<string> {
  const m = byId.get(id)
  if (!m) return new Set()
  return new Set([...m.influencedBy, ...m.influenced])
}
