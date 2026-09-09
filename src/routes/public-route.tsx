import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import type { PropsWithChildren } from "react";

const PublicRoutes = ({ children }: PropsWithChildren) => {
  const status = useAppSelector((state) => state.auth.status);

  const location = useLocation();

  const authRoutes = ["/login", "/signup", "/"];

  const isAuthRoute = authRoutes.includes(location.pathname);
  if (status === "authenticated" && isAuthRoute) {
    return <Navigate to="/d/inbox" replace />;
  }

  return children;
};

export default PublicRoutes;
