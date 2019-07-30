import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import image from "../img/noimage.jpg"

const useStyles = makeStyles({
  card: {
    width: 300,
    height: 400,
    alignContent: "space-between",
    boxSizing: "border-box"
  },
  media: {
    height: 100
  },
  content: {
    height: 300
  },

  action: {
    height: 50,
    justifyContent: "flex-start"
  }
});

export default function RecipeCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={
          props.recipe.thumbnail !== ""
            ? props.recipe.thumbnail
            : image
        }
        title={props.recipe.title}
      />
      <CardContent className={classes.content}>
        <Typography gutterBottom variant="h5" component="h2">
          {props.recipe.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.recipe.ingredients
            .split(",")
            .map(el => `#${el.replace(/\s/g, "")} `)}
        </Typography>
      </CardContent>
      <CardActions className={classes.action}>
        <Button
          size="small"
          color="primary"
          href={props.recipe.href}
          target="_blank"
        >
          Go to orginal recipe
        </Button>
      </CardActions>
    </Card>
  );
}
