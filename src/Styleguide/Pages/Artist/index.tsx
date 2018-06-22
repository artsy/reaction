import { Sans } from "@artsy/palette"
import React from "react"
import { PreloadLink } from "Router/PreloadLink"
import { StorybooksRouter } from "Router/StorybooksRouter"
import styled from "styled-components"
import { borders, themeGet } from "styled-system"
import { Footer } from "Styleguide/Components/Footer"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
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

const Navigation = ({ children }) => {
  return (
    <React.Fragment>
      <RouterTabs>
        <PreloadLink to="/" exact>
          <Sans size="3t" weight="medium">
            Overview
          </Sans>
        </PreloadLink>
        <PreloadLink to="/cv">
          <Sans size="3t" weight="medium">
            CV
          </Sans>
        </PreloadLink>
        <PreloadLink to="/articles">
          <Sans size="3t" weight="medium">
            Articles
          </Sans>
        </PreloadLink>
        <PreloadLink to="/shows">
          <Sans size="3t" weight="medium">
            Shows
          </Sans>
        </PreloadLink>
        <PreloadLink to="/auction-results">
          <Sans size="3t" weight="medium">
            Auction results
          </Sans>
        </PreloadLink>
        <PreloadLink to="/related-artists">
          <Sans size="3t" weight="medium">
            Related artists
          </Sans>
        </PreloadLink>
      </RouterTabs>

      <Box pt={3}>{children}</Box>
    </React.Fragment>
  )
}

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
                Component: Navigation,
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

const RouterTabs = styled(Flex)`
  border-bottom: 1px solid ${themeGet("colors.black10")};

  a {
    color: ${themeGet("colors.black30")};
    text-decoration: none;
    cursor: pointer;
    padding-bottom: 13px;
    margin-bottom: -1px;
    margin-right: 20px;
    white-space: nowrap;
    ${borders};

    &.active {
      color: ${themeGet("colors.black100")};
      pointer-events: none;
      padding-bottom: 13px;
      margin-bottom: -1px;
      margin-right: 20px;
      white-space: nowrap;
      border-bottom: 1px solid ${themeGet("colors.black60")};
    }
  }
`
