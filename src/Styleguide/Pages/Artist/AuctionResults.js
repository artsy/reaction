import React from "react"
import styled from "styled-components"
import { Col, Row } from "../../Elements/Grid"

export const AuctionResults = () => {
  return (
    <Content>
      <Row>
        <Col sm={3}>
          <Row>
            <Col>
              <Category>939 Results</Category>
            </Col>
          </Row>
          <Row>
            <Col>
              <Sort>Price (highest)</Sort>
            </Col>
          </Row>
        </Col>
        <Col sm={7}>
          <Row>
            <Col sm={4}>
              <Category>Work</Category>
            </Col>
            <Col sm={4}>
              <Category>Sale of</Category>
            </Col>
            <Col sm={12}>
              <Category>Price (Sale/Estimate)</Category>
            </Col>
          </Row>
          <Row>
            <Col>
              <Results>
                <Row>
                  <Col sm={4}>
                    <Result>
                      <Image>TODO: Image</Image>
                      <Metadata>
                        <Title>Plan B, 2011</Title>
                        <Dimensions>
                          14 1/2 × 76 1/2 × 25 1/2 in 30 × 21.8 × 16.5 cm
                        </Dimensions>
                        <Materials>
                          anodized aluminum clear and black with amber and black
                          Plexiglas bottom...
                        </Materials>
                      </Metadata>
                    </Result>
                  </Col>
                  <Col sm={4}>
                    <Gallery>Christie’s</Gallery>
                    <Date>February 10, 2015</Date>
                    <Button>View details</Button>
                  </Col>
                  <Col sm={4}>
                    <LoginPriceButton>LOG IN TO SEE PRICE</LoginPriceButton>
                  </Col>
                </Row>
                <Row>
                  <Col sm={4}>
                    <Result>
                      <Image>TODO: Image</Image>
                      <Metadata>
                        <Title>Plan B, 2011</Title>
                        <Dimensions>
                          14 1/2 × 76 1/2 × 25 1/2 in 30 × 21.8 × 16.5 cm
                        </Dimensions>
                        <Materials>
                          anodized aluminum clear and black with amber and black
                          Plexiglas bottom...
                        </Materials>
                      </Metadata>
                    </Result>
                  </Col>
                  <Col sm={4}>
                    <Gallery>Christie’s</Gallery>
                    <Date>February 10, 2015</Date>
                    <Button>View details</Button>
                  </Col>
                  <Col sm={4}>
                    <LoginPriceButton>LOG IN TO SEE PRICE</LoginPriceButton>
                  </Col>
                </Row>
                <Row>
                  <Col sm={4}>
                    <Result>
                      <Image>TODO: Image</Image>
                      <Metadata>
                        <Title>Plan B, 2011</Title>
                        <Dimensions>
                          14 1/2 × 76 1/2 × 25 1/2 in 30 × 21.8 × 16.5 cm
                        </Dimensions>
                        <Materials>
                          anodized aluminum clear and black with amber and black
                          Plexiglas bottom...
                        </Materials>
                      </Metadata>
                    </Result>
                  </Col>
                  <Col sm={4}>
                    <Gallery>Christie’s</Gallery>
                    <Date>February 10, 2015</Date>
                    <Button>View details</Button>
                  </Col>
                  <Col sm={4}>
                    <LoginPriceButton>LOG IN TO SEE PRICE</LoginPriceButton>
                  </Col>
                </Row>
              </Results>
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
          Results provided by <br />
          CHRISTIE's Sotheby's PHILLIPS
        </Col>
      </Row>
    </Content>
  )
}

const Content = styled.div``
const Category = styled.div``
const Sort = styled.div``
const Results = styled.div``
const Result = styled.div``
const Image = styled.div``
const Metadata = styled.div``
const Title = styled.div``
const Dimensions = styled.div``
const Materials = styled.div``
const Gallery = styled.div``
const Date = styled.div``
const Button = styled.div``
const LoginPriceButton = styled.div``
const Pagination = styled.div``
