const env = require("dotenv")
const fs = require("fs")
const path = require("path")
const sharify = require("./sharify")

/**
 * Write out a file that stubs the data that’s normally shared with the client through the `sharify` module. This file
 * is then replaced in the product of webpack where normally the actual `sharify` module would be loaded.
 */
const { METAPHYSICS_ENDPOINT } = env.config().parsed
const sharifyPath = sharify({ METAPHYSICS_ENDPOINT })

module.exports = {
  devtool: "#inline-source-map", // Otherwise getting errors about e.g. `Relay` not being defined.
  resolve: {
    extensions: ["", ".js", ".jsx", ".ts", ".tsx"],
    alias: {
      sharify: sharifyPath.replace(/\.js$/, ""),
    },
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loaders: ["awesome-typescript-loader?configFileName=./tsconfig.json&silent=true&transpileOnly=true&target=es6&useBabel=true&useCache=true"],
      },
    ],
  },
}
