#!/usr/bin/env bash
# 从 Wikimedia Commons 下载公有领域作品图到 public/artworks/
# 每个条目依次尝试多个候选文件名，成功后用 `file` 校验是否为真实图片。
set -u
cd "$(dirname "$0")/.."
OUT=public/artworks
UA="ModernArt150Edu/0.1 (local dev; educational prototype)"

fetch() {
  local out="$1"; shift
  local name
  # 已存在且有效则跳过
  if [ -f "$OUT/$out" ]; then
    local m0 s0
    m0=$(file -b --mime-type "$OUT/$out" 2>/dev/null || echo none)
    s0=$(stat -f%z "$OUT/$out" 2>/dev/null || echo 0)
    if [[ "$m0" == image/* && "$s0" -gt 15000 ]]; then
      echo "SKIP $out (exists, $((s0/1024))KB)"
      return 0
    fi
  fi
  for name in "$@"; do
    local enc
    enc=$(node -e "console.log(encodeURIComponent(process.argv[1]))" "$name")
    local url="https://commons.wikimedia.org/wiki/Special:FilePath/${enc}?width=1400"
    curl -sL -A "$UA" --max-time 15 "$url" -o "$OUT/$out"
    local mime size
    mime=$(file -b --mime-type "$OUT/$out" 2>/dev/null || echo none)
    size=$(stat -f%z "$OUT/$out" 2>/dev/null || echo 0)
    if [[ "$mime" == image/* && "$size" -gt 15000 ]]; then
      echo "OK   $out  <= $name  ($mime, $((size/1024))KB)"
      return 0
    fi
  done
  rm -f "$OUT/$out"
  echo "MISS $out"
  return 1
}

fetch impression-sunrise.jpg \
  "Monet - Impression, Sunrise.jpg" \
  "Claude Monet, Impression, soleil levant.jpg"

fetch moulin-galette.jpg \
  "Pierre-Auguste Renoir - Dance at Le Moulin de la Galette - Google Art Project.jpg" \
  "Auguste Renoir - Dance at Le Moulin de la Galette - Google Art Project.jpg" \
  "Pierre-Auguste Renoir, Le Moulin de la Galette.jpg"

fetch degas-dance-class.jpg \
  "Edgar Degas The Dance Class.jpg" \
  "WLA metmuseum Edgar Degas The Dance Class.jpg"

fetch starry-night.jpg \
  "Van Gogh - Starry Night - Google Art Project.jpg"

fetch gauguin-where.jpg \
  "Paul Gauguin - Where Do We Come From? What Are We? Where Are We Going? - Google Art Project.jpg" \
  "Paul Gauguin - D'ou venons-nous.jpg" \
  "Where Do We Come From? What Are We? Where Are We Going? (Paul Gauguin).jpg"

fetch grande-jatte.jpg \
  "Georges Seurat - A Sunday on La Grande Jatte -- 1884 - Google Art Project.jpg" \
  "Georges Seurat - A Sunday Afternoon on the Island of La Grande Jatte - Google Art Project.jpg"

fetch mont-sainte-victoire.jpg \
  "Paul Cézanne - Mont Sainte-Victoire - Google Art Project.jpg" \
  "Paul Cézanne, 1902-04, Mont Sainte-Victoire, oil on canvas, 73 x 91.9 cm, Philadelphia Museum of Art.jpg" \
  "Cézanne - Montagne Sainte-Victoire (1904-06).jpg" \
  "Paul Cézanne 108.jpg"

fetch basket-of-apples.jpg \
  "Paul Cézanne, The Basket of Apples.jpg" \
  "Paul Cézanne - The Basket of Apples - 1926.252 - Art Institute of Chicago.jpg"

fetch card-players.jpg \
  "Paul Cézanne - The Card Players - Google Art Project.jpg" \
  "Les Joueurs de cartes, par Paul Cézanne.jpg" \
  "Paul Cezanne - The Card Players.jpg"

fetch gris-portrait-picasso.jpg \
  "Juan Gris - Portrait of Pablo Picasso - Google Art Project.jpg" \
  "Juan Gris - Portrait of Picasso - Google Art Project.jpg"

fetch gris-still-life.jpg \
  "Still Life with Checked Tablecloth Juan Gris 1915.jpeg" \
  "Juan Gris - La bouteille d'anis - Google Art Project.jpg"

fetch red-wedge.jpg \
  "Beat the Whites with the Red Wedge.jpg" \
  "Klinom Krasnym Bej Belych.JPG"

fetch tatlin-tower.jpg \
  "Tatlin's Tower maket 1919 year.jpg" \
  "Tatlin 2.jpg"

fetch lissitzky-proun.jpg \
  "El Lissitzky - Proun 5A.jpg" \
  "Lissitzky Proun 93.jpg" \
  "El lissitzky, proun G.B.A., 1923 ca.jpg"

fetch kandinsky-composition-8.jpg \
  "Vassily Kandinsky, 1923 - Composition 8, huile sur toile, 140 cm x 201 cm, Musée Guggenheim, New York.jpg" \
  "Kandinsky - Composition 8, 1923.jpg" \
  "Wassily Kandinsky Composition VIII.jpg"

fetch klee-senecio.jpg \
  "Paul Klee, 1922, Senecio, oil on gauze, 40.3 × 37.4 cm, Kunstmuseum Basel.jpg" \
  "Senecio (Baldgreis), Klee 1080998.jpg"

fetch bauhaus-dessau.jpg \
  "Dessau Bauhaus-Gebäude asv2024-06 img1.jpg" \
  "Außenansichten des Bauhaus-Gebäudes in Dessau 07.jpg" \
  "Bauhaus Dessau-001.jpg"

echo "---- done ----"
ls -la "$OUT"

# ---- M2：四流派转正新增 ----

fetch matisse-dance.jpg \
  "Henri Matisse, 1909, La Danse (I), early version, oil on canvas, 259.7 x 390.1 cm, Museum of Modern Art.jpg" \
  "Henri Matisse, 1910, La Danse (I), early version, Museum of Modern Art.jpg" \
  "La danse (I) by Henri Matisse.jpg" \
  "La Danse I, par Henri Matisse.jpg" \
  "Henri Matisse, Dance (50393379898).jpg"

fetch derain-charing-cross.jpg \
  "André Derain, 1906, Charing Cross Bridge, London, oil on canvas, 80.3 x 100.3 cm, National Gallery of Art.jpg" \
  "Andre Derain - Charing Cross Bridge, London - Google Art Project.jpg" \
  "Charing Cross Bridge, London (Derain).jpg" \
  "Pont de Charing Cross, par André Derain.jpg"

fetch city-rises.jpg \
  "Umberto Boccioni, 1910, The City Rises, oil on canvas, 199.3 x 301 cm, Museum of Modern Art.jpg" \
  "Umberto Boccioni - The City Rises - Google Art Project.jpg" \
  "The City Rises (Umberto Boccioni).jpg"

fetch dog-leash.jpg \
  "Giacomo Balla - Dynamism of a Dog on a Leash - Google Art Project.jpg" \
  "Dynamism of a Dog on a Leash (Giacomo Balla).jpg"

fetch unique-forms.jpg \
  "Unique Forms of Continuity in Space, 1913 bronze by Umberto Boccioni.jpg" \
  "'Unique Forms of Continuity in Space', 1913 bronze by Umberto Boccioni.jpg" \
  "Umberto Boccioni, 1913, Unique Forms of Continuity in Space, bronze.jpg" \
  "Umberto Boccioni - Unique Forms of Continuity in Space - Tate.jpg"

fetch black-square.jpg \
  "Kazimir Malevich, 1915, Black Suprematic Square, oil on linen canvas, 79.5 x 79.5 cm, Tretyakov Gallery.jpg" \
  "Kazimir Malevich, 1915, Black Square, oil on linen canvas, 79.5 x 79.5 cm, Tretyakov Gallery.jpg" \
  "Kazimir Malevich - Black Square.jpg"

fetch white-on-white.jpg \
  "Kazimir Malevich, 1918, Suprematist Composition- White on White, oil on canvas, 79.4 x 79.4 cm, Museum of Modern Art.jpg" \
  "Kazimir Malevich, 1918, Suprematist Composition - White on White, oil on canvas, 79.4 x 79.4 cm, Museum of Modern Art.jpg" \
  "Suprematist Composition White on White.jpg"

fetch suprematist-composition.jpg \
  "Kazimir Malevich - Suprematist Composition - Google Art Project.jpg" \
  "Suprematist Composition (blue rectangle over the red beam).jpg" \
  "Kazimir Malevich, 1916, Suprematist Composition, oil on canvas.jpg"

fetch mondrian-composition-ii.jpg \
  "Piet Mondriaan, 1930 - Mondrian Composition II in Red, Blue, and Yellow.jpg" \
  "Piet Mondrian, 1930 - Komposition II mit Rot, Blau und Gelb.jpg"

fetch doesburg-counter-composition.jpg \
  "Theo van Doesburg Counter-Composition V (1924).jpg" \
  "Theo van Doesburg - Counter-Composition V.jpg"

fetch victory-boogie-woogie.jpg \
  "Piet Mondrian, 1942 - Victory Boogie Woogie.jpg" \
  "Victory Boogie Woogie, by Piet Mondrian.jpg"

# ---- M3：七节点转正新增（好收集的公有领域图）----

# realism
fetch courbet-stonebreakers.jpg \
  "Gustave Courbet - The Stone Breakers - WGA05457.jpg" \
  "Gustave Courbet, 1849, The Stone Breakers, oil on canvas.jpg" \
  "The Stone Breakers, by Gustave Courbet.jpg"

fetch millet-gleaners.jpg \
  "Jean-François Millet - Gleaners - Google Art Project_2.jpg" \
  "Jean-François Millet - Gleaners - Google Art Project.jpg"

fetch courbet-burial.jpg \
  "Gustave Courbet - A Burial at Ornans - Google Art Project 2.jpg" \
  "Gustave Courbet - A Burial at Ornans - Google Art Project.jpg"

# abstraction
fetch kandinsky-composition-7.jpg \
  "Wassily Kandinsky - Composition VII - Google Art Project.jpg" \
  "Kandinsky - Composition VII, 1913.jpg" \
  "Vassily Kandinsky, 1913 - Composition 7.jpg"

fetch marc-blue-horses.jpg \
  "Franz Marc - The Large Blue Horses - Google Art Project.jpg" \
  "Franz Marc, 1911, The Large Blue Horses, oil on canvas.jpg" \
  "Die grossen blauen Pferde, Franz Marc.jpg"

# dada
fetch duchamp-fountain.jpg \
  "Marcel Duchamp, 1917, Fountain, photograph by Alfred Stieglitz.jpg"

# surrealism
fetch magritte-son-of-man.jpg \
  "René Magritte - The Son of Man.jpg" \
  "Le fils de l'homme, by René Magritte.jpg"

fetch magritte-treachery.jpg \
  "MagrittePipe.jpg" \
  "René Magritte - The Treachery of Images (This is Not a Pipe) - 1948.jpg"

# minimalism
fetch flavin-monument.jpg \
  "Dan Flavin - Monument for V. Tatlin.jpg" \
  "Dan Flavin, 1964, Monument 1 for V. Tatlin.jpg"

echo "---- M3 done ----"
