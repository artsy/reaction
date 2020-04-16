import { ContextModule } from "@artsy/cohesion"
import { Box } from "@artsy/palette"
import { WorksForSaleRail_artist } from "__generated__/WorksForSaleRail_artist.graphql"
import { WorksForSaleRailRendererQuery } from "__generated__/WorksForSaleRailRendererQuery.graphql"
import { SystemContext } from "Artsy"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { SystemQueryRenderer } from "Artsy/Relay/SystemQueryRenderer"
import FillwidthItem from "Components/Artwork/FillwidthItem"
import { ArrowButton, Carousel } from "Components/Carousel"
import React, { useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { get } from "Utils/get"

interface WorksForSaleRailProps {
  artist: WorksForSaleRail_artist
}
const HEIGHT = 150

const WorksForSaleRail: React.FC<WorksForSaleRailProps & {
  onArtworkClicked: () => void
}> = ({ artist, onArtworkClicked }) => {
  const { user, mediator } = useContext(SystemContext)

  const artistData = get(
    artist,
    a => a.artworksConnection.edges,
    []
  ) as object[]

  return (
    <Carousel
      height="240px"
      data={artistData}
      options={{ pageDots: false }}
      render={artwork => {
        const aspect_ratio = get(artwork, a => a.node.image.aspect_ratio, 1)
        return (
          <FillwidthItem
            artwork={artwork.node}
            contextModule={ContextModule.worksForSaleRail}
            targetHeight={HEIGHT}
            imageHeight={HEIGHT}
            width={HEIGHT * aspect_ratio}
            margin={10}
            user={user}
            mediator={mediator}
            onClick={onArtworkClicked}
            lazyLoad
          />
        )
      }}
      renderLeftArrow={({ Arrow }) => {
        return (
          <ArrowContainer>
            <Arrow />
          </ArrowContainer>
        )
      }}
      renderRightArrow={({ Arrow }) => {
        return (
          <ArrowContainer>
            <Arrow />
          </ArrowContainer>
        )
      }}
    />
  )
}

const ArrowContainer = styled(Box)`
  align-self: flex-start;

  ${ArrowButton} {
    height: 60%;
  }
`

@track({
  context_module: Schema.ContextModule.WorksForSale,
})
class WorksForSaleRailWithTracking extends React.Component<
  WorksForSaleRailProps
> {
  @track({
    type: Schema.Type.Thumbnail,
    action_type: Schema.ActionType.Click,
  })
  trackArtworkClicked() {
    // noop
  }

  render() {
    return (
      <WorksForSaleRail
        {...this.props}
        onArtworkClicked={this.trackArtworkClicked.bind(this)}
      />
    )
  }
}

export const WorksForSaleRailFragmentContainer = createFragmentContainer(
  WorksForSaleRailWithTracking,
  {
    artist: graphql`
      fragment WorksForSaleRail_artist on Artist {
        artworksConnection(first: 20, sort: AVAILABILITY_ASC) {
          edges {
            node {
              id
              image {
                # Alias used in FillwidthItem
                aspect_ratio: aspectRatio
              }
              ...FillwidthItem_artwork
            }
          }
        }
        ...FollowArtistButton_artist
      }
    `,
  }
)

export const WorksForSaleRailQueryRenderer: React.FC<{
  artistID: string
}> = ({ artistID }) => {
  const { relayEnvironment } = useContext(SystemContext)
  return (
    <SystemQueryRenderer<WorksForSaleRailRendererQuery>
      environment={relayEnvironment}
      query={graphql`
        query WorksForSaleRailRendererQuery($artistID: String!) {
          artist(id: $artistID) {
            ...WorksForSaleRail_artist
          }
        }
      `}
      variables={{ artistID }}
      render={renderWithLoadProgress(WorksForSaleRailFragmentContainer)}
    />
  )
}
