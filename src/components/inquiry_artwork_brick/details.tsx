import * as React from "react"
import * as Relay from "react-relay"
import styled from "styled-components"
import colors from "../../assets/colors"
import TextLink from "../text_link"

interface DetailsProps extends RelayProps, React.HTMLProps<ArtworkDetails> {
  artwork: any
}

const DetailsContainer = styled.div`
  height: 100px;
  margin-top: 10px;
`

export class ArtworkDetails extends React.Component<DetailsProps, null> {
  artistLine() {
    const { cultural_maker, artists } = this.props.artwork

    if (cultural_maker) {
      return <div><strong>{cultural_maker}</strong></div>
    } else if (artists && artists.length) {
      const artistLine = artists
        .map(artist => <TextLink href={artist.href} key={artist.__id}>{artist.name}</TextLink>)
        .reduce((prev, curr) => [prev, ", ", curr])

      return <div><strong>{artistLine}</strong></div>
    }
  }

  titleLine() {
    return (
      <TextLink href={this.props.artwork.href}>
        <em>{this.props.artwork.title}</em>
        {this.props.artwork.date && `, ${this.props.artwork.date}`}
      </TextLink>
    )
  }

  partnerLine() {
    if (this.props.artwork.collecting_institution) {
      return <div>{this.props.artwork.collecting_institution}</div>
    } else {
      return (
        <div>
          <TextLink href={this.props.artwork.partner.href}>
            {this.props.artwork.partner.name}
          </TextLink>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.artistLine()}
        {this.titleLine()}
        {this.partnerLine()}
      </div>
    )
  }
}

export default Relay.createContainer(ArtworkDetails, {
  fragments: {
    artwork: () => Relay.QL`
      fragment on Artwork {
        href
        title
        date
        cultural_maker
        artists(shallow: true) {
          __id
          href
          name
        }
        collecting_institution
        partner(shallow: true) {
          name
          href
        }
      }
    `,
  },
})

interface RelayProps {
  artwork: {
    href: string | null,
    title: string | null,
    date: string | null,
    cultural_maker: string | null,
    artists: Array<{
      name: string | null,
    } | null> | null,
    collecting_institution: string | null,
    partner: {
      name: string | null,
    } | null,
  },
}
