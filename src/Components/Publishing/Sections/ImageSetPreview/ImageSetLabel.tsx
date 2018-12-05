import { Flex, Sans, space } from "@artsy/palette"
import React from "react"
import styled from "styled-components"

import { IconImageSet } from "Components/Publishing/Icon/IconImageSet"
import { Media } from "Utils/Responsive"
import { ImageSetPreviewProps } from "./ImageSetPreview"

export const ImageSetLabel = (props: ImageSetPreviewProps) => {
  const {
    section: { images, title },
  } = props
  const label = images.length === 1 ? "Image" : "Images"
  const imageCount = `${images.length} ${label}`
  const primaryTitle = title ? title : imageCount

  return (
    <LabelWrapper alignItems="center" justifyContent="space-between">
      <Flex flexDirection="column" justifyContent="space-between">
        <Sans size={["4", "5"]} weight="medium" pb={2}>
          {primaryTitle}
        </Sans>

        <Flex>
          <Sans size={["2", "3"]} weight="medium">
            View Slideshow
          </Sans>
          {title && (
            <Sans size={["2", "3"]} pl={20}>
              {imageCount}
            </Sans>
          )}
        </Flex>
      </Flex>

      <Media greaterThanOrEqual="sm">
        <IconContainer>
          <IconImageSet />
        </IconContainer>
      </Media>
    </LabelWrapper>
  )
}

export const IconContainer = styled.div`
  height: 45px;
  position: relative;
  margin-left: ${space(4)}px;
  text-align: right;

  > svg {
    height: 98%;
  }
`

export const LabelWrapper = styled(Flex)`
  padding: ${space(2)}px;
  width: 100%;
`
