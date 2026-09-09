import { type PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAppSelector } from "../hooks/redux";

const ProtectedRoutes = ({ children }: PropsWithChildren) => {
  const status = useAppSelector((state) => state.auth.status);
  const location = useLocation();

  if (status !== "authenticated") {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};
export default ProtectedRoutes;
