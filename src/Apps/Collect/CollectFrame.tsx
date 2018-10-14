import { Separator } from "@artsy/palette"
import { Box, Flex } from "@artsy/palette"
import React from "react"
import { LazyLoadComponent } from "react-lazy-load-image-component"
import { HorizontalPadding } from "Styleguide/Utils/HorizontalPadding"

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
