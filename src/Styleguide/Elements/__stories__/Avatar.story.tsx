import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { Avatar } from "../Avatar"

storiesOf("Styleguide/Elements", module).add("Avatar", () => {
  return (
    <React.Fragment>
      <Section title="Default Avatar">
        <Avatar src="https://picsum.photos/110/110/?random" />
      </Section>
      <Section title="Small Avatar">
        <Avatar size="small" src="https://picsum.photos/110/110/?random" />
      </Section>
    </React.Fragment>
  )
})
