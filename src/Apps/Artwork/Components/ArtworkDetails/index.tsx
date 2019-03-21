import { Box, Tab, Tabs } from "@artsy/palette"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import React, { Component, useContext } from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import styled from "styled-components"
import { ArtworkDetailsAboutTheWorkFromArtsyFragmentContainer as AboutTheWorkFromArtsy } from "./ArtworkDetailsAboutTheWorkFromArtsy"
import { ArtworkDetailsAboutTheWorkFromPartnerFragmentContainer as AboutTheWorkFromPartner } from "./ArtworkDetailsAboutTheWorkFromPartner"
import { ArtworkDetailsAdditionalInfoFragmentContainer as AdditionalInfo } from "./ArtworkDetailsAdditionalInfo"
import { ArtworkDetailsArticlesFragmentContainer as Articles } from "./ArtworkDetailsArticles"

import { ArtworkDetails_artwork } from "__generated__/ArtworkDetails_artwork.graphql"
import { ArtworkDetailsQuery } from "__generated__/ArtworkDetailsQuery.graphql"

import { SystemContext } from "Artsy"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import Events from "Utils/Events"

export interface ArtworkDetailsProps {
  artwork: ArtworkDetails_artwork
}

@track(
  {
    context_module: Schema.ContextModule.ArtworkTabs,
  },
  {
    dispatch: data => Events.postEvent(data),
  }
)
export class ArtworkDetails extends Component<ArtworkDetailsProps> {
  @track((_props, _state, [{ data }]) => {
    return {
      flow: Schema.Flow.ArtworkAboutTheArtist,
      type: Schema.Type.Tab,
      label: data.trackingLabel,
      action_type: Schema.ActionType.Click,
    }
  })
  trackTabChange() {
    // noop
  }

  render() {
    const { artwork } = this.props
    return (
      <ArtworkDetailsContainer mt={[4, 0]} pb={3}>
        <Tabs onChange={this.trackTabChange.bind(this)}>
          <Tab name="About the work" data={{ trackingLabel: "about_the_work" }}>
            <AboutTheWorkFromArtsy artwork={artwork} />
            <AboutTheWorkFromPartner artwork={artwork} />
            <AdditionalInfo artwork={artwork} />
          </Tab>
          {artwork.articles && artwork.articles.length && (
            <Tab name="Articles" data={{ trackingLabel: "articles" }}>
              <Articles artwork={artwork} />
            </Tab>
          )}
          {artwork.exhibition_history && (
            <Tab
              name="Exhibition history"
              data={{ trackingLabel: "exhibition_history" }}
            >
              <ExhibitionHistory
                dangerouslySetInnerHTML={{ __html: artwork.exhibition_history }}
              />
            </Tab>
          )}
          {artwork.literature && (
            <Tab name="Bibliography" data={{ trackingLabel: "bibliography" }}>
              <Literature
                dangerouslySetInnerHTML={{ __html: artwork.literature }}
              />
            </Tab>
          )}
          {artwork.provenance && (
            <Tab name="Provenance" data={{ trackingLabel: "provenance" }}>
              <Provenance
                dangerouslySetInnerHTML={{ __html: artwork.provenance }}
              />
            </Tab>
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
      ...ArtworkDetailsAboutTheWorkFromArtsy_artwork
      ...ArtworkDetailsAboutTheWorkFromPartner_artwork
      ...ArtworkDetailsAdditionalInfo_artwork
      ...ArtworkDetailsArticles_artwork
      articles(size: 10) {
        id
      }
      literature(format: HTML)
      exhibition_history(format: HTML)
      provenance(format: HTML)
    }
  `
)

export const ArtworkDetailsQueryRenderer = ({
  artworkID,
}: {
  artworkID: string
}) => {
  const { relayEnvironment } = useContext(SystemContext)

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
      render={renderWithLoadProgress(ArtworkDetailsFragmentContainer)}
    />
  )
}

// For block-level HTML (CMS) tab content collapse the first element's top margin
// so that content properly aligns to the top of the container.
const TabContainer = styled(Box)`
  > * {
    margin-block-start: 0;
  }
`

const ArtworkDetailsContainer = TabContainer
const ExhibitionHistory = TabContainer
const Literature = TabContainer
const Provenance = TabContainer
