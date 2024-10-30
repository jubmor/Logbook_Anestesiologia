import Records from "@/screens/Records/Overview";
import NewRecord from "@/screens/Records/NewRecord";
import Casuistry from "@/screens/Casuistry";
import HomeIntern from "@/screens/Dashboard/HomeIntern";
import Internships from "@/screens/Internships";

import DashboardIcon from "@mui/icons-material/Dashboard";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import { PATHS } from "../paths";
import { RouteProps } from "..";

const intern: RouteProps[] = [
  {
    path: PATHS.ROOT,
    element: <HomeIntern />,
    name: "Dashboard",
    displayName: "Dashboard",
    menu: true,
    menuMobile: true,
    Icon: DashboardIcon
  },
  {
    path: PATHS.RECORDS,
    element: <Records />,
    name: "Registos",
    displayName: "Registos",
    menu: true,
    menuMobile: true,
    Icon: InsertDriveFileOutlinedIcon
  },
  {
    path: PATHS.NEW_RECORD,
    element: <NewRecord />,
    name: "Novo Registo",
    displayName: "Novo Registo"
  },
  {
    path: PATHS.CASUISTRY,
    element: <Casuistry />,
    name: "Casuistic",
    displayName: "Casuistica",
    menu: true,
    menuMobile: true,
    Icon: BarChartOutlinedIcon
  },
  {
    path: PATHS.ROTATIONS,
    element: <Internships />,
    name: "Internships",
    displayName: "Estágios",
    menu: true,
    Icon: WorkHistoryOutlinedIcon
  }
];

export default intern;
