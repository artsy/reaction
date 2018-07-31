import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import styled from "styled-components"
import { Responsive } from "Utils/Responsive"
import colors from "../../Assets/Colors"
import RelayMetadata, { Metadata } from "./Metadata"
import RelaySaveButton, { SaveButton } from "./Save"

const Image = styled.img`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`

const Placeholder = styled.div`
  background-color: ${colors.grayMedium};
  position: relative;
  width: 100%;
`

interface Props extends RelayProps, React.HTMLProps<ArtworkGridItemContainer> {
  useRelay?: boolean
  style?: any
  currentUser?: any
  mediator?: {
    trigger: (action: string, config: object) => void
  }
}

interface State {
  width: number
  height: number
}

const IMAGE_QUALITY = 80

class ArtworkGridItemContainer extends React.Component<Props, State> {
  static defaultProps = {
    useRelay: true,
  }

  private image: HTMLImageElement = null

  state = {
    width: 0,
    height: 0,
  }

  componentDidMount() {
    const scale = window.devicePixelRatio
    const width = this.image.width * scale
    const height =
      (this.image.width / this.props.artwork.image.aspect_ratio) * scale

    this.setState({
      width,
      height,
    })
  }

  get imageURL() {
    const imageURL = this.props.artwork.image.url
    if (imageURL) {
      // Either scale or crop, based on if an aspect ratio is available.
      const type = this.props.artwork.image.aspect_ratio ? "fit" : "fill"
      const width = String(this.state.width)
      const height = String(this.state.height)
      // tslint:disable-next-line:max-line-length
      return `${
        sd.GEMINI_CLOUDFRONT_URL
      }/?resize_to=${type}&width=${width}&height=${height}&quality=${IMAGE_QUALITY}&src=${encodeURIComponent(
        imageURL
      )}`
    } else {
      return null
    }
  }

  render() {
    const { style, className, artwork, useRelay, currentUser } = this.props
    const SaveButtonBlock = useRelay ? RelaySaveButton : SaveButton
    const MetadataBlock = useRelay ? RelayMetadata : Metadata

    let currentUserSpread = {}
    if (currentUser) {
      currentUserSpread = { currentUser }
    }
    return (
      <div className={className} style={style}>
        <Placeholder style={{ paddingBottom: artwork.image.placeholder }}>
          <a href={artwork.href}>
            <Image src={this.imageURL} innerRef={img => (this.image = img)} />
          </a>
          <Responsive>
            {({ hover }) =>
              hover && (
                <SaveButtonBlock
                  className="artwork-save"
                  artwork={artwork as any}
                  style={{
                    position: "absolute",
                    right: "10px",
                    bottom: "10px",
                  }}
                  useRelay={useRelay}
                  {...currentUserSpread}
                  mediator={this.props.mediator}
                />
              )
            }
          </Responsive>
        </Placeholder>
        <MetadataBlock artwork={artwork} useRelay={useRelay} />
      </div>
    )
  }
}

export const ArtworkGridItem = styled(ArtworkGridItemContainer)`
  .artwork-save {
    opacity: 0;
  }
  &:hover .artwork-save {
    opacity: 1;
  }
`

export default createFragmentContainer(
  ArtworkGridItem,
  graphql`
    fragment GridItem_artwork on Artwork {
      image {
        placeholder
        url(version: "large")
        aspect_ratio
      }
      href
      ...Metadata_artwork
      ...Save_artwork
    }
  `
)

interface RelayProps {
  artwork: {
    href: string | null
    image: {
      placeholder: number | null
      url: string | null
      aspect_ratio: number | null
    } | null
  }
}
