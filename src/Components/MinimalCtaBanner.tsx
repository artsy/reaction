import React from "react"
import styled from "styled-components"
import { unica } from "../Assets/Fonts"
import Icon from "./Icon"

export interface MinimalCtaBannerProps extends React.Props<HTMLDivElement> {
  backgroundColor?: string
  copy?: string
  href?: string
  position: "top" | "bottom"
  textColor?: string
}

const MinimalCtaBanner: React.SFC<MinimalCtaBannerProps> = props => (
  <BannerContainer
    position={props.position}
    backgroundColor={props.backgroundColor}
  >
    <Banner href={props.href} textColor={props.textColor}>
      <p>{props.copy}</p>
      <IconContainer>
        <Icon name="chevron-right" color={props.textColor} fontSize="12px" />
      </IconContainer>
    </Banner>
  </BannerContainer>
)

const BannerContainer = styled.div.attrs<MinimalCtaBannerProps>({})`
  width: 100%;
  height: 50px;
  background-color: ${props => props.backgroundColor || "white"};
  display: flex;
  position: absolute;
  ${props => {
    if (props.position === "bottom") return "bottom: 0px;"
    if (props.position === "top") return "top: 0px;"
  }};
`

const Banner = styled.a.attrs<{ textColor: string }>({})`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: ${props => props.textColor || "black"};
  height: 100%;
  width: 100%;
  padding: 0 10px;
  ${unica("s12")};
`

const IconContainer = styled.div`
  margin-left: auto;
`

export default MinimalCtaBanner
