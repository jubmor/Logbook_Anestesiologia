import React from "react";
import { RouteProps } from "..";
import { Route } from "react-router-dom";

import { motion } from "framer-motion";
import { useAppSelector } from "@/store/hooks";

const AnimatedRoute = ({ route }: { route: RouteProps }) => {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={fadeVariants}
      transition={fadeTransition}
      className={`body-wrapper ${!user && "no_user"}`}
    >
      {route.element}
    </motion.div>
  );
};

export default AnimatedRoute;

const fadeVariants = {
  initial: {
    opacity: 0
  },
  in: {
    opacity: 1
  },
  out: {
    opacity: 0
  }
};

const fadeTransition = {
  duration: 0.15
};
