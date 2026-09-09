import { useEffect, useState, type ReactNode } from "react";
import { useInitializeQuery } from "../store/api/authApi";
import { useAppDispatch } from "../hooks/redux";
import { setAuthStatus, setToken, setUser } from "../store/reducer/auth";
import LazyLoader from "../components/lazyLoader";

interface AppInitializeProps {
  children: ReactNode;
}

const AppInitialize = ({ children }: AppInitializeProps) => {
  const dispatch = useAppDispatch();
  const [ready, setReady] = useState(false);

  // AppInitialize.tsx
  const { data, isSuccess, isError } = useInitializeQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAuthStatus(data.status)); // 'anonymous' | 'authenticated'
      if (data.status === "authenticated") {
        dispatch(setToken(data.accessToken!));
        dispatch(setUser(data.user!));
      }
    }
    if (isSuccess || isError) setReady(true);
  }, [isSuccess, isError, data, dispatch]);
  if (!ready) {
    return <LazyLoader />;
  }

  return children;
};

export default AppInitialize;
