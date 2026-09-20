import type { User } from "../../features/user/types/user";

export interface AuthContextType {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (token: string) => void;
  logout: () => void;
}