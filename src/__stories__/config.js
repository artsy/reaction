const { configure } = require("@storybook/react")
const Events = require("../Utils/Events").default
const req = require.context("../", true, /\.story\.tsx$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
Events.onEvent(data => console.log("Tracked event", data))

import { setOptions } from "@storybook/addon-options"

setOptions({
  name: "Reaction",
  url: "http://artsy.github.io/reaction",
  showDownPanel: false,
  sortStoriesByKind: true,
})
