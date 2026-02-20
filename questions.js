/**
 * COPSOQ II — Domínio 1: Exigências Laborais (Q1–Q14)
 *
 * Escala Likert 1–5:
 *   1 = Nunca / Quase nunca
 *   2 = Raramente
 *   3 = Às vezes
 *   4 = Frequentemente
 *   5 = Sempre
 *
 * Conversão para escala 0–100:  (Média - 1) × 25
 * Inversão: Não (valores elevados = maior risco)
 *
 * 5 sub-dimensões:
 *   1.1 Exigências Quantitativas  (Q1–Q3)
 *   1.2 Ritmo de Trabalho         (Q4)
 *   1.3 Exigências Cognitivas     (Q5–Q7)
 *   1.4 Exigências Emocionais     (Q8–Q10)
 *   1.5 Esconder Emoções          (Q11–Q14)
 */

const SCALE_OPTIONS = [
  "Nunca / Quase nunca",
  "Raramente",
  "Às vezes",
  "Frequentemente",
  "Sempre",
];

const QUESTIONS = [
  // 1.1 Exigências Quantitativas
  {
    id: 1,
    dimension: "quantitativas",
    text: "A sua carga de trabalho acumula-se por ser mal distribuída?",
    options: SCALE_OPTIONS,
  },
  {
    id: 2,
    dimension: "quantitativas",
    text: "Com que frequência não tem tempo para completar todas as tarefas do seu trabalho?",
    options: SCALE_OPTIONS,
  },
  {
    id: 3,
    dimension: "quantitativas",
    text: "Precisa fazer horas-extra?",
    options: SCALE_OPTIONS,
  },

  // 1.2 Ritmo de Trabalho
  {
    id: 4,
    dimension: "ritmo",
    text: "Precisa trabalhar muito rapidamente?",
    options: SCALE_OPTIONS,
  },

  // 1.3 Exigências Cognitivas
  {
    id: 5,
    dimension: "cognitivas",
    text: "O seu trabalho exige a sua atenção constante?",
    options: SCALE_OPTIONS,
  },
  {
    id: 6,
    dimension: "cognitivas",
    text: "O seu trabalho requer que seja bom a propor novas ideias?",
    options: SCALE_OPTIONS,
  },
  {
    id: 7,
    dimension: "cognitivas",
    text: "O seu trabalho exige que tome decisões difíceis?",
    options: SCALE_OPTIONS,
  },

  // 1.4 Exigências Emocionais
  {
    id: 8,
    dimension: "emocionais",
    text: "O seu trabalho exige emocionalmente de si?",
    options: SCALE_OPTIONS,
  },
  {
    id: 9,
    dimension: "emocionais",
    text: "É confrontado(a) com situações que o(a) afetam emocionalmente?",
    options: SCALE_OPTIONS,
  },
  {
    id: 10,
    dimension: "emocionais",
    text: "O seu trabalho coloca-o(a) em situações emocionalmente perturbadoras?",
    options: SCALE_OPTIONS,
  },

  // 1.5 Exigências para Esconder Emoções
  {
    id: 11,
    dimension: "esconder_emocoes",
    text: "Precisa esconder sentimentos no trabalho?",
    options: SCALE_OPTIONS,
  },
  {
    id: 12,
    dimension: "esconder_emocoes",
    text: "Deve aparentar emoções diferentes das que realmente sente?",
    options: SCALE_OPTIONS,
  },
  {
    id: 13,
    dimension: "esconder_emocoes",
    text: "Evita demonstrar irritação ou frustração?",
    options: SCALE_OPTIONS,
  },
  {
    id: 14,
    dimension: "esconder_emocoes",
    text: "Necessita manter postura emocional controlada?",
    options: SCALE_OPTIONS,
  },
];

/**
 * Sub-dimensões para exibição nos cards de resultado.
 */
const SUB_DIMENSIONS = [
  { key: "quantitativas",    label: "Exig. Quantitativas", questionIds: [1, 2, 3]       },
  { key: "ritmo",            label: "Ritmo de Trabalho",   questionIds: [4]             },
  { key: "cognitivas",       label: "Exig. Cognitivas",    questionIds: [5, 6, 7]       },
  { key: "emocionais",       label: "Exig. Emocionais",    questionIds: [8, 9, 10]      },
  { key: "esconder_emocoes", label: "Esconder Emoções",    questionIds: [11, 12, 13, 14] },
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
