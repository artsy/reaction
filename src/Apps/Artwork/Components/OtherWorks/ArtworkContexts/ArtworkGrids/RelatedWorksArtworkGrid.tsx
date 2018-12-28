import { take } from "lodash"
import React from "react"

import { ContextConsumer } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import {
  createRefetchContainer,
  graphql,
  QueryRenderer,
  RelayRefetchProp,
} from "react-relay"

import { Spinner } from "@artsy/palette"
import { RelatedWorksArtworkGrid_artwork } from "__generated__/RelatedWorksArtworkGrid_artwork.graphql"
import { RelatedWorksArtworkGridQuery } from "__generated__/RelatedWorksArtworkGridQuery.graphql"
import { Header } from "Apps/Artwork/Components/OtherWorks/Header"
import { Mediator, withContext } from "Artsy/SystemContext"
import ArtworkGrid from "Components/ArtworkGrid"
import styled from "styled-components"
import { Tab, Tabs } from "Styleguide/Components"
import createLogger from "Utils/logger"

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

  render() {
    const {
      artwork: {
        layers,
        layer: { artworksConnection },
      },
      mediator,
    } = this.props

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
                      mediator={mediator}
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
  return (
    <ContextConsumer>
      {({ relayEnvironment }) => {
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
            render={renderWithLoadProgress(
              RelatedWorksArtworkGridRefetchContainer
            )}
          />
        )
      }}
    </ContextConsumer>
  )
}

// Set min-height so that spinner doesn't collapse area on tab switch
const ArtworksContainer = styled.div`
  position: relative;
  min-height: 500px;
`
