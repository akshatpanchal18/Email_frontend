/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./protected-route";
import PublicRoute from "./public-route";
import Home from "../feature/home/pages/home";
import Mailbox from "../feature/mailbox/pages/mailbox";
import PrivateInbox from "../feature/dashboard/pages/private-mailbox";
import RootLayout from "../layout/root-layout";

const LoginPage = lazy(() => import("../feature/auth/pages/login"));
const SignupPage = lazy(() => import("../feature/auth/pages/sign-up"));
const TermsOfUsePage = lazy(() => import("../feature/legal-pages/pages/terms-of-use"));
const PrivacyPolicyPage = lazy(() => import("../feature/legal-pages/pages/privacy-policy"));
const ProfilePage = lazy(() => import("../feature/dashboard/pages/profile"));
const PageLoader = () => <div className="flex min-h-screen items-center justify-center">Loading...</div>;

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => <Suspense fallback={<PageLoader />}>{children}</Suspense>;
export const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <RootLayout isPublic={true} />
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
        <RootLayout isPublic={false} />
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
      {
        path: "profile",
        element: (
          <SuspenseWrapper>
            {" "}
            <ProfilePage />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
  {
    path: "/privacy-policy",
    element: (
      <SuspenseWrapper>
        <PrivacyPolicyPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "terms-of-use",
    element: (
      <SuspenseWrapper>
        <TermsOfUsePage />
      </SuspenseWrapper>
    ),
  },
]);
