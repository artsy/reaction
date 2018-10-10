import { Box } from "@artsy/palette"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { ContextConsumer } from "Artsy/Router"
import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { Tab, Tabs } from "Styleguide/Components"
import { ArtworkDetailsAboutTheWorkFromArtsyFragmentContainer as AboutTheWorkFromArtsy } from "./ArtworkDetailsAboutTheWorkFromArtsy"
import { ArtworkDetailsAboutTheWorkFromPartnerFragmentContainer as AboutTheWorkFromPartner } from "./ArtworkDetailsAboutTheWorkFromPartner"
import { ArtworkDetailsAdditionalInfoFragmentContainer as AdditionalInfo } from "./ArtworkDetailsAdditionalInfo"
import { ArtworkDetailsArticlesFragmentContainer as Articles } from "./ArtworkDetailsArticles"
import { ArtworkDetailsChecklistFragmentContainer as Checklist } from "./ArtworkDetailsChecklist"

import { ArtworkDetails_artwork } from "__generated__/ArtworkDetails_artwork.graphql"
import { ArtworkDetailsQuery } from "__generated__/ArtworkDetailsQuery.graphql"

export interface ArtworkDetailsProps {
  artwork: ArtworkDetails_artwork
}

const ArtworkDetailsContainer = Box

export const ArtworkDetails: React.SFC<ArtworkDetailsProps> = props => {
  const { artwork } = props
  return (
    <ArtworkDetailsContainer pb={4}>
      <Tabs>
        <Tab name="About the work">
          <AboutTheWorkFromArtsy artwork={artwork} />
          <AboutTheWorkFromPartner artwork={artwork} />
          <AdditionalInfo artwork={artwork} />
          <Checklist artwork={artwork} />
        </Tab>
        {artwork.articles &&
          artwork.articles.length && (
            <Tab name="Articles">
              <Articles artwork={artwork} />
            </Tab>
          )}
        {artwork.exhibition_history && (
          <Tab name="Exhibition history">{artwork.exhibition_history}</Tab>
        )}
        {artwork.literature && (
          <Tab name="Bibliography">{artwork.literature}</Tab>
        )}
      </Tabs>
    </ArtworkDetailsContainer>
  )
}

export const ArtworkDetailsFragmentContainer = createFragmentContainer(
  ArtworkDetails,
  graphql`
    fragment ArtworkDetails_artwork on Artwork {
      ...ArtworkDetailsAboutTheWorkFromArtsy_artwork
      ...ArtworkDetailsAboutTheWorkFromPartner_artwork
      ...ArtworkDetailsChecklist_artwork
      ...ArtworkDetailsAdditionalInfo_artwork
      ...ArtworkDetailsArticles_artwork
      articles(size: 10) {
        id
      }
      literature
      exhibition_history
    }
  `
)

export const ArtworkDetailsQueryRenderer = ({
  artworkID,
}: {
  artworkID: string
}) => {
  return (
    <ContextConsumer>
      {({ user, mediator, relayEnvironment }) => {
        return (
          <QueryRenderer<ArtworkDetailsQuery>
            environment={relayEnvironment}
            variables={{ artworkID }}
            query={graphql`
              query ArtworkDetailsQuery($artworkID: String!) {
                artwork(id: $artworkID) {
                  ...ArtworkDetails_artwork
                }
              }
            `}
            render={renderWithLoadProgress(
              ArtworkDetailsFragmentContainer as any
            )}
          />
        )
      }}
    </ContextConsumer>
  )
}
