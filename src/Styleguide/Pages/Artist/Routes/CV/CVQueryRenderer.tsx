import { ContextConsumer, ContextProps } from "Components/Artsy"
import React from "react"
import { QueryRenderer } from "react-relay"
import { CVPaginationContainer, PAGE_SIZE } from "./CVPaginationContainer"
import { CVQuery } from "./CVQuery"

interface ShowFilter {
  at_a_fair: boolean
  solo_show?: boolean
  sort: string
  is_reference?: boolean
  visible_to_public?: boolean
}

interface Props extends ContextProps {
  artistID: string
  filters: ShowFilter
  category: string
}

export const CVQueryRenderer = ContextConsumer(
  class extends React.Component<Props> {
    render() {
      const { artistID, relayEnvironment, filters, category } = this.props
      return (
        <QueryRenderer
          environment={relayEnvironment}
          query={CVQuery}
          variables={{ artistID, first: PAGE_SIZE, ...filters }}
          render={({ props }) => {
            if (props) {
              return (
                <CVPaginationContainer
                  category={category}
                  artist={props.artist}
                />
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
