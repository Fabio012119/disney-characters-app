import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import type { ReactElement, PropsWithChildren } from "react";

type GuardProps = PropsWithChildren<{ children: ReactElement }>;

export function RootRedirect() {
  const isLoggedIn = useAppSelector((s) => s.auth.isLoggedIn);
  return <Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />;
}

export function AuthRoute({ children }: GuardProps) {
  const isLoggedIn = useAppSelector((s) => s.auth.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export function GuestRoute({ children }: GuardProps) {
  const isLoggedIn = useAppSelector((s) => s.auth.isLoggedIn);
  return isLoggedIn ? <Navigate to="/dashboard" replace /> : children;
}
