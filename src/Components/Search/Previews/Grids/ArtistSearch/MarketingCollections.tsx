import { MarketingCollectionsPreview_marketingCollections } from "__generated__/MarketingCollectionsPreview_marketingCollections.graphql"
// import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
// import { ContextConsumer } from "Artsy/SystemContext"
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

// export const MarketingCollectionsPreviewQueryRenderer: React.SFC<{
//   entityID: string
// }> = ({ entityID }) => {
//   return (
//     <ContextConsumer>
//       {({ relayEnvironment }) => {
//         return (
//           <QueryRenderer<MarketingCollectionsPreviewQuery>
//             environment={relayEnvironment}
//             variables={{
//               entityID,
//             }}
//             query={graphql`
//               query MarketingCollectionsPreviewQuery($entityID: String!) {
//                 artist(id: $entityID) {
//                   ...MarketingCollectionsPreview_artist
//                 }
//               }
//             `}
//             render={renderWithLoadProgress(
//               MarketingCollectionsPreviewFragmentContainer
//             )}
//           />
//         )
//       }}
//     </ContextConsumer>
//   )
// }
