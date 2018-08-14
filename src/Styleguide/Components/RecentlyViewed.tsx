import { Serif } from "@artsy/palette"
import { RecentlyViewed_me } from "__generated__/RecentlyViewed_me.graphql"
import { FillwidthItem } from "Components/Artwork/FillwidthItem"
import React from "react"
import { QueryRenderer } from "react-relay"
import { createFragmentContainer, graphql } from "react-relay"
import { AppState } from "Router/state"
import { Slider } from "Styleguide/Components/Slider"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Subscribe } from "unstated"

export interface RecentlyViewedProps {
  me: RecentlyViewed_me
  useRelay?: boolean
}

const HEIGHT = 100

export const RecentlyViewed: React.SFC<RecentlyViewedProps> = props => {
  const { me } = props

  return (
    <Subscribe to={[AppState]}>
      {({ state }) => {
        const {
          mediator,
          system: { currentUser },
        } = state

        return (
          me && (
            <React.Fragment>
              <Serif size="6">Recently viewed</Serif>

              <Spacer mb={3} />

              <Slider
                settings={{
                  slidesToScroll: 5,
                }}
                data={me.recentlyViewedArtworks.edges as Array<object>}
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
                      currentUser={currentUser}
                      mediator={mediator}
                    />
                  )
                }}
              />
            </React.Fragment>
          )
        )
      }}
    </Subscribe>
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
    <Subscribe to={[AppState]}>
      {({
        state: {
          system: { relayEnvironment, currentUser },
        },
      }) => {
        if (!currentUser) {
          return null
        }
        return (
          <QueryRenderer
            environment={relayEnvironment}
            variables={{}}
            query={graphql`
              query RecentlyViewedQuery {
                me {
                  ...RecentlyViewed_me
                }
              }
            `}
            render={({ props }) => {
              if (props) {
                return <RecentlyViewedFragmentContainer me={props.me} />
              } else {
                return null
              }
            }}
          />
        )
      }}
    </Subscribe>
  )
}
