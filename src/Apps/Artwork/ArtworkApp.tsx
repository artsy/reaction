import { imageData } from "Apps/__test__/Fixtures/Artwork/imageData"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { FullArtworkGrid, Tab, Tabs } from "Styleguide/Components"
import { Col, Row } from "Styleguide/Elements/Grid"
import { HorizontalPadding } from "Styleguide/Utils/HorizontalPadding"
import { ArtistInfoQueryRenderer as ArtistInfo } from "./Components/ArtistInfo"
import { ArtworkDetailsQueryRenderer as ArtworkDetails } from "./Components/ArtworkDetails"
import { ArtworkSidebarFragmentContainer as ArtworkSidebar } from "./Components/ArtworkSidebar"
import { Banner } from "./Components/Banner"
import { ImageCarousel } from "./Components/ImageCarousel"
import { OtherWorks } from "./Components/OtherWorks"

import { ArtworkApp_artwork } from "__generated__/ArtworkApp_artwork.graphql"

export interface Props {
  artwork: ArtworkApp_artwork
}

export const ArtworkApp: React.SFC<Props> = props => {
  const slideshowImages = [
    imageData(800, 600),
    imageData(500, 400),
    imageData(300, 700),
    imageData(800, 600),
    imageData(700, 600),
    imageData(500, 600),
  ]

  return (
    <HorizontalPadding>
      <Row>
        <Col sm={8}>
          <Banner
            src="https://picsum.photos/110/110/?random"
            badge="In show"
            headline="Francesca DiMattio: Boucherouite"
            subHeadline="Salon 94"
          />
        </Col>
      </Row>
      <Row>
        <Col sm={8}>
          <ArtworkSlider>
            <ImageCarousel images={slideshowImages} />
          </ArtworkSlider>
        </Col>
        <Col sm={4}>
          <ArtworkSidebar artwork={props.artwork} />
        </Col>
      </Row>
      <Row>
        <Col sm={8}>
          <ArtworkDetails artworkID={props.artwork.id} />
        </Col>
      </Row>
      <Row>
        <Col sm={8}>
          <ArtistInfo artistID={props.artwork.artist.id} />
        </Col>
      </Row>
      <Row mb={6}>
        <OtherWorks headline="Other works by Banksy" />
      </Row>
      <Row mb={6}>
        <OtherWorks headline="Other works from Salon 94" />
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
      <Row>
        <Col>
          <RecentlyViewed>
            <Slider>
              <CategoryLarge>Recently viewed</CategoryLarge>
              <Slides>
                <Slide>Artwork Brick</Slide>
                <Slide>Artwork Brick</Slide>
                <Slide>Artwork Brick</Slide>
              </Slides>
            </Slider>
          </RecentlyViewed>
        </Col>
      </Row>
      <Row>
        <Col>
          <Footer>
            <Row>
              <Col>
                <Category>Buy</Category>
                <a>Buying from Galleries FAQ</a>
                <a>Buying from Auctions FAQ</a>
                <a>Consign with Artsy</a>
              </Col>
              <Col>
                <Category>Learn</Category>
                <a>Education</a>
                <a>The Art Genome Project</a>
              </Col>
              <Col>
                <Category>About us</Category>
                <a>About</a>
                <a>Blog</a>
                <a>Jobs</a>
                <a>Open Source</a>
                <a>Press</a>
                <a>Contact</a>
                <a>Send us feedback</a>
              </Col>
              <Col>
                <Category>Partner with us</Category>
                <a>Artsy for Galleries</a>
                <a>Artwsy for Museums</a>
                <a>Artsy for Auctions</a>
              </Col>
            </Row>
          </Footer>
        </Col>
      </Row>
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
      }
      ...ArtworkSidebar_artwork
      ...ArtworkDetails_artwork
    }
  `
)

const ArtworkSlider = styled.div``
const FollowButton = styled.div``
const Name = styled.div``
const Metadata = styled.div``
const GridBlock = styled.div``
const Title = styled.div``
const ViewAllButton = styled.div``
const RelatedWorks = styled.div``
const RelatedArtists = styled.div``
const RelatedArtistItem = styled.div``
const Image = styled.div``
const RecentlyViewed = styled.div``
const Slider = styled.div``
const Category = styled.div``
const CategoryLarge = styled.div``
const Slides = styled.div``
const Slide = styled.div``
const Footer = styled.div``
