import { Sans, Serif } from "@artsy/palette"
import React from "react"
import { Box } from "Styleguide/Elements/Box"
import { Col, Row } from "Styleguide/Elements/Grid"
import { ResponsiveImage } from "Styleguide/Elements/Image"
import { LargeSelect } from "Styleguide/Elements/Select"
import { Separator } from "Styleguide/Elements/Separator"
import { Spacer } from "Styleguide/Elements/Spacer"
import { selectProps } from "Styleguide/Pages/Fixtures/Select"
import { Responsive } from "Styleguide/Utils/Responsive"

const TableColumns = () => {
  return (
    <Responsive>
      {({ xs, sm, md }) => {
        if (xs || sm || md) {
          return (
            <React.Fragment>
              <Col sm={6}>
                <Sans size="2" weight="medium">
                  Work
                </Sans>
              </Col>
              <Col sm={6}>
                <Sans size="2" weight="medium">
                  Price
                </Sans>
              </Col>
            </React.Fragment>
          )
        } else {
          return (
            <React.Fragment>
              <Col sm={5}>
                <Sans size="2" weight="medium">
                  Work
                </Sans>
              </Col>
              <Col sm={3}>
                <Sans size="2" weight="medium">
                  Sale
                </Sans>
              </Col>
              <Col sm={4}>
                <Sans size="2" weight="medium">
                  Price
                </Sans>
              </Col>
            </React.Fragment>
          )
        }
      }}
    </Responsive>
  )
}

const TableContent = () => {
  return (
    <Responsive>
      {({ xs, sm, md }) => {
        if (xs || sm || md) {
          return (
            <React.Fragment>
              <Col sm={1}>
                <Box maxWidth="70px" width="70px" height="auto">
                  <ResponsiveImage src="https://picsum.photos/70/105/?random" />
                </Box>
              </Col>
              <Col sm={5}>
                <Box pr={6}>
                  <Serif size="2" italic>
                    Plan B, 2011
                  </Serif>
                  <Serif size="2">14 1/2 x 76 1/2 x 25 1/2 in</Serif>
                  <Spacer pt={1} />
                  <Serif size="1" color="black60">
                    anodized aluminum clear and black with amber and black
                    Plexiglass bottom...
                  </Serif>
                </Box>
              </Col>
              <Col sm={6}>
                <Serif size="2">Sale: GBP 1,408,000</Serif>
                <Serif size="2" color="black60">
                  Est: GBP 400,000 - GBP 600,000
                </Serif>
              </Col>
            </React.Fragment>
          )
        } else {
          return (
            <React.Fragment>
              <Col sm={1}>
                <Box maxWidth="70px" width="70px" height="auto">
                  <ResponsiveImage src="https://picsum.photos/70/105/?random" />
                </Box>
              </Col>
              <Col sm={4}>
                <Box pr={2}>
                  <Serif size="2" italic>
                    Plan B, 2011
                  </Serif>
                  <Serif size="2">14 1/2 x 76 1/2 x 25 1/2 in</Serif>
                  <Spacer pt={1} />
                  <Serif size="1" color="black60">
                    anodized aluminum clear and black with amber and black
                    Plexiglass bottom...
                  </Serif>
                </Box>
              </Col>
              <Col sm={3}>
                <Box pt={1} pr={2}>
                  <Serif size="2">Sotheby’s</Serif>
                  <Serif size="2" color="black60">
                    February 10, 2015
                  </Serif>
                  <Serif size="2" color="black60">
                    <a href="#">Full description</a>
                  </Serif>
                </Box>
              </Col>
              <Col sm={4}>
                <Serif size="2">Sale: GBP 1,408,000</Serif>
                <Serif size="2" color="black60">
                  Est: GBP 400,000 - GBP 600,000
                </Serif>
              </Col>
            </React.Fragment>
          )
        }
      }}
    </Responsive>
  )
}

export const AuctionResults = () => {
  return (
    <React.Fragment>
      <Row>
        <Col sm={2} pr={2}>
          <Row>
            <Col>
              <Sans size="2" weight="medium">
                939 Results
              </Sans>
            </Col>
          </Row>

          <Box pt={0.5}>
            <Separator />
          </Box>

          <Row>
            <Col>
              <LargeSelect {...selectProps} />
            </Col>
          </Row>
        </Col>

        <Col sm={10}>
          <Row>
            <TableColumns />
          </Row>

          <Box pt={0.5}>
            <Separator />
          </Box>

          <Row>
            <TableContent />
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  )
}
