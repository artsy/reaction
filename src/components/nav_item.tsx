import * as React from "react"
import styled from "styled-components"
import * as fonts from "../assets/fonts"
import TextLink from "./text_link"

interface NavLinkProps extends React.HTMLProps<HTMLAnchorElement> {
  href: string
}

const StyledLink = styled.a`
  position: relative;
  align-self: center;
  font-family: ${ fonts.primary.fontFamily };
  font-size: 15px;
  line-height: 12px;
  text-decoration: none;
  color: black;
`

const NavItem: React.SFC<NavLinkProps> = props => (
  <StyledLink href={ props.href }>
    { props.children }
  </StyledLink>
)

export default NavItem
