import { Box, color, Flex, Link, Sans, Serif } from "@artsy/palette"
import { ArtistCollectionEntity_collection } from "__generated__/ArtistCollectionEntity_collection.graphql"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import currency from "currency.js"
import { map } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import styled from "styled-components"

export interface CollectionProps {
  collection: ArtistCollectionEntity_collection
}

@track()
export class ArtistCollectionEntity extends React.Component<CollectionProps> {
  @track<CollectionProps>(({ collection }) => ({
    action_type: Schema.ActionType.Click,
    context_module: Schema.ContextModule.CollectionsRail,
    context_page_owner_type: Schema.OwnerType.Artist,
    destination_path: `${sd.APP_URL}/collection/${collection.slug}`,
    type: Schema.Type.Thumbnail,
  }))
  onLinkClick() {
    // noop
  }

  render() {
    const {
      artworks: { hits },
      headerImage,
      price_guidance,
      slug,
      title,
    } = this.props.collection
    const formattedTitle = (title && title.split(": ")[1]) || title
    const bgImages = map(hits, "image.url")
    const imageSize =
      bgImages.length === 1 ? 265 : bgImages.length === 2 ? 131 : 85

    return (
      <Box width="100%" pr={2}>
        <StyledLink
          href={`${sd.APP_URL}/collection/${slug}`}
          onClick={this.onLinkClick.bind(this)}
        >
          <ImgWrapper pb={1}>
            {bgImages.length ? (
              bgImages.map((url, i) => {
                const alt = `${hits[i].artist.name}, ${hits[i].title}`
                return (
                  <ArtworkImage key={i} src={url} width={imageSize} alt={alt} />
                )
              })
            ) : (
              <ArtworkImage src={headerImage} width={265} />
            )}
          </ImgWrapper>

          <CollectionTitle size="3">{formattedTitle}</CollectionTitle>
          {price_guidance && (
            <Sans size="2" color="black60">
              Works from $
              {currency(price_guidance, {
                separator: ",",
                precision: 0,
              }).format()}
            </Sans>
          )}
        </StyledLink>
      </Box>
    )
  }
}

const CollectionTitle = styled(Serif)`
  width: max-content;
`

export const StyledLink = styled(Link)`
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`

export const ArtworkImage = styled.img<{ width: number }>`
  width: ${({ width }) => width}px;
  height: 125px;
  background-color: ${color("black10")};
  object-fit: cover;
  object-position: center;

  &:last-child {
    padding-right: 0;
  }
`

const ImgWrapper = styled(Flex)`
  width: 265px;
  justify-content: space-between;
`

export const ArtistCollectionEntityFragmentContainer = createFragmentContainer(
  ArtistCollectionEntity,
  {
    collection: graphql`
      fragment ArtistCollectionEntity_collection on MarketingCollection {
        headerImage
        slug
        title
        price_guidance
        artworks(size: 3, sort: "merchandisability") {
          hits {
            artist {
              name
            }
            title
            image {
              url(version: "small")
            }
          }
        }
      }
    `,
  }
)
