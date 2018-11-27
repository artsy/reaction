import { BorderBox, Box, Button, Collapse, Flex, Spacer } from "@artsy/palette"
import { storiesOf } from "@storybook/react"
import React from "react"
import { WebCollapse } from "../WebCollapse"

class CollapseStory extends React.Component {
  state = { open: true }
  render() {
    return (
      <>
        <Spacer mb={4} />
        <Flex flexDirection="column" alignItems="center">
          <Button
            onClick={() => this.setState({ open: !this.state.open })}
            width="300px"
          >
            Toggle
          </Button>
          <Spacer mb={4} />
          <Flex alignItems="flex-start">
            <BorderBox width="300px" flexDirection="column">
              <WebCollapse open={this.state.open}>
                <Box>Hello I am some content inside WebCollapse</Box>
              </WebCollapse>
            </BorderBox>
            <Spacer ml={4} />
            <BorderBox width="300px" flexDirection="column">
              <Collapse open={this.state.open}>
                <Box>Hello I am some content inside regular old Collapse</Box>
              </Collapse>
            </BorderBox>
          </Flex>
        </Flex>
      </>
    )
  }
}

storiesOf("WebCollapse", module).add("Collapses", () => <CollapseStory />)
