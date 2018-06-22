import { ContextConsumer, ContextProps } from "Components/Artsy"
import React from "react"
import { graphql, QueryRenderer } from "react-relay"
import { ArticlesRefetchContainer } from "./ArticlesRefetchContainer"

interface Props extends ContextProps {
  artistID: string
}

const PAGE_SIZE = 10

export const ArticlesQueryRenderer = ContextConsumer(
  class extends React.Component<Props> {
    render() {
      const { artistID, relayEnvironment } = this.props
      return (
        <QueryRenderer
          environment={relayEnvironment}
          query={graphql`
            query ArticlesQueryRendererQuery($artistID: String!, $first: Int!) {
              artist(id: $artistID) {
                ...ArticlesRefetchContainer_artist @arguments(first: $first)
              }
            }
          `}
          variables={{ artistID, first: PAGE_SIZE }}
          render={({ props }) => {
            if (props) {
              return <ArticlesRefetchContainer artist={props.artist} />
            } else {
              return null
            }
          }}
        />
      )
    }
  }
)
