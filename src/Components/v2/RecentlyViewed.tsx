import { Separator, Serif, Spacer } from "@artsy/palette"
import { RecentlyViewed_me } from "__generated__/RecentlyViewed_me.graphql"
import { RecentlyViewedQuery } from "__generated__/RecentlyViewedQuery.graphql"
import { ContextConsumer, SystemContext } from "Artsy"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { FillwidthItem } from "Components/Artwork/FillwidthItem"
import { Carousel } from "Components/v2/Carousel"
import React, { useContext } from "react"
import { QueryRenderer } from "react-relay"
import { createFragmentContainer, graphql } from "react-relay"

export interface RecentlyViewedProps {
  me: RecentlyViewed_me
}

const HEIGHT = 180

@track({
  context_module: Schema.ContextModule.RecentlyViewedArtworks,
})
export class RecentlyViewed extends React.Component<RecentlyViewedProps> {
  @track({
    type: Schema.Type.Thumbnail,
    action_type: Schema.ActionType.Click,
  })
  trackClick() {
    //
  }

  render() {
    const { me } = this.props

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
                        user={user}
                        mediator={mediator}
                        onClick={this.trackClick.bind(this)}
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
}

export const RecentlyViewedFragmentContainer = createFragmentContainer(
  RecentlyViewed,
  {
    me: graphql`
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
    `,
  }
)

export const RecentlyViewedQueryRenderer = () => {
  const { user, relayEnvironment } = useContext(SystemContext)
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
}
