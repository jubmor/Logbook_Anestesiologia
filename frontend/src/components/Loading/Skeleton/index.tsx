import React from "react";

import { motion } from "framer-motion";

import "./styles.scss";

interface Props {
  height?: string;
  width?: string;
  borderRadius?: string;
  marginVertical?: string;
  marginHorizontal?: string;
}

const Skeleton = ({
  height = "40px",
  width = "100%",
  borderRadius = "5px",
  marginVertical = "10px",
  marginHorizontal = "0"
}: Props) => {
  return (
    <motion.div
      className="skeleton"
      style={{
        height,
        width,
        borderRadius,
        margin: `${marginVertical} ${marginHorizontal}`
      }}
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
  );
};

export default Skeleton;
