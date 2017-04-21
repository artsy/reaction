const webpack = require("webpack")
const path = require("path")

module.exports = () => {
  return {
    entry: {
      "login": [
        "babel-polyfill", "./src/apps/loyalty/containers/login/browser",
      ],
      "inquiries": [
        "babel-polyfill", "./src/apps/loyalty/containers/inquiries/browser",
      ],
    },
    module: {
      rules: [
        { test: /\.json$/, loader: "json-loader" },
        {
          exclude: [/node_modules/, /__stories__/, /__tests__/],
          use: [
            "awesome-typescript-loader",
          ],
          test: /\.tsx?$/,
        },
      ],
    },
    output: {
      filename: "[name].js",
      path: path.join(__dirname, "../dist/apps/loyalty/server/bundles"),
      publicPath: "/loyalty/bundles",
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin("commons.chunk"),
    ],
    resolve: {
      extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    },
  }
}
