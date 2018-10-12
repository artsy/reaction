import { Separator } from "@artsy/palette"
import { Box, Flex } from "@artsy/palette"
// import { CollectApp_viewer } from "__generated__/CollectApp_viewer.graphql"
import React from "react"
import { LazyLoadComponent } from "react-lazy-load-image-component"
// import { createFragmentContainer, graphql } from "react-relay"
import { HorizontalPadding } from "Styleguide/Utils/HorizontalPadding"
// import { ArtworkGridFragmentContainer as ArtworkGrid } from "./Components/ArtworkGrid"

import {
  Footer,
  RecentlyViewedQueryRenderer as RecentlyViewed,
} from "Styleguide/Components"

export interface Props {
  name?: string
}

export const CollectFrame: React.SFC<Props> = ({ children }) => {
  return (
    <HorizontalPadding>
      <Flex flexDirection="column">
        {/* <Box mt={3} mb={4}>
          <Serif size="8">Collect Art &amp; Design Online</Serif>
        </Box> */}
        {/* <ArtworkGrid viewer={this.props.viewer} /> */}
        {children}

        {typeof window !== "undefined" && (
          <LazyLoadComponent threshold={1000}>
            <RecentlyViewed />
          </LazyLoadComponent>
        )}
        <Separator mt={6} mb={3} />

        <Box>
          <Footer />
        </Box>
      </Flex>
    </HorizontalPadding>
  )
}
