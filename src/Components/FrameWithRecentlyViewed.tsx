import { Separator } from "@artsy/palette"
import { Box, Flex } from "@artsy/palette"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { ContextConsumer } from "Artsy/SystemContext"
import React from "react"
import { LazyLoadComponent } from "react-lazy-load-image-component"

import {
  Footer,
  RecentlyViewedQueryRenderer as RecentlyViewed,
} from "Components/v2"

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
