import apiClient from "../client";

export const UserPlaceService = {
  addFavorite: async (data: {
    userId: number;
    placeId: number;
    isFavorite: boolean;
    isVisited: boolean;
  }) => {
    console.log("ADD FAVORITE BODY:");
    console.log(JSON.stringify(data, null, 2));
    const res = await apiClient.post(
      "/api/user-place/favorite",
      data
    );

    return res.data;
  },

  getFavorites: async (userId: number) => {
    const res = await apiClient.get(
      `/api/user-place/favorites/${userId}`
    );

    return res.data;
  },
};