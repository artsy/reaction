import { Box, Separator, Spacer } from "@artsy/palette"
import { ArtworkApp_artwork } from "__generated__/ArtworkApp_artwork.graphql"
import React from "react"
import { LazyLoadComponent } from "react-lazy-load-image-component"
import { createFragmentContainer, graphql } from "react-relay"
import { Col, Row } from "Styleguide/Elements/Grid"
import { HorizontalPadding } from "Styleguide/Utils/HorizontalPadding"

import { ArtistInfoQueryRenderer as ArtistInfo } from "./Components/ArtistInfo"
import { ArtworkBannerFragmentContainer as ArtworkBanner } from "./Components/ArtworkBanner"
import { ArtworkDetailsFragmentContainer as ArtworkDetails } from "./Components/ArtworkDetails"
import { ArtworkImageBrowserFragmentContainer as ArtworkImageBrowser } from "./Components/ArtworkImageBrowser"
import { ArtworkMetaFragmentContainer as ArtworkMeta } from "./Components/ArtworkMeta"
import { ArtworkRelatedArtistsFragmentContainer as RelatedArtists } from "./Components/ArtworkRelatedArtists"
import { ArtworkSidebarFragmentContainer as ArtworkSidebar } from "./Components/ArtworkSidebar"
import { OtherWorksFragmentContainer as OtherWorks } from "./Components/OtherWorks"

import {
  Footer,
  RecentlyViewedQueryRenderer as RecentlyViewed,
} from "Styleguide/Components"
import { get } from "Utils/get"
import { Media } from "Utils/Responsive"

export interface Props {
  artwork: ArtworkApp_artwork
}

export class ArtworkApp extends React.Component<Props> {
  renderArtists() {
    const artists = get(this.props, p => p.artwork.artists)

    if (!artists.length) {
      return null
    }

    return (
      <>
        {artists.map((artist, index) => {
          const addSpacer = artists.length > 1 && index < artists.length - 1
          return (
            <Row key={artist.id}>
              <Col>
                <ArtistInfo artistID={artist.id} />
                {addSpacer && <Spacer mb={2} />}
              </Col>
            </Row>
          )
        })}
      </>
    )
  }

  render() {
    const { artwork } = this.props

    return (
      <HorizontalPadding>
        {/* NOTE: react-head automatically moves these tags to the <head> element */}
        <ArtworkMeta artwork={artwork} />

        <Row>
          <Col sm={8}>
            <ArtworkBanner artwork={artwork} />
            <Spacer mb={2} />
          </Col>
        </Row>

        {/* Mobile */}
        <Media at="xs">
          <Row>
            <Col>
              <ArtworkImageBrowser artwork={artwork} />
              <ArtworkSidebar artwork={artwork} />
              <ArtworkDetails artwork={artwork} />
              {this.renderArtists()}
            </Col>
          </Row>
        </Media>

        {/* Desktop */}
        <Media greaterThan="xs">
          <Row>
            <Col sm={8}>
              <Box pr={4}>
                <ArtworkImageBrowser artwork={artwork} />
                <ArtworkDetails artwork={artwork} />
                {this.renderArtists()}
              </Box>
            </Col>
            <Col sm={4}>
              <ArtworkSidebar artwork={artwork} />
            </Col>
          </Row>
        </Media>

        <Row>
          <Col>
            <Box mt={6}>
              <OtherWorks artwork={artwork} />
            </Box>
          </Col>
        </Row>

        {artwork.artist && (
          <Row>
            <Col>
              <RelatedArtists artwork={artwork} />
            </Col>
          </Row>
        )}

        {typeof window !== "undefined" && (
          <LazyLoadComponent threshold={1000}>
            <Row>
              <Col>
                <RecentlyViewed />
              </Col>
            </Row>
          </LazyLoadComponent>
        )}

        <Row>
          <Col>
            <Separator mt={6} mb={3} />
            <Footer />
          </Col>
        </Row>

        <div id="lightbox-container" />
      </HorizontalPadding>
    )
  }
}

export const ArtworkAppFragmentContainer = createFragmentContainer(
  ArtworkApp,
  graphql`
    fragment ArtworkApp_artwork on Artwork {
      id
      artists {
        _id
        id
      }
      artist {
        id
      }
      ...ArtworkRelatedArtists_artwork
      ...ArtworkMeta_artwork
      ...ArtworkBanner_artwork
      ...ArtworkSidebar_artwork
      ...ArtworkDetails_artwork
      ...ArtworkImageBrowser_artwork
      ...OtherWorks_artwork
    }
  `
)
