import { createContext } from "react";
import type { AuthContextType } from "../models/auth.model";


// ─── Context ──────────────────────────────────────────────────────────────────

export const AuthContext = createContext<AuthContextType | null>(null);

