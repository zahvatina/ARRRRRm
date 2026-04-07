import { useState } from "react";

const BENEFITS = [
  { title: "Доступная цена", sub: "До 50% выгоднее полного КАСКО" },
  { title: "Быстрое оформление", sub: "Онлайн за 10 минут" },
  { title: "Без осмотра", sub: "Для автомобилей до 7 лет" },
  { title: "Выплаты без справок", sub: "По упрощенной схеме" },
] as const;

const CONDITIONS = [
  { label: "Срок действия", value: "12 месяцев" },
  { label: "Франшиза", value: "От 0 до 30 000 ₽" },
  { label: "Страховая сумма", value: "До рыночной стоимости авто" },
  { label: "Территория действия", value: "Российская Федерация" },
] as const;

function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l8 4v6c0 5-3.5 9.5-8 10.5C7.5 22.5 4 18 4 13V7l8-4z"
        stroke="var(--color-primary)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M9 12l2 2 4-4" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
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

function CalcIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M8 7h8M8 11h2M12 11h2M16 11h2M8 15h2M12 15h2M16 15h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 4v12M8 12l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 20h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon({ down }: { down: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={down ? "M6 9l6 6 6-6" : "M18 15l-6-6-6 6"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type MiniKaskoProductCardWidgetProps = {
  onOpenWidget?: (id: string) => void;
};

export function MiniKaskoProductCardWidget({ onOpenWidget }: MiniKaskoProductCardWidgetProps) {
  const [conditionsOpen, setConditionsOpen] = useState(true);

  return (
    <div className="widget-product-card">
      <header className="widget-product-card__header">
        <div className="widget-product-card__icon-wrap" aria-hidden>
          <ShieldIcon />
        </div>
        <div className="widget-product-card__header-text">
          <h3 className="widget-product-card__title">Мини-каско</h3>
          <p className="widget-product-card__lead">
            Экономичная защита вашего автомобиля от основных рисков. Оптимальное решение для надёжных автовладельцев.
          </p>
        </div>
      </header>

      <section className="widget-product-card__benefits" aria-labelledby="product-benefits-heading">
        <h4 id="product-benefits-heading" className="widget-product-card__benefits-title">
          Ключевые преимущества
        </h4>
        <ul className="widget-product-card__benefits-grid">
          {BENEFITS.map((b) => (
            <li key={b.title} className="widget-product-card__benefit">
              <span className="widget-product-card__benefit-check" aria-hidden>
                <CheckIcon />
              </span>
              <div>
                <div className="widget-product-card__benefit-title">{b.title}</div>
                <div className="widget-product-card__benefit-sub">{b.sub}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="widget-product-card__actions">
        <button
          type="button"
          className="widget-product-card__btn widget-product-card__btn--primary-green"
          onClick={() => onOpenWidget?.("kasko-settlement-request")}
        >
          <SendIcon />
          Отправить заявку
        </button>
        <button type="button" className="widget-product-card__btn widget-product-card__btn--primary-blue">
          <CalcIcon />
          Рассчитать
        </button>
        <button type="button" className="widget-product-card__btn widget-product-card__btn--ghost">
          <DownloadIcon />
          Скачать PDF
        </button>
      </div>

      <div className="widget-product-card__conditions">
        <button
          type="button"
          className="widget-product-card__conditions-toggle"
          onClick={() => setConditionsOpen((v) => !v)}
          aria-expanded={conditionsOpen}
          id="conditions-toggle"
        >
          <span>Условия страхования</span>
          <span className="widget-product-card__conditions-chevron" aria-hidden>
            <ChevronIcon down={!conditionsOpen} />
          </span>
        </button>
        {conditionsOpen ? (
          <div className="widget-product-card__conditions-body" role="region" aria-labelledby="conditions-toggle">
            <table className="widget-product-card__table">
              <tbody>
                {CONDITIONS.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
}
