import React from "react"
import { graphql, QueryRenderer } from "react-relay"

import { ContextProps, withContext } from "Router/Artsy2"
import MarketInsights from "./MarketInsights"

export interface Props extends ContextProps {
  artistID: string
}

class MarketInsightsContents extends React.Component<Props, null> {
  render() {
    const { artistID, relayEnvironment } = this.props
    return (
      <QueryRenderer
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

export const Contents = withContext(MarketInsightsContents)
