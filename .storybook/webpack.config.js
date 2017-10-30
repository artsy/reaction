const env = require("dotenv")
const fs = require("fs")
const path = require("path")
const sharify = require("./sharify")

const merge = require("webpack-merge")
const genDefaultConfig = require("@storybook/react/dist/server/config/defaults/webpack.config.js")

const { CheckerPlugin } = require("awesome-typescript-loader")

/**
 * Write out a file that stubs the data that’s normally shared with the client through the `sharify` module. This file
 * is then replaced in the product of webpack where normally the actual `sharify` module would be loaded.
 */
const {
  WEBPACK_DEVTOOL = "#inline-source-map", // FIXME: Does this prior inline comment still apply? "Otherwise getting errors about e.g. `Relay` not being defined."
  METAPHYSICS_ENDPOINT,
} = env.config().parsed

const sharifyPath = sharify({
  METAPHYSICS_ENDPOINT,
})

let plugins = [new CheckerPlugin()]

// A mix of  the base from Emission's webpack setup, and the simple config for
// storybooks: https://storybook.js.org/configurations/custom-webpack-config/

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env)
  // The progress plugin does not play nice with `concurrently`, so remove it.
  config.plugins = config.plugins.filter(({ constructor }) => constructor.name !== "ProgressPlugin")

  const merged = merge(config, {
    devtool: WEBPACK_DEVTOOL,
    devServer: {
      stats: "errors-only",
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      alias: {
        sharify: sharifyPath.replace(/\.js$/, ""),
      },
    },
    module: {
      rules: [
        {
          exclude: [/node_modules/, /__tests__/],
          use: [
            {
              loader: "awesome-typescript-loader",
              options: {
                transpileOnly: true, // FIXME: This is only for the duration of fixing all build issues during Relay migration.
                useBabel: true,
                useCache: true,
                useTranspileModule: true, // Supposedly faster, won’t work if/when we emit TS declaration files.
              },
            },
          ],
          test: /\.tsx?$/,
        },
      ],
    },
    plugins: plugins,
  })
  return merged
}
