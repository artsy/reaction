import { Metadata_artwork } from "__generated__/Metadata_artwork.graphql"
import colors from "Assets/Colors"
import { garamond } from "Assets/Fonts"
import StyledTextLink from "Components/TextLink"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { DetailsFragmentContainer as Details } from "./Details"

export interface MetadataProps extends React.HTMLProps<MetadataContainer> {
  artwork: Metadata_artwork
  extended?: boolean
}

export class MetadataContainer extends React.Component<MetadataProps> {
  static defaultProps = {
    extended: true,
  }

  render() {
    const { artwork, className, extended } = this.props

    return (
      <StyledTextLink href={artwork.href}>
        <div className={className}>
          <Details
            includeLinks={false}
            showSaleLine={extended}
            artwork={artwork}
          />
        </div>
      </StyledTextLink>
    )
  }
}

export const Metadata = styled(MetadataContainer)`
  ${garamond("s15")};
  color: ${colors.graySemibold};
  margin-top: 12px;
  text-align: left;
`

export default createFragmentContainer(
  Metadata,
  graphql`
    fragment Metadata_artwork on Artwork {
      ...Details_artwork
      ...Contact_artwork
      href
    }
  `
)
