/*
 * Changes to this file will not be automatically reloaded,
 * instead you will have to restart the process to do so.
 */

const webpack = require("webpack");
const path = require("path");

const { CheckerPlugin } = require("awesome-typescript-loader")

module.exports = {
  entry: {
    "login": [
      "./src/apps/loyalty/containers/login/browser",
      "webpack-hot-middleware/client",
    ],
    "inquiries": [
      "./src/apps/loyalty/containers/inquiries/browser",
      "webpack-hot-middleware/client"
    ]
  },
  module: {
    rules: [
      { test: /\.json$/, loader: "json-loader" },
      {
        exclude: [/node_modules/, /__stories__/],
        use: [
          "react-hot-loader",
          "awesome-typescript-loader",
        ],
        test: /\.tsx?$/,
      },
    ],
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist/bundles"),
    publicPath: "/bundles",
  },
  plugins: [
    new CheckerPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin("commons.chunk"),
  ],
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
  },
  devtool: "inline-source-map", // TODO: For production we should output a source-map file instead.
};
