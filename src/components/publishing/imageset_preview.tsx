import React, { Component } from "react"
import styled, { StyledFunction } from "styled-components"

import Fonts from "./fonts"
import IconImageSet from "./icons/icon_imageset"

interface DivLayoutProps {
  layout: string
}
const div: StyledFunction<DivLayoutProps & React.HTMLProps<HTMLDivElement>> = styled.div

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
const TitleWrapper = div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: ${props => (props.layout === "mini" ? "50px" : "100%")};
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
  height: 45px;
  position: relative;
  margin-left: 20px;
  text-align: right;
  > svg {
    height: 98%;
  }
`

interface ImageSetPreviewProps {
  section: {
    images: [
      {
        key: string
        name?: "string"
        url?: "string"
        image?: "string"
      }
    ]
    layout: "mini" | "full"
    title: "string"
  }
}
class ImageSetPreview extends Component<ImageSetPreviewProps, null> {
  getImageUrl() {
    const image = this.props.section.images[0]
    const src = image.url ? image.url : image.image
    return src
  }
  textSection() {
    if (this.props.section.layout === "mini") {
      return (
        <MiniWrapper>
          {this.image()}
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
  image() {
    const src = this.getImageUrl()
    const width = this.props.section.layout === "full" ? "100%" : "auto"
    const height = this.props.section.layout === "mini" ? "100%" : "auto"
    return <img src={src} width={width} height={height} />
  }
  title() {
    return (
      <TitleWrapper layout={this.props.section.layout}>
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
        <IconImageSet />
      </IconContainer>
    )
  }
  render() {
    const image = this.props.section.layout === "full" ? <img src={this.getImageUrl()} width="100%" /> : null
    return (
      <div style={{ position: "relative" }}>
        {this.textSection()}
        {image}
      </div>
    )
  }
}
export default ImageSetPreview
