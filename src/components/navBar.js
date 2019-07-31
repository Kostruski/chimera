import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
import { NavigateNext, NavigateBefore } from "@material-ui/icons";
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: 50
  },
  menuButton: {
    display: "block",
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  title: {
    textAlign: "center",
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  button: {
   display: "none",
   marginRight: theme.spacing(2),
   [theme.breakpoints.up("sm")]: {
     display: "block"
   }
    },

  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  arrow: {
    color: "black"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 150,
      "&:focus": {
        width: 170
      }
    }
  }
}));

export default function NavBar(props) {
  const classes = useStyles();
 

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={props.openDrawer}>
           <MenuIcon />
         </IconButton>

          <Button
            edge="start"
            className={classes.button}
            color="inherit"
            aria-label="open drawer"
            onClick={props.openDrawer}
          >
            Select ingredients
          </Button>
          <Typography className={classes.title} variant="h6" noWrap>
            Find your recipe
          </Typography>
          {props.data.length > 0 ? (
            <Toolbar>
              <IconButton
                className={classes.arrow}
                onClick={() => props.changePage("prev")}
              >
                <NavigateBefore />
              </IconButton>
              <Typography className={classes.title} variant="h6" noWrap>
                {`page num ${props.currentPage}`}
              </Typography>
              <IconButton
                className={classes.arrow}
                onClick={() => props.changePage("next")}
              >
                <NavigateNext />
              </IconButton>
            </Toolbar>
          ) : null}

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={props.fetchData}
          >
            Search
          </Button>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              value={props.inputValue}
              placeholder="type ingredients ... "
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
              name="inputValue"
              onChange={props.getInputValue}
              onKeyPress={props.fetchData}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}



