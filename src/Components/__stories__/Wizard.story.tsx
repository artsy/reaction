import { storiesOf } from "@storybook/react"

import { BasicSlideshow, FormWizard } from "./WizardExamples"

if (!navigator.userAgent.match(/Chromatic/)) {
  storiesOf("Components/Wizard", module)
    .add("Basic", BasicSlideshow)
    .add("Form", FormWizard)
}
