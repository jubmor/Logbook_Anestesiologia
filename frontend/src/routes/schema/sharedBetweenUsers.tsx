import { PATHS } from "../paths";

import UserProfile from "@/screens/UserProfile";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { RouteProps } from "..";

const sharedBetweenUsers: RouteProps[] = [
  {
    path: PATHS.PROFILE,
    element: <UserProfile />,
    name: "UserProfile",
    displayName: "A Minha Conta",
    menu: true,
    menuMobile: true,
    Icon: AccountBoxIcon
  }
];

export default sharedBetweenUsers;
