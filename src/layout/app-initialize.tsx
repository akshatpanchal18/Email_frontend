import { useEffect, useState, type ReactNode } from "react";
import { useRestoreSessionQuery } from "../store/api/authApi";
import { useAppDispatch } from "../hooks/redux";
import { setToken, setUserType } from "../store/state";
import LazyLoader from "../components/lazyLoader";

interface AppInitializeProps {
  children: ReactNode;
}

const AppInitialize = ({ children }: AppInitializeProps) => {
  const dispatch = useAppDispatch();
  const [ready, setReady] = useState(false);

  const { data, isSuccess, isError } = useRestoreSessionQuery();

  useEffect(() => {
    if (isSuccess && data.success) {
      dispatch(setToken(data.data.token));
      dispatch(setUserType(data.data.type));
    }

    if (isSuccess || isError) {
      setReady(true);
    }
  }, [isSuccess, isError, data, dispatch]);

  if (!ready) {
    return <LazyLoader />;
  }

  return children;
};

export default AppInitialize;
