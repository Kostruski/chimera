import React from "react";
import Dialog from '@material-ui/core/Dialog';


export default function Modal(props) {
  return (
    <div>
      {props.modalOpen ? 
      <Dialog onClick={props.closeModal} open={true}> 
        Sorry .... we didn't find any reacipy, please try again with different search
      </Dialog>
      : null}
    </div>
  );
}
