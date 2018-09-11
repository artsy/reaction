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
    return (
      <ArtworkDetailsContainer pb={4}>
        <Tabs>
          <Tab name="About the work">
            <AboutTheWork artwork={artwork} />
            <Checklist artwork={artwork} />
            <AdditionalInfo artwork={artwork} />
          </Tab>
          <Tab name="Articles">
            <Articles artwork={artwork} />
          </Tab>
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
