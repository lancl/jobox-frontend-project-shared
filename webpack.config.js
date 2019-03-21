var webpack = require("webpack");
var path = require("path");

var APP_DIR = path.resolve(__dirname, "src/app");
var BUILD_DIR = path.resolve(__dirname, "public/outputs");

var config = {
  entry: {
    signup: `${APP_DIR}/index_signup.js`,
    login: `${APP_DIR}/index_login.js`,
    chatroom: `${APP_DIR}/index_chatroom.js`
  },
  output: {
    path: BUILD_DIR,
    filename: "[name].js"
  },

  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js$/,
        include: APP_DIR,
        exclude: "/node_modules",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"]
        }
      },
      // Added for index.css (for chatroom)
      {
        test: /\.css$/,
        exclude: "/node_modules",
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};

module.exports = config;
