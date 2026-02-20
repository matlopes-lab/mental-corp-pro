# Mental Corp Pro — COPSOQ II Questionnaire SPA

## Project Overview

Single Page Application (SPA) simulating a psychosocial diagnostic wizard based on the **COPSOQ II** (Copenhagen Psychosocial Questionnaire, version II). Built with pure HTML, CSS, and JavaScript — no frameworks or dependencies.

**Live URL:** https://matlopes-lab.github.io/mental-corp-pro/
**Repository:** https://github.com/matlopes-lab/mental-corp-pro

## Architecture

```
mental-corp-pro/
├── index.html      # SPA structure with 3 views (welcome, wizard, results)
├── styles.css      # Full styling (mobile-first, beige/green/gold palette)
├── questions.js    # COPSOQ II questions, classification logic, recommendations
├── app.js          # Wizard engine, scoring, donut chart, rendering
└── CLAUDE.md       # This file
```

### Three-view SPA flow:
1. **Welcome Page** — "Diagnóstico Inicial" with 6 dimensions listed (only "Exigências do Trabalho" is active, rest are locked)
2. **Wizard Page** — 14 questions with progress bar, auto-advance on selection (350ms delay)
3. **Results Page** — Donut chart with gradient, sub-dimension score cards, and contextual recommendations with external links

## COPSOQ II Implementation

### Domain: Exigências Laborais (Q1–Q14)

Only 1 of 6 domains is active. The other 5 appear locked on the welcome page.

| Sub-dimension | Questions | Description |
|---|---|---|
| Exigências Quantitativas | Q1–Q3 | Workload, time pressure, overtime |
| Ritmo de Trabalho | Q4 | Work pace pressure |
| Exigências Cognitivas | Q5–Q7 | Attention, ideas, decisions |
| Exigências Emocionais | Q8–Q10 | Emotional demands |
| Esconder Emoções | Q11–Q14 | Emotional suppression |

**Note:** Q9 and Q10 are marked as "X" (placeholder) in the original report. Standard COPSOQ II emotional demand items were used instead.

### Scoring Methodology

- **Scale:** Likert 1–5 (Nunca → Sempre)
- **Conversion:** `Score 0–100 = (Média - 1) × 25`
- **Direction:** No inversion — high values = higher risk
- **Display:** Results show inverted well-being score (100 - risk) for the donut chart

### Risk Classification (0–100 scale)

| Score | Likert | Classification |
|---|---|---|
| 0–25 | 1 | Risco Muito Baixo |
| 25–50 | 2 | Risco Baixo |
| 50–75 | 3 | Risco Moderado |
| 75–100 | ≥4 | Risco Elevado |

### Well-being Labels (inverted for display)

| Risk Level | Well-being Label |
|---|---|
| Elevado | Muito Baixo |
| Moderado | Moderado |
| Baixo | Bom |
| Muito Baixo | Excelente |

## Recommendations

Each risk level triggers different recommendations. Buttons are `<a>` links with placeholder URLs (`#slug`) ready to be replaced with real external URLs.

| Placeholder URL | Recommendation |
|---|---|
| `#rotina-saudavel` | Manter Rotina Saudável |
| `#desenvolvimento-pessoal` | Desenvolvimento Pessoal |
| `#gestao-de-tempo` | Gestão de Tempo |
| `#pausas-ativas` | Pausas Ativas |
| `#tecnicas-respiracao` | Técnicas de Respiração |
| `#falar-com-rh` | Falar com RH |
| `#apoio-profissional` | Apoio Profissional |
| `#revisao-de-carga` | Revisão de Carga |

## Deployment

- Hosted on **GitHub Pages** from `main` branch
- Auto-deploys on push to `main`
- Custom domain not yet configured (ready via CNAME when needed)

## Reference Documents

- `Relatorio_Tecnico_COPSOQ_II 2.docx` — Full technical report with methodology, questions, and interpretation
- `Matriz_Tecnica_COPSOQ_II_Versao_Longa.pdf` — Matrix mapping 119 items across 6 domains and 29 dimensions

## Pending / Next Steps

- [ ] Replace placeholder recommendation URLs with real external links
- [ ] Get actual text for Q9 and Q10 (Exigências Emocionais)
- [ ] Unlock remaining 5 COPSOQ II domains (Organização, Relações, Valores, Interface Trabalho-Indivíduo, Saúde e Bem-estar)
- [ ] Configure custom domain for GitHub Pages
- [ ] Add analytics/tracking for demo usage
