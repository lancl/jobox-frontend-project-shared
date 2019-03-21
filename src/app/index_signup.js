import React from "react";
import { render } from "react-dom";
import SignUp from "./SignUp.js";
import "../../src/index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <SignUp />;
  }
}

render(<App />, document.getElementById("app"));
