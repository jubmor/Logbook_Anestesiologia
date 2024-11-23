import { lazy, Suspense, useEffect, useMemo } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import getRoutes from "@/routes";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

const Toaster = lazy(() => import("@/components/Toaster"));

import { PATHS } from "@/routes/paths";

import NoUserView from "./Views/NoUserView";
import UserView from "./Views/UserView";

import { refreshUser } from "@/store/auth/thunks";
import { logout } from "@/store/auth/module";

import "./styles.scss";
import "@/styles/globals.scss";

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, accessToken } = useAppSelector((state) => state.auth);

  const allRoutes = useMemo(() => {
    const routes = getRoutes(user);
    return routes;
  }, [user]);

  useEffect(() => {
    if (!user) {
      navigate(PATHS.LOGIN);
    }
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token && !user) {
      dispatch(refreshUser());
    } else if (!token) {
      dispatch(logout());
    }
  }, [accessToken]);

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
