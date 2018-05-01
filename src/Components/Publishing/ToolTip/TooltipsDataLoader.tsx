import React, { Component } from "react"
import { QueryRenderer, graphql } from "react-relay"
import { createEnvironment } from "../../../Relay/createEnvironment"
import { ArticleData } from "../Typings"
import PropTypes from "prop-types"
import { getArtsySlugsFromArticle } from "../Constants"

interface Props {
  article: ArticleData
}

const environment = createEnvironment()

export class TooltipsDataLoader extends Component<Props> {
  render() {
    const { artists: artistSlugs } = getArtsySlugsFromArticle(
      this.props.article
    )

    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query TooltipsDataLoaderQuery($artistSlugs: [String!]) {
            artists(slugs: $artistSlugs) {
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
          artistSlugs,
        }}
        render={readyState => {
          return (
            <TooltipsContextProvider {...readyState.props}>
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
