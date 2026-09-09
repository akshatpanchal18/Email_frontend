// App.tsx
import { RouterProvider } from "react-router-dom";
import { appRoutes } from "./routes/routes";
import { Toaster } from "sonner";
import { lazy, Suspense } from "react";
import AppInitialize from "./layout/app-initialize";

const MaintenancePage = lazy(() => import("./layout/maintenance"));

const App = () => {
  const isMaintenanceMode = import.meta.env.VITE_MAINTENANCE_MODE === "true";

  if (isMaintenanceMode) {
    return (
      <Suspense fallback={null}>
        <MaintenancePage />
      </Suspense>
    );
  }

  return (
    <AppInitialize>
      <Toaster position="top-right" richColors closeButton />
      <RouterProvider router={appRoutes} />
    </AppInitialize>
  );
};

export default App;
