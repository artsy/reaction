import React from "react"
import { Footer } from "Styleguide/Components/Footer"
import { Box } from "Styleguide/Elements/Box"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Separator } from "Styleguide/Elements/Separator"
import { Spacer } from "Styleguide/Elements/Spacer"
import { ArtistHeader } from "./Components/ArtistHeader"
import { Navigation } from "./Navigation"

export const ArtistApp = ({ children }) => {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <ArtistHeader />
        </Col>
      </Row>

      <Spacer mb={3} />

      <Row>
        <Col>
          <Navigation />
          <Spacer mb={3} />

          {children}
        </Col>
      </Row>

      <Box my={3}>
        <Separator />
      </Box>

      <Row>
        <Col>
          <Footer />
        </Col>
      </Row>
    </React.Fragment>
  )
}
