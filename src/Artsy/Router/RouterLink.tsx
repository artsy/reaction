import { Link, LinkProps, LinkPropsSimple } from "found"
import { pick } from "lodash"
import PropTypes from "prop-types"
import React from "react"

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

export const RouterLink: React.FC<LinkProps> = (
  { to, children, ...props },
  context
) => {
  const isRouterContext = Boolean(context.router)

  // Only pass found-router specific props across, props that conform to the
  // link API found here: https://github.com/4Catalyzer/found#links
  const handlers = Object.keys(props).reduce((acc, prop) => {
    if (prop.startsWith("on")) {
      acc.push(prop)
    }
    return acc
  }, [])

  if (isRouterContext) {
    const allowedProps = pick(props, [
      "Component",
      "activeClassName",
      "className",
      "exact",
      "replace",
      "style",
      ...handlers,
    ])

    return (
      <Link to={to} {...allowedProps}>
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

/**
 * FIXME: Upgrade to Found v.4: https://github.com/4Catalyzer/found/releases/tag/v0.4.0,
 * which supports React 14.3 context style.
 */
RouterLink.contextTypes = {
  router: PropTypes.any,
}
