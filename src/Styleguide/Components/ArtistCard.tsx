import React from "react"
import { Flex } from "Styleguide/Elements/Flex"
import { BorderBox } from "Styleguide/Elements/Box"
import { Avatar, Button } from "Styleguide/Elements"
import { Serif, Sans } from "@artsy/palette"
import { Responsive } from "Styleguide/Utils/Responsive"

interface ArtistCardProps {
  src: string
  headline: string
  subHeadline: string
}

export class ArtistCard extends React.Component<ArtistCardProps> {
  render() {
    return (
      <Responsive>
        {({ xs }) => {
          if (xs) return <SmallArtistCard {...this.props} />
          else return <LargeArtistCard {...this.props} />
        }}
      </Responsive>
    )
  }
}

export const LargeArtistCard = props => (
  <BorderBox hover flexDirection="column" height="254px">
    <Flex flexDirection="column" flexGrow="1" alignItems="center">
      <Avatar src={props.src} mb={3} />
      <Serif size="3t">{props.headline}</Serif>
      <Sans size="1">{props.subHeadline}</Sans>
    </Flex>
    <Flex flexDirection="column" alignItems="center">
      <Button size="small" variant="secondaryOutline" width="90px">
        Follow
      </Button>
    </Flex>
  </BorderBox>
)

export const SmallArtistCard = props => (
  <BorderBox hover>
    <Flex flexDirection="column" justifyContent="center">
      <Sans weight="medium" size="2">
        {props.badge}
      </Sans>
      <Serif size="3t">{props.headline}</Serif>
      <Sans size="1">{props.subHeadline}</Sans>
      <Button size="small" variant="secondaryOutline" width="70px" mt={3}>
        Follow
      </Button>
    </Flex>
    <Avatar size="small" src={props.src} ml={4} />
  </BorderBox>
)
