import { Box, Flex, Link, Sans, space } from "@artsy/palette"
import { Badge_artwork } from "__generated__/Badge_artwork.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { get } from "Utils/get"

interface BadgeProps {
  artwork: Badge_artwork
  width?: number // for smaller images, we have a tweaked layout
}

const MIN_IMAGE_SIZE = 150

class Badge extends React.Component<BadgeProps> {
  get stackedLayout() {
    return get(
      this.props,
      p => p.width / window.devicePixelRatio < MIN_IMAGE_SIZE,
      false
    )
  }

  render() {
    const { artwork } = this.props
    const { is_biddable, is_acquireable, is_offerable, href, sale } = artwork
    const includeBidBadge = is_biddable || (sale && sale.is_preview)
    // E.g.(ENDS IN 59M)
    const saleTimingHint =
      sale && sale.display_timely_at ? ` (${sale.display_timely_at})` : ""
    return (
      <>
        <Badges flexDirection={this.stackedLayout ? "column" : "row"}>
          {includeBidBadge && (
            <Label>
              <Sans size="0">Bid{saleTimingHint}</Sans>
            </Label>
          )}
          {is_acquireable && (
            <Label>
              <BadgeLink href={href} underlineBehavior="none">
                <Sans size="0">Buy Now</Sans>
              </BadgeLink>
            </Label>
          )}
          {is_offerable && (
            <Label>
              <BadgeLink href={href} underlineBehavior="none">
                <Sans size="0">Make Offer</Sans>
              </BadgeLink>
            </Label>
          )}
        </Badges>
      </>
    )
  }
}

export default createFragmentContainer(Badge, {
  artwork: graphql`
    fragment Badge_artwork on Artwork {
      is_biddable
      is_acquireable
      is_offerable
      href
      sale {
        is_preview
        display_timely_at
      }
    }
  `,
})

const Label = styled(Box)`
  border-radius: 2px;
  letter-spacing: 0.3px;
  padding: 3px 5px 1px 6px;
  background-color: white;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  margin-left: ${space(0.5)}px;
  margin-top: ${space(0.5)}px;
`

const BadgeLink = styled(Link)`
  cursor: pointer;
`

const Badges = styled(Flex)`
  position: absolute;
  bottom: 8px;
  left: 3px;
  pointer-events: none;
`
