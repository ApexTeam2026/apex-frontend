export const endpoints = {
  auth: {
    login: "api/auth/login",
    register: "api/users/register",
  },

  users: {
    me: "/api/users/me",
  },

  places: {
    list: "/api/places",
    byId: (id: string) => `/api/places/${id}`,
    create: "/api/places",
  },

  categories: {
    list: "/categories",
  },
};