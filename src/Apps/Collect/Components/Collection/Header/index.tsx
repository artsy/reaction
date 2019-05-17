import { EntityHeader, ReadMore } from "@artsy/palette"
import { unica } from "Assets/Fonts"
import { take } from "lodash"
import React, { FC, useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { slugify } from "underscore.string"
import { resize } from "Utils/resizer"
import { Responsive } from "Utils/Responsive"

import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"

import {
  Box,
  Col,
  color,
  Flex,
  Grid,
  media,
  Row,
  Sans,
  Serif,
  Spacer,
} from "@artsy/palette"
import { Header_artworks } from "__generated__/Header_artworks.graphql"
import { SystemContext } from "Artsy"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "Components/FollowButton/FollowArtistButton"
import { AuthModalIntent, openAuthModal } from "Utils/openAuthModal"

interface Props {
  collection: {
    artist_ids?: string[]
    category: string
    credit?: string
    description?: JSX.Element | string
    gene_ids?: string[]
    headerImage: string
    major_periods?: string[]
    medium?: string
    slug: string
    title: string
  }
  artworks: Header_artworks
}

const getReadMoreContent = description => {
  return (
    <>
      {description && (
        <span dangerouslySetInnerHTML={{ __html: description }} />
      )}
      <Spacer mt={2} />
    </>
  )
}

const handleOpenAuth = (mediator, artist) => {
  openAuthModal(mediator, {
    entity: artist,
    contextModule: Schema.ContextModule.RecommendedArtists,
    intent: AuthModalIntent.FollowArtist,
  })
}

track({
  subject: Schema.Subject.ReadMore,
  type: Schema.Type.Button,
  action_type: Schema.ActionType.Click,
})
const trackReadMoreClick = () => {
  // noop
}

const maxChars = {
  xs: 350,
  sm: 730,
  md: 670,
  lg: 660,
  xl: 820,
}

const imageWidthSizes = {
  xs: 320,
  sm: 688,
  md: 820,
  lg: 944,
  xl: 1112,
}

track({
  context_module: Schema.ContextModule.CollectionDescription,
})
export const CollectionHeader: FC<Props> = ({ artworks, collection }) => {
  const { user, mediator } = useContext(SystemContext)

  return (
    <Responsive>
      {({ xs, sm, md, lg }) => {
        const size = xs ? "xs" : sm ? "sm" : md ? "md" : lg ? "lg" : "xl"
        const imageWidth = imageWidthSizes[size]
        const imageHeight = xs ? 160 : 240
        const chars = maxChars[size]
        const categoryTarget = `/collections#${slugify(collection.category)}`
        const artistsCount = size === "xs" ? 9 : 12

        const hasMultipleArtists =
          artworks.merchandisable_artists &&
          artworks.merchandisable_artists.length > 1

        const isColumnLayout =
          hasMultipleArtists || !collection.description || size === "xs"
        const smallerScreen = size === "xs" || size === "sm"
        const featuredArtists = take(
          artworks.merchandisable_artists,
          artistsCount
        ).map((artist, index) => {
          const hasArtistMetaData = artist.nationality && artist.birthday
          return (
            <EntityContainer
              width={["100%", "25%"]}
              isColumnLayout={isColumnLayout}
              key={index}
              pb={20}
            >
              <EntityHeader
                imageUrl={artist.imageUrl}
                name={artist.name}
                meta={
                  hasArtistMetaData
                    ? `${artist.nationality}, b. ${artist.birthday}`
                    : null
                }
                href={`/artist/${artist.id}`}
                FollowButton={
                  <FollowArtistButton
                    artist={artist}
                    user={user}
                    trackingData={{
                      modelName: Schema.OwnerType.Artist,
                      context_module: Schema.ContextModule.RecommendedArtists,
                      entity_id: artist._id,
                      entity_slug: artist.id,
                    }}
                    onOpenAuthModal={() => handleOpenAuth(mediator, artist)}
                    render={({ is_followed }) => {
                      return (
                        <Sans
                          size="2"
                          weight="medium"
                          color="black"
                          style={{
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                        >
                          {is_followed ? "Following" : "Follow"}
                        </Sans>
                      )
                    }}
                  />
                }
              />
            </EntityContainer>
          )
        })

        return (
          <header>
            <Flex flexDirection="column">
              <Box>
                <Background
                  p={2}
                  mt={[0, 3]}
                  mb={3}
                  headerImageUrl={resize(collection.headerImage, {
                    width: imageWidth * (xs ? 2 : 1),
                    height: imageHeight * (xs ? 2 : 1),
                    quality: 80,
                  })}
                  height={imageHeight}
                >
                  <Overlay />
                  {collection.credit && (
                    <ImageCaption
                      size={size}
                      dangerouslySetInnerHTML={{ __html: collection.credit }}
                    />
                  )}
                </Background>
                <MetaContainer mb={2}>
                  <BreadcrumbContainer size={["2", "3"]}>
                    <a href="/collect">All works</a> /{" "}
                    <a href={categoryTarget}>{collection.category}</a>
                  </BreadcrumbContainer>
                  <Spacer mt={1} />
                  <Serif size={["6", "10"]}>{collection.title}</Serif>
                </MetaContainer>
                <Grid>
                  <Row>
                    <Col sm="12" md="8">
                      <Flex>
                        <ExtendedSerif size="3">
                          {smallerScreen ? (
                            <ReadMore
                              onReadMoreClicked={trackReadMoreClick}
                              maxChars={chars}
                              content={getReadMoreContent(
                                collection.description
                              )}
                            />
                          ) : (
                            getReadMoreContent(collection.description)
                          )}
                        </ExtendedSerif>
                      </Flex>
                    </Col>
                    <Col
                      sm={12}
                      md={isColumnLayout ? "12" : "3"}
                      mdOffset={isColumnLayout ? null : 1}
                      lgOffset={isColumnLayout ? null : 1}
                      xlOffset={isColumnLayout ? null : 1}
                    >
                      {featuredArtists.length && (
                        <Box pb={10}>
                          <Sans size="2" weight="medium" pb={15}>
                            {`Featured Artist${hasMultipleArtists ? "s" : ""}`}
                          </Sans>
                          <Flex flexWrap={isColumnLayout ? "wrap" : "nowrap"}>
                            {featuredArtists}
                          </Flex>
                        </Box>
                      )}
                    </Col>
                  </Row>
                </Grid>
                <Spacer mb={1} />
              </Box>
            </Flex>
            <Spacer mb={2} />
          </header>
        )
      }}
    </Responsive>
  )
}

const Background = styled(Box)<{
  headerImageUrl: string
  height: number
}>`
  position: relative;
  background: ${color("black30")};
  height: ${props => props.height}px;
  background-image: url(${props => props.headerImageUrl});
  background-size: cover;
  background-position: center;

  ${media.xs`
    margin-left: -20px;
    margin-right: -20px;
  `};
`
export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.15) 0%,
    rgba(0, 0, 0, 0.25) 95%
  );
  z-index: 0;
`

const MetaContainer = styled(Box)`
  position: relative;
  z-index: 1;
`

const BreadcrumbContainer = styled(Sans)`
  a {
    text-decoration: none;
  }
`

const EntityContainer = styled(Box)<{
  isColumnLayout: boolean
}>`
  ${props => (props.isColumnLayout ? "" : "min-width: 200px;")}
`

const ImageCaption = styled(Box)<{
  size: string
}>`
  ${unica("s12")};
  position: absolute;
  bottom: 5px;
  ${props => {
    if (["xs", "sm", "md"].includes(props.size)) {
      return `
        left: 20px;
      `
    } else {
      return `right: 20px;`
    }
  }}
  max-width: ${props => (props.size === "xs" ? "300px" : "100%")};
  color: ${color("white100")};
  z-index: 7;
  text-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
`

const ExtendedSerif = styled(Serif)`
  div span {
    span p {
      display: inline;
    }

    div p {
      display: inline;
      ${unica("s12")};
    }
  }
`

export const CollectionFilterFragmentContainer = createFragmentContainer(
  CollectionHeader,
  {
    artworks: graphql`
      fragment Header_artworks on FilterArtworks {
        merchandisable_artists {
          id
          _id
          name
          imageUrl
          birthday
          nationality
          ...FollowArtistButton_artist
        }
      }
    `,
  }
)
