import React, { Component } from "react"
import PropTypes from "prop-types"
import { QueryRenderer, graphql } from "react-relay"
import { createEnvironment } from "../../../Relay/createEnvironment"
import { ArticleData } from "../Typings"
import { getArtsySlugsFromArticle } from "../Constants"
import { keyBy } from "lodash"
import { TooltipsDataLoaderQueryResponse } from "../../../__generated__/TooltipsDataLoaderQuery.graphql"

interface Props {
  article: ArticleData
  shouldFetchData?: boolean
}

// TODO: get enviroment from context or pass it in as prop
const environment = createEnvironment()

export class TooltipsDataLoader extends Component<Props> {
  static defaultProps = {
    shouldFetchData: true,
  }

  render() {
    const { artists: artistSlugs } = getArtsySlugsFromArticle(
      this.props.article
    )

    if (!this.props.shouldFetchData) {
      return this.props.children
    }

    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query TooltipsDataLoaderQuery($artistSlugs: [String!]) {
            artists(slugs: $artistSlugs) {
              id
              ...ArtistToolTip_artist
            }
          }
        `}
        variables={{
          artistSlugs,
        }}
        render={readyState => {
          const data: TooltipsDataLoaderQueryResponse = { artists: [] }
          Object.keys(readyState.props || {}).forEach(key => {
            const col = readyState.props[key]
            data[key] = keyBy(col, "id")
          })
          return (
            <TooltipsContextProvider {...data}>
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
        genes: this.props.genes,
      },
    }
  }

  render() {
    return this.props.children
  }
}
