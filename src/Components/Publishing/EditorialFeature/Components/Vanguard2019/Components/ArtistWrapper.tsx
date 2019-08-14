import { Box, color, Flex, FlexProps, Sans, Serif } from "@artsy/palette"
import { Share, ShareContainer } from "Components/Publishing/Byline/Share"
import { getFullEditorialHref } from "Components/Publishing/Constants"
import { Emerging } from "Components/Publishing/EditorialFeature/Components/Vanguard2019/Blobs/Emerging"
import { GettingTheirDue } from "Components/Publishing/EditorialFeature/Components/Vanguard2019/Blobs/GettingTheirDue"
import { NewlyEstablished } from "Components/Publishing/EditorialFeature/Components/Vanguard2019/Blobs/NewlyEstablished"
import ArticleWithFullScreen from "Components/Publishing/Layouts/ArticleWithFullScreen"
import { StyledArtworkCaption } from "Components/Publishing/Sections/ArtworkCaption"
import { CaptionContainer } from "Components/Publishing/Sections/Caption"
import { FullScreenProvider } from "Components/Publishing/Sections/FullscreenViewer/FullScreenProvider"
import {
  Sections,
  StyledSections,
} from "Components/Publishing/Sections/Sections"
import { StyledText } from "Components/Publishing/Sections/StyledText"
import { ArticleData } from "Components/Publishing/Typings"
import { random } from "lodash"
import React from "react"
import styled from "styled-components"

export interface SVGBackgroundProps extends FlexProps {
  url?: string
}
export class VanguardArtistWrapper extends React.Component<
  {
    article: ArticleData
    isExpanded?: boolean
    section?: string
  },
  {
    isExpanded: boolean
  }
> {
  state = {
    isExpanded: this.props.isExpanded || false,
  }

  onExpand() {
    const { isExpanded } = this.state
    this.setState({ isExpanded: !isExpanded })
  }

  getRandomSVG(section) {
    /* Lodash random returns a whole integer between 0 and the max passed.
     * "Emerging" has 20 SVG possibilities while Newly Established
     * and "Getting Their Due" have 15, hence the default to 15
     * */
    switch (section) {
      case "emerging":
        return random(20)
      default:
        return random(15)
    }
  }

  getSVGBackground(index, section) {
    switch (section) {
      case "emerging":
        return Emerging(index)
      case "newly-established":
        return NewlyEstablished(index)
      case "getting-their-due":
        return GettingTheirDue(index)
    }
  }

  render() {
    const { article, section } = this.props
    const { hero_section, layout, slug, title } = article
    const { isExpanded } = this.state

    const background = this.getSVGBackground(
      this.getRandomSVG(section),
      section
    )
    const backgroundColor = isExpanded ? color("black100") : color("white100")

    return (
      <FullScreenProvider>
        <ArtistWrapper
          background={backgroundColor}
          pt={50}
          mb={isExpanded && 100}
        >
          <BackgroundContainer>{background}</BackgroundContainer>
          <ArticleWithFullScreen article={article}>
            <ArtistContainer pb={4} maxWidth={1000} px={4} mx="auto">
              <Box textAlign="center" pb={30}>
                <ArtistTitle size="8">{title}</ArtistTitle>
                <Box position="absolute">
                  <Share
                    // TODO: We may need to use custom urls for in-page routing
                    url={getFullEditorialHref(layout, slug)}
                    title={title}
                    color={color("white100")}
                  />
                </Box>
                {hero_section && (
                  <InvertedSans size="4" weight="medium">
                    {hero_section.deck}
                  </InvertedSans>
                )}
              </Box>

              <Sections
                hideAds
                article={article}
                customWidth={920}
                isTruncatedAt={!isExpanded && 2}
              />

              <ReadMoreButton
                size="5"
                weight="medium"
                textAlign="center"
                onClick={this.onExpand.bind(this)}
              >
                {isExpanded ? "Close" : "Read More"}
                <Sans size="8">{isExpanded ? "\u2191" : "\u2193"}</Sans>
              </ReadMoreButton>
            </ArtistContainer>
          </ArticleWithFullScreen>
        </ArtistWrapper>
      </FullScreenProvider>
    )
  }
}

export const InvertedSerif = styled(Serif)`
  mix-blend-mode: difference;
  background: ${color("black100")};
  color: ${color("white100")};
`

export const InvertedSans = styled(Sans)`
  mix-blend-mode: difference;
  background: ${color("black100")};
  color: ${color("white100")};
`

const ArtistTitle = styled(InvertedSerif)`
  font-size: 95px;
  line-height: 1em;
`

const ReadMoreButton = styled(InvertedSans)<{ onClick: () => void }>`
  text-transform: uppercase;
  cursor: pointer;
`

const ArtistContainer = styled(Box)`
  position: relative;

  /* override feature text drop-caps */
  p:first-child::first-letter,
  .paragraph:first-child::first-letter {
    font-family: inherit;
    font-size: inherit;
    float: none;
    line-height: inherit;
    margin-right: 0;
    margin-top: 0;
    text-transform: none;
  }

  ${StyledSections} {
    margin-top: 0;
  }

  ${ShareContainer},
  ${StyledText} {
    mix-blend-mode: difference;
    background: ${color("black100")};
    color: ${color("white100")};
  }

  ${CaptionContainer} {
    p {
      mix-blend-mode: difference;
      background: ${color("black100")};
      color: ${color("white100")};
    }

    a {
      mix-blend-mode: difference;
      background: ${color("black100")};
      color: ${color("white100")};
      background-image: linear-gradient(
        to bottom,
        transparent 0,
        #fff 1px,
        transparent 0
      );
      background-size: 1.25px 4px;
      background-repeat: repeat-x;
      background-position: bottom;
    }
  }

  ${StyledArtworkCaption} {
    mix-blend-mode: difference;
    background: ${color("black100")};
    color: ${color("white100")};

    a {
      mix-blend-mode: difference;
      background: ${color("black100")};
      color: ${color("white100")};
    }
  }

  ${StyledText} {
    a {
      mix-blend-mode: difference;
      background: ${color("black100")};
      color: ${color("white100")};
      background-image: linear-gradient(
        to bottom,
        transparent 0,
        #fff 1px,
        transparent 0
      );
      background-size: 1.25px 4px;
      background-repeat: repeat-x;
      background-position: bottom;
    }
  }
`

const BackgroundContainer = styled(Box)`
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`

const ArtistWrapper = styled(Flex)`
  flex-direction: column;
  position: relative;
  padding-bottom: 100px;
  min-height: 100vh;
`
