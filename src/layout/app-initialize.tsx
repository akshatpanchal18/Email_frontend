import { useEffect, type ReactNode } from "react";
import { useInitializeQuery } from "../store/api/authApi";
import { useAppDispatch } from "../hooks/redux";
import { setAuthStatus, setToken, setUser } from "../store/reducer/auth";
import LazyLoader from "../components/lazyLoader";

interface AppInitializeProps {
  children: ReactNode;
}

const AppInitialize = ({ children }: AppInitializeProps) => {
  const dispatch = useAppDispatch();
  const { data, isSuccess, isLoading, isUninitialized } = useInitializeQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAuthStatus(data.status));
      if (data.status === "authenticated") {
        dispatch(setToken(data.token!));
        dispatch(setUser(data.user!));
      }
    }
  }, [isSuccess, data, dispatch]);

  if (isLoading || isUninitialized) {
    return <LazyLoader />;
  }

  return children;
};

export default AppInitialize;
