export type WidgetDef = {
  id: string;
  title: string;
  keywords: string[];
};

export const WIDGET_CATALOG: WidgetDef[] = [
  {
    id: "ai-assistant",
    title: "AI-Ассистент",
    keywords: ["ai", "ассистент", "ии", "база знаний", "помощь", "чат", "assistant", "знания"],
  },
  {
    id: "insurance-cases",
    title: "Страховые случаи и убытки",
    keywords: [
      "страховые случаи",
      "убытки",
      "убыток",
      "страховой случай",
      "каско",
      "дтп",
      "рассмотрение",
      "выплата",
      "claims",
    ],
  },
  {
    id: "claims",
    title: "Урегулирование убытка",
    keywords: ["убыток", "урегулирование", "claims"],
  },
  {
    id: "product-mini-kasko",
    title: "Мини-каско",
    keywords: [
      "мини-каско",
      "мини каско",
      "продукт",
      "страхование авто",
      "каско эконом",
      "карточка продукта",
    ],
  },
  {
    id: "kasko-settlement-request",
    title: "Заявка на урегулирование по КАСКО",
    keywords: [
      "заявка",
      "каско",
      "kasko",
      "casco",
      "оформить убыток",
      "новый убыток",
      "подача заявления",
      "повреждение авто",
    ],
  },
  {
    id: "offer",
    title: "Оффер для клиента",
    keywords: ["оффер", "предложение", "offer"],
  },
  {
    id: "events",
    title: "Страховые события",
    keywords: ["события", "страховые", "events"],
  },
  {
    id: "history",
    title: "История обращений",
    keywords: ["история", "обращений", "history", "обращения"],
  },
];

export function findWidgetById(id: string): WidgetDef | undefined {
  return WIDGET_CATALOG.find((w) => w.id === id);
}
