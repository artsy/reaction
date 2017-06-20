import * as React from "react"
import * as Relay from "react-relay"

import Booth from "./booth"

const PageSize = 4

interface Props extends RelayProps, React.HTMLProps<ShowsFeed> {
  section?: string,
  sort?: string,
  onContactGallery?: (showId: number) => any,
}

export class ShowsFeed extends React.Component<Props, null> {
  render() {
    const { fair } = this.props

    const shows = fair.shows.edges.map(show => {
      return (
        <Booth show={show.node} key={show.cursor}/>
      )
    })

    return (
      <div className={this.props.className}>
        {shows}
      </div>
    )
  }
}

export default Relay.createContainer(ShowsFeed, {
  initialVariables: {
    showSize: PageSize,
  },
  fragments: {
    fair: () => Relay.QL`
      fragment on Fair {
        id
        shows: shows_connection(first: $showSize) {
          pageInfo {
            hasNextPage
          }
          edges {
            id: cursor
            node {
              id
              ${Booth.getFragment("show")}
            }
          }
        }
      }
    `,
  },
})

interface RelayProps {
  fair: {
    shows: {
      pageInfo: {
        hasNextPage: boolean,
      },
    } | any,
  } | any
}
