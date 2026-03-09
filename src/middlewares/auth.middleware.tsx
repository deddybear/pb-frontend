import { Navigate } from "react-router";
import type { ProtectedRouteProps } from "../models/auth.model";
import type { JSX } from "react";
import { useAuth } from "../hooks/useAuth.hook";


export default function AuthRouteProtected({ children }: ProtectedRouteProps): JSX.Element {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}