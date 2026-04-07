import type { ClientClaimSettlementForm } from "../../types/chat";
import { ThreadTagSelect } from "./ThreadTagSelect";

function ClipboardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 4a1 1 0 011-1h4a1 1 0 011 1v2H9V4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type TicketsClaimFormViewProps = {
  form: ClientClaimSettlementForm;
  threadTag: string;
  onChangeThreadTag?: (tag: string) => void;
};

function ReadonlyField({
  label,
  value,
  multiline,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <label className="widget-casco-form__field">
      <span className="widget-casco-form__label">{label}</span>
      {multiline ? (
        <div className="widget-casco-form__readonly widget-casco-form__readonly--multiline">{value}</div>
      ) : (
        <div className="widget-casco-form__readonly">{value || "—"}</div>
      )}
    </label>
  );
}

export function TicketsClaimFormView({ form, threadTag, onChangeThreadTag }: TicketsClaimFormViewProps) {
  return (
    <div className="ticket-claim">
      <div className="ticket-claim__header">
        <div className="ticket-claim__header-main">
          <div className="ticket-claim__icon-wrap" aria-hidden>
            <ClipboardIcon />
          </div>
          <h2 className="ticket-claim__title">Заявка на урегулирование убытков</h2>
          <ThreadTagSelect
            className="ticket-claim__thread-tag"
            threadTag={threadTag}
            onChangeThreadTag={onChangeThreadTag}
          />
        </div>
        <div className="ticket-claim__header-aside">
          <time className="ticket-claim__time" dateTime={form.submittedAt}>
            Подана: {form.submittedAt}
          </time>
        </div>
      </div>
      <div className="ticket-claim__divider" aria-hidden />

      <div className="widget-casco-form__card ticket-claim__card">
        <p className="widget-casco-form__hint">
          Данные электронной формы, заполненной клиентом. Редактирование недоступно — уточнения через переписку
          ниже.
        </p>

        <div className="widget-casco-form">
          <ReadonlyField label="Заявитель" value={form.applicantName} />
          <ReadonlyField label="Телефон" value={form.contactPhone} />
          <ReadonlyField label="E-mail" value={form.contactEmail} />
          <ReadonlyField label="Продукт / тип убытка" value={form.productLabel} />
          <ReadonlyField label="Номер полиса" value={form.policyNumber} />
          <ReadonlyField label="Дата и время события" value={form.eventDateTime} />
          <ReadonlyField label="Место события" value={form.eventPlace} />
          {form.vehiclePlate ? (
            <ReadonlyField label="Госномер ТС" value={form.vehiclePlate} />
          ) : null}
          <ReadonlyField label="Описание обстоятельств и повреждений" value={form.description} multiline />
        </div>
      </div>
    </div>
  );
}
