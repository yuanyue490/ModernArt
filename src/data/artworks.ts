import type { Artwork } from './types'

/**
 * 代表作品数据。image 指向 public/artworks/ 下的本地文件
 * （Wikimedia Commons 公有领域图片）；版权暂缺的作品不设 image，
 * 前端会以流派母题生成图形占位。
 */
export const artworks: Record<string, Artwork[]> = {
  realism: [
    {
      id: 'courbet-stonebreakers',
      title: '碎石工',
      titleOriginal: 'The Stone Breakers',
      artist: 'Gustave Courbet',
      year: '1849',
      image: '/artworks/courbet-stonebreakers.jpg',
      medium: '布面油画（毁于二战）',
      museum: '原藏德累斯顿',
      description:
        '一老一少两个工人背对观众敲打石块，没有英雄、没有故事，只有劳动本身。',
      significance:
        '库尔贝说"画我看得见的"——普通劳动者第一次以纪念碑的尺寸进入绘画。',
    },
    {
      id: 'millet-gleaners',
      title: '拾穗者',
      titleOriginal: 'The Gleaners',
      artist: 'Jean-François Millet',
      year: '1857',
      image: '/artworks/millet-gleaners.jpg',
      medium: '布面油画',
      museum: '奥赛博物馆，巴黎',
      description:
        '三个农妇在收割后的麦田里弯腰捡拾遗落的麦穗，远处是堆积如山的丰收。',
      significance:
        '弯腰的农妇被画得像雕像一样庄严——贫困与尊严并置，震动整个巴黎沙龙。',
    },
    {
      id: 'courbet-burial',
      title: '奥尔南的葬礼',
      titleOriginal: 'A Burial at Ornans',
      artist: 'Gustave Courbet',
      year: '1849—50',
      image: '/artworks/courbet-burial.jpg',
      medium: '布面油画',
      museum: '奥赛博物馆，巴黎',
      description:
        '六米多长的画布上，几十个小城镇居民面无表情地参加一场普通葬礼，没有圣徒也没有神迹。',
      significance:
        '用历史画的巨幅尺寸描绘无名之辈——现实主义向学院等级制正面宣战。',
    },
  ],

  impressionism: [
    {
      id: 'impression-sunrise',
      title: '印象·日出',
      titleOriginal: 'Impression, soleil levant',
      artist: 'Claude Monet',
      year: '1872',
      image: '/artworks/impression-sunrise.jpg',
      medium: '布面油画',
      museum: '巴黎玛摩丹美术馆',
      description:
        '勒阿弗尔港的清晨，橙日悬在灰蓝的雾气上，船影只用几笔带过。莫奈画的不是港口，而是"看"这个动作本身。',
      significance:
        '1874 年，评论家勒罗伊借这幅画嘲讽整个展览——"印象派"由此得名。绘画的主题第一次从"画什么"变成"如何看"。',
    },
    {
      id: 'moulin-galette',
      title: '煎饼磨坊的舞会',
      titleOriginal: 'Bal du moulin de la Galette',
      artist: 'Pierre-Auguste Renoir',
      year: '1876',
      image: '/artworks/moulin-galette.jpg',
      medium: '布面油画',
      museum: '奥赛博物馆，巴黎',
      description:
        '阳光穿过树叶，洒在跳舞的人群上。光斑本身就是主角，人物只是承载光的容器。',
      significance:
        '现代生活第一次配得上大画幅：普通人的星期天，被画得像历史画一样隆重。',
    },
    {
      id: 'dance-class',
      title: '舞蹈课',
      titleOriginal: 'The Dance Class',
      artist: 'Edgar Degas',
      year: '1874',
      image: '/artworks/degas-dance-class.jpg',
      medium: '布面油画',
      museum: '大都会艺术博物馆，纽约',
      description:
        '排练厅里松散的一瞬间：有人拉伸，有人走神。德加用快照般的裁切，把"偶然"变成构图。',
      significance:
        '受摄影与日本版画启发的偏心构图，让绘画学会捕捉未经排练的真实。',
    },
  ],

  'post-impressionism': [
    {
      id: 'starry-night',
      title: '星月夜',
      titleOriginal: 'The Starry Night',
      artist: 'Vincent van Gogh',
      year: '1889',
      image: '/artworks/starry-night.jpg',
      medium: '布面油画',
      museum: 'MoMA，纽约',
      description:
        '圣雷米疗养院窗外的夜：星云翻滚，柏树像黑色火焰。梵高画的是他感受到的、而非看到的天空。',
      significance: '笔触成为情绪本身——表现主义的火种在这里点燃。',
    },
    {
      id: 'gauguin-where',
      title: '我们从何处来？我们是谁？我们向何处去？',
      titleOriginal: "D'où venons-nous ? Que sommes-nous ? Où allons-nous ?",
      artist: 'Paul Gauguin',
      year: '1897—98',
      image: '/artworks/gauguin-where.jpg',
      medium: '布面油画',
      museum: '波士顿美术馆',
      description:
        '塔希提岛上从婴儿到老者的人生长卷，高更称其为自己的"哲学遗嘱"。',
      significance:
        '绘画不再描绘现实，而开始追问意义——象征主义与原始主义的汇合点。',
    },
    {
      id: 'grande-jatte',
      title: '大碗岛的星期天下午',
      titleOriginal: 'A Sunday Afternoon on the Island of La Grande Jatte',
      artist: 'Georges Seurat',
      year: '1884—86',
      image: '/artworks/grande-jatte.jpg',
      medium: '布面油画',
      museum: '芝加哥艺术学院',
      description:
        '几十万个小色点构成的星期天。近看是噪点，远看是光的颤动。',
      significance: '点彩法把色彩交给光学：现代艺术第一次与科学结盟。',
    },
  ],

  cezanne: [
    {
      id: 'mont-sainte-victoire',
      title: '圣维克多山',
      titleOriginal: 'Mont Sainte-Victoire',
      artist: 'Paul Cézanne',
      year: '1902—04',
      image: '/artworks/mont-sainte-victoire.jpg',
      medium: '布面油画',
      museum: '费城艺术博物馆',
      description:
        '同一座山，塞尚画了几十年。山体被拆解成色块与笔触的编织，轮廓在空气里微微颤抖。',
      significance:
        '自然被翻译成结构——"用圆柱、球体、圆锥处理自然"，立体主义的地基在此浇筑。',
    },
    {
      id: 'basket-of-apples',
      title: '苹果篮',
      titleOriginal: 'The Basket of Apples',
      artist: 'Paul Cézanne',
      year: '1893',
      image: '/artworks/basket-of-apples.jpg',
      medium: '布面油画',
      museum: '芝加哥艺术学院',
      description:
        '桌面倾斜，苹果仿佛随时滚落，透视被故意"画错"。',
      significance:
        '塞尚主动牺牲正确的透视，换取画面结构的稳定——"错误"成为一种方法。',
    },
    {
      id: 'card-players',
      title: '玩纸牌者',
      titleOriginal: 'The Card Players',
      artist: 'Paul Cézanne',
      year: '1890—95',
      image: '/artworks/card-players.jpg',
      medium: '布面油画',
      museum: '奥赛博物馆，巴黎',
      description:
        '两个农夫低头打牌，沉默如两座山。日常场景获得了古典构图的庄严。',
      significance: '"用印象派的方法画出博物馆式的永恒"——这是塞尚给出的答案。',
    },
  ],

  fauvism: [
    {
      id: 'woman-with-hat',
      title: '戴帽子的女人',
      titleOriginal: 'Woman with a Hat',
      artist: 'Henri Matisse',
      year: '1905',
      image: '/artworks/woman-with-hat.jpg',
      medium: '布面油画',
      museum: '旧金山现代艺术博物馆',
      description:
        '马蒂斯夫人的肖像：脸上的绿色、紫色与橙色互不调和，背景的颜料像直接挤上画布。',
      significance:
        '1905 年秋季沙龙，评论家在这批画前惊呼"多纳泰罗被野兽包围了"——野兽派由此得名。',
    },
    {
      id: 'matisse-dance',
      title: '舞蹈（I）',
      titleOriginal: 'Dance (I)',
      artist: 'Henri Matisse',
      year: '1909',
      image: '/artworks/matisse-dance.jpg',
      medium: '布面油画',
      museum: 'MoMA，纽约',
      description:
        '五个人体围成一圈在蓝色背景前起舞，全画只有蓝、绿、橙三种颜色，节奏完全来自形体本身。',
      significance:
        '马蒂斯把绘画减到最少：颜色即情绪，轮廓即节奏——现代装饰与表现主义的共同源头。',
    },
    {
      id: 'derain-charing-cross',
      title: '查令十字桥',
      titleOriginal: 'Charing Cross Bridge, London',
      artist: 'André Derain',
      year: '1906',
      image: '/artworks/derain-charing-cross.jpg',
      medium: '布面油画',
      museum: '——',
      description:
        '泰晤士河的雾不见了，取而代之的是粉红色的水面、宝石般的船影与一根荧光绿的桥墩。',
      significance:
        '德兰把工业时代的伦敦画成热带——野兽派证明颜色可以是纯粹的主观选择。',
    },
  ],

  cubism: [
    {
      id: 'demoiselles',
      title: '亚威农少女',
      titleOriginal: "Les Demoiselles d'Avignon",
      artist: 'Pablo Picasso',
      year: '1907',
      medium: '布面油画',
      museum: 'MoMA，纽约',
      description:
        '五张面孔带着非洲面具的棱角，身体被折成锋利的平面。空间碎裂，传统透视当场死亡。',
      significance:
        '二十世纪绘画的引爆点：布拉克看完后说自己"像吞了汽油"，随后与毕加索一起发明了立体主义。',
    },
    {
      id: 'gris-portrait-picasso',
      title: '毕加索肖像',
      titleOriginal: 'Portrait of Pablo Picasso',
      artist: 'Juan Gris',
      year: '1912',
      image: '/artworks/gris-portrait-picasso.jpg',
      medium: '布面油画',
      museum: '芝加哥艺术学院',
      description:
        '画家本人被拆解成深浅不一的蓝色切面，像一件正在组装中的精密仪器。',
      significance: '格里斯证明：立体主义不仅能解构物体，也能解构"人"。',
    },
    {
      id: 'gris-still-life',
      title: '静物与格子桌布',
      titleOriginal: 'Still Life with Checked Tablecloth',
      artist: 'Juan Gris',
      year: '1915',
      image: '/artworks/gris-still-life.jpg',
      medium: '布面油画',
      museum: '大都会艺术博物馆，纽约',
      description:
        '瓶子、报纸与桌面在网格中重新对齐，现实被折叠进一套严密的平面秩序。',
      significance: '综合立体主义的样本：碎片不再是分析的结果，而是构造的材料。',
    },
  ],

  futurism: [
    {
      id: 'city-rises',
      title: '城市的兴起',
      titleOriginal: 'The City Rises',
      artist: 'Umberto Boccioni',
      year: '1910',
      image: '/artworks/city-rises.jpg',
      medium: '布面油画',
      museum: 'MoMA，纽约',
      description:
        '马匹、工人与脚手架在画面中央拧成一股旋风，城市像一台正在启动的巨大机器。',
      significance:
        '未来主义的视觉宣言：现代生活的主角不是人，而是速度与力量本身。',
    },
    {
      id: 'dog-leash',
      title: '拴着皮带的狗的动态',
      titleOriginal: 'Dynamism of a Dog on a Leash',
      artist: 'Giacomo Balla',
      year: '1912',
      medium: '布面油画',
      museum: '奥尔布赖特-诺克斯美术馆，布法罗',
      description:
        '腊肠狗的腿变成十几条重影，女士的裙摆与皮带一起晃动——时间被画进了同一张画。',
      significance:
        '用连续残影表现运动：摄影的延时原理被直接搬上画布，"动感"成为主题。',
    },
    {
      id: 'unique-forms',
      title: '空间连续的独特形体',
      titleOriginal: 'Unique Forms of Continuity in Space',
      artist: 'Umberto Boccioni',
      year: '1913',
      image: '/artworks/unique-forms.jpg',
      medium: '青铜',
      museum: '——',
      description:
        '一个迈步向前的人体被风"吹"成流线型的铠甲，肌肉化作火焰般的曲面。',
      significance:
        '雕塑第一次不表现"一个姿势"，而表现"运动本身"——二十世纪的图腾。',
    },
  ],

  abstraction: [
    {
      id: 'kandinsky-composition-7',
      title: '构成 VII',
      titleOriginal: 'Composition VII',
      artist: 'Wassily Kandinsky',
      year: '1913',
      image: '/artworks/kandinsky-composition-7.jpg',
      medium: '布面油画',
      museum: '特列季亚科夫画廊，莫斯科',
      description:
        '色彩与线条像交响乐般碰撞、回旋，没有可辨认的物体，只有纯粹的节奏与张力。',
      significance:
        '康定斯基最宏大的"构成"——绘画彻底脱离再现，成为"视觉的音乐"。',
    },
    {
      id: 'marc-blue-horses',
      title: '蓝色大马群',
      titleOriginal: 'The Large Blue Horses',
      artist: 'Franz Marc',
      year: '1911',
      image: '/artworks/marc-blue-horses.jpg',
      medium: '布面油画',
      museum: '沃克艺术中心，明尼阿波利斯',
      description:
        '三匹蓝色的马低垂着头，脊背的曲线与身后起伏的山峦融为一体。',
      significance:
        '马尔克相信蓝色是"男性的、精神性的"——颜色成为通向灵魂的语言。',
    },
  ],

  suprematism: [
    {
      id: 'black-square',
      title: '黑方块',
      titleOriginal: 'Black Square',
      artist: 'Kazimir Malevich',
      year: '1915',
      image: '/artworks/black-square.jpg',
      medium: '布面油画',
      museum: '特列季亚科夫画廊，莫斯科',
      description:
        '白底上一个微微倾斜的黑方块。没有对象、没有故事、没有透视。',
      significance:
        '1915 年"0.10"展览上它被挂在圣像的位置——艺术的"零点"，一切从这里重新开始。',
    },
    {
      id: 'white-on-white',
      title: '至上主义构成：白色上的白色',
      titleOriginal: 'Suprematist Composition: White on White',
      artist: 'Kazimir Malevich',
      year: '1918',
      image: '/artworks/white-on-white.jpg',
      medium: '布面油画',
      museum: 'MoMA，纽约',
      description:
        '白色方块悬浮在白色底上，只剩轻微的色差与倾斜证明它存在。',
      significance:
        '减法的极限：当绘画几乎什么都不剩时，"感受"本身浮现出来。',
    },
    {
      id: 'suprematist-composition',
      title: '至上主义构成',
      titleOriginal: 'Suprematist Composition',
      artist: 'Kazimir Malevich',
      year: '1916',
      image: '/artworks/suprematist-composition.jpg',
      medium: '布面油画',
      museum: '——',
      description:
        '蓝色矩形、红色横梁与细碎几何体在白色空间里失重漂浮。',
      significance:
        '这套漂浮的几何语法直接催生了构成主义，并流入整个二十世纪的平面设计。',
    },
  ],

  constructivism: [
    {
      id: 'red-wedge',
      title: '用红色楔形打击白军',
      titleOriginal: 'Beat the Whites with the Red Wedge',
      artist: 'El Lissitzky',
      year: '1919',
      image: '/artworks/red-wedge.jpg',
      medium: '石版海报',
      museum: '——',
      description:
        '一个红色三角形刺入白色圆形——政治、几何与速度，被压缩成一个动作。',
      significance: '海报成为武器：抽象形式第一次大规模进入公共宣传。',
    },
    {
      id: 'tatlin-tower',
      title: '第三国际纪念碑（模型）',
      titleOriginal: 'Monument to the Third International',
      artist: 'Vladimir Tatlin',
      year: '1919—20',
      image: '/artworks/tatlin-tower.jpg',
      medium: '木材、金属（模型）',
      museum: '原始模型已散佚',
      description:
        '螺旋上升的钢架内悬着玻璃几何体，计划高过埃菲尔铁塔，并且永远旋转。',
      significance:
        '它从未建成，却建成了一切——"材料、结构、社会"三位一体的构成主义宣言。',
    },
    {
      id: 'lissitzky-proun',
      title: 'PROUN 5A',
      titleOriginal: 'Proun 5A',
      artist: 'El Lissitzky',
      year: '1919',
      image: '/artworks/lissitzky-proun.jpg',
      medium: '布面油画',
      museum: '——',
      description:
        '漂浮的几何体重力尽失，介于绘画、建筑与装置之间。',
      significance:
        '利西茨基称 PROUN 为"从绘画到建筑的换乘站"——包豪斯与风格派都接到了这班车。',
    },
    {
      id: 'rodchenko-books',
      title: '读书海报',
      titleOriginal: '«Книги» (Books)',
      artist: 'Alexander Rodchenko',
      year: '1924',
      medium: '石版海报',
      museum: '——',
      description:
        '几何化的人脸喊出口号，摄影蒙太奇与粗体字一起爆炸。',
      significance: '平面设计的现代语法在此定型：对角线、无衬线、摄影蒙太奇。',
    },
  ],

  'de-stijl': [
    {
      id: 'mondrian-composition-ii',
      title: '红、蓝、黄构成 II',
      titleOriginal: 'Composition II in Red, Blue, and Yellow',
      artist: 'Piet Mondrian',
      year: '1930',
      image: '/artworks/mondrian-composition-ii.jpg',
      medium: '布面油画',
      museum: '苏黎世美术馆',
      description:
        '黑线把画面分成几个矩形：一大块红、一小块蓝、一角黄，其余留白。',
      significance:
        '蒙德里安用三十年证明：最少的元素可以抵达最大的平衡。',
    },
    {
      id: 'doesburg-counter-composition',
      title: '反构成 V',
      titleOriginal: 'Counter-Composition V',
      artist: 'Theo van Doesburg',
      year: '1924',
      image: '/artworks/doesburg-counter-composition.jpg',
      medium: '布面油画',
      museum: '——',
      description:
        '同样是三原色与黑白灰，但所有方块旋转了 45 度——对角线带来张力与动感。',
      significance:
        '凡·杜斯堡用对角线"背叛"了蒙德里安的水平垂直教义，风格派因此分裂。',
    },
    {
      id: 'victory-boogie-woogie',
      title: '胜利百老汇',
      titleOriginal: 'Victory Boogie Woogie',
      artist: 'Piet Mondrian',
      year: '1942—44',
      image: '/artworks/victory-boogie-woogie.jpg',
      medium: '布面油画（未完成）',
      museum: '海牙市立博物馆',
      description:
        '黑线消失了，彩色的马赛克小方块沿着网格跳动，像纽约街区的爵士乐。',
      significance:
        '未完成的遗作：秩序开始跳舞——通向像素与节奏的时代。',
    },
  ],

  dada: [
    {
      id: 'duchamp-fountain',
      title: '泉',
      titleOriginal: 'Fountain',
      artist: 'Marcel Duchamp',
      year: '1917',
      image: '/artworks/duchamp-fountain.jpg',
      medium: '现成品（陶瓷小便池）',
      museum: '原作已佚，施蒂格利茨摄',
      description:
        '一个从商店买来的小便池，签上"R. Mutt"，横放过来，送去参展。',
      significance:
        '杜尚用一件工业品提问：是物体，还是艺术家的选择，让某物成为艺术？观念艺术由此发端。',
    },
    {
      id: 'duchamp-lhooq',
      title: 'L.H.O.O.Q.',
      titleOriginal: 'L.H.O.O.Q.',
      artist: 'Marcel Duchamp',
      year: '1919',
      medium: '明信片改绘',
      museum: '——',
      description:
        '在蒙娜丽莎的明信片复制品上画两撇小胡子，标题是一句法语谐音的双关玩笑。',
      significance:
        '对神圣经典的公然戏谑——达达用玩笑拆解艺术的权威。',
    },
  ],

  surrealism: [
    {
      id: 'magritte-treachery',
      title: '形象的背叛',
      titleOriginal: 'The Treachery of Images',
      artist: 'René Magritte',
      year: '1929',
      medium: '布面油画',
      museum: '洛杉矶郡立艺术博物馆',
      description:
        '一支画得极其工整的烟斗，下面一行字："这不是一支烟斗。"',
      significance:
        '图像只是图像，不是实物——马格利特用最冷静的笔触揭开再现的谎言。',
    },
    {
      id: 'magritte-son-of-man',
      title: '人类之子',
      titleOriginal: 'The Son of Man',
      artist: 'René Magritte',
      year: '1964',
      medium: '布面油画',
      museum: '——',
      description:
        '戴圆顶礼帽的男人面前悬着一颗青苹果，刚好挡住脸，只露出一只眼睛的边缘。',
      significance:
        '"我们看到的每件事都藏着另一件事"——被遮蔽的脸成为现代图像文化的符号。',
    },
  ],

  minimalism: [
    {
      id: 'flavin-monument',
      title: '献给 V. 塔特林的"纪念碑" 1 号',
      titleOriginal: 'Monument 1 for V. Tatlin',
      artist: 'Dan Flavin',
      year: '1964',
      medium: '荧光灯管装置',
      museum: '——',
      description:
        '一根市售荧光灯管斜 45 度钉在墙角，白色的光晕把墙角变成作品的一部分。',
      significance:
        '用最普通的工业品、最简洁的姿态，向构成主义致敬——光本身成为雕塑。',
    },
    {
      id: 'andre-equivalent',
      title: '等量 VIII',
      titleOriginal: 'Equivalent VIII',
      artist: 'Carl Andre',
      year: '1966',
      medium: '120 块耐火砖',
      museum: '泰特美术馆，伦敦',
      description:
        '120 块标准耐火砖在地面上铺成两层矩形，没有任何固定、没有基座、没有修饰。',
      significance:
        '"这不是雕塑，而是地方"——作品退到最少，让观看者直面材料与空间本身。',
    },
  ],

  'conceptual-art': [
    {
      id: 'kosuth-chairs',
      title: '一把和三把椅子',
      titleOriginal: 'One and Three Chairs',
      artist: 'Joseph Kosuth',
      year: '1965',
      medium: '木椅、照片、文字定义',
      museum: 'MoMA，纽约',
      description:
        '一把真椅子、一张椅子的等大照片、一段词典里"椅子"的定义，并置在墙上。',
      significance:
        '实物、图像、语言——哪一把才是"真正的椅子"？艺术的对象从物体转向概念。',
    },
    {
      id: 'ono-cut-piece',
      title: '切片',
      titleOriginal: 'Cut Piece',
      artist: 'Yoko Ono',
      year: '1964',
      medium: '行为表演',
      museum: '——',
      description:
        '小野洋子端坐台上，邀请观众轮流上前，用剪刀剪下她衣服的一小片带走。',
      significance:
        '作品由观众的动作完成——观看者成为参与者，艺术变成一场关于信任的实验。',
    },
  ],

  bauhaus: [
    {
      id: 'composition-8',
      title: '构成 VIII',
      titleOriginal: 'Composition VIII',
      artist: 'Wassily Kandinsky',
      year: '1923',
      image: '/artworks/kandinsky-composition-8.jpg',
      medium: '布面油画',
      museum: '古根海姆博物馆，纽约',
      description:
        '圆、直线与三角形在粉彩的空气里精确对位，像一首可视化的赋格。',
      significance: '包豪斯课堂上的几何圣经：形式分析成为一门可以教授的科学。',
    },
    {
      id: 'klee-senecio',
      title: 'Senecio（老人）',
      titleOriginal: 'Senecio',
      artist: 'Paul Klee',
      year: '1922',
      image: '/artworks/klee-senecio.jpg',
      medium: '纱布油画',
      museum: '巴塞尔美术馆',
      description:
        '一张脸被简化为圆与色块：一半是庄严的面具，一半是孩子气的涂鸦。',
      significance: '克利证明最严格的构成也可以保留幽默——包豪斯不是冷冰冰的。',
    },
    {
      id: 'bauhaus-dessau',
      title: '包豪斯德绍校舍',
      titleOriginal: 'Bauhaus Building, Dessau',
      artist: 'Walter Gropius',
      year: '1925—26',
      image: '/artworks/bauhaus-dessau.jpg',
      medium: '建筑',
      museum: '德绍，德国',
      description:
        '玻璃幕墙悬在墙角之外，车间、舞台与教室被组织成一座功能的晶体。',
      significance: '建筑本身成了招生简章："艺术与技术——新的统一"。',
    },
    {
      id: 'moholy-nagy-a19',
      title: 'A 19',
      titleOriginal: 'A 19',
      artist: 'László Moholy-Nagy',
      year: '1927',
      image: '/artworks/moholy-nagy-a19.jpg',
      medium: '布面油画',
      museum: '——',
      description:
        '光、网格与透明平面的交叠，如同机器时代的静物。',
      significance: '莫霍利-纳吉把摄影与光变成设计材料——新媒体艺术的先声。',
    },
  ],
}

export function artworksOf(movementId: string): Artwork[] {
  return artworks[movementId] ?? []
}
