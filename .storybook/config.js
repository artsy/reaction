import { configure } from "@kadira/storybook"

function loadStories() {
  require("../src/components/__stories__/artwork")
  require("../src/components/__stories__/artwork_grid")
  require("../src/components/__stories__/counter")
}

configure(loadStories, module);
