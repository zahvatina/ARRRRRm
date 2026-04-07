import type { Conversation } from "../../../types/chat";
import type { Message } from "../../../types/chat";

function previewFrom(messages: Message[]) {
  const last = messages[messages.length - 1];
  const t = last.body;
  return t.length > 48 ? `${t.slice(0, 48)}…` : t;
}

const agent = "Марина Голованова";

const c1Messages: Message[] = [
  {
    id: "c1m1",
    role: "client",
    authorName: "Георгий Матвеев",
    time: "12:52",
    calendarDate: "07.04.2026",
    body:
      "Добрый день! Полис ОСАГО заканчивается 14 марта. Подскажите, как продлить онлайн и сохранится ли мой класс КБМ 08?",
  },
  {
    id: "c1m2",
    role: "agent",
    authorName: agent,
    time: "12:53",
    calendarDate: "07.04.2026",
    body:
      "Здравствуйте, Георгий! Продление доступно в личном кабинете или по ссылке из SMS. Класс КБМ переносится автоматически, если не было разрыва более 365 дней.",
  },
  {
    id: "c1m3",
    role: "client",
    authorName: "Георгий Матвеев",
    time: "12:54",
    calendarDate: "07.04.2026",
    body: "Отлично, оформлю сегодня вечером. Спасибо!",
  },
  {
    id: "c1m4",
    role: "agent",
    authorName: agent,
    time: "12:55",
    calendarDate: "07.04.2026",
    body: "Спасибо вам за обращение. Если появятся вопросы при оформлении — напишите, поможем.",
  },
];

const c2Messages: Message[] = [
  {
    id: "c2m1",
    role: "client",
    authorName: "Дмитрий Казаков",
    time: "12:48",
    calendarDate: "07.04.2026",
    body:
      "Оформлял страховку путешественника на Таиланд с 10 по 24 марта. Перенёс вылет на 12-е — нужно поправить даты в полисе или заново купить?",
  },
  {
    id: "c2m2",
    role: "agent",
    authorName: agent,
    time: "12:50",
    calendarDate: "07.04.2026",
    body:
      "Дмитрий, добрый день! Если поездка сдвинута, но длительность та же, обычно достаточно внести изменения в действующий полис через заявление в ЛК. Новый полис не нужен, если покрытие не меняется.",
  },
  {
    id: "c2m3",
    role: "client",
    authorName: "Дмитрий Казаков",
    time: "12:53",
    calendarDate: "07.04.2026",
    body:
      "Понял, спасибо. А если я хочу добавить супругу в тот же полис — это отдельная доплата или новый договор?",
  },
];

const c3Messages: Message[] = [
  {
    id: "c3m1",
    role: "client",
    authorName: "Родион Фомин",
    time: "12:30",
    calendarDate: "07.04.2026",
    body:
      "Заявлял страховой случай по квартире — затопление соседями. Где посмотреть статус рассмотрения и когда приедет оценщик?",
  },
  {
    id: "c3m2",
    role: "agent",
    authorName: agent,
    time: "12:32",
    calendarDate: "07.04.2026",
    body:
      "Родион, заявление №78432 в работе. Осмотр назначен на завтра, 9:00–13:00 — SMS с контактом специалиста отправим сегодня до 18:00.",
  },
  {
    id: "c3m3",
    role: "client",
    authorName: "Родион Фомин",
    time: "12:33",
    calendarDate: "07.04.2026",
    body: "Хорошо. Фотографии и акт я уже загрузил в личный кабинет — этого достаточно?",
  },
  {
    id: "c3m4",
    role: "agent",
    authorName: agent,
    time: "12:35",
    calendarDate: "07.04.2026",
    body:
      "Да, комплект документов принят. Если оценщик запросит ещё что-то — напишет вам напрямую.",
  },
];

