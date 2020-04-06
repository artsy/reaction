import { Box, Flex, ResponsiveImage } from "@artsy/palette"
import { ArtistConsignHeaderImages_artist } from "__generated__/ArtistConsignHeaderImages_artist.graphql"
import { sampleSize } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

type Artworks = ArtistConsignHeaderImages_artist["targetSupply"]["microfunnel"]["artworks"]

interface HeaderImageProps {
  artist: ArtistConsignHeaderImages_artist
}

export const ArtistConsignHeaderImages: React.FC<HeaderImageProps> = props => {
  const { error, leftImage, rightImage } = getRandomImages(
    props.artist.targetSupply.microfunnel.artworks
  )
  if (error) {
    return null
  }

  return (
    <HeaderImageContainer>
      <Flex width="100%" justifyContent="space-between">
        <LeftImage>
          <LeftImageBorder {...leftImage} />
          <LeftImagePhoto {...leftImage} />
        </LeftImage>
        <RightImage>
          <RightImageBorder {...rightImage} />
          <RightImagePhoto {...rightImage} />
        </RightImage>
      </Flex>
    </HeaderImageContainer>
  )
}

export const ArtistConsignHeaderImagesFragmentContainer = createFragmentContainer(
  ArtistConsignHeaderImages,
  {
    artist: graphql`
      fragment ArtistConsignHeaderImages_artist on Artist {
        targetSupply {
          microfunnel {
            artworks {
              artwork {
                image {
                  resized(height: 395) {
                    width
                    height
                    url
                  }
                }
                ...FillwidthItem_artwork
              }
            }
          }
        }
      }
    `,
  }
)

/**
 * Iterate over "Recently Purchased" artworks and randomly select two. If there
 * are no images found, or the dimension requirements are not suitable, return
 * an error indicator and bail.
 */
export const getRandomImages = (artworks: Artworks, loop: number = 0) => {
  try {
    if (loop > 100) {
      throw new Error("No suitable images found, exiting")
    }

    // Layout requires that we only use vertically oriented images
    const widthExceedsHeight = ({ artwork }) => {
      return artwork.image.resized.width > artwork.image.resized.height
    }

    const [leftImage, rightImage] = sampleSize(artworks, 2)

    if (widthExceedsHeight(leftImage)) {
      return getRandomImages(artworks, loop++)
    }
    if (widthExceedsHeight(rightImage)) {
      return getRandomImages(artworks, loop++)
    }

    return {
      leftImage: leftImage.artwork,
      rightImage: rightImage.artwork,
    }
  } catch {
    return {
      error: true,
    }
  }
}

/**
 * Some notes about implementation below:
 *
 * -) Due to responsiveness and SSR we need to dynamically scale the width and
 *    the height of the image based on overall width of the container.
 *
 * -) For this we use our `<ResponsiveImage>` component.
 *
 * -) However, this component achieves responsivity by forcing padding within a
 *    container and then applying a "fit" to a background image.
 *
 * -) Therefore, conventional borders cannot be applied, and a CSS filter is
 *    required. This is based upon pixel data, and border faked.
 *
 * -) The pixel data comes from a second image, sitting below the first, with
 *    its brightness turned to -100.
 *
 * -) It's not perfect, and the layout needs to also account for variable
 *    aspect ratios.
 *
 * -) The positioning CSS is also tricky, so please forgive...
 */

interface ImageProps {
  image: Artworks[0]["artwork"]["image"]
}

const LeftImageBorder: React.FC<ImageProps> = ({ image }) => {
  return (
    <ResponsiveImage
      src={image.resized.url}
      width={image.resized.width}
      style={{
        backgroundPosition: "left",
        filter: "invert(100%) brightness(-100%)",
        transformOrigin: "center",
      }}
    />
  )
}

/**
 * Then shrink the second image slightly, which brings out the border described
 * above.
 */
const LeftImagePhoto: React.FC<ImageProps> = ({ image }) => {
  return (
    <ResponsiveImage
      src={image.resized.url}
      width={image.resized.width}
      style={{
        backgroundPosition: "left",
        position: "absolute",
        left: -4,
        top: 0,
        transform: "scaleX(.975) scaleY(.965)",
        transformOrigin: "center",
      }}
    />
  )
}

const RightImageBorder: React.FC<ImageProps> = ({ image }) => {
  return (
    <ResponsiveImage
      src={image.resized.url}
      width={image.resized.width}
      style={{
        filter: "invert(100%) brightness(-100%)",
        transformOrigin: "center",
      }}
    />
  )
}

const RightImagePhoto: React.FC<ImageProps> = ({ image }) => {
  return (
    <ResponsiveImage
      src={image.resized.url}
      width={image.resized.width}
      style={{
        position: "absolute",
        top: 0,
        transform: "scaleX(.955) scaleY(.965)",
        transformOrigin: "center",
      }}
    />
  )
}

const LeftImage = styled(Box)`
  left: -3%;
  position: absolute;
  transform-origin: center center;
  transform: translateY(-50%);
  width: 25%;
`

const RightImage = styled(Box)`
  position: absolute;
  right: 0%;
  top: 20%;
  transform-origin: center center;
  transform: translateY(-50%);
  width: 25%;
`

const HeaderImageContainer = styled(Flex).attrs({
  flexDirection: "column",
  justifyContent: "center",
})`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
`
