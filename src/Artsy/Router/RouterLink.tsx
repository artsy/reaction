import { trackPageView } from "Artsy/Analytics/trackPageView"
import { Link, LinkProps, LinkPropsSimple, Match, RouterContext } from "found"
import { pick } from "lodash"
import React, { useContext } from "react"
import { get } from "Utils/get"

/**
 * Wrapper component around found's <Link> component with a fallback to a normal
 * <a> tag if ouside of a routing context.
 *
 * NOTE: If using styled-components, <RouterLink> can be easily styled like so:
 *
 * const StyledLink = styled(RouterLink)`
 *   ...
 * `
 */

export const RouterLink: React.FC<LinkProps> = ({ to, children, ...props }) => {
  const context = useContext(RouterContext)
  const match: Match = context && context.match
  const routes = get(context, c => c.router.matcher.routeConfig, [])
  const isSupportedInRouter = !!get(context, c =>
    c.router.matcher.matchRoutes(routes, to)
  )

  // Only pass found-router specific props across, props that conform to the
  // link API found here: https://github.com/4Catalyzer/found#links
  const handlers = Object.keys(props).reduce((acc, prop) => {
    if (prop.startsWith("on")) {
      acc.push(prop)
    }
    return acc
  }, [])

  if (isSupportedInRouter) {
    const allowedProps = pick(props, [
      "Component",
      "activeClassName",
      "className",
      "exact",
      "replace",
      "style",
      ...handlers,
    ])

    // Wrap any provided onClick with pageview tracking
    // if the page type stays the same. When linking across apps
    // those components will get mounted with their own tracking.
    // But when linking within the same app (just different params),
    // we want to trigger a pageview.
    const handleClick = event => {
      const toPath = to.toString()
      const currentPageType = match && match.location.pathname.split("/")[1]
      const toPageType = toPath.split("/")[1]
      if (currentPageType === toPageType) {
        trackPageView({ path: toPath })
      }

      if (props.onClick) {
        props.onClick(event)
      }
    }

    return (
      <Link to={to} {...allowedProps} onClick={handleClick}>
        {children}
      </Link>
    )
  } else {
    return (
      <a
        href={to as string}
        className={(props as LinkPropsSimple).className}
        style={(props as LinkPropsSimple).style}
        {...props}
      >
        {children}
      </a>
    )
  }
}
