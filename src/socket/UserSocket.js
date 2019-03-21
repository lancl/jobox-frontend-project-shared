const UserSchema = require("../models/User.js");

var User = null;
class UserSocket {
  constructor(con) {
    User = con.model("User", UserSchema);
  }

  storeUsers(data, res) {
    var newUser = new User({
      username: data.username,
      password: data.password,
      icon: data.icon,
      updateTime: data.updateTime
    });
    newUser.save(function(err, data) {
      console.log(data);
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(data);
        res.send(data);
      }
    });
  }
  checkUsers(data, res) {
    var myUser = new User({
      username: data.username,
      password: data.password,
      icon: data.icon,
      updateTime: data.updateTime
    });
    User.find(
      {
        username: myUser.username,
        password: myUser.password
      },
      function(err, user) {
        if (err) {
          console.log(err);
          res.send(err);
        } else if (user.length == 1) {
          console.log(user);
          res.redirect("/chatroom");
        } else {
          res.send("User is not found.");
        }
      }
    );
  }
  sendIcon(me, res) {
    User.find({ username: me }, function(err, myuser) {
      var icon = JSON.stringify({ icon: myuser[0]["icon"] });
      res.send(icon);
    });
  }
}

module.exports = UserSocket;
