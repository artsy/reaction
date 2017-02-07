const path = require('path');

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loaders: ["awesome-typescript-loader?configFileName=./tsconfig.json&silent=true&target=es6&useBabel=true&useCache=true"],
      },
    ],
  },
}
