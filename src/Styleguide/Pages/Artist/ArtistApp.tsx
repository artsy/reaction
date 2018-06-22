import React from "react"
import { Footer } from "Styleguide/Components/Footer"
import { RouterTab, RouterTabs } from "Styleguide/Components/RouterTabs"
import { Box } from "Styleguide/Elements/Box"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Separator } from "Styleguide/Elements/Separator"
import { Spacer } from "Styleguide/Elements/Spacer"
import { ArtistHeader } from "./Components/ArtistHeader"

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
          <RouterTabs>
            <RouterTab to="/" exact>
              Overview
            </RouterTab>
            <RouterTab to="/cv">CV</RouterTab>
            <RouterTab to="/articles">Articles</RouterTab>
            <RouterTab to="/shows">Shows</RouterTab>
            <RouterTab to="/auction-results">Auction results</RouterTab>
            <RouterTab to="/related-artists">Related artists</RouterTab>
          </RouterTabs>

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
