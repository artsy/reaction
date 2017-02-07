import { configure } from "@kadira/storybook"

function loadStories() {
  require("../stories/artwork.tsx")
}

configure(loadStories, module);
