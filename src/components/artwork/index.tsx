import * as React from "react"
import * as Relay from "react-relay"
import styled from "styled-components"
import ArtworkMetadata from './metadata'

const Image = styled.img`
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
        id
        image {
          url(version: "large")
          aspect_ratio
        }
       ${ArtworkMetadata.getFragment("artwork")}
      }
    `
  },
})

interface RelayProps {
  artwork: {
    id: string | null
    title: string | null,
    date: string | null,
    sale_message: string | null,
    is_in_auction: boolean | null,
    image: {
      url: string | null,
      aspect_ratio: number | null,
    } | null,
    artists: Array<{
      name: string | null,
    } | null> | null,
    partner: {
      name: string | null,
    } | null,
    href: string | null,
  }
}
