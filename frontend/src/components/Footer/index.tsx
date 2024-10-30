import React from "react";
import MobileFooterNavigation from "./MobileFooterNavigation";
import { useScreenWidth } from "@/hooks/useScreenWidth";
import DesktopFooter from "./DesktopFooter";

type Props = {};

const Footer = ({}: Props) => {
  const screenWidth = useScreenWidth();

  return <>{screenWidth <= 769 ? <MobileFooterNavigation /> : <DesktopFooter />}</>;
};

export default Footer;
