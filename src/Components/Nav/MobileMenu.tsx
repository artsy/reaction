import { garamond } from "Assets/Fonts"
import React from "react"
import styled, { StyledFunction } from "styled-components"
import StyledTextLink from "../TextLink"

interface Props {
  navHeight?: string
}

export const MobileMenu: React.SFC<Props> = props => {
  return (
    <MobileMenuContainer {...props}>
      <StyledTextLink color="white" href="/">
        Home
      </StyledTextLink>
      <StyledTextLink color="white" href="/institutions">
        Museums
      </StyledTextLink>
      <StyledTextLink color="white" href="/artists">
        Artists
      </StyledTextLink>
      <StyledTextLink color="white" href="/articles">
        Articles
      </StyledTextLink>
      <StyledTextLink color="white" href="/shows">
        Show Guide
      </StyledTextLink>
      <StyledTextLink color="white" href="/art-fairs">
        Art Fairs
      </StyledTextLink>
      <StyledTextLink color="white" href="/galleries">
        Galleries
      </StyledTextLink>
      <StyledTextLink color="white" href="/auctions">
        Auctions
      </StyledTextLink>
    </MobileMenuContainer>
  )
}

MobileMenu.defaultProps = {
  navHeight: "0px",
}

const Div: StyledFunction<Props & React.HTMLProps<HTMLDivElement>> = styled.div
const MobileMenuContainer = Div`
  ${garamond("s19")};
  box-sizing: border-box;
  position: absolute;
  z-index: 1;
  width: 100%;
  background-color: black;
  left: 0;
  padding: 20px;
  margin-top: ${props => props.navHeight};
  ${StyledTextLink} {
    display: inline-block;
    width: 50%;
    line-height: 2;
  }
`
