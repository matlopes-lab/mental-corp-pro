/**
 * COPSOQ II — Domínios 1 & 2
 *
 * Escala Likert 1–5:
 *   1 = Nunca / Quase nunca
 *   2 = Raramente
 *   3 = Às vezes
 *   4 = Frequentemente
 *   5 = Sempre
 *
 * Conversão para escala 0–100:  (Média - 1) × 25
 *
 * Domínio 1 — Exigências Laborais: Inversão = Não (alto = risco)
 * Domínio 2 — Organização do Trabalho: Inversão = Sim (alto = protetor → inverter para risco)
 *
 * Domínio 1 — 5 sub-dimensões:
 *   1.1 Exigências Quantitativas  (Q1–Q3)
 *   1.2 Ritmo de Trabalho         (Q4)
 *   1.3 Exigências Cognitivas     (Q5–Q7)
 *   1.4 Exigências Emocionais     (Q8–Q10)
 *   1.5 Esconder Emoções          (Q11–Q14)
 *
 * Domínio 2 — 5 sub-dimensões:
 *   2.1 Influência no Trabalho       (Q15–Q18)
 *   2.2 Possibilidades de Desenvolvimento (Q19–Q21)
 *   2.3 Variação no Trabalho         (Q22)
 *   2.4 Previsibilidade              (Q23–Q24)
 *   2.5 Transparência do Papel       (Q25–Q27)
 */

const SCALE_OPTIONS = [
  "Nunca / Quase nunca",
  "Raramente",
  "Às vezes",
  "Frequentemente",
  "Sempre",
];

/**
 * Metadata por domínio.
 */
const DOMAINS = [
  { key: "exigencias",   label: "Exigências do Trabalho",          subtitle: "Exigências do Trabalho",          inverted: false },
  { key: "organizacao",  label: "Organização do Trabalho e Conteúdo", subtitle: "Organização do Trabalho", inverted: true  },
];

