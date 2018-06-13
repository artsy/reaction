import React from "react"
import styled from "styled-components"
import { Flex } from "../Elements/Flex"
import { Sans } from "@artsy/palette"
import { themeGet } from "styled-system"

const Header = styled.div`
  padding: 5px 10px 3px;
  border-bottom: 1px solid ${themeGet("colors.black10")};
  user-select: none;
  transition: 0.4s;

  &:hover {
    background-color: ${themeGet("colors.black5")};
  }
`

export interface SectionProps {
  title?: string
}

export class Section extends React.Component<SectionProps> {
  state = {
    expanded: true,
  }
  toggleExpand = () => {
    this.setState({ expanded: !this.state.expanded })
  }
  render() {
    return (
      <React.Fragment>
        <Header onClick={this.toggleExpand}>
          <Flex justifyContent="space-between">
            <Sans size="4" color="black60">
              {this.props.title}
            </Sans>
            <Flex width="20px" justifyContent="center">
              <Sans size="6" color="black60">
                {this.state.expanded ? "-" : "+"}
              </Sans>
            </Flex>
          </Flex>
        </Header>
        {this.state.expanded && (
          <Flex
            flexDirection="column"
            alignItems="center"
            my={4}
            mx="auto"
            maxWidth="1192px"
          >
            {this.props.children}
          </Flex>
        )}
      </React.Fragment>
    )
  }
}
