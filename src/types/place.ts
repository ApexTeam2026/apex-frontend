export type Place = {
  placeId: number;
  externalId?: string;

  name: string;
  description?: string;

  coordinates?: string;

  address: string;

  tags: string[];

  category: string;

  rate: number;

  priceCategory?: string;

  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;

  averageCheck?: number;

  district?: string;

  workingHours?: string;

  website?: string;

  suitableFor?: string[];

  timeOfDay?: string[];

  photos?: string;

  image?: string;

  avgCheck?: number;     
  
};