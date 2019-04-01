import { EntityHeader, Sans } from "@artsy/palette"
import { RecommendedArtist_artist } from "__generated__/RecommendedArtist_artist.graphql"
import React, { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "Utils/get"

interface RecommendedArtistProps {
  artist: RecommendedArtist_artist
}

export const RecommendedArtist: FC<RecommendedArtistProps> = ({ artist }) => {
  return (
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
    }
  `
)
