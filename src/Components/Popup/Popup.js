import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions"
import { makeStyles, Typography, Button } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(3),
  },
  headerTitle: {
    display: "flex",
  },
}));
const Popup = ({ popupOpen, togglePopup, children, title, actions }) => {
  const classes = useStyle();
  return (
    <Dialog
      open={popupOpen}
      onClose={togglePopup}
      aria-labelledby="CREATE AN USER"
      fullWidth
      maxWidth="sm"
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle>
        <div className={classes.headerTitle}>
          <Typography
            variant="h5"
            color="initial"
            component="div" lo
            style={{ flex: 1 }}
          >
            {title}
          </Typography>
          <Button onClick={togglePopup}>
            X
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      {actions && <DialogActions>
        {actions.cancel}
        {actions.confirm}
      </DialogActions>}
    </Dialog>
  );
};

export default Popup;
