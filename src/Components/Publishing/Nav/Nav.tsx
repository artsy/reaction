import { garamond } from "Assets/Fonts"
import { pMedia } from "Components/Helpers"
import { PartnerInline } from "Components/Publishing/Partner/PartnerInline"
import React from "react"
import Waypoint from "react-waypoint"
import styled from "styled-components"

interface Props extends React.HTMLProps<HTMLDivElement> {
  backgroundColor?: string
  canFix?: boolean
  color?: string
  sponsor?: any
  title?: string
  transparent?: boolean
}

interface State {
  isFixed: boolean
}

export class NavComponent extends React.Component<Props, State> {
  static defaultProps = {
    backgroundColor: "black",
    canFix: true,
    color: "white",
    transparent: false,
  }

  state = {
    isFixed: false,
  }

  setPosition = isFixed => {
    const { canFix } = this.props
    const currentPosition = this.state.isFixed

    if (canFix && isFixed !== currentPosition) {
      this.setState({ isFixed })
    }
  }

  render() {
    const {
      backgroundColor,
      color,
      sponsor,
      className,
      canFix,
      transparent,
      title,
    } = this.props
    const { isFixed } = this.state

    return (
      <div>
        <NavContainer
          backgroundColor={backgroundColor}
          className={className}
          color={color}
          isFixed={canFix && isFixed}
          transparent={!isFixed && transparent}
        >
          <PartnerInline
            url={sponsor && sponsor.partner_logo_link}
            logo={sponsor && sponsor.partner_condensed_logo}
            color={color}
            margin="0 10px"
          />
          <Title color={color}>
            {title ? title : <a href="/magazine">Artsy Editorial</a>}
          </Title>
        </NavContainer>
        <Waypoint
          onEnter={() => this.setPosition(false)}
          onLeave={() => this.setPosition(true)}
        />
      </div>
    )
  }
}

const NavContainer = styled.div<{
  backgroundColor: string
  transparent: boolean
  isFixed: boolean
}>`
  background-color: ${props =>
    props.transparent ? "transparent" : props.backgroundColor};
  border-bottom: 1px solid ${props => props.color};
  ${props =>
    props.transparent &&
    !props.isFixed &&
    `
    position: absolute;
    top: 0;
  `};

  ${props =>
    props.isFixed &&
    `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  `};
`
export const Nav = styled(NavComponent)`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 52px;
  width: 100%;
  color: ${props => props.color};
  z-index: 10;
  a {
    z-index: 10;
  }
`
const Title = styled.div<{ color: string }>`
  ${garamond("s17")};
  position: absolute;
  width: 100%;
  text-align: center;
  font-weight: 600;
  a {
    color: ${props => props.color};
    text-decoration: none;
  }
  ${pMedia.sm`
    display: none;
  `};
`
