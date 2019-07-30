import React, { Component } from "react";
import NavBar from "./navBar.js";
import Modal from "./modal.js";
import IngredientsForm from "./ingredientsForm";
import RecipeCard from "./recipeCard.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const url = "/api/?";

export default class StartPage extends Component {
  state = {
    inputValue: "",
    currentPage: 1,
    data: [],
    isLoading: false,
    modalOpen: false,
    openDrawer: false,
    ingredientsChecked: [],
    anchorEl: null,
    lastQuery: ""
  };

  getInputValue = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  closeModal = () => this.setState({ modalOpen: false });
  openDrawer = e => {
    this.setState({ openDrawer: true, anchorEl: e.currentTarget });
  };
  closeDrawer = () => this.setState({ openDrawer: false });
  clearIngredients = () => this.setState({ ingredientsChecked: [] });

  selectCousine = e => {
    if (e.target.checked) {
      const tempArr = [];
      tempArr.push(e.target.value);
      this.setState(prev => ({
        ingredientsChecked: [...prev.ingredientsChecked, ...tempArr]
      }));
    } else {
      const tempArr = this.state.ingredientsChecked.filter(
        el => el !== e.target.value
      );
      this.setState({ ingredientsChecked: tempArr });
    }
  };

  fetchData = e => {
    if (
      (e.key === "Enter" || e.target.className === "MuiButton-label") &&
      (this.state.inputValue !== "" || this.state.ingredientsChecked.length > 0)
    ) {
      this.setState({ isLoading: true, modalOpen: false });
      fetch(
        url +
          `q=${this.state.ingredientsChecked.join(", ")}, ${
            this.state.inputValue
          }&p=${this.state.currentPage}`
      )
        .then(res => res.json())
        .then(json => {
          this.setState(
            { data: json.results, isLoading: false, currentPage: 1 },
            () => {
              if (!json.results.length) {
                this.setState({ modalOpen: true, inputValue: "" });
              } else {
                this.setState(
                  {
                    lastQuery: `q=${this.state.ingredientsChecked.join(
                      ", "
                    )}, ${this.state.inputValue}&p=`,
                    inputValue: ""
                  }
                );
              }
            }
          );
        })
        .catch(err => {
          console.error(err);
          this.setState({ isLoading: false, inputValue: "" });
        });
    }
    this.setState({ openDrawer: false });
  };

  fetchNextPage = page => {
    console.log(`${this.state.lastQuery}${page}`);
    this.setState({ isLoading: true, modalOpen: false });
    fetch(url + `${this.state.lastQuery}${page}`)
      .then(res => res.json())
      .then(json => {
        this.setState({ data: json.results, isLoading: false }, () => {
          if (!json.results.length) {
            this.setState({ modalOpen: true, inputValue: "" });
          } else {
            this.setState({ inputValue: "" });
          }
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({ isLoading: false, inputValue: "" });
      });

    this.setState({ openDrawer: false });
  };

  changePage = direction => {
    let page = this.state.currentPage;
    if ((direction === "prev") & (page > 1) & (this.state.data.length > 0)) {
      page--;
      this.setState(prev => ({ currentPage: prev.currentPage - 1 }));
      this.fetchNextPage(page);
    } else if ((direction === "next") & (this.state.data.length > 0)) {
      page++;
      this.setState(prev => ({ currentPage: prev.currentPage + 1 }));
      this.fetchNextPage(page);
    }
  };

  render() {
    return (
      <div>
        <NavBar
          getInputValue={this.getInputValue}
          inputValue={this.state.inputValue}
          fetchData={this.fetchData}
          openDrawer={this.openDrawer}
          currentPage={this.state.currentPage}
          changePage={this.changePage}
        />

        <Menu
          open={this.state.openDrawer}
          anchorEl={this.state.anchorEl}
          // onClose={this.clearIngredients} // comment this to combain serach tags from input and dropdown
        >
          <MenuItem          
          >
            <IngredientsForm
              selectCousine={this.selectCousine}
              fetchData={this.fetchData}
              closeDrawer={this.closeDrawer}
              ingredientsChecked={this.state.ingredientsChecked}
             />
          </MenuItem>
        </Menu>

        {this.state.isLoading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress
              color="primary"
              style={{ margin: "200px", width: "100px", height: "100px" }}
            />
          </Box>
        ) : this.state.modalOpen ? (
          <Modal
            modalOpen={this.state.modalOpen}
            closeModal={this.closeModal}
          />
        ) : this.state.data.length ? (
          <Grid
            spacing={3}
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            {this.state.data.map((el, i) => {
              return (
                <Grid item key={i}>
                  <RecipeCard recipe={el} />
                </Grid>
              );
            })}
          </Grid>
        ) : null}
      </div>
    );
  }
}
