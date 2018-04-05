import React from "react"
import styled, { injectGlobal } from "styled-components"
import colors from "../Assets/Colors"
import Icon from "./Icon"
import { IconName } from "../Assets/Icons"

interface NavBarProps extends React.Props<HTMLDivElement> {
  height?: number
  logoLink?: string
  logoIcon?: IconName
}

const NavBar: React.SFC<NavBarProps> = props => (
  <Nav height={props.height}>
    <NavIcon href={props.logoLink}>
      <Icon name={props.logoIcon} color="black" fontSize="32px" />
    </NavIcon>
    {props.children}
  </Nav>
)

NavBar.defaultProps = {
  logoIcon: "logo",
  height: 60,
}

const NavIcon = styled.a`
  border-right: 1px solid ${colors.grayRegular};
  display: inline-block;
  font-size: 32px;
  padding-right: 10px;
  padding-left: 10px;
  margin-right: 15px;
  display: flex;
  align-items: center;
`

const Nav = styled.div`
  border-bottom: 1px solid ${colors.grayRegular};
  display: flex;
  align-items: center;
  height: ${(p: NavBarProps) => p.height}px;

  ${NavIcon} {
    height: ${(p: NavBarProps) => p.height}px;
  }
`

injectGlobal`
  body {
    margin: 0;
  }
`
export default NavBar
