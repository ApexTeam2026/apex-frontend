import apiClient from "../client";

export const UserPlaceService = {

  addFavorite: async (data: {
    userId: number;
    placeId: number;
    isFavorite: boolean;
    isVisited: boolean;
    rating: number;
  }) => {

    const res = await apiClient.post(
      "/api/user-place/favorite",
      data
    );

    return res.data;
  },

  setVisited: async (data: {
    userId: number;
    placeId: number;
    isFavorite: boolean;
    isVisited: boolean;
    rating: number;
  }) => {

    const res = await apiClient.post(
      "/api/user-place/visited",
      data
    );

    return res.data;
  },

  updateRating: async (
    userId: number,
    placeId: number,
    rating: number
  ) => {

    const res = await apiClient.post(
      `/api/user-place/rating?userId=${userId}&placeId=${placeId}&rating=${rating}`
    );

    return res.data;
  },

  getFavorites: async (
    userId: number
  ) => {

    const res = await apiClient.get(
      `/api/user-place/favorites/${userId}`
    );

    return res.data;
  },

  getVisited: async (
    userId: number
  ) => {

    const res = await apiClient.get(
      `/api/user-place/visited/${userId}`
    );

    return res.data;
  },
};