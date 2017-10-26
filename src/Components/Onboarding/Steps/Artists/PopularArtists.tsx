import * as React from "react"
import * as Relay from "react-relay/classic"

import PopularArtistQueryConfig from "../../../../Relay/Queries/PopularArtist"

import SelectableItemContainer from "./SelectableItemContainer"

export interface RelayProps {
  popular_artists: {
    artists?: any[]
  }
}

class PopularArtistsContent extends React.Component<RelayProps, null> {
  render() {
    return <SelectableItemContainer artists={this.props.popular_artists.artists} />
  }
}

const wrappedPopularArtistContent = Relay.createContainer(PopularArtistsContent, {
  fragments: {
    popular_artists: () => Relay.QL`
      fragment on PopularArtists {
        artists {
          ${SelectableItemContainer.getFragment("artists")}
        }
      }
    `,
  },
})

export default function PopularArtistContentList() {
  return <Relay.RootContainer Component={wrappedPopularArtistContent} route={new PopularArtistQueryConfig()} />
}
