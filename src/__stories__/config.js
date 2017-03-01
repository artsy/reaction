const { configure } = require("@kadira/storybook")

function loadStories() {
  require("../components/__stories__/artwork")
  require("../components/__stories__/artwork_grid")
  require("../components/__stories__/modal_header")
  require("../components/__stories__/buttons")
  require("../components/__stories__/title")
}

configure(loadStories, module)