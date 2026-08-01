import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { TOKEN_STORAGE_KEY } from "@/lib/apiClient";
import { loginRequest, registerRequest, meRequest, updateCurrencyRequest } from "../api/authApi";
import type { LoginPayload, RegisterPayload, User, Currency } from "../types";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  updateCurrency: (currency: Currency) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!token) {
      setIsLoading(false);
      return;
    }

    meRequest()
      .then(setUser)
      .catch(() => localStorage.removeItem(TOKEN_STORAGE_KEY))
      .finally(() => setIsLoading(false));
  }, []);

  async function login(payload: LoginPayload) {
    const { user, token } = await loginRequest(payload);
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    setUser(user);
  }

  async function register(payload: RegisterPayload) {
    const { user, token } = await registerRequest(payload);
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    setUser(user);
  }

  function logout() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setUser(null);
    queryClient.clear();
  }

  async function updateCurrency(currency: Currency) {
    const updated = await updateCurrencyRequest(currency);
    setUser(updated);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateCurrency }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit être utilisé dans un AuthProvider");
  return ctx;
}
