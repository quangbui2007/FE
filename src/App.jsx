import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import { useRoutes } from "react-router-dom";
import { appRoutes } from "./routes";
function App() {
  const routes = useRoutes(appRoutes);
  const { isLoadingCheckAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoadingCheckAuth)
    return <Skeleton className="w-[800] bg-black h-[100vh]" />;
  return <div className="flex flex-col overflow-hidden bg-white">{routes}</div>;
}

export default App;
