/* ============================================================
   Notes & collections — content data
   Edit this file to add books, films, thoughts, or photographs.
   notes.js renders it; nothing here needs to be duplicated in HTML.

   books[]    title, originalTitle?, subtitle?, author, year, edition?, cover,
              language, note (your own words, shown when present), link (optional)
   films[]    title, originalTitle?, creator, year, type, tags[], poster, note, link?
   thoughts[] date (YYYY-MM-DD), text (a sentence or a short paragraph), tags[]
   longer[]   longer notes: title, summary, tags[], status ("In draft" or a date), link,
              featured? (true = wide card shown above the others)
   photos[]   src, w, h, date, camera, lens, caption, place (leave "" when unknown)

   Display caps in notes.js: the shelf shows the first 10 books; the gallery shows
   the 10 newest photographs from each calendar year. Extra entries stay in this
   file and simply are not rendered.

   Cover and poster art is used for identification only; rights remain with the
   publishers and studios.
   ============================================================ */
window.COLLECTIONS = {
  books: [
  {
    "title": "Lectures on Modern Western Thought",
    "originalTitle": "刘擎西方现代思想讲义",
    "author": "Liu Qing (刘擎)",
    "year": 2021,
    "cover": "assets/notes/books/liu-qing-modern-western-thought.jpg",
    "language": "zh",
    "note": "",
    "link": ""
  },
  {
    "title": "Simple Rules",
    "subtitle": "How to Thrive in a Complex World",
    "author": "Donald Sull & Kathleen M. Eisenhardt",
    "year": 2015,
    "cover": "assets/notes/books/simple-rules.jpg",
    "language": "en",
    "note": "",
    "link": ""
  },
  {
    "title": "I Deliver Parcels in Beijing",
    "originalTitle": "我在北京送快递",
      "author": "Hu Anyan (胡安焉)",
    "year": 2023,
    "cover": "assets/notes/books/beijing-delivery.jpg",
    "language": "zh",
    "note": "",
    "link": ""
  },
  {
    "title": "The Myth of Sisyphus",
    "originalTitle": "Le Mythe de Sisyphe",
      "author": "Albert Camus",
    "year": 1942,
    "edition": "Folio essais, Gallimard",
    "cover": "assets/notes/books/mythe-de-sisyphe.jpg",
    "language": "fr",
    "note": "",
    "link": ""
  },
  {
    "title": "When We Cease to Understand the World",
    "originalTitle": "当我们不再理解世界 · Un verdor terrible",
    "author": "Benjamín Labatut",
    "year": 2022,
    "cover": "assets/notes/books/when-we-cease-to-understand-the-world.jpg",
    "language": "zh",
    "note": "",
    "link": ""
  },
  {
    "title": "Work, Consumerism and the New Poor",
    "author": "Zygmunt Bauman",
    "year": 1998,
    "cover": "assets/notes/books/work-consumerism-new-poor.jpg",
    "language": "en",
    "note": "",
    "link": ""
  },
  {
    "title": "The Vocation Lectures",
    "originalTitle": "学术与政治 · Wissenschaft als Beruf",
    "subtitle": "Science as a Vocation · Politics as a Vocation",
      "author": "Max Weber",
    "year": 2005,
    "edition": "三联书店",
    "cover": "assets/notes/books/weber-vocation-lectures.jpg",
    "language": "zh",
    "note": "",
    "link": ""
  }
],

  films: [
  {
    "title": "Dark Matter",
    "creator": "Apple TV+",
    "year": "2024",
    "type": "series",
    "tags": [
      "sci-fi"
    ],
    "poster": "assets/notes/films/dark-matter.jpg",
    "note": ""
  },
  {
    "title": "Brush Up Life",
    "originalTitle": "ブラッシュアップライフ · 重启人生",
    "creator": "Nippon TV",
    "year": "2023",
    "type": "series",
    "tags": [
      "comedy"
    ],
    "poster": "assets/notes/films/brush-up-life.jpg",
    "note": ""
  },
  {
    "title": "The Capture",
    "creator": "BBC",
    "year": "2019 –",
    "type": "series",
    "tags": [
      "thriller"
    ],
    "poster": "assets/notes/films/the-capture.jpg",
    "note": ""
  },
  {
    "title": "When Life Gives You Tangerines",
    "originalTitle": "폭싹 속았수다 · 苦尽甘来遇见你",
    "creator": "Netflix",
    "year": "2025",
    "type": "series",
    "tags": [
      "drama"
    ],
    "poster": "assets/notes/films/when-life-gives-you-tangerines.jpg",
    "note": ""
  },
  {
    "title": "Chef's Table",
    "creator": "Netflix",
    "year": "2015 –",
    "type": "documentary series",
    "tags": [
      "food"
    ],
    "poster": "assets/notes/films/chefs-table.jpg",
    "note": ""
  },
  {
    "title": "Pluribus",
    "creator": "Apple TV+",
    "year": "2025",
    "type": "series",
    "tags": [
      "sci-fi"
    ],
    "poster": "assets/notes/films/pluribus.jpg",
    "note": ""
  },
  {
    "title": "Severance",
    "creator": "Apple TV+",
    "year": "2022 –",
    "type": "series",
    "tags": [
      "sci-fi",
      "thriller"
    ],
    "poster": "assets/notes/films/severance.jpg",
    "note": ""
  },
  {
    "title": "Arcane",
    "creator": "Netflix",
    "year": "2021 – 2024",
    "type": "animated series",
    "tags": [
      "animation"
    ],
    "poster": "assets/notes/films/arcane.jpg",
    "note": ""
  },
  {
    "title": "Beef",
    "creator": "Netflix",
    "year": "2023 –",
    "type": "series",
    "tags": [
      "dark comedy"
    ],
    "poster": "assets/notes/films/beef.jpg",
    "note": ""
  },
  {
    "title": "Reply 1988",
    "originalTitle": "응답하라 1988",
    "creator": "tvN",
    "year": "2015 – 2016",
    "type": "series",
    "tags": [
      "family drama"
    ],
    "poster": "assets/notes/films/reply-1988.jpg",
    "note": ""
  },
  {
    "title": "The Truman Show",
    "creator": "Peter Weir",
    "year": "1998",
    "type": "film",
    "tags": [
      "drama"
    ],
    "poster": "assets/notes/films/the-truman-show.jpg",
    "note": ""
  }
],

  // Short fragments. Add newest first, e.g.
  // { "date": "2026-10-01", "text": "…", "tags": ["research"] }
  thoughts: [],

  longer: [
  {
    "title": "From Interaction to Outcome",
    "summary": "My research philosophy. Functional foods, the gut microbiome, clinical trials, and antibodies kept returning me to one question: why does an interaction produce one outcome rather than another, and can we change it? With the five-stage cycle I use to work on it: observe, understand, model and predict, validate, modulate.",
    "tags": [
      "Research philosophy",
      "Essay"
    ],
    "status": "Oct 2026",
    "featured": true,
    "link": "notes/from-interaction-to-outcome.html"
  }
],

  photos: [
  {
    "src": "assets/notes/photos/12-27-25_4877.jpg",
    "w": 1200,
    "h": 800,
    "date": "2025-12-27",
    "camera": "Sony ILCE-7M4",
    "lens": "FE 35mm F1.8",
    "caption": "",
    "place": ""
  },
  {
    "src": "assets/notes/photos/dsc00045-3.jpg",
    "w": 1200,
    "h": 800,
    "date": "2024-12-07",
    "camera": "Sony ILCE-7M4",
    "lens": "FE 35mm F1.8",
    "caption": "",
    "place": ""
  },
  {
    "src": "assets/notes/photos/dsc00300.jpg",
    "w": 1200,
    "h": 800,
    "date": "2024-12-23",
    "camera": "Sony ILCE-7M4",
    "lens": "FE 35mm F1.8",
    "caption": "",
    "place": ""
  },
  {
    "src": "assets/notes/photos/dsc00326.jpg",
    "w": 1200,
    "h": 800,
    "date": "2024-12-19",
    "camera": "Sony ILCE-7M4",
    "lens": "FE 35mm F1.8",
    "caption": "",
    "place": ""
  },
  {
    "src": "assets/notes/photos/adg1728.jpg",
    "w": 1200,
    "h": 800,
    "date": "2025-01-07",
    "camera": "Sony ILCE-7M4",
    "lens": "FE 35mm F1.8",
    "caption": "",
    "place": ""
  },
  {
    "src": "assets/notes/photos/adg2173.jpg",
    "w": 1200,
    "h": 1200,
    "date": "2025-01-19",
    "camera": "Sony ILCE-7M4",
    "lens": "FE 35mm F1.8",
    "caption": "",
    "place": ""
  },
  {
    "src": "assets/notes/photos/adg2522.jpg",
    "w": 800,
    "h": 1200,
    "date": "2025-06-23",
    "camera": "Sony ILCE-7M4",
    "lens": "FE 35mm F1.8",
    "caption": "",
    "place": ""
  },
  {
    "src": "assets/notes/photos/tjy1246.jpg",
    "w": 1200,
    "h": 800,
    "date": "2026-07-03",
    "camera": "Sony ILCE-7M4",
    "lens": "FE 35mm F1.8",
    "caption": "",
    "place": ""
  },
  {
    "src": "assets/notes/photos/tjy1365.jpg",
    "w": 1200,
    "h": 800,
    "date": "2026-07-22",
    "camera": "Sony ILCE-7M4",
    "lens": "FE 35mm F1.8",
    "caption": "",
    "place": ""
  },
  {
    "src": "assets/notes/photos/tjy1519.jpg",
    "w": 1200,
    "h": 800,
    "date": "2026-07-23",
    "camera": "Sony ILCE-7M4",
    "lens": "FE 35mm F1.8",
    "caption": "",
    "place": ""
  },
  {
    "src": "assets/notes/photos/tjy1596.jpg",
    "w": 1200,
    "h": 800,
    "date": "2026-07-24",
    "camera": "Sony ILCE-7M4",
    "lens": "FE 35mm F1.8",
    "caption": "",
    "place": ""
  },
  {
    "src": "assets/notes/photos/tjy1638.jpg",
    "w": 1200,
    "h": 800,
    "date": "2026-07-26",
    "camera": "Sony ILCE-7M4",
    "lens": "FE 35mm F1.8",
    "caption": "",
    "place": ""
  }
]
};
