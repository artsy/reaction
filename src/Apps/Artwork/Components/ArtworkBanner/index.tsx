import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { ContextConsumer } from "Artsy/Router"
import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { get } from "Utils/get"
import { Banner } from "./Banner"

import { ArtworkBanner_artwork } from "__generated__/ArtworkBanner_artwork.graphql"
import { ArtworkBannerQuery } from "__generated__/ArtworkBannerQuery.graphql"

export interface ArtworkBannerProps {
  artwork: ArtworkBanner_artwork
}

export class ArtworkBanner extends React.Component<ArtworkBannerProps> {
  render() {
    const { context, partner } = this.props.artwork
    if (!context) return null
    // imageUrl: image for avatar
    // initials: fallback partner initials in case image is not there.
    // badge: in auction / at fair / in show
    // headline:  auction / fair / show name
    // subHeadline: partner name
    switch (context.__typename) {
      case "ArtworkContextAuction":
        const auctionImage = get(partner, p => p.profile.icon.url)
        return (
          <Banner
            imageUrl={auctionImage}
            initials={partner.initials}
            badge="In auction"
            headline={context.name}
            subHeadline={partner.name}
          />
        )
      case "ArtworkContextFair":
        const fairImage = get(context, c => c.profile.icon.img.url)
        const initials = get(context, c => c.profile.initials)
        return (
          <Banner
            imageUrl={fairImage}
            initials={initials}
            badge="At fair"
            // headline={context.name}
            headline="Fair name goes here"
            subHeadline={partner.name}
          />
        )
      case "ArtworkContextPartnerShow":
        const showImage = get(context, c => c.thumbnail.img.url)
        let showLine = "In current show"
        if (context.status === "upcoming") {
          showLine = "In upcoming show"
        } else if (context.status === "closed") {
          showLine = "In past show"
        }
        return (
          <Banner
            imageUrl={showImage}
            initials={partner.initials}
            badge={showLine} // headline={context.name}
            headline="Show name goes here"
            subHeadline={partner.name}
          />
        )
      default:
        return null
    }
  }
}

export const ArtworkBannerFragmentContainer = createFragmentContainer(
  ArtworkBanner,
  graphql`
    fragment ArtworkBanner_artwork on Artwork {
      context {
        __typename
        ... on ArtworkContextAuction {
          name
          href
          is_auction
          is_closed
          is_open
          live_start_at
          live_url_if_open
        }
        ... on ArtworkContextFair {
          name
          href
          is_active
          start_at
          end_at
          profile {
            initials
            icon {
              img: resized(width: 70, height: 70, version: "square") {
                url
              }
            }
          }
        }
        ... on ArtworkContextPartnerShow {
          name
          href
          type
          status
          thumbnail: cover_image {
            img: resized(width: 70, height: 70, version: "square") {
              url
            }
          }
        }
      }
      partner {
        type
        name
        initials
        profile {
          icon {
            url(version: "square140")
          }
        }
      }
    }
  `
)

export const ArtworkBannerQueryRenderer = ({
  artworkID,
}: {
  artworkID: string
}) => {
  return (
    <ContextConsumer>
      {({ user, mediator, relayEnvironment }) => {
        return (
          <QueryRenderer<ArtworkBannerQuery>
            environment={relayEnvironment}
            variables={{ artworkID }}
            query={graphql`
              query ArtworkBannerQuery($artworkID: String!) {
                artwork(id: $artworkID) {
                  ...ArtworkBanner_artwork
                }
              }
            `}
            render={renderWithLoadProgress(
              ArtworkBannerFragmentContainer as any
            )}
          />
        )
      }}
    </ContextConsumer>
  )
}
