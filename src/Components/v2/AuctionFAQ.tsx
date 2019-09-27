import { Box, media, Serif, space, Spacer, Theme, Toggle } from "@artsy/palette"
import React from "react"
import styled from "styled-components"

interface Props {
  query: AuctionFAQ_query
}

export const AuctionFAQ: React.FC<Props> = ({ query }) => {
  console.log("viewer", query)
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
          <Serif size="3" weight="semibold">
            How do I Register for an Auction?
          </Serif>
          <Serif size="3">
            All bidders need to register by completing an online form and
            providing all required information, such as their full name, contact
            information, and credit card details. Auction Houses often require
            additional vetting of bidders and may prevent registration in
            advance of a sale. Check the instructions for the sale you are
            interested in and register early. We will communicate the status of
            your registration via the email and contact information you provide.
          </Serif>
          <Spacer mb={2} />
          <Serif size="3" weight="semibold">
            How do I place a bid?
          </Serif>
          <Serif size="3">
            Bidding on Artsy is easy with our automatic bidding system. Select
            your bid amount as long as it is greater than or equal to the next
            minimum bid shown on the bidding screen, then click the “Bid”
            button. This will automatically place a bid for you at the next
            increment and save the amount you entered (if higher) as your
            “Maximum Bid.”
          </Serif>
          <Spacer mb={2} />
          <Serif size="3" weight="semibold">
            What is a Maximum Bid?
          </Serif>
          <Serif size="3">
            If you enter a bid amount higher than the next minimum bid, the
            amount you enter is treated as your “Maximum Bid.” Entering a
            Maximum Bid does not necessarily mean you will pay that price, and
            you may pay less. As the auction progresses, our system will bid
            automatically for you against other bidders, according to our
            automatic bidding increments (see below), up to (but not exceeding)
            your Maximum Bid, only as much as necessary to maintain your
            position as highest bidder. If two bidders attempt to enter the same
            Maximum Bid, the first bidder to enter that amount will be the
            winner.
          </Serif>
          <Spacer mb={2} />
          <Serif size="3" weight="semibold">
            What are Bidding Increments?
          </Serif>
          <Serif size="3">
            Our automatic bidding increments determine the next minimum bid that
            can be placed. They are based on the current bid of each item and
            increase at the following intervals, when the current bid is:
            <br />
            <br />
            Under $1,000: $50
            <br />
            $1,000 - $1,999: $100
            <br />
            $2,000 - $4,999: $250
            <br />
            $5,000 - $9,999: $500
            <br />
            $10,000 - $19,999: $1,000
            <br />
            $20,000 - $49,999: $2,000
            <br />
            $50,000 - $99,999: $5,000
            <br />
            At or above $100,000: $10,000
            <br />
            <br />
            Note: Our usual bidding increments are listed above, but depending
            on the auction, we will default to the bidding increments of our
            auction house partners.
          </Serif>
          <Spacer mb={2} />
          <Serif size="3" weight="semibold">
            What is a Reserve Price?
          </Serif>
          <Serif size="3">
            A reserve price (also known as a "reserve") is the confidential
            minimum price below which the item may not be sold in the auction.
            If an item has a reserve, this will be indicated on the bidding
            screen where you enter your bid. When you bid on an item with a
            reserve, if your Maximum Bid meets or exceeds the reserve, your bid
            will be increased to meet the reserve (according to our automatic
            bidding increments), and bidding will continue from there. If an
            item is offered with a reserve, Artsy will be authorized to bid on
            the seller's behalf, up to the amount of the reserve. Some live
            sales may have unknown reserves and we will try to represent them as
            accurately as we can during the live sale. In live sales, the
            auctioneer's decision is the final one.
          </Serif>
        </Toggle>
        <Toggle label="Buyer's Premium, Taxes & Fees">
          <Serif size="3" weight="semibold">
            What is a buyer’s premium?
          </Serif>
          <Serif size="3">
            A buyer’s premium is an additional charge the winning bidder pays on
            top of the item's hammer price. If an item has a buyer's premium,
            this will be indicated on the bidding screen where you enter your
            bid, along with the rate of the buyer's premium. The buyer's premium
            is calculated as a percentage of the item's hammer price.
          </Serif>
          <Spacer mb={2} />
          <Serif size="3" weight="semibold">
            What about taxes?
          </Serif>
          <Serif size="3">
            Buyers are responsible for paying all sales and use taxes, VAT and
            any other taxes that apply to their purchases. Applicable taxes will
            be added to the winning bidder’s invoice after the auction.
          </Serif>
        </Toggle>
        <Toggle label="Payments and Shipping">
          <Serif size="3" weight="semibold">
            How does payment work after an auction?
          </Serif>
          <Serif size="3">
            Winning bidders will receive an email after the auction with
            instructions for how to checkout and pay for purchased items.
            Depending on the sale, either Artsy or the seller will collect
            payment from the buyer, and buyers will be notified accordingly upon
            conclusion of the auction.
          </Serif>
          <Spacer mb={2} />
          <Serif size="3" weight="semibold">
            How does shipping work?
          </Serif>
          <Serif size="3">
            After an auction, the buyer will be connected with the seller to
            arrange shipping. Normally buyers may choose between a common
            carrier (like FedEx) and a specialist fine art shipper. Shipping
            costs are the responsibility of the buyer.
          </Serif>
        </Toggle>
        <Toggle label="Emails and Alerts">
          <Serif size="3">
            Bidders will receive an email to confirm when their bid has been
            received, and an email to notify them when they are outbid. After
            the auction, winning bidders will also receive an email to notify
            them of their winning bid. Please be sure to register with a valid
            email address and to check your email frequently during an auction
            to make sure you receive all relevant updates.
          </Serif>
        </Toggle>
        <Toggle label="Conditions of sale">
          <Serif size="3">
            Our standard <a href="/conditions-of-sale">Conditions of Sale</a>{" "}
            contain important terms, conditions and information that apply to
            all bidders. By bidding in an auction on Artsy, you are accepting
            our <a href="/conditions-of-sale">Conditions of Sale</a>. Please
            read them carefully before bidding.
          </Serif>
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
