import React from "react";
import { Route, Routes } from "react-router-dom";

import { RouteProps } from "@/routes";
import AnimatedRoute from "@/routes/RouteComponents/AnimatedRoute";
import ProtectedRoute from "@/routes/RouteComponents/ProtectedRoute";

import Error404 from "@/screens/404";
import { AnimatePresence } from "framer-motion";

const NoUserView = ({ routes }: { routes: RouteProps[] }) => {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        {routes &&
          routes.map((route) => {
            return (
              <Route key={route.path} element={<ProtectedRoute type={undefined} />}>
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
                ;
              </Route>
            );
          })}

        <Route path="*" element={<Error404 />} />
      </Routes>
    </AnimatePresence>
  );
};

export default NoUserView;
