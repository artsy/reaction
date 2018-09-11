import React from "react"
import styled from "styled-components"
import { Box, Serif } from "@artsy/palette"
import { Col, Row } from "Styleguide/Elements/Grid"
import { ReadMore } from "Styleguide/Components"

export const AboutTheWork = () => {
  return (
    <Content>
      <Row>
        <Col>
          <AboutWork mb={3}>
            <Serif size="3">Series: Lorem Ipsum Dolor</Serif>
            <Serif size="3">Signature: Signed and numbered</Serif>
            <Serif size="3">Publisher: Factory Editions, New York</Serif>
            <Serif size="3">Manufacturer: Mfg Group</Serif>
            <Serif size="3">Provenance: Peter Freeman Inc., New York</Serif>
            <Serif size="3">
              Image rights: Courtesy of the artist and Salon 94
            </Serif>
          </AboutWork>
          <ReadMore
            text="
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore"
          />
        </Col>
      </Row>
    </Content>
  )
}

const Content = Box
const AboutWork = Box
const AdminBlurb = Box
const Text = styled.div``
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
