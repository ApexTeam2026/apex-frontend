export const endpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
  },

  places: {
    list: "/places",
    byId: (id: string) => `/places/${id}`,
    create: "/places",
  },

  categories: {
    list: "/categories",
  },
};