import {
  Box,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";
import LockTwoToneIcon from "@material-ui/icons/LockTwoTone";
import React from "react";
import { AlertComponent, SpinnerButton } from "../../../Components/feedback";

const loginStyles = makeStyles((theme) => ({
  pageContainer: {
    marginTop: theme.spacing(30),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(15),
    },
    [theme.breakpoints.between("md", "lg")]: {
      marginTop: theme.spacing(20),
    },
  },
  form: {
    "& .MuiFormControl-root": {
      margin: theme.spacing(1, "auto"),
    },
  },
  main: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "450px",
    margin: theme.spacing(0, "auto"),
    padding: theme.spacing(2),
  },
  logo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1),
    margin: theme.spacing(0, "auto"),
    width: 50,
    height: 50,
    background: "rgb(220, 0, 78)",
    color: "#fff",
  },
  submit: {
    margin: theme.spacing(1),
  },
}));

export default function AuthLayout({
  form: { register, onSubmit, handleSubmit, isSubmitting, errors },
}) {
  const classes = loginStyles();
  return (
    <Grid container className={classes.pageContainer}>
      <Grid item xs={1} md={4} />
      <Grid item xs={10} md={4}>
        <Paper className={classes.main} elevation={4}>
          <Box className={classes.logo} borderRadius={50}>
            <LockTwoToneIcon />
          </Box>
          <Typography variant="h5" color="initial" align="center">
            Connexion
          </Typography>
          <form
            autoComplete="false"
            className={classes.form}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  inputRef={register({
                    required: "Username can not be empty",
                  })}
                  id="username"
                  label="Username"
                  fullWidth
                  variant="outlined"
                  name="username"
                  error={errors.username ? true : false}
                  helperText={errors.username?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  inputRef={register({
                    required: "Password can not be empty",
                  })}
                  id="password"
                  label="Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  name="password"
                  error={errors.password ? true : false}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.submit}
                disabled={isSubmitting}
                fullWidth
                startIcon={isSubmitting && <SpinnerButton />}
              >
                {isSubmitting ? "LOADING..." : "Connexion"}
              </Button>
            </Grid>
          </form>
        </Paper>
        {errors?.loginFailed && (
          <AlertComponent type="error" phrase={errors.loginFailed.message} />
        )}
      </Grid>
      <Grid item xs={1} md={4} />
    </Grid>
  );
}
