const webpack = require("webpack")
const path = require("path")
const { NODE_ENV, PORT } = process.env
const isDevelopment = NODE_ENV === "development"
const isStaging = NODE_ENV === "staging"
const isProduction = NODE_ENV === "production"
const isDeploy = isStaging || isProduction

const config = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    login: ["./src/Apps/Loyalty/Containers/Login/Browser"],
    inquiries: ["./src/Apps/Loyalty/Containers/Inquiries/Browser"],
    forgot_password: ["./src/Apps/Loyalty/Containers/ForgotPassword/Browser"],
    analytics: ["./src/Apps/Loyalty/ClientSideAnalytics"],
  },
  module: {
    rules: [
      { test: /\.json$/, loader: "json-loader" },
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/, /__stories__/, /__tests__/],
        use: [
          {
            loader: "awesome-typescript-loader",
            options: {
              useBabel: true,
              useCache: true,
              useTranspileModule: true, // Supposedly faster, won’t work if/when we emit TS declaration files.
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "../dist/Apps/Loyalty/Server/bundles"),
    publicPath: "/Loyalty/bundles",
  },
  externals: {
    react: 'react',
    "react-dom": 'react-dom'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("commons.chunk"),
    new webpack.DefinePlugin({
      "process.env": {
        'NODE_ENV': JSON.stringify(NODE_ENV)
      }
    })
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  }
}

// Development
if (isDevelopment) {
  config.entry = Object.keys(config.entry)
    .reduce((entry, key) => {
      const app = config.entry[key]
      return {
        ...entry,
        [key]: app.unshift([
          "babel-polyfill",
          "webpack-hot-middleware/client?reload=true"
        ])
      }
    }, {})

  config.module.rules.push({
    test: /\.tsx?$/,
    include: /src/,
    use: ["react-hot-loader"]
  })

  config.plugins.push([
    new CheckerPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ])

  // Production
} else if (isProduction) {
  config.devtool = "source-map"
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
      },
      mangle: {
        keep_fnames: true,
      },
      sourceMap: true,
    }),
  )
}

module.exports = config
