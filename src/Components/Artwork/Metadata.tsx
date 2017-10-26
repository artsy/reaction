import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay/compat"
import styled from "styled-components"
import colors from "../../Assets/Colors"
import * as fonts from "../../Assets/Fonts"

import Contact from "./Contact"
import Details from "./Details"

export interface ArtworkMetadataProps extends React.HTMLProps<ArtworkMetadata> {
  artwork: any
  extended?: boolean
}

export class ArtworkMetadata extends React.Component<ArtworkMetadataProps, null> {
  static defaultProps = {
    extended: true,
  }

  render() {
    return (
      <div className={this.props.className}>
        <Details showSaleLine={this.props.extended} artwork={this.props.artwork} />
        {this.props.extended && <Contact artwork={this.props.artwork} />}
      </div>
    )
  }
}

export const StyledMetadata = styled(ArtworkMetadata)`
  ${fonts.secondary.style} color: ${colors.graySemibold};
  margin-top: 12px;
  font-size: 15px;
  text-align: left;
  line-height: 20px;
`

export default createFragmentContainer(
  StyledMetadata,
  graphql`
    fragment Metadata_artwork on Artwork {
      ...Details_artwork
      ...Contact_artwork
    }
  `
)
