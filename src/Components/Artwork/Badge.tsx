import { Flex, Sans } from "@artsy/palette"
import { Badge_artwork } from "__generated__/Badge_artwork.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

interface BadgeProps {
  artwork: Badge_artwork
}

class Badge extends React.Component<BadgeProps> {
  render() {
    const { artwork } = this.props
    const { is_biddable, is_acquireable, is_offerable, href, sale } = artwork
    const includeBidBadge = is_biddable || (sale && sale.is_preview)
    // E.g.(ENDS IN 59M)
    const saleTimingHint =
      sale && sale.display_timely_at ? ` (${sale.display_timely_at})` : ""
    return (
      <>
        <Badges>
          {includeBidBadge && (
            <Label>
              <Sans size="0">Bid{saleTimingHint}</Sans>
            </Label>
          )}
          {is_acquireable && (
            <Label>
              <a
                href={href}
                style={{ textDecoration: "none", cursor: "pointer" }}
              >
                <Sans size="0">Buy Now</Sans>
              </a>
            </Label>
          )}
          {is_offerable && (
            <Label>
              <a
                href={href}
                style={{ textDecoration: "none", cursor: "pointer" }}
              >
                <Sans size="0">Make Offer</Sans>
              </a>
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

const Label = styled.div`
  border-radius: 2px;
  letter-spacing: 0.3px;
  padding: 3px 5px 1px 6px;
  background-color: white;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  margin-left: 5px;
`

const Badges = styled(Flex)`
  position: absolute;
  bottom: 8px;
  left: 3px;
  pointer-events: none;
`
