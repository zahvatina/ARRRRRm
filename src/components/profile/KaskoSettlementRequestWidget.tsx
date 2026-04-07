import { useState } from "react";
import { Input } from "../ui/Input";

export function KaskoSettlementRequestWidget() {
  const [policy, setPolicy] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [plate, setPlate] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [requestSuffix, setRequestSuffix] = useState<string | null>(null);

  const canSubmit = policy.trim() && eventDate.trim() && place.trim() && description.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setRequestSuffix(String(Math.floor(1000 + Math.random() * 9000)));
    setSubmitted(true);
  };

  return (
    <div className="widget-claims">
      <div className="widget-claims__chrome-header">
        <h3 className="widget-claims__chrome-title">Заявка на урегулирование по КАСКО</h3>
        <span className="widget-claims__chrome-count">Электронная форма</span>
      </div>

      <div className="widget-casco-form__card">
        {submitted ? (
          <div className="widget-casco-form__success" role="status">
            <strong>Заявление принято к обработке.</strong>
            <p>
              Присвоен номер ЗУ-КАСКО-2026-{requestSuffix}. Статус можно отследить в разделе «Страховые случаи и убытки».
            </p>
            <button
              type="button"
              className="widget-casco-form__btn-secondary"
              onClick={() => {
                setSubmitted(false);
                setRequestSuffix(null);
              }}
            >
              Оформить ещё одну заявку
            </button>
          </div>
        ) : (
          <form className="widget-casco-form" onSubmit={handleSubmit}>
            <p className="widget-casco-form__hint">
              Заполните поля по произошедшему событию. Данные попадут в урегулирование по полису КАСКО клиента.
            </p>

            <label className="widget-casco-form__field">
              <span className="widget-casco-form__label">Номер полиса КАСКО</span>
              <Input
                value={policy}
                onChange={(e) => setPolicy(e.target.value)}
                placeholder="Например, КСК 77 AA 123456"
                autoComplete="off"
              />
            </label>

            <label className="widget-casco-form__field">
              <span className="widget-casco-form__label">Дата и время события</span>
              <Input
                type="datetime-local"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </label>

            <label className="widget-casco-form__field">
              <span className="widget-casco-form__label">Место события</span>
              <Input
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                placeholder="Адрес или ориентир"
              />
            </label>

            <label className="widget-casco-form__field">
              <span className="widget-casco-form__label">Госномер ТС</span>
              <Input
                value={plate}
                onChange={(e) => setPlate(e.target.value)}
                placeholder="Необязательно"
              />
            </label>

            <label className="widget-casco-form__field">
              <span className="widget-casco-form__label">Описание обстоятельств и повреждений</span>
              <textarea
                className="widget-casco-form__textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Кратко опишите ход события и видимые повреждения"
                rows={4}
              />
            </label>

            <div className="widget-casco-form__actions">
              <button type="submit" className="widget-casco-form__submit" disabled={!canSubmit}>
                Отправить заявление
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
