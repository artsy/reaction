import { Spinner, Tab, Tabs } from "@artsy/palette"
import { RelatedWorksArtworkGrid_artwork } from "__generated__/RelatedWorksArtworkGrid_artwork.graphql"
import { RelatedWorksArtworkGridQuery } from "__generated__/RelatedWorksArtworkGridQuery.graphql"
import { hideGrid } from "Apps/Artwork/Components/OtherWorks/ArtworkContexts/ArtworkGrids"
import { Header } from "Apps/Artwork/Components/OtherWorks/Header"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { Mediator, SystemContext, withContext } from "Artsy/SystemContext"
import ArtworkGrid from "Components/ArtworkGrid"
import { take } from "lodash"
import React, { useContext } from "react"
import styled from "styled-components"
import createLogger from "Utils/logger"

import {
  createRefetchContainer,
  graphql,
  QueryRenderer,
  RelayRefetchProp,
} from "react-relay"

const logger = createLogger("RelatedWorksArtworkGrid.tsx")

const MAX_TAB_ITEMS = 3

interface RelatedWorksArtworkGridProps {
  relay: RelayRefetchProp
  artwork: RelatedWorksArtworkGrid_artwork
  mediator?: Mediator
}

interface RelatedWorksArtworkGridState {
  isLoading: boolean
}

@track({
  context_module: Schema.ContextModule.RelatedWorks,
})
class RelatedWorksArtworkGrid extends React.Component<
  RelatedWorksArtworkGridProps,
  RelatedWorksArtworkGridState
> {
  state = {
    isLoading: false,
  }

  handleTabClick = (tab: { data: { layerId: string } }) => {
    this.setState({ isLoading: true })

    this.props.relay.refetch(
      {
        layerId: tab.data.layerId,
      },
      null,
      error => {
        this.setState({
          isLoading: false,
        })
        if (error) {
          logger.error(error)
        }
      }
    )
  }

  @track({
    type: Schema.Type.ArtworkBrick,
    action_type: Schema.ActionType.Click,
  })
  trackBrickClick() {
    // noop
  }

  render() {
    const {
      artwork: {
        layers,
        layer: { artworksConnection },
      },
      mediator,
    } = this.props

    if (hideGrid(artworksConnection)) {
      return null
    }

    const names = take(
      layers.filter(layer => layer.name !== "For Sale"),
      MAX_TAB_ITEMS
    )

    return (
      <>
        <Header title="Related works" />
        <Tabs justifyContent="center" onChange={this.handleTabClick}>
          {names.map(({ name, id }, key) => {
            return (
              <Tab name={name} key={key} data={{ layerId: id }}>
                <ArtworksContainer>
                  {this.state.isLoading ? (
                    <Spinner />
                  ) : (
                    <ArtworkGrid
                      artworks={artworksConnection}
                      columnCount={[2, 3, 4]}
                      preloadImageCount={0}
                      mediator={mediator}
                      onBrickClick={this.trackBrickClick.bind(this)}
                    />
                  )}
                </ArtworksContainer>
              </Tab>
            )
          })}
        </Tabs>
      </>
    )
  }
}

export const RelatedWorksArtworkGridRefetchContainer = createRefetchContainer<
  RelatedWorksArtworkGridProps
>(
  withContext(RelatedWorksArtworkGrid),
  graphql`
    fragment RelatedWorksArtworkGrid_artwork on Artwork
      @argumentDefinitions(layerId: { type: "String" }) {
      layers {
        name
        id
      }
      layer(id: $layerId) {
        name
        artworksConnection(first: 8) {
          ...ArtworkGrid_artworks

          # Used to check for content
          edges {
            node {
              id
            }
          }
        }
      }
    }
  `,
  graphql`
    query RelatedWorksArtworkGridRefetchQuery(
      $artworkSlug: String!
      $layerId: String!
    ) {
      artwork(id: $artworkSlug) {
        ...RelatedWorksArtworkGrid_artwork @arguments(layerId: $layerId)
      }
    }
  `
)

// FIXME: Move to storybooks

export const RelatedWorksArtworkGridQueryRenderer: React.SFC<{
  artworkSlug: string
}> = ({ artworkSlug }) => {
  const { relayEnvironment } = useContext(SystemContext)

  return (
    <QueryRenderer<RelatedWorksArtworkGridQuery>
      environment={relayEnvironment}
      variables={{
        artworkSlug,
      }}
      query={graphql`
        query RelatedWorksArtworkGridQuery($artworkSlug: String!) {
          artwork(id: $artworkSlug) {
            ...RelatedWorksArtworkGrid_artwork
          }
        }
      `}
      render={renderWithLoadProgress(RelatedWorksArtworkGridRefetchContainer)}
    />
  )
}

// Set min-height so that spinner doesn't collapse area on tab switch
const ArtworksContainer = styled.div`
  position: relative;
  min-height: 500px;
`
