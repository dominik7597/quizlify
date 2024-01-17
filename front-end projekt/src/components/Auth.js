import React from "react";
import useStateContext from "./hooks/useStateContext";
import { Navigate, Outlet } from "react-router-dom";

export default function Auth() {
  const { context } = useStateContext();
  return context.userId === 0 ? <Navigate to="/" /> : <Outlet />;
}
