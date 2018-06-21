import { Serif } from "@artsy/palette"
import React from "react"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { ResponsiveImage } from "Styleguide/Elements/Image"
import { Separator } from "Styleguide/Elements/Separator"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Responsive } from "Styleguide/Utils/Responsive"

export const AuctionItem = props => {
  return (
    <Row>
      <Responsive>
        {({ xs, sm, md }) => {
          if (xs) {
            return <ExtraSmallAuctionItem />
          } else if (sm || md) {
            return <SmallAuctionItem {...props} />
          } else {
            return <LargeAuctionItem {...props} />
          }
        }}
      </Responsive>

      <Col>
        <Box pt={2} pb={1}>
          <Separator />
        </Box>
      </Col>
    </Row>
  )
}

const LargeAuctionItem = props => {
  return (
    <React.Fragment>
      <Col sm={1}>
        <Box maxWidth="70px" width="70px" height="auto">
          <ResponsiveImage src="https://picsum.photos/70/105/?random" />
        </Box>
      </Col>
      <Col sm={4}>
        <Box pl={1} pr={2}>
          <Serif size="2" italic>
            Plan B, 2011
          </Serif>
          <Serif size="2">14 1/2 x 76 1/2 x 25 1/2 in</Serif>
          <Spacer pt={1} />
          <Serif size="1" color="black60">
            anodized aluminum clear and black with amber and black Plexiglass
            bottom...
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

const SmallAuctionItem = props => {
  return (
    <React.Fragment>
      <Col sm={6}>
        <Flex>
          <Box maxWidth="70px" width="70px" height="auto">
            <ResponsiveImage src="https://picsum.photos/70/105/?random" />
          </Box>

          <Spacer mr={2} />

          <Box pr={6}>
            <Serif size="2" italic>
              Plan B, 2011
            </Serif>
            <Serif size="2">14 1/2 x 76 1/2 x 25 1/2 in</Serif>
            <Spacer pt={1} />
            <Serif size="1" color="black60">
              anodized aluminum clear and black with amber and black Plexiglass
              bottom...
            </Serif>
          </Box>
        </Flex>
      </Col>
      <Col sm={6}>
        <Serif size="2">Sale: GBP 1,408,000</Serif>
        <Serif size="2" color="black60">
          Est: GBP 400,000 - GBP 600,000
        </Serif>
      </Col>
    </React.Fragment>
  )
}

const ExtraSmallAuctionItem = props => {
  return (
    <React.Fragment>
      <Col>
        <Flex>
          <Box maxWidth="30px" width="30px" height="auto">
            <ResponsiveImage src="https://picsum.photos/70/105/?random" />
          </Box>

          <Spacer mr={2} />

          <Box>
            <Serif size="2" italic>
              Plan B, 2011
            </Serif>
            <Serif size="2">14 1/2 x 76 1/2 x 25 1/2 in</Serif>

            <Spacer pb={1} />

            <Serif size="2">Sotheby’s</Serif>
            <Serif size="2" color="black60">
              February 10, 2015
            </Serif>

            <Spacer pb={1} />

            <Serif size="2">Sale: GBP 1,408,000</Serif>
            <Serif size="2" color="black60">
              Est: GBP 400,000 - GBP 600,000
            </Serif>
          </Box>
        </Flex>
      </Col>
    </React.Fragment>
  )
}
