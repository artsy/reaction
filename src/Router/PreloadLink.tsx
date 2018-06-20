import * as Found from "found"
import { isEmpty, isFunction, isUndefined, pick } from "lodash/fp"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { fetchQuery } from "react-relay"
import { ContextConsumer } from "../Components/Artsy"
import { PreloadLinkProps, PreloadLinkState } from "./types"
export { Link } from "found"

export const PreloadLink = Found.withRouter<PreloadLinkProps>(props => {
  class PreloadLink extends Component<PreloadLinkProps, PreloadLinkState> {
    static propTypes = {
      immediate: PropTypes.bool, // load route data transparently in the bg
      onToggleLoading: PropTypes.func,
      relayEnvironment: PropTypes.object.isRequired,
      reactionRouter: PropTypes.shape({
        routes: PropTypes.array.isRequired,
        resolver: PropTypes.object.isRequired,
      }).isRequired,
      replace: PropTypes.string,
      to: PropTypes.string,
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

      if (!match) {
        return
      }

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
      return new Promise(async (resolve, reject) => {
        const { relayEnvironment } = this.props
        const routeQuery = this.getRouteQuery()
        const missingEnvironmentOrQuery = !(
          relayEnvironment &&
          routeQuery &&
          routeQuery.query
        )

        if (missingEnvironmentOrQuery) {
          resolve()

          return
        }

        try {
          this.toggleLoading(true)
          const { query, cacheConfig, routeVariables } = routeQuery
          await fetchQuery(relayEnvironment, query, routeVariables, cacheConfig)
          resolve()

          // TODO: Pass this error back up
        } catch (error) {
          console.error("[Reaction Router/PreloadLink]", error)
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
      const { children } = this.props
      const { isLoading } = this.state
      const _props = pick(["to", "replace"], this.props)
      const hasRenderProp = isFunction(this.props.children)

      return (
        <Found.Link onClick={this.handleClick} {..._props}>
          {hasRenderProp ? children({ isLoading }) : children}
        </Found.Link>
      )
    }
  }

  const PreloadLinkWrapper = ContextConsumer(PreloadLink)
  return <PreloadLinkWrapper {...props} />
})
