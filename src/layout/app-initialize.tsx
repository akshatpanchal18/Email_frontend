import { useEffect, type ReactNode } from "react";
import { useRestoreSessionQuery } from "../store/api/authApi";
import { useAppDispatch } from "../hooks/redux";
import { setToken, setUserType } from "../store/state";
import LazyLoader from "../components/lazyLoader";

interface AppInitializeProps {
  children: ReactNode;
}

const AppInitialize = ({ children }: AppInitializeProps) => {
  const dispatch = useAppDispatch();

  const { data, isLoading, isSuccess } = useRestoreSessionQuery();

  useEffect(() => {
    if (isSuccess && data.success) {
      dispatch(setToken(data.data.token));
      dispatch(setUserType(data.data.type));
    }
  }, [data, isSuccess, dispatch]);
  if (isLoading) {
    return <LazyLoader />;
  }
  return !isLoading && children;
};

export default AppInitialize;
