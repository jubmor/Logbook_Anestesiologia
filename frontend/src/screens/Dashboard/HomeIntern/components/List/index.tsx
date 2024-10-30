import React from "react";
import { motion } from "framer-motion";

import "./styles.scss";

const List = () => {
  return (
    <motion.div
      style={{ width: "100%" }}
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05
          }
        }
      }}
    >
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          className="list-item"
          variants={{
            hidden: { opacity: 0, y: -20 },
            show: { opacity: 1, y: 0 }
          }}
        >
          <p>{item.name}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default List;

const items = generateItems(8);

function generateItems(count: number) {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `Item ${index + 1}`
  }));
}
