const { configure } = require("@storybook/react")
const Events = require("../utils/events").default

const req = require.context("../", true, /\.story\.tsx$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)

import { setOptions } from "@storybook/addon-options"

setOptions({
  name: "Reaction",
  url: "http://artsy.github.io/reaction",
  showDownPanel: false,
  sortStoriesByKind: true,
})

Events.onEvent(data => console.log("Tracked event", data))
