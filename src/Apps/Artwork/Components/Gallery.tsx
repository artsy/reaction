import { Avatar, Button, Flex, Sans, Serif } from "@artsy/palette"
import React from "react"
import { Responsive } from "Utils/Responsive"

export interface GalleryProps {
  src: string
  headline: string
  subHeadline: string
}

export class Gallery extends React.Component<GalleryProps> {
  render() {
    return (
      <Responsive>
        {({ xs }) => {
          if (xs) return <SmallGallery {...this.props} />
          else return <LargeGallery {...this.props} />
        }}
      </Responsive>
    )
  }
}

export const LargeGallery = props => (
  <Flex>
    <Avatar src={props.src} mr={2} />
    <Flex flexDirection="column" justifyContent="center">
      <Serif size="5t">{props.headline}</Serif>
      <Sans size="2">{props.subHeadline}</Sans>
      <Button variant="secondaryOutline" size="small" mt={1} width="90px">
        Follow
      </Button>
    </Flex>
  </Flex>
)

export const SmallGallery = props => (
  <Flex width="100%" justifyContent="space-between">
    <Flex flexDirection="column" justifyContent="center">
      <Serif size="4">{props.headline}</Serif>
      <Sans size="1">{props.subHeadline}</Sans>
      <Button variant="secondaryOutline" size="small" mt={0.5} width="90px">
        Follow
      </Button>
    </Flex>
    <Avatar src={props.src} size="sm" ml={2} />
  </Flex>
)
