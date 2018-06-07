import React from "react"
import styled from "styled-components"
import { Col, Row } from "../Elements/Grid"

export const Overview = () => {
  return (
    <Content>
      <Row>
        <Col sm={8}>
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
              <Biography>
                Donald Judd, widely regarded as one of the most significant
                American artists of the post-war period, is perhaps best-known
                for the large-scale outdoor installations and long, spacious
                interiors he designed in Marfa, Texas. His oeuvre has come to
                define what has been referred to as Minimalist art—a label the
                artist strongly objected to. His sculptures and installations,
                constructed out of industrial materials such as Plexiglas,
                concrete, and steel and arranged in precise geometric shapes,
                were intended to emphasize the purity of the objects themselves
                rather than any symbolic meaning they might have—“the simple
                expression of complex thought,” said Judd. His particular
                interest in architecture led him to design both the sculptures
                and the spaces in which they would be contained, influencing a
                generation of artists and designers from Anish Kapoor to David
                Batchelor…read more
              </Biography>
            </Col>
          </Row>
          <Row>
            <Col>
              <ConsignWork>
                <a>Consign</a> a work by this artist.
              </ConsignWork>
            </Col>
          </Row>
        </Col>
        <Col sm={4}>
          <FeaturedShow>
            <FeaturedShowImage />
            <Category>Featured show</Category>
            <ShowTitle>Brancusi: Pioneer of American Minimalism</ShowTitle>
            <ShowGallery>Paul Kasmin Gallery</ShowGallery>
            <ShowGallery>Miami, May 3 – 21, 2018</ShowGallery>
          </FeaturedShow>
        </Col>
      </Row>
      <Row>
        <Col>
          <ArtworkBrowser>
            <Row>
              <Col sm={3}>
                <Filter>
                  <FilterItem>
                    <Category>Purchase Type</Category>
                    <Checkbox>For sale</Checkbox>
                  </FilterItem>
                  <FilterItem>
                    <Category>Medium</Category>
                    <Radio>Painting</Radio>
                    <Radio>Sculpture</Radio>
                  </FilterItem>
                  <FilterItem>
                    <Category>Gallery</Category>
                  </FilterItem>
                  <FilterItem>
                    <Category>Institution</Category>
                  </FilterItem>
                  <FilterItem>
                    <Category>Time period</Category>
                  </FilterItem>
                </Filter>
              </Col>
              <Col sm={9}>
                <Sort>
                  Sort: <Bold>Recently updated</Bold>
                </Sort>
                <ArtworkGrid>
                  <ArtworkGridItem />
                  <ArtworkGridItem />
                  <ArtworkGridItem />
                  <ArtworkGridItem />
                </ArtworkGrid>
                <Pagination>
                  <PaginationButton>Prev</PaginationButton>
                  <PaginationButton>Next</PaginationButton>
                </Pagination>
              </Col>
            </Row>
          </ArtworkBrowser>
        </Col>
      </Row>
    </Content>
  )
}

// Shared
const Category = styled.div``

// Page
const Content = styled.div``
const MarketInsights = styled.div``
const DataPoint = styled.div``
const Bold = styled.div``
const SelectedExhibitions = styled.div``
const ExhibitionItem = styled.div``
const Light = styled.div``
const ViewAllButton = styled.div``
const Biography = styled.div``
const ConsignWork = styled.div``
const FeaturedShow = styled.div``
const FeaturedShowImage = styled.div``
const ShowTitle = styled.div``
const ShowGallery = styled.div``
const ArtworkBrowser = styled.div``
const Filter = styled.div``
const FilterItem = styled.div``
const Checkbox = styled.div``
const Radio = styled.div``
const Sort = styled.div``
const ArtworkGrid = styled.div``
const ArtworkGridItem = styled.div``
const Pagination = styled.div``
const PaginationButton = styled.div``
