import * as React from "react"
import * as Relay from "react-relay"

import SelectableItemContainer from "./SelectableItemContainer"

import { StepProps } from "../../Types"
import { Layout } from "../Layout"

export interface RelayProps {
  popular_artists: {
    artists: any[]
  }
}

/**
 * Artists
 * -> Input
 *    List
 *    -> Popular
 *       Search
 */

class Artists extends React.Component<StepProps & RelayProps, null> {
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
        <SelectableItemContainer artists={this.props.popular_artists.artists} placeholder="Search artists..." />
      </Layout>
    )
  }
}

export default Relay.createContainer(Artists, {
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
