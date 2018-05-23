import { storiesOf } from "@storybook/react"
import * as React from "react"

import { MobileRegisterForm } from "../RegisterForm"

storiesOf("Components/Authentication/Mobile", module).add(
  "RegisterForm",
  () => (
    <MobileRegisterForm
      values={{}}
      handleSubmit={() => null}
      handleTypeChange={() => mode => null}
    />
  )
)
