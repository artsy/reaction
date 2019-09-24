import { CSSGrid, Serif } from "@artsy/palette"
import { CollectionsHubsNav_marketingHubCollections } from "__generated__/CollectionsHubsNav_marketingHubCollections.graphql"
import * as Schema from "Artsy/Analytics/Schema"
import { useTracking } from "Artsy/Analytics/useTracking"
import React, { FC, useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { resize } from "Utils/resizer"
import { ImageLink } from "./ImageLink"

interface CollectionsHubsNavProps {
  marketingHubCollections: CollectionsHubsNav_marketingHubCollections
  collectionHubTestVariation: string
}

export const CollectionsHubsNav: FC<CollectionsHubsNavProps> = props => {
  const { trackEvent } = useTracking()

  useEffect(() => {
    const experiment = "collection_hub_entrypoints"
    trackEvent({
      action_type: Schema.ActionType.ExperimentViewed,
      experiment_id: experiment,
      experiment_name: experiment,
      variation_id: props.collectionHubTestVariation,
      variation_name: props.collectionHubTestVariation,
      nonInteraction: 1,
    })
  }, [])

  return (
    <CSSGrid
      as="aside"
      gridTemplateColumns={[
        "repeat(2, 1fr)",
        "repeat(3, 1fr)",
        "repeat(6, 1fr)",
      ]}
      gridGap={20}
    >
      {props.marketingHubCollections.slice(0, 6).map(hub => (
        <ImageLink
          to={`/collection/${hub.slug}`}
          src={resize(hub.thumbnail, { width: 357, height: 175 })}
          ratio={[0.49]}
          title={<Serif size="4t">{hub.title}</Serif>}
          key={hub.id}
          onClick={() => {
            trackEvent({
              action_type: Schema.ActionType.Click,
              context_page: Schema.PageName.CollectPage,
              context_module: Schema.ContextModule.CollectionHubEntryPoint,
              type: Schema.Type.Thumbnail,
              destination_path: `/collection/${hub.slug}`,
            })
          }}
        />
      ))}
    </CSSGrid>
  )
}

export const CollectionsHubsNavFragmentContainer = createFragmentContainer(
  CollectionsHubsNav,
  {
    marketingHubCollections: graphql`
      fragment CollectionsHubsNav_marketingHubCollections on MarketingCollection
        @relay(plural: true) {
        id
        slug
        title
        thumbnail
      }
    `,
  }
)
