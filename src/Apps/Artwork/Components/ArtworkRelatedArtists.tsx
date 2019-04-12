import { Box, Flex } from "@artsy/palette"
import { ArtworkRelatedArtists_artwork } from "__generated__/ArtworkRelatedArtists_artwork.graphql"
import { ContextConsumer } from "Artsy"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { ArtistCardFragmentContainer as ArtistCard } from "Components/v2"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { hideGrid } from "./OtherWorks/ArtworkContexts/ArtworkGrids"
import { Header } from "./OtherWorks/Header"

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

    const relatedUrl = sd.APP_URL + artist.href + "/related-artists"

    return (
      <ContextConsumer>
        {({ user, mediator }) => {
          return (
            <Box mt={6}>
              <Header title="Related artists" buttonHref={relatedUrl} />
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
            </Box>
          )
        }}
      </ContextConsumer>
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
