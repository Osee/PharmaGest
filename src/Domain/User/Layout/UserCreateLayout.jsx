import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { Grid, TextField, MenuItem, makeStyles } from "@material-ui/core";
import { Save } from "@material-ui/icons";
import { SpinnerButton } from "../../../Components/feedback";

const Options = [
  {
    value: "1",
    text: "Adminstrateur",
  },
  {
    value: "0",
    text: "User",
  },
];

const UserCreateTheme = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      margin: theme.spacing(1, 0),
    },
  },
  containerBottom: {
    marginTop: theme.spacing(2),
  },
  spinner: {
    width: "25px",
    height: "25px",
    color: "#fff",
  },
}));

function UserCreateLayout({
  form: {
    form,
    handleChange,
    handleSubmit,
    loading,
    usersFieldsValidate,
    errorState: { payload },
  },
}) {
  const classes = UserCreateTheme();
  const [level, setlevel] = useState("");

  const handleSelectChange = (e) => {
    handleChange(e);
    setlevel(e.target.value);
  };

  return (
    <>
      <form
        autoComplete="false"
        className={classes.root}
        onSubmit={handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid item md>
            <TextField
              id="username"
              name="username"
              variant="outlined"
              label="Username"
              fullWidth
              value={form.username || ""}
              onChange={handleChange}
              error={payload?.username && true}
              helperText={
                payload?.username &&
                payload.username.replace("Le champs username ", "")
              }
            />
          </Grid>
          <Grid item md>
            <TextField
              id="level"
              select
              name="level"
              variant="outlined"
              label="Level"
              value={level}
              onChange={handleSelectChange}
              fullWidth
            >
              {Options.map((op, id) => (
                <MenuItem key={op.value} value={op.value}>
                  {op.text}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item md>
            <TextField
              id="password"
              name="password"
              variant="outlined"
              label="Password"
              type="password"
              fullWidth
              value={form.password || ""}
              onChange={handleChange}
              error={payload?.password && true}
              helperText={
                payload?.password &&
                payload.password.replace("Le champs password ", "")
              }
            />
          </Grid>
          <Grid item md>
            <TextField
              id="repassword"
              name="repassword"
              variant="outlined"
              label="Confirm"
              type="password"
              fullWidth
              value={form.repassword || ""}
              onChange={handleChange}
              error={payload?.repassword && true}
              helperText={
                payload?.repassword &&
                payload.repassword.replace("Le champs password ", "")
              }
            />
          </Grid>
          <div className={classes.containerBottom}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={usersFieldsValidate || loading || payload}
              startIcon={loading ? <SpinnerButton /> : <Save />}
            >
              {loading ? "LOADING..." : "CREATE USER"}
            </Button>
          </div>
        </Grid>
      </form>
    </>
  );
}

export default UserCreateLayout;
