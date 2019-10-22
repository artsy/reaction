import { CSSGrid } from "@artsy/palette"
import { Serif } from "@artsy/palette"
import { CollectionsHubsNav_marketingHubCollections } from "__generated__/CollectionsHubsNav_marketingHubCollections.graphql"
import { AnalyticsSchema } from "Artsy/Analytics"
import { useTracking } from "Artsy/Analytics/useTracking"
import React, { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { resize } from "Utils/resizer"
import { ImageLink } from "./ImageLink"

interface CollectionsHubsNavProps {
  marketingHubCollections: CollectionsHubsNav_marketingHubCollections
}

export const CollectionsHubsNav: FC<CollectionsHubsNavProps> = props => {
  const { trackEvent } = useTracking()
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
              action_type: AnalyticsSchema.ActionType.Click,
              context_page: AnalyticsSchema.PageName.CollectPage,
              context_module:
                AnalyticsSchema.ContextModule.CollectionHubEntryPoint,
              type: AnalyticsSchema.Type.Thumbnail,
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
