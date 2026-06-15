export const endpoints = {
  auth: {
    login: "/api/auth/login",
    register: "/api/users/register",
  },

  users: {
    me: "/api/users/me",
  },

  places: {
    list: "/api/places",
    quiz: ("/api/places/quiz"),
    byId: (id: string | number) => `/api/places/${id}`,
    create: "/api/places",
  },

  categories: {
    list: "/categories",
  },

  userPlace: {
  favorites: (userId: number) =>
    `/api/user-place/favorites/${userId}`,

  visited: (userId: number) =>
    `/api/user-place/visited/${userId}`,

  favorite: "/api/user-place/favorite",

  rating:
    "/api/user-place/rating",
},
};