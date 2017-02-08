import { configure } from "@kadira/storybook"

function loadStories() {
  require("../stories/artwork")
  require("../stories/artwork_grid")
}

configure(loadStories, module);
