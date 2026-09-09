import type { ArtworkImageMeta } from './types'

const commonsSearch = (query: string) =>
  `https://commons.wikimedia.org/w/index.php?search=${encodeURIComponent(query)}&title=Special:MediaSearch&type=image`

const legacy = (query: string, sha256: string): ArtworkImageMeta => ({
  status: 'needs-review',
  note: '历史抓图流程未保存最终命中的文件页；当前图片可展示，但仍需逐件核对身份与许可。',
  provider: 'Wikimedia Commons（历史记录）',
  sourceUrl: commonsSearch(query),
  license: '待复核',
  sha256,
})

const verified = (
  providerId: string,
  sourceUrl: string,
  sha256: string,
  options: Partial<Pick<ArtworkImageMeta, 'provider' | 'license' | 'credit' | 'verifiedOn' | 'note'>> = {},
): ArtworkImageMeta => ({
  status: 'verified',
  note: options.note ?? '已对照作品题名、艺术家、年份、构图与文件页许可。',
  provider: options.provider ?? 'Wikimedia Commons',
  providerId,
  sourceUrl,
  license: options.license ?? 'Public Domain Mark 1.0',
  credit: options.credit,
  verifiedOn: options.verifiedOn ?? '2026-08-26',
  sha256,
})

const pending = (note: string): ArtworkImageMeta => ({ status: 'pending', note })
const restricted = (note: string): ArtworkImageMeta => ({
  status: 'copyright-restricted',
  note,
})
const questionable = (note: string): ArtworkImageMeta => ({ status: 'questionable', note })

/**
 * 作品图片的唯一溯源清单。
 * `needs-review` 只表示找回了历史搜索路径，不等于确认了最终来源文件。
 */
