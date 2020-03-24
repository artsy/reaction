import React from "react"

import { Box, Sans, Serif, Spacer } from "@artsy/palette"
import styled from "styled-components"
import { gridColumnGap, GridColumnGapProps, style } from "styled-system"
import { SectionContainer } from "./SectionContainer"
import { Subheader } from "./Subheader"

const Question = ({ question, answer }) => {
  return (
    <Box width="100%" maxWidth={["100%", 440]} p={[1, 2]}>
      <Box>
        <Sans size="4">{question}</Sans>
      </Box>
      <Box>
        <Serif size="3">{answer}</Serif>
      </Box>
    </Box>
  )
}

export const ArtistConsignFAQ: React.FC = props => {
  return (
    <SectionContainer height="100%" background="white100" pb={0}>
      <Box width="100%" maxWidth={["100%", 900]}>
        <Box textAlign="center">
          <Subheader>Frequently asked questions</Subheader>
        </Box>

        <Spacer my={2} />

        <MasonryContainer columnCount={[1, 2]} gridColumnGap={20} mb={6}>
          <Question
            question="Why sell with Artsy?"
            answer={
              <>
                Artsy wants to make it seamless and worthwhile to consign and
                resell art. Our experts ensure that you receive the most
                competitive offers and sales terms.
              </>
            }
          />
          <Question
            question="What happens once I submit a work?"
            answer={
              <>
                First, Artsy will review your submission, and notify you if it
                is accepted. Once accepted we will share it with our network of
                interested sellers. Once a seller makes an offer, you can review
                and respond to the consignment proposal via email. Finally, if
                you would like to move forward, we will help you coordinate the
                handoff every step of the way.
              </>
            }
          />
          <Question
            question="What are the fees?"
            answer={
              <>
                There is no fee to submit, or for Artsy’s consultation services.
                If you decide to sell the work, we will help you negotiate
                additional fees like commission, shipping, insurance, and
                photography.
              </>
            }
          />
          <Question
            question="What types of artworks do you accept?"
            answer={
              <>
                To determine if your work qualifies, our expert staff assesses
                if your artist’s work has sufficient resale market and demand
                (the number, recency, and value of auction results). Then we
                review important authenticity, provenance information and
                artwork details you provided. We require several images (front,
                back, signature), unframed dimensions, provenance, and a
                Certificate of Authenticity, as well as any additional
                documentation. Generally, we accept artworks valued at $5,000 or
                more.
              </>
            }
          />
          <Question
            question="How quickly will I hear from Artsy?"
            answer={
              <>
                If your work is approved, expect to hear from us within 7
                business days. To learn about the status of your consignment
                submission, please email{" "}
                <a href="mailto:consign@artsty.net">consign@artsty.net</a> or
                call +1 646 797 3423.
              </>
            }
          />
          <Question
            question="Want to learn more about selling with Artsy?"
            answer={
              <>
                Read our full <a href="/consign/#faq">FAQ</a> or{" "}
                <a href="mailto:consign@artsty.net">contact us.</a>
              </>
            }
          />
        </MasonryContainer>
      </Box>
    </SectionContainer>
  )
}

// Create custom styled-system prop
// https://github.com/styled-system/styled-system/blob/740a76eb67f8de12c5991489b00bf7c72630a160/docs/custom-props.md
const columnCount = style({
  prop: "columnCount",
  cssProperty: "columnCount",
})

const MasonryContainer = styled(Box)<
  { columnCount: number[] | number } & GridColumnGapProps
>`
  ${columnCount};
  ${gridColumnGap};
`
