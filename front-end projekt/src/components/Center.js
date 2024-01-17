import React from "react";
import { Grid } from "@mui/material";

export default function Center(props) {
  return (
    // podobne do bootstrap grid
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      {/* zajmuje 1 column space */}
      <Grid item xs={1}>
        {props.children}
      </Grid>
    </Grid>
  );
}
