import React, { Component } from "react"
import styled from "styled-components"
import { resize } from "../../../utils/resizer"
import Fonts from "../fonts"
import IconImageSet from "../icon/image_set"

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
const container = 560
const containerHeight = 150
const iconContainer = 50
const margin = 10

class ImageSetPreviewClassic extends Component<any, any> {
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
      const adjustedWidth = containerHeight * item.width / item.height
      widths.push(adjustedWidth)
      const total = widths.reduce((a, b) => a + b, 0)
      const margins = widths.length * margin
      if (total + margins + iconContainer > container) {
        hidden = hidden + 1
      }
    })
    return widths.length - hidden
  }

  renderImages(images) {
    const items = images.slice(0, 4).map((item, i) => {
      const src = resize(item.image || item.url || "", { width: 500 })
      const alt = item.caption ? item.caption.replace(/<[^>]*>/g, "") : item.title || ""
      if (i < this.state.visibleImages) {
        return (
          <img
            key={"imageset-" + i}
            src={src}
            height={containerHeight}
            className="imageset-preview__image"
            style={{ marginRight: margin }}
            alt={alt}
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
            <IconImageSet />
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
export default ImageSetPreviewClassic
