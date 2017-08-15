import { compact, flatten, map } from "lodash"
import * as React from "react"
import styled from "styled-components"
import IconNames from "../../../assets/icons"

interface FullscreenViewerProps extends React.HTMLProps<HTMLDivElement> {
  sections: any
}

interface FullscreenViewerState {
  open: boolean
  activeIndex: number
}

class FullscreenViewer extends React.Component<FullscreenViewerProps, FullscreenViewerState> {
  constructor(props) {
    super(props)
  }

  renderImages = () => {
    const images = this.getImages()
    console.log(images)
    return map(images, (image, i) => {
      const src = image.src || image.image
      console.log(src)
      return <img href={src} key={i} />
    })
  }

  getImages = () => {
    return compact(flatten(map(this.props.sections, "images")))
  }

  close = () => {
    console.log("closing")
  }

  render() {
    return (
      <FullscreenViewerContainer>
        {this.renderImages()}
        <Close onClick={this.close} />
      </FullscreenViewerContainer>
    )
  }
}

const FullscreenViewerContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`
const Close = styled.div`
  width: 24px;
  height: 24px;
  content: ${IconNames.close};
`

export default FullscreenViewer
