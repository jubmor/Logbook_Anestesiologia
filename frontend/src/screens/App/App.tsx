import { lazy, Suspense, useEffect, useMemo } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import getRoutes from "@/routes";

import { useAppSelector } from "@/store/hooks";

const Toaster = lazy(() => import("@/components/Toaster"));

import "./styles.scss";
import "@/styles/globals.scss";
import { PATHS } from "@/routes/paths";
import NoUserView from "./Views/NoUserView";
import UserView from "./Views/UserView";

function App() {
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);

  const allRoutes = useMemo(() => {
    const routes = getRoutes(user);
    return routes;
  }, [user]);

  useEffect(() => {
    if (!user) {
      navigate(PATHS.LOGIN);
    }
  }, [user]);

  return (
    <div className="container">
      <Suspense fallback={<div>Loading...</div>}>
        {!user ? <NoUserView routes={allRoutes} /> : <UserView routes={allRoutes} user={user} />}

        <Toaster />
      </Suspense>
    </div>
  );
}

export default App;
