const env = require("dotenv")
const fs = require("fs")
const path = require("path")
const sharify = require("./sharify")

const ForkTsCheckerNotifierWebpackPlugin = require("fork-ts-checker-notifier-webpack-plugin")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")

const webpack = require("webpack")
const merge = require("webpack-merge")
const genDefaultConfig = require("@storybook/react/dist/server/config/defaults/webpack.config.js")

env.load()

/**
 * Write out a file that stubs the data that’s normally shared with the client through the `sharify` module. This file
 * is then replaced in the product of webpack where normally the actual `sharify` module would be loaded.
 */
const {
  WEBPACK_DEVTOOL = "cheap-module-eval-source-map",
  GEMINI_CLOUDFRONT_URL,
  METAPHYSICS_ENDPOINT,
  USER_ID,
  USER_ACCESS_TOKEN,
  XAPP_TOKEN,
} = process.env

const sharifyPath = sharify({
  GEMINI_CLOUDFRONT_URL,
  METAPHYSICS_ENDPOINT,
  XAPP_TOKEN,
})

const plugins = [
  new ForkTsCheckerWebpackPlugin({
    formatter: "codeframe",
    formatterOptions: "highlightCode",
    tslint: false,
    checkSyntacticErrors: true,
    watch: ["./src"],
  }),
  new ForkTsCheckerNotifierWebpackPlugin({
    excludeWarnings: true,
    skipFirstNotification: true,
  }),
  new webpack.NoEmitOnErrorsPlugin(),
]

if (USER_ID && USER_ACCESS_TOKEN) {
  plugins.push(
    new webpack.DefinePlugin({
      "process.env": {
        USER_ID: JSON.stringify(USER_ID),
        USER_ACCESS_TOKEN: JSON.stringify(USER_ACCESS_TOKEN),
        XAPP_TOKEN: JSON.stringify(XAPP_TOKEN),
      },
    })
  )
} else {
  console.warn(
    "\x1b[31m[!] Specify USER_ID and USER_ACCESS_TOKEN environment variables to use authenticated features.\x1b[0m"
  )
}

// A mix of  the base from Emission's webpack setup, and the simple config for
// storybooks: https://storybook.js.org/configurations/custom-webpack-config/

module.exports = (baseConfig, env) => {
  console.log("\n[Reaction] Booting...\n")

  const config = genDefaultConfig(baseConfig, env)

  // The progress plugin does not play nice with `concurrently`, so remove it.
  config.plugins = config.plugins.filter(({ constructor }) => {
    return constructor.name !== "ProgressPlugin"
  })

  const merged = merge(config, {
    devtool: WEBPACK_DEVTOOL,
    devServer: {
      overlay: {
        warnings: true,
        errors: true,
      },
      stats: "errors-only",
    },
    resolve: {
      extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx"],
      alias: {
        sharify: sharifyPath.replace(/\.js$/, ""),
        "styled-components": path.resolve("./node_modules/styled-components"),
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: [/src/],
          exclude: [/node_modules/, /__tests__/],
          use: [
            { loader: "cache-loader" },
            {
              loader: "babel-loader",
              options: {
                cacheDirectory: true,
              },
            },
            // NOTE: Painfully slow startup
            // See: https://github.com/strothj/react-docgen-typescript-loader
            // {
            //   loader: "react-docgen-typescript-loader",
            // },
          ],
        },
      ],
    },
    plugins: plugins,
  })
  return merged
}
