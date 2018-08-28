import { ArtistArtworksFilters } from "__generated__/WorksForYouQuery.graphql"
import { WorksForYouQuery } from "__generated__/WorksForYouQuery.graphql"
import { MarketingHeader } from "Apps/WorksForYou/Components/MarketingHeader"
import { ContextConsumer, ContextProps } from "Components/Artsy"
import Spinner from "Components/Spinner"
import React from "react"
import { graphql, QueryRenderer } from "react-relay"
import styled from "styled-components"
import WorksForYouArtist from "./WorksForYouArtist"
import WorksForYouContent from "./WorksForYouContents"

export interface Props extends ContextProps {
  artistID?: string
  forSale?: boolean
}

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
`

class WorksForYou extends React.Component<Props> {
  static defaultProps = {
    forSale: true,
  }
  render() {
    const { relayEnvironment, artistID, forSale } = this.props
    const includeSelectedArtist = !!artistID
    const filter: ArtistArtworksFilters[] = forSale ? ["IS_FOR_SALE"] : null

    return (
      <QueryRenderer<WorksForYouQuery>
        environment={relayEnvironment}
        query={graphql`
          query WorksForYouQuery(
            $includeSelectedArtist: Boolean!
            $artistID: String!
            $forSale: Boolean
            $filter: [ArtistArtworksFilters]
          ) {
            viewer {
              ...WorksForYouContents_viewer
                @skip(if: $includeSelectedArtist)
                @arguments(for_sale: $forSale)
              ...WorksForYouArtist_viewer
                @include(if: $includeSelectedArtist)
                @arguments(artistID: $artistID, filter: $filter)
            }
          }
        `}
        variables={{ artistID, includeSelectedArtist, forSale, filter }}
        render={({ props }) => {
          if (props) {
            return (
              <>
                <MarketingHeader />

                {includeSelectedArtist ? (
                  <WorksForYouArtist
                    artistID={this.props.artistID}
                    viewer={props.viewer}
                    forSale={forSale}
                    user={this.props.user}
                  />
                ) : (
                  <WorksForYouContent
                    user={this.props.user}
                    viewer={props.viewer}
                  />
                )}
              </>
            )
          } else {
            return (
              <SpinnerContainer>
                <Spinner />
              </SpinnerContainer>
            )
          }
        }}
      />
    )
  }
}

export const Contents = ContextConsumer(WorksForYou)
