const { configure } = require("@kadira/storybook")

function loadStories() {
  require("../components/__stories__/artwork")
  require("../components/__stories__/artwork_grid")
  require("../components/__stories__/login_header")
}

configure(loadStories, module)