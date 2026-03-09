import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth.hook";
import type { JSX } from "react";
import type { ProtectedRoutePropsGuest } from "../models/guest.model";

export default function GuestRoute({ children }: ProtectedRoutePropsGuest): JSX.Element {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}