import React from "react"
import Relay from "react-relay"
import styled from "styled-components"
import colors from "../../Assets/Colors"
import * as fonts from "../../Assets/Fonts"

import ArtworkContact from "./Contact"
import ArtworkDetails from "./Details"

export interface ArtworkMetadataProps extends React.HTMLProps<ArtworkMetadata> {
  artwork: any
  extended?: boolean
}

export class ArtworkMetadata extends React.Component<ArtworkMetadataProps, null> {
  static defaultProps = {
    extended: false,
  }

  render() {
    return (
      <div className={this.props.className}>
        <ArtworkDetails showSaleLine={this.props.extended} artwork={this.props.artwork} />
        {this.props.extended && <ArtworkContact artwork={this.props.artwork} />}
      </div>
    )
  }
}

export const StyledMetadata = styled(ArtworkMetadata) `
    ${fonts.secondary.style}
    color: ${colors.graySemibold};
    margin-top: 12px;
    font-size: 15px;
    text-align: left;
    line-height: 20px;
`

export default Relay.createContainer(StyledMetadata, {
  fragments: {
    artwork: () => Relay.QL`
      fragment on Artwork {
        ${ArtworkDetails.getFragment("artwork")}
        ${ArtworkContact.getFragment("artwork")}
      }
    `,
  },
})
