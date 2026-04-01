# План компонентов по 3 блокам интерфейса

## 1) Левый блок: список диалогов

Цель: быстрый выбор чата и навигация по очереди обращений.

- `ConversationsPanel` — контейнер левой колонки, отвечает за компоновку секций и скролл.
- `ConversationsHeader` — логотип/название, счетчик активных диалогов.
- `ConversationFilters` — фильтры (активные, непрочитанные, VIP, поиск).
- `ConversationList` — виртуализированный список диалогов.
- `ConversationListItem` — карточка одного диалога: имя, превью, время, бейдж непрочитанных, состояние.
- `ConversationAvatar` — аватар клиента/канала.
- `ConversationMeta` — время, тег канала, SLA-статус.
- `QueueStatsFooter` — нижняя статистика очереди (нагрузка, SLA, пропущенные).

Рекомендуемое размещение:

- [src/components/conversations/ConversationsPanel.tsx](src/components/conversations/ConversationsPanel.tsx)
- [src/components/conversations/ConversationListItem.tsx](src/components/conversations/ConversationListItem.tsx)

## 2) Центральный блок: окно чата

Цель: ведение переписки, быстрые действия оператора, отправка сообщений.

- `ChatWorkspace` — основной контейнер центральной зоны.
- `ChatHeader` — имя клиента, статус диалога, action-кнопки (пауза/закрыть/передать).
- `MessageThread` — лента сообщений с группировкой по времени/автору.
- `MessageGroup` — блок сообщений одного автора.
- `MessageBubble` — сообщение с визуальным стилем (клиент/оператор/система).
- `MessageMeta` — автор, timestamp, статус доставки/прочтения.
- `SystemInfoLine` — техническая строка (id треда, ОС, браузер).
- `TypingIndicator` — состояние «печатает...», если есть realtime.
- `Composer` — поле ввода, attach, шаблоны/макросы.
- `SendButton` — отправка с disabled/loading/error состояниями.
- `QuickReplies` (опционально) — быстрые ответы.

Рекомендуемое размещение:

- [src/components/chat/ChatWorkspace.tsx](src/components/chat/ChatWorkspace.tsx)
- [src/components/chat/MessageBubble.tsx](src/components/chat/MessageBubble.tsx)

## 3) Правый блок: профиль клиента

Цель: контекст клиента без переключения экранов.

- `CustomerProfilePanel` — контейнер правой колонки.
- `CustomerCard` — имя, сегмент (например, «Премиум»), аватар.
- `CustomerContacts` — телефон, email, предпочтительный канал.
- `CustomerAttributes` — город, услуга, id клиента, теги.
- `CustomerTimeline` (опционально) — последние обращения/события.
- `CustomerActions` (опционально) — позвонить, открыть CRM, создать задачу.

Рекомендуемое размещение:

- [src/components/profile/CustomerProfilePanel.tsx](src/components/profile/CustomerProfilePanel.tsx)
- [src/components/profile/CustomerCard.tsx](src/components/profile/CustomerCard.tsx)

## Общий слой (для всех 3 блоков)

Чтобы компоненты были консистентными и масштабируемыми:

- UI-kit: `Avatar`, `Badge`, `IconButton`, `Input`, `Tooltip`, `Skeleton`, `EmptyState`.
- Состояния: `loading`, `empty`, `error`, `offline`, `newMessage` для каждой панели.
- Типы данных: `Conversation`, `Message`, `CustomerProfile`.
- Контракты данных/API-слой: адаптеры DTO -> UI model.
- A11y: контраст, фокус-стили, клавиатурная навигация, ARIA labels.

Рекомендуемое размещение:

- [src/components/ui/](src/components/ui/)
- [src/types/chat.ts](src/types/chat.ts)
- [src/features/chat/model/](src/features/chat/model/)

## Приоритет реализации (MVP -> расширение)

1. Каркас 3 панелей: `ConversationsPanel` + `ChatWorkspace` + `CustomerProfilePanel`.
2. Базовая лента сообщений и отправка: `MessageThread` + `Composer`.
3. Карточка диалога и профиль клиента: `ConversationListItem` + `CustomerCard`.
4. Состояния загрузки/ошибки/пусто.
5. Фильтры, quick replies, timeline, интеграционные actions.
