import React from "react";
import Button from "@material-ui/core/Button";
import { Grid, TextField, MenuItem, makeStyles } from "@material-ui/core";
import { SaveTwoTone, CachedTwoTone } from "@material-ui/icons";
import { SpinnerButton } from "../../../Components/feedback";

const Options = [
  {
    value: 1,
    text: "Adminstrateur",
  },
  {
    value: 0,
    text: "User",
  },
];

const UserFormLayoutThemes = makeStyles((theme) => ({
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

function UserFormLayout({
  form: {
    register,
    handleSubmit,
    onSubmit,
    isSubmitting,
    errors,
    control,
    Controller
  },
  editMode = false
}) {
  const classes = UserFormLayoutThemes();
  const titleButton = editMode ? "UPDATE USER" : "CREATE AN USER"
  const icon = !editMode ? <SaveTwoTone/> : <CachedTwoTone/>
  return (
    <>
      <form
        autoComplete="false"
        className={classes.root}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={2}>
          <Grid item md>
            <TextField
              id="username"
              name="username"
              variant="outlined"
              label="Username"
              fullWidth
              inputRef={register}
              error={errors?.username && true}
              helperText={errors?.username?.message}
              /* value={form.username || ""}
              onChange={handleChange}
              error={payload?.username && true}
              helperText={
                payload?.username &&
                payload.username.replace("Le champs username ", "")
              } */
            />
          </Grid>
          <Grid item md>
            <Controller
              control={control}
              name="level"  
            render={(
              { onChange, onBlur, value, name, ref }
            ) => (
            <TextField
              id="level"
              select
              onBlur={onBlur}
              name={name}
              variant="outlined"
              label="Level"
              value={value} 
              onChange={onChange}
              fullWidth
              inputRef={ref}
              error={errors?.level && true}
              helperText={errors?.level?.message}
            >
              {Options.map(op => (
                <MenuItem key={op.value} value={op.value}>
                  {op.text}
                </MenuItem>
              ))}
            </TextField>
            )}
            />
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
              inputRef={register}
              error={errors?.password && true}
              helperText={errors?.password?.message}
              /*
              value={form.password || ""}
              onChange={handleChange}
              error={payload?.password && true}
              helperText={
                payload?.password &&
                payload.password.replace("Le champs password ", "")
              } */
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
              inputRef={register}
              
              error={errors?.repassword && true}
              helperText={errors?.repassword?.message}
              /*
              value={form.repassword || ""}
              onChange={handleChange}
              error={payload?.repassword && true}
              helperText={
                payload?.repassword &&
                payload.repassword.replace("Le champs password ", "")
              } */
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md>
            <div className={classes.containerBottom}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                startIcon={isSubmitting ? <SpinnerButton /> : icon}
              >
                {isSubmitting ? "LOADING..." : titleButton}
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </>
  );
}



export function UserCreateLayout({ form }) {
  return <UserFormLayout form={form}/>
}

export function UserEditLayout({ form, editMode }) {
  return <UserFormLayout form={form} editMode={editMode} />
}
