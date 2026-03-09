// ─── Hook ─────────────────────────────────────────────────────────────────────

import type { AuthContextType } from "../models/auth.model";
import { AuthContext } from "../contexts/auth.context";
import { useContext } from "react";

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }
  return context;
}