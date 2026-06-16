import apiClient from "../client";
import { endpoints } from "../endpoints";

export const CategoriesService = {
  getAll: async () => {
    const res = await apiClient.get(endpoints.categories.list);
    return res.data;
  },
};