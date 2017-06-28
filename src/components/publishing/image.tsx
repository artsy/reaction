import React, { Component } from "react"
import styled from "styled-components"
import Font from "./font"

const Figcaption = styled.div`
  & > p {
    margin: 0;
    color: #999;
  }
`

const CaptionLink = styled.div`
  margin: 0;
  border-bottom: 1px solid black;
  cursor: pointer;
  display: inline-block;
`

const CaptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

class Image extends Component<any, null> {
  render() {
    const { image } = this.props
    return (
      <div className="article-image">
        <img src={image.url} width={"100%"} />
        <CaptionContainer>
          <Figcaption dangerouslySetInnerHTML={{ __html: image.caption }} />
          <CaptionLink><Font family="unica" size="t14">View Fullscreen</Font></CaptionLink>
        </CaptionContainer>
      </div>
    )
  }
}

export default Image
