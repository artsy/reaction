import React from "react"
import { Responsive } from "../Utils/Responsive"
import { BorderBox } from "../Elements/Box"
import { Flex } from "../Elements/Flex"
import { Image } from "../Elements/Image"
import { Serif, Sans } from "@artsy/palette"

const ScaledArtworkImage = props => (
  <Flex height={props.height} justifyContent="center">
    <Image {...props} />
  </Flex>
)

export interface AuctionCardProps {
  src: string
  headline: string
  subHeadline: string
  badge: string
}

export class AuctionCard extends React.Component<AuctionCardProps> {
  render() {
    return (
      <Responsive>
        {({ xs }) => {
          if (xs) return <SmallAuctionCard {...this.props} />
          else return <LargeAuctionCard {...this.props} />
        }}
      </Responsive>
    )
  }
}

export const LargeAuctionCard = props => (
  <BorderBox hover flexDirection="column">
    <Serif size="3t" weight="semibold">
      {props.headline}
    </Serif>
    <Serif size="3t">{props.subHeadline}</Serif>
    <ScaledArtworkImage src={props.src} maxWidth="100%" height="auto" m={4} />
    <Sans size="1" weight="medium">
      {props.badge}
    </Sans>
  </BorderBox>
)

export const SmallAuctionCard = props => (
  <Flex p={4} flexGrow="1">
    <Flex flexDirection="column" justifyContent="space-between">
      <div>
        <Serif size="3t" weight="semibold">
          {props.headline}
        </Serif>
        <Serif size="3t">{props.subHeadline}</Serif>
      </div>
      <Sans size="1" weight="medium">
        {props.badge}
      </Sans>
    </Flex>
    <ScaledArtworkImage
      src={props.src}
      width="auto"
      height="82px"
      mr={4}
      ml={4}
    />
  </Flex>
)
