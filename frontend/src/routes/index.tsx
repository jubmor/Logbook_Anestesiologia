import { SvgIconProps } from "@mui/material";

import { UserProps, UserType } from "@/types/User";

import noUser from "./schema/noUser";
import intern from "./schema/intern";
import tutor from "./schema/tutor";
import sharedBetweenUsers from "./schema/sharedBetweenUsers";
import shared from "./schema/shared";

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

const routes: { [key in UserType | "noUser" | "sharedBetweenUsers" | "shared"]: RouteProps[] } = {
  noUser,
  intern,
  tutor,
  sharedBetweenUsers,
  shared
};

export const getRoutes = (user: UserProps | undefined) => {
  const { noUser, intern, tutor, sharedBetweenUsers } = routes;

  const routeHandler = {
    intern: intern,
    tutor: tutor
  };

  const appRoutes = user ? [...routeHandler[user.usertype], ...sharedBetweenUsers] : noUser;

  return [...shared, ...appRoutes];
};

export default getRoutes;

export { routes };
