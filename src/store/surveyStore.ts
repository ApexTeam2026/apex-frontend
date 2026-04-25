import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type SurveyState = {
  current: number;
  answers: Record<string, string>;
  selected: string | null;

  started: boolean;
  completed: boolean;

  setStarted: (v: boolean) => void;
  setCompleted: (v: boolean) => void;

  setCurrent: (v: number) => void;
  setSelected: (v: string | null) => void;

  setAnswer: (questionId: string, value: string) => void;

  reset: () => void;
};

export const useSurveyStore = create<SurveyState>()(
  persist(
    (set) => ({
      current: 0,
      answers: {},
      selected: null,

      started: false,
      completed: false,

      setStarted: (v) => set({ started: v }),
      setCompleted: (v) => set({ completed: v }),

      setCurrent: (v) => set({ current: v }),
      setSelected: (v) => set({ selected: v }),

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
          selected: null,
          started: false,
          completed: false,
        }),
    }),
    {
      name: "survey-storage",

      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);