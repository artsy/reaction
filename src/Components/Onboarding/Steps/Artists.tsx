import * as React from "react"
import * as Relay from 'react-relay'

import { artsyNetworkLayer } from "../../../Relay/config"
import PopularArtistQueryConfig from "../../../Relay/Queries/PopularArtist"
import SelectableItemContainer from "../SelectableItemContainer"
import { StepProps } from "../Types"
import { Layout } from "./Layout"

export interface RelayProps {
  popular_artists: {
    artists: Array<{
      name: string,
      image: {
        cropped: {
          url: string
        }
      }
    }>,
  },
}

export class SelectableArtistContainer extends React.Component<RelayProps, null> {
  render() {
    return <SelectableItemContainer items={this.props.popular_artists.artists} />
  }
}

export const PopularArtistSelector = Relay.createContainer(SelectableArtistContainer, {
  fragments: {
    popular_artists: () => Relay.QL`
      fragment on PopularArtists {
        artists {
          name
          image {
            cropped(width: 100, height: 100) {
              url
            }
          }
        }
      }
    `,
  },
})

function ConnectedPopularArtistSelector() {
  Relay.injectNetworkLayer(artsyNetworkLayer())
  return <Relay.RootContainer Component={PopularArtistSelector} route={new PopularArtistQueryConfig()} />
}

export default class Artists extends React.Component<StepProps, null> {
  // onInputChange = e => {
  //   this.props.onStateChange({ nextButtonEnabled: true })
  // }

  render() {
    return (
      <Layout
        title="Follow a few artists that interest you most"
        subtitle="Follow one or more"
        onNextButtonPressed={null}
      >
        <ConnectedPopularArtistSelector />
      </Layout>
    )
  }
}
