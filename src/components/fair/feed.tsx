import * as React from "react"
import * as ReactDOM from "react-dom"
import * as Relay from "react-relay"

import styled from "styled-components"
import colors from "../../assets/colors"

import Spinner from "../spinner"
import Booth from "./booth"

const PageSize = 4

interface Props extends RelayProps, React.HTMLProps<ShowsFeed> {
  relay?: any
  section?: string
  sort?: string
  onContactGallery?: (showId: string) => any
}

interface State {
  interval?: any
  loading: boolean
}

export class ShowsFeed extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      interval: null,
      loading: false,
    }
  }

  componentDidMount() {
    const interval = setInterval(() => {
      this.maybeLoadMore()
    }, 150)
    this.setState({ interval })
  }

  componentWillUnmount() {
    if (this.state.interval) {
      clearInterval(this.state.interval)
    }
  }

  maybeLoadMore() {
    const threshold = window.innerHeight + window.scrollY
    const el = ReactDOM.findDOMNode(this)
    if (threshold >= el.clientHeight + el.scrollTop) {
      this.loadMoreShows()
    }
  }

  loadMoreShows() {
    const hasMore = this.props.fair.shows.pageInfo.hasNextPage
    if (!this.state.loading && hasMore) {
      this.setState({ loading: true }, () => {
        this.props.relay.setVariables(
          {
            showsSize: this.props.relay.variables.showsSize + PageSize,
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
    const { fair } = this.props

    const shows = fair.shows.edges.map(show => {
      return (
        <BoothContainer>
          <Booth show={show.node} key={show.node.__id} />
        </BoothContainer>
      )
    })

    const spinner =
      this.state.loading &&
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>

    return (
      <div>
        {shows}
        {spinner}
      </div>
    )
  }
}

const BoothContainer = styled.div`
  border-top: 1px solid ${colors.gray};
  margin: 10px 0;
  padding: 20px 0;
`

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
`

export default Relay.createContainer(ShowsFeed, {
  initialVariables: {
    showsSize: PageSize,
  },
  fragments: {
    fair: () => Relay.QL`
      fragment on Fair {
        shows: shows_connection(first: $showsSize, sort: FEATURED_DESC) {
          pageInfo {
            hasNextPage
          }
          edges {
            node {
              __id
              ${Booth.getFragment("show")}
            }
          }
        }
      }
    `,
  },
})

interface RelayProps {
  fair:
    | {
        shows:
          | {
              pageInfo: {
                hasNextPage: boolean
              }
            }
          | any
      }
    | any
}
