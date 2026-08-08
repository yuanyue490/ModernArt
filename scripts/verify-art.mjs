#!/usr/bin/env node
/* 字节级身份核验：本地图 vs 策展的 Commons 候选标题（width=1400 缩略图） */
import { statSync } from 'node:fs'

const UA = 'ModernArt150/0.2 (educational art-history site; localhost dev)'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '../public/artworks')

const FILES = {
  'impression-sunrise.jpg': ['Monet - Impression, Sunrise.jpg', 'Claude Monet, Impression, soleil levant.jpg'],
  'moulin-galette.jpg': ['Pierre-Auguste Renoir - Dance at Le Moulin de la Galette - Google Art Project.jpg', 'Auguste Renoir - Dance at Le Moulin de la Galette - Google Art Project.jpg', 'Pierre-Auguste Renoir, Le Moulin de la Galette.jpg'],
  'degas-dance-class.jpg': ['The Dance Class (Degas, Metropolitan Museum of Art).jpg', 'Edgar Degas - The Dance Class - Google Art Project.jpg', 'Edgar Germain Hilaire Degas 019.jpg'],
  'starry-night.jpg': ['Van Gogh - Starry Night - Google Art Project.jpg'],
  'gauguin-where.jpg': ['Paul Gauguin - Where Do We Come From? What Are We? Where Are We Going? - Google Art Project.jpg', "Paul Gauguin - D'ou venons-nous.jpg", 'Where Do We Come From? What Are We? Where Are We Going? (Paul Gauguin).jpg'],
  'grande-jatte.jpg': ['Georges Seurat - A Sunday on La Grande Jatte -- 1884 - Google Art Project.jpg', 'Georges Seurat - A Sunday Afternoon on the Island of La Grande Jatte - Google Art Project.jpg'],
  'mont-sainte-victoire.jpg': ['Paul Cézanne - Mont Sainte-Victoire - Google Art Project.jpg', 'Paul Cézanne, 1902-04, Mont Sainte-Victoire, oil on canvas, 73 x 91.9 cm, Philadelphia Museum of Art.jpg', 'Cézanne - Montagne Sainte-Victoire (1904-06).jpg', 'Paul Cézanne 108.jpg'],
  'basket-of-apples.jpg': ['Paul Cézanne, The Basket of Apples.jpg', 'Paul Cézanne - The Basket of Apples - 1926.252 - Art Institute of Chicago.jpg'],
  'card-players.jpg': ['Paul Cézanne - The Card Players - Google Art Project.jpg', 'Les Joueurs de cartes, par Paul Cézanne.jpg', 'Paul Cezanne - The Card Players.jpg'],
  'gris-portrait-picasso.jpg': ['Juan Gris - Portrait of Pablo Picasso - Google Art Project.jpg', 'Juan Gris - Portrait of Picasso - Google Art Project.jpg'],
  'gris-still-life.jpg': ['Still Life with Checked Tablecloth Juan Gris 1915.jpeg', "Juan Gris - La bouteille d'anis - Google Art Project.jpg"],
  'red-wedge.jpg': ['Beat the Whites with the Red Wedge.jpg', 'Klinom Krasnym Bej Belych.JPG'],
  'tatlin-tower.jpg': ["Tatlin's Tower maket 1919 year.jpg", 'Tatlin 2.jpg'],
  'lissitzky-proun.jpg': ['El Lissitzky - Proun 5A.jpg', 'Lissitzky Proun 93.jpg', 'El lissitzky, proun G.B.A., 1923 ca.jpg'],
  'kandinsky-composition-8.jpg': ['Vassily Kandinsky, 1923 - Composition 8, huile sur toile, 140 cm x 201 cm, Musée Guggenheim, New York.jpg', 'Kandinsky - Composition 8, 1923.jpg', 'Wassily Kandinsky Composition VIII.jpg'],
  'klee-senecio.jpg': ['Paul Klee, 1922, Senecio, oil on gauze, 40.3 × 37.4 cm, Kunstmuseum Basel.jpg', 'Senecio (Baldgreis), Klee 1080998.jpg'],
  'bauhaus-dessau.jpg': ['Dessau Bauhaus-Gebäude asv2024-06 img1.jpg', 'Außenansichten des Bauhaus-Gebäudes in Dessau 07.jpg', 'Bauhaus Dessau-001.jpg'],
}

for (const [file, titles] of Object.entries(FILES)) {
  let size
  try { size = statSync(`${DIR}/${file}`).size } catch { console.log(`❓ ${file}  本地不存在`); continue }
  let hit = null
  for (const t of titles) {
    const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(t)}?width=1400`
    try {
      const ctrl = new AbortController()
      const to = setTimeout(() => ctrl.abort(), 15000)
      const res = await fetch(url, { method: 'HEAD', headers: { 'User-Agent': UA }, signal: ctrl.signal })
      clearTimeout(to)
      const len = Number(res.headers.get('content-length') ?? 0)
      if (res.ok && len === size) { hit = t; break }
    } catch { /* try next */ }
  }
  console.log(`${hit ? '✅' : '❌'} ${file}  ${size}b${hit ? `  <= ${hit}` : '  （无候选字节匹配，需人工复核）'}`)
}
console.log('done.')
