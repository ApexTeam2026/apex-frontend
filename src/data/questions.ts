export type Option = {
  label: string;
  value: string;
};

export type Question = {
  id: string;
  text: string;
  options: Option[];
};

export const questions: Question[] = [
  {
    id: "suitableFor",
    text: "С кем вы собираетесь посетить место?",
    options: [
      { label: "Один", value: "solo" },
      { label: "С компанией", value: "friends" },
      { label: "С семьей", value: "family" },
      { label: "Неважно", value: "any" },
    ],
  },
  {
    id: "visited",
    text: "Вы уже бывали в Перми?",
    options: [
      { label: "Да", value: "visited" },
      { label: "Нет", value: "new" },
      { label: "Неважно", value: "any" },
    ],
  },
  {
    id: "priceCategory",
    text: "Какой бюджет на человека?",
    options: [
      { label: "до 1500 ₽", value: "low_budget" },
      { label: "1500-3000 ₽", value: "medium_budget" },
      { label: "3000-10000 ₽", value: "high_budget" },
      { label: "Бесплатно", value: "free" },
      { label: "Неважно", value: "any" },
    ],
  },
  {
    id: "timeOfDay",
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
    id: "mood",
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
    id: "culture",
    text: "Интересуют ли вас культурные места города?",
    options: [
      { label: "Да", value: "culture" },
      { label: "Нет", value: "no-culture" },
      { label: "Неважно", value: "any" },
    ],
  },
  {
    id: "locationType",
    text: "Где хотите провести время?",
    options: [
      { label: "На улице", value: "outdoor" },
      { label: "В помещении", value: "indoor" },
      { label: "Неважно", value: "any" },
    ],
  },
];