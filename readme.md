# ⚡ WordForge — Daily Word Discovery Game

> Futuristic 5×5 letter grid word game. Drag to connect letters, race the 60-second clock, forge rare words for bonus points.

---

## Live Demo

Deploy to GitHub Pages (frontend-only) or Vercel + Railway (full-stack).

---

## Features

- **5×5 drag-to-connect grid** — touch/mouse drag, diagonal connections, no cell reuse
- **Keyboard typing fallback** — type letters, auto-highlights valid grid path  
- **60-second timed runs** with circular countdown ring
- **Trie-based dictionary** — 4000+ words, instant validation, prefix pruning
- **Daily rotating puzzles** — seeded by date, same puzzle for all players
- **Scoring** — length × rarity multiplier (1×/2×/5×) + speed bonus
- **Grade A–F** — based on % of target words found
- **Achievements** — 8 unlockable badges persisted in localStorage
- **Personal stats** — streak counter, best score, grade history
- **Leaderboard API** — global daily scores (requires backend)
- **Dark/light mode** + colorblind palette toggle
- **PWA-ready** — installable, offline-capable
- **Particle effects** — laser path trace, confetti, screen shake

---

## Folder Structure

```
wordforge/
├── frontend/
│   ├── index.html          ← SPA entry point
│   ├── manifest.json       ← PWA manifest
│   ├── css/
│   │   └── style.css       ← Full design system (CSS vars)
│   └── js/
│       ├── puzzle.js       ← Trie, word validation, puzzle generation
│       ├── renderer.js     ← Canvas renderer (grid, laser, particles)
│       ├── game.js         ← Core game logic, input, scoring
│       └── main.js         ← UI orchestrator, modals, stats
├── backend/
│   ├── server.js           ← Express API
│   └── package.json
└── README.md
```

---

## Quick Start (Frontend Only)

No backend needed to play. Just open `frontend/index.html` in a browser, or deploy to GitHub Pages:

```bash
# 1. Create GitHub repo, push the /frontend folder as root
# 2. Settings → Pages → Branch: main → Folder: / (root)
# 3. Visit https://yourusername.github.io/wordforge/
```

---

## Full-Stack Setup

### Backend

```bash
cd backend
npm install
npm start
# → Running on http://localhost:3001
```

### Connect frontend to backend

In `frontend/js/main.js`, set:
```js
window.WF_API = 'http://localhost:3001';
```

Or set it globally in `index.html` before the scripts:
```html
<script>window.WF_API = 'https://your-backend.railway.app';</script>
```

---

## Deploy

### Option A — GitHub Pages (frontend-only, free)

1. Push `wordforge/frontend/` to a GitHub repo root
2. Settings → Pages → main branch → root
3. Done ✓

### Option B — Vercel (frontend) + Railway (backend)

**Frontend on Vercel:**
```bash
npx vercel --prod
# Point root directory to: wordforge/frontend
```

**Backend on Railway:**
```bash
# Push backend/ to Railway
# Set PORT env var if needed
railway up
```

Set `window.WF_API` in `index.html` to your Railway URL.

### Option C — Docker (optional)

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY backend/ ./backend/
COPY frontend/ ./frontend/
WORKDIR /app/backend
RUN npm ci --production
EXPOSE 3001
CMD ["node", "server.js"]
```

---

## Customization

### Swap chrome → neon dark mode (5 lines in style.css)

```css
:root {
  --bg:      #050810;
  --surface: #0D1520;
  --text:    #E0F4FF;
  --cyan:    #00FFDD;
  --pink:    #FF00AA;
}
```

### Add more words

Edit `WORD_LIST_RAW` in `puzzle.js` — it's a space-separated string of all valid words.

### Change game duration

In `game.js`:
```js
const GAME_DURATION = 90; // seconds
```

### Add Postgres/Supabase leaderboard

Replace the in-memory `scores` Map in `server.js` with a Supabase client:
```js
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
```

---

## SQL Schema (Postgres / Supabase)

```sql
CREATE TABLE puzzles (
  date DATE PRIMARY KEY,
  seed INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE scores (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  puzzle_date DATE NOT NULL REFERENCES puzzles(date),
  score INTEGER NOT NULL DEFAULT 0,
  grade CHAR(1),
  words_found INTEGER DEFAULT 0,
  time_left INTEGER DEFAULT 0,
  submitted_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, puzzle_date)
);

CREATE INDEX idx_scores_date_score ON scores(puzzle_date, score DESC);
CREATE INDEX idx_scores_user ON scores(user_id);
```

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/puzzle/:date` | Get puzzle seed for date |
| POST | `/api/score` | Submit score |
| GET | `/api/leaderboard/:date` | Top 100 for date |
| GET | `/api/user/:id/stats` | User stats & history |

---

## License

MIT — use freely, attribution appreciated.
