import {
  Box,
  ChevronIcon,
  Col,
  Flex,
  Row,
  Sans,
  Separator,
  Spacer,
} from "@artsy/palette"
import { ArtistApp_artist } from "__generated__/ArtistApp_artist.graphql"
import { ArtistMetaFragmentContainer as ArtistMeta } from "Apps/Artist/Components/ArtistMeta"
import { NavigationTabsFragmentContainer as NavigationTabs } from "Apps/Artist/Components/NavigationTabs"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { useTracking } from "Artsy"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { findCurrentRoute } from "Artsy/Router/Utils/findCurrentRoute"
import { Footer } from "Components/Footer"
import { RecentlyViewedQueryRenderer as RecentlyViewed } from "Components/RecentlyViewed"
import { Match } from "found"
import React from "react"
import { LazyLoadComponent } from "react-lazy-load-image-component"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistHeaderFragmentContainer as ArtistHeader } from "./Components/ArtistHeader"
import { StyledLink } from "./Components/StyledLink"

export interface ArtistAppProps {
  artist: ArtistApp_artist
  params: {
    artistID: string
  }
  match: Match
}

export const ArtistApp: React.FC<ArtistAppProps> = props => {
  const { artist, children } = props

  const { trackEvent } = useTracking()

  const route = findCurrentRoute(props.match)

  return (
    <AppContainer>
      <ArtistMeta artist={artist} />
      {route.displayNavigationTabs && (
        <Row>
          <Col>
            <ArtistHeader artist={artist} />
          </Col>
        </Row>
      )}

      <HorizontalPadding>
        <Spacer mb={3} />

        <Row>
          <Col>
            {/*
              Page with tabs
             */}
            {route.displayNavigationTabs ? (
              <>
                <NavigationTabs artist={artist} />
                <Spacer mb={2} />
              </>
            ) : (
              /**
               * If full page, then we take over the entire area; if not, then
               * display the "Back to Artist link"
               */
              !route.displayFullPage && (
                <>
                  <Flex flexDirection="row" alignItems="center">
                    <ChevronIcon
                      direction="left"
                      color="black"
                      height="18px"
                      width="14px"
                      top="-1px"
                    />
                    <Sans size="3" weight="medium" color="black100" ml="3px">
                      <StyledLink
                        to={`/artist/${artist.slug}`}
                        onClick={() =>
                          trackEvent({
                            action_type: Schema.ActionType.Click,
                            subject: "Back to artist link",
                            destination_path: `/artist/${artist.slug}`,
                          })
                        }
                      >
                        {`Back to ${artist.name}`}
                      </StyledLink>
                    </Sans>
                  </Flex>
                  <Spacer mb={2} />
                </>
              )
            )}

            <Box minHeight="30vh">{children}</Box>
          </Col>
        </Row>

        {typeof window !== "undefined" && (
          <LazyLoadComponent threshold={1000}>
            <Row>
              <Col>
                <RecentlyViewed />
              </Col>
            </Row>
          </LazyLoadComponent>
        )}

        <Separator mt={6} mb={3} />

        <Row>
          <Col>
            <Footer />
          </Col>
        </Row>
      </HorizontalPadding>
    </AppContainer>
  )
}

const TrackingWrappedArtistApp: React.FC<ArtistAppProps> = props => {
  const Component = track<ArtistAppProps>(_p => ({
    context_page: Schema.PageName.ArtistPage,
    context_page_owner_id: props.artist.internalID,
    context_page_owner_slug: props.artist.slug,
    context_page_owner_type: Schema.OwnerType.Artist,
  }))(ArtistApp)

  return <Component {...props} />
}

export const ArtistAppFragmentContainer = createFragmentContainer(
  TrackingWrappedArtistApp,
  {
    artist: graphql`
      fragment ArtistApp_artist on Artist {
        internalID
        name
        slug
        ...ArtistMeta_artist
        ...ArtistHeader_artist
        ...NavigationTabs_artist
      }
    `,
  }
)

// Top-level route needs to be exported for bundle splitting in the router
export default ArtistAppFragmentContainer
