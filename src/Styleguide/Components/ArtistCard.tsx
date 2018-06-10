import React from "react"
import styled from "styled-components"
import { Flex } from "../Elements/Flex"
import { Avatar, Button } from "../Elements"
import { Serif, Sans } from "@artsy/palette"
import { themeGet } from "styled-system"

const Container = styled(Flex)`
  border: 1px solid ${themeGet("colors.black10")};
  border-radius: 2px;
`

interface ArtistCardProps {
  src: string
  headline: string
  subHeadline: string
}

export class ArtistCard extends React.Component<ArtistCardProps> {
  render() {
    return (
      <Container flexDirection="column" height="254px" p={4}>
        <Flex flexDirection="column" flexGrow="1" alignItems="center">
          <Avatar src={this.props.src} size="100px" mb={3} />
          <Serif size="3t">{this.props.headline}</Serif>
          <Sans size="1">{this.props.subHeadline}</Sans>
        </Flex>
        <Flex flexDirection="column" alignItems="center">
          <Button size="small" variant="outline">
            Follow
          </Button>
        </Flex>
      </Container>
    )
  }
}
