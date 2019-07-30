import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  box: {
    "& .MuiDialog-paperWidthSm": {
      backgroundColor: "#ffc107",
      color: "black",
      padding: 40
    }
  }
});

export default function Modal(props) {
  const classes = useStyles();
  return (
    <div>
      {props.modalOpen ? (
        <Dialog onClick={props.closeModal} open={true} className={classes.box}>
          <Typography variant="h6" component="p">
            Sorry .... we didn't find any recipe, please try again with a
            different search.
          </Typography>
        </Dialog>
      ) : null}
    </div>
  );
}
