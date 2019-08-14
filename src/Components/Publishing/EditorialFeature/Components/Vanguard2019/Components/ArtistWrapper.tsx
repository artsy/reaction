import { Box, color, Flex, FlexProps, Sans, Serif } from "@artsy/palette"
import { Share } from "Components/Publishing/Byline/Share"
import { getFullEditorialHref } from "Components/Publishing/Constants"
import { Emerging } from "Components/Publishing/EditorialFeature/Components/Vanguard2019/Blobs/Emerging"
import { GettingTheirDue } from "Components/Publishing/EditorialFeature/Components/Vanguard2019/Blobs/GettingTheirDue"
import { NewlyEstablished } from "Components/Publishing/EditorialFeature/Components/Vanguard2019/Blobs/NewlyEstablished"
import ArticleWithFullScreen from "Components/Publishing/Layouts/ArticleWithFullScreen"
import { FullScreenProvider } from "Components/Publishing/Sections/FullscreenViewer/FullScreenProvider"
import { Sections } from "Components/Publishing/Sections/Sections"
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

    return (
      <FullScreenProvider>
        <ArtistWrapper>
          <BackgroundContainer>{background}</BackgroundContainer>
          <ArticleWithFullScreen article={article}>
            <ArtistContainer pb={4} maxWidth={1000} px={4} mx="auto">
              <Box textAlign="center">
                <ArtistTitle size="8">{title}</ArtistTitle>
                <Box position="absolute">
                  <Share
                    // TODO: We may need to use custom urls for in-page routing
                    url={getFullEditorialHref(layout, slug)}
                    title={title}
                  />
                </Box>
                {hero_section && (
                  <Sans size="4" weight="medium">
                    {hero_section.deck}
                  </Sans>
                )}
              </Box>
              {/** TODO: Sections may need to be customized to handle expansion */}
              <Sections hideAds article={article} customWidth={900} />

              <ReadMoreButton
                size="5"
                weight="medium"
                textAlign="center"
                onClick={this.onExpand}
              >
                {isExpanded ? "Read More" : "Close"}
                <Sans size="8">{isExpanded ? "\u2193" : "\u2191"}</Sans>
              </ReadMoreButton>
            </ArtistContainer>
          </ArticleWithFullScreen>
        </ArtistWrapper>
      </FullScreenProvider>
    )
  }
}

const ArtistTitle = styled(Serif)`
  font-size: 100px;
  line-height: 1.35em;
  color: ${color("white100")};
`
const ReadMoreButton = styled(Sans)<{ onClick: () => void }>`
  text-transform: uppercase;
`
const ArtistContainer = styled(Box)`
  position: relative;
  bottom: 750px;

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
`

const BackgroundContainer = styled(Box)`
  height: 100%;
`
const ArtistWrapper = styled(Flex)`
  flex-direction: column;
`
