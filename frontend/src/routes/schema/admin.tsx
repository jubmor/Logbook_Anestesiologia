import { PATHS } from "../paths";

import HomeTutor from "@/screens/Dashboard/HomeTutor";

import DashboardIcon from "@mui/icons-material/Dashboard";
import { RouteProps } from "..";

const tutor: RouteProps[] = [
  {
    path: PATHS.ROOT,
    element: <HomeTutor />,
    name: "Dashboard",
    displayName: "Dashboard",
    menu: true,
    menuMobile: true,
    Icon: DashboardIcon
  }
];

export default tutor;
