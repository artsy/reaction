import { Serif } from "@artsy/palette"
import { PartnerInline } from "Components/Publishing/Partner/PartnerInline"
import React from "react"
import Waypoint from "react-waypoint"
import styled from "styled-components"
import { Media } from "Utils/Responsive"

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
          <Media greaterThan="xs">
            <Title size="5" color={color} weight="semibold" textAlign="center">
              {title ? title : <a href="/magazine">Artsy Editorial</a>}
            </Title>
          </Media>
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
const Title = styled(Serif)<{ color: string }>`
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  display: flex;
  justify-content: center;
  color: ${props => props.color};

  a {
    color: ${props => props.color};
    text-decoration: none;
  }
`
