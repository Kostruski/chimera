import React from "react";
import StartPage from "./components/startPage.js";
import "./App.scss";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { amber } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: amber
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <StartPage />
      </div>
    </ThemeProvider>
  );
}

export default App;
