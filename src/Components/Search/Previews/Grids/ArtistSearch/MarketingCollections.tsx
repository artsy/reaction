import { MarketingCollectionsPreview_marketingCollections } from "__generated__/MarketingCollectionsPreview_marketingCollections.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface MarketingCollectionsPreviewProps {
  marketingCollections: MarketingCollectionsPreview_marketingCollections
}

export const MarketingCollectionsPreview: React.SFC<
  MarketingCollectionsPreviewProps
> = ({ marketingCollections }) => {
  return (
    <>
      <h1>Collections</h1>
      {marketingCollections.map(({ title }, index) => {
        return <div key={index}>{title}</div>
      })}
    </>
  )
}

export const MarketingCollectionsPreviewFragmentContainer = createFragmentContainer(
  MarketingCollectionsPreview,
  graphql`
    fragment MarketingCollectionsPreview_marketingCollections on MarketingCollection
      @relay(plural: true) {
      title
      slug
      headerImage
    }
  `
)
