import { AuctionCard_sale } from "__generated__/AuctionCard_sale.graphql"
import moment from "moment-timezone"
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
import { createFragmentContainer, graphql } from "react-relay"

const zone = time => {
  return moment(time).tz("America/New_York")
}

const upcomingLabel = (
  startAt,
  endAt,
  liveStartAt,
  isClosed,
  isLiveOpen,
  isPreview
) => {
  const timeFormat = "MMM D, h:mm A z"

  if (isPreview) {
    return `Auction opens ${zone(startAt).format(timeFormat)}`
  } else if (isClosed) {
    return "Auction closed"
  } else if (liveStartAt && !isLiveOpen) {
    return `Auction opens for live bidding ${zone(liveStartAt).format(
      timeFormat
    )}`
  } else if (liveStartAt) {
    return "Auction open for live bidding"
  } else {
    return `Auction closes ${zone(endAt).format(timeFormat)}`
  }
}

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

export const AuctionCardFragmentContainer = createFragmentContainer<{
  sale: AuctionCard_sale
}>(
  props => {
    const { sale } = props

    const statusLabel = upcomingLabel(
      sale.start_at,
      sale.end_at,
      sale.live_start_at,
      sale.is_closed,
      sale.is_live_open,
      sale.is_preview
    )
    return (
      <AuctionCard
        src={sale.cover_image.cropped.url}
        headline={sale.partner.name}
        subHeadline={sale.name}
        badge={statusLabel}
      />
    )
  },
  graphql`
    fragment AuctionCard_sale on Sale {
      cover_image {
        cropped(width: 200, height: 180) {
          url
        }
      }
      end_at
      href
      id
      is_live_open
      is_preview
      live_start_at
      name
      start_at
      is_closed
      partner {
        name
      }
    }
  `
)
