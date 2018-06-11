import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "../../Utils/Section"
import { FollowIcon } from "../FollowIcon"

storiesOf("Styleguide/Elements", module).add("FollowIcon", () => {
  return (
    <React.Fragment>
      <Section title="Object is already followed">
        <FollowIcon is_followed />
      </Section>
      <Section title="Object is NOT followed">
        <FollowIcon is_followed={false} />
      </Section>
      <Section title="Default">
        <FollowIcon />
      </Section>
    </React.Fragment>
  )
})
