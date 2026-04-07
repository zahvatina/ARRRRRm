import { useEffect, useRef, useState } from "react";
import { findWidgetById } from "../../features/widgets/widgetCatalog";

export type AiAssistantClientContext = {
  name: string;
  clientId: number;
  segment: string;
};

type BubblePart =
  | { k: "t"; v: string }
  | { k: "w"; widgetId: string; label: string };

type ChatMessage = {
  id: string;
  role: "ai" | "user";
  time: string;
  parts: BubblePart[];
};

function nowTime(): string {
  return new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
}

function RobotIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="8" width="16" height="12" rx="3" stroke="var(--color-primary)" strokeWidth="2" />
      <circle cx="9" cy="13" r="1.2" fill="var(--color-primary)" />
      <circle cx="15" cy="13" r="1.2" fill="var(--color-primary)" />
      <path d="M12 8V5M8 5h8" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 20v2M15 20v2" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function buildWelcomeParts(ctx?: AiAssistantClientContext): BubblePart[] {
  const greet = ctx
    ? `Здравствуйте! Сейчас открыта карточка ${ctx.name} (ID: ${ctx.clientId}, сегмент: ${ctx.segment}). Ищу по базе знаний и данным клиента.\n\n`
    : "Здравствуйте! Задайте вопрос — я поищу в базе знаний и подскажу, куда перейти в виджетах.\n\n";
  return [
    { k: "t", v: greet },
    { k: "t", v: "Частые темы:\n" },
    { k: "t", v: "1. " },
    { k: "w", widgetId: "insurance-cases", label: "Страховые случаи и убытки" },
    { k: "t", v: "\n2. " },
    { k: "w", widgetId: "history", label: "История обращений" },
    { k: "t", v: "\n3. " },
    { k: "w", widgetId: "claims", label: "Урегулирование убытка" },
    { k: "t", v: "\n4. " },
    { k: "w", widgetId: "events", label: "Страховые события" },
    { k: "t", v: "\n5. " },
    { k: "w", widgetId: "offer", label: "Оффер для клиента" },
    { k: "t", v: "\n6. " },
    { k: "w", widgetId: "kasko-settlement-request", label: "Заявка на урегулирование по КАСКО" },
    { k: "t", v: "\n7. " },
    { k: "w", widgetId: "product-mini-kasko", label: "Мини-каско (карточка продукта)" },
    { k: "t", v: "\n\nНапишите запрос — добавлю ссылки на релевантные разделы." },
  ];
}

function replyPartsForQuestion(q: string, ctx?: AiAssistantClientContext): BubblePart[] {
  const parts: BubblePart[] = [{ k: "t", v: "По базе знаний и данным клиента:\n\n" }];

  if (/убыт|каско|осаго|дтп|страховой\s+случ|выплат/i.test(q)) {
    parts.push(
      { k: "t", v: "• Урегулирование: откройте " },
      { k: "w", widgetId: "insurance-cases", label: "«Страховые случаи и убытки»" },
      { k: "t", v: " — статус и история рассмотрения.\n• Детали убытка: " },
      { k: "w", widgetId: "claims", label: "«Урегулирование убытка»" },
      { k: "t", v: ".\n• Новая заявка по КАСКО: " },
      { k: "w", widgetId: "kasko-settlement-request", label: "«Заявка на урегулирование по КАСКО»" },
      { k: "t", v: ".\n\n" },
    );
  }
  if (/заявк|оформить\s+убыт|подать\s+заявл|электронн.*заявл/i.test(q) && !/убыт|каско|осаго|дтп/i.test(q)) {
    parts.push(
      { k: "t", v: "• Подача заявления по КАСКО: " },
      { k: "w", widgetId: "kasko-settlement-request", label: "«Заявка на урегулирование по КАСКО»" },
      { k: "t", v: ".\n\n" },
    );
  }
  if (/истор|обращен|канал|чат|звонок/i.test(q)) {
    parts.push(
      { k: "t", v: "• Журнал контактов: " },
      { k: "w", widgetId: "history", label: "«История обращений»" },
      { k: "t", v: ".\n\n" },
    );
  }
  if (/оффер|программ|акци|тариф/i.test(q)) {
    parts.push(
      { k: "t", v: "• Персональные предложения: " },
      { k: "w", widgetId: "offer", label: "«Оффер для клиента»" },
      { k: "t", v: ".\n\n" },
    );
  }
  if (/событи|полис|риск/i.test(q)) {
    parts.push(
      { k: "t", v: "• Реестр событий: " },
      { k: "w", widgetId: "events", label: "«Страховые события»" },
      { k: "t", v: ".\n\n" },
    );
  }
  if (/мини[\s-]?каско|эконом.*каско|карточк.*продукт/i.test(q)) {
    parts.push(
      { k: "t", v: "• Карточка продукта: " },
      { k: "w", widgetId: "product-mini-kasko", label: "«Мини-каско»" },
      { k: "t", v: " — условия и действия.\n\n" },
    );
  }

  if (parts.length === 1) {
    parts.push({
      k: "t",
      v: "Короткий ответ из базы знаний: уточните продукт (ДМС, КАСКО, имущество) или тип запроса. Ниже — быстрые ссылки.\n\n",
    });
    parts.push({ k: "t", v: "→ " });
    parts.push({ k: "w", widgetId: "insurance-cases", label: "Случаи и убытки" });
    parts.push({ k: "t", v: " · " });
    parts.push({ k: "w", widgetId: "history", label: "История обращений" });
    parts.push({ k: "t", v: "\n\n" });
  }

  if (ctx) {
    parts.push({
      k: "t",
      v: `Учтены данные клиента ${ctx.name}: при необходимости проверьте полисы и обращения в карточке справа.`,
    });
  }

  return parts;
}

