import React, { Component } from "react";
import NavBar from "./navBar.js";
import Modal from "./modal.js";
import RecipeCard from "./recipeCard.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import { flexbox } from "@material-ui/system";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

const url = "/api/?";

export default class startPage extends Component {
  state = {
    inputValue: "",
    currentPage: 1,
    data: [],
    isLoading: false,
    modalOpen: false
  };

  getInputValue = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  closeModal = () => this.setState({ modalOpen: false });

  fetchData = e => {
    if (
      (e.key === "Enter" || e.target.className === "MuiButton-label") &
      (this.state.inputValue !== "")
    ) {
      this.setState({ isLoading: true, modalOpen: false });
      fetch(url + `q=${this.state.inputValue}&p=${this.state.currentPage}`)
        .then(res => res.json())
        .then(json => {
          this.setState({ data: json.results, isLoading: false }, () => {
            if (!json.results.length) this.setState({ modalOpen: true });
          });
        })
        .catch(err => {
          console.error(err);
          this.setState({ isLoading: false });
        });
      this.setState({ inputValue: "" });
    }
  };

  render() {
    if (this.state.data.length !== 0) console.log(this.state.data);
    return (
      <div>
        <NavBar
          getInputValue={this.getInputValue}
          inputValue={this.state.inputValue}
          fetchData={this.fetchData}
        />
        {this.state.isLoading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress color="primary" style={{ padding: "0 200px" }} />
          </Box>
        ) : this.state.modalOpen ? (
          <Modal
            modalOpen={this.state.modalOpen}
            closeModal={this.closeModal}
          />
        ) : this.state.data.length ? (
          <Grid
            container
            spacing={3}
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            {this.state.data.map((el, i) => {
              return (
                <Grid item key={i}>
                  <RecipeCard recipe={el} key={i} />
                </Grid>
              );
            })}
          </Grid>
        ) : null}
      </div>
    );
  }
}
