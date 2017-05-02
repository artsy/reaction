import * as React from "react"
import styled, { injectGlobal } from "styled-components"
import colors from "../assets/colors"
import Icon from "./icon"

const Nav = styled.div`
  border-bottom: 1px solid ${ colors.grayRegular };
  display: flex;
`

const NavIcon = styled.a`
  border-right: 1px solid ${ colors.grayRegular };
  display: inline-block;
  font-size: 32px;
  padding: 10px 5px;
  margin-right: 10px;
`

injectGlobal`
  body {
    margin: 0;
  }
`

interface NavBarProps extends React.Props<HTMLDivElement> {
  logoLink?: string
}

const NavBar: React.SFC<NavBarProps> = props => (
  <Nav>
    <NavIcon href={props.logoLink}>
      <Icon name="logo" color="black" fontSize="32px" />
    </NavIcon>
    {props.children}
  </Nav>
)

export default NavBar