const c4Messages: Message[] = [
  {
    id: "c4m1",
    role: "client",
    authorName: "Николай Иванов",
    time: "12:18",
    calendarDate: "23.03.2026",
    body:
      "Добрый день! По премиум-программе: входит ли стоматология в мой полис ДМС и как записаться без направления?",
  },
  {
    id: "c4m2",
    role: "agent",
    authorName: agent,
    time: "12:19",
    calendarDate: "23.03.2026",
    body:
      "Николай, добрый день! По вашему тарифу «Премиум+» стоматология включена в объёме профгигиены и дважды в год консультации терапевта. Запись через приложение или по горячей линии 8800.",
  },
  {
    id: "c4m3",
    role: "client",
    authorName: "Николай Иванов",
    time: "12:19",
    calendarDate: "24.03.2026",
    body: "А если нужно лечение кариеса — это франшиза или отдельное согласование?",
  },
  {
    id: "c4m4",
    role: "agent",
    authorName: agent,
    time: "12:20",
    calendarDate: "24.03.2026",
    body:
      "Лечение кариеса покрывается по программе после согласования кейса — пришлите в ЛК снимок и заключение врача, направление за 1 рабочий день.",
  },
];

const c5Messages: Message[] = [
  {
    id: "c5m1",
    role: "client",
    authorName: "Роман Носков",
    time: "12:15",
    calendarDate: "23.03.2026",
    body:
      "Вчера ДТП по КАСКО — машина на ходу, но бампер и фара. Нужна эвакуация или могу сам доехать в сервис из списка?",
  },
  {
    id: "c5m2",
    role: "agent",
    authorName: agent,
    time: "12:17",
    calendarDate: "23.03.2026",
    body:
      "Роман, если ходовая и рулевое в порядке и нет утечек жидкостей, самостоятельный заезд в партнёрский СТО допустим. Зафиксируйте координаты и фото повреждений.",
  },
  {
    id: "c5m3",
    role: "client",
    authorName: "Роман Носков",
    time: "12:20",
    calendarDate: "23.03.2026",
    body:
      "Спасибо. Франшиза по полису 30 000 — она с меня при любом ремонте или только при частичном возмещении?",
  },
];

const c6PetrovBody =
  "Добрый день! Я подавал заявление на возмещение ущерба по КАСКО (страховой случай №SC-2026-00456) три недели назад. Пока не получил никакой информации о статусе рассмотрения. Подскажите, пожалуйста, на каком этапе находится мое обращение и когда ожидать решение? Заранее спасибо.";

const c6Messages: Message[] = [
  {
    id: "c6m1",
    role: "client",
    authorName: "Иван Петров",
    time: "14:15",
    calendarDate: "10.02.2026",
    body: c6PetrovBody,
  },
];

