export const endpoints = {
  auth: {
    login: "api/auth/login",
    register: "api/users/register",
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