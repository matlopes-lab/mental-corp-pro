/* ==================== STATE ==================== */
let currentQuestion = 0;
const answers = {};

/* ==================== NAVIGATION ==================== */
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  window.scrollTo(0, 0);
}

function doLogin() {
  showPage('page-welcome');
}

function startDiagnosis() {
  currentQuestion = 0;
  showPage('page-wizard');
  renderQuestion();
}

/* ==================== WIZARD ==================== */
function renderQuestion() {
  const q = QUESTIONS[currentQuestion];
  const total = QUESTIONS.length;

  // Progress
  const pct = Math.round(((currentQuestion) / total) * 100);
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-text').textContent = pct + '% Concluído';

  // Question text
  document.getElementById('question-text').textContent = q.text;

  // Options
  const list = document.getElementById('options-list');
  list.innerHTML = '';

  q.options.forEach((opt, idx) => {
    const div = document.createElement('div');
    div.className = 'option-item' + (answers[q.id] === idx ? ' selected' : '');
    div.onclick = () => selectOption(q.id, idx);
    div.innerHTML = `
      <span class="option-radio"></span>
      <span class="option-label">${opt}</span>
      <span class="option-check">
        <svg viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-7" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
    `;
    list.appendChild(div);
  });

  // Nav buttons
  document.getElementById('btn-prev').disabled = currentQuestion === 0;

  const btnNext = document.getElementById('btn-next');
  if (currentQuestion === total - 1) {
    btnNext.textContent = 'Finalizar';
  } else {
    btnNext.textContent = 'Próxima';
  }
}

function selectOption(questionId, optionIndex) {
  answers[questionId] = optionIndex;
  renderQuestion();

  // Auto-advance after a brief delay so the user sees their selection
  setTimeout(() => {
    if (currentQuestion < QUESTIONS.length - 1) {
      currentQuestion++;
      renderQuestion();
    } else {
      finishDiagnosis();
    }
  }, 350);
}

function nextQuestion() {
  const q = QUESTIONS[currentQuestion];
  if (answers[q.id] === undefined) return;

  if (currentQuestion < QUESTIONS.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    finishDiagnosis();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
}

/* ==================== SCORING (COPSOQ II) ==================== */
/**
 * Conversão COPSOQ II:
 *   Escala Likert 1–5 (opção index 0–4 → valor 1–5)
 *   Score 0–100 = (Média - 1) × 25
 *   Domínio Exigências Laborais: Inversão = Não
 *     → Valores altos = maior risco
 */
function calculateScores() {
  // Score global do domínio
  let sum = 0;
  QUESTIONS.forEach(q => {
    const likert = (answers[q.id] ?? 0) + 1; // index 0–4 → likert 1–5
    sum += likert;
  });
  const mean = sum / QUESTIONS.length;
  const domainScore = Math.round((mean - 1) * 25);

  // Sub-dimensões
  const subScores = SUB_DIMENSIONS.map(dim => {
    let dimSum = 0;
    dim.questionIds.forEach(qId => {
      const likert = (answers[qId] ?? 0) + 1;
      dimSum += likert;
    });
    const dimMean = dimSum / dim.questionIds.length;
    const score = Math.round((dimMean - 1) * 25);
    return { ...dim, score };
  });

  return { domainScore, subScores };
}

/* ==================== RESULTS ==================== */
/**
 * domainScore = risco (0–100, alto = ruim)
 * wellbeingScore = bem-estar (0–100, alto = bom) = 100 - risco
 */
function finishDiagnosis() {
  const { domainScore, subScores } = calculateScores();
  const wellbeingScore = 100 - domainScore;
  const riskClassification = classifyScore(domainScore);

  // Mapa de risco → label de bem-estar
  const wellbeingLabels = {
    elevado:     "Muito Baixo",
    moderado:    "Moderado",
    baixo:       "Bom",
    muito_baixo: "Excelente",
  };

  showPage('page-results');

  // Donut center: mostra nível de BEM-ESTAR (invertido)
  document.getElementById('donut-value').textContent = wellbeingLabels[riskClassification.level];
  document.getElementById('donut-score').textContent = `Pontuação atual: ${wellbeingScore}/100`;

  // Draw donut (usa score de bem-estar para preenchimento visual)
  drawDonut(wellbeingScore, subScores);

  // Dimension score cards (mostra risco por sub-dimensão)
  renderDimensionScores(subScores);

  // Recommendations (baseadas no nível de risco)
  renderRecommendations(riskClassification.level);
}

/* ==================== DONUT CHART ==================== */
function drawDonut(wellbeingScore, subScores) {
  const canvas = document.getElementById('donut-chart');
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  canvas.width = 220 * dpr;
  canvas.height = 220 * dpr;
  canvas.style.width = '220px';
  canvas.style.height = '220px';
  ctx.scale(dpr, dpr);

  const cx = 110, cy = 110, radius = 90, lineWidth = 18;
  const startOffset = -Math.PI / 2;
  const fullCircle = 2 * Math.PI;

  // Background track (full gray ring)
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, fullCircle);
  ctx.strokeStyle = '#e8e5e0';
  ctx.lineWidth = lineWidth;
  ctx.stroke();

  // Filled arc — proportional to wellbeing score, no gaps
  const filledArc = fullCircle * (wellbeingScore / 100);
  if (filledArc < 0.01) return;

  // Draw with gradient: green (#5c8a6e) → gold (#c4a265) → tan (#b8a88a)
  const steps = 80;
  const arcPerStep = filledArc / steps;

  for (let i = 0; i < steps; i++) {
    const t = i / steps; // 0 → 1
    const a1 = startOffset + i * arcPerStep;
    const a2 = a1 + arcPerStep + 0.005; // tiny overlap to avoid sub-pixel gaps
    const color = gradientColor(t);

    ctx.beginPath();
    ctx.arc(cx, cy, radius, a1, a2);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'butt';
    ctx.stroke();
  }

  // Round caps at start and end
  drawRoundCap(ctx, cx, cy, radius, startOffset, lineWidth, gradientColor(0));
  drawRoundCap(ctx, cx, cy, radius, startOffset + filledArc, lineWidth, gradientColor(1));
}

