// src/hooks/useAuth.ts

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// 🔥 кастомный хук
export const useAuth = () => {
  const context = useContext(AuthContext);

  // ❗ защита от использования вне provider
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};