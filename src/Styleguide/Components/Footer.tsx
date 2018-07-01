import { Sans, Serif } from "@artsy/palette"
import React from "react"
import { AppState } from "Router/state"
import styled from "styled-components"
import { FlexDirectionProps } from "styled-system"
import { Flex } from "Styleguide/Elements/Flex"
import { Subscribe } from "unstated"
import { Responsive } from "Utils/Responsive"

interface Props {
  mediator?: {
    trigger: (action: string, config?: object) => void
  }
}

export const Footer: React.SFC<Props> = props => {
  return (
    <Subscribe to={[AppState]}>
      {({ state }) => {
        return (
          <Responsive>
            {({ xs }) => {
              if (xs) return <SmallFooter mediator={state.force.mediator} />
              else return <LargeFooter mediator={state.force.mediator} />
            }}
          </Responsive>
        )
      }}
    </Subscribe>
  )
}

export const LargeFooter = (props: Props) => (
  <FooterContainer mediator={props.mediator} flexDirection="row" />
)

export const SmallFooter = (props: Props) => (
  <FooterContainer mediator={props.mediator} flexDirection="column" />
)

const FooterContainer: React.SFC<FlexDirectionProps & Props> = props => {
  return (
    <Flex
      flexDirection={props.flexDirection}
      justifyContent="space-between"
      width="100%"
    >
      <Flex flexDirection="column" mb={1}>
        <Sans size="2" weight="medium">
          Buy
        </Sans>
        <Serif size="2">
          <Link onClick={() => props.mediator.trigger("openCollectorFAQModal")}>
            Buying from Galleries FAQ
          </Link>
          <Link onClick={() => props.mediator.trigger("openAuctionFAQModal")}>
            Buying from Auctions FAQ
          </Link>
          <Link href="https://www.artsy.net/consign">Consign with Artsy</Link>
          <Link href="https://www.artsy.net/professional-buyer">
            Artsy for Professional Buyers
          </Link>
        </Serif>
      </Flex>
      <Flex flexDirection="column" mb={1}>
        <Sans size="2" weight="medium">
          Learn
        </Sans>
        <Serif size="2">
          <Link href="https://www.artsy.net/artsy-education">Education</Link>
          <Link href="https://www.artsy.net/categories">
            The Art Genome Project
          </Link>
        </Serif>
      </Flex>
      <Flex flexDirection="column" mb={1}>
        <Sans size="2" weight="medium">
          About us
        </Sans>
        <Serif size="2">
          <Link href="https://www.artsy.net/about">About</Link>
          <Link href="https://medium.com/artsy-blog">Blog</Link>
          <Link href="https://www.artsy.net/about/jobs">Jobs</Link>
          <Link href="https://artsy.github.com/open-source">Open Source</Link>
          <Link href="https://www.artsy.net/about/press">Press</Link>
          <Link href="https://www.artsy.net/contact">Contact</Link>
          <Link onClick={() => props.mediator.trigger("openFeedbackModal")}>
            Send us feedback
          </Link>
        </Serif>
      </Flex>
      <Flex flexDirection="column" mb={1}>
        <Sans size="2" weight="medium">
          Partners
        </Sans>
        <Serif size="2">
          <Link href="https://www.artsy.net/gallery-partnerships">
            Artsy for Galleries
          </Link>
          <Link href="https://www.artsy.net/institution-partnerships">
            Artsy for Museums
          </Link>
          <Link href="https://www.artsy.net/auction-partnerships">
            Artsy for Auctions
          </Link>
        </Serif>
      </Flex>
    </Flex>
  )
}

const Link = styled.a`
  display: block;
  margin-top: ${props => props.theme.space[1]}px;
  margin-bottom: ${props => props.theme.space[1]}px;
  text-decoration: none;
`
