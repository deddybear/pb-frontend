// ─── Provider ─────────────────────────────────────────────────────────────────

import { useState, type JSX } from "react";
import { CheckLogin, ClearSession, GetSession } from "../services/session.service";
import { AuthContext } from "../contexts/auth.context";
import type { DataAccount } from "../models/login.model";

export function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(CheckLogin());
    const [dataAccount, setDataAccount] = useState<DataAccount | null>(GetSession());

    const login = (data: DataAccount): void => {
        setIsLoggedIn(true);
        setDataAccount(data);
    };

    const setDataLogin = (data: DataAccount): void => {
        setDataAccount(data);
    }

    const logout = (): void => {
        ClearSession();
        setDataAccount(null);
        setIsLoggedIn(false);
    };


    return (
        <AuthContext.Provider value={{ isLoggedIn, dataAccount, login, logout, setDataLogin }}>
            {children}
        </AuthContext.Provider>
    );
}

