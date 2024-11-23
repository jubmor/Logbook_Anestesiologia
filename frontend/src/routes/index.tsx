import { SvgIconProps } from "@mui/material";

import { UserProps, UserType } from "@/types/User";

import noUser from "./schema/noUser";
import intern from "./schema/intern";
import tutor from "./schema/tutor";
import sharedBetweenUsers from "./schema/sharedBetweenUsers";
import shared from "./schema/shared";
import admin from "./schema/admin";

export type RouteProps = {
  path: string;
  element: JSX.Element;
  name: string;
  displayName: string;
  Icon?: React.ComponentType<SvgIconProps>;
  menu?: boolean;
  menuMobile?: boolean;
  children?: RouteProps[];
};

const routes: {
  [key in UserType | "noUser" | "sharedBetweenUsers" | "shared" | "admin"]: RouteProps[];
} = {
  noUser,
  intern,
  tutor,
  sharedBetweenUsers,
  shared,
  admin
};

export const getRoutes = (user: UserProps | null) => {
  const { noUser, intern, tutor, sharedBetweenUsers } = routes;

  const routeHandler = {
    intern: intern,
    tutor: tutor,
    admin: admin
  };

  const appRoutes = user ? [...routeHandler[user.user_type], ...sharedBetweenUsers] : noUser;

  return [...shared, ...appRoutes];
};

export default getRoutes;

export { routes };
