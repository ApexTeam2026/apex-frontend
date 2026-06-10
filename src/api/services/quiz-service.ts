import apiClient from "../client";
import { endpoints } from "../endpoints";

export const QuizService = {
  submit: async (data: Record<string, string>) => {
  const res = await apiClient.post(endpoints.places.quiz, data);
  return res.data;
}
};