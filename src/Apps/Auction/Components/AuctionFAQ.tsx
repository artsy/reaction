import { Box, media, Serif, space, Spacer, Theme, Toggle } from "@artsy/palette"
import { AuctionFAQ_viewer } from "__generated__/AuctionFAQ_viewer.graphql"
import { AuctionFAQQuery } from "__generated__/AuctionFAQQuery.graphql"
import { useSystemContext } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import React from "react"
import Markdown from "react-markdown"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import styled from "styled-components"

interface AuctionFAQProps {
  viewer: AuctionFAQ_viewer
}

export const AuctionFAQ: React.FC<AuctionFAQProps> = ({ viewer }) => {
  return (
    <Theme>
      <AuctionWrapper>
        <Serif size="8" color="black100">
          Auction FAQs
        </Serif>
        <Spacer mb={2} />
        <Serif size="3" color="black100">
          How can we help you? Below are answers to some of the most common
          questions from collectors.
          <br />
          Need more immediate assistance? Please{" "}
          <a href="mailto:support@artsy.net">contact us</a>.
        </Serif>
        <Spacer mb={2} />
        <Toggle label="Bidding">
          <StyledMarkdown
            source={viewer.bidding && viewer.bidding.content}
            containerTagName="div"
            unwrapDisallowed
          />
        </Toggle>
        <Toggle label="Buyer's Premium, Taxes & Fees">
          <StyledMarkdown
            source={
              viewer.buyersPremiumTaxesAndFees &&
              viewer.buyersPremiumTaxesAndFees.content
            }
            containerTagName="div"
            unwrapDisallowed
          />
        </Toggle>
        <Toggle label="Payments and Shipping">
          <StyledMarkdown
            source={
              viewer.paymentsAndShipping && viewer.paymentsAndShipping.content
            }
            containerTagName="div"
            unwrapDisallowed
          />
        </Toggle>
        <Toggle label="Emails and Alerts">
          <StyledMarkdown
            source={viewer.emailsAndAlerts && viewer.emailsAndAlerts.content}
            containerTagName="div"
            unwrapDisallowed
          />
        </Toggle>
        <Toggle label="Conditions of sale">
          <StyledMarkdown
            source={viewer.conditionsOfSale && viewer.conditionsOfSale.content}
            containerTagName="div"
            unwrapDisallowed
          />
        </Toggle>
      </AuctionWrapper>
    </Theme>
  )
}

const AuctionWrapper = styled(Box)`
  max-width: 600px;
  margin: ${space(4)}px auto;
  padding: ${space(2)}px;
  ${media.xs`
    margin: ${space(1)}px auto;
  `};
`

const StyledMarkdown = styled(Markdown)`
  h2 {
    font-family: "Adobe Garamond W08", "adobe-garamond-pro",
      "AGaramondPro-Regular", "Times New Roman", Times, serif;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }

  p {
    margin-bottom: 20px;
    font-family: "Adobe Garamond W08", adobe-garamond-pro, AGaramondPro-Regular,
      "Times New Roman", Times, serif;
    font-size: 16px;
    line-height: 24px;
  }

  p:last-child {
    margin-bottom: 0;
  }
`

export const AuctionFAQFragmentContainer = createFragmentContainer(AuctionFAQ, {
  viewer: graphql`
    fragment AuctionFAQ_viewer on Viewer {
      bidding: staticContent(id: "how-auctions-work-bidding") {
        content
        name
      }
      buyersPremiumTaxesAndFees: staticContent(
        id: "how-auctions-work-buyers-premium-taxes-and-fees"
      ) {
        content
        name
      }
      paymentsAndShipping: staticContent(
        id: "how-auctions-work-payments-and-shipping"
      ) {
        content
        name
      }
      emailsAndAlerts: staticContent(
        id: "how-auctions-work-emails-and-alerts"
      ) {
        content
        name
      }
      conditionsOfSale: staticContent(
        id: "how-auctions-work-conditions-of-sale"
      ) {
        content
        name
      }
    }
  `,
})

export const AuctionFAQQueryRenderer: React.SFC = () => {
  const { relayEnvironment } = useSystemContext()
  return (
    <QueryRenderer<AuctionFAQQuery>
      environment={relayEnvironment}
      variables={{}}
      query={graphql`
        query AuctionFAQQuery {
          viewer {
            ...AuctionFAQ_viewer
          }
        }
      `}
      render={renderWithLoadProgress(AuctionFAQFragmentContainer)}
    />
  )
}
