import { Link, LinkProps } from "found"
import React from "react"

/**
 * Wrapper component around found's <Link> component that can be easily styled
 * via styled-components; e.g.,
 *
 * const StyledLink = styled(RouterLink)`
 *   ...
 * `
 */
export const RouterLink: React.FC<LinkProps> = ({
  to,
  className,
  children,
  ...props
}) => {
  return (
    <Link to={to} className={className} {...props}>
      {children}
    </Link>
  )
}
