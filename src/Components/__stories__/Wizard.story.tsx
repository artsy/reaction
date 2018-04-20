import { storiesOf } from "@storybook/react"

import { FormWizard, BasicSlideshow } from "./WizardExamples"

storiesOf("Components/Wizard", module)
  .add("Basic", BasicSlideshow)
  .add("Form", FormWizard)
