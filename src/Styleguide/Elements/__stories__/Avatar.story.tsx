import React from "react"
import { Section } from "../../Utils/Section"
import { Avatar } from "../Avatar"
import { storiesOf } from "storybook/storiesOf"

storiesOf("Styleguide/Elements", module).add("Avatar", () => {
  return (
    <Section title="Default">
      <Avatar size="110px" src="https://picsum.photos/110/110/?random" />
    </Section>
  )
})
