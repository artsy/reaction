import * as React from "react"
import * as Relay from "react-relay"
import styled from "styled-components"
import colors from "../../assets/colors"
import ArtworkMetadata from "./metadata"

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

interface Props extends RelayProps, React.HTMLProps<Artwork> {
  style?: any
}

export class Artwork extends React.Component<Props, null> {
  render() {
    return (
      <div style={this.props.style}>
        <Placeholder style={{ paddingBottom: this.props.artwork.image.placeholder }}>
          <Image src={this.props.artwork.image.url} />
        </Placeholder>
        <ArtworkMetadata artwork={this.props.artwork} />
      </div>
    )
  }
}

export default Relay.createContainer(Artwork, {
  fragments: {
    artwork: () => Relay.QL`
      fragment on Artwork {
        image {
          placeholder
          url(version: "large")
          aspect_ratio
        }
       ${ArtworkMetadata.getFragment("artwork")}
      }
    `,
  },
})

interface RelayProps {
  artwork: {
    image: {
      placeholder: string | null,
      url: string | null,
      aspect_ratio: number | null,
    } | null,
  },
}
