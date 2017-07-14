import React, { Component } from "react"
import styled from "styled-components"

import Fonts from "./fonts"
import IconImageset from "./icons/icon_imageset"

const FullWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  min-height: 50px;
  width: auto;
  max-width: calc(100% - 80px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid white;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  padding: 20px;
  `
const MiniWrapper = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 20px 10px 10px;
  border: 1px solid #e5e5e5;
`
const MiniInner = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  width: auto;
  margin-left: 20px;
`
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: ${props => (props.layout === "full" ? "100%" : "50px")};
`
const Title = styled.div`
  ${Fonts.unica("s19", "medium")}
  margin-bottom: 8px;
  line-height: 1.1em;
  `
const SubTitle = styled.div`
  display: flex;
`
const SubTitlePrompt = styled.div`
  ${Fonts.unica("s14", "medium")}
  `
const SubTitleCount = styled.div`
  ${Fonts.unica("s14")}
  margin-left: 20px;
  `
const IconContainer = styled.div`
  height: ${props => (props.layout === "full" ? "100%" : "45px")};
  position: relative;
  margin-left: 40px;
  text-align: right;
  > svg {
    height: 98%;
  }
`

class Imageset extends Component<any, any> {
  getImageUrl() {
    const image = this.props.section.images[0]
    const src = image.url ? image.url : image.image
    return src
  }
  textSection(layout) {
    if (layout === "mini") {
      return (
        <MiniWrapper>
          {this.image(layout)}
          <MiniInner>
            {this.title()}
            {this.icon()}
          </MiniInner>
        </MiniWrapper>
      )
    } else {
      return (
        <FullWrapper>
          {this.title()}
          {this.icon()}
        </FullWrapper>
      )
    }
  }
  image(layout) {
    const src = this.getImageUrl()
    const width = layout === "full" ? "100%" : "auto"
    const height = layout === "mini" ? "100%" : "auto"
    return <img src={src} width={width} height={height} />
  }
  title() {
    return (
      <TitleWrapper>
        <Title>{this.props.section.title}</Title>
        <SubTitle>
          <SubTitlePrompt>View Slideshow</SubTitlePrompt>
          <SubTitleCount>{this.props.section.images.length} Images</SubTitleCount>
        </SubTitle>
      </TitleWrapper>
    )
  }
  icon() {
    return (
      <IconContainer>
        <IconImageset />
      </IconContainer>
    )
  }
  render() {
    const { layout } = this.props.section
    const image = layout === "full" ? <img src={this.getImageUrl()} width="100%" /> : ""
    return (
      <div style={{ position: "relative" }}>
        {this.textSection(layout)}
        {image}
      </div>
    )
  }
}
export default Imageset
