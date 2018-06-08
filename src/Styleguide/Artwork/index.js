import React, { Component } from "react"
import styled from "styled-components"
import { Grid, Col, Row } from "../Elements/Grid"
import { AboutTheWork } from "./AboutTheWork"
import { Bibliography } from "./Bibliography"
import { ExhibitionHistory } from "./ExhibitionHistory"
import { Banner } from "./Banner"

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
              <ArtworkImage>TODO: Artwork Image</ArtworkImage>
              <SlideIndicatorDots>. . .</SlideIndicatorDots>
              <UtilityButtons>
                <FavoriteButton>TODO: Heart Icon</FavoriteButton>
                <ShareButton>TODO: Share Icon</ShareButton>
              </UtilityButtons>
            </ArtworkSlider>
          </Col>
          <Col sm={4}>
            <ArtworkInfo>
              <ArtistName>Francesca DiMattio</ArtistName>
              <FollowButton>TODO: Follow Button Icon</FollowButton>
              <ArtworkMetadata>
                The Fox and the Hound, 2018 <br />
                Oil on canvas <br />
                96 × 79 in; 243.8 × 200.7 cm <br />
                <br />
                <br />
                This is a unique work.
              </ArtworkMetadata>
            </ArtworkInfo>

            <hr />

            <Price>Contact for price</Price>

            <Gallery>
              <ContactButton>Contact Gallery</ContactButton>

              <Metadata>
                <Name>Salon 94</Name>
                <PinIcon>TODO: Pin Icon</PinIcon>
                <Location>New York, London, Beijing, Hong Kong</Location>
                <FollowButton>Follow Button</FollowButton>
              </Metadata>
            </Gallery>

            <hr />

            <HelpText>
              First time buying on Artsy? <a>Read our FAQ</a>. <br />
              Want to sell a work by this artist? <a>Learn more</a>.
            </HelpText>
          </Col>
        </Row>
        <Row>
          <Col>
            <Tabber>
              <TabNav>
                <Tab onClick={() => this.handleTab("About the work")}>
                  About the work
                </Tab>
                <Tab onClick={() => this.handleTab("Exhibition history")}>
                  CV
                </Tab>
                <Tab onClick={() => this.handleTab("Bibliography")}>
                  Articles
                </Tab>
              </TabNav>
            </Tabber>
            <TabContent>
              {(() => {
                switch (this.state.tab) {
                  case "About the work":
                    return <AboutTheWork />
                  case "Exhibition history":
                    return <ExhibitionHistory />
                  case "Bibliography":
                    return <Bibliography />
                  default:
                    return <div />
                }
              })()}
            </TabContent>
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
                <Tabber>
                  <TabNav>
                    <Tab>Gene</Tab>
                    <Tab>Another Gene</Tab>
                    <Tab>Third Gene</Tab>
                    <Tab>Most Similar</Tab>
                  </TabNav>
                  <TabContent>
                    <GridContainer>
                      <ArtworkGrid>TODO: Artwork Grid Items</ArtworkGrid>
                    </GridContainer>
                  </TabContent>
                </Tabber>
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
const ArtworkImage = styled.div``
const SlideIndicatorDots = styled.div``
const UtilityButtons = styled.div``
const FavoriteButton = styled.div``
const ShareButton = styled.div``
const ArtworkInfo = styled.div``
const ArtistName = styled.div``
const FollowButton = styled.div``
const ArtworkMetadata = styled.div``
const Price = styled.div``
const Gallery = styled.div``
const ContactButton = styled.div``
const Metadata = styled.div``
const Name = styled.div``
const PinIcon = styled.div``
const Location = styled.div``
const HelpText = styled.div``
const Tabber = styled.div``
const TabNav = styled.div``
const Tab = styled.div``
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
