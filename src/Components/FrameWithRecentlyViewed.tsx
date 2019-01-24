import { Separator } from "@artsy/palette"
import { Box, Flex } from "@artsy/palette"
import { ContextConsumer } from "Artsy/SystemContext"
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

export const FrameWithRecentlyViewed: React.SFC<Props> = ({ children }) => {
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

        <ContextConsumer>
          {({ isEigen }) =>
            isEigen ? null : (
              <Box>
                <Footer />
              </Box>
            )
          }
        </ContextConsumer>
      </Flex>
    </HorizontalPadding>
  )
}
