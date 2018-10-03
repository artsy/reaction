import { Box } from "@artsy/palette"
import { ArtworkDetailsQuery } from "__generated__/ArtworkDetailsQuery.graphql"
import { ContextConsumer } from "Artsy/Router"
import { Mediator } from "Artsy/SystemContext"
import Spinner from "Components/Spinner"
import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { Tab, Tabs } from "Styleguide/Components"
import { ArtworkDetailsAboutTheWorkFromArtsyFragmentContainer as AboutTheWorkFromArtsy } from "./ArtworkDetailsAboutTheWorkFromArtsy"
import { ArtworkDetailsAboutTheWorkFromPartnerFragmentContainer as AboutTheWorkFromPartner } from "./ArtworkDetailsAboutTheWorkFromPartner"
import { ArtworkDetailsAdditionalInfoFragmentContainer as AdditionalInfo } from "./ArtworkDetailsAdditionalInfo"
import { ArtworkDetailsArticlesFragmentContainer as Articles } from "./ArtworkDetailsArticles"
import { ArtworkDetailsChecklistFragmentContainer as Checklist } from "./ArtworkDetailsChecklist"

import { ArtworkDetails_artwork } from "__generated__/ArtworkDetails_artwork.graphql"

export interface ArtworkDetailsProps {
  artwork: ArtworkDetails_artwork
  user: User
  mediator?: Mediator
}

const ArtworkDetailsContainer = Box
const SpinnerContainer = Box

export const ArtworkDetails: React.SFC<ArtworkDetailsProps> = props => {
  const { artwork, user, mediator } = props
  const renderAbout =
    artwork.additional_information ||
    artwork.certificateOfAuthenticity ||
    artwork.conditionDescription ||
    artwork.description ||
    artwork.framed ||
    artwork.image_rights ||
    artwork.manufacturer ||
    artwork.provenance ||
    artwork.publisher ||
    artwork.series ||
    artwork.signatureInfo
  if (
    !renderAbout &&
    !artwork.articles &&
    !artwork.exhibition_history &&
    !artwork.literature
  ) {
    return null
  }
  return (
    <ArtworkDetailsContainer pb={4}>
      <Tabs>
        {renderAbout && (
          <Tab name="About the work">
            <AboutTheWorkFromArtsy artwork={artwork} />
            <AboutTheWorkFromPartner
              artwork={artwork}
              user={user}
              mediator={mediator}
            />
            <AdditionalInfo artwork={artwork} />
            <Checklist artwork={artwork} />
          </Tab>
        )}
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
      additional_information
      description
      framed {
        label
      }
      signatureInfo {
        label
      }
      conditionDescription {
        label
      }
      certificateOfAuthenticity {
        label
      }
      series
      publisher
      manufacturer
      provenance
      image_rights
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
            render={({ props }) => {
              if (props) {
                return (
                  <ArtworkDetailsFragmentContainer
                    artwork={props.artwork as any}
                    user={user}
                    mediator={mediator}
                  />
                )
              } else {
                return (
                  <SpinnerContainer
                    width="100%"
                    height="100px"
                    position="relative"
                  >
                    <Spinner />
                  </SpinnerContainer>
                )
              }
            }}
          />
        )
      }}
    </ContextConsumer>
  )
}
