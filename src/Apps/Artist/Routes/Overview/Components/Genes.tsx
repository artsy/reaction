import { Sans, Serif } from "@artsy/palette"
import { Genes_artist } from "__generated__/Genes_artist.graphql"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
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
    return (
      <GeneFamily>
        <Sans size="2" weight="medium">
          Gene family name
        </Sans>
        {genes.edges.map(({ node: gene }, index, list) => {
          const geneDivider = index < list.length - 1 ? "," : ""

          return (
            <Serif size="3t" display="inline-block" key={index} mr={0.5}>
              <GeneLink href={gene.href} className="noUnderline">
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