function renderParts(parts: BubblePart[], onOpenWidget: (id: string) => void) {
  return parts.map((p, i) => {
    if (p.k === "t") {
      return (
        <span key={i} className="widget-ai__textChunk">
          {p.v}
        </span>
      );
    }
    const known = findWidgetById(p.widgetId);
    return (
      <button
        key={i}
        type="button"
        className="widget-ai__widgetLink"
        onClick={() => onOpenWidget(p.widgetId)}
        title={known ? `Открыть: ${known.title}` : undefined}
      >
        {p.label}
      </button>
    );
  });
}

type AiAssistantWidgetProps = {
  onOpenWidget: (widgetId: string) => void;
  clientContext?: AiAssistantClientContext;
};

export function AiAssistantWidget({ onOpenWidget, clientContext }: AiAssistantWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { id: "m0", role: "ai", time: nowTime(), parts: buildWelcomeParts(clientContext) },
  ]);
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: "user", time: nowTime(), parts: [{ k: "t", v: text }] };
    setMessages((prev) => [...prev, userMsg]);
    setDraft("");
    window.setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: "ai",
        time: nowTime(),
        parts: replyPartsForQuestion(text, clientContext),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 450);
  };

  return (
    <div className="widget-ai">
      <div className="widget-ai__header">
        <div className="widget-ai__headerLeft">
          <span className="widget-ai__robot" aria-hidden>
            <RobotIcon />
          </span>
          <h3 className="widget-ai__title">AI-Ассистент</h3>
        </div>
        <span className="widget-ai__status" title="Онлайн" aria-label="Статус: онлайн" />
      </div>

      <div ref={listRef} className="widget-ai__messages" role="log" aria-live="polite">
        {messages.map((m) => (
          <div key={m.id} className={`widget-ai__row widget-ai__row--${m.role}`}>
            <div className={`widget-ai__bubble widget-ai__bubble--${m.role}`}>
              <div className="widget-ai__bubbleBody">{renderParts(m.parts, onOpenWidget)}</div>
              <div className={`widget-ai__time widget-ai__time--${m.role}`}>{m.time}</div>
            </div>
          </div>
        ))}
      </div>

      <form
        className="widget-ai__inputBar"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <input
          className="widget-ai__input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Задайте вопрос ассистенту…"
          aria-label="Вопрос AI-ассистенту"
        />
        <button type="submit" className="widget-ai__send" aria-label="Отправить" disabled={!draft.trim()}>
          <SendIcon />
        </button>
      </form>
    </div>
  );
}
