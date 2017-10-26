import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay/compat"
import styled, { StyledFunction } from "styled-components"

import { fadeIn, fadeOut } from "../../../../Assets/Animations"
import * as fonts from "../../../../Assets/Fonts"

import Icon from "../../../Icon"

import UpdateArtistFollowMutation from "./Mutations/UpdateArtistFollow"

const anchor: StyledFunction<State & React.HTMLProps<HTMLInputElement>> = styled.a
const Link = anchor`
  display: flex;
  font-size: 14px;
  color: black;
  text-decoration: none;
  text-transform: uppercase;
  font-family: ${fonts.primary.fontFamily};
  border-top: 1px solid #e5e5e5;
  &:hover {
    background-color: #f8f8f8;
  }
  ${props => (props.fadeIn ? fadeIn : null)}
  ${props => (props.fadeOut ? fadeOut : null)}
`

const Avatar = styled.img`
  padding: 10px 15px 10px 10px;
`

const FullWidthCol = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

const Col = styled.div`
  display: flex;
  align-items: center;
`

export interface State {
  fadeIn: boolean
  fadeOut: boolean
  artist_id: string
}

type Props = React.HTMLProps<HTMLAnchorElement> & RelayProps

class ItemLink extends React.Component<Props, State> {
  state = {
    fadeIn: false,
    fadeOut: false,
    artist_id: this.props.artist.id,
  }

  followArtist() {
    // const mutation = new UpdateArtistFollowMutation(this.state)

    // Relay.Store.commitUpdate(mutation, {
    //   onFailure: this.followArtistFailed,
    //   onSuccess: response => {
    //     // do something
    //   },
    // })
    console.log("follow artist!")
  }

  followArtistFailed() {
    null
  }

  onClick() {
    this.followArtist()
  }

  render() {
    return (
      <Link
        onClick={this.onClick.bind(this)}
        fadeIn={this.state.fadeIn}
        fadeOut={this.state.fadeOut}
        artist_id={this.props.artist.id}
      >
        <Col>
          {<Avatar src={this.props.artist.image ? this.props.artist.image.cropped.url : ""} width={50} height={50} />}
        </Col>
        <FullWidthCol>{this.props.artist.name}</FullWidthCol>
        <Col>
          <Icon name="follow-circle" color="black" fontSize="39px" />
        </Col>
      </Link>
    )
  }
}

export default createFragmentContainer(
  ItemLink,
  graphql`
    fragment ItemLink_artist on Artist {
      id
      name
      image {
        cropped(width: 100, height: 100) {
          url
        }
      }
    }
  `
)

export interface RelayProps {
  artist: {
    id: string | null
    name: string | null
    image: {
      cropped: {
        url: string | null
      } | null
    } | null
  }
}
