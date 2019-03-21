import React from "react";
import { render } from "react-dom";
import Login from "./Login.js";
import "../../src/index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Login />;
  }
}

render(<App />, document.getElementById("app"));
