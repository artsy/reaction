import React from "react"
import { graphql, QueryRenderer } from "react-relay"

import { ContextConsumer, ContextProps } from "../../Artsy"
import MarketDataSummary from "./MarketDataSummary"

export interface Props extends ContextProps {
  artistID: string
}

class MarketDataSummaryContents extends React.Component<Props, null> {
  render() {
    const { artistID, relayEnvironment } = this.props
    return (
      <QueryRenderer
        environment={relayEnvironment}
        query={graphql`
          query MarketDataSummaryContentsQuery($artistID: String!) {
            artist(id: $artistID) {
              ...MarketDataSummary_artist
            }
          }
        `}
        variables={{ artistID }}
        render={({ props }) => {
          if (props) {
            return <MarketDataSummary artist={props.artist} />
          } else {
            return null
          }
        }}
      />
    )
  }
}

export const Contents = ContextConsumer(MarketDataSummaryContents)
