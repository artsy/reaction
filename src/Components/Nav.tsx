import React from "react"
import styled, { injectGlobal } from "styled-components"
import colors from "../Assets/Colors"
import Icon from "./Icon"

const navHeight = "70px"

const Nav = styled.div`
  border-bottom: 1px solid ${colors.grayRegular};
  display: flex;
  height: ${navHeight};
  align-content: center;
`

const NavIcon = styled.a`
  display: inline-block;
  font-size: 32px;
  padding: 15px 0px 15px 22px;
  margin-right: 10px;
  flex: 0;
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
      <Icon name="logotype" color="black" fontSize="40px" />
    </NavIcon>
    {props.children}
  </Nav>
)

export default NavBar
