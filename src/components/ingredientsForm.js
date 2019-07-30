import React from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const cousine = [
  "chicken",
  "beef",
  "salmon",
  "potato",
  "tomato",
  "pasta",
  "eggs",
  "cheese"
];



export default function IngredientsForm(props) {
  return (
    <ClickAwayListener onClickAway={props.closeDrawer}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <FormControl
          component="fieldset"
          style={{ margin: "30px", display: "flex", flexDirection: "column" }}
        >
          {cousine.map((el, i) => {
            return (
              <FormControlLabel
                key={i}
                control={
                  <Checkbox
                    name={el}
                    onChange={props.selectCousine}
                    value={el}
                    checked={props.ingredientsChecked.includes(el)}
                  />
                }
                label={el}
              />
            );
          })}
        </FormControl>
        <Button variant="contained" color="primary" onClick={props.fetchData}>
          Search
        </Button>
      </div>
    </ClickAwayListener>
  );
}
