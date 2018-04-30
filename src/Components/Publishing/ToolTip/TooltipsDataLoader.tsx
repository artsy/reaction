import React, { Component } from "react"
import { QueryRenderer, graphql } from "react-relay"
import { createEnvironment } from "../../../Relay/createEnvironment"

interface Props {
  articleHTML: string
}

const environment = createEnvironment()

export class TooltipsDataLoader extends Component<Props> {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
        query TooltipsQuery($artistIds) {
          artists(ids: $artistIds) {
            id
            name
            href
            image {
              url
            }
            bio
          }
        }
      `}
        variables={{
          artistIds: [""],
        }}
        render={() => {
          return <div />
        }}
      />
    )
  }
}
