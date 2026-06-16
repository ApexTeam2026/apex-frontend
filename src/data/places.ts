export interface Place {
  /** Уникальный ID в базе данных */
  placeId: number;

  /** ID из внешнего источника */
  externalId: string;

  /** Название места */
  name: string;

  /** Описание места (показывается на детальной странице) */
  description?: string;

  /** Координаты в формате "lat,lng" (для карты) */
  coordinates: string;

  /** Адрес */
  address: string;

  /** Массив изображений (галерея, слайдер) */
  images: string[];

  /** Превью (первое изображение для списка) */
  image: string;

  /** Теги (используются для фильтрации и UI) */
  tags: string[];

  /** Категория (ресторан, парк и т.д.) */
  category: string;

  /** Рейтинг (0–5) */
  rate?: number;

  /** Ценовая категория */
  priceCategory?: string;

  /** Средний чек (в рублях) */
  averageCheck?: number;

  /** Район */
  district?: string;

  /** Время работы */
  workingHours?: string;

  /** Сайт */
  website?: string;

  /** Для кого подходит (один, пара, семья и т.д.) */
  suitableFor?: string[];

  /** Лучшее время посещения (утро, день, вечер) */
  timeOfDay?: string[];

  /** Дата создания записи */
  createdAt?: string;

  /** Дата последнего обновления */
  updatedAt?: string;
}

export const places: Place[] = [
  {
    placeId: 1,
    externalId: "rest_1",

    name: "KARIN",
    description: "Уютный ресторан",

    coordinates: "58.0105,56.2502",
    address: "бул. Гагарина 65а",

    images: [
      "https://avatars.mds.yandex.net/get-altay/7690462/2a000001888ef96f495f3c849259e3511cc8/XXXL",
      "https://picsum.photos/400/300?1",
      "https://picsum.photos/400/300?2"
    ],
    image: "https://avatars.mds.yandex.net/get-altay/7690462/2a000001888ef96f495f3c849259e3511cc8/XXXL",

    rate: 5.0,
    workingHours: "Пн-пт 12:00–23:00; Вс 14:00-23:00",

    timeOfDay: ["вечер"],
    // TODO: оптимизировать проверки (пока что регистр важен)
    suitableFor: ["Вдвоем", "Компания", "Один"],

    category: "Ресторан",
    tags: ["еда", "в помещении"],

    averageCheck: 1500,
    district: "Центр",
  },

  {
    placeId: 2,
    externalId: "park_1",

    name: "Парк Горького",
    coordinates: "58.009,56.226",
    address: "Сибирская 49",

    images: [
      "https://vetta.tv/upload/iblock/49b/49b648d08e6a568e0b4567fe68fbf9a7.jpg",
      "https://picsum.photos/400/300?3"
    ],
    image: "https://vetta.tv/upload/iblock/49b/49b648d08e6a568e0b4567fe68fbf9a7.jpg",

    rate: 5.0,
    workingHours: "Пн-пт 09:00–18:00",

    category: "Аттракционы",
    tags: ["природа", "прогулка"],
  },

  {
    placeId: 3,
    externalId: "mall_1",

    name: "Imall Эспланада",
    coordinates: "58.010,56.234",
    address: "Петропавловская 73а",

    images: [
      "https://avatars.mds.yandex.net/get-altay/12721348/2a00000198ec482a0f8dd6a7a9addc0c117e/orig",
      "https://picsum.photos/400/300?4"
    ],
    image: "https://avatars.mds.yandex.net/get-altay/12721348/2a00000198ec482a0f8dd6a7a9addc0c117e/orig",

    rate: 5.0,
    workingHours: "Ежедневно 10:00–22:00",

    category: "Торговый центр",
    tags: ["шопинг", "еда"],
  }
];