import React, { Component } from "react"
import PropTypes from "prop-types"
import { QueryRenderer, graphql } from "react-relay"
import { ArticleData } from "Components/Publishing/Typings"
import { getArtsySlugsFromArticle } from "Components/Publishing/Constants"
import { keyBy } from "lodash"
import { TooltipsDataLoaderQueryResponse } from "__generated__/TooltipsDataLoaderQuery.graphql"
import * as Artsy from "Components/Artsy"

interface Props extends Artsy.ContextProps {
  article: ArticleData
  shouldFetchData?: boolean
}

export class TooltipsDataLoader extends Component<Props> {
  static defaultProps = {
    shouldFetchData: true,
  }

  render() {
    const {
      article,
      children,
      currentUser,
      relayEnvironment,
      shouldFetchData,
    } = this.props

    const { artists: artistSlugs, genes: geneSlugs } = getArtsySlugsFromArticle(
      article
    )

    if (!shouldFetchData) {
      return children
    }

    return (
      <QueryRenderer
        environment={relayEnvironment}
        query={graphql`
          query TooltipsDataLoaderQuery(
            $artistSlugs: [String!]
            $geneSlugs: [String!]
          ) {
            artists(slugs: $artistSlugs) {
              id
              ...ArtistToolTip_artist
              ...FollowArtistButton_artist
            }
            genes(slugs: $geneSlugs) {
              id
              ...GeneToolTip_gene
              ...FollowGeneButton_gene
            }
          }
        `}
        variables={{
          artistSlugs,
          geneSlugs,
        }}
        render={readyState => {
          const data: TooltipsDataLoaderQueryResponse = {
            artists: [],
            genes: [],
          }
          Object.keys(readyState.props || {}).forEach(key => {
            const col = readyState.props[key]
            data[key] = keyBy(col, "id")
          })
          return (
            <TooltipsContextProvider {...data} currentUser={currentUser}>
              {children}
            </TooltipsContextProvider>
          )
        }}
      />
    )
  }
}

class TooltipsContextProvider extends Component<any> {
  static childContextTypes = {
    activeToolTip: PropTypes.any,
    currentUser: PropTypes.object,
    onTriggerToolTip: PropTypes.func,
    tooltipsData: PropTypes.object,
    waitForFade: PropTypes.string,
  }

  state = {
    activeToolTip: null,
    waitForFade: null,
  }

  onTriggerToolTip = activeToolTip => {
    if (activeToolTip !== this.state.activeToolTip) {
      if (activeToolTip === null) {
        setTimeout(() => {
          this.setState({ waitForFade: null })
        }, 250)
      }
      this.setState({ activeToolTip, waitForFade: this.state.activeToolTip })
    }
  }

  getChildContext() {
    const { artists, currentUser, genes } = this.props
    const { activeToolTip, waitForFade } = this.state

    return {
      activeToolTip,
      currentUser,
      onTriggerToolTip: this.onTriggerToolTip,
      tooltipsData: {
        artists,
        genes,
      },
      waitForFade,
    }
  }

  render() {
    return this.props.children
  }
}

export const TooltipsData = Artsy.ContextConsumer(TooltipsDataLoader)
