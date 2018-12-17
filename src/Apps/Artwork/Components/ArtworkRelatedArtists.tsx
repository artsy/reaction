import { Box, Flex } from "@artsy/palette"
import { ContextConsumer } from "Artsy/Router"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistCardFragmentContainer as ArtistCard } from "Styleguide/Components"
import { Header } from "./OtherWorks/Header"

import { ArtworkRelatedArtists_artwork } from "__generated__/ArtworkRelatedArtists_artwork.graphql"

export interface ArtworkRelatedArtistsProps {
  artwork: ArtworkRelatedArtists_artwork
}

export class ArtworkRelatedArtists extends React.Component<
  ArtworkRelatedArtistsProps
> {
  render() {
    const {
      artwork: { artist },
    } = this.props

    return (
      <ContextConsumer>
        {({ user, mediator }) => {
          return (
            <Box mt={6}>
              <Header title="Related artists" />
              <Flex flexWrap="wrap" mr={-2} width="100%">
                {artist.related.artists.edges.map(({ node }, index) => {
                  return (
                    <Box
                      pr={2}
                      mb={[1, 4]}
                      width={["100%", "33%", "33%", "25%"]}
                      key={index}
                    >
                      <ArtistCard
                        artist={node}
                        mediator={mediator}
                        user={user}
                      />
                    </Box>
                  )
                })}
              </Flex>
            </Box>
          )
        }}
      </ContextConsumer>
    )
  }
}

export const ArtworkRelatedArtistsFragmentContainer = createFragmentContainer(
  ArtworkRelatedArtists,
  graphql`
    fragment ArtworkRelatedArtists_artwork on Artwork {
      artist {
        related {
          artists(kind: MAIN, first: 4) {
            edges {
              node {
                ...ArtistCard_artist
              }
            }
          }
        }
      }
    }
  `
)
