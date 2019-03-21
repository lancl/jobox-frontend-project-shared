import React from "react";
import { render } from "react-dom";
import ChatLayout from "./ChatLayout.js";
import "../../src/index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <ChatLayout />;
  }
}

render(<App />, document.getElementById("app"));
