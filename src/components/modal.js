import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import { amber } from "@material-ui/core/colors";

console.log(amber);

const useStyles = makeStyles({
  box: {
    "& .MuiDialog-paperWidthSm": {
      backgroundColor: "#ffc107",
      color: "black",
      width: "30vw",
      height: "10vh",
      padding: 30,
      paddingTop: 60,
      fontSize: 20
    }
  }
});

export default function Modal(props) {
  const classes = useStyles();
  return (
    <div>
      {props.modalOpen ? (
        <Dialog onClick={props.closeModal} open={true} className={classes.box}>
          Sorry .... we didn't find any recipy, please try again with different
          search.
        </Dialog>
      ) : null}
    </div>
  );
}
