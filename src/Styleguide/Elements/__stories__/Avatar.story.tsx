import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { Avatar } from "../Avatar"

storiesOf("Styleguide/Elements", module).add("Avatar", () => {
  return (
    <React.Fragment>
      <Section title="Default Avatar">
        <Avatar src="http://via.placeholder.com/100x100?text=+" />
      </Section>
      <Section title="Small Avatar">
        <Avatar size="small" src="http://via.placeholder.com/70x70?text=+" />
      </Section>
    </React.Fragment>
  )
})
