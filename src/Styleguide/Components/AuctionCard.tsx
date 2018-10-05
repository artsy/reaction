import React from "react"
import { Responsive2 } from "Utils/Responsive"

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
      <Responsive2>
        {breakpoints => {
          return (
            <>
              <breakpoints.xs>
                <SmallAuctionCard {...this.props} />
              </breakpoints.xs>
              <breakpoints.else>
                <LargeAuctionCard {...this.props} />
              </breakpoints.else>
            </>
          )
        }}
      </Responsive2>
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
