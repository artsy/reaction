import { Box, Button, Flex, ResponsiveImage, Sans, Serif } from "@artsy/palette"
import { sampleSize } from "lodash"
import React from "react"

import { Consign_artworksByInternalID } from "__generated__/Consign_artworksByInternalID.graphql"
import { AnalyticsSchema, useTracking } from "Artsy"
import { RouterLink } from "Artsy/Router/RouterLink"
import styled from "styled-components"
import { Media } from "Utils/Responsive"
import { ArtistConsignment } from "../Utils/getConsignmentData"
import { LightPurpleColor, SectionContainer } from "./SectionContainer"

interface ArtistConsignHeaderProps {
  artistConsignment: ArtistConsignment
  artistName: string
  artworksByInternalID: Consign_artworksByInternalID
}

export const ArtistConsignHeader: React.FC<ArtistConsignHeaderProps> = props => {
  const tracking = useTracking()

  return (
    <SectionContainer background={LightPurpleColor}>
      <Media greaterThan="xs">
        {classNames => {
          return (
            <Box
              className={classNames}
              position="absolute"
              width="100%"
              height="100%"
            >
              <HeaderImages artworksByInternalID={props.artworksByInternalID} />
            </Box>
          )
        }}
      </Media>

      <Box textAlign="center">
        <Box>
          <Serif element="h1" size={["10", "12"]}>
            Sell Works by <br />
            {props.artistName}
          </Serif>
        </Box>

        <Box mt={3} mb={4}>
          <Sans element="h2" size="4t">
            With Artsy's expert guidance, selling is simple
          </Sans>
        </Box>

        <Box>
          <RouterLink
            to="/consign/submission"
            onClick={() => {
              tracking.trackEvent({
                action_type: AnalyticsSchema.ActionType.Click,
                context_module: AnalyticsSchema.ContextModule.SellWorksBy,
                subject: AnalyticsSchema.Subject.RequestPriceEstimate,
              })
            }}
          >
            <Button>Request a price estimate</Button>
          </RouterLink>
        </Box>
      </Box>
    </SectionContainer>
  )
}

/**
 * Displays a random set of images for a given consignment artist.
 *
 * Some notes about implementation:
 *
 * 1) Due to responsiveness and SSR we need to dynamically scale the width and the
 *    height of the image based on overall width of the container.
 * 2) For this we use our `<ResponsiveImage>` component.
 * 3) However, this component achieves responsivity by forcing padding within a
 *    container and then applying a "fit" to a background image.
 * 4) Therefore, conventional borders cannot be applied, and a CSS filter is
 *    required. This is based upon pixel data, and border faked.
 * 5) The pixel data comes from a second image, sitting below the first, with
 *    its brightness turned to -100.
 * 5) It's not perfect, and the layout needs to also account for variable
 *    aspect ratios.
 * 6) The positioning CSS is also tricky, so please forgive...
 */
const HeaderImages = (props: {
  artworksByInternalID: Consign_artworksByInternalID
}) => {
  const getRandomImages = () => {
    const [left, right] = sampleSize(props.artworksByInternalID, 2)

    // Layout requires that we only use vertically oriented images
    const widthExceedsHeight = ({ image }) => {
      return image.resized.width > image.resized.height
    }
    if (widthExceedsHeight(left)) {
      return getRandomImages()
    }
    if (widthExceedsHeight(right)) {
      return getRandomImages()
    }

    return [left, right]
  }

  const [leftImage, rightImage] = getRandomImages()

  return (
    <HeaderImageContainer>
      <Flex width="100%" justifyContent="space-between">
        <LeftImage>
          {/*
            Create a fake border around image using pixel data and filter,
            then darken it.
          */}
          <ResponsiveImage
            src={leftImage.image.resized.url}
            width={leftImage.image.resized.width}
            style={{
              transformOrigin: "center",
              filter: "invert(100%) brightness(-100%)",
              backgroundPosition: "left",
            }}
          />

          {/*
            Then shrink the second image slightly, which brings out the border
            described above.
          */}
          <ResponsiveImage
            src={leftImage.image.resized.url}
            width={leftImage.image.resized.width}
            style={{
              position: "absolute",
              top: 0,
              left: -4,
              transformOrigin: "center",
              backgroundPosition: "left",
              transform: "scaleX(.97) scaleY(.96",
            }}
          />
        </LeftImage>
        <RightImage>
          {/*
            Border
          */}
          <ResponsiveImage
            src={rightImage.image.resized.url}
            width={rightImage.image.resized.width}
            style={{
              transformOrigin: "center",
              filter: "invert(100%) brightness(-100%)",
            }}
          />

          {/*
            And the image
          */}
          <ResponsiveImage
            src={rightImage.image.resized.url}
            width={rightImage.image.resized.width}
            style={{
              position: "absolute",
              top: 0,
              transformOrigin: "center",
              transform: "scaleX(.95) scaleY(.96",
            }}
          />
        </RightImage>
      </Flex>
    </HeaderImageContainer>
  )
}

const LeftImage = styled(Box)`
  width: 25%;
  left: -3%;
  position: absolute;
  transform-origin: center center;
  transform: translateY(-50%);
`

const RightImage = styled(Box)`
  width: 25%;
  position: absolute;
  top: 20%;
  right: 0%;
  transform-origin: center center;
  transform: translateY(-50%);
`

const HeaderImageContainer = styled(Flex).attrs({
  flexDirection: "column",
  justifyContent: "center",
})`
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
`
