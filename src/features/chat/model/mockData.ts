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
    body:
      "Добрый день! Полис ОСАГО заканчивается 14 марта. Подскажите, как продлить онлайн и сохранится ли мой класс КБМ 08?",
  },
  {
    id: "c1m2",
    role: "agent",
    authorName: agent,
    time: "12:53",
    body:
      "Здравствуйте, Георгий! Продление доступно в личном кабинете или по ссылке из SMS. Класс КБМ переносится автоматически, если не было разрыва более 365 дней.",
  },
  {
    id: "c1m3",
    role: "client",
    authorName: "Георгий Матвеев",
    time: "12:54",
    body: "Отлично, оформлю сегодня вечером. Спасибо!",
  },
  {
    id: "c1m4",
    role: "agent",
    authorName: agent,
    time: "12:55",
    body: "Спасибо вам за обращение. Если появятся вопросы при оформлении — напишите, поможем.",
  },
];

const c2Messages: Message[] = [
  {
    id: "c2m1",
    role: "client",
    authorName: "Дмитрий Казаков",
    time: "12:48",
    body:
      "Оформлял страховку путешественника на Таиланд с 10 по 24 марта. Перенёс вылет на 12-е — нужно поправить даты в полисе или заново купить?",
  },
  {
    id: "c2m2",
    role: "agent",
    authorName: agent,
    time: "12:50",
    body:
      "Дмитрий, добрый день! Если поездка сдвинута, но длительность та же, обычно достаточно внести изменения в действующий полис через заявление в ЛК. Новый полис не нужен, если покрытие не меняется.",
  },
  {
    id: "c2m3",
    role: "client",
    authorName: "Дмитрий Казаков",
    time: "12:53",
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
    body:
      "Заявлял страховой случай по квартире — затопление соседями. Где посмотреть статус рассмотрения и когда приедет оценщик?",
  },
  {
    id: "c3m2",
    role: "agent",
    authorName: agent,
    time: "12:32",
    body:
      "Родион, заявление №78432 в работе. Осмотр назначен на завтра, 9:00–13:00 — SMS с контактом специалиста отправим сегодня до 18:00.",
  },
  {
    id: "c3m3",
    role: "client",
    authorName: "Родион Фомин",
    time: "12:33",
    body: "Хорошо. Фотографии и акт я уже загрузил в личный кабинет — этого достаточно?",
  },
  {
    id: "c3m4",
    role: "agent",
    authorName: agent,
    time: "12:35",
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
    body:
      "Добрый день! По премиум-программе: входит ли стоматология в мой полис ДМС и как записаться без направления?",
  },
  {
    id: "c4m2",
    role: "agent",
    authorName: agent,
    time: "12:19",
    body:
      "Николай, добрый день! По вашему тарифу «Премиум+» стоматология включена в объёме профгигиены и дважды в год консультации терапевта. Запись через приложение или по горячей линии 8800.",
  },
  {
    id: "c4m3",
    role: "client",
    authorName: "Николай Иванов",
    time: "12:19",
    body: "А если нужно лечение кариеса — это франшиза или отдельное согласование?",
  },
  {
    id: "c4m4",
    role: "agent",
    authorName: agent,
    time: "12:20",
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
    body:
      "Вчера ДТП по КАСКО — машина на ходу, но бампер и фара. Нужна эвакуация или могу сам доехать в сервис из списка?",
  },
  {
    id: "c5m2",
    role: "agent",
    authorName: agent,
    time: "12:17",
    body:
      "Роман, если ходовая и рулевое в порядке и нет утечек жидкостей, самостоятельный заезд в партнёрский СТО допустим. Зафиксируйте координаты и фото повреждений.",
  },
  {
    id: "c5m3",
    role: "client",
    authorName: "Роман Носков",
    time: "12:20",
    body:
      "Спасибо. Франшиза по полису 30 000 — она с меня при любом ремонте или только при частичном возмещении?",
  },
];

export const mockConversations: Conversation[] = [
  {
    id: "c1",
    customerName: "Георгий Матвеев",
    lastPreview: previewFrom(c1Messages),
    lastTime: "12:55",
    messages: c1Messages,
    profile: {
      name: "Георгий Матвеев",
      segmentLabel: "Стандарт",
      email: "g.matveev@mail.ru",
      city: "Санкт-Петербург",
      services: ["SMS"],
      clientId: 4092801,
    },
  },
  {
    id: "c2",
    customerName: "Дмитрий Казаков",
    lastPreview: previewFrom(c2Messages),
    lastTime: "12:53",
    unreadCount: 1,
    messages: c2Messages,
    profile: {
      name: "Дмитрий Казаков",
      segmentLabel: "Стандарт",
      email: "d.kazakov@yandex.ru",
      city: "Казань",
      services: ["Интернет-банк"],
      clientId: 4092805,
    },
  },
  {
    id: "c3",
    customerName: "Родион Фомин",
    lastPreview: previewFrom(c3Messages),
    lastTime: "12:35",
    messages: c3Messages,
    profile: {
      name: "Родион Фомин",
      segmentLabel: "Стандарт",
      email: "r.fomin@gmail.com",
      city: "Нижний Новгород",
      services: ["SMS", "Интернет-банк"],
      clientId: 4092803,
    },
  },
  {
    id: "c4",
    customerName: "Николай Иванов",
    lastPreview: previewFrom(c4Messages),
    lastTime: "12:20",
    messages: c4Messages,
    profile: {
      name: "Николай Иванов",
      segmentLabel: "Премиум",
      email: "test@yandex.ru",
      city: "Москва",
      services: ["SMS", "Интернет-банк"],
      clientId: 4092807,
    },
  },
  {
    id: "c5",
    customerName: "Роман Носков",
    lastPreview: previewFrom(c5Messages),
    lastTime: "12:20",
    unreadCount: 1,
    messages: c5Messages,
    profile: {
      name: "Роман Носков",
      segmentLabel: "Стандарт",
      email: "r.noskov@mail.ru",
      city: "Краснодар",
      services: ["SMS"],
      clientId: 4092808,
    },
  },
];

export const activeConversationsCount = mockConversations.length;

export const queueStatsMock = [
  { left: "72%", right: "3.2" },
  { left: "68", right: "35" },
  { left: "4", right: "4" },
];
