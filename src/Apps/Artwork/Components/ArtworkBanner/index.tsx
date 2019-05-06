import { ArtworkBanner_artwork } from "__generated__/ArtworkBanner_artwork.graphql"
import { ArtworkBannerQuery } from "__generated__/ArtworkBannerQuery.graphql"
import { SystemContext } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import React, { useContext } from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { get } from "Utils/get"
import { Banner } from "./Banner"

export interface ArtworkBannerProps {
  artwork: ArtworkBanner_artwork
}

export const ArtworkBanner: React.SFC<ArtworkBannerProps> = props => {
  const {
    artworkContextAuction,
    artworkContextFair,
    artworkContextPartnerShow,
    partner,
    sale,
  } = props.artwork

  // Auction
  if (
    artworkContextAuction &&
    artworkContextAuction.__typename === "ArtworkContextAuction"
  ) {
    const auctionImage = get(sale, s => s.is_auction && s.cover_image.url)
    return (
      <Banner
        imageUrl={auctionImage}
        initials={partner.initials}
        meta="In auction"
        name={artworkContextAuction.name}
        // Do not display partner name for benefit or gallery auctions
        subHeadline={
          sale.isBenefit || sale.isGalleryAuction ? null : partner.name
        }
        href={artworkContextAuction.href}
      />
    )
  }

  // Fair
  if (
    artworkContextFair &&
    artworkContextFair.__typename === "ArtworkContextFair"
  ) {
    const fairImage = get(artworkContextFair, c => c.profile.icon.img.url)
    const initials = get(artworkContextFair, c => c.profile.initials)
    return (
      <Banner
        imageUrl={fairImage}
        initials={initials}
        meta="At fair"
        name={artworkContextFair.name}
        subHeadline={partner.name}
        href={artworkContextFair.href}
      />
    )
  }

  // Partner Show
  if (
    artworkContextPartnerShow &&
    artworkContextPartnerShow.__typename === "ArtworkContextPartnerShow"
  ) {
    const showImage = get(artworkContextPartnerShow, c => c.thumbnail.img.url)
    let showLine = "In current show"
    if (artworkContextPartnerShow.status === "upcoming") {
      showLine = "In upcoming show"
    } else if (artworkContextPartnerShow.status === "closed") {
      showLine = "In past show"
    }
    return (
      <Banner
        imageUrl={showImage}
        initials={partner.initials}
        meta={showLine}
        name={artworkContextPartnerShow.name}
        subHeadline={partner.name}
        href={artworkContextPartnerShow.href}
      />
    )
  }
  return null
}
export const ArtworkBannerFragmentContainer = createFragmentContainer(
  ArtworkBanner,
  {
    artwork: graphql`
      fragment ArtworkBanner_artwork on Artwork {
        partner {
          type
          name
          initials
          profile {
            icon {
              url(version: "square140")
            }
            href
          }
        }
        sale {
          is_auction
          isBenefit
          isGalleryAuction
          cover_image {
            url(version: "square")
          }
        }
        # This aliasing selection of the context is done to work around a type generator bug, see below.
        artworkContextAuction: context {
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
        }
        artworkContextFair: context {
          __typename
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
        }
        artworkContextPartnerShow: context {
          __typename
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
        # FIXME: There is a bug in the Relay transformer used before generating Flow types, and thus also our TS type
        #        generator, that leads to a union selection _with_ a __typename selection being normalized incorrectly.
        #        What ends up happening is that _only_ the common selection is being omitted from the second fragment,
        #        i.e. in this case the fair and partnerShow selections are missing name and href.
        #
        #        This can be seen much more clear when adding __typename to the context part in ArtworkRail.tsx.
        #
        # context {
        #   __typename
        #   ... on ArtworkContextAuction {
        #     name
        #     href
        #     is_auction
        #     is_closed
        #     is_open
        #     live_start_at
        #     live_url_if_open
        #   }
        #   ... on ArtworkContextFair {
        #     name
        #     href
        #     is_active
        #     start_at
        #     end_at
        #     profile {
        #       initials
        #       icon {
        #         img: resized(width: 70, height: 70, version: "square") {
        #           url
        #         }
        #       }
        #     }
        #   }
        #   ... on ArtworkContextPartnerShow {
        #     name
        #     href
        #     type
        #     status
        #     thumbnail: cover_image {
        #       img: resized(width: 70, height: 70, version: "square") {
        #         url
        #       }
        #     }
        #   }
        # }
      }
    `,
  }
)
export const ArtworkBannerQueryRenderer = ({
  artworkID,
}: {
  artworkID: string
}) => {
  const { relayEnvironment } = useContext(SystemContext)

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
      render={renderWithLoadProgress(ArtworkBannerFragmentContainer)}
    />
  )
}
