import React from "react"
import { graphql, QueryRenderer } from "react-relay"

import { MarketInsightsContentsQuery } from "__generated__/MarketInsightsContentsQuery.graphql"
import { SystemContextProps, withSystemContext } from "Artsy"
import MarketInsights from "./MarketInsights"

export interface Props extends SystemContextProps {
  artistID: string
}

class MarketInsightsContents extends React.Component<Props, null> {
  render() {
    const { artistID, relayEnvironment } = this.props
    return (
      <QueryRenderer<MarketInsightsContentsQuery>
        environment={relayEnvironment}
        query={graphql`
          query MarketInsightsContentsQuery($artistID: String!) {
            artist(id: $artistID) {
              ...MarketInsights_artist
            }
          }
        `}
        variables={{ artistID }}
        render={({ props }) => {
          if (props) {
            return <MarketInsights artist={props.artist} />
          } else {
            return null
          }
        }}
      />
    )
  }
}

export const Contents = withSystemContext(MarketInsightsContents)
