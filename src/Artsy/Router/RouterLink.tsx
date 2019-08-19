import { Link, LinkProps } from "found"
import PropTypes from "prop-types"
import React from "react"

/**
 * Wrapper component around found's <Link> component with a fallback to a normal
 * <a> tag if ouside of a routing context.
 *
 * NOTE: that if using styled-components, <RouterLink> can be easily styled
 * like so:
 *
 * const StyledLink = styled(RouterLink)`
 *   ...
 * `
 */

export const RouterLink: React.FC<LinkProps> = (
  { to, className, children, ...props },
  context
) => {
  const isRouterContext = Boolean(context.router)

  if (isRouterContext) {
    return (
      <Link to={to} className={className} {...props}>
        {children}
      </Link>
    )
  } else {
    return (
      <a href={to as string} className={className} {...props}>
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
