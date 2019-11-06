import { ArtworkBanner_artwork } from "__generated__/ArtworkBanner_artwork.graphql"
import { ArtworkBannerQuery } from "__generated__/ArtworkBannerQuery.graphql"
import { SystemContext } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { SystemQueryRenderer as QueryRenderer } from "Artsy/Relay/SystemQueryRenderer"
import React, { useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"
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
  if (artworkContextAuction && artworkContextAuction.__typename === "Sale") {
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
  if (artworkContextFair && artworkContextFair.__typename === "Fair") {
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
    artworkContextPartnerShow.__typename === "Show"
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
          name
          initials
        }
        sale {
          is_auction: isAuction
          isBenefit
          isGalleryAuction
          cover_image: coverImage {
            url(version: "square")
          }
        }
        # FIXME: There is a bug in the Relay transformer used before generating Flow types, and thus also our TS type
        #        generator, that leads to a union selection _with_ a __typename selection being normalized incorrectly.
        #        What ends up happening is that _only_ the common selection is being omitted from the second fragment,
        #        i.e. in this case the fair and partnerShow selections are missing name and href.
        artworkContextAuction: context {
          __typename
          ... on Sale {
            name
            href
          }
        }
        artworkContextFair: context {
          __typename
          ... on Fair {
            name
            href
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
          ... on Show {
            name
            href
            status
            thumbnail: coverImage {
              img: resized(width: 70, height: 70, version: "square") {
                url
              }
            }
          }
        }
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
