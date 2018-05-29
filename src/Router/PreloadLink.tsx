import PropTypes from "prop-types"
import React, { Component } from "react"
import { ContextProps, ContextConsumer } from "../Components/Artsy"
import * as Found from "found"
import { fetchQuery } from "react-relay"
import { isEmpty, isUndefined, pick } from "lodash/fp"
export { Link } from "found"

interface Props extends ContextProps, Found.WithRouter {
  onToggleLoading: (isLoading: boolean) => void
  immediate?: boolean
  replace?: string
  to?: string
}

interface State {
  isLoading: boolean
}

export const PreloadLink = Found.withRouter<Props>(props => {
  class PreloadLink extends Component<Props, State> {
    static propTypes = {
      immediate: PropTypes.bool, // load route data transparently in the bg
      relayEnvironment: PropTypes.object.isRequired,
      reactionRouter: PropTypes.shape({
        routeConfig: PropTypes.array.isRequired,
        resolver: PropTypes.object.isRequired,
      }).isRequired,
    }

    static defaultProps = {
      immediate: false,
      onToggleLoading: x => x,
    }

    state = {
      isLoading: false,
    }

    componentDidMount() {
      if (this.props.immediate) {
        this.fetchData()
      }
    }

    toggleLoading(isLoading) {
      this.props.onToggleLoading(isLoading)

      this.setState({
        isLoading,
      })
    }

    getRouteQuery() {
      const {
        reactionRouter: { resolver },
        router,
        to,
      } = this.props

      const { getRouteMatches, getRouteValues } = Found.ResolverUtils
      const location = router.createLocation(to)
      const match = router.matcher.match(location)
      const routes = router.matcher.getRoutes(match)
      const augmentedMatch = { ...match, routes }
      const routeMatches = getRouteMatches(augmentedMatch)

      const query = getRouteValues(
        routeMatches,
        route => route.getQuery,
        route => route.query
      ).find(q => !isUndefined(q))

      const cacheConfig = getRouteValues(
        routeMatches,
        route => route.getCacheConfig,
        route => route.cacheConfig
      ).find(caches => !isUndefined(caches))

      const routeVariables = resolver
        .getRouteVariables(match, routeMatches)
        .find(variables => !isUndefined(variables) && !isEmpty(variables))

      return {
        query,
        cacheConfig,
        routeVariables,
      }
    }

    fetchData() {
      const { query, cacheConfig, routeVariables } = this.getRouteQuery()
      const { relayEnvironment } = this.props

      return new Promise(async (resolve, reject) => {
        const missingEnvironmentOrQuery = !(relayEnvironment && query)

        if (missingEnvironmentOrQuery) {
          return resolve()
        }

        // Prime the store cache
        try {
          this.toggleLoading(true)
          await fetchQuery(relayEnvironment, query, routeVariables, cacheConfig)
          resolve()

          // TODO: Pass this error back up
        } catch (error) {
          console.error("[Reaction Router/PreloadLink]", error)

          // TODO: pass to toggle which calls callback
        } finally {
          this.toggleLoading(false)
        }
      })
    }

    handleClick = event => {
      event.preventDefault()

      this.fetchData().then(() => {
        const { router, replace, to } = this.props

        if (replace) {
          router.replace(replace)
        } else {
          router.push(to)
        }
      })
    }

    render() {
      const _props = pick(["to", "replace"], this.props)

      return (
        <Found.Link onClick={this.handleClick} {..._props}>
          {this.props.children}
          {this.state.isLoading ? " [loading...]" : null}
        </Found.Link>
      )
    }
  }

  const PreloadLinkWrapper = ContextConsumer(PreloadLink)
  return <PreloadLinkWrapper {...props} />
})
