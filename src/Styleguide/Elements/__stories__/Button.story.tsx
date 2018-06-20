import React from "react"
import { storiesOf } from "storybook/storiesOf"
import styled from "styled-components"
import { color, space } from "styled-system"
import { Section } from "Styleguide/Utils/Section"
import { Button } from "../"

storiesOf("Styleguide/Elements", module).add("Button", () => {
  return (
    <React.Fragment>
      <Section title="primaryBlack">
        <Button variant="primaryBlack" size="small" m={0.5}>
          Follow
        </Button>
        <Button variant="primaryBlack" size="medium" m={0.5}>
          Follow
        </Button>
        <Button variant="primaryBlack" size="large" m={0.5}>
          Follow
        </Button>
      </Section>

      <Section title="primaryWhite">
        <Item bg="black" p={1} m={0.5}>
          <Button variant="primaryWhite" size="small">
            Follow
          </Button>
        </Item>
        <Item bg="black" p={1} m={0.5}>
          <Button variant="primaryWhite" size="medium">
            Follow
          </Button>
        </Item>
        <Item bg="black" p={1} m={0.5}>
          <Button variant="primaryWhite" size="large">
            Follow
          </Button>
        </Item>
      </Section>

      <Section title="secondaryGray">
        <Button variant="secondaryGray" size="small" m={0.5}>
          Follow
        </Button>
        <Button variant="secondaryGray" size="medium" m={0.5}>
          Follow
        </Button>
        <Button variant="secondaryGray" size="large" m={0.5}>
          Follow
        </Button>
      </Section>

      <Section title="secondaryOutline">
        <Button variant="secondaryOutline" size="small" m={0.5}>
          Follow
        </Button>
        <Button variant="secondaryOutline" size="medium" m={0.5}>
          Follow
        </Button>
        <Button variant="secondaryOutline" size="large" m={0.5}>
          Follow
        </Button>
      </Section>

      <Section title="Full width">
        <Button width="100%" size="large" m={0.5}>
          Contact Gallery
        </Button>
        <Button variant="secondaryOutline" width="100%" size="medium" m={0.5}>
          Contact Gallery
        </Button>
      </Section>
    </React.Fragment>
  )
})

const Item = styled.div.attrs<any>({})`
  ${space};
  ${color};
`
