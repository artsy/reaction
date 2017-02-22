const fsbx = require("fuse-box")
const artsySourceMap = require("./lib/fusebox/ArtsySourceMaps")
const fs = require("fs")

// The Storybook UI
const storybookManager = fsbx.FuseBox.init({
  homeDir: "./node_modules/@kadira/storybook/dist/client/manager",
  outFile: "./.storybook/manager.js",
})
storybookManager.bundle("> index.js")

// Reaction-Force
const fuse = fsbx.FuseBox.init({
  homeDir: "src",
  tsConfig: "./tsconfig.json",
  outFile: "./reaction-force.js",
    sourceMap: {
      bundleReference: "./reaction-force.js.map",
      outFile: "./reaction-force.js.map",
    },
  plugins: [
    fsbx.BabelPlugin({}),
    artsySourceMap()
  ],
})
fuse.triggerPost = () => {
  console.log("AFTER")
      //   const sourceMap = fs.readFileSync("reaction-force.js.map").toString()
      // const revisedSourceMap = sourceMap.replace(/\.jsx/g, ".tsx")
      // fs.writeFileSync("reaction-force.js.map", revisedSourceMap)
}

// Serve stories
const server = fuse.devServer(">__stories__/config.js +babel-runtime/* +components/__stories__/*.tsx", { root: "." })

// Serve Storybook bootstrap HTML
const app = server.httpServer.app
app.use("/", require("express").static("./.storybook"))
