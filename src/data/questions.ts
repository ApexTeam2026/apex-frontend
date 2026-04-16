export type Option = {
  label: string;
  value: string;
};

export type Question = {
  id: number;
  text: string;
  options: Option[];
};

export const questions: Question[] = [
  {
    id: 1,
    text: "С кем вы собираетесь посетить место?",
    options: [
      { label: "Один", value: "solo" },
      { label: "С компанией", value: "friends" },
      { label: "С семьей", value: "family" },
      { label: "Неважно", value: "any" },
    ],
  },
  {
    id: 2,
    text: "Вы уже бывали в Перми?",
    options: [
      { label: "Да", value: "visited" },
      { label: "Нет", value: "new" },
      { label: "Неважно", value: "any" },
    ],
  },
  {
    id: 3,
    text: "Какой бюджет на человека?",
    options: [
      { label: "Нет", value: "free" },
      { label: "до 1500 ₽", value: "low" },
      { label: "1500-3000 ₽", value: "medium" },
      { label: "3000-10000 ₽", value: "high" },
      { label: "от 10000 ₽", value: "luxury" },
      { label: "Неважно", value: "any" },
    ],
  },
  {
    id: 4,
    text: "Какой формат отдыха вы предпочитаете?",
    options: [
      { label: "Активный", value: "active" },
      { label: "Спокойный", value: "chill" },
      { label: "Неважно", value: "any" },
    ],
  },
  {
    id: 5,
    text: "В какое время планируете идти?",
    options: [
      { label: "Утро", value: "morning" },
      { label: "День", value: "day" },
      { label: "Вечер", value: "evening" },
      { label: "Ночь", value: "night" },
      { label: "Неважно", value: "any" },
    ],
  },
  {
    id: 6,
    text: "Какое у вас сегодня настроение?",
    options: [
      { label: "Расслабленное", value: "relax" },
      { label: "Весёлое", value: "fun" },
      { label: "Романтичное", value: "romantic" },
      { label: "Любознательное", value: "curious" },
      { label: "Энергичное", value: "energetic" },
    ],
  },
  {
    id: 7,
    text: "Интересуют ли вас культурные места города?",
    options: [
      { label: "Да", value: "culture" },
      { label: "Нет", value: "no-culture" },
      { label: "Неважно", value: "any" },
    ],
  },
  {
    id: 8,
    text: "Где хотите провести время?",
    options: [
      { label: "На улице", value: "outdoor" },
      { label: "В помещении", value: "indoor" },
      { label: "Неважно", value: "any" },
    ],
  },
];