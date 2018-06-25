import { ContextConsumer, ContextProps } from "Components/Artsy"
import React from "react"
import { QueryRenderer } from "react-relay"
import { ShowsQuery } from "./ShowsQuery"
import { PAGE_SIZE, ShowsRefetchContainer } from "./ShowsRefetchContainer"

interface Props extends ContextProps {
  artistID: string
  status: string
  sort: string
}

export const ShowsQueryRenderer = ContextConsumer(
  class extends React.Component<Props> {
    render() {
      const { artistID, relayEnvironment, status, sort } = this.props
      return (
        <QueryRenderer
          environment={relayEnvironment}
          query={ShowsQuery}
          variables={{ artistID, first: PAGE_SIZE, status, sort }}
          render={({ props }) => {
            if (props) {
              return (
                <ShowsRefetchContainer status={status} artist={props.artist} />
              )
            } else {
              return null
            }
          }}
        />
      )
    }
  }
)
