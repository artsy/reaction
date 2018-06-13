import React, { Component } from "react"
import styled from "styled-components"
import { Grid, Col, Row, media } from "../../Elements/Grid"
import { Articles } from "./Articles"
import { AuctionResults } from "./AuctionResults"
import { CV } from "./CV"
import { Overview } from "./Overview"
import { Shows } from "./Shows"
import { RelatedArtists } from "./RelatedArtists"

import { Serif } from "@artsy/palette"
import { Slider } from "../../Components/Slider"
import { Button } from "../../Elements/Button"

export class Artist extends Component {
  state = {
    tab: "Overview",
  }

  handleTab(tab) {
    this.setState({
      tab,
    })
  }

  render() {
    return (
      <Grid fluid>
        <Row mb={7}>
          <Col>
            <Slider size="large" />
          </Col>
        </Row>
        <Row>
          <Col sm={10}>
            <ArtistMetadata>
              <Serif size="10">Donald Judd</Serif>
              <Details>
                <DetailItem>Brazilian, 1886-1973</DetailItem>
                <DetailItem>4,321 followers</DetailItem>
              </Details>
            </ArtistMetadata>
          </Col>
          <Col sm={2}>
            <FollowButton bg="black100" color="white">
              Follow
            </FollowButton>
          </Col>
        </Row>
        <Row>
          <Col>
            <Tabber>
              <TabNav>
                <Tab onClick={() => this.handleTab("Overview")}>Overview</Tab>
                <Tab onClick={() => this.handleTab("CV")}>CV</Tab>
                <Tab onClick={() => this.handleTab("Articles")}>Articles</Tab>
                <Tab onClick={() => this.handleTab("Shows")}>Shows</Tab>
                <Tab onClick={() => this.handleTab("Auction results")}>
                  Auction Results
                </Tab>
                <Tab onClick={() => this.handleTab("Related artists")}>
                  Related Articles
                </Tab>
              </TabNav>
              <TabContent>
                {(() => {
                  switch (this.state.tab) {
                    case "Overview":
                      return <Overview />
                    case "CV":
                      return <CV />
                    case "Articles":
                      return <Articles />
                    case "Shows":
                      return <Shows />
                    case "Auction results":
                      return <AuctionResults />
                    case "Related artists":
                      return <RelatedArtists />
                    default:
                      return <div />
                  }
                })()}
              </TabContent>
            </Tabber>
          </Col>
        </Row>
        <Row>
          <Col>
            <RecentlyViewed>
              <CategoryLarge>Recently viewed</CategoryLarge>
              <Slider size="small" />
            </RecentlyViewed>
          </Col>
        </Row>
        <Row>
          <Col>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col>
            <Footer>
              <Row>
                <Col sm={3}>
                  <Category>Buy</Category>
                  <a>Buying from Galleries FAQ</a>
                  <a>Buying from Auctions FAQ</a>
                  <a>Consign with Artsy</a>
                  <a>Artsy for Professional Buyers</a>
                </Col>
                <Col sm={3}>
                  <Category>Learn</Category>
                  <a>Education</a>
                  <a>The Art Genome Project</a>
                </Col>
                <Col sm={3}>
                  <Category>About us</Category>
                  <a>About</a>
                  <a>Blog</a>
                  <a>Jobs</a>
                  <a>Open Source</a>
                  <a>Press</a>
                  <a>Contact</a>
                  <a>Send us feedback</a>
                </Col>
                <Col sm={3}>
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

const FollowButton = styled(Button)`
  float: right;

  ${media.xs`
    float: left;
  `};
`

const ArtistMetadata = styled.div``
const Details = styled.div``
const DetailItem = styled.div``
const Tabber = styled.div``
const TabNav = styled.div`
  display: flex;
`
const Tab = styled.div`
  cursor: pointer;
  padding: 20px;
  padding-left: 0;
  text-decoration: underline;
`
const TabContent = styled.div``
const Category = styled.div``
const CategoryLarge = styled.div``
const RecentlyViewed = styled.div``
const Footer = styled.div``
