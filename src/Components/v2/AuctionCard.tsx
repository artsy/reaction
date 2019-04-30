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

export const relativeTime = (timeIn, now) => {
  const time = moment(timeIn, "YYYY-MM-DD")
  const abs = Math.abs
  if (abs(time.diff(now, "days")) >= 1) {
    return `${time.diff(now, "days")}d`
  } else if (abs(time.diff(now, "hours")) >= 1) {
    return `${time.diff(now, "hours")}h`
  } else if (abs(time.diff(now, "minutes")) >= 1) {
    return `${time.diff(now, "minutes")}m`
  }
  return `${time.diff(now, "seconds")}s`
}

// now defaults to moment() but can be overriden for unit testing
export const upcomingLabel = (sale, now = moment()) => {
  const {
    start_at: startAt,
    end_at: endAt,
    live_start_at: liveStartAt,
    is_closed: isClosed,
    is_live_open: isLiveOpen,
    is_preview: isPreview,
    registration_status,
    is_registration_closed: isRegistrationClosed,
  } = sale

  const isRegistered = !!registration_status
  const isLAI = !!liveStartAt
  if (isPreview) {
    return `Opens in ${relativeTime(startAt, now)}`
  } else if (isClosed) {
    return "Auction closed"
  } else if (isLAI) {
    if (isLiveOpen) {
      return "In progress"
    } else if (isRegistered || isRegistrationClosed) {
      return `Live in ${relativeTime(liveStartAt, now)}`
    } else {
      return `Register by ${moment(liveStartAt, "YYYY-MM-DD")
        .tz("America/New_York")
        .format("MMM D")}`
    }
  } else {
    return `Ends in ${relativeTime(endAt, now)}`
  }
}

export interface AuctionCardProps {
  src: string
  href: string
  headline: string
  subHeadline: string
  badge: string
  isGalleryAuction: boolean
  isBenefit: boolean
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
    {!props.isGalleryAuction && !props.isBenefit && (
      <Serif size="3t">
        <Truncator maxLineCount={1}>{props.subHeadline}</Truncator>
      </Serif>
    )}
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
        {props.subHeadline && !props.isGalleryAuction && !props.isBenefit && (
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

    const statusLabel = upcomingLabel(sale)

    const imageURL = get(sale, s => s.cover_image.cropped.url)
    const partnerName = get(sale, s => s.partner.name)
    return (
      <AuctionCard
        src={imageURL}
        href={sale.href}
        headline={partnerName}
        subHeadline={sale.name}
        badge={statusLabel}
        isGalleryAuction={sale.isGalleryAuction}
        isBenefit={sale.isBenefit}
      />
    )
  },
  {
    sale: graphql`
      fragment AuctionCard_sale on Sale {
        cover_image {
          cropped(width: 200, height: 180) {
            url
          }
        }
        isBenefit
        isGalleryAuction
        end_at
        href
        id
        is_live_open
        is_preview
        live_start_at
        registrationStatus {
          id
        }
        is_registration_closed
        name
        start_at
        is_closed
        partner {
          name
        }
      }
    `,
  }
)
