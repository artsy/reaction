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
import { AnalyticsSchema, useTracking } from "Artsy"

export interface ArtistConsignButtonProps {
  artist: ArtistConsignButton_artist
}

export const ArtistConsignButton: React.FC<ArtistConsignButtonProps> = ({
  artist,
}) => {
  const tracking = useTracking()

  const trackGetStartedClick = ({ destinationPath }) => {
    tracking.trackEvent({
      context_page: AnalyticsSchema.PageName.ArtistPage,
      context_page_owner_id: artist.internalID,
      context_page_owner_slug: artist.slug,
      context_page_owner_type: AnalyticsSchema.OwnerType.Artist,
      context_module: AnalyticsSchema.ContextModule.ArtistConsignment,
      subject: AnalyticsSchema.Subject.GetStarted,
      destination_path: destinationPath,
    })
  }

  const props = { artist, trackGetStartedClick }

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

interface Tracking {
  trackGetStartedClick: (props: { destinationPath: string }) => void
}

export const ArtistConsignButtonLarge: React.FC<ArtistConsignButtonProps &
  Tracking> = props => {
  const { artistHasOwnConsignRoute, imageURL, headline, consignURL } = getData(
    props
  )

  return (
    <RouterLink
      to={consignURL}
      style={{
        textDecoration: "none",
      }}
      onClick={() => {
        props.trackGetStartedClick({
          destinationPath: consignURL,
        })
      }}
    >
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
            <Button variant="secondaryGray">Get started</Button>
          </Box>
        </Flex>
      </BorderBox>
    </RouterLink>
  )
}

export const ArtistConsignButtonSmall: React.FC<ArtistConsignButtonProps &
  Tracking> = props => {
  const { artistHasOwnConsignRoute, imageURL, headline, consignURL } = getData(
    props
  )

  return (
    <RouterLink
      to={consignURL}
      style={{
        textDecoration: "none",
      }}
      onClick={() => {
        props.trackGetStartedClick({
          destinationPath: consignURL,
        })
      }}
    >
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
              <Button size="small" variant="secondaryGray">
                Get started
              </Button>
            </Box>
          </Flex>
        </Flex>
      </BorderBox>
    </RouterLink>
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
  const consignURL = artistHasOwnConsignRoute ? `${href}/consign` : "/consign"

  return {
    artistHasOwnConsignRoute,
    imageURL,
    headline,
    consignURL,
  }
}

export const ArtistConsignButtonFragmentContainer = createFragmentContainer(
  ArtistConsignButton,
  {
    artist: graphql`
      fragment ArtistConsignButton_artist on Artist {
        internalID
        slug
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
