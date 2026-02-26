// ═══════════════════════════════════════════════
//  WordForge — UI Orchestrator (main.js)
//  Wires game engine, renderer, and all DOM elements
// ═══════════════════════════════════════════════

'use strict';

// ── State ──
const UIState = {
  gameActive: false,
  darkMode: false,
  colorblind: false,
};

// ── Persistent stats via localStorage ──
function loadStats() {
  try {
    return JSON.parse(localStorage.getItem('wf_stats') || '{}');
  } catch { return {}; }
}
function saveStats(s) {
  try { localStorage.setItem('wf_stats', JSON.stringify(s)); } catch {}
}
function getStats() {
  return Object.assign({
    played: 0, streak: 0, bestScore: 0,
    totalCompletion: 0, grades: [], lastPlayedDate: null,
  }, loadStats());
}
function updateStats(result, date) {
  const s = getStats();
  const today = date;
  if (s.lastPlayedDate !== today) {
    s.played++;
    const yesterday = new Date(new Date(today).getTime() - 86400000).toISOString().slice(0, 10);
    s.streak = s.lastPlayedDate === yesterday ? s.streak + 1 : 1;
    s.lastPlayedDate = today;
  }
  if (result.score > s.bestScore) s.bestScore = result.score;
  s.totalCompletion = Math.round(((s.totalCompletion * (s.played - 1)) + result.pct) / s.played);
  s.grades = [result.grade, ...(s.grades || [])].slice(0, 14);
  saveStats(s);
  return s;
}

// ── Achievement definitions ──
const ACHIEVEMENTS = [
  { id: 'first_word',   emoji: '⚡', label: 'First Word',    check: r => r.found >= 1 },
  { id: 'five_words',   emoji: '🔥', label: '5 Words',       check: r => r.found >= 5 },
  { id: 'rare_word',    emoji: '💎', label: 'Rare Word',      check: r => r.wordsFound.some(w => w.rarity === 'rare') },
  { id: 'speedster',    emoji: '⚡', label: 'Speed Demon',    check: r => r.timeLeft >= 30 },
  { id: 'scholar',      emoji: '📚', label: 'Scholar',        check: r => r.pct >= 75 },
  { id: 'chrome_master',emoji: '🏆', label: 'Chrome Master',  check: r => r.pct >= 100 && r.timeLeft >= 15 },
  { id: 'long_word',    emoji: '🔭', label: '7+ Letter Word', check: r => r.wordsFound.some(w => w.word.length >= 7) },
  { id: 'daily_player', emoji: '📅', label: 'Daily Player',   check: (r, s) => s.streak >= 3 },
];

function loadUnlocked() {
  try { return new Set(JSON.parse(localStorage.getItem('wf_ach') || '[]')); } catch { return new Set(); }
}
function saveUnlocked(set) {
  try { localStorage.setItem('wf_ach', JSON.stringify([...set])); } catch {}
}

// ── DOM refs ──
const $  = id => document.getElementById(id);
const startScreen  = $('start-screen');
const resultModal  = $('result-modal');
const lbModal      = $('lb-modal');
const statsModal   = $('stats-modal');
const helpModal    = $('help-modal');

// ── Renderer & Game ──
let renderer, game;

function initRenderer() {
  const gridCanvas    = $('grid-canvas');
  const overlayCanvas = $('overlay-canvas');
  const wrap          = $('grid-wrap');

  renderer = new WordForgeRenderer(gridCanvas, overlayCanvas);

  // Layout on size
  const relayout = () => {
    const size = Math.min(wrap.clientWidth, wrap.clientHeight, 440);
    renderer.layout(size, size);
  };
  relayout();
  window.addEventListener('resize', relayout);

  renderer.startLoop();
}

