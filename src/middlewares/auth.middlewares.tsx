import { Navigate } from "react-router";
import type { ProtectedRouteProps } from "../models/auth.middleware.model";
import type { JSX } from "react";


// Cek apakah user sudah login
// Sesuaikan dengan cara kamu menyimpan token (localStorage, sessionStorage, dll)
const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("ab6_log_stat");
  return token !== null && token !== "";
};

export default function AuthRouteProtected({ children }: ProtectedRouteProps): JSX.Element {
  if (!isAuthenticated()) {
    // Redirect ke login jika belum login
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}