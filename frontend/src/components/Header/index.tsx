import MobileHeader from "./components/MobileHeader";

import { useScreenWidth } from "@/hooks/useScreenWidth";

import "./styles.scss";

const Header = () => {
  const screenWidth = useScreenWidth();

  return (
    <>{/* <div className="header_container">{screenWidth <= 769 && <MobileHeader />}</div> */}</>
  );
};

export default Header;
