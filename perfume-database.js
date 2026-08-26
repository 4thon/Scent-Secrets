(function (window) {
  const STORAGE_KEY = "scentSecretsPerfumeCatalog";
  const STORAGE_VERSION = "2026-04-24-hermes-logo-shuffle-v2";

  const localPerfumeImages = [
    "Acqua di gio profumo.avif",
    "Angel men",
    "Armani Code.avif",
    "Aventus.avif",
    "Azzaro Wanted.avif",
    "badboy.avif",
    "bleu de chanel.avif",
    "boss bottled.avif",
    "burberry hero.avif",
    "burberry touch.avif",
    "Bvlgari Aqva pour homme.avif",
    "ck be.avif",
    "ck one.avif",
    "chrome azzaro.avif",
    "club de nuit.avif",
    "cool water.avif",
    "dior homme intense.avif",
    "dior sauvage.avif",
    "DKNY be delicious.avif",
    "Eclat d'Arpege Pour Homme Lanvin.avif",
    "elizabeth arden green tea.avif",
    "emporio armani stronger with you.avif",
    "encre noire.avif",
    "escada cherry in the air.avif",
    "eternity for men.avif",
    "Fahrenheit.avif",
    "ferrari black.avif",
    "Fierce.avif",
    "Flowerbomb.avif",
    "gentleman givenchy.avif",
    "Giorio Armani.avif",
    "good girl.avif",
    "gucci bloom.avif",
    "gucci guilty.avif",
    "gucci pour homme.avif",
    "H24.avif",
    "hugo man.avif",
    "icon.avif",
    "intenso.avif",
    "interlude man.avif",
    "invictus.avif",
    "Issey Miyake L’Eau d’Issey.avif",
    "J'adore.avif",
    "jazz club.avif",
    "jimmy choo man.avif",
    "jo malone lime & basil.avif",
    "jpg le male.avif",
    "K by Dolce and Gabbana.avif",
    "karl lagerfeld.avif",
    "kenzo flower.avif",
    "kenzo homme.avif",
    "korloff in white.avif",
    "La Vie Est Belle.avif",
    "lacoste black.avif",
    "lacoste red.avif",
    "Lacoste White.avif",
    "Legend Montblanc.avif",
    "light blue D&G.avif",
    "million.avif",
    "miss dior blooming bouquet.avif",
    "montblanc explorer.avif",
    "montblanc femme Individuelle.avif",
    "Mugler Alien.avif",
    "my way.avif",
    "narciso rodriguez.avif",
    "nautica blue.avif",
    "nautica voyage.avif",
    "nina.avif",
    "noir extreme.avif",
    "ombre leather.avif",
    "oud satin mood.avif",
    "oud wood.avif",
    "polo blue.avif",
    "polo green.avif",
    "polo red.avif",
    "prada l'homme.avif",
    "prada luna rossa carbon.avif",
    "Q by Dolce and Gabbana.avif",
    "quartz.avif",
    "quatre boucheron.avif",
    "queen of seduction.avif",
    "quiet reflection.avif",
    "ralph's club.avif",
    "red tobacco.avif",
    "reflection man.avif",
    "rochas man.avif",
    "santal 33.avif",
    "sauvage elixir.avif",
    "spicebomb.avif",
    "stronger with you intensely.avif",
    "Terre D Hermes.avif",
    "the one.avif",
    "tobacco vanille.avif",
    "tommy.avif",
    "tuxedo.avif",
    "ultramale.avif",
    "hermes-un-jardin-sur-le-nil.avif",
    "uomo signature salvatore ferragamo.avif",
    "urban hero.avif",
    "utopia.avif",
    "valentino uomo born in roma.avif",
    "van cleef and arpels.avif",
    "versace dylan blue.avif",
    "versace eros flame.avif",
    "versace eros.avif",
    "viktor&rolf spicebomb extreme.avif",
    "wanted by night.avif",
    "wave.avif",
    "weekend for men.avif",
    "white musk.avif",
    "wood sage and sea salt.avif",
    "xerjoff erba pura.avif",
    "xerjoff naxos.avif",
    "xeryus rouge.avif",
    "xeryus.avif",
    "xoxo.avif",
    "yara.avif",
    "yellow diamond.avif",
    "youth dew.avif",
    "yves saint laurent Y le parfum.avif",
    "yves saint laurent Y.avif",
    "zegna uomo.avif",
    "zen.avif",
    "zest of verbana.avif",
    "zino.avif",
    "zoologist.avif"
  ];

  function normalizeForMatch(text) {
    return text
      .toLowerCase()
      .replace(/\.(avif|jpg|jpeg|png|webp)$/g, "")
      .replace(/[^a-z0-9]+/g, "");
  }

  const imageLookup = localPerfumeImages.map((file) => ({
    file,
    key: normalizeForMatch(file)
  }));

  const designatedImageByName = {
    "Acqua di Gio Profumo - Giorgio Armani": "Acqua di gio profumo.avif",
    "Acqua di Gio - Giorgio Armani": "Giorio Armani.avif",
    "Angel Men (A*Men) - Mugler": "Angel men",
    "Bvlgari Aqva Pour Homme - Bvlgari": "Bvlgari Aqva pour homme.avif",
    "Emporio Armani Stronger With You - Giorgio Armani": "emporio armani stronger with you.avif",
    "Issey Miyake L'Eau d'Issey": "Issey Miyake L’Eau d’Issey.avif",
    "Jo Malone Lime Basil and Mandarin": "jo malone lime & basil.avif",
    "Jean Paul Gaultier Le Male": "jpg le male.avif",
    "Narciso Rodriguez For Him": "narciso rodriguez.avif",
    "Q by Dolce and Gabbana": "Q by Dolce and Gabbana.avif",
    "Terre d'Hermes - Hermes": "Terre D Hermes.avif",
    "Un Jardin Sur Le Nil - Hermes": "hermes-un-jardin-sur-le-nil.avif",
    "Ultra Male - Jean Paul Gaultier": "ultramale.avif",
    "Ferragamo Uomo - Salvatore Ferragamo": "Ferragamo Uomo - Salvatore Ferragamo.avif",
    "Valentino Uomo Born in Roma": "valentino uomo born in roma.avif",
    "Viktor and Rolf Spicebomb Extreme": "viktor&rolf spicebomb extreme.avif",
    "Wood Sage and Sea Salt - Jo Malone": "wood sage and sea salt.avif",
    "Urban Hero - Jimmy Choo": "Urban Hero - jimmy Choo.avif",
    "Yves Saint Laurent Y - YSL": "yves saint laurent Y.avif",
    "Yves Saint Laurent Y Le Parfum - YSL": "yves saint laurent Y le parfum.avif",
    "Zest of Verbena - L'Occitane": "zest of verbana.avif"
  };

  function resolvePerfumeImage(name) {
    if (designatedImageByName[name]) return designatedImageByName[name];

    const fullKey = normalizeForMatch(name);
    const baseKey = normalizeForMatch(name.split(" - ")[0]);

    let found = imageLookup.find((item) => item.key === baseKey || item.key === fullKey);
    if (found) return found.file;

    found = imageLookup.find((item) => baseKey.includes(item.key) || item.key.includes(baseKey));
    if (found) return found.file;

    found = imageLookup.find((item) => fullKey.includes(item.key) || item.key.includes(fullKey));
    if (found) return found.file;

    return "sauvage.jpg";
  }

  function normalizePerfume(item) {
    return {
      ...item,
      audience: determineAudience(item),
      img: resolvePerfumeImage(item.name)
    };
  }

  function shufflePerfumes(list) {
    const shuffled = [...list];

    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
    }

    return shuffled;
  }

  const womenPerfumes = new Set([
    "Miss Dior Blooming Bouquet - Dior",
    "Light Blue - Dolce and Gabbana",
    "DKNY Be Delicious - Donna Karan",
    "Escada Cherry in the Air - Escada",
    "Flowerbomb - Viktor and Rolf",
    "Gucci Guilty - Gucci",
    "Gucci Bloom - Gucci",
    "Good Girl - Carolina Herrera",
    "Issey Miyake L'Eau d'Issey",
    "J'adore - Dior",
    "Kenzo Flower - Kenzo",
    "La Vie Est Belle - Lancome",
    "My Way - Giorgio Armani",
    "Montblanc Femme Individuelle",
    "Mugler Alien - Thierry Mugler",
    "Nina - Nina Ricci",
    "Quatre - Boucheron",
    "Queen of Seduction - Antonio Banderas",
    "Q by Dolce and Gabbana",
    "Utopia - Kenzo",
    "Yellow Diamond - Versace",
    "Yara - Lattafa",
    "Youth-Dew - Estee Lauder",
    "Zen - Shiseido"
  ]);

  const unisexPerfumes = new Set([
    "CK One - Calvin Klein",
    "CK Be - Calvin Klein",
    "Elizabeth Arden Green Tea - Elizabeth Arden",
    "Jo Malone Lime Basil and Mandarin",
    "Jazz Club - Maison Margiela",
    "Replica Jazz Club - Maison Margiela",
    "Oud Wood - Tom Ford",
    "Oud Satin Mood - Maison Francis Kurkdjian",
    "Santal 33 - Le Labo",
    "Tobacco Vanille - Tom Ford",
    "Un Jardin Sur Le Nil - Hermes",
    "Wood Sage and Sea Salt - Jo Malone",
    "White Musk - The Body Shop",
    "Xerjoff Naxos - Xerjoff",
    "Xerjoff Erba Pura - Xerjoff",
    "Quiet Reflection - Miller Harris",
    "Zest of Verbena - L'Occitane",
    "Zoologist Beaver - Zoologist"
  ]);

  function determineAudience(item) {
    if (womenPerfumes.has(item.name)) return "women";
    if (unisexPerfumes.has(item.name)) return "unisex";

    const text = `${item.name} ${item.desc} ${item.family} ${item.notes}`.toLowerCase();

    if (text.includes("unisex")) return "unisex";
    if (
      text.includes("feminine") ||
      text.includes("for women") ||
      text.includes("femme") ||
      text.includes("women")
    ) {
      return "women";
    }
    if (
      text.includes("masculine") ||
      text.includes("for men") ||
      text.includes("pour homme") ||
      text.includes("homme") ||
      text.includes("uomo") ||
      /\bman\b/.test(text) ||
      /\bmale\b/.test(text)
    ) {
      return "men";
    }

    return "men";
  }

  const perfumeSeed = [
    { name: "Acqua di Gio Profumo - Giorgio Armani", family: "Aromatic Aquatic, Woody", type: "Eau de Parfum", notes: "Marine, incense, patchouli", store: "Rustan's Makati, SM Mall of Asia, SM Megamall", price: 9500, priceRange: "PHP 6,500 - 9,500", desc: "Deeper and more mature aquatic-woody profile." },
    { name: "Armani Code - Giorgio Armani", family: "Oriental Spicy", type: "EDT / EDP", notes: "Citrus, olive blossom, tonka bean", store: "SM Aura, Rustan's, Greenbelt 5", price: 8000, priceRange: "PHP 5,500 - 8,000", desc: "Smooth seductive scent for evenings." },
    { name: "Azzaro Wanted - Azzaro", family: "Woody Spicy", type: "EDT", notes: "Lemon, cardamom, vetiver", store: "SM Megamall, SM North EDSA, Landmark Makati", price: 6000, priceRange: "PHP 4,000 - 6,000", desc: "Bold and playful masculine style." },
    { name: "Aventus - Creed", family: "Fruity Chypre", type: "EDP", notes: "Pineapple, birch, musk, oakmoss", store: "Rustan's Makati, Greenbelt 5", price: 30000, priceRange: "PHP 18,000 - 30,000+", desc: "Luxury signature with strong projection." },
    { name: "Angel Men (A*Men) - Mugler", family: "Oriental Gourmand", type: "EDT", notes: "Coffee, caramel, patchouli", store: "SM Aura, Rustan's", price: 7500, priceRange: "PHP 4,500 - 7,500", desc: "Strong sweet gourmand profile." },
    { name: "Bleu de Chanel - Chanel", family: "Woody Aromatic", type: "EDP / Parfum", notes: "Citrus, grapefruit, incense, sandalwood", store: "Rustan's Makati, SM Aura, Greenbelt 5", price: 12000, priceRange: "PHP 7,500 - 12,000", desc: "Fresh yet deep luxury masculine." },
    { name: "Bvlgari Aqva Pour Homme - Bvlgari", family: "Aquatic Aromatic", type: "EDT", notes: "Sea minerals, citrus", store: "SM Megamall, Rustan's", price: 7000, priceRange: "PHP 4,500 - 7,000", desc: "Oceanic clean scent for warm weather." },
    { name: "Burberry Hero - Burberry", family: "Woody Spicy", type: "EDP", notes: "Cedarwood, bergamot", store: "Greenbelt 5, SM Aura", price: 9000, priceRange: "PHP 6,000 - 9,000", desc: "Strong but smooth modern masculine." },
    { name: "Burberry Touch - Burberry", family: "Woody Floral Musk", type: "EDT", notes: "Violet leaf, musk", store: "SM Department Store, Landmark Makati", price: 6000, priceRange: "PHP 3,500 - 6,000", desc: "Soft and comforting daily scent." },
    { name: "Boss Bottled - Hugo Boss", family: "Woody Spicy", type: "EDT", notes: "Apple, cinnamon, woods", store: "SM Megamall, Rustan's", price: 7000, priceRange: "PHP 4,000 - 7,000", desc: "Classic office-friendly warm scent." },
    { name: "CK One - Calvin Klein", family: "Citrus Aromatic", type: "EDT", notes: "Green tea, citrus, musk", store: "SM Department Store, Landmark Makati", price: 4500, priceRange: "PHP 2,500 - 4,500", desc: "Light unisex everyday freshness." },
    { name: "CK Be - Calvin Klein", family: "Floral Woody Musk", type: "EDT", notes: "Lavender, musk, soft florals", store: "SM Megamall, SM North EDSA", price: 4500, priceRange: "PHP 2,500 - 4,500", desc: "Skin-close intimate clean scent." },
    { name: "Chrome - Azzaro", family: "Citrus Aquatic", type: "EDT", notes: "Citrus, herbs, aquatic notes", store: "SM Aura, Rustan's", price: 5500, priceRange: "PHP 3,500 - 5,500", desc: "Energetic clean metallic-aquatic style." },
    { name: "Cool Water - Davidoff", family: "Aromatic Aquatic", type: "EDT", notes: "Mint, lavender, seawater", store: "SM Department Store, Landmark", price: 3500, priceRange: "PHP 2,000 - 3,500", desc: "Classic refreshing ocean scent." },
    { name: "Club de Nuit Intense Man - Armaf", family: "Woody Fruity", type: "EDT / Parfum", notes: "Pineapple, lemon, musk", store: "SM Department Store selected branches, Lazada/Shopee official stores", price: 4000, priceRange: "PHP 2,500 - 4,000", desc: "Strong projection budget favorite." },
    { name: "Dior Sauvage - Dior", family: "Fresh Spicy, Aromatic Fougere", type: "EDT / EDP / Parfum", notes: "Bergamot, pepper, ambroxan", store: "Rustan's Makati, Greenbelt 5, SM Aura, SM Mall of Asia", price: 12500, priceRange: "PHP 6,500 - 12,500", desc: "Powerful versatile modern masculine." },
    { name: "Miss Dior Blooming Bouquet - Dior", family: "Floral Fresh", type: "EDT", notes: "Peony, rose, white musk", store: "Rustan's Makati, Greenbelt 5, SM Aura", price: 9000, priceRange: "PHP 6,000 - 9,000", desc: "Soft romantic floral bouquet." },
    { name: "Dior Homme Intense - Dior", family: "Woody Floral Musk", type: "EDP", notes: "Iris, amber, woods", store: "Rustan's Makati, Greenbelt 5", price: 11000, priceRange: "PHP 7,500 - 11,000", desc: "Classy powdery formal scent." },
    { name: "Light Blue - Dolce and Gabbana", family: "Citrus Fruity", type: "EDT", notes: "Lemon, apple, cedarwood", store: "SM Megamall, Rustan's, SM Aura", price: 7500, priceRange: "PHP 4,500 - 7,500", desc: "Airy Mediterranean freshness." },
    { name: "DKNY Be Delicious - Donna Karan", family: "Fruity Floral", type: "EDP / EDT", notes: "Green apple, florals", store: "SM Department Store, Landmark Makati, SM North EDSA", price: 6000, priceRange: "PHP 3,500 - 6,000", desc: "Juicy playful green apple scent." },
    { name: "Eternity for Men - Calvin Klein", family: "Aromatic Fougere", type: "EDT", notes: "Lavender, mandarin, sandalwood", store: "SM Megamall, SM North EDSA, Landmark Makati", price: 6000, priceRange: "PHP 3,500 - 6,000", desc: "Classic clean daily masculine." },
    { name: "Emporio Armani Stronger With You - Giorgio Armani", family: "Oriental Fougere", type: "EDT", notes: "Chestnut, vanilla, spice", store: "Rustan's Makati, Greenbelt 5, SM Aura", price: 9000, priceRange: "PHP 5,500 - 9,000", desc: "Warm sweet modern date scent." },
    { name: "Elizabeth Arden Green Tea - Elizabeth Arden", family: "Citrus Aromatic", type: "EDT", notes: "Green tea, lemon, herbs", store: "SM Department Store, Landmark Makati", price: 3500, priceRange: "PHP 2,000 - 3,500", desc: "Very light and calming." },
    { name: "Escada Cherry in the Air - Escada", family: "Fruity Floral", type: "EDT", notes: "Cherry, raspberry, sweet accord", store: "Rustan's Makati, SM Aura", price: 6500, priceRange: "PHP 4,000 - 6,500", desc: "Playful fruity feminine scent." },
    { name: "Encre Noire - Lalique", family: "Woody Aromatic", type: "EDT", notes: "Vetiver, smoky woods", store: "SM Megamall select stores, Rustan's, official online sellers", price: 5000, priceRange: "PHP 3,000 - 5,000", desc: "Dark earthy masculine profile." },
    { name: "Eclat d'Arpege Pour Homme - Lanvin", family: "Citrus Aromatic, Fresh Woody Floral", type: "EDT", notes: "Citrus, floral woods", store: "Rustan's Makati, SM Megamall, SM Aura, select Watsons, Shopee/Lazada official sellers", price: 6500, priceRange: "PHP 3,000 - 6,500", desc: "Fresh clean woody-citrus everyday scent." },
    { name: "Fahrenheit - Dior", family: "Leather, Woody Floral Musk", type: "EDT", notes: "Violet, leather", store: "Rustan's Makati, Greenbelt 5", price: 10000, priceRange: "PHP 6,500 - 10,000", desc: "Bold vintage gasoline-leather profile." },
    { name: "Fierce - Abercrombie and Fitch", family: "Aromatic Woody", type: "Cologne", notes: "Fresh musk, woods", store: "SM Aura, SM Megamall", price: 7000, priceRange: "PHP 4,000 - 7,000", desc: "Sporty musky signature scent." },
    { name: "Ferrari Black - Ferrari", family: "Oriental Woody", type: "EDT", notes: "Apple, cinnamon, vanilla", store: "SM Department Store", price: 3000, priceRange: "PHP 1,500 - 3,000", desc: "Budget warm sweet masculine." },
    { name: "Flowerbomb - Viktor and Rolf", family: "Floral Oriental", type: "EDP", notes: "Jasmine, rose", store: "Rustan's Makati", price: 10000, priceRange: "PHP 6,000 - 10,000", desc: "Rich luxurious feminine floral." },
    { name: "Ferragamo Uomo - Salvatore Ferragamo", family: "Oriental Gourmand", type: "EDT", notes: "Coffee, tiramisu accord", store: "SM Aura, Rustan's", price: 7500, priceRange: "PHP 4,500 - 7,500", desc: "Warm edible coffee sweetness." },
    { name: "Gucci Guilty - Gucci", family: "Floral Oriental", type: "EDT/EDP", notes: "Amber floral spices", store: "Greenbelt 5, Rustan's", price: 9500, priceRange: "PHP 5,500 - 9,500", desc: "Sexy modern amber floral." },
    { name: "Gucci Bloom - Gucci", family: "Floral", type: "EDP", notes: "Jasmine floral bouquet", store: "Greenbelt 5", price: 9000, priceRange: "PHP 6,000 - 9,000", desc: "Lush white floral garden scent." },
    { name: "Gentleman - Givenchy", family: "Woody Aromatic", type: "EDP", notes: "Pear, iris", store: "Rustan's Makati", price: 10000, priceRange: "PHP 6,000 - 10,000", desc: "Elegant clean masculine." },
    { name: "Acqua di Gio - Giorgio Armani", family: "Aquatic Citrus", type: "EDT", notes: "Ocean breeze citrus", store: "SM Mall of Asia, Rustan's", price: 8000, priceRange: "PHP 5,000 - 8,000", desc: "Fresh timeless aquatic classic." },
    { name: "Gucci Pour Homme - Gucci", family: "Woody Spicy", type: "EDT", notes: "Smoky leather woods", store: "Greenbelt 5", price: 8000, priceRange: "PHP 5,000 - 8,000", desc: "Strong smoky masculine tone." },
    { name: "Terre d'Hermes - Hermes", family: "Woody Spicy", type: "EDT/EDP", notes: "Orange, woods", store: "Greenbelt 5", price: 11000, priceRange: "PHP 6,500 - 11,000", desc: "Mature earthy refined scent." },
    { name: "H24 - Hermes", family: "Aromatic Green", type: "EDT", notes: "Metallic herbal freshness", store: "Greenbelt 5", price: 9000, priceRange: "PHP 6,000 - 9,000", desc: "Modern clean green profile." },
    { name: "Bad Boy - Carolina Herrera", family: "Oriental Spicy", type: "EDT/EDP", notes: "Cocoa, spices", store: "SM Aura", price: 9000, priceRange: "PHP 5,500 - 9,000", desc: "Bold youthful spicy sweetness." },
    { name: "Good Girl - Carolina Herrera", family: "Floral Oriental", type: "EDP", notes: "Coffee, vanilla, florals", store: "SM Aura, Rustan's", price: 10000, priceRange: "PHP 6,500 - 10,000", desc: "Sexy floral gourmand." },
    { name: "Hugo Man - Hugo Boss", family: "Aromatic Green", type: "EDT", notes: "Green apple", store: "SM Megamall", price: 6000, priceRange: "PHP 3,500 - 6,000", desc: "Sporty youthful freshness." },
    { name: "Invictus - Paco Rabanne", family: "Aquatic Woody", type: "EDT", notes: "Grapefruit, marine accord", store: "SM Aura", price: 8000, priceRange: "PHP 5,000 - 8,000", desc: "Energetic sporty crowd-pleaser." },
    { name: "Issey Miyake L'Eau d'Issey", family: "Aquatic Floral", type: "EDT", notes: "Lotus, citrus", store: "SM Megamall", price: 7000, priceRange: "PHP 4,000 - 7,000", desc: "Pure clean watery floral." },
    { name: "Interlude Man - Amouage", family: "Oriental Woody", type: "EDP", notes: "Incense, smoky woods", store: "Rustan's Makati", price: 20000, priceRange: "PHP 12,000 - 20,000+", desc: "Heavy niche incense beast." },
    { name: "Icon - Dunhill", family: "Woody Aromatic", type: "EDP", notes: "Citrus, pepper, woods", store: "SM Aura", price: 7500, priceRange: "PHP 4,500 - 7,500", desc: "Modern crisp masculine." },
    { name: "Intenso - Dolce and Gabbana", family: "Woody Aromatic", type: "EDP", notes: "Tobacco, lavender", store: "SM Mall of Asia", price: 8000, priceRange: "PHP 5,000 - 8,000", desc: "Deep warm aromatic style." },
    { name: "Jimmy Choo Man - Jimmy Choo", family: "Aromatic Fougere", type: "EDT", notes: "Pineapple, suede", store: "SM Megamall", price: 7000, priceRange: "PHP 4,000 - 7,000", desc: "Stylish fresh modern masculine." },
    { name: "Jo Malone Lime Basil and Mandarin", family: "Citrus Aromatic", type: "Cologne", notes: "Lime, basil, mandarin", store: "Greenbelt 5", price: 10000, priceRange: "PHP 6,500 - 10,000", desc: "Luxury citrus herbal blend." },
    { name: "J'adore - Dior", family: "Floral Fruity", type: "EDP", notes: "Jasmine, rose", store: "Rustan's Makati", price: 10500, priceRange: "PHP 6,500 - 10,500", desc: "Elegant luxury floral." },
    { name: "Jazz Club - Maison Margiela", family: "Oriental Woody", type: "EDT", notes: "Rum, tobacco, vanilla", store: "Greenbelt 5", price: 11000, priceRange: "PHP 7,000 - 11,000", desc: "Warm boozy nightlife vibe." },
    { name: "Jean Paul Gaultier Le Male", family: "Oriental Fougere", type: "EDT", notes: "Lavender, vanilla, mint", store: "SM Aura", price: 8000, priceRange: "PHP 5,000 - 8,000", desc: "Classic sexy masculine." },
    { name: "Kenzo Homme - Kenzo", family: "Aquatic Woody", type: "EDT", notes: "Sea notes, pine, sandalwood", store: "SM Megamall, Rustan's Makati", price: 7000, priceRange: "PHP 4,000 - 7,000", desc: "Calming ocean-forest freshness." },
    { name: "Kenzo Flower - Kenzo", family: "Floral Powdery", type: "EDP", notes: "Violet, rose, vanilla", store: "Greenbelt 5, Rustan's Makati", price: 8500, priceRange: "PHP 5,000 - 8,500", desc: "Soft powdery romantic floral." },
    { name: "Karl Lagerfeld Pour Homme", family: "Woody Aromatic", type: "EDT", notes: "Apple, lavender, sandalwood", store: "SM Department Store, Landmark Makati", price: 6000, priceRange: "PHP 3,500 - 6,000", desc: "Simple modern daily scent." },
    { name: "Korloff In White - Korloff Paris", family: "Woody Spicy", type: "EDP", notes: "Citrus, spices, musk", store: "Rustan's Makati", price: 8000, priceRange: "PHP 5,000 - 8,000", desc: "Classy fresh spicy elegance." },
    { name: "K by Dolce and Gabbana", family: "Woody Aromatic", type: "EDT / EDP", notes: "Blood orange, fig, cedarwood", store: "SM Mall of Asia, Rustan's Makati", price: 9000, priceRange: "PHP 5,500 - 9,000", desc: "Confident fresh spicy masculine." },
    { name: "Lacoste Red", family: "Woody Fruity", type: "EDT", notes: "Green apple, pine, patchouli", store: "SM Megamall, SM North EDSA, Landmark Makati", price: 6000, priceRange: "PHP 3,500 - 6,000", desc: "Sporty youthful apple-woody vibe." },
    { name: "Lacoste Black", family: "Aromatic Woody", type: "EDT", notes: "Watermelon, lavender, sweet notes", store: "SM Megamall, SM Aura, Landmark Makati", price: 6000, priceRange: "PHP 3,500 - 6,000", desc: "Warm smooth modern scent." },
    { name: "Lacoste White", family: "Woody Floral", type: "EDT", notes: "Grapefruit, rosemary, cedar", store: "SM Department Store, SM Megamall", price: 6000, priceRange: "PHP 3,500 - 6,000", desc: "Clean sporty versatile profile." },
    { name: "La Vie Est Belle - Lancome", family: "Floral Gourmand", type: "EDP", notes: "Iris, vanilla, praline", store: "Rustan's Makati, Greenbelt 5", price: 10500, priceRange: "PHP 6,500 - 10,500", desc: "Luxurious sweet feminine icon." },
    { name: "Legend - Montblanc", family: "Aromatic Fougere", type: "EDT", notes: "Lavender, pineapple, oakmoss", store: "SM Aura, Rustan's Makati", price: 7000, priceRange: "PHP 4,000 - 7,000", desc: "Fresh classic masculine confidence." },
    { name: "Montblanc Explorer - Montblanc", family: "Woody Aromatic", type: "EDP", notes: "Bergamot, vetiver, patchouli", store: "SM Aura, Rustan's Makati", price: 8000, priceRange: "PHP 5,000 - 8,000", desc: "Adventurous fresh woody masculine." },
    { name: "Million - Paco Rabanne", family: "Oriental Spicy", type: "EDT", notes: "Cinnamon, leather, amber", store: "SM Megamall, SM Aura", price: 8500, priceRange: "PHP 5,000 - 8,500", desc: "Rich bold attention-grabbing scent." },
    { name: "My Way - Giorgio Armani", family: "Floral", type: "EDP", notes: "Orange blossom, tuberose, vanilla", store: "Rustan's Makati, Greenbelt 5", price: 10000, priceRange: "PHP 6,500 - 10,000", desc: "Bright elegant modern feminine." },
    { name: "Montblanc Femme Individuelle", family: "Floral Oriental", type: "EDT", notes: "Pink pepper, rose, vanilla", store: "SM Department Store, Landmark Makati", price: 6000, priceRange: "PHP 3,500 - 6,000", desc: "Soft sweet warm feminine." },
    { name: "Mugler Alien - Thierry Mugler", family: "Amber Floral", type: "EDP", notes: "Jasmine, amber, woods", store: "Rustan's Makati, SM Aura", price: 10000, priceRange: "PHP 6,000 - 10,000", desc: "Bold long-lasting floral amber." },
    { name: "Nautica Voyage - Nautica", family: "Aquatic Fruity", type: "EDT", notes: "Apple, lotus, musk", store: "SM Department Store, Landmark Makati", price: 3500, priceRange: "PHP 2,000 - 3,500", desc: "Affordable sporty fresh scent." },
    { name: "Noir Extreme - Tom Ford", family: "Oriental Spicy Gourmand", type: "EDP", notes: "Cardamom, vanilla, amber", store: "Rustan's Makati", price: 15000, priceRange: "PHP 9,000 - 15,000+", desc: "Luxurious warm sweet spicy profile." },
    { name: "Narciso Rodriguez For Him", family: "Musky Woody", type: "EDT", notes: "Violet, amber, patchouli", store: "Greenbelt 5, Rustan's", price: 9000, priceRange: "PHP 5,500 - 9,000", desc: "Soft intimate musky masculine." },
    { name: "Nina - Nina Ricci", family: "Fruity Floral", type: "EDT", notes: "Apple, vanilla, praline", store: "Rustan's Makati, SM Aura", price: 7000, priceRange: "PHP 4,500 - 7,000", desc: "Playful youthful sweet floral." },
    { name: "Nautica Blue - Nautica", family: "Aquatic Aromatic", type: "EDT", notes: "Citrus, musk", store: "SM Department Store, Landmark", price: 3500, priceRange: "PHP 2,000 - 3,500", desc: "Light easy everyday aquatic." },
    { name: "One Million - Paco Rabanne", family: "Oriental Spicy", type: "EDT", notes: "Cinnamon, leather, amber", store: "SM Megamall, SM Aura Premier, Rustan's Makati", price: 8500, priceRange: "PHP 5,000 - 8,500", desc: "Flashy nightlife masculine." },
    { name: "One Million Elixir - Paco Rabanne", family: "Sweet Fruity Amber", type: "Parfum Intense", notes: "Apple, vanilla, woods", store: "SM Aura, Rustan's Makati, Greenbelt 5", price: 10500, priceRange: "PHP 6,500 - 10,500", desc: "Richer sweeter long-lasting One Million." },
    { name: "Ombre Leather - Tom Ford", family: "Leather", type: "EDP", notes: "Leather, jasmine, amber", store: "Rustan's Makati, Greenbelt 5 luxury counters", price: 15000, priceRange: "PHP 9,000 - 15,000+", desc: "Dark mature luxury leather." },
    { name: "Oud Wood - Tom Ford", family: "Woody Oriental (Oud)", type: "EDP", notes: "Oud, sandalwood, vanilla, spices", store: "Rustan's Makati", price: 18000, priceRange: "PHP 10,000 - 18,000+", desc: "Smooth elegant luxury oud." },
    { name: "Oud Satin Mood - Maison Francis Kurkdjian", family: "Oriental Floral Oud", type: "EDP", notes: "Rose, violet, vanilla, oud", store: "Rustan's Makati select luxury section", price: 25000, priceRange: "PHP 15,000 - 25,000+", desc: "Silky rich high-end oud floral." },
    { name: "Polo Blue - Ralph Lauren", family: "Aromatic Aquatic", type: "EDT", notes: "Melon, basil, woods", store: "SM Megamall, SM Aura, Rustan's Makati", price: 7500, priceRange: "PHP 4,500 - 7,500", desc: "Relaxed sporty aquatic freshness." },
    { name: "Polo Red - Ralph Lauren", family: "Woody Spicy", type: "EDT", notes: "Cranberry, coffee, spicy woods", store: "SM North EDSA, SM Megamall, Rustan's", price: 7000, priceRange: "PHP 4,500 - 7,000", desc: "Energetic bold sporty scent." },
    { name: "Polo Green - Ralph Lauren", family: "Woody Chypre", type: "EDT", notes: "Pine, leather, tobacco", store: "Rustan's Makati, SM Megamall", price: 6500, priceRange: "PHP 4,000 - 6,500", desc: "Vintage earthy gentleman style." },
    { name: "Prada L'Homme - Prada", family: "Floral Woody Musk", type: "EDT", notes: "Iris, amber, neroli", store: "Greenbelt 5, Rustan's Makati", price: 10000, priceRange: "PHP 6,000 - 10,000", desc: "Clean elegant office luxury." },
    { name: "Prada Luna Rossa Carbon - Prada", family: "Aromatic Fougere", type: "EDT", notes: "Fresh metallic spices", store: "SM Aura, Rustan's Makati", price: 9000, priceRange: "PHP 5,500 - 9,000", desc: "Modern versatile fresh-spicy profile." },
    { name: "Quatre - Boucheron", family: "Floral Woody", type: "EDP", notes: "Jasmine, orange blossom, woods", store: "Rustan's Makati", price: 7500, priceRange: "PHP 4,500 - 7,500", desc: "Soft classy feminine blend." },
    { name: "Queen of Seduction - Antonio Banderas", family: "Floral Aquatic", type: "EDT", notes: "Raspberry, peony, aquatic notes", store: "SM Department Store, Landmark Makati", price: 4000, priceRange: "PHP 2,500 - 4,000", desc: "Light playful youthful scent." },
    { name: "Q by Dolce and Gabbana", family: "Fruity Floral", type: "EDP", notes: "Cherry, jasmine, cedarwood", store: "SM Mall of Asia, Rustan's Makati", price: 9500, priceRange: "PHP 6,000 - 9,500", desc: "Sweet bold modern feminine." },
    { name: "Quiet Reflection - Miller Harris", family: "Floral Woody Musk", type: "EDP", notes: "Neroli, musk, iris", store: "Greenbelt 5 niche section", price: 12000, priceRange: "PHP 8,000 - 12,000", desc: "Calm refined artistic niche scent." },
    { name: "Quartz - Molyneux", family: "Aromatic Spicy", type: "EDT", notes: "Citrus, herbs, woods", store: "SM Department Store select branches", price: 5000, priceRange: "PHP 3,000 - 5,000", desc: "Simple clean easy wear." },
    { name: "Ralph's Club - Ralph Lauren", family: "Woody Aromatic", type: "EDP", notes: "Lavender, cedarwood, vetiver", store: "SM Aura, Rustan's Makati", price: 9500, priceRange: "PHP 6,000 - 9,500", desc: "Smooth classy event scent." },
    { name: "Red Tobacco - Mancera", family: "Oriental Spicy Tobacco", type: "EDP", notes: "Tobacco, cinnamon, oud, vanilla", store: "Greenbelt 5 niche section", price: 12000, priceRange: "PHP 7,000 - 12,000", desc: "Intense warm long-lasting profile." },
    { name: "Rochas Man - Rochas", family: "Gourmand Oriental", type: "EDT", notes: "Coffee, vanilla, lavender", store: "SM Department Store", price: 6000, priceRange: "PHP 3,500 - 6,000", desc: "Cozy creamy gourmand feel." },
    { name: "Replica Jazz Club - Maison Margiela", family: "Oriental Woody", type: "EDT", notes: "Rum, tobacco, vanilla", store: "Rustan's Makati, Greenbelt 5", price: 11000, priceRange: "PHP 7,000 - 11,000", desc: "Warm boozy lounge character." },
    { name: "Reflection Man - Amouage", family: "Floral Woody", type: "EDP", notes: "Neroli, jasmine, sandalwood", store: "Rustan's Makati", price: 20000, priceRange: "PHP 12,000 - 20,000+", desc: "Ultra-refined niche luxury." },
    { name: "Versace Eros - Versace", family: "Aromatic Fougere", type: "EDT / EDP / Parfum", notes: "Mint, vanilla, apple, tonka bean", store: "SM Aura, Rustan's Makati, Greenbelt 5", price: 9500, priceRange: "PHP 5,000 - 9,500", desc: "Popular seductive youthful scent." },
    { name: "Sauvage Elixir - Dior", family: "Aromatic Spicy", type: "Parfum", notes: "Spices, herbs, woody base", store: "Rustan's Makati, Greenbelt 5", price: 15000, priceRange: "PHP 9,000 - 15,000", desc: "Darker stronger Sauvage line." },
    { name: "Stronger With You Intensely - Armani", family: "Oriental Gourmand", type: "EDP", notes: "Vanilla, warm spices", store: "SM Aura, Rustan's Makati", price: 10000, priceRange: "PHP 6,500 - 10,000", desc: "Richer sweeter date-night version." },
    { name: "Spicebomb - Viktor and Rolf", family: "Oriental Spicy", type: "EDT", notes: "Cinnamon, tobacco, pink pepper", store: "Rustan's Makati", price: 9000, priceRange: "PHP 5,500 - 9,000", desc: "Explosive spicy masculine." },
    { name: "Santal 33 - Le Labo", family: "Woody Aromatic", type: "EDP", notes: "Sandalwood, leather, iris", store: "Greenbelt 5 niche boutiques", price: 20000, priceRange: "PHP 12,000 - 20,000+", desc: "Cult smoky woody niche." },
    { name: "Tom Ford Noir Extreme - Tom Ford", family: "Oriental Spicy Gourmand", type: "EDP", notes: "Cardamom, vanilla, amber", store: "Rustan's Makati, Greenbelt 5 luxury section", price: 15000, priceRange: "PHP 9,000 - 15,000+", desc: "Creamy elegant seduction." },
    { name: "Tobacco Vanille - Tom Ford", family: "Oriental Spicy Tobacco", type: "EDP", notes: "Tobacco leaf, vanilla, dried fruits", store: "Rustan's Makati", price: 18000, priceRange: "PHP 10,000 - 18,000+", desc: "Powerful luxurious tobacco vanilla." },
    { name: "Tuxedo - Yves Saint Laurent", family: "Chypre Spicy", type: "EDP", notes: "Patchouli, amber, spices", store: "Greenbelt 5, Rustan's Makati", price: 16000, priceRange: "PHP 10,000 - 16,000+", desc: "Dark refined formal scent." },
    { name: "The One - Dolce and Gabbana", family: "Oriental Spicy", type: "EDP / EDT", notes: "Tobacco, amber, ginger", store: "SM Mall of Asia, Rustan's Makati", price: 8500, priceRange: "PHP 5,000 - 8,500", desc: "Smooth classy date scent." },
    { name: "Tommy - Tommy Hilfiger", family: "Citrus Aromatic", type: "EDT", notes: "Citrus, cranberry, mint", store: "SM Department Store, Landmark Makati", price: 6000, priceRange: "PHP 3,500 - 6,000", desc: "Youthful sporty freshness." },
    { name: "Ultra Male - Jean Paul Gaultier", family: "Oriental Fruity", type: "EDT", notes: "Pear, vanilla, amber", store: "SM Aura, Rustan's Makati", price: 9500, priceRange: "PHP 6,000 - 9,500", desc: "Loud sexy fruity sweet profile." },
    { name: "Un Jardin Sur Le Nil - Hermes", family: "Green Fruity", type: "EDT", notes: "Mango, lotus, green notes", store: "Greenbelt 5, Rustan's Makati", price: 10000, priceRange: "PHP 6,500 - 10,000", desc: "Artistic airy fresh composition." },
    { name: "Uomo Signature - Salvatore Ferragamo", family: "Oriental Spicy Gourmand", type: "EDP", notes: "Coffee, leather, tonka bean", store: "SM Aura, Rustan's Makati", price: 8500, priceRange: "PHP 5,000 - 8,500", desc: "Dark sweet masculine." },
    { name: "Urban Hero - Jimmy Choo", family: "Woody Spicy", type: "EDT", notes: "Lemon, black pepper, leather", store: "SM Megamall, Rustan's Makati", price: 7000, priceRange: "PHP 4,000 - 7,000", desc: "Edgy modern fresh-spicy." },
    { name: "Utopia - Kenzo", family: "Floral Aquatic", type: "EDP", notes: "Jasmine, musk, soft woods", store: "Rustan's Makati", price: 9000, priceRange: "PHP 6,000 - 9,000", desc: "Dreamy light elegant floral." },
    { name: "Versace Eros Flame - Versace", family: "Oriental Spicy", type: "EDP", notes: "Orange, pepper, vanilla", store: "SM Aura, Rustan's Makati", price: 9000, priceRange: "PHP 5,500 - 9,000", desc: "Hotter spicier Eros style." },
    { name: "Versace Dylan Blue - Versace", family: "Aromatic Fougere", type: "EDT", notes: "Grapefruit, incense, musk", store: "SM Megamall, Rustan's Makati", price: 8500, priceRange: "PHP 5,000 - 8,500", desc: "Dark-clean versatile masculine." },
    { name: "Valentino Uomo Born in Roma", family: "Woody Spicy", type: "EDT", notes: "Violet, mineral salt, vetiver", store: "Greenbelt 5, Rustan's Makati", price: 10000, priceRange: "PHP 6,000 - 10,000", desc: "Fashion-forward modern style." },
    { name: "Viktor and Rolf Spicebomb Extreme", family: "Oriental Spicy", type: "EDP", notes: "Tobacco, vanilla, spices", store: "Rustan's Makati", price: 10500, priceRange: "PHP 6,500 - 10,500", desc: "Heavier richer Spicebomb." },
    { name: "Van Cleef and Arpels Midnight in Paris", family: "Oriental Spicy", type: "EDP", notes: "Leather, tonka bean, incense", store: "Rustan's Makati", price: 11000, priceRange: "PHP 7,000 - 11,000", desc: "Romantic mysterious evening profile." },
    { name: "Wood Sage and Sea Salt - Jo Malone", family: "Aromatic Marine", type: "Cologne", notes: "Sea breeze, herbs", store: "Greenbelt 5, Rustan's Makati", price: 10000, priceRange: "PHP 6,500 - 10,000", desc: "Airy natural sea-breeze scent." },
    { name: "White Musk - The Body Shop", family: "Musky Floral", type: "EDT", notes: "Soft musk, powdery florals", store: "SM Mall of Asia, SM Megamall, The Body Shop stores", price: 3000, priceRange: "PHP 1,500 - 3,000", desc: "Gentle skin-like daily scent." },
    { name: "Wanted by Night - Azzaro", family: "Oriental Spicy", type: "EDP", notes: "Cinnamon, tobacco, vanilla", store: "SM Aura Premier, SM Megamall", price: 8000, priceRange: "PHP 5,000 - 8,000", desc: "Dark warm seductive night scent." },
    { name: "Weekend for Men - Burberry", family: "Citrus Aromatic", type: "EDT", notes: "Lemon, melon, sandalwood", store: "SM Department Store, Landmark Makati", price: 6000, priceRange: "PHP 3,500 - 6,000", desc: "Relaxed clean weekend fragrance." },
    { name: "Wave - Hollister", family: "Aquatic Fruity", type: "Eau de Cologne", notes: "Ocean air, citrus, driftwood", store: "SM Megamall, SM North EDSA select lifestyle stores", price: 3500, priceRange: "PHP 2,000 - 3,500", desc: "Beachy youthful sporty scent." },
    { name: "Xeryus Rouge - Givenchy", family: "Oriental Woody", type: "EDT", notes: "Cactus, cedar, amber", store: "Rustan's Makati", price: 7000, priceRange: "PHP 4,000 - 7,000", desc: "Unique bold exotic masculine." },
    { name: "Xerjoff Naxos - Xerjoff", family: "Oriental Gourmand", type: "EDP", notes: "Honey, cinnamon, vanilla, tobacco", store: "Greenbelt 5 niche boutiques", price: 20000, priceRange: "PHP 12,000 - 20,000+", desc: "High-end sweet tobacco niche." },
    { name: "Xerjoff Erba Pura - Xerjoff", family: "Fruity Oriental", type: "EDP", notes: "Citrus, musk, vanilla", store: "Greenbelt 5 niche section", price: 20000, priceRange: "PHP 12,000 - 20,000+", desc: "Powerful fruity musky longevity." },
    { name: "Xeryus - Givenchy", family: "Aromatic Woody", type: "EDT", notes: "Green notes, spices, woods", store: "Rustan's Makati", price: 6500, priceRange: "PHP 4,000 - 6,500", desc: "Classic vintage masculine style." },
    { name: "XOXO Fragrance - XOXO", family: "Floral Fruity", type: "EDP", notes: "Berries, florals, vanilla", store: "SM Department Store, Landmark Makati", price: 3000, priceRange: "PHP 1,500 - 3,000", desc: "Playful affordable daily scent." },
    { name: "Yves Saint Laurent Y - YSL", family: "Aromatic Fougere", type: "EDP", notes: "Apple, sage, amber woods", store: "Greenbelt 5, Rustan's Makati", price: 10500, priceRange: "PHP 6,500 - 10,500", desc: "Sharp confident modern masculine." },
    { name: "Yves Saint Laurent Y Le Parfum - YSL", family: "Aromatic Woody", type: "Parfum", notes: "Woody spicy profile", store: "Rustan's Makati, Greenbelt 5", price: 13000, priceRange: "PHP 8,000 - 13,000", desc: "Deeper darker Y variant." },
    { name: "Youth-Dew - Estee Lauder", family: "Oriental Spicy", type: "EDP", notes: "Spices, amber, florals", store: "Rustan's Makati", price: 6000, priceRange: "PHP 3,500 - 6,000", desc: "Classic warm vintage perfume." },
    { name: "Yellow Diamond - Versace", family: "Floral Fruity", type: "EDT", notes: "Pear, lemon, flowers", store: "SM Aura, Rustan's Makati", price: 7500, priceRange: "PHP 4,500 - 7,500", desc: "Bright sparkling feminine scent." },
    { name: "Yara - Lattafa", family: "Sweet Gourmand Floral", type: "EDP", notes: "Vanilla, fruits, musk", store: "Shopee/Lazada official stores, select SM fragrance kiosks", price: 3500, priceRange: "PHP 1,500 - 3,500", desc: "Affordable creamy sweet profile." },
    { name: "Zino Davidoff - Davidoff", family: "Oriental Woody", type: "EDT", notes: "Lavender, rose, sandalwood", store: "SM Department Store, Landmark Makati", price: 6000, priceRange: "PHP 3,500 - 6,000", desc: "Vintage elegant masculine." },
    { name: "Zegna Uomo - Ermenegildo Zegna", family: "Woody Aromatic", type: "EDT", notes: "Citrus, vetiver, musk", store: "Greenbelt 5, Rustan's Makati", price: 9000, priceRange: "PHP 6,000 - 9,000", desc: "Refined clean professional scent." },
    { name: "Zen - Shiseido", family: "Floral Woody", type: "EDP", notes: "Citrus, rose, amber", store: "SM Aura, Rustan's Makati", price: 8000, priceRange: "PHP 5,000 - 8,000", desc: "Balanced calm feminine fragrance." },
    { name: "Zoologist Beaver - Zoologist", family: "Woody Aquatic", type: "EDP", notes: "Aquatic woods, musk, earth notes", store: "Greenbelt 5 niche fragrance boutiques", price: 18000, priceRange: "PHP 10,000 - 18,000+", desc: "Artistic unusual niche scent." },
    { name: "Zest of Verbena - L'Occitane", family: "Citrus Aromatic", type: "EDT", notes: "Lemon verbena", store: "SM Aura, Greenbelt 5, L'Occitane stores", price: 7000, priceRange: "PHP 4,000 - 7,000", desc: "Bright refreshing herbal-citrus profile." }
  ].map(normalizePerfume);

  function saveSeed() {
    try {
      const payload = {
        version: STORAGE_VERSION,
        perfumes: perfumeSeed
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (error) {
      return shufflePerfumes(perfumeSeed);
    }
    return shufflePerfumes(perfumeSeed);
  }

  function getPerfumes() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return saveSeed();

      const parsed = JSON.parse(raw);
      if (!parsed || parsed.version !== STORAGE_VERSION || !Array.isArray(parsed.perfumes)) {
        return saveSeed();
      }

      return shufflePerfumes(parsed.perfumes.map(normalizePerfume));
    } catch (error) {
      return shufflePerfumes(saveSeed());
    }
  }

  window.ScentSecretsDB = {
    STORAGE_KEY,
    STORAGE_VERSION,
    perfumeSeed,
    saveSeed,
    getPerfumes
  };
})(window);
