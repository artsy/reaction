import * as React from "react"
import * as Relay from "react-relay"
import styled from "styled-components"
import ArtworkMetadata from "./metadata"

const Image = styled.img`
  max-height: 450px;
  width: 100%;
`

export class Artwork extends React.Component<RelayProps, null> {
  render() {
    return (
      <div>
        <Image src={this.props.artwork.image.url} />
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
      url: string | null,
      aspect_ratio: number | null,
    } | null,
  },
}
