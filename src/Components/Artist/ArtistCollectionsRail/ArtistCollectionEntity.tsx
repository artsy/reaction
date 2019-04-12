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
                  <SingleImgContainer key={i}>
                    <ImgOverlay width={imageSize} />
                    <ArtworkImage
                      key={i}
                      src={url}
                      width={imageSize}
                      alt={alt}
                    />
                  </SingleImgContainer>
                )
              })
            ) : (
              <ArtworkImage src={headerImage} width={265} />
            )}
          </ImgWrapper>

          <CollectionTitle size="3">{formattedTitle}</CollectionTitle>
          {price_guidance && (
            <Sans size="2" color="black60">
              From $
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
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &:hover {
    text-decoration: none;
    ${CollectionTitle} {
      text-decoration: underline;
    }
  }
`

const SingleImgContainer = styled(Box)`
  position: relative;
  margin-right: 2px;

  &:last-child {
    margin-right: 0;
  }
`

const ImgOverlay = styled(Box)<{ width: number }>`
  height: 125px;
  background-color: ${color("black30")};
  opacity: 0.1;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 7;
`

export const ArtworkImage = styled.img<{ width: number }>`
  width: ${({ width }) => width}px;
  height: 125px;
  background-color: ${color("black10")};
  object-fit: cover;
  object-position: center;
  opacity: 0.9;
`

const ImgWrapper = styled(Flex)`
  width: 265px;
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
