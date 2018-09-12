import { Box, Button, Sans, StackableBorderBox } from "@artsy/palette"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { MobileTopBar } from "Styleguide/Components"
import { Section } from "Styleguide/Utils/Section"

class ActionSheet extends React.Component {
  state = {
    isOpen: false,
  }

  render() {
    return (
      <>
        {this.state.isOpen ? (
          <>
            <MobileTopBar>
              <Button variant="noOutline" size="small">
                Reset
              </Button>
              <Sans size="2" weight="medium">
                Filter (2)
              </Sans>
              <Button
                variant="primaryBlack"
                size="small"
                onClick={() => this.setState({ isOpen: false })}
              >
                Apply
              </Button>
            </MobileTopBar>
            <StackableBorderBox>Content</StackableBorderBox>
          </>
        ) : (
          <>
            <Button onClick={() => this.setState({ isOpen: true })}>
              Open ActionSheet
            </Button>
          </>
        )}
      </>
    )
  }
}

storiesOf("Styleguide/Components", module).add("MobileActionSheet", () => {
  return (
    <React.Fragment>
      <Section title="ActionSheet">
        <Box width="100%">
          <ActionSheet />
        </Box>
      </Section>
    </React.Fragment>
  )
})
