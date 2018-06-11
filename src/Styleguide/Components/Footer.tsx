import React from "react"
import styled from "styled-components"
import { Flex } from "../Elements/Flex"
import { Responsive } from "../Utils/Responsive"
import { Sans, Serif } from "@artsy/palette"

export class Footer extends React.Component {
  render() {
    return (
      <Responsive>
        {({ xs }) => {
          if (xs) return <SmallFooter />
          else return <LargeFooter />
        }}
      </Responsive>
    )
  }
}

export const LargeFooter = props => <FooterContainer flexDirection="row" />
export const SmallFooter = props => <FooterContainer flexDirection="column" />

const FooterContainer = props => {
  return (
    <React.Fragment>
      <Flex
        flexDirection={props.flexDirection}
        justifyContent="space-between"
        width="100%"
      >
        <Flex flexDirection="column" my={3}>
          <Sans size="2">Buy</Sans>
          <Serif size="2">
            <Link>Buying fr2m Galleries FAQ</Link>
            <Link>Buying from Auctions FAQ</Link>
            <Link>Consign with Artsy</Link>
            <Link>Artsy for Professional Buyers</Link>
          </Serif>
        </Flex>
        <Flex flexDirection="column" my={3}>
          <Sans size="2">Learn</Sans>
          <Serif size="2">
            <Link>Education</Link>
            <Link>The Art Genome Project</Link>
          </Serif>
        </Flex>
        <Flex flexDirection="column" my={3}>
          <Sans size="2">About us</Sans>
          <Serif size="2">
            <Link>About</Link>
            <Link>Blog</Link>
            <Link>Jobs</Link>
            <Link>Open Source</Link>
            <Link>Press</Link>
            <Link>Contact</Link>
            <Link>Send us feedback</Link>
          </Serif>
        </Flex>
        <Flex flexDirection="column" my={3}>
          <Sans size="2">Partners</Sans>
          <Serif size="2">
            <Link>Buying from Galleries FAQ</Link>
            <Link>Buying from Auctions FAQ</Link>
            <Link>Consign with Artsy</Link>
            <Link>Artsy for Professional Buyers</Link>
          </Serif>
        </Flex>
      </Flex>
    </React.Fragment>
  )
}

const Link = styled.a`
  display: block;
`
