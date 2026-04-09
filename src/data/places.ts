export type Place = {
  id: number;
  title: string;
  image: string; // URL
  rating: number;
  address: string;
  schedule: string;
  type: string; // например: "парк", "кафе", "тц"
  tags: string[];
};

export const places: Place[] = [
    {
    id: 1,
    title: "KARIN",
    image: "https://avatars.mds.yandex.net/get-altay/7690462/2a000001888ef96f495f3c849259e3511cc8/XXXL",
    rating: 5.0,
    address: "бул. Гагарина 65а",
    schedule: "Пн-пт 12:00–23:00; Вс 14:00-23:00",
    type: "Ресторан",
    tags: ["еда", "в помещении"]
    
  },
  {
    id: 2,
    title: "Парк Горького",
    image: "https://vetta.tv/upload/iblock/49b/49b648d08e6a568e0b4567fe68fbf9a7.jpg",
    rating: 5.0,
    address: "Сибирская 49",
    schedule: "Пн-пт 09:00–18:00",
    type: "Аттракционы",
    tags: ["природа", "прогулка"]
  },
  {
    id: 3,
    title: "Imall Эспланада",
    image: "https://avatars.mds.yandex.net/get-altay/12721348/2a00000198ec482a0f8dd6a7a9addc0c117e/orig",
    rating: 5.0,
    address: "Петропавловская 73а",
    schedule: "Ежедневно 10:00–22:00",
    type: "Торговый центр",
    tags: ["шопинг", "еда"]
  }
];