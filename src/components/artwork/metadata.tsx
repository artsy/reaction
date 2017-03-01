import * as React from "react"
import * as Relay from "react-relay"
import ArtworkDetails from "./details"
import ArtworkContact from "./contact"
import styled from "styled-components"
import * as fonts from '../../assets/fonts'
import colors from '../../assets/colors'

export interface ArtworkMetadataProps extends React.HTMLProps<ArtworkMetadata> {
  artwork: any
}

export class ArtworkMetadata extends React.Component<ArtworkMetadataProps, null> {
  render() {
    return (
      <div className={this.props.className} >
        <ArtworkDetails artwork={this.props.artwork} />
        <ArtworkContact artwork={this.props.artwork} />
      </div>
    )
  }
}


export const StyledMetadata = styled(ArtworkMetadata)`
    ${fonts.secondary.style}
    color: ${colors.grayBold};
    font-size: 15px;
`

export default Relay.createContainer(StyledMetadata, {
  fragments: {
    artwork: () => Relay.QL`
      fragment on Artwork {
        ${ArtworkDetails.getFragment('artwork')}
        ${ArtworkContact.getFragment('artwork')}
      }
    `
  },
})
