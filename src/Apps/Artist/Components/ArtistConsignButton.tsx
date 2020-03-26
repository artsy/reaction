import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { ArtistConsignButton_artist } from "__generated__/ArtistConsignButton_artist.graphql"
import { RouterLink } from "Artsy/Router/RouterLink"
import { Media } from "Utils/Responsive"
import { getConsignmentData } from "../Routes/Consign/Utils/getConsignmentData"

import {
  BorderBox,
  Box,
  Button,
  color,
  Flex,
  Image,
  Sans,
} from "@artsy/palette"

export interface ArtistConsignButtonProps {
  artist: ArtistConsignButton_artist
}

export const ArtistConsignButton: React.FC<ArtistConsignButtonProps> = props => {
  return (
    <>
      <Media at="xs">
        <ArtistConsignButtonSmall {...props} />
      </Media>
      <Media greaterThan="xs">
        <ArtistConsignButtonLarge {...props} />
      </Media>
    </>
  )
}

export const ArtistConsignButtonLarge: React.FC<ArtistConsignButtonProps> = props => {
  const { artistHasOwnConsignRoute, imageURL, headline, consignLink } = getData(
    props
  )

  return (
    <BorderBox p={1} width="100%">
      <Flex alignItems="center" width="100%" justifyContent="space-between">
        <Flex>
          {artistHasOwnConsignRoute && imageURL && (
            <Image src={imageURL} width={50} height={50} />
          )}
          <Flex flexDirection="column" justifyContent="center" pl={1}>
            <Sans size="3t" weight="medium">
              {headline}
            </Sans>
            <Box position="relative">
              <Sans size="3t" color={color("black60")}>
                Consign with Artsy
              </Sans>
            </Box>
          </Flex>
        </Flex>
        <Box>
          <RouterLink to={consignLink}>
            <Button variant="secondaryGray">Get started</Button>
          </RouterLink>
        </Box>
      </Flex>
    </BorderBox>
  )
}

export const ArtistConsignButtonSmall: React.FC<ArtistConsignButtonProps> = props => {
  const { artistHasOwnConsignRoute, imageURL, headline, consignLink } = getData(
    props
  )

  return (
    <BorderBox maxWidth={335} p={1}>
      <Flex alignItems="center">
        {artistHasOwnConsignRoute && imageURL && (
          <Image src={imageURL} width={75} height={66} />
        )}
        <Flex flexDirection="column" justifyContent="center" pl={1}>
          <Sans size="3t" weight="medium">
            {headline}
          </Sans>
          <Box top="-2px" position="relative">
            <Sans size="3t" color={color("black60")}>
              Consign with Artsy
            </Sans>
          </Box>
          <Box>
            <RouterLink to={consignLink}>
              <Button size="small" variant="secondaryGray">
                Get started
              </Button>
            </RouterLink>
          </Box>
        </Flex>
      </Flex>
    </BorderBox>
  )
}

function getData(props) {
  const {
    artist: { href, name, image },
  } = props
  const artistHasOwnConsignRoute = Boolean(getConsignmentData(href))
  const imageURL = image?.cropped?.url
  const headline = artistHasOwnConsignRoute
    ? `Sell your ${name}`
    : "Sell art from your collection"
  const consignLink = artistHasOwnConsignRoute ? `${href}/consign` : "/consign"

  return {
    artistHasOwnConsignRoute,
    imageURL,
    headline,
    consignLink,
  }
}

export const ArtistConsignButtonFragmentContainer = createFragmentContainer(
  ArtistConsignButton,
  {
    artist: graphql`
      fragment ArtistConsignButton_artist on Artist {
        name
        href
        image {
          cropped(width: 75, height: 66) {
            url
          }
        }
      }
    `,
  }
)
