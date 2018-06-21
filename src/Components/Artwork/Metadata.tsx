import colors from "Assets/Colors"
import { garamond } from "Assets/Fonts"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

import RelayContact, { Contact } from "./Contact"
import RelayDetails, { Details } from "./Details"

export interface MetadataProps extends React.HTMLProps<MetadataContainer> {
  artwork: any
  extended?: boolean
  useRelay?: boolean
}

export class MetadataContainer extends React.Component<MetadataProps> {
  static defaultProps = {
    extended: true,
    useRelay: true,
  }

  render() {
    const { artwork, className, extended, useRelay } = this.props
    const DetailsBlock = useRelay ? RelayDetails : Details
    const ContactBlock = useRelay ? RelayContact : Contact

    return (
      <div className={className}>
        <DetailsBlock showSaleLine={extended} artwork={artwork} />
        {extended && <ContactBlock artwork={artwork} />}
      </div>
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
    }
  `
)
