/** MVP: «% совпадения с рекомендациями» для шаблонов — детерминированно от тематики и текста диалога. */

const TEMPLATES = [
  "Понял(а) вас. Уточните, пожалуйста, номер полиса и дату страхового события.",
  "Спасибо! Сейчас проверю информацию по договору и вернусь с ответом.",
  "Чтобы помочь быстрее, пришлите, пожалуйста, фото/скан документов (полис, паспорт, заявление).",
  "Я передам обращение профильному специалисту. Ожидайте, пожалуйста, ответ в этом чате.",
] as const;

/** Чем выше, тем больше склонность шаблона к тематике (индексы 0..3). */
const TAG_WEIGHTS: Record<string, readonly [number, number, number, number]> = {
  ДМС: [22, 26, 24, 14],
  ОСАГО: [28, 20, 18, 18],
  КАСКО: [26, 22, 24, 20],
  Путешествия: [24, 22, 20, 18],
  "Страховой случай": [18, 16, 28, 22],
  Ипотека: [20, 24, 22, 20],
  Другое: [16, 16, 16, 16],
};

function fnv1a(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function clampPct(n: number): number {
  return Math.min(97, Math.max(58, Math.round(n)));
}

/** Ключевые слова в тексте клиента усиливают релевантные шаблоны. */
function keywordBoost(dialogLower: string, templateIndex: number): number {
  let b = 0;
  const has = (w: string) => dialogLower.includes(w);
  if (has("полис") || has("договор") || has("осаго") || has("дмс") || has("каско")) {
    if (templateIndex === 0) b += 10;
    if (templateIndex === 1) b += 8;
  }
  if (has("фото") || has("документ") || has("скан") || has("загруз") || has("акт")) {
    if (templateIndex === 2) b += 14;
  }
  if (has("статус") || has("когда") || has("ожида") || has("специалист") || has("передат")) {
    if (templateIndex === 3) b += 12;
  }
  if (has("спасибо") || has("благодар")) {
    if (templateIndex === 1) b += 6;
  }
  return b;
}

export function getReplyTemplates(): readonly string[] {
  return TEMPLATES;
}

export function scoreTemplatesForDialog(threadTag: string, lastClientMessage: string): number[] {
  const weights = TAG_WEIGHTS[threadTag] ?? TAG_WEIGHTS.Другое;
  const dialogLower = lastClientMessage.toLowerCase();
  const seed = fnv1a(`${threadTag}|${lastClientMessage.slice(0, 240)}`);

  return TEMPLATES.map((_, i) => {
    const w = weights[i] ?? 16;
    const kw = keywordBoost(dialogLower, i);
    const jitter = (seed >> (i * 5)) % 5;
    const raw = 52 + w * 0.45 + kw + jitter;
    return clampPct(raw);
  });
}
