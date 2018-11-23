import { Sans, Serif, Spacer } from "@artsy/palette"
import { Genes_artist } from "__generated__/Genes_artist.graphql"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import styled from "styled-components"
import { space } from "styled-system"

const GeneFamily = styled.div``
const GeneLink = styled.a`
  display: inline-block;
  ${space};
`

interface Props {
  artist: Genes_artist
}

export class Genes extends Component<Props> {
  render() {
    const { related } = this.props.artist
    const { genes } = related
    if (genes.edges.length === 0) {
      return null
    }
    return (
      <GeneFamily>
        <Sans size="2" weight="medium">
          Related Categories
        </Sans>
        <Spacer mb={1} />
        {genes.edges.map(({ node: gene }, index, list) => {
          const geneDivider = index < list.length - 1 ? "," : ""
          const href = sd.APP_URL + gene.href
          return (
            <Serif size="3t" display="inline-block" key={index} mr={0.5}>
              <GeneLink href={href} className="noUnderline">
                {gene.name}
                {geneDivider}
              </GeneLink>
            </Serif>
          )
        })}
      </GeneFamily>
    )
  }
}

export const GenesFragmentContainer = createFragmentContainer(
  Genes,
  graphql`
    fragment Genes_artist on Artist {
      related {
        genes {
          edges {
            node {
              href
              name
            }
          }
        }
      }
    }
  `
)
