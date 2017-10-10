import { storiesOf } from "@storybook/react"
import * as React from "react"

import Artists from "../Steps/Artists"

storiesOf("Onboarding").add("Artist Selector", () => <Artists onNextButtonPressed={() => null} />)
