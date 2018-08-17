import React from "react"
import { graphql, QueryRenderer } from "react-relay"

import { ContextConsumer, ContextProps } from "Components/Artsy"
import WorksForYouContent from "./WorksForYouContents"

export interface Props extends ContextProps {}

class WorksForYou extends React.Component<Props> {
  render() {
    const { relayEnvironment } = this.props
    return (
      <QueryRenderer
        environment={relayEnvironment}
        query={graphql`
          query WorksForYouQuery {
            viewer {
              ...WorksForYouContents_viewer
            }
          }
        `}
        variables={{}}
        render={({ props }) => {
          if (props) {
            return <WorksForYouContent viewer={props.viewer} />
          } else {
            return null
          }
        }}
      />
    )
  }
}

export const Contents = ContextConsumer(WorksForYou)
