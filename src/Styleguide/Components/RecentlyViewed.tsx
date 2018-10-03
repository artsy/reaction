import { Separator, Serif, Spacer } from "@artsy/palette"
import { RecentlyViewed_me } from "__generated__/RecentlyViewed_me.graphql"
import { RecentlyViewedQuery } from "__generated__/RecentlyViewedQuery.graphql"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { ContextConsumer } from "Artsy/Router"
import { FillwidthItem } from "Components/Artwork/FillwidthItem"
import React from "react"
import { QueryRenderer } from "react-relay"
import { createFragmentContainer, graphql } from "react-relay"
import { Carousel } from "Styleguide/Components/Carousel"

export interface RecentlyViewedProps {
  me: RecentlyViewed_me
  useRelay?: boolean
}

const HEIGHT = 180

export const RecentlyViewed: React.SFC<RecentlyViewedProps> = props => {
  const { me } = props

  return (
    <ContextConsumer>
      {({ user, mediator }) => {
        return (
          me && (
            <React.Fragment>
              <Separator my={6} />

              <Serif size="6">Recently viewed</Serif>

              <Spacer mb={3} />

              <Carousel
                settings={{
                  slidesToScroll: 5,
                }}
                data={me.recentlyViewedArtworks.edges as object[]}
                render={artwork => {
                  const {
                    node: {
                      image: { aspect_ratio },
                    },
                  } = artwork

                  return (
                    <FillwidthItem
                      artwork={artwork.node}
                      targetHeight={HEIGHT}
                      imageHeight={HEIGHT}
                      width={HEIGHT * aspect_ratio}
                      margin={10}
                      useRelay={props.useRelay}
                      user={user}
                      mediator={mediator}
                    />
                  )
                }}
              />
            </React.Fragment>
          )
        )
      }}
    </ContextConsumer>
  )
}

RecentlyViewed.defaultProps = {
  useRelay: true,
}

export const RecentlyViewedFragmentContainer = createFragmentContainer(
  RecentlyViewed,
  graphql`
    fragment RecentlyViewed_me on Me {
      recentlyViewedArtworks(first: 20) {
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

export const RecentlyViewedQueryRenderer = () => {
  return (
    <ContextConsumer>
      {({ user, mediator, relayEnvironment }) => {
        if (!user) {
          return null
        }
        return (
          <QueryRenderer<RecentlyViewedQuery>
            environment={relayEnvironment}
            variables={{}}
            query={graphql`
              query RecentlyViewedQuery {
                me {
                  ...RecentlyViewed_me
                }
              }
            `}
            render={renderWithLoadProgress(RecentlyViewedFragmentContainer)}
          />
        )
      }}
    </ContextConsumer>
  )
}
