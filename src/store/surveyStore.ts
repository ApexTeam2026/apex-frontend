import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type SurveyState = {
  current: number;
  answers: Record<string, string>;

  started: boolean;
  completed: boolean;

  setStarted: (v: boolean) => void;
  setCompleted: (v: boolean) => void;

  setCurrent: (v: number) => void;

  setAnswer: (questionId: string, value: string) => void;

  reset: () => void;
};

export const useSurveyStore = create<SurveyState>()(
  persist(
    (set) => ({
      current: 0,
      answers: {},

      started: false,
      completed: false,

      setStarted: (v) => set({ started: v }),
      setCompleted: (v) => set({ completed: v }),

      setCurrent: (v) => set({ current: v }),

      setAnswer: (questionId, value) =>
        set((state) => ({
          answers: {
            ...state.answers,
            [questionId]: value,
          },
        })),

      reset: () =>
        set({
          current: 0,
          answers: {},
          started: false,
          completed: false,
        }),
    }),
    {
      name: "survey-storage",
      storage: createJSONStorage(() => AsyncStorage),

      // 🔥 ВАЖНО: чтобы не было "залипания" старого квиза
      partialize: (state) => ({
        answers: state.answers,
        current: state.current,
      }),
    }
  )
);