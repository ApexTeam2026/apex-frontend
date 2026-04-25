import apiClient from "../client";
import { endpoints } from "../endpoints";

export const AuthService = {
  login: async (email: string, password: string) => {
    const res = await apiClient.post(endpoints.auth.login, {
      email,
      password,
    });

    return res.data;
  },

  register: async (data: {
    email: string;
    password: string;
    name: string;
  }) => {
    const res = await apiClient.post(endpoints.auth.register, data);
    return res.data;
  },
};