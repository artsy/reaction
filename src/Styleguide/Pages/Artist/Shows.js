import React from "react"
import styled from "styled-components"
import { Col, Row } from "../../Elements/Grid"

export const Shows = () => {
  return (
    <Content>
      <Row>
        <Col>
          <Row>
            <Col>
              <Category>Currently on view</Category>
            </Col>
          </Row>
          <Row>
            <Col>
              <ShowBlocks>
                <Show>
                  <Image>TODO: Image</Image>
                  <Title>Room With Its Own Rules</Title>
                  <Gallery>Toth Gallery</Gallery>
                  <Location>Miami, May 30 – Jun 21</Location>
                </Show>
                <Show>
                  <Image>TODO: Image</Image>
                  <Title>Paolo Ventura: La Citta Bianca</Title>
                  <Gallery>Bugno Art Gallery</Gallery>
                  <Location>Venice, May 26 – Aug 31, 2018</Location>
                </Show>
                <Show>
                  <Image>TODO: Image</Image>
                  <Title>Room With Its Own Rules</Title>
                  <Gallery>Toth Gallery</Gallery>
                  <Location>Miami, May 30 – Jun 21</Location>
                </Show>
                <Show>
                  <Image>TODO: Image</Image>
                  <Title>Paolo Ventura: La Citta Bianca</Title>
                  <Gallery>Bugno Art Gallery</Gallery>
                  <Location>Venice, May 26 – Aug 31, 2018</Location>
                </Show>
              </ShowBlocks>
            </Col>
          </Row>
          <Row>
            <Col>
              <Pagination>TODO: Pagination</Pagination>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <Row>
            <Col>
              <Category>Upcoming</Category>
            </Col>
          </Row>
          <Row>
            <Col>
              <ShowList>
                <ShowListItem>
                  <Row>
                    <Col sm={3}>May 22-29, 2018</Col>
                    <Col sm={6}>
                      <Title>
                        Brookhart Jonquil: Endless Light in an Endless Night
                      </Title>
                      <Gallery>Toth Gallery</Gallery>
                    </Col>
                    <Col sm={3}>
                      <Location>London</Location>
                    </Col>
                  </Row>
                </ShowListItem>
              </ShowList>
            </Col>
          </Row>
          <Row>
            <Col>
              <Pagination>TODO: Pagination</Pagination>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <Row>
            <Col>
              <Category>Past</Category>
            </Col>
          </Row>
          <Row>
            <Col>
              <ShowList>
                <ShowListItem>
                  <Row>
                    <Col sm={3}>May 22-29, 2018</Col>
                    <Col sm={6}>
                      <Title>
                        Brookhart Jonquil: Endless Light in an Endless Night
                      </Title>
                      <Gallery>Toth Gallery</Gallery>
                    </Col>
                    <Col sm={3}>
                      <Location>London</Location>
                    </Col>
                  </Row>
                </ShowListItem>
              </ShowList>
            </Col>
          </Row>
          <Row>
            <Col>
              <Pagination>TODO: Pagination</Pagination>
            </Col>
          </Row>
        </Col>
      </Row>
    </Content>
  )
}

const Content = styled.div``
const Category = styled.div``
const ShowBlocks = styled.div``
const Show = styled.div``
const Image = styled.div``
const Title = styled.div``
const Gallery = styled.div``
const Location = styled.div``
const Pagination = styled.div``
const ShowList = styled.div``
const ShowListItem = styled.div``
