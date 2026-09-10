/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate } from "react-router-dom";
import PublicLayout from "../layout/public-layout";
import PrivateLayout from "../layout/private-layout";
import { lazy } from "react";
import ProtectedRoute from "./protected-route";
import PublicRoute from "./public-route";
import Home from "../feature/home/pages/home";
import Mailbox from "../feature/mailbox/pages/mailbox";
import PrivateInbox from "../feature/dashboard/pages/private-mailbox";

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
        element: <Home />,
      },

      {
        path: ":id",
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
    path: "/d",
    element: (
      <ProtectedRoute>
        <PrivateLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <PrivateInbox />,
      },
      {
        path: "inbox",
        element: <PrivateInbox />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
