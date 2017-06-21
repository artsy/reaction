import * as React from "react"
import * as Relay from "react-relay"
import styled from "styled-components"

import Artworks from "../artwork_grid"
import Button from "../buttons/ghost"
import FollowButton from "../follow"
import Spinner from "../spinner"
import Text from "../text"

import * as fonts from "../../assets/fonts"

const PageSize = 8

interface Props extends RelayProps, React.HTMLProps<FairBooth> {
  relay?: any
  onContactGallery?: (showId: string) => any
}

interface State {
  loading: boolean
}

export class FairBooth extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
    this.loadMoreArtworks = this.loadMoreArtworks.bind(this)
  }

  loadMoreArtworks() {
    const hasMore = this.props.show.artworks.pageInfo.hasNextPage
    if (!this.state.loading && hasMore) {
      this.setState({ loading: true }, () => {
        this.props.relay.setVariables(
          {
            artworksSize: this.props.relay.variables.artworksSize + PageSize,
          },
          readyState => {
            if (readyState.done) {
              this.setState({ loading: false })
            }
          }
        )
      })
    }
  }

  render() {
    const { show, onContactGallery, relay } = this.props
    const { artworks } = show
    const { loading } = this.state

    const showLocation =
      show.location &&
      show.location.display &&
      <LocationText textSize="small" textStyle="secondary">
        {show.location.display}
      </LocationText>

    const artworksLeft = show.counts.artworks - relay.variables.artworksSize

    const showLoadMore = artworks && artworks.pageInfo.hasNextPage
    const loadMoreContent = loading
      ? <Spinner />
      : <LoadMoreButton onClick={this.loadMoreArtworks}>
          See {artworksLeft} more artworks
        </LoadMoreButton>
    const loadMore =
      showLoadMore &&
      <LoadMoreContainer>
        {loadMoreContent}
      </LoadMoreContainer>

    return (
      <div>
        <Header>
          <div>
            <PartnerLine>
              <PartnerText textSize="small" textStyle="primary">
                {show.partner.name}
              </PartnerText>
              <FollowButton type="profile" artist={null} profile={show.partner.profile} />
            </PartnerLine>
            {showLocation}
          </div>
          <div>
            <Button onClick={() => onContactGallery(show.id)}>
              Contact Gallery
            </Button>
          </div>
        </Header>
        <Artworks artworks={show.artworks} columnCount={4} itemMargin={40} />
        {loadMore}
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
  margin: 40px 0;
  position: relative;
  height: 200px;
`

const LoadMoreButton = styled.a`
  font-family: ${fonts.primary.fontFamily};
  font-size: 14px;
  cursor: pointer;
  text-transform: uppercase;
  border-bottom: 2px solid black;
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
        __id
        name
        location {
          display
        }
        counts {
          artworks
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
  show:
    | {
        __id: string | null
        name: string | null
        artworks: any
        partner: {
          name: string | null
          profile:
            | {
                is_followed: boolean | null
              }
            | any
        }
        location:
          | {
              display: string | null
            }
          | any
      }
    | any
}
