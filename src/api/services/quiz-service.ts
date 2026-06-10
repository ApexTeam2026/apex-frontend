import apiClient from "../client";
import { endpoints } from "../endpoints";

export type QuizPayload = {
  tags: string[];
  suitableFor: string[];
  timeOfDay: string[];
  priceCategory: string[];
};

export type QuizResponse = {
  ids: number[];
};

export const QuizService = {
  submit: async (data: QuizPayload): Promise<QuizResponse> => {
    const res = await apiClient.post(endpoints.places.quiz, data);
    return res.data;
  },
};