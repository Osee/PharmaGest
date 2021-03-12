import { makeStyles, Snackbar, IconButton } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Close as CloseIcon } from "@material-ui/icons";
import { NavLink } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  snackActionLink: {
    color: "#f48fb1",
    display: "inline-block",
    textDecoration: "none",
    padding: theme.spacing(0.7),
    "&:hover": {
      background: "#f48fb130",
      borderRadius: "5px",
    },
  },
}));
export const AlertComponent = ({ type, phrase }) => {
  const useStyle = makeStyles((theme) => ({
    alert: {
      margin: theme.spacing(2, "auto"),
      maxWidth: "400px",
    },
  }));
  const classes = useStyle();
  return (
    <>
      <Alert severity={type} className={classes.alert}>
        {" "}
        {JSON.stringify(phrase)}
      </Alert>
    </>
  );
};

export function Spinner() {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > * + *": {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(2),
      },
    },
  }));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
}

export function SnackMaterial({ type = "success", content, to, action }) {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen((o) => !o);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        elevation={6}
        variant="filled"
      >
        {content} {to}
      </Alert>
    </Snackbar>
  );
}

export function SpinnerButton() {
  return (
    <CircularProgress color="secondary" style={{ width: 25, height: 25 }} />
  );
}

export function SnackWithAction({ message, to }) {
  const classes = useStyle();
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen((pst) => !pst);
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={open}
      onClose={handleClose}
      message={message}
      autoHideDuration={5000}
      action={
        <>
          {to && <NavLink className={classes.snackActionLink} size="small" to={to}>
            AFFICHER
          </NavLink>}
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      }
    />
  );
}
