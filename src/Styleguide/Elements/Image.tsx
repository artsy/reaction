// @ts-ignore
import React from "react"
import styled from "styled-components"

import {
  height,
  HeightProps,
  space,
  SpaceProps,
  width,
  WidthProps,
} from "styled-system"

export interface BaseImageProps {
  src: string
  alt?: string
  ariaLabel?: string
  style?: object
}

export interface ImageProps
  extends BaseImageProps,
    SpaceProps,
    WidthProps,
    HeightProps {}

export const Image = styled.img.attrs<ImageProps>({})`
  ${space};
  ${width};
  ${height};
`

export interface ResponsiveImageProps
  extends BaseImageProps,
    SpaceProps,
    WidthProps {}
export const ResponsiveImage = styled.div.attrs<ResponsiveImageProps>({})`
  height: auto;
  padding-top: 100%;
  background: url(${props => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  ${space};
  ${width};
`
ResponsiveImage.defaultProps = {
  width: "100%",
}
