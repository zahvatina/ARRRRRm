import { type FormEvent, useState } from "react";
import { Input } from "../ui/Input";

const PRODUCT_OPTIONS = [
  { value: "", label: "Выберите продукт" },
  { value: "kasko", label: "КАСКО" },
  { value: "osago", label: "ОСАГО" },
  { value: "property", label: "Имущество" },
  { value: "other", label: "Другое" },
] as const;

export function ClaimSettlementWidget() {
  const [claimId, setClaimId] = useState("");
  const [product, setProduct] = useState("");
  const [nextStep, setNextStep] = useState("");
  const [internalNote, setInternalNote] = useState("");
  const [saved, setSaved] = useState(false);

  const canSubmit = claimId.trim() && product && nextStep.trim();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSaved(true);
  };

  return (
    <div className="widget-claims">
      <div className="widget-claims__chrome-header">
        <h3 className="widget-claims__chrome-title">Урегулирование убытка</h3>
        <span className="widget-claims__chrome-count">Рабочая карточка</span>
      </div>

      <div className="widget-casco-form__card">
        {saved ? (
          <div className="widget-casco-form__success" role="status">
            <strong>Данные карточки урегулирования сохранены.</strong>
            <p>Запись по делу {claimId.trim()} обновлена. Статус синхронизирован со страховым случаем.</p>
            <button
              type="button"
              className="widget-casco-form__btn-secondary"
              onClick={() => {
                setSaved(false);
              }}
            >
              Редактировать снова
            </button>
          </div>
        ) : (
          <form className="widget-casco-form" onSubmit={handleSubmit}>
            <p className="widget-casco-form__hint">
              Фиксация шагов и внутренних пометок по убытку. Отображается в процессе рассмотрения дела.
            </p>

            <label className="widget-casco-form__field">
              <span className="widget-casco-form__label">Номер убытка / дела</span>
              <Input
                value={claimId}
                onChange={(e) => setClaimId(e.target.value)}
                placeholder="Например, УБ-2026-001234"
                autoComplete="off"
              />
            </label>

            <label className="widget-casco-form__field">
              <span className="widget-casco-form__label">Продукт</span>
              <select
                className="widget-casco-form__select"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                aria-label="Продукт по убытку"
              >
                {PRODUCT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="widget-casco-form__field">
              <span className="widget-casco-form__label">Следующий шаг урегулирования</span>
              <textarea
                className="widget-casco-form__textarea"
                value={nextStep}
                onChange={(e) => setNextStep(e.target.value)}
                placeholder="Назначить осмотр, запросить справку ГИБДД, согласовать сумму…"
                rows={3}
              />
            </label>

            <label className="widget-casco-form__field">
              <span className="widget-casco-form__label">Внутренняя пометка (не для клиента)</span>
              <textarea
                className="widget-casco-form__textarea"
                value={internalNote}
                onChange={(e) => setInternalNote(e.target.value)}
                placeholder="Необязательно"
                rows={2}
              />
            </label>

            <div className="widget-casco-form__actions">
              <button type="submit" className="widget-casco-form__submit" disabled={!canSubmit}>
                Сохранить в процессе урегулирования
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
