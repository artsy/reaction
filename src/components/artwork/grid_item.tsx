import * as React from "react"
import * as Relay from "react-relay"
import styled from "styled-components"
import colors from "../../assets/colors"
import ArtworkMetadata from "./metadata"
import SaveButton from "./save"

const Image = styled.img`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`

const Placeholder = styled.div`
  background-color: ${colors.grayMedium};
  position: relative;
  width 100%;
`

interface Props extends RelayProps, React.HTMLProps<ArtworkGridItem> {
  style?: any
}

export class ArtworkGridItem extends React.Component<Props, null> {
  render() {
    const { style, artwork } = this.props
    return (
      <div style={style}>
        <Placeholder style={{ paddingBottom:  artwork.image.placeholder }}>
          <a href={artwork.href}>
            <Image src={artwork.image.url} />
          </a>
          <SaveButton
            artwork={artwork}
            style={{position: "absolute", right: "10px", bottom: "10px"}}
          />
        </Placeholder>
      
        <ArtworkMetadata artwork={artwork} />
      </div>
    )
  }
}

export default Relay.createContainer(ArtworkGridItem, {
  fragments: {
    artwork: () => Relay.QL`
      fragment on Artwork {
        image {
          placeholder
          url(version: "large")
          aspect_ratio
        }
        href
        ${ArtworkMetadata.getFragment("artwork")}
        ${SaveButton.getFragment("artwork")}
      }
    `,
  },
})

interface RelayProps {
  artwork: {
    href: string | null,
    image: {
      placeholder: number | null,
      url: string | null,
      aspect_ratio: number | null,
    } | null,
  },
}
