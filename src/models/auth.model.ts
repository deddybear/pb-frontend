import type { DataAccount } from "./login.model";

export interface ProtectedRouteProps {
  children: React.ReactNode;
}

export interface AuthContextType {
  isLoggedIn: boolean;
  dataAccount: DataAccount | null;
  login: (data: DataAccount) => void;
  setDataLogin: (data: DataAccount) => void;
  logout: () => void;
}
