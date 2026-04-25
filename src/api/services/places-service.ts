import apiClient from "../client";
import { endpoints } from "../endpoints";

export const PlacesService = {
  getAll: async () => {
    const res = await apiClient.get(endpoints.places.list);
    return res.data;
  },

  getById: async (id: string) => {
    const res = await apiClient.get(endpoints.places.byId(id));
    return res.data;
  },

  create: async (data: any) => {
    const res = await apiClient.post(endpoints.places.create, data);
    return res.data;
  },
};