/** Interpolate between green → gold → tan based on t (0–1) */
function gradientColor(t) {
  const colors = [
    { r: 92,  g: 138, b: 110 }, // #5c8a6e green
    { r: 196, g: 162, b: 101 }, // #c4a265 gold
    { r: 184, g: 168, b: 138 }, // #b8a88a tan
  ];

  const scaled = t * (colors.length - 1);
  const i = Math.min(Math.floor(scaled), colors.length - 2);
  const f = scaled - i;

  const c1 = colors[i];
  const c2 = colors[i + 1];
  const r = Math.round(c1.r + (c2.r - c1.r) * f);
  const g = Math.round(c1.g + (c2.g - c1.g) * f);
  const b = Math.round(c1.b + (c2.b - c1.b) * f);
  return `rgb(${r},${g},${b})`;
}

/** Draw a round cap (small circle) at a given angle on the ring */
function drawRoundCap(ctx, cx, cy, radius, angle, lineWidth, color) {
  const x = cx + radius * Math.cos(angle);
  const y = cy + radius * Math.sin(angle);
  ctx.beginPath();
  ctx.arc(x, y, lineWidth / 2, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

/* ==================== DIMENSION SCORE CARDS ==================== */
function renderDimensionScores(subScores) {
  const container = document.getElementById('dimension-scores');
  container.innerHTML = '';

  subScores.forEach(dim => {
    const statusText = dim.score <= 25
      ? 'Risco muito baixo'
      : dim.score <= 50
        ? 'Risco baixo'
        : dim.score <= 75
          ? 'Risco moderado'
          : 'Risco elevado';

    const iconHtml = dim.score <= 50
      ? '<span style="color:#5c8a6e">&#10004;</span>'
      : dim.score <= 75
        ? '<span style="color:#c4a265">&#9888;</span>'
        : '<span style="color:#c45a3c">&#9888;</span>';

    const card = document.createElement('div');
    card.className = 'dim-score-card';
    card.innerHTML = `
      <div class="dim-icon">${iconHtml}</div>
      <div class="dim-name">${dim.label}</div>
      <div class="dim-value">Score: ${dim.score}</div>
      <div class="dim-status">${statusText}</div>
    `;
    container.appendChild(card);
  });
}

/* ==================== RECOMMENDATIONS ==================== */
function renderRecommendations(level) {
  const container = document.getElementById('recommendations');
  container.innerHTML = '';

  const recs = RECOMMENDATIONS[level] || RECOMMENDATIONS.moderado;
  recs.forEach(rec => {
    const card = document.createElement('div');
    card.className = 'rec-card';
    card.innerHTML = `
      <div class="rec-icon ${rec.iconClass}">${rec.icon}</div>
      <div class="rec-content">
        <div class="rec-title">${rec.title}</div>
        <div class="rec-desc">${rec.desc}</div>
        <a href="${rec.url}" class="btn-rec" target="_blank" rel="noopener">${rec.btn}</a>
      </div>
    `;
    container.appendChild(card);
  });
}
