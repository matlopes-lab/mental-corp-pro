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
1. **Welcome Page** — "Diagnóstico Inicial" with 6 dimensions listed (Exigências do Trabalho and Organização are active, rest are locked)
2. **Wizard Page** — 27 questions (14 + 13) with progress bar, auto-advance on selection (350ms delay), dynamic subtitle per domain
3. **Results Page** — Donut chart with gradient, sub-dimension score cards, and contextual recommendations with external links

## COPSOQ II Implementation

### Domain 1: Exigências Laborais (Q1–Q14) — Inversion: No

| Sub-dimension | Questions | Description |
|---|---|---|
| Exigências Quantitativas | Q1–Q3 | Workload, time pressure, overtime |
| Ritmo de Trabalho | Q4 | Work pace pressure |
| Exigências Cognitivas | Q5–Q7 | Attention, ideas, decisions |
| Exigências Emocionais | Q8–Q10 | Emotional demands |
| Esconder Emoções | Q11–Q14 | Emotional suppression |

**Note:** Q9 and Q10 are marked as "X" (placeholder) in the original report. Standard COPSOQ II emotional demand items were used instead.

### Domain 2: Organização do Trabalho e Conteúdo (Q15–Q27) — Inversion: Yes

| Sub-dimension | Questions | Description |
|---|---|---|
| Influência no Trabalho | Q15–Q18 | Influence over work decisions |
| Possib. Desenvolvimento | Q19–Q21 | Development opportunities |
| Variação no Trabalho | Q22 | Work variety |
| Previsibilidade | Q23–Q24 | Information and predictability |
| Transparência do Papel | Q25–Q27 | Role clarity |

2 of 6 domains are active. The other 4 appear locked on the welcome page.

### Scoring Methodology

- **Scale:** Likert 1–5 (Nunca → Sempre)
- **Conversion:** `Score 0–100 = (Média - 1) × 25`
- **Domain 1 direction:** No inversion — high values = higher risk
- **Domain 2 direction:** Inverted — high raw values = protective, risk = `100 - rawScore`
- **Overall:** Mean of domain risk scores → inverted to well-being for donut chart display

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
- [ ] Unlock remaining 4 COPSOQ II domains (Relações, Valores, Interface Trabalho-Indivíduo, Saúde e Bem-estar)
- [ ] Configure custom domain for GitHub Pages
- [ ] Add analytics/tracking for demo usage
