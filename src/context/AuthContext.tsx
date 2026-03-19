import { createContext, useState, useEffect, ReactNode } from "react";

// тип пользователя (пока простой)
export type User = {
  name: string;
} | null;

// тип всего контекста
export type AuthContextType = {
  user: User | undefined; // undefined = ещё не проверили
  login: (u: User) => void;
  logout: () => void;
};

// ❗ создаём контекст (по умолчанию null)
export const AuthContext = createContext<AuthContextType | null>(null);

// пропсы провайдера
type AuthProviderProps = {
  children: ReactNode;
};

// главный компонент
export const AuthProvider = ({ children }: AuthProviderProps) => {
  // user:
  // undefined → загрузка
  // null → не авторизован
  // объект → авторизован
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    // ЗАГЛУШКА (потом будет AsyncStorage/API)
    setTimeout(() => {
      setUser(null);
      // setUser({ name: "User" }); // для теста
    }, 1500);
  }, []);

  // 🔹 функции управления
  const login = (u: User) => setUser(u);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {/* всё приложение получает доступ к auth */}
      {children}
    </AuthContext.Provider>
  );
};