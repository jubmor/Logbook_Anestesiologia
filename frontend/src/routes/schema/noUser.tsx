import { PATHS } from "../paths";

import ProjectPresentation from "@/screens/ProjectPresentation";
import Register from "@/screens/Auth/Register";
import RecoverPassword from "@/screens/Auth/RecoverPassword";
import Auth from "@/screens/Auth/Auth";
import Login from "@/screens/Auth/Login";
import { RouteProps } from "..";

const noUser: RouteProps[] = [
  {
    path: PATHS.ROOT,
    element: <ProjectPresentation />,
    name: "Project",
    displayName: "Project"
  },
  {
    path: PATHS.AUTH,
    element: <Auth />,
    name: "Auth",
    displayName: "Auth",
    children: [
      {
        path: PATHS.LOGIN,
        element: <Login />,
        name: "Login",
        displayName: "Login"
      },
      {
        path: PATHS.REGISTER,
        element: <Register />,
        name: "Register",
        displayName: "Register"
      },
      {
        path: PATHS.RECOVER_PASSWORD,
        element: <RecoverPassword />,
        name: "RecoverPassword",
        displayName: "Recover Password"
      }
    ]
  }
];

export default noUser;
