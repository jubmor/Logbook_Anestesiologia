import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { RouteProps } from "@/routes";
import AnimatedRoute from "@/routes/RouteComponents/AnimatedRoute";
import ProtectedRoute from "@/routes/RouteComponents/ProtectedRoute";

import Error404 from "@/screens/404";
import { AnimatePresence } from "framer-motion";

import DrawerMenu from "@/components/DrawerMenu";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { useScreenWidth } from "@/hooks/useScreenWidth";
import { UserProps } from "@/types/User";

const UserView = ({ routes, user }: { routes: RouteProps[]; user: UserProps }) => {
  const screenWidth = useScreenWidth();
  let location = useLocation();
  const is404 = location.pathname === "/404";

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%"
      }}
    >
      {screenWidth > 769 && !is404 && <DrawerMenu />}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          height: "100%",
          overflow: "auto"
        }}
      >
        <Header />

        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {routes &&
              routes.map((route) => {
                return (
                  <Route key={route.path} element={<ProtectedRoute type={user.usertype} />}>
                    <Route path={route.path} element={<AnimatedRoute route={route} />}>
                      {route.children &&
                        route.children.map((child) => (
                          <Route
                            key={child.path}
                            path={child.path}
                            element={<AnimatedRoute route={child} />}
                          />
                        ))}
                    </Route>
                  </Route>
                );
              })}
            <Route path="*" element={<Error404 />} />
          </Routes>
        </AnimatePresence>

        <Footer />
      </div>
    </div>
  );
};

export default UserView;

/* 
  

*/
