const { configure } = require("@storybook/react")

const req = require.context("../", true, /\.story\.tsx$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)

import { setOptions } from "@storybook/addon-options"

setOptions({
  name: "Reaction Force",
  url: "http://artsy.github.io",
  showDownPanel: false,
  sortStoriesByKind: true,
})
