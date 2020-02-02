import { Separator } from "@artsy/palette"
import { Box, Flex } from "@artsy/palette"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { useSystemContext } from "Artsy"
import React from "react"
import { LazyLoadComponent } from "react-lazy-load-image-component"

import { Footer } from "Components/v2/Footer"
import { RecentlyViewedQueryRenderer as RecentlyViewed } from "Components/v2/RecentlyViewed"

export interface Props {
  name?: string
}

export const FrameWithRecentlyViewed: React.SFC<Props> = ({ children }) => {
  const { isEigen } = useSystemContext()
  const showFooter = !isEigen

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

        {showFooter && (
          <Box>
            <Footer />
          </Box>
        )}
      </Flex>
    </HorizontalPadding>
  )
}
