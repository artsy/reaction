import React from "react"
import styled from "styled-components"
import {
  Box,
  Flex,
  Join,
  ResponsiveImage,
  Sans,
  Spacer,
  color,
} from "@artsy/palette"
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
          <ResponsiveImage
            src={image.cropped.url}
            width="100%"
            style={{ backgroundSize: "cover", height: "100%" }}
          />
        </Figure>
      )}

      <Meta p={6} flexBasis={image ? "50%" : "100%"}>
        <Join separator={<Spacer my={1} />}>
          <Sans size="10" element="h1" textAlign="center">
            {name}
          </Sans>

          {subheadline && (
            <Sans size="4" textAlign="center">
              <Box dangerouslySetInnerHTML={{ __html: subheadline }} />
            </Sans>
          )}
        </Join>
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
        subheadline(format: HTML)
        image {
          cropped(width: 2000, height: 2000, version: "source") {
            url
          }
        }
      }
    `,
  }
)
