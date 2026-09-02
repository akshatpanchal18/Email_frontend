import { Navigate } from "react-router-dom";

import { useAppSelector } from "../hooks/redux";
import type { PropsWithChildren } from "react";

const PublicRoutes = ({ children }: PropsWithChildren) => {
  const token = useAppSelector((state) => state.state.token);

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoutes;
