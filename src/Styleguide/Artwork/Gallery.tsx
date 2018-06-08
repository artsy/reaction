import React from "react"
import { Flex } from "../Elements/Flex"
import { Avatar, Button } from "../Elements"
import { Serif, Sans } from "@artsy/palette"

interface GalleryProps {
  src: string
  headline: string
  subHeadline: string
}

export class Gallery extends React.Component<GalleryProps> {
  render() {
    return (
      <Flex>
        <Avatar src={this.props.src} size="100px" />
        <Flex flexDirection="column" justifyContent="center" ml={4}>
          <Serif size="5t">{this.props.headline}</Serif>
          <Sans size="2">{this.props.subHeadline}</Sans>
          <Button variant="outline" size="small" mt={3} width="80px">
            Follow
          </Button>
        </Flex>
      </Flex>
    )
  }
}
