import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      field_user: "",
      field_pass: "",
      error: false
    };
  }
  componentWillMount = () => {
    console.log("componentWillMount()");
    var retrievedObject = sessionStorage.getItem("userInfo");
    if (retrievedObject != null) {
      window.alert(
        retrievedObject +
          "\nYou already logged in. Please re-enter the chatroom"
      );
      window.location = "/chatroom";
    }
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      error: false
    });
  };

  toggleSignUp = e => {
    const _self = this;
    // Math.random().toString(36).substr(2, 5);
    axios
      .post("/user/signup", {
        username: this.state.field_user,
        password: this.state.field_pass,
        updateTime: Date()
      })
      .then(function(res) {
        if (res.data._message == null) {
          // no error
          window.alert(
            "Successfully signed up!" +
              " Please go to login page, to enter the chatroom."
          );
          _self.loginPage();
        } else {
          // _message is ERROR message, error occurs!
          console.log(res.data._message);
          window.alert(res.data._message);
          _self.setState({
            error: true,
            field_user: "",
            field_pass: ""
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  loginPage = e => {
    axios
      .get("/redirect?page=login")
      .then(function(res) {
        console.log(res);
        window.location = "/login";
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  // Note: Exit button does not work somehow, so use window message instead
  // to re-direct to another page (i.e. login page)
  render() {
    return (
      <div className="firstContainer">
        <img className="img" src="./assets/signup.jpg" />
        <Dialog
          open
          onRequestClose={this.toggleLogin}
          fullScreen={this.props.fullScreen}
        >
          <DialogTitle>Sign Up</DialogTitle>
          <DialogContent>
            <DialogContentText>Please type in your password</DialogContentText>
            <TextField
              autoFocus
              error={this.state.error}
              margin="dense"
              id="username"
              label="Username"
              type="username"
              value={this.state.field_user}
              onChange={this.handleChange("field_user")}
              fullWidth
            />
            <TextField
              autoFocus
              error={this.state.error}
              margin="dense"
              id="password"
              label="Password"
              type="password"
              value={this.state.field_pass}
              onChange={this.handleChange("field_pass")}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={this.loginPage} color="secondary">
            Exit
          </Button> */}
            <Button onClick={this.toggleSignUp} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default SignUp;
