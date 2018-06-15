import React from "react"
import { Flex } from "Styleguide/Elements/Flex"
import { Avatar, Button } from "Styleguide/Elements"
import { Serif, Sans } from "@artsy/palette"
import { Responsive } from "Styleguide/Utils/Responsive"

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
    <Avatar src={props.src} mr={4} />
    <Flex flexDirection="column" justifyContent="center">
      <Serif size="5t">{props.headline}</Serif>
      <Sans size="2">{props.subHeadline}</Sans>
      <Button variant="secondaryOutline" size="small" mt={3} width="90px">
        Follow
      </Button>
    </Flex>
  </Flex>
)

export const SmallGallery = props => (
  <Flex>
    <Flex flexDirection="column" justifyContent="center">
      <Serif size="4">{props.headline}</Serif>
      <Sans size="1">{props.subHeadline}</Sans>
      <Button variant="secondaryOutline" size="small" mt={2} width="90px">
        Follow
      </Button>
    </Flex>
    <Avatar src={props.src} size="small" ml={4} />
  </Flex>
)