export const artworkImageMeta: Record<string, ArtworkImageMeta> = {
  'courbet-stonebreakers': verified(
    'File:Gustave Courbet - The Stonebreakers - WGA05457.jpg',
    'https://commons.wikimedia.org/wiki/File:Gustave_Courbet_-_The_Stonebreakers_-_WGA05457.jpg',
    '31f05184619960eb2857796f46a76c4aef077ab41e6cd9c4e6d7c6b7766b3574',
  ),
  'millet-gleaners': legacy(
    'Jean-François Millet Gleaners Google Art Project',
    'f0714ef0ac9b20c8537ac535eaebd88627d4b6510d2486f5fc85450d8faee559',
  ),
  'courbet-burial': legacy(
    'Gustave Courbet A Burial at Ornans Google Art Project',
    '51618250ab968dff8b01bdc052f42617fb72ff1a33738a82bfc8dde75519912c',
  ),
  'impression-sunrise': legacy(
    'Claude Monet Impression soleil levant',
    '8f30c80181a0e1380baa05dfc5cb9dd274d5355ef1424d4bc1f5c206425c8741',
  ),
  'moulin-galette': legacy(
    'Renoir Dance at Le Moulin de la Galette Google Art Project',
    '1c40266be9bffdb38ed1f0d65f4ba3cbc922af8d21c7e49d9c3461e2c1241a3c',
  ),
  'dance-class': legacy(
    'Edgar Degas The Dance Class Metropolitan Museum of Art',
    '6606f810325bd55e5fb1e76b2eba4acf7fdfd6c60f85e2f30bea58ac45d3a056',
  ),
  'starry-night': legacy(
    'Van Gogh Starry Night Google Art Project',
    '2802be13f40357608e4f4cf97b18ca3a9ed2902b407cd3a0b68e54d9a7b818bd',
  ),
  'gauguin-where': legacy(
    'Paul Gauguin Where Do We Come From What Are We Where Are We Going',
    '937162200c19d6ffa3501d45d8a0a460e28a8b82d5fb3d070885e300394e562f',
  ),
  'grande-jatte': legacy(
    'Georges Seurat A Sunday on La Grande Jatte Google Art Project',
    '250256ae49fd3919bbfbec7d43e823275a4997399162016568d4ff7f7b08a3f4',
  ),
  'mont-sainte-victoire': legacy(
    'Paul Cézanne Mont Sainte-Victoire Philadelphia Museum of Art',
    '98a5db6e6c3507a8cb2396d8cf0993b1a5e099fac1b07a2a5e24b8b8ff0597af',
  ),
  'basket-of-apples': legacy(
    'Paul Cézanne The Basket of Apples Art Institute of Chicago',
    '3f5648c7cb65c7069e6d648f2dc42fc6588a496f493528900f3800f262f3221b',
  ),
  'card-players': legacy(
    'Paul Cézanne The Card Players',
    'ab445c28b50573512c4eadb8ecd336ba8c5bc16ffad4e3e7da1d53c150939658',
  ),
  'woman-with-hat': verified(
    'File:Matisse-Woman-with-a-Hat.jpg',
    'https://commons.wikimedia.org/wiki/File:Matisse-Woman-with-a-Hat.jpg',
    '5b9644d84c6ba2916f773cd8f7db328d47b15d455946ff67066896954842a852',
  ),
  'matisse-dance': verified(
    'File:Henri Matisse, 1909, La danse (I), Museum of Modern Art.jpg',
    'https://commons.wikimedia.org/wiki/File:Henri_Matisse,_1909,_La_danse_(I),_Museum_of_Modern_Art.jpg',
    '45e7128da001415c1073c215a899f3bad1c75023646838759169f2064898e2c9',
  ),
  'derain-charing-cross': legacy(
    'André Derain Charing Cross Bridge London 1906',
    '15d730d8c54d253e0d1416f8ef876101b09920a32c97564f6ee4fc4eaf09b24b',
  ),
  demoiselles: verified(
    'MoMA 333.1939 media image',
    'https://www.moma.org/collection/works/79766',
    '63e10a2fe78a893dc03853ec8dc53c051895ce583b81f83f7c6a5b77f1600997',
    {
      provider: 'MoMA',
      license: 'PD-China（底层作品）',
      credit: 'Pablo Picasso / MoMA',
      verifiedOn: '2026-08-28',
      note: '已对照 MoMA 333.1939 的完整构图；按中国大陆主要发布法域记录，MoMA 页面在美国仍标 Picasso Estate / ARS。',
    },
  ),
  'gris-portrait-picasso': legacy(
    'Juan Gris Portrait of Pablo Picasso Google Art Project',
    'd974aca7090f6411f0d59092a9fd9591e306cfc19a8a403b979b81ec2ef40720',
  ),
  'gris-still-life': legacy(
    'Juan Gris Still Life with Checked Tablecloth 1915',
    '5cf726c26a2dda82d93b62c50f752e72bf1a5d50269737a61f11f785cf56de93',
  ),
  'city-rises': legacy(
    'Umberto Boccioni The City Rises 1910 Museum of Modern Art',
    '552b50d6404e091de7f36a0ded127c153e4113e8dd5142daa772806253310811',
  ),
  'dog-leash': verified(
    'Buffalo AKG 1964:16 educational download',
    'https://buffaloakg.org/artworks/196416-dinamismo-di-un-cane-al-guinzaglio-dynamism-dog-leash',
    'c58a757fdf90088bae9a3c00eba2272560edadc364e2bb5a345350a952af2495',
    {
      provider: 'Buffalo AKG Art Museum',
      license: '馆方教育用途下载 + PD-China（底层作品）',
      credit: 'Buffalo AKG Art Museum',
      verifiedOn: '2026-08-28',
      note: '直接使用馆方 1964:16 教育用途下载，并核对完整构图、题名、年份与尺寸。',
    },
  ),
  'unique-forms': verified(
    "File:'Unique Forms of Continuity in Space', 1913 bronze by Umberto Boccioni.jpg",
    "https://commons.wikimedia.org/wiki/File:'Unique_Forms_of_Continuity_in_Space',_1913_bronze_by_Umberto_Boccioni.jpg",
    '648036e27752a068ab62dc3dc03bd599857a8899fb6e90368f63ba41d80f37b5',
    {
      credit: 'Wmpearl',
      verifiedOn: '2026-08-27',
      note: '已对照 MoMA 馆藏铸件 231.1948；原本地图为另一件雕塑，现已替换。',
    },
  ),
  'kandinsky-composition-7': legacy(
    'Wassily Kandinsky Composition VII Google Art Project',
    'a9d5f036be917e26f63ff369ef0ae0bda1a57f5d720bf8a2855d129a8cd2671f',
  ),
  'marc-blue-horses': legacy(
    'Franz Marc The Large Blue Horses Google Art Project',
    '35ad4530b129111bfbe1e7a439f788788036905d04708427d7ddbf7820669d46',
  ),
  'black-square': legacy(
    'Kazimir Malevich Black Square 1915 Tretyakov Gallery',
    '8231da69fff812ac9dea4df54e289c093a78b671ceb5562667cf7980bf02e142',
  ),
  'white-on-white': legacy(
    'Kazimir Malevich White on White 1918 Museum of Modern Art',
    '0a1db8d6ad1e50a01e755e88ec4f69df9b28a12c542be39f9d073463794acc4b',
  ),
  'suprematist-composition': verified(
    'File:Suprematist Composition - Kazimir Malevich.jpg',
    'https://commons.wikimedia.org/wiki/File:Suprematist_Composition_-_Kazimir_Malevich.jpg',
    '53fb5b4de59fbeffb51e4272f394eb45505816acd98060ec0c16dfa7da384727',
  ),
  'red-wedge': verified(
    'File:Klinom Krasnym Bej Belych.JPG',
    'https://commons.wikimedia.org/wiki/File:Klinom_Krasnym_Bej_Belych.JPG',
    'b42e331c5f20202f81db3311a069f230e9f811e34148eaa4c8a503e03cfbfe93',
    {
      credit: 'Russian State Library',
      verifiedOn: '2026-08-27',
      note: '已换为俄罗斯国家图书馆馆藏扫描，并核对 1919—1920、石版画与完整构图。',
    },
  ),
  'tatlin-tower': legacy(
    "Tatlin's Tower model 1919",
    'b847743f2887ceb8f713bc7de0f97cbcf53f2e6bfc898ecc95f8de1bcd8acd0f',
  ),
  'lissitzky-proun': verified(
    'File:El lissitzky, proun G.B.A., 1923 ca.jpg',
    'https://commons.wikimedia.org/wiki/File:El_lissitzky,_proun_G.B.A.,_1923_ca.jpg',
    'e17614ebb0f2d0fa0ad4894946620f9b439b40e7a4bb0ede3f6871d7904f2fa2',
    {
      license: 'CC BY 3.0',
      credit: 'Sailko',
      verifiedOn: '2026-08-27',
      note: '原数据把《Proun 5A》石版画误写为油画；现已换成与馆藏记录一致的《Proun G.B.A.》。',
    },
  ),
  'rodchenko-books': pending('不同地区版权期限与具体复用文件尚未确认。'),
  'mondrian-composition-ii': legacy(
    'Piet Mondrian Composition II in Red Blue and Yellow 1930',
    'f63a6c784de6a85fdf611691366e058a36eee54cd90e8d81ab3c566a184dba8d',
  ),
  'doesburg-counter-composition': verified(
    'File:Amsterdam - Stedelijk Museum - Theo van Doesburg (1883-1931) - Counter-Composition V (A 567) 1924.jpg',
    'https://commons.wikimedia.org/wiki/File:Amsterdam_-_Stedelijk_Museum_-_Theo_van_Doesburg_(1883-1931)_-_Counter-Composition_V_(A_567)_1924.jpg',
    '125cf9fea4aa1d9e01c4012ba57fe2d7b349971c3b89443747f77a048fdf3637',
    {
      license: 'CC BY-SA 4.0',
      credit: 'Txllxt TxllxT',
      verifiedOn: '2026-08-27',
      note: '已对照 Stedelijk Museum 馆藏编号 A 567 与现场摄影文件页。',
    },
  ),
  'victory-boogie-woogie': verified(
    'File:Piet mondrian, victory boogie woogie, 1942-44, 03.jpg',
    'https://commons.wikimedia.org/wiki/File:Piet_mondrian,_victory_boogie_woogie,_1942-44,_03.jpg',
    'a3c441e47dc899047c29a1995e37928b0d760a6d839b0efc121d89502e14e87f',
    {
      license: 'CC BY 3.0（摄影）+ PD-China（底层作品）',
      credit: 'Sailko',
      verifiedOn: '2026-08-28',
      note: '已对照 Kunstmuseum 0810747；本地图与 Sailko 的 03 号摄影构图、细节和宽高比一致，320px 缩略图 SSIM 为 0.953。按中国大陆主要发布法域记录，不与《Broadway Boogie Woogie》混用。',
    },
  ),
  'duchamp-fountain': legacy(
    'Marcel Duchamp Fountain photograph Alfred Stieglitz 1917',
    '3a8bb56f734d2b95df7c674dc4cfb55014c44ce1182e48255902cfee22673b83',
  ),
  'duchamp-lhooq': verified(
    'MoMA audio 607 presentation image',
    'https://www.moma.org/audio/playlist/352/4918',
    '7a6b1b78296d34aff4da50c8132fdaee7407a4939792d7c45a4212aba3eba1aa',
    {
      provider: 'MoMA',
      license: 'PD-China（底层作品）',
      credit: 'Marcel Duchamp / Private Collection / MoMA',
      verifiedOn: '2026-08-28',
      note: '锁定 MoMA 讲解所示 1919 年私人收藏版本；按中国大陆主要发布法域记录，不与后续版本混用。',
    },
  ),
  'magritte-treachery': verified(
    'File:Magritte treachery.jpg',
    'https://commons.wikimedia.org/wiki/File:Magritte_treachery.jpg',
    'b6538796a52bd687a117f106a5c78f68f3df0d828b911f8cf71d3512727db54e',
    {
      license: 'CC BY-SA 4.0（摄影）+ PD-China（底层作品）',
      credit: 'Caterpillar84',
      verifiedOn: '2026-08-28',
      note: '已对照 LACMA 78.7；使用 Commons 馆内摄影的 960px 预览，等比放大并转为 1280px WebP。文件在美国/法国的底层作品状态有删除讨论，本站按中国大陆主要发布法域记录。',
    },
  ),
  'magritte-son-of-man': restricted('版权与馆方图像使用条件未明确，继续使用说明型占位。'),
  'flavin-monument': restricted('需确认具体版本及安装摄影版权，继续使用说明型占位。'),
  'andre-equivalent': restricted('作品与安装照片仍在版权期内，继续使用说明型占位。'),
  'kosuth-chairs': restricted('作品与安装照片仍在版权期内，继续使用说明型占位。'),
  'ono-cut-piece': restricted('需确定具体演出版本、摄影者与影像授权。'),
  'composition-8': legacy(
    'Wassily Kandinsky Composition VIII Guggenheim 1923',
    '3c8774c8ed23327b652b44d187b8e28f2163204a66c820c03e742e8094dfcf5a',
  ),
  'klee-senecio': legacy(
    'Paul Klee Senecio 1922 Kunstmuseum Basel',
    'c964741e79cb269f0926fb7db5e7757a68597ed91f67137454f4e27e450724fd',
  ),
  'bauhaus-dessau': legacy(
    'Bauhaus Dessau building exterior',
    '752c7c0114a8246f470e0e9944790ed35fbb7e02116f20f27bffa2c9c91d1a26',
  ),
  'moholy-nagy-a19': verified(
    "File:'A 19, 1927' by Laszlo Moholy-Nagy.jpg",
    "https://commons.wikimedia.org/wiki/File:'A_19,_1927'_by_Laszlo_Moholy-Nagy.jpg",
    'f45a2b756a961d96610acd23b77bf159538145a115f17de211be24386ec3c72c',
    {
      credit: 'Los Angeles County Museum of Art',
      verifiedOn: '2026-08-27',
      note: '已对照作品题名、1927 年、布面油画与石墨、尺寸及 LACMA 来源。',
    },
  ),
  'picasso-mask-study': questionable('当前不是明确、可核验的作品条目；先完成策展口径审查。'),
  'pollock-autumn-rhythm': restricted('作品仍在版权期内，继续使用说明型占位。'),
  'rothko-no61': restricted('作品仍在版权期内，继续使用说明型占位。'),
  'warhol-campbells': restricted('作品仍在版权期内，继续使用说明型占位。'),
  'lichtenstein-whaam': restricted('作品仍在版权期内，继续使用说明型占位。'),
  'sherman-untitled96': restricted('作品与摄影图像仍在版权期内，继续使用说明型占位。'),
  'venturi-vanna': verified(
    'File:VVenturi House fall 11.jpg',
    'https://commons.wikimedia.org/wiki/File:VVenturi_House_fall_11.jpg',
    'e2e3bceaf840e6c9d12d13c5d91a0499c731266285d75a999c5fc3b22de0163c',
    {
      license: 'CC0 1.0',
      credit: 'Smallbones',
      verifiedOn: '2026-08-27',
      note: '已核对正立面与美国国会图书馆建筑记录；摄影者以 CC0 释出。',
    },
  ),
  'hirst-shark': restricted('作品与安装照片仍在版权期内，继续使用说明型占位。'),
  'ai-sunflower': restricted('装置与安装摄影需分别核权，继续使用说明型占位。'),
}
