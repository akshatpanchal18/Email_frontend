import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import type { PropsWithChildren } from "react";

const PublicRoutes = ({ children }: PropsWithChildren) => {
  const token = useAppSelector((state) => state.state.token);
  const location = useLocation();

  const authRoutes = ["/login", "/signup"];

  const isAuthRoute = authRoutes.includes(location.pathname);

  if (token && isAuthRoute) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoutes;
