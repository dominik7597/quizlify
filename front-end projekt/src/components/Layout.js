import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useStateContext from "./hooks/useStateContext";

export default function Layout() {
  const { resetContext } = useStateContext();
  const navigate = useNavigate();

  const logout = () => {
    resetContext();
    navigate("/");
  };

  return (
    <React.Fragment>
      <AppBar
        position="sticky"
        sx={{ justifyContent: "center", flexDirection: "row" }}
      >
        <Toolbar sx={{ width: 850 }}>
          <Typography variant="h3" sx={{ flexGrow: 1 }}>
            Quizlyfy
          </Typography>
          <Button onClick={logout} sx={{ color: "white" }} variant="contained">
            Wyloguj
          </Button>
        </Toolbar>
      </AppBar>
      {/* wyświetla treści zgodnie z trasą */}
      <Outlet />
    </React.Fragment>
  );
}
