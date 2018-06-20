import { garamond } from "Assets/Fonts"
import React from "react"
import Waypoint from "react-waypoint"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../Helpers"
import { PartnerInline } from "../Partner/PartnerInline"

interface Props extends React.HTMLProps<HTMLDivElement> {
  canFix?: boolean
  sponsor?: any
  title?: string
  transparent?: boolean
}

interface State {
  isFixed: boolean
}

interface DivProps {
  transparent: boolean
  isFixed: boolean
}

export class NavComponent extends React.Component<Props, State> {
  static defaultProps = {
    canFix: true,
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
    const { sponsor, className, canFix, transparent, title } = this.props
    const { isFixed } = this.state

    return (
      <div>
        <NavContainer
          transparent={!isFixed && transparent}
          className={className}
          isFixed={canFix && isFixed}
        >
          <PartnerInline
            url={sponsor && sponsor.partner_logo_link}
            logo={sponsor && sponsor.partner_condensed_logo}
            color="white"
            margin="0 10px"
          />
          <Title>
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

const Div: StyledFunction<DivProps & React.HTMLProps<HTMLDivElement>> =
  styled.div

const NavContainer = Div`
  background-color: ${props => (props.transparent ? "transparent" : "black")};
  border-bottom: 1px solid white;
  ${props =>
    props.transparent &&
    !props.isFixed &&
    `
    position: absolute;
    top: 0;
  `}
  ${props =>
    props.isFixed &&
    `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  `}
`
export const Nav = styled(NavComponent)`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 52px;
  width: 100%;
  color: white;
  z-index: 10;
  a {
    z-index: 10;
  }
`
const Title = styled.div`
  ${garamond("s17")};
  position: absolute;
  width: 100%;
  text-align: center;
  font-weight: 600;
  a {
    color: white;
    text-decoration: none;
  }
  ${pMedia.sm`
    display: none;
  `};
`