function initGame() {
  game = new WordForgeGame(renderer);

  game.onWordFound = (word, pts, rarity) => {
    showToast(`✓ ${word.toUpperCase()} +${pts}`, 'success');
    addWordToList(word, pts, rarity);
    updateProgress();
    checkAchievements(null, null, word, pts, rarity);
    animateScore(pts);
  };

  game.onWordInvalid = (word, reason) => {
    showToast(reason, 'error');
    $('current-word-bar').classList.add('shake');
    setTimeout(() => $('current-word-bar').classList.remove('shake'), 400);
  };

  game.onGameEnd = (result) => {
    showResultModal(result);
  };

  game.onTimerTick = (t) => {
    updateTimer(t);
  };

  game.onScoreUpdate = (score) => {
    $('score-val').textContent = score.toLocaleString();
  };

  game.onCurrentWordChange = (word) => {
    updateCurrentWord(word);
  };
}

// ── Starfield ──
function initStarfield() {
  const canvas = $('starfield');
  const ctx = canvas.getContext('2d');
  const stars = [];
  const STAR_COUNT = 120;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random(),
      y: Math.random(),
      r: 0.4 + Math.random() * 1.2,
      speed: 0.00002 + Math.random() * 0.00008,
      alpha: 0.2 + Math.random() * 0.6,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.5 + Math.random() * 2,
    });
  }

  let lastT = 0;
  function frame(t) {
    const dt = t - lastT; lastT = t;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const W = canvas.width, H = canvas.height;

    for (const s of stars) {
      s.x += s.speed * dt * 0.02;
      if (s.x > 1) s.x = 0;
      const twinkle = 0.6 + 0.4 * Math.sin(t * 0.001 * s.twinkleSpeed + s.twinklePhase);
      ctx.beginPath();
      ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180,220,255,${s.alpha * twinkle})`;
      ctx.fill();
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

// ── Timer UI ──
const TIMER_CIRCUMFERENCE = 207.3;
function updateTimer(t) {
  const ring = $('timer-ring');
  const num  = $('timer-num');
  const frac = t / 60;
  ring.style.strokeDashoffset = TIMER_CIRCUMFERENCE * (1 - frac);

  if (t <= 10) {
    ring.style.stroke = 'var(--timer-danger)';
    num.style.color = 'var(--pink)';
    if (t <= 5) num.classList.add('shake');
  } else if (t <= 20) {
    ring.style.stroke = 'var(--timer-warn)';
    num.style.color = 'var(--gold)';
  } else {
    ring.style.stroke = 'var(--timer-ok)';
    num.style.color = '';
  }

  num.textContent = t;
}

// ── Word list ──
function addWordToList(word, pts, rarity) {
  const list  = $('word-list');
  const empty = $('word-list-empty');
  empty.style.display = 'none';

  const item = document.createElement('div');
  item.className = 'word-found-item';
  item.setAttribute('role', 'listitem');
  item.innerHTML = `
    <span class="wfi-word rarity-${rarity}">${word.toUpperCase()}</span>
    <span class="wfi-pts">+${pts}</span>
  `;
  list.prepend(item);
}

function clearWordList() {
  $('word-list').innerHTML = '';
  $('word-list-empty').style.display = '';
}

// ── Progress bar ──
function updateProgress() {
  if (!game || !game.puzzle) return;
  const found = game.wordsFound.size;
  const total = game.puzzle.targetWords.length;
  const pct   = (found / total) * 100;
  $('progress-bar').style.width = pct + '%';
  $('found-count').textContent = found;
}

// ── Score animation ──
function animateScore(pts) {
  const el = $('score-val');
  el.style.transform = 'scale(1.3)';
  el.style.color = 'var(--cyan)';
  el.style.textShadow = '0 0 20px var(--cyan-glow)';
  setTimeout(() => {
    el.style.transform = '';
    el.style.color = '';
    el.style.textShadow = '';
    el.style.transition = 'all 0.3s ease';
  }, 300);
}

// ── Current word ──
function updateCurrentWord(word) {
  const bar = $('current-word-bar');
  const txt = $('current-word-text');
  const hint = $('cw-hint');

  if (!word) {
    txt.textContent = '';
    txt.className = 'cw-text';
    bar.classList.remove('has-word');
    hint.textContent = 'DRAG OR TYPE';
    return;
  }

  txt.textContent = word;
  bar.classList.add('has-word');
  hint.textContent = `${word.length} LETTERS — ENTER TO SUBMIT`;

  // Check validity for color feedback
  if (word.length >= 3 && WordForgePuzzle.TRIE.isWord(word.toLowerCase())) {
    txt.className = 'cw-text valid';
  } else {
    txt.className = 'cw-text';
  }
}

// ── Achievements ──
function buildAchievementGrid() {
  const grid = $('ach-grid');
  const unlocked = loadUnlocked();
  grid.innerHTML = '';
  for (const a of ACHIEVEMENTS) {
    const el = document.createElement('div');
    el.className = 'ach-badge' + (unlocked.has(a.id) ? ' unlocked' : '');
    el.textContent = a.emoji;
    el.title = a.label + (unlocked.has(a.id) ? ' ✓' : ' (locked)');
    el.setAttribute('aria-label', a.label + (unlocked.has(a.id) ? ' - Unlocked' : ' - Locked'));
    grid.appendChild(el);
  }
}

function checkAchievements(result, stats, singleWord, pts, rarity) {
  const unlocked = loadUnlocked();
  const newlyUnlocked = [];

  for (const a of ACHIEVEMENTS) {
    if (unlocked.has(a.id)) continue;

    let earned = false;
    if (result) {
      earned = a.check(result, stats);
    } else if (singleWord) {
      // Check word-level achievements
      if (a.id === 'first_word') earned = true;
      if (a.id === 'rare_word' && rarity === 'rare') earned = true;
      if (a.id === 'long_word' && singleWord.length >= 7) earned = true;
    }

    if (earned) {
      unlocked.add(a.id);
      newlyUnlocked.push(a);
    }
  }

  if (newlyUnlocked.length) {
    saveUnlocked(unlocked);
    buildAchievementGrid();
    for (const a of newlyUnlocked) {
      setTimeout(() => showToast(`🏅 Unlocked: ${a.label}!`, 'info'), 600);
    }
  }
}

// ── Toast ──
let toastTimer;
function showToast(msg, type = 'info') {
  const t = $('toast');
  clearTimeout(toastTimer);
  t.textContent = msg;
  t.className = `show ${type}`;
  toastTimer = setTimeout(() => t.className = '', 2200);
}

// ── Modal helpers ──
function openModal(el) {
  el.classList.add('open');
  const close = el.querySelector('.modal-close');
  if (close) close.focus();
}
function closeModal(el) {
  el.classList.remove('open');
}
function bindClose(backdropId, closeBtnId) {
  const backdrop = $(backdropId);
  const closeBtn = $(closeBtnId);
  if (closeBtn) closeBtn.addEventListener('click', () => closeModal(backdrop));
  backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(backdrop); });
  backdrop.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(backdrop); });
}

// ── Result modal ──
function showResultModal(result) {
  const date = new Date().toISOString().slice(0, 10);
  const stats = updateStats(result, date);

  // Check remaining achievements
  checkAchievements(result, stats, null, null, null);

  // Fill modal
  $('result-grade').textContent = result.grade;
  $('result-grade').style.color = result.gradeColor;
  $('result-grade').style.textShadow = `0 0 30px ${result.gradeColor}`;
  $('result-score').textContent = result.score.toLocaleString();
  $('result-sub').textContent = `${result.baseScore} base + ${result.speedBonus} speed bonus`;
  $('rs-found').textContent = result.found;
  $('rs-pct').textContent = result.pct + '%';
  $('rs-bonus').textContent = '+' + result.speedBonus;

  // Best word
  const bestWord = result.wordsFound.sort((a, b) => b.pts - a.pts)[0];
  $('rs-best').textContent = bestWord ? bestWord.word.toUpperCase() : '—';

  // Word chips
  const wordsEl = $('result-words');
  wordsEl.innerHTML = '';
  for (const w of result.wordsFound.sort((a, b) => b.pts - a.pts)) {
    const chip = document.createElement('div');
    chip.className = `rw-chip ${w.rarity}`;
    chip.textContent = w.word.toUpperCase();
    wordsEl.appendChild(chip);
  }

  // Fire victory confetti
  const gridWrap = $('grid-wrap');
  const rect = gridWrap.getBoundingClientRect();
  const cx = (rect.left + rect.right) / 2;
  const cy = (rect.top + rect.bottom) / 2;
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      renderer.spawnConfetti(
        cx + (Math.random() - 0.5) * 200,
        cy + (Math.random() - 0.5) * 150,
        30
      );
    }, i * 80);
  }

  setTimeout(() => openModal(resultModal), 600);

  // Submit to leaderboard API (if backend available)
  submitScore(result);
}

// ── Leaderboard modal ──
function showLeaderboard() {
  const list = $('lb-list');
  list.innerHTML = '';

  // Try to fetch from API; fall back to local demo data
  const demoData = [
    { rank:1, name:'ChromeMaster',  score:4280, grade:'A' },
    { rank:2, name:'WordWizard',    score:3950, grade:'A' },
    { rank:3, name:'NeonHunter',    score:3640, grade:'B' },
    { rank:4, name:'You',           score: (getStats().bestScore || 0), grade: getStats().grades[0] || '—' },
  ];

  const API_BASE = window.WF_API || '';
  const date = new Date().toISOString().slice(0, 10);

  fetch(`${API_BASE}/api/leaderboard/${date}`)
    .then(r => r.json())
    .then(data => renderLb(data.slice(0, 10)))
    .catch(() => renderLb(demoData));

  function renderLb(rows) {
    for (const row of rows) {
      const el = document.createElement('div');
      el.className = 'lb-row';
      el.setAttribute('role', 'listitem');
      el.innerHTML = `
        <span class="lb-rank${row.rank <= 3 ? ' top' : ''}">${row.rank === 1 ? '🥇' : row.rank === 2 ? '🥈' : row.rank === 3 ? '🥉' : row.rank}</span>
        <span class="lb-name">${row.name}</span>
        <span class="lb-score">${row.score.toLocaleString()}</span>
        <span class="lb-grade" style="color:${gradeColor(row.grade)}">${row.grade}</span>
      `;
      list.appendChild(el);
    }
  }

  openModal(lbModal);
}

function gradeColor(g) {
  return { A:'#00FF88', B:'#00D4FF', C:'#FFD700', D:'#FF8C42', F:'#FF6B9D' }[g] || '#888';
}

// ── Stats modal ──
function showStats() {
  const s = getStats();
  $('stat-played').textContent = s.played;
  $('stat-streak').textContent = s.streak;
  $('stat-best-score').textContent = s.bestScore.toLocaleString();
  $('stat-avg').textContent = s.totalCompletion + '%';
  const gh = $('grade-history');
  gh.textContent = s.grades.length ? s.grades.slice(0, 10).join(' ') : '—';
  openModal(statsModal);
}

// ── Share ──
function shareResult() {
  if (!game) return;
  const result = game._buildResult?.() || { score:0, grade:'—', pct:0 };
  const date = new Date().toISOString().slice(0, 10);
  const emoji = result.grade === 'A' ? '🏆' : result.grade === 'B' ? '⭐' : '✅';
  const text = `WordForge ${date}\nGrade: ${result.grade} ${emoji}\nScore: ${result.score}\nCompletion: ${result.pct}%\nPlay at: ${location.href}`;

  if (navigator.share) {
    navigator.share({ title: 'WordForge', text }).catch(() => copyToClipboard(text));
  } else {
    copyToClipboard(text);
    showToast('Result copied to clipboard!', 'info');
  }
}

function copyToClipboard(text) {
  try {
    navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
}

// ── API submission ──
function submitScore(result) {
  const API_BASE = window.WF_API || '';
  if (!API_BASE) return;
  const userId = getUserId();
  const date = new Date().toISOString().slice(0, 10);
  fetch(`${API_BASE}/api/score`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
      puzzleDate: date,
      score: result.score,
      wordsFound: result.found,
      timeLeft: result.timeLeft,
      grade: result.grade,
    }),
  }).catch(() => {});
}

function getUserId() {
  let id = localStorage.getItem('wf_uid');
  if (!id) {
    id = 'anon_' + Math.random().toString(36).slice(2, 10);
    localStorage.setItem('wf_uid', id);
  }
  return id;
}

// ── Ripple effect ──
function addRipple(btn) {
  btn.addEventListener('click', function(e) {
    const r = document.createElement('span');
    r.className = 'ripple';
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    r.style.width = r.style.height = size + 'px';
    r.style.left = (e.clientX - rect.left - size / 2) + 'px';
    r.style.top  = (e.clientY - rect.top - size / 2) + 'px';
    btn.appendChild(r);
    setTimeout(() => r.remove(), 500);
  });
}

// ── Theme toggle ──
function initTheme() {
  // Check saved preference
  const saved = localStorage.getItem('wf_theme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark-mode');
    UIState.darkMode = true;
    $('btn-theme').textContent = '☀️';
  }

  $('btn-theme').addEventListener('click', () => {
    UIState.darkMode = !UIState.darkMode;
    document.body.classList.toggle('dark-mode', UIState.darkMode);
    localStorage.setItem('wf_theme', UIState.darkMode ? 'dark' : 'light');
    $('btn-theme').textContent = UIState.darkMode ? '☀️' : '🌙';
  });

  $('btn-colorblind').addEventListener('click', () => {
    UIState.colorblind = !UIState.colorblind;
    document.body.classList.toggle('colorblind', UIState.colorblind);
    showToast(UIState.colorblind ? 'Colorblind mode on' : 'Colorblind mode off', 'info');
  });
}

// ── Game start flow ──
function startGame() {
  // Load puzzle
  const seed = WordForgePuzzle.getDailySeed();
  const puzzle = game.loadPuzzle(seed);

  // Update UI
  $('total-count').textContent = puzzle.targetWords.length;
  $('found-count').textContent = '0';
  $('progress-bar').style.width = '0%';
  $('score-val').textContent = '0';
  $('score-sub').textContent = puzzle.targetWords.length + ' words to find';
  clearWordList();
  updateTimer(60);

  // Reset current word display
  updateCurrentWord('');
  $('current-word-text').textContent = '';
  $('cw-hint').textContent = 'DRAG OR TYPE';

  // Hide start screen
  startScreen.style.opacity = '0';
  startScreen.style.pointerEvents = 'none';
  setTimeout(() => startScreen.style.display = 'none', 300);

  UIState.gameActive = true;

  // Start game
  game.start();
}

function retryGame() {
  closeModal(resultModal);
  clearWordList();
  startGame();
}

// ── Boot ──
document.addEventListener('DOMContentLoaded', () => {
  initStarfield();
  initTheme();
  initRenderer();
  initGame();
  buildAchievementGrid();

  // Button bindings
  $('btn-start').addEventListener('click', () => {
    startGame();
    addRipple($('btn-start'));
  });

  $('btn-submit').addEventListener('click', () => {
    if (game && game.phase === 'playing') game.submitCurrentWord();
  });
  addRipple($('btn-submit'));

  $('btn-clear').addEventListener('click', () => {
    if (game) game._clearInput();
  });

  $('btn-retry').addEventListener('click', retryGame);
  $('btn-share').addEventListener('click', shareResult);

  $('btn-leaderboard').addEventListener('click', showLeaderboard);
  $('btn-stats').addEventListener('click', showStats);
  $('btn-help').addEventListener('click', () => openModal(helpModal));

  bindClose('lb-modal',    'lb-close');
  bindClose('stats-modal', 'stats-close');
  bindClose('help-modal',  'help-close');

  // Result modal close on backdrop click
  resultModal.addEventListener('click', e => {
    if (e.target === resultModal) closeModal(resultModal);
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal(resultModal);
      closeModal(lbModal);
      closeModal(statsModal);
      closeModal(helpModal);
    }
  });

  // Add ripple to all buttons
  document.querySelectorAll('.btn').forEach(addRipple);

  // Start screen transitions
  startScreen.style.transition = 'opacity 0.3s ease';
});
