import { OtherAuctionsQuery } from "__generated__/OtherAuctionsQuery.graphql"
import { SystemContext } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import React, { useContext } from "react"
import { graphql, QueryRenderer } from "react-relay"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Utils/Section"
import { OtherAuctionsFragmentContainer } from "../OtherAuctions"

const OtherAuctions = ({ size }: { size?: number }) => {
  const { relayEnvironment } = useContext(SystemContext)

  return (
    <QueryRenderer<OtherAuctionsQuery>
      environment={relayEnvironment}
      query={graphql`
        query OtherAuctionsQuery($size: Int!) {
          sales(size: $size, sort: TIMELY_AT_NAME_ASC) {
            ...OtherAuctions_sales
            # Relay isn't transitively expanding the child fragments for some reason, so we'll expand manually.
            ...AuctionCard_sale
          }
        }
      `}
      variables={{ size: size || 4 }}
      render={renderWithLoadProgress(OtherAuctionsFragmentContainer as any)}
    />
  )
}

storiesOf("Apps/Artwork Page/Components/OtherAuctions", module)
  .add("Other Auctions (default)", () => {
    return (
      <Section title="Responsive Other Auctions">
        <OtherAuctions />
      </Section>
    )
  })
  .add("Other Auctions (many)", () => {
    return (
      <Section title="Responsive Other Auctions">
        <OtherAuctions size={20} />
      </Section>
    )
  })
