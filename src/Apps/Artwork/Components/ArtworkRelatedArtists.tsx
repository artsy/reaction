import { Box, Button, Flex, Serif } from "@artsy/palette"
import { ArtworkRelatedArtists_artwork } from "__generated__/ArtworkRelatedArtists_artwork.graphql"
import { SystemContextConsumer } from "Artsy"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { ArtistCardFragmentContainer as ArtistCard } from "Components/v2"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { hideGrid } from "./OtherWorks/ArtworkContexts/ArtworkGrids"

export interface ArtworkRelatedArtistsProps {
  artwork: ArtworkRelatedArtists_artwork
}

@track({
  context_module: Schema.ContextModule.RelatedArtists,
})
export class ArtworkRelatedArtists extends React.Component<
  ArtworkRelatedArtistsProps
> {
  @track({
    type: Schema.Type.ArtistCard,
    action_type: Schema.ActionType.Click,
  })
  trackArtistCardClick() {
    // noop
  }

  render() {
    const {
      artwork: { artist },
    } = this.props
    if (hideGrid(artist.related.artists)) {
      return null
    }

    return (
      <SystemContextConsumer>
        {({ user, mediator }) => {
          return (
            <Box mt={6}>
              <Flex flexDirection="column" alignItems="center">
                <Serif
                  size={["5t", "8"]}
                  color="black100"
                  mb={2}
                  textAlign="center"
                >
                  Related artists
                </Serif>
              </Flex>
              <Flex flexWrap="wrap" mr={-2} width="100%">
                {artist.related.artists.edges.map(({ node }, index) => {
                  return (
                    <Box pr={2} mb={[1, 4]} width={["100%", "25%"]} key={index}>
                      <ArtistCard
                        lazyLoad
                        artist={node}
                        mediator={mediator}
                        user={user}
                        onClick={this.trackArtistCardClick.bind(this)}
                      />
                    </Box>
                  )
                })}
              </Flex>
              <Flex flexDirection="column" alignItems="center">
                <Button
                  variant="secondaryOutline"
                  mb={3}
                  onClick={() => {
                    console.log("show more!")
                  }}
                >
                  Show more
                </Button>
              </Flex>
            </Box>
          )
        }}
      </SystemContextConsumer>
    )
  }
}

export const ArtworkRelatedArtistsFragmentContainer = createFragmentContainer(
  ArtworkRelatedArtists,
  {
    artwork: graphql`
      fragment ArtworkRelatedArtists_artwork on Artwork {
        artist {
          href
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
    `,
  }
)
