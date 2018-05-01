import React, { Component } from "react"
import { QueryRenderer, graphql } from "react-relay"
import { createEnvironment } from "../../../Relay/createEnvironment"
import { ArticleData } from "../Typings"
import PropTypes from "prop-types"

interface Props {
  article: ArticleData
}

const environment = createEnvironment()

export class TooltipsDataLoader extends Component<Props> {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query TooltipsDataLoaderQuery($artistIds: [String!]) {
            artists(slugs: $artistIds) {
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
          artistIds: ["andy-warhol", "pablo-picasso"],
        }}
        render={readyState => {
          return (
            <TooltipsContextProvider>
              {this.props.children}
            </TooltipsContextProvider>
          )
        }}
      />
    )
  }
}

class TooltipsContextProvider extends Component<any> {
  static childContextTypes = {
    tooltipsData: PropTypes.object,
  }

  getChildContext() {
    return {
      tooltipsData: {
        artists: this.props.artists,
        fairs: this.props.fairs,
      },
    }
  }

  render() {
    return this.props.children
  }
}
