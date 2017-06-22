import * as React from "react"
import styled from "styled-components"
import * as fonts from "../assets/fonts"

interface NavLinkProps extends React.HTMLProps<HTMLAnchorElement> {
  href: string
}

const StyledLink = styled.a`
  align-self: center;
  font-family: ${fonts.primary.fontFamily};
  font-size: 14px;
  line-height: 12px;
  text-decoration: none;
  color: black;
  text-transform: uppercase;
  -webkit-font-smoothing: antialiased;
  letter-spacing: 0.8;
`

const NavItem: React.SFC<NavLinkProps> = props =>
  <StyledLink href={props.href}>
    {props.children}
  </StyledLink>

export default NavItem
