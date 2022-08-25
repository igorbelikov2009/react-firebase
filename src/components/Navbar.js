import { AppBar, Grid, Toolbar, Button } from "@mui/material";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Context } from "..";
import { LOGIN_ROUTE } from "../utils/consts";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);

  return (
    <AppBar color="secondary" position="static">
      <Toolbar>
        <Grid container justifyContent={"flex-end"}>
          {user ? (
            <Button onClick={() => auth.signOut()} variant={"outlined"}>
              Выйти
            </Button>
          ) : (
            <NavLink to={LOGIN_ROUTE}>
              <Button variant={"outlined"}>Логин</Button>
            </NavLink>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
