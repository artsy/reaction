import { Box } from "@artsy/palette"
import { ArtworkDetailsQuery } from "__generated__/ArtworkDetailsQuery.graphql"
import { ContextConsumer } from "Artsy/Router"
import React, { Component } from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { Tab, Tabs } from "Styleguide/Components"
import { ArtworkDetailsAboutTheWork as AboutTheWork } from "./ArtworkDetailsAboutTheWork"
import { ArtworkDetailsAdditionalInfo as AdditionalInfo } from "./ArtworkDetailsAdditionalInfo"
import { ArtworkDetailsArticles as Articles } from "./ArtworkDetailsArticles"
import { ArtworkDetailsChecklist as Checklist } from "./ArtworkDetailsChecklist"

import { ArtworkDetails_artwork } from "__generated__/ArtworkDetails_artwork.graphql"

export interface ArtworkDetailsProps {
  artwork: ArtworkDetails_artwork
}

const ArtworkDetailsContainer = Box

export class ArtworkDetails extends Component<ArtworkDetailsProps> {
  render() {
    const { artwork } = this.props
    return (
      <ArtworkDetailsContainer pb={4}>
        <Tabs>
          <Tab name="About the work">
            <AboutTheWork artwork={artwork} />
            <Checklist artwork={artwork} />
            <AdditionalInfo artwork={artwork} />
          </Tab>
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
      additional_information
      description
      partner {
        name
      }
      framed {
        label
        details
      }
      signatureInfo {
        label
        details
      }
      conditionDescription {
        label
        details
      }
      certificateOfAuthenticity {
        label
        details
      }
      series
      publisher
      manufacturer
      provenance
      image_rights
      articles(size: 10) {
        title
        href
        thumbnail: thumbnail_image {
          image: cropped(width: 150, height: 100) {
            width
            height
            url
          }
        }
        author {
          name
        }
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
