import React from "react"
import { Responsive } from "../Utils/Responsive"
import { BorderBox } from "../Elements/Box"
import { Flex } from "../Elements/Flex"
import { Image, ResponsiveImage } from "../Elements/Image"
import { Serif, Sans } from "@artsy/palette"

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
    <ResponsiveImage src={props.src} my={4} />
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
    <Image src={props.src} height="82px" mx={4} />
  </Flex>
)
