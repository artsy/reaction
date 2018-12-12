import { Box, Separator, Spacer } from "@artsy/palette"
import { ArtworkApp_artwork } from "__generated__/ArtworkApp_artwork.graphql"
import React from "react"
import { LazyLoadComponent } from "react-lazy-load-image-component"
import { createFragmentContainer, graphql } from "react-relay"
import { Col, Row } from "Styleguide/Elements/Grid"
import { HorizontalPadding } from "Styleguide/Utils/HorizontalPadding"
import { ArtistInfoFragmentContainer as ArtistInfo } from "./Components/ArtistInfo"

import { ArtworkBannerFragmentContainer as ArtworkBanner } from "./Components/ArtworkBanner"
import { ArtworkDetailsFragmentContainer as ArtworkDetails } from "./Components/ArtworkDetails"
import { ArtworkImagesFragmentContainer as ArtworkImages } from "./Components/ArtworkImages"
import { ArtworkSidebarFragmentContainer as ArtworkSidebar } from "./Components/ArtworkSidebar"
import { OtherWorksFragmentContainer as OtherWorks } from "./Components/OtherWorks"

import {
  Footer,
  RecentlyViewedQueryRenderer as RecentlyViewed,
} from "Styleguide/Components"

export interface Props {
  artwork: ArtworkApp_artwork
}

export const ArtworkApp: React.SFC<Props> = props => {
  return (
    <HorizontalPadding>
      <Row>
        <Col sm={8}>
          <ArtworkBanner artwork={props.artwork} />
          <Spacer mb={4} />
        </Col>
      </Row>
      <Row>
        <Col sm={8}>
          <Box px={4}>
            <ArtworkImages artwork={props.artwork} />
          </Box>
        </Col>
        <Col sm={4}>
          <ArtworkSidebar artwork={props.artwork} />
        </Col>
      </Row>
      <Row>
        <Col sm={8}>
          <ArtworkDetails artwork={props.artwork} />
        </Col>
      </Row>
      {props.artwork.artist && (
        <Row>
          <Col sm={8}>
            <ArtistInfo artist={props.artwork.artist} />
          </Col>
        </Row>
      )}

      <Row>
        <Col>
          <Box mt={6}>
            <OtherWorks artwork={props.artwork} />
          </Box>
        </Col>
      </Row>

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

      {/*
        TODO: Implement

      <Row>
        <Col>
          <Box mb={6}>
            <OtherWorks headline="Other works by Banksy" />
          </Box>
        </Col>
      </Row>
      <Row>
        <Col>
          <Box mb={6}>
            <OtherWorks headline="Other works from Salon 94" />
          </Box>
        </Col>
      </Row>

      <Row>
        <Col>
          <RelatedWorks>
            <GridBlock>
              <Title>Related works</Title>
              <ViewAllButton>View all</ViewAllButton>
              <Tabs>
                <Tab name="Gene">
                  <FullArtworkGrid artistID="pablo-picasso" />
                </Tab>
                <Tab name="Another Gene">
                  <FullArtworkGrid artistID="banksy" />
                </Tab>
                <Tab name="Third Gene">
                  <FullArtworkGrid artistID="pablo-picasso" />
                </Tab>
                <Tab name="Most Similar">
                  <FullArtworkGrid artistID="banksy" />
                </Tab>
              </Tabs>
            </GridBlock>
          </RelatedWorks>
        </Col>
      </Row>
      <Row>
        <Col>
          <RelatedArtists>
            <RelatedArtistItem>
              <Image>TODO: Image</Image>
              <Name>Francesca DiMattio</Name>
              <Metadata>American, b. 1979</Metadata>
              <FollowButton>Follow</FollowButton>
            </RelatedArtistItem>
            <RelatedArtistItem>
              <Image>TODO: Image</Image>
              <Name>Jennifer Allora & Guillermo Calzadilla</Name>
              <Metadata>American, b. 1979</Metadata>
              <FollowButton>Follow</FollowButton>
            </RelatedArtistItem>
          </RelatedArtists>
        </Col>
      </Row>
      */}

      <div id="lightbox-container" />
    </HorizontalPadding>
  )
}

export const ArtworkAppFragmentContainer = createFragmentContainer(
  ArtworkApp,
  graphql`
    fragment ArtworkApp_artwork on Artwork {
      id
      artist {
        id
        ...ArtistInfo_artist
      }
      ...ArtworkBanner_artwork
      ...ArtworkSidebar_artwork
      ...ArtworkDetails_artwork
      ...ArtworkImages_artwork
      ...OtherWorks_artwork
    }
  `
)
