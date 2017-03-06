import * as React from "react"
import styled from "styled-components"
import * as fonts from "../assets/fonts"
import TextLink from "./text_link"

interface NavLinkProps extends React.HTMLProps<JSX.Element> {
  href: string
}

const StyledLink = styled(TextLink)`
  position: relative;
  align-self: center;
  font-family: ${ fonts.primary.fontFamily };
`

const NavItem: React.SFC<NavLinkProps> = props => (
  <StyledLink href={ props.href } >{ props.children }</StyledLink>
)

export default NavItem
