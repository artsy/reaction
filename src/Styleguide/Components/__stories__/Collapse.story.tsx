import { Button, Sans } from "@artsy/palette"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Collapse } from "Styleguide/Components"
import { Section } from "Styleguide/Utils/Section"

class Collapseable extends React.Component {
  state = {
    open: true,
  }

  render() {
    return (
      <>
        <Button onClick={() => this.setState({ open: !this.state.open })}>
          Toggle
        </Button>

        <Collapse open={this.state.open}>{this.props.children}</Collapse>
      </>
    )
  }
}

storiesOf("Styleguide/Components", module).add("Collapse", () => {
  return (
    <React.Fragment>
      <Section title="Collapse">
        <Collapseable>
          <Sans mt={3} size="3">
            The elegant spiral of the Nautilus shell, the sinuous pattern of the
            banks of a river, or the swirling vortex street of clouds - patterns
            exist on every level in nature. Along with fractals, chaos theory is
            one of the essential, universal influences on patterns in nature. In
            essence, the theory shows how systems of chaotic, apparent
            randomness have an underlying pattern, or repetition.
          </Sans>
        </Collapseable>

        <Sans mt={3} size="3">
          This text should move up and down as the section above animates.
        </Sans>
      </Section>
    </React.Fragment>
  )
})
