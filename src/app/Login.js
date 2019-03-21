import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";

class Login extends React.Component {
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
          "\nYou have already logged in. Please go back to the chatroom..."
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

  toggleLogin = e => {
    const _self = this;
    axios
      .post("/user/login", {
        username: this.state.field_user,
        password: this.state.field_pass
        // updateTime: Date.now()
      })
      .then(function(res) {
        if (res.data != "User is not found.") {
          sessionStorage.clear(); // clear old data
          var userInfo = {
            username: _self.state.field_user,
            password: _self.state.field_pass
          };
          sessionStorage.setItem("userInfo", JSON.stringify(userInfo));

          window.alert(userInfo["username"] + ": successfully logged in!");
          window.location = "/chatroom";
        } else {
          console.log(res.data);
          window.alert(
            res.data + " Please go to signup page, if you are new here."
          );
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

  signUpPage = e => {
    axios
      .get("/redirect?page=signup")
      .then(function(res) {
        console.log(res);
        window.location = "/signup";
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  // Note: Sign Up button does not work somehow, so use window message instead
  // to re-direct to another page (i.e. signup page)
  render() {
    return (
      <div className="firstContainer">
        <img className="img" src="./assets/login.jpg" />
        <Dialog
          open
          onRequestClose={this.toggleLogin}
          fullScreen={this.props.fullScreen}
        >
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please type in your username and password.
            </DialogContentText>
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
            {/* <Button onClick={this.signUpPage} color="secondary">
            Sign Up
          </Button> */}
            <Button onClick={this.toggleLogin} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Login;
