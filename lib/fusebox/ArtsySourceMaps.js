const fs = require("fs")

module.exports = function() {
  return {
    bundleEnd: function() {
      // const sourceMap = fs.readFileSync("reaction-force.js.map").toString()
      // const revisedSourceMap = sourceMap.replace(/\.jsx/g, ".tsx")
      // fs.writeFileSync("reaction-force.js.map", revisedSourceMap)
      console.log("plugin")
    }
  }
}

