const { configure } = require("@storybook/react")
const { setDefaults } = require("@storybook/addon-info")

const Events = require("../Utils/Events").default
const req = require.context("../", true, /\.story\.tsx$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

setDefaults({
  inline: true,
})

// In a previous version of this file, this code was behind a set timeout,
// which wouldn't work with chromatic. It was added in this commit
// https://github.com/artsy/reaction/commit/933db4a852c12c40b21093eaafc1e2a2c68dc6e3#diff-c77a2a190af37e2e02481dd4885f800eL9
//
configure(loadStories, module)
require("storybook-chromatic")

Events.onEvent(data => {
  console.log("Tracked event", data)
})

// TODO: Fix the below
// setOptions({
//   name: "Reaction",
//   url: "http://artsy.github.io/reaction",
//   showDownPanel: false,
//   sortStoriesByKind: true,
// })
