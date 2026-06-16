<div align="center">

# /Пермь

### Мобильный гид по интересным местам города

Открывайте новые места, сохраняйте избранное, отмечайте посещённые локации и получайте персональные рекомендации.

<br>

![React Native](https://img.shields.io/badge/React%20Native-0.79-blue?logo=react)
![Expo](https://img.shields.io/badge/Expo-SDK%2054-black?logo=expo)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![Android](https://img.shields.io/badge/Platform-Android-green?logo=android)
![REST API](https://img.shields.io/badge/API-REST-orange)

</div>

---

## 🚀 О проекте

**/Пермь** — мобильное приложение для поиска интересных мест города и получения персонализированных рекомендаций.

Приложение помогает пользователям находить новые локации для отдыха, прогулок, встреч с друзьями и посещения заведений.

### Основные возможности

- 🔍 Поиск мест по названию
- 🎯 Персональные рекомендации через опрос
- 📍 Подробные карточки мест
- ❤️ Избранные места
- ✅ Посещённые места
- ⭐ Оценка локаций
- 👤 Профиль пользователя
- 🔐 Авторизация и регистрация

---

## 📱 Скриншоты


<table align="center">
<tr>

<td align="center">
<img width="220" alt="Список всех мест" src="https://github.com/user-attachments/assets/252d2650-21f2-456f-913c-e125e7d44d9f" />
<br>
Список всех мест
</td>

<td align="center">
<img width="220" alt="Главная" src="https://github.com/user-attachments/assets/40641415-895f-483f-9e23-881bfe62b828" />
<br>
Главный экран
</td>

<td align="center">
<img width="220" alt="Профиль" src="https://github.com/user-attachments/assets/ef6ef921-d635-4342-b59f-96a130e9b27a" />
<br>
Профиль
</td>

</tr>
<tr>
    
  <td align="center">
  <img width="220" alt="Опрос" src="https://github.com/user-attachments/assets/3498c438-da8d-40c2-9b4b-4cc7f5c87f6f" />
  <br>
  Опрос
  </td>

  <td align="center">
  <img width="220" alt="Итог опроса" src="https://github.com/user-attachments/assets/266bcd0f-fc3c-4205-8471-4ab1672a603b" />
  <br>
  Итог опроса
  </td>

  <td align="center">
  <img width="220" alt="Детальная страница" src="https://github.com/user-attachments/assets/d727e125-3542-4dae-b9b2-009e9d29d6fb" />
  <br>
  Карточка места
  </td>

</tr>
</table>

---

# ✨ Возможности

### 🔍 Каталог мест

- Получение списка мест с сервера
- Поиск по названию
- Фильтрация по категориям
- Просмотр подробной информации

### 🎯 Персональные рекомендации

- Прохождение опроса
- Получение рекомендаций через API
- Формирование индивидуальной подборки мест

### ❤️ Избранное

- Добавление мест в избранное
- Синхронизация с сервером
- Отображение списка избранных мест

### ✅ Посещённые места

- Хранение истории посещений
- Отображение посещённых локаций

### ⭐ Оценки

- Возможность оценивать места
- Сохранение рейтингов пользователя

### 👤 Профиль

- Регистрация
- Авторизация
- Получение данных пользователя
- Выход из аккаунта

---

# 🏗 Архитектура

```text
┌──────────────────────┐
│   Mobile Application │
│ React Native + Expo  │
└──────────┬───────────┘
           │ REST API
           ▼
┌──────────────────────┐
│     Spring Boot      │
│      Backend API     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│     PostgreSQL       │
│      Database        │
└──────────────────────┘
```

---

# 🛠 Технологический стек

## Frontend

| Технология | Назначение |
|------------|------------|
| React Native | Мобильное приложение |
| Expo | Среда разработки |
| TypeScript | Типизация |
| Expo Router | Навигация |
| Axios | HTTP-запросы |
| Gluestack UI | UI-компоненты |
| Context API | Глобальное состояние |

---
# 📂 Структура проекта

```text
app/                    # Экраны приложения и маршрутизация Expo Router

src/
├── api/                # Работа с REST API
├── assets/             # Изображения и SVG ресурсы
├── components/         # Переиспользуемые UI-компоненты
├── constants/          # Константы приложения
├── context/            # React Context
├── data/               # Локальные данные
├── hooks/              # Пользовательские React Hooks
├── providers/          # Глобальные провайдеры приложения
├── store/              # Глобальное состояние
└── types/              # TypeScript типы
```

---

# 🔐 Авторизация

Приложение использует JWT-аутентификацию.

```text
Login Screen
      │
      ▼
POST /api/auth/login
      │
      ▼
Access Token
      │
      ▼
GET /api/users/me
      │
      ▼
Auth Context
```

### Возможности

- JWT токены
- Axios Interceptors
- Защищённые маршруты
- Автоматическое добавление Authorization Header
- Централизованная обработка ошибок

---

# 🌐 REST API

Frontend взаимодействует с backend через REST API и получает данные в формате JSON.

## Авторизация

```http
POST /api/auth/login
POST /api/users/register
GET  /api/users/me
```

## Места

```http
GET /api/places
GET /api/places/{id}
POST /api/places
POST /api/places/quiz
```

## Пользовательские места

```http
GET  /api/user-place/favorites/{userId}
GET  /api/user-place/visited/{userId}

POST /api/user-place/favorite
POST /api/user-place/rating
```

## Категории

```http
GET /categories
```

---

# ⚙️ Установка

### Клонирование проекта

```bash
git clone https://github.com/ApexTeam2026/apex-frontend
```

### Установка зависимостей

```bash
npm install
```

### Настройка окружения

Создать файл `.env`

```env
API_URL=https://your-api-url.com
```

### Запуск

```bash
npx expo start
```

---

# 📦 Сборка APK

### Preview Build

```bash
eas build --platform android --profile preview
```

### Production Build

```bash
eas build --platform android --profile production
```

---

# 🚀 Roadmap

- [ ] Карта мест
- [ ] Геолокация пользователя
- [ ] Push-уведомления
- [ ] Offline Cache
- [ ] Персональные рекомендации на основе истории

---

Проект разработан в рамках дисциплины "Проектная практика программирования".

---

<div align="center">

### 📍 Открывай новые места вместе с /Пермь

</div>
