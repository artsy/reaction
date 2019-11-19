import { Box } from "@artsy/palette"
import {
  GeneRelatedLinksQuery,
  GeneRelatedLinksQueryResponse,
} from "__generated__/GeneRelatedLinksQuery.graphql"
import { useSystemContext } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { SystemQueryRenderer as QueryRenderer } from "Artsy/Relay/SystemQueryRenderer"
import React from "react"
import { graphql } from "react-relay"

/**
 * Used on the Gene page to show related artists and categories.
 */
export const GeneRelatedLinks: React.FC<GeneRelatedLinksQueryResponse> = ({
  gene,
}) => {
  return (
    <>
      <Box className="related-genes related-links bisected-header-cell-section is-fade-in">
        <h2>Related Categories</h2>
        <div className="related-genes-links">
          {gene.similar.edges.map(({ node: similarGene }, index) => {
            const separator = index < gene.similar.edges.length - 1 ? ", " : ""
            return (
              <>
                <a href={similarGene.href}>{similarGene.name}</a>
                {separator}
              </>
            )
          })}
        </div>
      </Box>
      <Box className="related-artists related-links bisected-header-cell-section is-fade-in">
        <h2>Related Artists</h2>
        <div className="artists">
          {gene.artists.edges.map(({ node: artist }, index) => {
            const separator = index < gene.similar.edges.length - 1 ? ", " : ""
            return (
              <>
                <a href={artist.href}>{artist.name}</a>
                {separator}
              </>
            )
          })}
        </div>
      </Box>
    </>
  )
}

// export const GeneRElatedArtistLinksFragmentContainer
export interface GeneRelatedLinksQueryRendererProps {
  geneID: string
}

export const GeneRelatedLinksQueryRenderer: React.FC<
  GeneRelatedLinksQueryRendererProps
> = ({ geneID }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <QueryRenderer<GeneRelatedLinksQuery>
      environment={relayEnvironment}
      variables={{ geneID }}
      render={renderWithLoadProgress(GeneRelatedLinks)}
      query={graphql`
        query GeneRelatedLinksQuery($geneID: String!) {
          gene(id: $geneID) {
            similar(first: 10) {
              edges {
                node {
                  href
                  name
                }
              }
            }
            artists: artistsConnection(first: 10) {
              edges {
                node {
                  href
                  name
                }
              }
            }
          }
        }
      `}
    />
  )
}
