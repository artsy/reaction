import React from "react"
import styled from "styled-components"
import { unica } from "../Assets/Fonts"
import SlideTransition from "./Animation/SlideTransition"
import Icon from "./Icon"

export interface MinimalCtaBannerProps extends React.Props<HTMLDivElement> {
  backgroundColor?: string
  copy?: string
  height?: string
  href?: string
  position: "top" | "bottom"
  textColor?: string
  showCtaBanner?: boolean
}

export interface State {
  showCta: boolean
}

export class MinimalCtaBanner extends React.Component<
  MinimalCtaBannerProps,
  State
> {
  state = {
    showCta: this.props.showCtaBanner,
  }

  dismissCta = () => {
    const showCta = false
    this.setState({ showCta })
  }

  render() {
    const ctaBanner = (
      <SlideTransition
        in={this.props.showCtaBanner}
        timeout={{ enter: 10, exit: 250 }}
        height={this.props.height}
      >
        <BannerContainer
          position={this.props.position}
          backgroundColor={this.props.backgroundColor}
        >
          <Banner textColor={this.props.textColor}>
            <a href={this.props.href}>
              <p>{this.props.copy}</p>
            </a>
            <IconContainer onClick={this.dismissCta as any}>
              <Icon name="close" color={this.props.textColor} fontSize="16px" />
            </IconContainer>
          </Banner>
        </BannerContainer>
      </SlideTransition>
    )

    return this.state.showCta ? ctaBanner : <div />
  }
}

const BannerContainer = styled.div.attrs<MinimalCtaBannerProps>({})`
  width: 100%;
  height: inherit;
  background-color: ${props => props.backgroundColor || "white"};
  display: flex;
  position: fixed;
  ${props => {
    if (props.position === "bottom") return "bottom: 0px;"
    if (props.position === "top") return "top: 0px;"
  }};
`

const Banner = styled.div.attrs<{ textColor: string }>({})`
  display: inline-flex;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0 10px;
  a {
    color: ${props => props.textColor || "black"};
    text-decoration: none;
    ${unica("s12")};
    margin: auto auto auto 0;
  }
`

const IconContainer = styled.div`
  margin-left: auto;
`
