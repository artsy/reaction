import React from "react"
import { StorybooksRouter } from "Router/StorybooksRouter"
import { Footer } from "Styleguide/Components/Footer"
import { RouterTab, RouterTabs } from "Styleguide/Components/RouterTabs"
import { Box } from "Styleguide/Elements/Box"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Separator } from "Styleguide/Elements/Separator"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Boot } from "Styleguide/Pages/Boot"
import { ArtistHeader } from "./Components/ArtistHeader"
import { ArticlesRoute } from "./Routes/Articles"
import { AuctionResultsRoute } from "./Routes/AuctionResults"
import { CVRoute } from "./Routes/CV"
import { Overview } from "./Routes/Overview"
import { RelatedArtistsRoute } from "./Routes/RelatedArtists"
import { ShowsRoute } from "./Routes/Shows"

export const Artist = () => {
  return (
    <Boot>
      <Row>
        <Col>
          <ArtistHeader />
        </Col>
      </Row>

      <Spacer mb={3} />

      <Row>
        <Col>
          <StorybooksRouter
            routes={[
              {
                path: "/",
                Component: ({ children }) => {
                  return (
                    <React.Fragment>
                      <RouterTabs>
                        <RouterTab to="/" exact>
                          Overview
                        </RouterTab>
                        <RouterTab to="/cv">CV</RouterTab>
                        <RouterTab to="/articles">Articles</RouterTab>
                        <RouterTab to="/shows">Shows</RouterTab>
                        <RouterTab to="/auction-results">
                          Auction results
                        </RouterTab>
                        <RouterTab to="/related-artists">
                          Related artists
                        </RouterTab>
                      </RouterTabs>

                      <Box pt={3}>{children}</Box>
                    </React.Fragment>
                  )
                },
                children: [
                  {
                    path: "/",
                    Component: Overview,
                  },
                  {
                    path: "cv",
                    Component: CVRoute,
                  },
                  {
                    path: "articles",
                    Component: ArticlesRoute,
                  },
                  {
                    path: "shows",
                    Component: ShowsRoute,
                  },
                  {
                    path: "auction-results",
                    Component: AuctionResultsRoute,
                  },
                  {
                    path: "related-artists",
                    Component: RelatedArtistsRoute,
                  },
                ],
              },
            ]}
          />
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
    </Boot>
  )
}
