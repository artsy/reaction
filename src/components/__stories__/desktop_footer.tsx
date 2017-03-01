import { action, storiesOf } from "@kadira/storybook"
import * as React from "react"

import DesktopFooter from "../layout/desktop_footer"

storiesOf("DesktopFooter", DesktopFooter)
  .add("Desktop Footer", () => (
    <DesktopFooter/>
  ))
