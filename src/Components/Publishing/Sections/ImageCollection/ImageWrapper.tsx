import React from "react"
import ReactDOM from 'react-dom'
import styled from "styled-components"
import { pMedia } from "../../../Helpers"
import { Layout } from "../../Typings"
import { ViewFullscreen } from "./ViewFullscreen"

interface Props extends React.HTMLProps<HTMLImageElement> {
  src: string
  layout?: Layout
  width?: string | number
  height?: string | number
  alt?: string
  index?: number
}

export class ImageWrapper extends React.PureComponent<Props, any> {
  image = undefined
  mounted = false

  state = {
    isLoaded: false,
  }

  componentDidMount() {
    const img = new Image();

    /**
     * TODO: Clean this up
     * Guard against snapshot tests See: https://reactjs.org/blog/2016/11/16/react-v15.4.0.html#mocking-refs-for-snapshot-testing
     */
    try {
      const imgTag = ReactDOM.findDOMNode(this.image)
      const imgSrc = imgTag.getAttribute('src')
      img.src = imgSrc
    } catch (error) {
      img.src = ''
    } finally {
      img.onload = this.onImageLoad
      this.mounted = true
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  onImageLoad = () => {
    if (this.mounted) {
      this.setState({
        isLoaded: true
      })
    }
  }

  render() {
    const { layout, index, ...blockImageProps }: any = this.props
    let className = 'BlockImage__container'

    if (this.state.isLoaded) {
      className = className + ' image-loaded'
    }

    return (
      <StyledImageWrapper>
        <BlockImage
          className={className}
          ref={ref => this.image = ref}
          {...blockImageProps}
        />

        {layout !== 'classic' &&
          <Fullscreen>
            <ViewFullscreen index={index} />
          </Fullscreen>
        }
      </StyledImageWrapper>
    )
  }
}

const Fullscreen = styled.div`
  opacity: 0;
  transition: opacity 0.3s;
`

const StyledImageWrapper = styled.div`
  position: relative;

  &:hover {
    ${Fullscreen} {
      opacity: 1;
    }
  }

  ${pMedia.sm`
    ${Fullscreen} {
      opacity: 1;
    }
  `}

  .BlockImage__container {
    opacity: 0;
    transition: opacity 1.0s;
  }

  .image-loaded {
    opacity: 1;
  }
`

const BlockImage = styled.img`
  display: block;
`
