import apiClient from "../client";
import { endpoints } from "../endpoints";
interface PlacesFilters {
  categories?: string[];
  districts?: string[];
  avgCheckMin?: number;
  avgCheckMax?: number;
  timeOfDay?: string[];
  suitableFor?: string[];
  sortBy?: string;
  sortDir?: "asc" | "desc";
}

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
  getAll: async (filters?: PlacesFilters) => {
    const res = await apiClient.get(endpoints.places.list, {
      params: filters,

      paramsSerializer: (params) => {
        const searchParams = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
          if (value === undefined || value === null) {
            return;
          }

          if (Array.isArray(value)) {
            value.forEach((item) => {
              searchParams.append(key, String(item));
            });
          } else {
            searchParams.append(key, String(value));
          }
        });

        const query = searchParams.toString();
        console.log("QUERY:", query);

        return query;
      },
    });

    return Array.isArray(res.data)
      ? res.data.map(normalizePlace)
      : [];
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