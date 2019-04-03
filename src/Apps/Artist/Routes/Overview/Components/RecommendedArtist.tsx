import { EntityHeader, Sans, Spacer } from "@artsy/palette"
import { RecommendedArtist_artist } from "__generated__/RecommendedArtist_artist.graphql"
import { SystemContext } from "Artsy/SystemContext"
import { FillwidthItem } from "Components/Artwork/FillwidthItem"
import { Carousel } from "Components/v2"
import React, { FC, useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "Utils/get"

interface RecommendedArtistProps {
  artist: RecommendedArtist_artist
}
const HEIGHT = 150

const RecommendedArtist: FC<RecommendedArtistProps> = ({ artist }) => {
  const { user, mediator } = useContext(SystemContext)

  return (
    <>
      <EntityHeader
        mt={4}
        imageUrl={get(artist, a => a.image.cropped.url, "")}
        name={artist.name}
        meta={artist.formatted_nationality_and_birthday}
        href={artist.href}
        FollowButton={
          <Sans size="2" weight="medium" color="black">
            Follow
          </Sans>
        }
      />

      <Spacer mb={3} />

      <Carousel
        data={artist.artworks_connection.edges as object[]}
        render={artwork => {
          const aspect_ratio = get(artwork, a => a.node.image.aspect_ratio, 1)

          return (
            <FillwidthItem
              artwork={artwork.node}
              targetHeight={HEIGHT}
              imageHeight={HEIGHT}
              width={HEIGHT * aspect_ratio}
              margin={10}
              user={user}
              mediator={mediator}
            />
            // onClick={this.trackClick.bind(this)}
          )
        }}
      />
    </>
  )
}

export const RecommendedArtistFragmentContainer = createFragmentContainer(
  RecommendedArtist,
  graphql`
    fragment RecommendedArtist_artist on Artist {
      id
      name
      formatted_nationality_and_birthday
      href
      image {
        cropped(width: 100, height: 100) {
          url
        }
      }
      artworks_connection(first: 20) {
        edges {
          node {
            __id
            image {
              aspect_ratio
            }
            ...FillwidthItem_artwork @relay(mask: false)
          }
        }
      }
    }
  `
)
