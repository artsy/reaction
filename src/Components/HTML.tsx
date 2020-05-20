import React from "react"
import styled, { css } from "styled-components"
import { Box, Sans, SansProps, Serif, SerifProps } from "@artsy/palette"

export type HTMLProps = (SansProps | SerifProps) & {
  fontFamily?: "sans" | "serif"
  html: string
}

const htmlMixin = css`
  > ${Box} > p {
    &:first-of-type {
      margin-top: 0;
    }

    &:last-of-type {
      margin-bottom: 0;
    }
  }
`

const TYPEFACES = {
  sans: styled(Sans)`
    ${htmlMixin}
  `,
  serif: styled(Serif)`
    ${htmlMixin}
  `,
} as const

type Typeface = keyof typeof TYPEFACES

export const HTML = ({ fontFamily = "sans", html, size, ...rest }) => {
  const Typeface = TYPEFACES[fontFamily as Typeface]

  return (
    <Typeface size={size} {...rest}>
      <Box dangerouslySetInnerHTML={{ __html: html }} />
    </Typeface>
  )
}
