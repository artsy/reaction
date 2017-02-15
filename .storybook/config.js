import { configure } from "@kadira/storybook"

function loadStories() {
  require("../src/components/__stories__/artwork")
  require("../src/components/__stories__/artwork_grid")
}

configure(loadStories, module);
