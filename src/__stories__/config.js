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

setTimeout(() => {
  configure(loadStories, module)
})

Events.onEvent(data => {
  console.log("Tracked event", data)
})

if (!window.sd || !(typeof window.sd === "object")) {
  window.sd = {}
}
window.sd.STRIPE_PUBLISHABLE_KEY = "pk_test_BGUg8FPmcBs1ISbN25iCp2Ga"

// TODO: Fix the below
// setOptions({
//   name: "Reaction",
//   url: "http://artsy.github.io/reaction",
//   showDownPanel: false,
//   sortStoriesByKind: true,
// })
