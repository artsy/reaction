import {
  BorderBox,
  Box,
  Flex,
  Image,
  Link,
  ResponsiveImage,
  Sans,
  Serif,
} from "@artsy/palette"
import { AuctionCard_sale } from "__generated__/AuctionCard_sale.graphql"
import { Truncator } from "Components/Truncator"
import moment from "moment-timezone"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "Utils/get"
import { Media } from "Utils/Responsive"

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
  href: string
  headline: string
  subHeadline: string
  badge: string
}

export class AuctionCard extends React.Component<AuctionCardProps> {
  render() {
    return (
      <Link href={this.props.href} noUnderline>
        <Media at="xs">
          <SmallAuctionCard {...this.props} />
        </Media>
        <Media greaterThan="xs">
          <LargeAuctionCard {...this.props} />
        </Media>
      </Link>
    )
  }
}

export const LargeAuctionCard = props => (
  <BorderBox hover flexDirection="column" height="300px">
    <Serif size="3t" weight="semibold">
      <Truncator maxLineCount={1}>{props.headline}</Truncator>
    </Serif>
    <Serif size="3t">
      <Truncator maxLineCount={1}>{props.subHeadline}</Truncator>
    </Serif>
    {props.src && (
      <Box height="200px">
        <ResponsiveImage src={props.src} my={2} pb="160px" />
      </Box>
    )}
    <Sans size="2" weight="medium">
      <Truncator maxLineCount={1}>{props.badge}</Truncator>
    </Sans>
  </BorderBox>
)

export const SmallAuctionCard = props => (
  <BorderBox hover width="100%" justifyContent="space-between">
    <Flex flexDirection="column" justifyContent="space-between">
      <Box>
        <Serif size="3t" weight="semibold">
          <Truncator maxLineCount={1}>{props.headline}</Truncator>
        </Serif>
        {props.subHeadline && (
          <Serif size="3t">
            <Truncator maxLineCount={2}>{props.subHeadline}</Truncator>
          </Serif>
        )}
      </Box>
      <Sans size="2" weight="medium">
        <Truncator maxLineCount={1}>{props.badge}</Truncator>
      </Sans>
    </Flex>
    {props.src && <Image src={props.src} height="82px" ml={2} />}
  </BorderBox>
)

export const AuctionCardFragmentContainer = createFragmentContainer<{
  sale: AuctionCard_sale
}>(
  props => {
    const { sale } = props

    if (!sale) return

    const statusLabel = upcomingLabel(
      sale.start_at,
      sale.end_at,
      sale.live_start_at,
      sale.is_closed,
      sale.is_live_open,
      sale.is_preview
    )

    const imageURL = get(sale, s => s.cover_image.cropped.url)
    const partnerName = get(sale, s => s.partner.name)
    return (
      <AuctionCard
        src={imageURL}
        href={sale.href}
        headline={partnerName}
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
