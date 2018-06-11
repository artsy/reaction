// @ts-ignore
import React from "react"
import styled from "styled-components"

import {
  space,
  width,
  SpaceProps,
  WidthProps,
  height,
  HeightProps,
} from "styled-system"

export interface ImageProps extends SpaceProps, WidthProps, HeightProps {
  src: string
}
export const Image = styled.img.attrs<ImageProps>({})`
  ${space};
  ${width};
  ${height};
`
