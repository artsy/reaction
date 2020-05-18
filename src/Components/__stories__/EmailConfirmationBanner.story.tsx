import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { EmailConfirmationBanner } from "Components/EmailConfirmationBanner"

storiesOf("Components/EmailConfirmationBanner", module)
  .add("Successful Confirmation Message", () => {
    return <EmailConfirmationBanner messageCode="confirmed" />
  })
  .add("Fallback message", () => {
    return <EmailConfirmationBanner messageCode="uhoh" />
  })
