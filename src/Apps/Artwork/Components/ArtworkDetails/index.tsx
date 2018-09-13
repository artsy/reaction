import { Box } from "@artsy/palette"
import { ArtworkDetailsQuery } from "__generated__/ArtworkDetailsQuery.graphql"
import { ContextConsumer } from "Artsy/Router"
import React, { Component } from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { Tab, Tabs } from "Styleguide/Components"
import { ArtworkDetailsAboutTheWorkFragmentContainer as AboutTheWork } from "./ArtworkDetailsAboutTheWork"
import { ArtworkDetailsAdditionalInfoFragmentContainer as AdditionalInfo } from "./ArtworkDetailsAdditionalInfo"
import { ArtworkDetailsArticlesFragmentContainer as Articles } from "./ArtworkDetailsArticles"
import { ArtworkDetailsChecklistFragmentContainer as Checklist } from "./ArtworkDetailsChecklist"

import { ArtworkDetails_artwork } from "__generated__/ArtworkDetails_artwork.graphql"

export interface ArtworkDetailsProps {
  artwork: ArtworkDetails_artwork
}

const ArtworkDetailsContainer = Box

export class ArtworkDetails extends Component<ArtworkDetailsProps> {
  render() {
    const { artwork } = this.props
    const renderAbout =
      artwork.additional_information ||
      artwork.description ||
      artwork.framed ||
      artwork.signatureInfo ||
      artwork.conditionDescription ||
      artwork.certificateOfAuthenticity ||
      artwork.series ||
      artwork.publisher ||
      artwork.manufacturer ||
      artwork.provenance ||
      artwork.image_rights
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
              <AboutTheWork artwork={artwork as any} />
              <Checklist artwork={artwork as any} />
              <AdditionalInfo artwork={artwork as any} />
            </Tab>
          )}
          {artwork.articles &&
            artwork.articles.length && (
              <Tab name="Articles">
                <Articles artwork={artwork as any} />
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
}

export const ArtworkDetailsFragmentContainer = createFragmentContainer(
  ArtworkDetails,
  graphql`
    fragment ArtworkDetails_artwork on Artwork {
      ...ArtworkDetailsAboutTheWork_artwork
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
                  />
                )
              } else {
                return null
              }
            }}
          />
        )
      }}
    </ContextConsumer>
  )
}