const QUESTIONS = [
  // ===== DOMÍNIO 1: Exigências Laborais (Q1–Q14) =====

  // 1.1 Exigências Quantitativas
  {
    id: 1,
    domain: "exigencias",
    dimension: "quantitativas",
    inverted: false,
    text: "A sua carga de trabalho acumula-se por ser mal distribuída?",
    options: SCALE_OPTIONS,
  },
  {
    id: 2,
    domain: "exigencias",
    dimension: "quantitativas",
    inverted: false,
    text: "Com que frequência não tem tempo para completar todas as tarefas do seu trabalho?",
    options: SCALE_OPTIONS,
  },
  {
    id: 3,
    domain: "exigencias",
    dimension: "quantitativas",
    inverted: false,
    text: "Precisa fazer horas-extra?",
    options: SCALE_OPTIONS,
  },

  // 1.2 Ritmo de Trabalho
  {
    id: 4,
    domain: "exigencias",
    dimension: "ritmo",
    inverted: false,
    text: "Precisa trabalhar muito rapidamente?",
    options: SCALE_OPTIONS,
  },

  // 1.3 Exigências Cognitivas
  {
    id: 5,
    domain: "exigencias",
    dimension: "cognitivas",
    inverted: false,
    text: "O seu trabalho exige a sua atenção constante?",
    options: SCALE_OPTIONS,
  },
  {
    id: 6,
    domain: "exigencias",
    dimension: "cognitivas",
    inverted: false,
    text: "O seu trabalho requer que seja bom a propor novas ideias?",
    options: SCALE_OPTIONS,
  },
  {
    id: 7,
    domain: "exigencias",
    dimension: "cognitivas",
    inverted: false,
    text: "O seu trabalho exige que tome decisões difíceis?",
    options: SCALE_OPTIONS,
  },

  // 1.4 Exigências Emocionais
  {
    id: 8,
    domain: "exigencias",
    dimension: "emocionais",
    inverted: false,
    text: "O seu trabalho exige emocionalmente de si?",
    options: SCALE_OPTIONS,
  },
  {
    id: 9,
    domain: "exigencias",
    dimension: "emocionais",
    inverted: false,
    text: "É confrontado(a) com situações que o(a) afetam emocionalmente?",
    options: SCALE_OPTIONS,
  },
  {
    id: 10,
    domain: "exigencias",
    dimension: "emocionais",
    inverted: false,
    text: "O seu trabalho coloca-o(a) em situações emocionalmente perturbadoras?",
    options: SCALE_OPTIONS,
  },

  // 1.5 Exigências para Esconder Emoções
  {
    id: 11,
    domain: "exigencias",
    dimension: "esconder_emocoes",
    inverted: false,
    text: "Precisa esconder sentimentos no trabalho?",
    options: SCALE_OPTIONS,
  },
  {
    id: 12,
    domain: "exigencias",
    dimension: "esconder_emocoes",
    inverted: false,
    text: "Deve aparentar emoções diferentes das que realmente sente?",
    options: SCALE_OPTIONS,
  },
  {
    id: 13,
    domain: "exigencias",
    dimension: "esconder_emocoes",
    inverted: false,
    text: "Evita demonstrar irritação ou frustração?",
    options: SCALE_OPTIONS,
  },
  {
    id: 14,
    domain: "exigencias",
    dimension: "esconder_emocoes",
    inverted: false,
    text: "Necessita manter postura emocional controlada?",
    options: SCALE_OPTIONS,
  },

  // ===== DOMÍNIO 2: Organização do Trabalho e Conteúdo (Q15–Q27) =====

  // 2.1 Influência no Trabalho
  {
    id: 15,
    domain: "organizacao",
    dimension: "influencia",
    inverted: true,
    text: "Tem um elevado grau de influência no seu trabalho?",
    options: SCALE_OPTIONS,
  },
  {
    id: 16,
    domain: "organizacao",
    dimension: "influencia",
    inverted: true,
    text: "Participa na escolha das pessoas com quem trabalha?",
    options: SCALE_OPTIONS,
  },
  {
    id: 17,
    domain: "organizacao",
    dimension: "influencia",
    inverted: true,
    text: "Pode influenciar a quantidade de trabalho que lhe compete?",
    options: SCALE_OPTIONS,
  },
  {
    id: 18,
    domain: "organizacao",
    dimension: "influencia",
    inverted: true,
    text: "Participa na escolha de colegas ou organização do trabalho?",
    options: SCALE_OPTIONS,
  },

  // 2.2 Possibilidades de Desenvolvimento
  {
    id: 19,
    domain: "organizacao",
    dimension: "desenvolvimento",
    inverted: true,
    text: "O seu trabalho exige que tenha iniciativa?",
    options: SCALE_OPTIONS,
  },
  {
    id: 20,
    domain: "organizacao",
    dimension: "desenvolvimento",
    inverted: true,
    text: "O seu trabalho permite-lhe aprender coisas novas?",
    options: SCALE_OPTIONS,
  },
  {
    id: 21,
    domain: "organizacao",
    dimension: "desenvolvimento",
    inverted: true,
    text: "O seu trabalho permite-lhe usar as suas habilidades?",
    options: SCALE_OPTIONS,
  },

  // 2.3 Variação no Trabalho
  {
    id: 22,
    domain: "organizacao",
    dimension: "variacao",
    inverted: true,
    text: "O seu trabalho é variado?",
    options: SCALE_OPTIONS,
  },

  // 2.4 Previsibilidade
  {
    id: 23,
    domain: "organizacao",
    dimension: "previsibilidade",
    inverted: true,
    text: "É informado com antecedência sobre decisões importantes?",
    options: SCALE_OPTIONS,
  },
  {
    id: 24,
    domain: "organizacao",
    dimension: "previsibilidade",
    inverted: true,
    text: "Recebe toda a informação necessária para fazer bem o seu trabalho?",
    options: SCALE_OPTIONS,
  },

  // 2.5 Transparência do Papel
  {
    id: 25,
    domain: "organizacao",
    dimension: "transparencia",
    inverted: true,
    text: "O seu trabalho apresenta objetivos claros?",
    options: SCALE_OPTIONS,
  },
  {
    id: 26,
    domain: "organizacao",
    dimension: "transparencia",
    inverted: true,
    text: "Sabe exactamente quais as suas responsabilidades?",
    options: SCALE_OPTIONS,
  },
  {
    id: 27,
    domain: "organizacao",
    dimension: "transparencia",
    inverted: true,
    text: "Sabe exactamente o que é esperado de si?",
    options: SCALE_OPTIONS,
  },
];

/**
 * Sub-dimensões para exibição nos cards de resultado.
 */
