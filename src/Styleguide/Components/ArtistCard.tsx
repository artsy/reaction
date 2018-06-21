import { Sans, Serif } from "@artsy/palette"
import React from "react"
import { Avatar, Button } from "Styleguide/Elements"
import { BorderBox } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Responsive } from "Styleguide/Utils/Responsive"

export interface ArtistCardProps {
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
  <BorderBox hover flexDirection="column" width="100%">
    <Flex flexDirection="column" flexGrow="0" alignItems="center" pt={1}>
      <Avatar src={props.src} mb={1} />
      <Serif size="3t" weight="semibold">
        {props.headline}
      </Serif>
      <Sans size="2">{props.subHeadline}</Sans>
    </Flex>

    <Spacer mb={1} />

    <Flex flexDirection="column" alignItems="center">
      <Button size="small" variant="secondaryOutline" width="90px">
        Follow
      </Button>
    </Flex>
  </BorderBox>
)

export const SmallArtistCard = props => (
  <BorderBox hover width="100%" justifyContent="space-between">
    <Flex flexDirection="column" justifyContent="center">
      <Sans weight="medium" size="2">
        {props.badge}
      </Sans>
      <Serif size="3t">{props.headline}</Serif>
      <Sans size="1">{props.subHeadline}</Sans>
      <Button size="small" variant="secondaryOutline" width="70px" mt={1}>
        Follow
      </Button>
    </Flex>
    <Avatar size="small" src={props.src} ml={2} />
  </BorderBox>
)
