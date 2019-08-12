import { Box, Sans, Serif } from "@artsy/palette"
import { Share } from "Components/Publishing/Byline/Share"
import { getFullEditorialHref } from "Components/Publishing/Constants"
import { Sections } from "Components/Publishing/Sections/Sections"
import { ArticleData } from "Components/Publishing/Typings"
import React from "react"
import styled from "styled-components"

export class VanguardArtistWrapper extends React.Component<
  {
    article: ArticleData
    isExpanded?: boolean
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

  render() {
    const { article } = this.props
    const { hero_section, layout, slug, title } = article
    const { isExpanded } = this.state

    return (
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
        <Sections article={article} customWidth={900} />

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
    )
  }
}

const ArtistTitle = styled(Serif)`
  font-size: 100px;
  line-height: 1.35em;
`

const ArtistContainer = styled(Box)`
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

const ReadMoreButton = styled(Sans)<{ onClick: () => void }>`
  text-transform: uppercase;
`
