import styled from "styled-components"
import PropTypes from "prop-types"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { garamond } from "Assets/Fonts"
import { GeneToolTip_gene } from "../../../__generated__/GeneToolTip_gene.graphql"
import { NewFeature, NewFeatureContainer } from "./Components/NewFeature"
import { ToolTipDescription } from "./Components/Description"
import FollowGeneButton from "../../FollowButton/FollowGeneButton"

export interface GeneProps {
  gene: GeneToolTip_gene
}

export const GeneToolTip: React.SFC<GeneProps> = (props, context) => {
  const { description, href, id, image, name } = props.gene
  const { url } = image
  const { genes } = context.tooltipsData
  const { onOpenAuthModal } = context

  return (
    <Wrapper>
      <GeneContainer href={href} target="_blank">
        {url && <Image src={url} />}
        <Title>{name}</Title>

        {description && <ToolTipDescription text={description} />}
      </GeneContainer>

      <ToolTipFooter>
        <FollowGeneButton
          gene={genes[id] as any}
          onOpenAuthModal={onOpenAuthModal}
        />
        <NewFeature />
      </ToolTipFooter>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 240px;
  a:hover {
    color: black;
  }
`

export const GeneContainer = styled.a`
  position: relative;
  text-decoration: none;
  color: black;
`

const Title = styled.div`
  ${garamond("s18")};
  font-weight: 600;
`

const Image = styled.img`
  width: 100%;
  margin-bottom: 10px;
  max-height: 160px;
  object-fit: cover;
`

export const ToolTipFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${NewFeatureContainer} {
    display: flex;
    flex-direction: column;
  }
`

export const GeneToolTipContainer = createFragmentContainer(
  GeneToolTip,
  graphql`
    fragment GeneToolTip_gene on Gene {
      description
      href
      id
      image {
        url(version: "tall")
      }
      name
    }
  `
)

GeneToolTip.contextTypes = {
  tooltipsData: PropTypes.object,
  onOpenAuthModal: PropTypes.func,
}
