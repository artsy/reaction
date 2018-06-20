import { Sans, Serif } from "@artsy/palette"
import React from "react"
import styled from "styled-components"
import { FlexDirectionProps } from "styled-system"
import { Flex } from "Styleguide/Elements/Flex"
import { Responsive } from "Styleguide/Utils/Responsive"

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

export interface FooterContainerProps extends FlexDirectionProps {}
const FooterContainer: React.SFC<FooterContainerProps> = props => {
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
          <Link href="https://www.artsy.net/#">Buying from Galleries FAQ</Link>
          <Link href="https://www.artsy.net/#">Buying from Auctions FAQ</Link>
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
          <Link href="#">Contact</Link>
          <Link href="#">Send us feedback</Link>
        </Serif>
      </Flex>
      <Flex flexDirection="column" mb={1}>
        <Sans size="2" weight="medium">
          Partners
        </Sans>
        <Serif size="2">
          <Link href="#">Buying from Galleries FAQ</Link>
          <Link href="#">Buying from Auctions FAQ</Link>
          <Link href="#">Consign with Artsy</Link>
          <Link href="#">Artsy for Professional Buyers</Link>
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