export const mockConversations: Conversation[] = [
  {
    id: "c1",
    customerName: "Георгий Матвеев",
    threadTag: "ОСАГО",
    operatorChannels: ["chat", "mail"],
    mailDetail: {
      fromEmail: "g.matveev@mail.ru",
      subject: "Продление ОСАГО и класс КБМ",
      receivedAt: "07.04.2026 12:52",
      body: c1Messages[0]?.body ?? "",
    },
    lastPreview: previewFrom(c1Messages),
    lastTime: "12:55",
    messages: c1Messages,
    profile: {
      name: "Георгий Матвеев",
      email: "g.matveev@mail.ru",
      clientId: 4092801,
      vip: false,
      phones: [
        { number: "+7 (812) 555-12-34", label: "Основной" },
        { number: "+7 (921) 444-55-66", label: "Мобильный" },
      ],
      birthDate: "21.11.1990",
      age: 35,
      address: "Санкт-Петербург, Невский пр., д. 10",
      statusLabel: "Активный",
      segmentLabel: "Стандарт",
      clientSince: "03.06.2020",
      loyaltyPoints: 1840,
    },
  },
  {
    id: "c2",
    customerName: "Дмитрий Казаков",
    threadTag: "Путешествия",
    operatorChannels: ["chat"],
    lastPreview: previewFrom(c2Messages),
    lastTime: "12:53",
    unreadCount: 1,
    messages: c2Messages,
    profile: {
      name: "Дмитрий Казаков",
      email: "d.kazakov@yandex.ru",
      clientId: 4092805,
      vip: false,
      phones: [
        { number: "+7 (843) 555-90-12", label: "Основной" },
        { number: "+7 (917) 987-65-43", label: "Мобильный" },
      ],
      birthDate: "05.02.1988",
      age: 38,
      address: "Казань, ул. Баумана, д. 7",
      statusLabel: "Активный",
      segmentLabel: "Стандарт",
      clientSince: "12.05.2018",
      loyaltyPoints: 6450,
    },
  },
  {
    id: "c3",
    customerName: "Родион Фомин",
    threadTag: "Страховой случай",
    operatorChannels: ["tickets"],
    ticketClaim: {
      applicantName: "Родион Фомин",
      contactEmail: "r.fomin@gmail.com",
      contactPhone: "+7 (831) 555-33-22",
      submittedAt: "07.04.2026 12:30",
      productLabel: "Имущество (квартира)",
      policyNumber: "IFL-2024-556612",
      eventDateTime: "05.04.2026, около 14:00",
      eventPlace: "Нижний Новгород, ул. Большая Покровская, д. 25, кв. 18",
      description:
        "Затопление квартиры соседями сверху. Повреждены потолок в комнате и коридоре, паркет в коридоре вздут. Заявление №78432 подано через ЛК. Прошу указать сроки выезда оценщика и акт приёмки работ.",
    },
    lastPreview: previewFrom(c3Messages),
    lastTime: "12:35",
    messages: c3Messages,
    profile: {
      name: "Родион Фомин",
      email: "r.fomin@gmail.com",
      clientId: 4092803,
      vip: false,
      phones: [
        { number: "+7 (831) 555-33-22", label: "Основной" },
        { number: "+7 (910) 123-45-67", label: "Мобильный" },
      ],
      birthDate: "15.03.1985",
      age: 41,
      address: "Нижний Новгород, ул. Большая Покровская, д. 25",
      statusLabel: "Активный",
      segmentLabel: "Стандарт",
      clientSince: "18.09.2019",
      loyaltyPoints: 2900,
    },
  },
  {
    id: "c4",
    customerName: "Николай Иванов",
    threadTag: "ДМС",
    operatorChannels: ["chat", "mail"],
    mailDetail: {
      fromEmail: "test@yandex.ru",
      subject: "Стоматология в полисе ДМС (Премиум+)",
      receivedAt: "23.03.2026 12:18",
      body: c4Messages[0]?.body ?? "",
    },
    lastPreview: previewFrom(c4Messages),
    lastTime: "12:20",
    messages: c4Messages,
    profile: {
      name: "Николай Иванов",
      email: "test@yandex.ru",
      clientId: 4092807,
      vip: true,
      phones: [
        { number: "+7 (495) 123-45-67", label: "Основной" },
        { number: "+7 (916) 987-65-43", label: "Мобильный" },
      ],
      birthDate: "15.03.1985",
      age: 40,
      address: "Москва, ул. Ленина, д. 25, кв. 42",
      statusLabel: "Активный",
      segmentLabel: "Премиум",
      clientSince: "12.05.2018",
      loyaltyPoints: 12450,
      passport: {
        series: "4509",
        number: "123456",
        issuedBy: "ГУ МВД России по г. Москве",
        issuedDate: "18.06.2005",
        code: "770-001",
        registrationAddress: "Москва, ул. Ленина, д. 25, кв. 42",
      },
      policies: [
        {
          id: "p1",
          type: "ДМС",
          number: "DMS-2025-000128",
          status: "Действует",
          from: "01.01.2025",
          to: "31.12.2025",
        },
        {
          id: "p2",
          type: "ОСАГО",
          number: "OSAGO-2025-883102",
          status: "Действует",
          from: "10.02.2025",
          to: "09.02.2026",
        },
        {
          id: "p3",
          type: "Ипотека",
          number: "OFFER-INS-00077",
          status: "Оффер",
          from: "—",
          to: "—",
        },
        {
          id: "p4",
          type: "КАСКО",
          number: "KASKO-2024-332199",
          status: "Завершен",
          from: "10.02.2024",
          to: "09.02.2025",
        },
      ],
    },
  },
  {
    id: "c5",
    customerName: "Роман Носков",
    threadTag: "КАСКО",
    operatorChannels: ["tickets", "calls"],
    ticketClaim: {
      applicantName: "Роман Носков",
      contactEmail: "r.noskov@mail.ru",
      contactPhone: "+7 (861) 555-78-90",
      submittedAt: "07.04.2026 12:15",
      productLabel: "КАСКО",
      policyNumber: "KASKO-2025-441902",
      eventDateTime: "06.04.2026, 19:40",
      eventPlace: "Краснодар, пересечение ул. Ставропольская и ул. Северная",
      vehiclePlate: "К 762 УН 23",
      description:
        "ДТП без пострадавших: удар в задний бампер и правую заднюю фару при остановке на перекрёстке. Второй участник признал вину. Запрошена направление в официальный сервис из списка партнёров. Франшиза по полису 30 000 ₽.",
    },
    callSession: {
      displayNumber: "+7 (861) 555-78-90",
      elapsedSeconds: 154,
    },
    callTranscript: [
      {
        speaker: "client",
        time: "00:00:04",
        text: "Здравствуйте, вчера было ДТП по КАСКО, машина на ходу. Подскажите, нужна эвакуация или могу сам доехать до сервиса из вашего списка?",
      },
      {
        speaker: "agent",
        time: "00:00:18",
        text: "Добрый день, Роман. Если ходовая часть в порядке и нет утечек, допустим самостоятельный заезд в партнёрский центр. Зафиксируйте, пожалуйста, координаты и сделайте фото повреждений.",
      },
      {
        speaker: "client",
        time: "00:00:42",
        text: "Хорошо, фото уже в приложении. А франшиза тридцать тысяч — она всегда с меня при ремонте?",
      },
      {
        speaker: "agent",
        time: "00:00:56",
        text: "Условия франшизы указаны в полисе: обычно она удерживается при каждом страховом случае по этому договору. Точную сумму и порядок подтвердит ваш куратор по убытку после осмотра.",
      },
    ],
    lastPreview: previewFrom(c5Messages),
    lastTime: "12:20",
    unreadCount: 1,
    messages: c5Messages,
    profile: {
      name: "Роман Носков",
      email: "r.noskov@mail.ru",
      clientId: 4092808,
      vip: false,
      phones: [
        { number: "+7 (861) 555-78-90", label: "Основной" },
        { number: "+7 (918) 222-11-00", label: "Мобильный" },
      ],
      birthDate: "09.07.1992",
      age: 33,
      address: "Краснодар, ул. Красная, д. 1",
      statusLabel: "Активный",
      segmentLabel: "Стандарт",
      clientSince: "01.02.2021",
      loyaltyPoints: 980,
    },
  },
  {
    id: "c6",
    customerName: "Иван Петров",
    threadTag: "КАСКО",
    operatorChannels: ["mail"],
    mailDetail: {
      fromEmail: "i.petrov@email.com",
      subject: "Вопрос по страховому случаю",
      receivedAt: "10.02.2026 14:15",
      body: c6PetrovBody,
    },
    lastPreview: previewFrom(c6Messages),
    lastTime: "14:15",
    unreadCount: 1,
    messages: c6Messages,
    profile: {
      name: "Иван Петров",
      email: "i.petrov@email.com",
      clientId: 4092812,
      vip: false,
      phones: [{ number: "+7 (495) 000-00-00", label: "Основной" }],
      birthDate: "02.05.1987",
      age: 38,
      address: "Москва",
      statusLabel: "Активный",
      segmentLabel: "Стандарт",
      clientSince: "10.01.2022",
      loyaltyPoints: 420,
    },
  },
];

export const activeConversationsCount = mockConversations.length;

export const queueStatsMock = [
  { left: "72%", right: "3.2" },
  { left: "68", right: "35" },
  { left: "4", right: "4" },
];
