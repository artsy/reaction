import React, { Component } from "react"
import styled from "styled-components"
import Fonts from "./fonts"

const Figcaption = styled.div`
  & > p {
    ${Fonts.unica("s14")}
    margin: 0;
    color: #999;
  }
`

const CaptionLink = styled.div`
  ${Fonts.unica("s14")}
  margin: 0;
  border-bottom: 1px solid black;
  cursor: pointer;
  display: inline-block;
`

const CaptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0 10px 0;
`

const BlockImage = styled.img`
  display: block;
`

class Image extends Component<any, null> {
  render() {
    const { image } = this.props
    return (
      <div className="article-image">
        <BlockImage src={image.url} width={"100%"} />
        <CaptionContainer>
          <Figcaption dangerouslySetInnerHTML={{ __html: image.caption }} />
          <CaptionLink>View Fullscreen</CaptionLink>
        </CaptionContainer>
      </div>
    )
  }
}

export default Image
