import React, { Component } from "react"
import IconImageset from "./icons/icon_imageset"

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
      if ((total + margins + 50) > 560) {
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
            className="imageset-preview__image"
            style={styles.image} />
        )
      }
    }, this)
    return items
  }

  render() {
    const { images } = this.props

    if (images.length > 9) {
      styles.length.left = 4
    }

    return (
      <div className="imageset-preview" style={styles.imageset}>
        <div className="imageset-preview__container" style={styles.container}>
          {this.renderImages(images)}
        </div>
        <div className="imageset-preview__remaining" style={styles.remaining}>
          <div className="imageset-preview__icon" style={styles.icon} >
            <IconImageset />
            <span className="length" style={styles.length}>{images.length}</span>
          </div>
          <div className="imageset-preview__text">Enter Slideshow</div>
        </div>
      </div>
    )
  }
}

export default ImagesetPreview

const styles = {
  imageset: {
    maxWidth: 580,
    width: "100%",
    display: "flex",
  },
  container: {
    display: "flex",
  },
  image: {
    height: 150,
    width: "auto",
    marginRight: 10,
  },
  remaining: {
    height: 130,
    minWidth: 50,
    padding: 10,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    border: "1px solid #e5e5e5",
    fontSize: 11,
    lineHeight: 1.33,
    letterSpacing: 1,
    textTransform: "uppercase",
    fontFamily: `
      'ITC Avant Garde Gothic W04',
      'AvantGardeGothicITCW01D 731075',
      'AvantGardeGothicITCW01Dm',
      'Helvetica', 
      'sans-serif'
    `,
  },
  icon: {
    width: 32,
    marginBottom: 10,
    position: "relative",
  },
  length: {
    position: "absolute",
    left: 8,
    top: 13,
  },
}
