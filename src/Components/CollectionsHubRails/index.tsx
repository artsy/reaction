import { CollectionsHubRails_marketingCollection } from "__generated__/CollectionsHubRails_marketingCollection.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FeaturedCollectionsRailsContainer as FeaturedCollectionsRails } from "./FeaturedCollectionsRails"
import { OtherCollectionsRailsContainer as OtherCollectionsRail } from "./OtherCollectionsRail"

const railForGroupType = collectionGroup => {
  const { groupType } = collectionGroup
  switch (groupType) {
    case "ArtistSeries":
      return null
    case "FeaturedCollections":
      return <FeaturedCollectionsRails collectionGroup={collectionGroup} />
    case "OtherCollections":
      return <OtherCollectionsRail collectionGroup={collectionGroup} />
    default:
      return null
  }
}

interface Props {
  marketingCollection: CollectionsHubRails_marketingCollection
}

export const CollectionsHubRails = ({ marketingCollection }: Props) => {
  const { linkedCollections } = marketingCollection

  return (
    <>
      {linkedCollections.map(collectionGroup => (
        <div>{railForGroupType(collectionGroup)}</div>
      ))}
    </>
  )
}

export const CollectionsHubRailsContainer = createFragmentContainer(
  CollectionsHubRails,
  {
    marketingCollection: graphql`
      fragment CollectionsHubRails_marketingCollection on MarketingCollection {
        linkedCollections {
          groupType
          ...FeaturedCollectionsRails_collectionGroup
          ...OtherCollectionsRail_collectionGroup
        }
      }
    `,
  }
)
