import * as React from "react"
import * as Relay from "react-relay"
import styled from "styled-components"

const Image = styled.img`
  width: 100%;
`

export class Artwork extends React.Component<RelayProps, null> {
  render() {
    return (
      <div>
        <Image src={this.props.artwork.image.url} />
        <p>{this.props.artwork.title}</p>
      </div>
    )
  }
}

export default Relay.createContainer(Artwork, {
  fragments: {
    artwork: () => Relay.QL`
      fragment on Artwork {
        title
        date
        sale_message
        is_in_auction
        image {
          url(version: "large")
          aspect_ratio
        }
        artists {
          name
        }
        partner {
          name
        }
        href
      }
    `
  },
})

interface RelayProps {
  artwork: {
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
  },
}
