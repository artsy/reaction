import { ContextConsumer, ContextProps, withContext } from "Artsy/SystemContext"
import { Link } from "found"
import { withRouter } from "found"
import { ResolverUtils, Router, WithRouter } from "found"
import { isEmpty, isUndefined, last, pick } from "lodash/fp"
import PropTypes from "prop-types"
import React from "react"
import { fetchQuery } from "react-relay"
import { QueryRendererProps } from "react-relay"
import { SizeProps } from "styled-system"
import { Container, Subscribe } from "unstated"

export interface PreloadLinkProps extends ContextProps, WithRouter, SizeProps {
  children?: JSX.Element | string
  exact?: boolean
  immediate?: boolean
  onClick?: () => void
  onToggleLoading?: (isLoading: boolean) => void
  replace?: string
  router: Router
  to?: string
}

export interface PreloadLinkContainer {
  isLoading: boolean
}

export class PreloadLinkState extends Container<PreloadLinkContainer> {
  state = {
    isLoading: false,
  }

  toggleLoading = isLoading => {
    this.setState({
      isLoading,
    })
  }
}

const _PreloadLink: React.SFC<PreloadLinkProps> = preloadLinkProps => {
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
      relayEnvironment: PropTypes.object.isRequired,
      routes: PropTypes.array.isRequired,
      resolver: PropTypes.object.isRequired,
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
     *     query: ...
     *   }
     * ]
     */
    getRouteQuery(): Partial<QueryRendererProps> {
      const { resolver, relayEnvironment, router, to } = this.props
      const { getRouteMatches, getRouteValues } = ResolverUtils
      const location = router.createLocation(to)
      const match = router.matcher.match(location)

      // Route is missing query, just pass through
      if (!match) {
        return
      }

      const routes = router.matcher.getRoutes(match)
      const augmentedMatch = { ...match, routes }
      const routeMatches = getRouteMatches(augmentedMatch)

      // FIXME: This should result in a GraphQLTaggedNode type
      const query: any = last(
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
        const routeQuery = this.getRouteQuery()
        const requirementsMet =
          routeQuery && routeQuery.environment && routeQuery.query

        if (!requirementsMet) {
          console.warn(
            "Attempting to use PreloadLink but relayEnvironment or " +
              "query is missing.",
            this.props
          )
          return resolve()
        }

        const { environment, query, variables, cacheConfig } = routeQuery

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

      if (this.props.onClick) {
        this.props.onClick()
      }

      this.props.onToggleLoading(true)
      this.fetchData().then(() => {
        const { router, replace, to } = this.props
        this.props.onToggleLoading(false)

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
      //
      // FIXME: Not really clear if these indeed should all be passed through
      //        and not all of them are in the public props either.
      const whitelistedProps: any = pick(
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
    <ContextConsumer>
      {context => {
        return (
          <Subscribe to={[PreloadLinkState]}>
            {(preloadLink: PreloadLinkState) => {
              return (
                <Preloader
                  onToggleLoading={preloadLink.toggleLoading}
                  {...context}
                  {...preloadLinkProps}
                />
              )
            }}
          </Subscribe>
        )
      }}
    </ContextConsumer>
  )
}

export const PreloadLink = withRouter(withContext(_PreloadLink))
