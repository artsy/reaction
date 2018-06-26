import { ContextConsumer, ContextProps } from "Components/Artsy"
import React from "react"
import { graphql, QueryRenderer } from "react-relay"

import { SelectedExhibitionFragmentContainer } from "Styleguide/Components/SelectedExhibitions"

interface Props extends ContextProps {
  artistID: string
}

export const ExhibitionHighlightsQueryRenderer = ContextConsumer(
  class extends React.Component<Props> {
    render() {
      const { artistID, relayEnvironment } = this.props
      return (
        <QueryRenderer
          environment={relayEnvironment}
          query={graphql`
            query ExhibitionHighlightsQueryRendererQuery($artistID: String!) {
              artist(id: $artistID) {
                exhibition_highlights(size: 15) {
                  ...SelectedExhibitions_exhibitions
                }
              }
            }
          `}
          variables={{ artistID }}
          render={({ props }) => {
            if (props) {
              return (
                <SelectedExhibitionFragmentContainer
                  exhibitions={props.artist.exhibition_highlights.slice(0, 10)}
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
