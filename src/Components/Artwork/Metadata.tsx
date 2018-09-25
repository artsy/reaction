import { Metadata_artwork } from "__generated__/Metadata_artwork.graphql"
import { ContextConsumer } from "Artsy/Router"
import colors from "Assets/Colors"
import { garamond } from "Assets/Fonts"
import StyledTextLink from "Components/TextLink"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
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
          const enableLabFeature =
            user &&
            user.lab_features &&
            user.lab_features.includes("New Artwork Brick")

          const detailsContent = (
            <div className={className}>
              <DetailsBlock
                includeLinks={!enableLabFeature}
                showSaleLine={extended}
                artwork={artwork}
              />
              {!enableLabFeature &&
                extended && <ContactBlock artwork={artwork} />}
            </div>
          )
          return enableLabFeature ? (
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
