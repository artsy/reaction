import React, { Component } from "react"
import styled from "styled-components"

import IconImageset from "./icons/icon_imageset"

import Fonts from "./fonts"

const Wrapper = styled.div`
  max-width: 580px;
  width: 100%;
  height: 150px;
  display: flex;
`
const Text = styled.div`
  ${Fonts.avantgarde("s11")}
  line-height: 1.35em;
  margin: 0;
`
const Remaining = styled.div`
  min-width: 50px;
  padding: 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #e5e5e5;
  text-align: center;
`
const IconContainer = styled.div`
  width: 32px;
  margin-bottom: 10px;
  position: relative;
`

class ImagesetPreview extends Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      visibleImages: this.getVisibleImages(this.props.images),
    }
  }

  getVisibleImages(images) {
    let widths = []
    let hidden = 0
    images.map((item, i) => {
      const adjustedWidth = 150 * item.width / item.height
      widths.push(adjustedWidth)
      const total = widths.reduce((a, b) => a + b, 0)
      const margins = widths.length * 10
      if (total + margins + 50 > 560) {
        hidden = hidden + 1
      }
    })
    return widths.length - hidden
  }

  renderImages(images) {
    const items = images.slice(0, 4).map((item, i) => {
      const src = item.image ? item.image : item.url
      if (i < this.state.visibleImages) {
        return (
          <img
            key={"imageset-" + i}
            src={src || ""}
            height="150"
            className="imageset-preview__image"
            style={{ marginRight: 10 }}
          />
        )
      }
    }, this)
    return items
  }

  render() {
    const { images } = this.props
    const length = {
      position: "absolute",
      left: 8,
      top: 14,
    }
    if (images.length > 9) {
      length.left = 4
    }

    return (
      <Wrapper className="imageset-preview">
        <div className="imageset-preview__container" style={{ display: "flex" }}>
          {this.renderImages(images)}
        </div>
        <Remaining className="imageset-preview__remaining">
          <IconContainer className="imageset-preview__icon-container">
            <IconImageset />
            <div className="imageset-preview__length" style={length}>
              <Text>{images.length}</Text>
            </div>
          </IconContainer>
          <Text className="imageset-preview__text">Enter Slideshow</Text>
        </Remaining>
      </Wrapper>
    )
  }
}
export default ImagesetPreview
