import React from "react"
import { Media } from "Utils/Responsive"

import {
  BorderBox,
  Flex,
  Image,
  ResponsiveImage,
  Sans,
  Serif,
} from "@artsy/palette"

export interface AuctionCardProps {
  src: string
  headline: string
  subHeadline: string
  badge: string
}

export class AuctionCard extends React.Component<AuctionCardProps> {
  render() {
    return (
      <>
        <Media at="xs">
          <SmallAuctionCard {...this.props} />
        </Media>
        <Media greaterThan="xs">
          <LargeAuctionCard {...this.props} />
        </Media>
      </>
    )
  }
}

export const LargeAuctionCard = props => (
  <BorderBox hover flexDirection="column">
    <Serif size="3t" weight="semibold">
      {props.headline}
    </Serif>
    <Serif size="3t">{props.subHeadline}</Serif>
    <ResponsiveImage src={props.src} my={2} />
    <Sans size="1" weight="medium">
      {props.badge}
    </Sans>
  </BorderBox>
)

export const SmallAuctionCard = props => (
  <Flex p={4} width="100%" justifyContent="space-between">
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
    <Image src={props.src} height="82px" mx={2} />
  </Flex>
)
