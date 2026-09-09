import { artworkImageMeta } from './artworkImageMeta.ts'
import type { Artwork } from './types'

type ArtworkDraft = Omit<Artwork, 'imageMeta'>

/**
 * 代表作品数据。image 指向 public/artworks/ 下的本地文件；
 * 图片身份、许可和核验状态统一由 artworkImageMeta 补入。
 * 版权受限、待补或作品身份存疑的条目不设 image。
 */
const artworkData: Record<string, ArtworkDraft[]> = {
  realism: [
    {
      id: 'courbet-stonebreakers',
      title: '碎石工',
      titleOriginal: 'The Stone Breakers',
      artist: 'Gustave Courbet',
      year: '1849',
      image: '/artworks/courbet-stonebreakers.webp',
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
      image: '/artworks/millet-gleaners.webp',
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
      image: '/artworks/courbet-burial.webp',
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
      image: '/artworks/impression-sunrise.webp',
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
      image: '/artworks/moulin-galette.webp',
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
      image: '/artworks/degas-dance-class.webp',
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
      image: '/artworks/starry-night.webp',
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
      image: '/artworks/gauguin-where.webp',
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
      image: '/artworks/grande-jatte.webp',
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
      image: '/artworks/mont-sainte-victoire.webp',
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
      image: '/artworks/basket-of-apples.webp',
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
      image: '/artworks/card-players.webp',
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
      image: '/artworks/woman-with-hat.webp',
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
      image: '/artworks/matisse-dance.webp',
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
      image: '/artworks/derain-charing-cross.webp',
      medium: '布面油画',
      museum: '美国国家美术馆，华盛顿',
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
      image: '/artworks/demoiselles.webp',
      medium: '布面油画',
      museum: 'MoMA，纽约',
      reference: {
        provider: 'MoMA',
        url: 'https://www.moma.org/collection/works/79766',
        objectId: '333.1939',
        verifiedOn: '2026-08-28',
        note: '馆藏页确认 1907 年巴黎版本；页面同时明确标注 Picasso Estate / ARS 版权声明。',
      },
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
      image: '/artworks/gris-portrait-picasso.webp',
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
      image: '/artworks/gris-still-life.webp',
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
      image: '/artworks/city-rises.webp',
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
      image: '/artworks/dog-leash.webp',
      medium: '布面油画',
      museum: 'Buffalo AKG Art Museum，布法罗',
      reference: {
        provider: 'Buffalo AKG Art Museum',
        url: 'https://buffaloakg.org/artworks/196416-dinamismo-di-un-cane-al-guinzaglio-dynamism-dog-leash',
        objectId: '1964:16',
        verifiedOn: '2026-08-28',
        note: '馆藏页确认题名、1912 年、媒介、尺寸与来源；页面图仍标 ARS / SIAE。',
      },
      description:
        '腊肠狗的腿变成十几条重影，女士的裙摆与皮带一起晃动——时间被画进了同一张画。',
      significance:
        '用连续残影表现运动：摄影的延时原理被直接搬上画布，"动感"成为主题。',
    },
    {
      id: 'unique-forms',
      title: '空间中连续的唯一形态',
      titleOriginal: 'Unique Forms of Continuity in Space',
      artist: 'Umberto Boccioni',
      year: '1913',
      image: '/artworks/unique-forms.webp',
      medium: '青铜（1931 或 1934 年铸造）',
      museum: 'MoMA，纽约',
      reference: {
        provider: 'MoMA',
        url: 'https://www.moma.org/collection/works/81179',
        objectId: '231.1948',
        verifiedOn: '2026-08-27',
        note: '页面展示的是 MoMA 馆藏铸件；作品构思于 1913 年，铸造于 1931 或 1934 年。',
      },
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
      image: '/artworks/kandinsky-composition-7.webp',
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
      image: '/artworks/marc-blue-horses.webp',
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
      image: '/artworks/black-square.webp',
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
      image: '/artworks/white-on-white.webp',
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
      image: '/artworks/suprematist-composition.webp',
      medium: '布面油画',
      museum: '私人收藏（2008 年拍卖后）',
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
      year: '1919—20',
      image: '/artworks/red-wedge.webp',
      medium: '石版画海报',
      museum: '俄罗斯国家图书馆，莫斯科',
      reference: {
        provider: '俄罗斯国家图书馆（经 Wikimedia Commons）',
        url: 'https://commons.wikimedia.org/wiki/File:Klinom_Krasnym_Bej_Belych.JPG',
        verifiedOn: '2026-08-27',
        note: '馆藏记录年份为 1919—1920；当前图为俄罗斯国家图书馆扫描。',
      },
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
      image: '/artworks/tatlin-tower.webp',
      medium: '木材、金属（模型）',
      museum: '原始模型已散佚',
      description:
        '螺旋上升的钢架内悬着玻璃几何体，计划高过埃菲尔铁塔，并且永远旋转。',
      significance:
        '它从未建成，却建成了一切——"材料、结构、社会"三位一体的构成主义宣言。',
    },
    {
      id: 'lissitzky-proun',
      title: 'PROUN G.B.A.',
      titleOriginal: 'Proun G.B.A.',
      artist: 'El Lissitzky',
      year: '约 1923',
      image: '/artworks/lissitzky-proun.webp',
      medium: '布面油画',
      museum: '海牙艺术博物馆',
      reference: {
        provider: 'Kunstmuseum Den Haag（经 Wikimedia Commons）',
        url: 'https://commons.wikimedia.org/wiki/File:El_lissitzky,_proun_G.B.A.,_1923_ca.jpg',
        objectId: '0333517',
        verifiedOn: '2026-08-27',
        note: '原条目的《Proun 5A》实际是 1920 年石版画；已改为与图片一致的馆藏油画《Proun G.B.A.》。',
      },
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
      museum: '历史海报，多馆藏版本（当前未指定具体馆藏件）',
      reference: {
        provider: 'MoMA：Aleksandr Rodchenko',
        url: 'https://www.moma.org/artists/4975-aleksandr-rodchenko',
        verifiedOn: '2026-08-27',
        note: '当前条目尚未指定一张具体馆藏海报；补图前需先锁定版本与馆藏编号。',
      },
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
      image: '/artworks/mondrian-composition-ii.webp',
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
      image: '/artworks/doesburg-counter-composition.webp',
      medium: '布面油画',
      museum: '阿姆斯特丹市立博物馆',
      reference: {
        provider: 'Stedelijk Museum Amsterdam',
        url: 'https://www.stedelijk.nl/en/collection/531-theo-van-doesburg-contra-compositie-v',
        objectId: 'A 567',
        verifiedOn: '2026-08-27',
      },
      description:
        '同样是三原色与黑白灰，但所有方块旋转了 45 度——对角线带来张力与动感。',
      significance:
        '凡·杜斯堡用对角线"背叛"了蒙德里安的水平垂直教义，风格派因此分裂。',
    },
    {
      id: 'victory-boogie-woogie',
      title: '胜利爵士乐',
      titleOriginal: 'Victory Boogie Woogie',
      artist: 'Piet Mondrian',
      year: '1942—44',
      image: '/artworks/victory-boogie-woogie.webp',
      medium: '布面油画（未完成）',
      museum: '海牙市立博物馆',
      reference: {
        provider: 'Kunstmuseum Den Haag',
        url: 'https://www.kunstmuseum.nl/en/collection/victory-boogie-woogie',
        objectId: '0810747',
        verifiedOn: '2026-08-28',
        note: '馆藏页确认 1942—44 年未完成作品、材料、尺寸及馆藏身份；不得与《Broadway Boogie Woogie》混用。',
      },
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
      image: '/artworks/duchamp-fountain.webp',
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
      image: '/artworks/duchamp-lhooq.webp',
      medium: '明信片改绘',
      museum: '私人收藏',
      reference: {
        provider: 'MoMA',
        url: 'https://www.moma.org/audio/playlist/352/4918',
        verifiedOn: '2026-08-27',
        note: '1919 年版本为私人收藏；作品另有多个后续版本，不能混用。',
      },
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
      image: '/artworks/magritte-treachery.webp',
      medium: '布面油画',
      museum: '洛杉矶郡立艺术博物馆',
      reference: {
        provider: 'LACMA',
        url: 'https://collections.lacma.org/object/31931',
        objectId: '78.7',
        verifiedOn: '2026-08-28',
        note: '馆藏页确认完整题名、1929 年、媒介与馆藏编号；页面图标注 C. Herscovici / ARS。',
      },
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
      museum: '私人收藏',
      reference: {
        provider: '比利时皇家美术馆 Magritte Museum',
        url: 'https://fine-arts-museum.be/uploads/news/files/magritte_tribute_year_2017_pf_def_1.pdf',
        verifiedOn: '2026-08-27',
        note: '馆方资料确认作品题名与年份；现状按私人收藏记录。',
      },
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
      medium: '荧光灯与金属灯具',
      museum: 'MoMA，纽约',
      reference: {
        provider: 'MoMA',
        url: 'https://www.moma.org/collection/works/81337',
        objectId: '304.1992.a-h',
        verifiedOn: '2026-08-27',
      },
      description:
        '八根白色荧光灯管在墙面上逐级升高，像一座被压缩为工业光线的构成主义纪念碑。',
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
      reference: {
        provider: 'Tate',
        url: 'https://www.tate.org.uk/art/artworks/andre-equivalent-viii-t01534',
        objectId: 'T01534',
        verifiedOn: '2026-08-28',
      },
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
      reference: {
        provider: 'MoMA',
        url: 'https://www.moma.org/collection/works/81435',
        objectId: '393.1970.a-c',
        verifiedOn: '2026-08-28',
        note: '馆藏页确认三个组成部分与具体馆藏版本；页面明确标注 Joseph Kosuth / ARS。',
      },
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
      museum: '行为作品（1964 年京都首演；无单一馆藏）',
      reference: {
        provider: 'MoMA',
        url: 'https://www.moma.org/calendar/exhibitions/1494',
        verifiedOn: '2026-08-27',
        note: '作品曾多次演出；影像与照片必须分别注明具体演出、摄影者和馆藏。',
      },
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
      image: '/artworks/kandinsky-composition-8.webp',
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
      image: '/artworks/klee-senecio.webp',
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
      image: '/artworks/bauhaus-dessau.webp',
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
      image: '/artworks/moholy-nagy-a19.webp',
      medium: '布面油画与石墨',
      museum: '洛杉矶郡立艺术博物馆',
      reference: {
        provider: 'LACMA（经 Wikimedia Commons）',
        url: "https://commons.wikimedia.org/wiki/File:'A_19,_1927'_by_Laszlo_Moholy-Nagy.jpg",
        verifiedOn: '2026-08-27',
      },
      description:
        '光、网格与透明平面的交叠，如同机器时代的静物。',
      significance: '莫霍利-纳吉把摄影与光变成设计材料——新媒体艺术的先声。',
    },
  ],

  primitivism: [
    {
      id: 'picasso-mask-study',
      title: '条目待替换：非洲面具研究',
      titleOriginal: 'Curatorial placeholder',
      artist: 'Pablo Picasso（暂定）',
      year: '约 1907（待核验）',
      medium: '未确定',
      museum: '不适用：当前条目不是可定位的具体作品',
      reference: {
        provider: '项目内容审计',
        url: 'https://www.moma.org/collection/works/79766',
        verifiedOn: '2026-08-27',
        note: '未找到与当前题名匹配的权威作品记录；该链接仅作为《亚威农少女》的比较依据，条目仍须替换。',
      },
      description: '当前没有找到与原题名对应的权威作品记录，不能继续当作一件具体作品展示。',
      significance: '保留该卡片仅用于暴露策展缺口；应在确定“原始主义”的命名与范围后整体替换。',
    },
  ],

  'abstract-expressionism': [
    {
      id: 'pollock-autumn-rhythm',
      title: '秋之韵（第 30 号）',
      titleOriginal: 'Autumn Rhythm (Number 30)',
      artist: 'Jackson Pollock',
      year: '1950',
      medium: '布面滴画',
      museum: '大都会艺术博物馆，纽约',
      reference: {
        provider: 'The Metropolitan Museum of Art',
        url: 'https://www.metmuseum.org/art/collection/search/488978',
        objectId: '57.92',
        verifiedOn: '2026-08-28',
        note: '馆藏页明确写明图片不能放大或下载，并标注 Pollock-Krasner Foundation / ARS。',
      },
      description: '把画布铺在地面，绕着它行走、滴洒、投掷颜料，画面是身体行动的痕迹。',
      significance: '"行动绘画"的巅峰——绘画成为一场被记录下来的事件。',
    },
    {
      id: 'rothko-no61',
      title: '第 61 号（锈与蓝）',
      titleOriginal: 'No. 61 (Rust and Blue)',
      artist: 'Mark Rothko',
      year: '1953',
      medium: '布面油画',
      museum: '洛杉矶当代艺术博物馆（MOCA）',
      reference: {
        provider: 'MOCA Los Angeles',
        url: 'https://www.moca.org/artworks/no-61-rust-and-blue-brown-blue-brown-on-blue',
        objectId: '84.9',
        verifiedOn: '2026-08-27',
      },
      description: '巨大而漂浮的色块边缘朦胧，仿佛在眼前呼吸。',
      significance: '色域绘画试图用最少的形，唤起近乎宗教体验的情绪。',
    },
  ],

  'pop-art': [
    {
      id: 'warhol-campbells',
      title: '金宝汤罐头',
      titleOriginal: "Campbell's Soup Cans",
      artist: 'Andy Warhol',
      year: '1962',
      medium: '布面丙烯与金属珐琅漆，32 联画',
      museum: '现代艺术博物馆 MoMA，纽约',
      reference: {
        provider: 'MoMA',
        url: 'https://www.moma.org/collection/works/79809',
        objectId: '476.1996.1-32',
        verifiedOn: '2026-08-28',
        note: '馆藏页确认作品为 32 块画布组成的整体；该件不是丝网印刷版，页面同时标注权利方。',
      },
      description: '32 个几乎一模一样的汤罐头，像货架一样排列。',
      significance: '把超市商品直接搬上画布，抹平商业与艺术的界线。',
    },
    {
      id: 'lichtenstein-whaam',
      title: '轰！',
      titleOriginal: 'Whaam!',
      artist: 'Roy Lichtenstein',
      year: '1963',
      medium: '布面丙烯',
      museum: '泰特现代美术馆，伦敦',
      reference: {
        provider: 'Tate / Roy Lichtenstein Catalogue Raisonné',
        url: 'https://www.tate.org.uk/art/artworks/lichtenstein-whaam-t00897',
        objectId: 'T00897 / RLCR 808',
        verifiedOn: '2026-08-28',
        note: 'Catalogue Raisonné 交叉确认两联画、1963 年、材料与 Tate 馆藏编号。',
      },
      description: '放大的漫画空战场景，本戴网点、对话框与拟声词一应俱全。',
      significance: '把廉价的商业印刷美学抬进美术馆，质问“高雅”由谁定义。',
    },
  ],

  postmodernism: [
    {
      id: 'sherman-untitled96',
      title: '无题 #96',
      titleOriginal: 'Untitled #96',
      artist: 'Cindy Sherman',
      year: '1981',
      medium: '彩色摄影',
      museum: 'MoMA，纽约',
      reference: {
        provider: 'MoMA',
        url: 'https://www.moma.org/collection/works/46055',
        objectId: '90.1982.x1-x3',
        verifiedOn: '2026-08-27',
      },
      description: '艺术家扮成杂志插页中的少女，眼神迷离地趴在地板上。',
      significance: '“横幅／中间插页”系列借用杂志构图，揭露大众媒体如何建构女性形象与观看权力。',
    },
    {
      id: 'venturi-vanna',
      title: '文娜·文丘里住宅',
      titleOriginal: 'Vanna Venturi House',
      artist: 'Robert Venturi',
      year: '1959—64',
      image: '/artworks/venturi-vanna.webp',
      medium: '建筑',
      museum: '费城 Chestnut Hill（私人住宅）',
      reference: {
        provider: '美国国会图书馆',
        url: 'https://www.loc.gov/item/pa4102/',
        objectId: 'HABS PA-6775',
        verifiedOn: '2026-08-27',
      },
      description: '立面是断裂的山墙、歪斜的烟囱与装饰性的拱——向现代主义的方盒子宣战。',
      significance: '后现代建筑的宣言，“少即是乏味”回应密斯的“少即是多”。',
    },
  ],

  contemporary: [
    {
      id: 'hirst-shark',
      title: '生者心目中不可能存在的死亡',
      titleOriginal: 'The Physical Impossibility of Death in the Mind of Someone Living',
      artist: 'Damien Hirst',
      year: '1991',
      medium: '虎鲨、甲醛溶液、玻璃与涂漆钢材',
      museum: '私人收藏',
      reference: {
        provider: '韩国国立现代美术馆（MMCA）',
        url: 'https://mmca.go.kr/eng/exhibitions/exhibitionsDetail.do?exhFlag=2&exhId=202601220002053',
        verifiedOn: '2026-08-27',
        note: '馆方 2026 年展览资料将作品标为私人收藏；图片版权仍受限。',
      },
      description: '一条真实的虎鲨悬浮在甲醛玻璃柜中，既壮观又令人不安。',
      significance: 'YBA（英国青年艺术家）的标志，把死亡与奇观变成天价商品。',
    },
    {
      id: 'ai-sunflower',
      title: '葵花籽',
      titleOriginal: 'Sunflower Seeds',
      artist: 'Ai Weiwei',
      year: '2010',
      medium: '一亿颗手工陶瓷瓜子',
      museum: '泰特现代美术馆涡轮大厅',
      reference: {
        provider: 'Tate',
        url: 'https://www.tate.org.uk/whats-on/tate-modern/unilever-series/unilever-series-ai-weiwei-sunflower-seeds',
        verifiedOn: '2026-08-28',
        note: '该链接对应 2010 年涡轮大厅委任项目；作品与具体安装摄影的权利须分别处理。',
      },
      description: '一亿颗由景德镇工匠手工绘制的陶瓷瓜子铺满整个大厅。',
      significance: '海量个体与“中国制造”、集体劳动与政治隐喻交织。',
    },
  ],
}

export const artworks: Record<string, Artwork[]> = Object.fromEntries(
  Object.entries(artworkData).map(([movementId, movementArtworks]) => [
    movementId,
    movementArtworks.map((artwork) => {
      const imageMeta = artworkImageMeta[artwork.id]
      if (!imageMeta) throw new Error(`作品 ${movementId}/${artwork.id} 缺少图片状态记录`)
      return { ...artwork, imageMeta }
    }),
  ]),
)

export function artworksOf(movementId: string): Artwork[] {
  return artworks[movementId] ?? []
}
