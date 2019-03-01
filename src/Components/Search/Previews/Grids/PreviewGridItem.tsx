import React from "react"
import { get } from "Utils/get"

import { Box, color, Flex, Image, Link, Serif, space } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"

import { PreviewGridItem_artwork } from "__generated__/PreviewGridItem_artwork.graphql"
import { SearchBarState } from "Components/Search/state"
import styled from "styled-components"
import { Subscribe } from "unstated"

interface PreviewGridItemProps {
  artwork: PreviewGridItem_artwork
  emphasizeArtist?: boolean
  highlight?: boolean
  searchState?: SearchBarState
  accessibilityLabel: string
}

const OverflowEllipsis = styled(Serif)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: ${space(12)}px;
`

const Wrapper = styled(Flex)<{isHighlight: boolean}>`
  background-color: ${props => props.isHighlight ? color("black5") : color("white100")};

  :hover {
    background-color: ${color("black5")}
  }
`

export class PreviewGridItem extends React.Component<PreviewGridItemProps> {
  render() {
    const {
      artwork,
      emphasizeArtist,
      highlight,
      accessibilityLabel,
    } = this.props
    const imageUrl = get(artwork, x => x.image.cropped.url, "")

    const linkProps: any = {
      role: "link",
      href: artwork.href,
      id: accessibilityLabel,
    }

    return (
      <Wrapper
        isHighlight={highlight}
        p={1}
      >
        <Link {...linkProps} noUnderline>
          <Box width="40px" height="40px" mr={2}>
            {imageUrl && (
              <Image
                mr={2}
                src={imageUrl}
                alt={`${artwork.title} by ${artwork.artist_names}`}
              />
            )}
          </Box>
        </Link>
        <Link href={artwork.href} color="black100" noUnderline>
          <Box>
            <OverflowEllipsis size="2" italic>
              {artwork.title}, {artwork.date}
            </OverflowEllipsis>
            <OverflowEllipsis
              size="2"
              weight={emphasizeArtist ? "semibold" : "regular"}
            >
              {artwork.artist_names}
            </OverflowEllipsis>
          </Box>
        </Link>
      </Wrapper>
    )
  }
}

export const PreviewGridItemFragmentContainer = createFragmentContainer(
  (props: PreviewGridItemProps) => {
    return (
      <Subscribe to={[SearchBarState]}>
        {(searchState: SearchBarState) => {
          return <PreviewGridItem {...props} searchState={searchState} />
        }}
      </Subscribe>
    )
  },
  graphql`
    fragment PreviewGridItem_artwork on Artwork {
      href
      title
      artist_names
      image {
        cropped(width: 40, height: 40) {
          url
        }
      }
      date
    }
  `
)
