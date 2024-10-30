import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { useScreenWidth } from "@/hooks/useScreenWidth";

import "./styles.scss";

const Container = ({ children }: { children: ReactNode }) => {
  const isDesktop = useScreenWidth() > 1024;

  return (
    <div>
      <BubbleBackground>{children}</BubbleBackground>
    </div>
  );
};

export default Container;

const BubbleBackground = ({ children }: { children: ReactNode }) => {
  const bubbles = Array.from({ length: 28 });

  return (
    <ul className="background">
      {bubbleConfig.map((bubble, index) => (
        <li
          key={index}
          style={{
            left: bubble.left,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            bottom: `${bubble.bottom}px`,
            animationDelay: bubble.delay
          }}
        />
      ))}
      {children}
    </ul>
  );
};

const bubbleConfig = [
  { left: "40%", size: 191, bottom: 300, delay: "0s" },
  { left: "55%", size: 162, bottom: 500, delay: "0s" },
  { left: "51%", size: 111, bottom: -111, delay: "10s" },
  { left: "87%", size: 175, bottom: -175, delay: "6s" },
  { left: "83%", size: 154, bottom: -154, delay: "5s" },
  { left: "29%", size: 165, bottom: -165, delay: "13s" },
  { left: "54%", size: 183, bottom: 400, delay: "0s" },
  { left: "38%", size: 122, bottom: -122, delay: "27s" },
  { left: "68%", size: 187, bottom: 100, delay: "0s" },
  { left: "83%", size: 100, bottom: -100, delay: "3s" },
  { left: "69%", size: 147, bottom: -147, delay: "39s" },
  { left: "4%", size: 172, bottom: 250, delay: "0s" },
  { left: "20%", size: 198, bottom: -198, delay: "47s" },
  { left: "22%", size: 196, bottom: -196, delay: "16s" },
  { left: "77%", size: 138, bottom: 200, delay: "0s" },
  { left: "75%", size: 104, bottom: -104, delay: "60s" },
  { left: "80%", size: 172, bottom: -172, delay: "9s" },
  { left: "54%", size: 102, bottom: -102, delay: "84s" },
  { left: "15%", size: 137, bottom: 0, delay: "0s" },
  { left: "14%", size: 165, bottom: -165, delay: "7s" },
  { left: "13%", size: 117, bottom: -117, delay: "25s" },
  { left: "9%", size: 133, bottom: -133, delay: "53s" },
  { left: "38%", size: 113, bottom: -113, delay: "76s" },
  { left: "4%", size: 125, bottom: -125, delay: "34s" },
  { left: "52%", size: 104, bottom: -104, delay: "15s" },
  { left: "68%", size: 110, bottom: -110, delay: "74s" },
  { left: "81%", size: 141, bottom: -141, delay: "12s" },
  { left: "60%", size: 107, bottom: -107, delay: "106s" },
  { left: "76%", size: 197, bottom: -197, delay: "4s" }
];
