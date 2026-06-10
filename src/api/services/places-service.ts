import apiClient from "../client";
import { endpoints } from "../endpoints";

const normalizePlace = (place: any) => {
  let photos: string[] = [];

  if (Array.isArray(place.photos)) {
    photos = place.photos;
  } else if (typeof place.photos === "string") {
    try {
      const parsed = JSON.parse(place.photos);

      photos = Array.isArray(parsed)
        ? parsed
        : [place.photos];
    } catch {
      photos = [place.photos];
    }
  }

  return {
    ...place,
    photos,
  };
};

export const PlacesService = {
  getAll: async () => {
    const res = await apiClient.get(endpoints.places.list);

    return res.data.map(normalizePlace);
  },

  getById: async (id: string) => {
    const res = await apiClient.get(
      endpoints.places.byId(id)
    );

    return normalizePlace(res.data);
  },

  create: async (data: any) => {
    const res = await apiClient.post(
      endpoints.places.create,
      data
    );

    return res.data;
  },
};