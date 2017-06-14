import * as React from "react"
import * as Relay from "react-relay"
import styled from "styled-components"

import Artworks from "../artwork_grid"
import Button from "../buttons/ghost"
import Text from "../text"

const PageSize = 10

interface Props extends RelayProps, React.HTMLProps<FairBooth> {
  show: any
  onContactGallery?: () => any,
}

const LocationText = styled(Text)`
  display: block
`

export class FairBooth extends React.Component<Props, null> {
  render() {
    const { show, onContactGallery } = this.props

    const showLocation = show.location && show.location.display && (
      <LocationText textSize="small" textStyle="secondary">
        {show.location.display}
      </LocationText>
    )

    return (
      <div>
        <Header>
          <div>
            <Text textSize="small" textStyle="primary">
              {show.name}
            </Text>
            {showLocation}
          </div>
          <div>
            <Button onClick={() => onContactGallery()}>
              Contact Gallery
            </Button>
          </div>
        </Header>
        <Artworks
          artworks={show.artworks}
          columnCount={4}
        />
      </div>
    )
  }
}

const Header = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
`

export default Relay.createContainer(FairBooth, {
  initialVariables: {
    artworksSize: PageSize,
  },
  fragments: {
    show: () => Relay.QL`
      fragment on Show {
        name
        location {
          display
        }
        artworks: artworks_connection(first: $artworksSize) {
          pageInfo {
            hasNextPage
          }
          ${Artworks.getFragment("artworks")}
        }
      }
    `,
  },
})

interface RelayProps {
  show: {
    name: string | null,
    artworks: any,
    partner: {
      name: string | null,
      profile: {
        is_followed: boolean | null,
      } | any,
    }
    location: {
      display: string | null,
    } | any,
  } | any
}
