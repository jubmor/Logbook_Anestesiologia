import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { PATHS } from "../paths";
import { useAppSelector } from "@/store/hooks";
import { UserType } from "@/types/User";

type Props = {
  type: UserType | undefined;
};

const ProtectedRoute = ({ type }: Props) => {
  const user = useAppSelector((state) => state.auth.user);

  const userType = user?.usertype;

  return userType === type ? <Outlet /> : <Navigate to={PATHS.LOGIN} replace />;
};

export default ProtectedRoute;
