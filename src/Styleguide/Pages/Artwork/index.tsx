import { injectGlobalCSS, Theme, themeProps } from "@artsy/palette"
import React, { Component } from "react"
import styled from "styled-components"
import { FullArtworkGrid } from "Styleguide/Components/ArtworkGrid"
import { Tab, Tabs } from "Styleguide/Components/Tabs"
import { GlobalStyles } from "Styleguide/Elements/GlobalStyles"
import { Col, Grid, Row } from "Styleguide/Elements/Grid"
import { OtherWorks } from "Styleguide/Pages/Artwork/OtherWorks"
import { exhibitions } from "Styleguide/Pages/Fixtures//SelectedExhibitions"
import { bio } from "Styleguide/Pages/Fixtures/ArtistBio"
import { imageData } from "Styleguide/Pages/Fixtures/Artwork/imageData"
import { RegularArtwork2Editions } from "Styleguide/Pages/Fixtures/Artworks"
import { insights } from "Styleguide/Pages/Fixtures/MarketInsights"
import { ResponsiveProvider } from "Styleguide/Utils/Responsive"
import { AboutTheWork } from "./AboutTheWork"
import { ArtistInfo } from "./ArtistInfo"
import { Banner } from "./Banner"
import { Bibliography } from "./Bibliography"
import { ExhibitionHistory } from "./ExhibitionHistory"
import { ImageCarousel } from "./ImageCarousel"
import { Sidebar } from "./Sidebar"

injectGlobalCSS()

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
      <Theme>
        <GlobalStyles>
          <ResponsiveProvider breakpoints={themeProps.mediaQueries}>
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
                  </ArtworkSlider>
                </Col>
                <Col sm={4}>
                  <Sidebar artwork={RegularArtwork2Editions} />
                </Col>
              </Row>
              <Row mb={6}>
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
              <Row mb={6}>
                <Col xl={8} lg={8} md={8} sm={12} xs={12}>
                  <ArtistInfo
                    name="Francesca DiMattio"
                    insights={insights}
                    exhibitions={exhibitions}
                    bio={bio}
                  />
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
          </ResponsiveProvider>
        </GlobalStyles>
      </Theme>
    )
  }
}

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
