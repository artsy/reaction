import { OtherAuctionsStoryQuery } from "__generated__/OtherAuctionsStoryQuery.graphql"
import { SystemContext } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { SystemQueryRenderer as QueryRenderer } from "Artsy/Relay/SystemQueryRenderer"
import React, { useContext } from "react"
import { graphql } from "react-relay"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Utils/Section"
import { OtherAuctionsFragmentContainer } from "../OtherAuctions"

const OtherAuctions = ({ size }: { size?: number }) => {
  const { relayEnvironment } = useContext(SystemContext)

  return (
    <QueryRenderer<OtherAuctionsStoryQuery>
      environment={relayEnvironment}
      query={graphql`
        query OtherAuctionsStoryQuery($size: Int!) {
          sales(size: $size, sort: TIMELY_AT_NAME_ASC) {
            ...OtherAuctions_sales
          }
        }
      `}
      variables={{ size: size || 20 }}
      render={renderWithLoadProgress(OtherAuctionsFragmentContainer as any)}
    />
  )
}

storiesOf("Apps/Artwork/Components/OtherAuctions", module)
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
        <OtherAuctions size={40} />
      </Section>
    )
  })
