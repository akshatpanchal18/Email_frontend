import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layout/public-layout";
import PrivateLayout from "../layout/private-layout";
import { lazy } from "react";
import ProtectedRoute from "./protected-route";
import PublicRoute from "./public-route";

const LoginPage = lazy(() => import("../feature/auth/pages/login"));
const SignupPage = lazy(() => import("../feature/auth/pages/sign-up"));
export const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <PublicLayout />
      </PublicRoute>
    ),
    children: [
      {
        index: true,
        element: <div>Home</div>,
      },

      {
        path: ":address",
        element: <div>Address</div>,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <PrivateLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <div>Private Home</div>,
      },
      {
        path: ":address",
        element: <div>address</div>,
      },
    ],
  },
]);
