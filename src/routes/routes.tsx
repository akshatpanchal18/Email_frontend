import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layout/public-layout";
import PrivateLayout from "../layout/private-layout";
import { lazy } from "react";
import ProtectedRoute from "./protected-route";
import PublicRoute from "./public-route";
import Home from "../feature/home/pages/home";
import Mailbox from "../feature/mailbox/pages/mailbox";

const LoginPage = lazy(() => import("../feature/auth/pages/login"));
const SignupPage = lazy(() => import("../feature/auth/pages/sign-up"));
const DashboardPage = lazy(
  () => import("../feature/dashboard/pages/dashboard"),
);
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
        element: <Home />,
      },

      {
        path: ":address",
        element: <Mailbox />,
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
        element: <DashboardPage />,
      },
      {
        path: ":address",
        element: <Mailbox />,
      },
    ],
  },
]);
