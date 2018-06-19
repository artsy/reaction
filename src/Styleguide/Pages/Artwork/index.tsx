import React, { Component } from "react"
import styled from "styled-components"
import { Grid, Col, Row } from "Styleguide/Elements/Grid"
import { AboutTheWork } from "./AboutTheWork"
import { Bibliography } from "./Bibliography"
import { ExhibitionHistory } from "./ExhibitionHistory"
import { Banner } from "./Banner"
// import { Artists } from "./Sidebar/Artists"
import { ArtistInfo } from "./ArtistInfo"
import { Tab, Tabs } from "Styleguide/Components/Tabs"
import { Sidebar } from "./Sidebar"
import { ArtworkWithCompleteData } from "../Fixtures/Artworks"
import { ImageCarousel } from "./ImageCarousel"
import { bio } from "Styleguide/Pages/Fixtures/ArtistBio"
import { insights } from "Styleguide/Pages/Fixtures/MarketInsights"
import { exhibitions } from "Styleguide/Pages/Fixtures/SelectedExhibitions"
// import { ArtworkMetadata } from "./Sidebar/ArtworkMetadata"
// import { imageData } from "../../Components/Artwork/__stories__/ImageCarousel.story"

// FIXME: This is duplicated from above
function imageData(width: number, height: number, imageIndex?: number) {
  return {
    uri: `https://picsum.photos/${width}/${height}/?${
      imageIndex === undefined ? "random" : `image=${imageIndex}`
    }`,
    aspectRatio: width / height,
  }
}

export class Artwork extends Component {
  state = {
    tab: "About the work",
  }

  handleTab(tab) {
    this.setState({
      tab,
    })
  }

  render() {
    const slideshowImages = [
      imageData(800, 600),
      imageData(500, 400),
      imageData(300, 700),
      imageData(800, 600),
      imageData(700, 600),
      imageData(500, 600),
    ]

    return (
      <Grid fluid>
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
              {/* <ArtworkImage>TODO: Artwork Image</ArtworkImage>
              <SlideIndicatorDots>. . .</SlideIndicatorDots>
              <UtilityButtons>
                <FavoriteButton>TODO: Heart Icon</FavoriteButton>
                <ShareButton>TODO: Share Icon</ShareButton>
              </UtilityButtons> */}
            </ArtworkSlider>
          </Col>
          <Col sm={4}>
            <Sidebar artwork={ArtworkWithCompleteData} />

            <HelpText>
              First time buying on Artsy? <a>Read our FAQ</a>. <br />
              Want to sell a work by this artist? <a>Learn more</a>.
            </HelpText>
          </Col>
        </Row>
        <Row>
          <Col>
            <Tabs>
              <Tab name="About the work">
                <AboutTheWork />
              </Tab>
              <Tab name="Exhibition history">
                <ExhibitionHistory />
              </Tab>
              <Tab name="Bibliography">
                <Bibliography />
              </Tab>
            </Tabs>
          </Col>
        </Row>
        <Row>
          <Col xl={8} lg={8} md={8} sm={12} xs={12}>
            <ArtistInfo
              name="Francesca DiMattio"
              insights={insights}
              exhibitions={exhibitions}
              bio={bio}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <OtherWorksByArtist>
              <GridBlock>
                <Title>Other works by Francesca DiMattio</Title>
                <ViewAllButton>View all</ViewAllButton>
                <GridContainer>
                  <ArtworkGrid>TODO: Artwork Grid Items</ArtworkGrid>
                </GridContainer>
              </GridBlock>
            </OtherWorksByArtist>
          </Col>
        </Row>
        <Row>
          <Col>
            <OtherWorksByGallery>
              <GridBlock>
                <Title>Other works from Salon 94</Title>
                <ViewAllButton>View all</ViewAllButton>
                <GridContainer>
                  <ArtworkGrid>TODO: Artwork Grid Items</ArtworkGrid>
                </GridContainer>
              </GridBlock>
            </OtherWorksByGallery>
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
                    <GridContainer>
                      <ArtworkGrid>TODO: Artwork Grid Items</ArtworkGrid>
                    </GridContainer>
                  </Tab>
                  <Tab name="Another Gene">
                    <GridContainer>
                      <ArtworkGrid>TODO: Artwork Grid Items</ArtworkGrid>
                    </GridContainer>
                  </Tab>
                  <Tab name="Third Gene">
                    <GridContainer>
                      <ArtworkGrid>TODO: Artwork Grid Items</ArtworkGrid>
                    </GridContainer>
                  </Tab>
                  <Tab name="Most Similar">
                    <GridContainer>
                      <ArtworkGrid>TODO: Artwork Grid Items</ArtworkGrid>
                    </GridContainer>
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
                  <a>Artsy for Professional Buyers</a>
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
      </Grid>
    )
  }
}

const ArtworkSlider = styled.div``
const FollowButton = styled.div``
const Gallery = styled.div``
const PartnerInfo = styled.div``
const Name = styled.div``
const PinIcon = styled.div``
const Location = styled.div``
const HelpText = styled.div``
const Metadata = styled.div``
const TabContent = styled.div``
const OtherWorksByArtist = styled.div``
const GridBlock = styled.div``
const GridContainer = styled.div``
const Title = styled.div``
const ViewAllButton = styled.div``
const ArtworkGrid = styled.div``
const OtherWorksByGallery = styled.div``
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
