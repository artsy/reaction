import * as React from 'react';
import * as Relay from 'react-relay';

import { artsyNetworkLayer } from '../../relay/config';
import PopularArtistQueryConfig from '../../relay/queries/popular_artist';
import SelectableLink from './selectable_link';

class PopularArtist extends React.Component<RelayProps, null> {
  followArtist() {
    console.log("hi")
  }

  render() {
    const artists = this.props.artists.edges
    const popularArtists = artists.map(artist => {
      ;<SelectableLink onSelect={this.followArtist.bind(this)} text={artist.node.name} />
    })
    return (
      <div>
        {popularArtists}
      </div>
    )
  }
}

const PopularArtistsContainer = Relay.createContainer(PopularArtist, {
  fragments: {
    artists: () => Relay.QL`
      popular_artists() {
        name
      }
    `,
  },
})

function PopularArtistExample(props: { artistID: string }) {
  Relay.injectNetworkLayer(artsyNetworkLayer())
  return <Relay.RootContainer Component={PopularArtistsContainer} route={new PopularArtistQueryConfig()} />
}

interface RelayProps {
  artists: {
    edges: Array<{
      node: any
    } | null> | null
  }
}

export default PopularArtistExample
