import React from "react";
import { Grid, Container } from "@mui/material";
import "../App.css";

const Loader = () => {
  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 50 }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid>
          <div className="lds-hourglass"></div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Loader;
