import React from "react"
import styled from "styled-components"
import s from "styled-components"
import { Col, Row } from "../Elements/Grid"

export const AboutTheWork = () => {
  return (
    <Content>
      <Row>
        <Col>
          <AboutWork>
            Series: Lorem Ipsum Dolor Signature: Signed and numbered Publisher:
            Factory Editions, New York Manufacturer: Mfg Group Provenance: Peter
            Freeman Inc., New York Image rights: Courtesy of the artist and
            Salon 94
          </AboutWork>
          <AdminBlurb>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </Text>
          </AdminBlurb>
          <ReadMore>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore…{" "}
              <a>Read more</a>
            </Text>
          </ReadMore>
        </Col>
      </Row>
      <Row>
        <Col>
          <ArtistSection>
            <Row>
              <Col>
                <ArtistName>Francesca DiMattio</ArtistName>
              </Col>
            </Row>
            <Row>
              <Col>
                <MarketInsights>
                  <DataPoint>
                    <Bold>High auction record</Bold>
                    $105 million sale, Sotheby’s 2013
                  </DataPoint>
                  <DataPoint>
                    <Bold>Blue Chip</Bold>
                    Represented by internationally reputable galleries.
                  </DataPoint>
                  <DataPoint>
                    <Bold>Collected by major museums</Bold>
                    Tate, Museum of Modern Art (MoMA)
                  </DataPoint>
                </MarketInsights>
              </Col>
            </Row>
            <Row>
              <Col>
                <SelectedExhibitions>
                  <Category>Selected exhibitions</Category>

                  <ExhibitionItem>
                    2018 Adman: Warhol Before Pop,{" "}
                    <Light>Andy Warhol Museum</Light>
                  </ExhibitionItem>
                  <ExhibitionItem>
                    2017 Brancusi: Pioneer of American Minimalism,{" "}
                    <Light>Paul Kasmin Gallery</Light>
                  </ExhibitionItem>
                  <ExhibitionItem>
                    2016 Sculpture on the Move 1946–2016,{" "}
                    <Light>Kunstmuseum Basel</Light>
                  </ExhibitionItem>

                  <ViewAllButton>View All</ViewAllButton>
                </SelectedExhibitions>
              </Col>
            </Row>
            <Row>
              <Col>
                <ReadMore cap={3}>
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolor… Read more
                  </Text>
                </ReadMore>
              </Col>
            </Row>
            <Row>
              <Col>
                <ArtsyBio>
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure
                    dolor in reprehenderit in voluptate velit esse cillum dolore
                    eu fugiat nulla pariatur. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris.
                  </Text>
                </ArtsyBio>
              </Col>
            </Row>
            <Row>
              <Col>
                <GalleryBio>
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure
                    dolor in reprehenderit in voluptate velit esse cillum dolore
                    eu fugiat nulla pariatur. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris.
                  </Text>
                </GalleryBio>
              </Col>
            </Row>
          </ArtistSection>
        </Col>
      </Row>
      <Row>
        <Col>
          <GallerySection>
            <Gallery>
              <Image>TODO: Gallery Image</Image>
              <Metadata>
                <Name>Salon 94</Name>
                <Location>New York, London, Beijing, Hong Kong</Location>
                <FollowButton>Follow Button</FollowButton>
              </Metadata>
            </Gallery>
            <Gallery>
              <Image>TODO: Gallery Image</Image>
              <Metadata>
                <Name>Salon 94</Name>
                <Location>New York, London, Beijing, Hong Kong</Location>
                <FollowButton>Follow Button</FollowButton>
              </Metadata>
            </Gallery>
          </GallerySection>
        </Col>
      </Row>
    </Content>
  )
}

const Content = styled.div``
const AboutWork = styled.div``
const AdminBlurb = styled.div``
const Text = styled.div``
const ReadMore = styled.div``
const ArtistSection = styled.div``
const ArtistName = styled.div``
const MarketInsights = styled.div``
const DataPoint = styled.div``
const Bold = styled.div``
const SelectedExhibitions = styled.div``
const Category = styled.div``
const ExhibitionItem = styled.div``
const Light = styled.div``
const ViewAllButton = styled.div``
const GalleryBio = styled.div``
const GallerySection = styled.div``
const Gallery = styled.div``
const Image = styled.div``
const ArtsyBio = styled.div``
const Metadata = styled.div``
const Name = styled.div``
const Location = styled.div``
const FollowButton = styled.div``