const SUB_DIMENSIONS = [
  // Domínio 1
  { key: "quantitativas",    label: "Exig. Quantitativas",   domain: "exigencias",  questionIds: [1, 2, 3]       },
  { key: "ritmo",            label: "Ritmo de Trabalho",     domain: "exigencias",  questionIds: [4]             },
  { key: "cognitivas",       label: "Exig. Cognitivas",      domain: "exigencias",  questionIds: [5, 6, 7]       },
  { key: "emocionais",       label: "Exig. Emocionais",      domain: "exigencias",  questionIds: [8, 9, 10]      },
  { key: "esconder_emocoes", label: "Esconder Emoções",      domain: "exigencias",  questionIds: [11, 12, 13, 14] },
  // Domínio 2
  { key: "influencia",       label: "Influência no Trabalho",    domain: "organizacao", questionIds: [15, 16, 17, 18] },
  { key: "desenvolvimento",  label: "Possib. Desenvolvimento",   domain: "organizacao", questionIds: [19, 20, 21]     },
  { key: "variacao",         label: "Variação no Trabalho",      domain: "organizacao", questionIds: [22]             },
  { key: "previsibilidade",  label: "Previsibilidade",           domain: "organizacao", questionIds: [23, 24]         },
  { key: "transparencia",    label: "Transparência do Papel",    domain: "organizacao", questionIds: [25, 26, 27]     },
];

/**
 * Classificação de Risco (escala 0–100, após conversão)
 *
 *   0–25  → Risco Muito Baixo  (verde)
 *  25–50  → Risco Baixo        (verde claro)
 *  50–75  → Risco Moderado     (amarelo/dourado)
 *  75–100 → Risco Elevado      (vermelho)
 */
const CLASSIFICATION = [
  { max: 25,  label: "Muito Baixo", color: "#5c8a6e", level: "muito_baixo" },
  { max: 50,  label: "Baixo",       color: "#7da88d", level: "baixo"       },
  { max: 75,  label: "Moderado",    color: "#c4a265", level: "moderado"    },
  { max: 100, label: "Elevado",     color: "#c45a3c", level: "elevado"     },
];

function classifyScore(score) {
  for (const c of CLASSIFICATION) {
    if (score <= c.max) return c;
  }
  return CLASSIFICATION[CLASSIFICATION.length - 1];
}

/**
 * Recomendações baseadas no nível de risco.
 */
const RECOMMENDATIONS = {
  muito_baixo: [
    { title: "Manter Rotina Saudável",  desc: "Continue com seus hábitos positivos",   btn: "Ver dicas", iconClass: "green", icon: "🧘", url: "#rotina-saudavel" },
    { title: "Desenvolvimento Pessoal",  desc: "Explore novas habilidades",             btn: "Explorar",  iconClass: "gold",  icon: "📚", url: "#desenvolvimento-pessoal" },
  ],
  baixo: [
    { title: "Gestão de Tempo",          desc: "Otimize sua rotina de trabalho",        btn: "Ver dicas", iconClass: "green", icon: "⏱️", url: "#gestao-de-tempo" },
    { title: "Pausas Ativas",            desc: "Incorpore micro-pausas no seu dia",     btn: "Iniciar",   iconClass: "gold",  icon: "🔄", url: "#pausas-ativas" },
  ],
  moderado: [
    { title: "Técnicas de Respiração",   desc: "Reduza o estresse agora",               btn: "Iniciar",   iconClass: "green", icon: "🧘", url: "#tecnicas-respiracao" },
    { title: "Falar com RH",             desc: "Conecte-se com a equipe",               btn: "Agendar",   iconClass: "gold",  icon: "💬", url: "#falar-com-rh" },
  ],
  elevado: [
    { title: "Apoio Profissional",       desc: "Busque orientação especializada",       btn: "Agendar",   iconClass: "green", icon: "🩺", url: "#apoio-profissional" },
    { title: "Revisão de Carga",         desc: "Avalie redistribuição de demandas",     btn: "Solicitar",  iconClass: "gold",  icon: "📋", url: "#revisao-de-carga" },
    { title: "Técnicas de Respiração",   desc: "Alívio imediato do estresse",           btn: "Iniciar",   iconClass: "green", icon: "🧘", url: "#tecnicas-respiracao" },
  ],
};
