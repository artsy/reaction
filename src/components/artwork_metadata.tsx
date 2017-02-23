import * as React from "react"
import * as Relay from "react-relay"
import ArtworkDetails from "./artwork_details"
import ArtworkContact from "./artwork_contact"

export class ArtworkMetadata extends React.Component<RelayProps, null> {
  render() {
    return (
      <div>
        <ArtworkDetails artwork={this.props.artwork} />
        <ArtworkContact artwork={this.props.artwork} />
      </div>
    )
  }
}

export default Relay.createContainer(ArtworkMetadata, {
  fragments: {
    artwork: () => Relay.QL`
      fragment on Artwork {
        ${ArtworkDetails.getFragment('artwork')}
        ${ArtworkContact.getFragment('artwork')}
      }
    `
  },
})
