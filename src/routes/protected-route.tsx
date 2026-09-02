import { type PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAppSelector } from "../hooks/redux";

const ProtectedRoutes = ({ children }: PropsWithChildren) => {
  const token = useAppSelector((state) => state.state.token);

  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoutes;
