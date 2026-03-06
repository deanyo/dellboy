let allDrinks = [], wheelDrinks = [], confirmed = [], candidates = [];

fetch('drinks.json')
  .then(r => r.json())
  .then(data => {
    confirmed = data.confirmed;
    candidates = data.candidates || [];
    allDrinks = [...confirmed, ...candidates];
    wheelDrinks = confirmed.filter(d => d.show_on_wheel);

    const countEl = document.getElementById('drink-count');
    if (countEl) countEl.textContent = `${confirmed.length} confirmed · ${candidates.length} unconfirmed`;
    if (document.getElementById('wheel')) initWheel();
    if (document.getElementById('drinks-grid')) renderDrinks();
  });

/* ── Wheel (confirmed + show_on_wheel only) ── */
const COLORS = [
  '#b3f4f3', '#e192ef', '#b1f2a7', '#f0c27b', '#e965a5',
  '#7ec8e3', '#c4b5fd', '#fca5a5', '#86efac', '#fde68a',
  '#a78bfa', '#67e8f9', '#f9a8d4', '#bef264', '#fdba74'
];

let rotation = 0, spinning = false, canvas, ctx;

function initWheel() {
  canvas = document.getElementById('wheel');
  ctx = canvas.getContext('2d');
  drawWheel(0);
  document.getElementById('spin-btn').addEventListener('click', spin);
}

function drawWheel(rot) {
  const cx = canvas.width / 2, cy = canvas.height / 2, r = cx - 10;
  const n = wheelDrinks.length, arc = (2 * Math.PI) / n;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rot);

  for (let i = 0; i < n; i++) {
    const a = i * arc;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, r, a, a + arc);
    ctx.closePath();
    ctx.fillStyle = COLORS[i % COLORS.length];
    ctx.fill();
    ctx.strokeStyle = '#14111b';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.save();
    ctx.rotate(a + arc / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#14111b';
    ctx.font = '600 8px "JetBrains Mono"';
    const name = wheelDrinks[i].drink.length > 24
      ? wheelDrinks[i].drink.slice(0, 22) + '…' : wheelDrinks[i].drink;
    ctx.fillText(name, r - 12, 3);
    ctx.restore();
  }
  ctx.restore();

  ctx.beginPath();
  ctx.arc(cx, cy, 28, 0, 2 * Math.PI);
  ctx.fillStyle = '#1a1621';
  ctx.fill();
  ctx.strokeStyle = '#b3f4f3';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = '#b3f4f3';
  ctx.font = '600 16px "Space Grotesk"';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🍸', cx, cy);
}

function spin() {
  if (spinning) return;
  spinning = true;
  document.getElementById('spin-btn').disabled = true;
  document.getElementById('result').classList.add('hidden');

  const extra = 5 + Math.random() * 5;
  const target = extra * 2 * Math.PI + Math.random() * 2 * Math.PI;
  const duration = 4000, start = performance.now();

  function animate(now) {
    const t = Math.min((now - start) / duration, 1);
    rotation = target * (1 - Math.pow(1 - t, 3));
    drawWheel(rotation);
    if (t < 1) requestAnimationFrame(animate);
    else { spinning = false; document.getElementById('spin-btn').disabled = false; showResult(rotation); }
  }
  requestAnimationFrame(animate);
}

function fmtEpisodes(d) {
  if (!d.episodes) return '';
  const seen = new Set();
  return d.episodes.map(e => {
    if (seen.has(e.title)) return '';
    seen.add(e.title);
    return `<span class="badge season">${e.title}</span>`;
  }).join('');
}

function showResult(finalRotation) {
  const n = wheelDrinks.length, arc = (2 * Math.PI) / n;
  const norm = ((Math.PI * 1.5) - (finalRotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  const d = wheelDrinks[Math.floor(norm / arc) % n];

  document.getElementById('result-drink').textContent = d.drink;
  document.getElementById('result-meta').innerHTML =
    fmtEpisodes(d) + (d.ordered_by ? `<span class="badge">${d.ordered_by}</span>` : '');
  document.getElementById('result-notes').textContent = d.notes;
  document.getElementById('result-quote').textContent = '🍸 lovely jubbly!';
  document.getElementById('result').classList.remove('hidden');
}

/* ── List ── */
function renderDrinks(filter = 'all') {
  const grid = document.getElementById('drinks-grid');
  if (!grid) return;

  const list = filter === 'confirmed' ? confirmed :
    filter === 'community' ? candidates : allDrinks;

  grid.innerHTML = list.map((d, i) => {
    const isCand = d.status === 'community_candidate';
    return `
      <div class="drink-card ${isCand ? 'community' : ''}" style="animation-delay: ${i * 0.04}s">
        <div class="drink-name">${d.drink}</div>
        <div class="drink-meta">
          ${isCand ? '<span class="badge unconfirmed">unconfirmed</span>' : ''}
          ${fmtEpisodes(d)}
          ${d.ordered_by && d.ordered_by !== 'Unconfirmed' ? `<span class="badge">${d.ordered_by}</span>` : ''}
        </div>
        <div class="drink-notes">${d.notes}</div>
      </div>`;
  }).join('');

  document.getElementById('drink-count').textContent =
    filter === 'all' ? `${confirmed.length} confirmed · ${candidates.length} unconfirmed` :
    `${list.length} drinks`;
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderDrinks(btn.dataset.filter);
  });
});
