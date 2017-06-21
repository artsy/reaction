const { configure } = require("@storybook/react")

function loadStories() {
  require("../components/__stories__/artwork")
  require("../components/__stories__/artwork_grid")
  require("../components/__stories__/modal_header")
  require("../components/__stories__/buttons")
  require("../components/__stories__/typography")
  require("../components/__stories__/input")
  require("../components/__stories__/grid")
  require("../components/__stories__/modal")
  require("../components/__stories__/nav")
  require("../components/__stories__/artwork_filter")
  require("../components/__stories__/inquiry_artwork")
  require("../components/__stories__/save")
  require("../components/__stories__/spinner")
  require("../components/__stories__/fillwidth")
  require("../components/__stories__/artist_follow")
  require("../components/__stories__/gene")
  require("../components/__stories__/fair_booth")
}

configure(loadStories, module)
