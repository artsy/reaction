import * as React from "react"
import * as Relay from "react-relay"
import styled from "styled-components"

import Artworks from "../artwork_grid"
import Button from "../buttons/ghost"
import FollowButton from "../follow"
import Text from "../text"

import * as fonts from "../../assets/fonts"

const PageSize = 10

interface Props extends RelayProps, React.HTMLProps<FairBooth> {
  show: any
  relay?: any,
  onContactGallery?: (showId: number) => any,
}

interface State {
  loading: boolean,
}

export class FairBooth extends React.Component<Props, State> {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  loadMoreArtworks() {
    const hasMore = this.props.show.artworks.pageInfo.hasNextPage
    if (!this.state.loading && hasMore) {
      this.setState({ loading: true }, () => {
        this.props.relay.setVariables({
          artworksSize: this.props.relay.variables.artworksSize + PageSize,
        }, readyState => {
          if (readyState.done) {
            this.setState({ loading: false })
          }
        })
      })
    }
  }

  render() {
    const { show, onContactGallery } = this.props

    const showLocation = show.location && show.location.display && (
      <LocationText textSize="small" textStyle="secondary">
        {show.location.display}
      </LocationText>
    )

    const loadMoreButton = (
      <LoadMoreContainer>
        <LoadMoreButton onClick={() => this.loadMoreArtworks()}>
          Load More
        </LoadMoreButton>
      </LoadMoreContainer>
    )

    return (
      <div>
        <Header>
          <div>
            <PartnerLine>
              <PartnerText textSize="small" textStyle="primary">
                {show.partner.name}
              </PartnerText>
              <FollowButton type="profile" profile={show.partner.profile}/>
            </PartnerLine>
            {showLocation}
          </div>
          <div>
            <Button onClick={() => onContactGallery(show.id)}>
              Contact Gallery
            </Button>
          </div>
        </Header>
        <Artworks
          artworks={show.artworks}
          columnCount={4}
          itemMargin={40}
          onLoadMore={() => this.loadMoreArtworks()}
        />
        {show.artworks && show.artworks.pageInfo.hasNextPage && !this.state.loading && loadMoreButton}
      </div>
    )
  }
}

const Header = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
`

const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoadMoreButton = styled.a`
  font-family: ${ fonts.primary.fontFamily };
  font-size: 14px;
  cursor: pointer;
  text-transform: uppercase;
  border-bottom: 2px solid transparent;
  &:hover {
    border-bottom: 2px solid black;
  }
`

const PartnerLine = styled.div`
  display: flex;
`

const PartnerText = styled(Text)`
  display: inline-block;
`

const LocationText = styled(Text)`
  display: block;
`

export default Relay.createContainer(FairBooth, {
  initialVariables: {
    artworksSize: PageSize,
  },
  fragments: {
    show: () => Relay.QL`
      fragment on Show {
        id
        name
        location {
          display
        }
        partner {
          __typename
          ... on Partner {
            name
            profile {
              is_followed
            }
          }
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
    id: string | null,
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
