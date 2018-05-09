import styled from "styled-components"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { garamond } from "Assets/Fonts"
import { FollowButton } from "../../FollowButton/Button"
import { ToolTipDescription } from "./Components/Description"
import { NewFeature, NewFeatureContainer } from "./Components/NewFeature"
import { GeneToolTip_gene } from "../../../__generated__/GeneToolTip_gene.graphql"

export interface GeneProps {
  gene: GeneToolTip_gene
}

export const GeneToolTip: React.SFC<GeneProps> = props => {
  const { description, href, image, name } = props.gene
  const {
    cropped: { url },
  } = image

  return (
    <Wrapper>
      <GeneContainer href={href}>
        {url && <Image src={url} />}
        <Title>{name}</Title>

        {description && <ToolTipDescription text={description} />}
      </GeneContainer>

      <ToolTipFooter>
        <FollowButton /> {/* TODO: Replace with relay follow */}
        <NewFeature />
      </ToolTipFooter>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 240px;
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
      image {
        cropped(width: 240, height: 160) {
          url
        }
      }
      name
    }
  `
)
