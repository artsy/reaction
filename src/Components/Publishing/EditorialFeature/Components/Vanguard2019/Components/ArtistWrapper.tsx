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
import { slugify } from "underscore.string"
import { Media } from "Utils/Responsive"

export interface SVGBackgroundProps extends FlexProps {
  url?: string
}
export interface TextProps extends FlexProps {
  isMobile?: boolean
  isExpanded?: boolean
}
export class VanguardArtistWrapper extends React.Component<
  {
    article: ArticleData
    isExpanded?: boolean
    section?: string
    isMobile: boolean
    onSlideshowStateChange?: (state: boolean) => void
  },
  {
    isExpanded: boolean
  }
> {
  state = {
    isExpanded: this.props.isExpanded || false,
  }
  artistWrapper = null

  componentDidMount() {
    const {
      article: { title },
    } = this.props
    const slug = slugify(title)

    if (window.location.pathname.includes(slug)) {
      this.onExpand()
    }
  }

  onExpand() {
    const { isExpanded } = this.state

    if (isExpanded) {
      window.scrollTo({
        behavior: "smooth",
        top: this.artistWrapper.getBoundingClientRect().top + window.scrollY,
      })
    }

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
    const { article, section, isMobile, onSlideshowStateChange } = this.props
    const { hero_section, layout, slug, title } = article
    const { isExpanded } = this.state

    const background = this.getSVGBackground(
      this.getRandomSVG(section),
      section
    )
    const backgroundColor = isExpanded ? color("black100") : color("white100")

    return (
      <FullScreenProvider onSlideshowStateChange={onSlideshowStateChange}>
        <ArtistWrapper
          background={backgroundColor}
          pt={50}
          mb={isExpanded && 100}
          id={slugify(article.title)}
          ref={artistWrapper => (this.artistWrapper = artistWrapper)}
        >
          <BackgroundContainer backgroundColor={backgroundColor}>
            {background}
          </BackgroundContainer>
          <ArticleWithFullScreen article={article}>
            <ArtistContainer
              pb={4}
              maxWidth={["100vw", 1000]}
              px={4}
              mx="auto"
              isMobile={isMobile}
              isExpanded={isExpanded}
            >
              <Box textAlign="center" pb={30}>
                <Media greaterThanOrEqual="xl">
                  <ArtistTitle size="12" element="h3">
                    {title}
                  </ArtistTitle>
                </Media>

                <Media lessThan="xl">
                  <InvertedSerif
                    size={["10", "12", "12"]}
                    element="h3"
                    isMobile={isMobile}
                    isExpanded={isExpanded}
                  >
                    {title}
                  </InvertedSerif>
                </Media>

                <Box position="relative">
                  {hero_section && (
                    <InvertedSans
                      size="4"
                      weight="medium"
                      isMobile={isMobile}
                      isExpanded={isExpanded}
                    >
                      {hero_section.deck}
                    </InvertedSans>
                  )}
                  <Flex justifyContent={["center", "flex-start"]}>
                    <Box position={["relative", "absolute"]} top={0}>
                      <Share
                        // TODO: We may need to use custom urls for in-page routing
                        url={getFullEditorialHref(layout, slug)}
                        title={title}
                        color={color("white100")}
                      />
                    </Box>
                  </Flex>
                </Box>
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
                isMobile={isMobile}
                isExpanded={isExpanded}
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

export const InvertedSerif = styled(Serif)<TextProps>`
  mix-blend-mode: ${p => (p.isMobile ? "normal" : "difference")};
  color: ${color("white100")};
  will-change: color;
`

export const InvertedSans = styled(Sans)<TextProps>`
  mix-blend-mode: ${p => (p.isMobile ? "normal" : "difference")};
  color: ${color("white100")};
  will-change: color;
`

const ArtistTitle = styled(InvertedSerif)`
  font-size: 95px;
  line-height: 1em;
`

const ReadMoreButton = styled(InvertedSans)<{ onClick: () => void }>`
  text-transform: uppercase;
  cursor: pointer;
  color: ${p =>
    p.isMobile && p.isExpanded
      ? color("white100")
      : p.isMobile && !p.isExpanded
      ? color("black100")
      : color("white100")};
`

const ArtistContainer = styled(Box)<TextProps>`
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
    mix-blend-mode: ${p => (p.isMobile ? "normal" : "difference")};
    will-change: color;
    color: ${p =>
      p.isMobile && p.isExpanded
        ? color("white100")
        : p.isMobile && !p.isExpanded
        ? color("black100")
        : color("white100")};
  }

  ${CaptionContainer} {
    p {
      mix-blend-mode: ${p => (p.isMobile ? "normal" : "difference")};
      will-change: color;
      color: ${p => (p.isMobile ? color("black100") : color("white100"))};
    }

    a {
      mix-blend-mode: ${p => (p.isMobile ? "normal" : "difference")};
      will-change: color;
      color: ${p =>
        p.isMobile && !p.isExpanded ? color("black100") : color("white100")};
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
    mix-blend-mode: ${p => (p.isMobile ? "normal" : "difference")};
    color: ${p => (p.isMobile ? color("black100") : color("white100"))};
    will-change: color;

    a {
      mix-blend-mode: ${p => (p.isMobile ? "normal" : "difference")};
      will-change: color;
      color: ${p =>
        p.isMobile && !p.isExpanded ? color("black100") : color("white100")};
    }
  }

  ${StyledText} {
    a {
      mix-blend-mode: ${p => (p.isMobile ? "normal" : "difference")};
      will-change: color;
      color: ${p =>
        p.isMobile && p.isExpanded
          ? color("white100")
          : p.isMobile && !p.isExpanded
          ? color("black100")
          : color("white100")};
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

const BackgroundContainer = styled(Box)<{ backgroundColor: string }>`
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: ${({ backgroundColor }) => backgroundColor};
`

const ArtistWrapper = styled(Flex)`
  flex-direction: column;
  position: relative;
  padding-bottom: 100px;
  min-height: 100vh;
  z-index: 0;
`
