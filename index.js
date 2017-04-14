/*
 * Changes to this file will not be automatically reloaded,
 * instead you will have to restart the process to do so.
 */

const express = require("express")
const morgan = require("morgan")
const path = require("path")
const session = require("cookie-session")
const cookieParser = require("cookie-parser")
const sharify = require("sharify")
const bodyParser = require("body-parser")

// Long symbolicated stack traces, which includes traces that occurred in an earlier tick of the event loop.
require("longjohn")

// Load environment from disk
require("dotenv").load()

const srcPath = path.resolve(__dirname, process.argv[2] || "./src")
console.log(`📝  Loading server source from ${srcPath}`)

const app = express()
app.use(morgan("dev"))
app.use("/fonts", express.static("./assets/fonts"))

// Force provided middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(sharify)
app.use(cookieParser())
app.use(session({
  secret: "secret",
  name: "reaction-force.sess",
  maxAge: 31536000000,
  secure: false,
}))

// Dynamically host assets to browser.
const webpack = require("webpack");
const config = require("./webpack");
console.log(config)
const compiler = webpack(config);
app.use(require("webpack-dev-middleware")(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  serverSideRender: true,
}));
// Allow client to be notified of changes to sources.
app.use(require("webpack-hot-middleware")(compiler));

// Watch for FS changes in `srcPath` and clear cached modules when a change occurs,
// thus effectively reloading the file on a subsequent request.
const watcher = require("chokidar").watch(srcPath)
watcher.on("ready", function () {
  // TODO In the future this could be optimised to only reload the changed files and those that are dependent on it:
  //      https://github.com/alloy/relational-theory/tree/optimised-reloading-of-server-sources
  watcher.on("all", function () {
    // console.log(`Clearing module cache in: ${srcPath}`)
    Object.keys(require.cache).forEach(function (id) {
      if (id.startsWith(srcPath)) {
        delete require.cache[id]
      }
    });
  });
});

// In case of an uncaught exception show it to the user and proceed, rather than exiting the process.
// NOTE: This is a bad thing when it comes to concurrency, basically you can’t have 2 requests at the same time.
let currentResponse = null
app.use(function (req, res, next) {
  // if (currentResponse) {
  //   console.error("No concurrent requests may be made, only 1 at a time.");
  //   process.abort();
  // }
  currentResponse = res
  res.on("finish", () => {
    currentResponse = null
  })
  next()
})

let errorHandler = (error) => {
  if (currentResponse) {
    currentResponse.status(500).send(`
      <html>
        <body>
          <pre>${error.stack}</pre>
        </body>
      </html>
    `)
    currentResponse = null
  } else {
    console.error(error)
    process.abort()
  }
}

process.on("uncaughtException", errorHandler)
process.on("unhandledRejection", errorHandler)

// Dynamically load app routes so that they can be reloaded in development.
app.use((req, res, next) => {
  const subapps = require(path.join(srcPath, "apps")).default
  const subappNames = Object.keys(subapps)
  const router = express.Router()
  subappNames.forEach(subappName => {
    router.use(`/${subappName}`, subapps[subappName])
  })
  router.get("/", () => {
    res.send(`
      <html>
        <body>
          <h1>Available applications:</h1>
          <ul>
            ${subappNames.map(name => `<li><a href="/${name}">${name}</a></li>`)}
          </ul>
        </body>
      </html>
    `)
  })
  router(req, res, next)
})

app.listen(3000, () => {
  console.log("✨  Listening on http://localhost:3000") // tslint:disable-line
})
