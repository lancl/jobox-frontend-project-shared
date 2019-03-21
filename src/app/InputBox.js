import React from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

class InputBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  // About: type message
  handleChange(e) {
    this.setState({
      message: e.target.value
    });
  }

  // About: send message back to parent component
  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.handleSubmit(e);
    }
  }
  handleSubmit(e) {
    e.preventDefault();

    let message = this.state.message;
    if (message.length === 0) {
      window.alert("Message cannot be empty!");
      return;
    }

    // Execute callback function, in parent component
    this.props.sendMessage(message);

    // Clear the state, message
    this.setState({
      message: ""
    });
  }

  render() {
    return (
      <div className="innerContainer2">
        <Input
          placeholder="Write your message here"
          className="messageInput"
          value={this.state.message}
          onChange={e => this.handleChange(e)}
          onKeyPress={e => this.handleKeyPress(e)}
        />
        <Button
          className="button2"
          variant="outlined"
          onClick={e => this.handleSubmit(e)}
        >
          Send <Icon className="buttonIcon2">send</Icon>
        </Button>
      </div>
    );
  }
}

export default InputBox;
