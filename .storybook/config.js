import { configure } from "@kadira/storybook"

function loadStories() {
  require("../stories/artwork")
}

configure(loadStories, module);
