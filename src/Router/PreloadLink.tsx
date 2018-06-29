import * as Found from "found"
import { withRouter } from "found"
import { Link } from "found"
import { compose, isEmpty, isUndefined, last, pick } from "lodash/fp"
import PropTypes from "prop-types"
import React from "react"
import { fetchQuery } from "react-relay"
import { QueryRendererProps } from "react-relay"
import { GlobalState, PreloadLinkState } from "Router/state"
import { Subscribe } from "unstated"
import { ContextConsumer } from "../Components/Artsy"
import { PreloadLinkProps } from "./types"

/**
 * PreloadLink is a wrapper around Found's (and found-relay's) <Link> component.
 * It checks to see if a relay query is attached to a given route and blocks
 * transitions until after the route has loaded.
 *
 * @example
 *
 * return (
 *   <Nav>
 *     <PreloadLink to='/'>Home</PreloadLink>
 *     <PreloadLink to='/artworks'>Artworks</PreloadLink>
 *     <PreloadLink to='/artist/pablo-picasso'>Artist</PreloadLink>
 *   </Nav>
 * )
 *
 * For UI that requires router-connected <Tabs>, can use the <RouterTabs>
 * component which wraps PreloadLink:
 *
 * @example
 *
 * return (
 *   <RouteTabs>
 *     <RouteTab to='/'>Home</RouteTab>
 *     <RouteTab to='/artworks' immediate>Loads immediately in the background</RouteTab>
 *     <RouteTab to='/artist/pablo-picasso'>Artist</RouteTab>
 *   </RouteTabs>
 * )
 */
export const PreloadLink = compose(
  withRouter,
  ContextConsumer
)(preloadLinkProps => {
  /**
   * Create a Preloader wrapper to perform relay fetches and render out a <Link>
   */
  class Preloader extends React.Component<PreloadLinkProps> {
    static propTypes = {
      /**
       * Load route query data transparently in the background on mount
       */
      immediate: PropTypes.bool,

      /**
       * Route to transition to. Uses history.pushState
       */
      to: PropTypes.string,

      /**
       * Route to transition to. Uses history.replaceState. Note that `replace`
       * and `to` are mutually exclusive.
       */
      replace: PropTypes.string,

      /**
       * Class to add when the link's to / replace route matches current URL
       */
      activeClassName: PropTypes.string,

      /**
       * State handler to toggle fetching
       */
      onToggleFetching: PropTypes.func.isRequired,

      /**
       * Injected props from ContextConsumer
       */
      system: PropTypes.shape({
        relayEnvironment: PropTypes.object.isRequired,
        routes: PropTypes.array.isRequired,
        resolver: PropTypes.object.isRequired,
      }).isRequired,
    }

    static defaultProps = {
      activeClassName: "active",
      immediate: false,
      onToggleFetching: x => x,
    }

    componentDidMount() {
      if (this.props.immediate) {
        this.fetchData()
      }
    }

    /**
     * For a given route, check to see if it has a Relay query attached.
     *
     * @example
     *
     * Given this link:
     * <PreloadLink to='/home'>Home</PreloadLink>
     *
     * Preloader will iterate over the route config and look for a match and
     * return its `query` value:
     *
     * const routes = [
     *   {
     *     path: '/home',
     *     Component: () => <div>Home!</div>
     *     query: graphql`
     *       query routes_HomeQuery {
     *         ...
     *       }
     *     `
     *   }
     * ]
     */
    getRouteQuery(): Partial<QueryRendererProps> {
      const {
        system: { resolver, relayEnvironment },
        router,
        to,
      } = this.props

      const { getRouteMatches, getRouteValues } = Found.ResolverUtils
      const location = router.createLocation(to)
      const match = router.matcher.match(location)

      // Route is missing query, just pass through
      if (!match) {
        return
      }

      const routes = router.matcher.getRoutes(match)
      const augmentedMatch = { ...match, routes }
      const routeMatches = getRouteMatches(augmentedMatch)

      const query = last(
        getRouteValues(
          routeMatches,
          route => route.getQuery,
          route => route.query
        ).filter(q => !isUndefined(q))
      )

      const cacheConfig = last(
        getRouteValues(
          routeMatches,
          route => route.getCacheConfig,
          route => route.cacheConfig
        ).filter(caches => !isUndefined(caches))
      )

      const variables = last(
        resolver
          .getRouteVariables(match, routeMatches)
          .filter(
            routeVariables =>
              !isUndefined(routeVariables) && !isEmpty(routeVariables)
          )
      )

      return {
        environment: relayEnvironment,
        query,
        cacheConfig,
        variables,
      }
    }

    fetchData() {
      return new Promise(async (resolve, reject) => {
        const {
          environment,
          query,
          variables,
          cacheConfig,
        } = this.getRouteQuery()

        const requirementsMet = environment && query

        if (!requirementsMet) {
          console.warn(
            "Attempting to use PreloadLink but relayEnvironment or " +
              "query is missing.",
            this.props
          )
          return resolve()
        }

        try {
          await fetchQuery(environment, query, variables, cacheConfig)
          resolve()

          // FIXME: Handle fetch errors
          // router.push('/404')
        } catch (error) {
          console.error("[Reaction Router/PreloadLink]", error)
        }
      })
    }

    handleClick = event => {
      event.preventDefault()
      this.props.onToggleFetching(true)

      this.fetchData().then(() => {
        const { router, replace, to } = this.props
        this.props.onToggleFetching(false)

        if (replace) {
          router.replace(replace)
        } else {
          router.push(to)
        }
      })
    }

    render() {
      // Under the hood <Link> desugars to an `<a>` tag. Ensure only whitelisted
      // props pass through to avoid React warnings.
      const whitelistedProps = pick(
        ["Component", "activeClassName", "exact", "replace", "to"],
        this.props
      )

      return (
        <Link {...whitelistedProps} onClick={this.handleClick}>
          {this.props.children}
        </Link>
      )
    }
  }

  /**
   * Subscribe to PreloadLink state
   */
  return (
    <Subscribe to={[GlobalState, PreloadLinkState]}>
      {(globalState: GlobalState, preloadLink: PreloadLinkState) => {
        return (
          <Preloader
            onToggleFetching={preloadLink.toggleFetching}
            system={globalState.state.system}
            {...preloadLinkProps}
          />
        )
      }}
    </Subscribe>
  )
})
