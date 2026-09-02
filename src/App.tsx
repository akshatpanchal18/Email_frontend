import { RouterProvider } from "react-router-dom";
import { appRoutes } from "./routes/routes";
import AppInitialize from "./layout/app-initialize";
import { Toaster } from "sonner";

const App = () => {
  return (
    <AppInitialize>
      <Toaster position="top-right" richColors closeButton />
      <RouterProvider router={appRoutes} />
    </AppInitialize>
  );
};

export default App;
