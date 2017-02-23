import * as React from "react"
import * as Relay from "react-relay"
import ArtworkDetails from "./artwork_details"

export class ArtworkMetadata extends React.Component<RelayProps, null> {
  render() {
    return (
      <div>
        <ArtworkDetails artwork={this.props.artwork} />
      </div>
    )
  }
}

export default Relay.createContainer(ArtworkMetadata, {
  fragments: {
    artwork: () => Relay.QL`
      fragment on Artwork {
        ${ArtworkDetails.getFragment('artwork')}
      }
    `
  },
})
