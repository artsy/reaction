import { Metadata_artwork } from "__generated__/Metadata_artwork.graphql"
import { ContextConsumer } from "Artsy/Router"
import colors from "Assets/Colors"
import { garamond } from "Assets/Fonts"
import StyledTextLink from "Components/TextLink"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import styled from "styled-components"
import RelayContact, { Contact } from "./Contact"
import RelayDetails, { Details } from "./Details"

export interface MetadataProps extends React.HTMLProps<MetadataContainer> {
  artwork: Metadata_artwork
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
      <ContextConsumer>
        {({ user }) => {
          const enableBuyNowFlow = sd.ENABLE_NEW_BUY_NOW_FLOW

          const detailsContent = (
            <div className={className}>
              <DetailsBlock
                includeLinks={!enableBuyNowFlow}
                showSaleLine={extended}
                artwork={artwork}
              />
              {!enableBuyNowFlow &&
                extended && <ContactBlock artwork={artwork} />}
            </div>
          )
          return enableBuyNowFlow ? (
            <StyledTextLink href={artwork.href}>
              {detailsContent}
            </StyledTextLink>
          ) : (
            detailsContent
          )
        }}
      </ContextConsumer>
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
