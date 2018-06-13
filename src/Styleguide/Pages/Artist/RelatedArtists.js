import React from "react"
import styled from "styled-components"
import { Col, Row } from "../../Elements/Grid"

export const RelatedArtists = () => {
  return (
    <Content>
      <Row>
        <Col>
          <RelatedArtistList>
            <Item>
              <Image>TODO: Image</Image>
              <Name>Francesca DiMattio</Name>
              <Metadata>American, b. 1979</Metadata>
              <FollowButton>Follow</FollowButton>
            </Item>
            <Item>
              <Image>TODO: Image</Image>
              <Name>Jennifer Allora & Guillermo Calzadilla</Name>
              <Metadata>American, b. 1979</Metadata>
              <FollowButton>Follow</FollowButton>
            </Item>
            <Item>
              <Image>TODO: Image</Image>
              <Name>Francesca DiMattio</Name>
              <Metadata>American, b. 1979</Metadata>
              <FollowButton>Follow</FollowButton>
            </Item>
            <Item>
              <Image>TODO: Image</Image>
              <Name>Jennifer Allora & Guillermo Calzadilla</Name>
              <Metadata>American, b. 1979</Metadata>
              <FollowButton>Follow</FollowButton>
            </Item>
            <Item>
              <Image>TODO: Image</Image>
              <Name>Francesca DiMattio</Name>
              <Metadata>American, b. 1979</Metadata>
              <FollowButton>Follow</FollowButton>
            </Item>
            <Item>
              <Image>TODO: Image</Image>
              <Name>Jennifer Allora & Guillermo Calzadilla</Name>
              <Metadata>American, b. 1979</Metadata>
              <FollowButton>Follow</FollowButton>
            </Item>
            <Item>
              <Image>TODO: Image</Image>
              <Name>Francesca DiMattio</Name>
              <Metadata>American, b. 1979</Metadata>
              <FollowButton>Follow</FollowButton>
            </Item>
            <Item>
              <Image>TODO: Image</Image>
              <Name>Jennifer Allora & Guillermo Calzadilla</Name>
              <Metadata>American, b. 1979</Metadata>
              <FollowButton>Follow</FollowButton>
            </Item>
          </RelatedArtistList>
        </Col>
      </Row>
      <Row>
        <Col>
          <Pagination>TODO: Pagination</Pagination>
        </Col>
      </Row>
    </Content>
  )
}

const Content = styled.div``
const RelatedArtistList = styled.div`
  display: flex;
  flex-flow: row wrap;
`
const Item = styled.div`
  width: 300px;
  height: 250px;
`
const Image = styled.div``
const Name = styled.div``
const Metadata = styled.div``
const FollowButton = styled.div``
const Pagination = styled.div``
