import React from "react"
import styled from "styled-components"
import { Flex, Sans, color, Image, Spacer } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FeatureHeader_feature } from "__generated__/FeatureHeader_feature.graphql"

const Container = styled(Flex)`
  height: 100%;
  width: 100%;
  flex: 1;
`

const Figure = styled(Flex)`
  flex-basis: 50%;
  flex-shrink: 0;
  flex-grow: 0;
  background-color: ${color("black10")};
`

const Cover = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
`

const Meta = styled(Flex)`
  flex-shrink: 0;
  flex-grow: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export type FeatureHeaderProps = {
  feature: FeatureHeader_feature
}

export const FeatureHeader: React.FC<FeatureHeaderProps> = ({
  feature: { name, subheadline, image },
}) => {
  return (
    <Container flexDirection={["column", "row"]}>
      {image && (
        <Figure>
          {/* TODO: Optimize image, support higher DPR */}
          <Cover src={image.url} alt={name} />
        </Figure>
      )}

      <Meta p={6} flexBasis={image ? "50%" : "100%"}>
        <Sans size="10" element="h1" textAlign="center">
          {name}
        </Sans>

        <Spacer my={1} />

        {/* TODO: Doesn't exist in schema yet, aliased `description` */}
        {subheadline && (
          <Sans size="4" textAlign="center">
            {subheadline}
          </Sans>
        )}
      </Meta>
    </Container>
  )
}

export const FeatureHeaderFragmentContainer = createFragmentContainer(
  FeatureHeader,
  {
    feature: graphql`
      fragment FeatureHeader_feature on Feature {
        name
        subheadline: description
        image {
          url
        }
      }
    `,
  }
)
