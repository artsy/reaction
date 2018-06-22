import { Display, Sans, Serif } from "@artsy/palette"
import styled from "styled-components"
import { css } from "styled-components"
import { themeGet } from "styled-system"

// @ts-ignore
import { ClassAttributes, HTMLAttributes } from "react"

// Mixins

const noUnderline = css`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const colorLink = css`
  color: ${themeGet("colors.purple100")};
`

export const GlobalStyles = styled.div`
  /* Default links */

  a {
    cursor: pointer;
    color: inherit;
    transition: 0.25s;

    &:hover {
      color: ${themeGet("colors.black100")};
    }

    &:active {
      color: ${themeGet("colors.black100")};
    }

    /* ts-styled-plugin erroniously parses this; see: */
    /* https://github.com/Microsoft/typescript-styled-plugin/issues/54 */

    &.noUnderline {
      ${noUnderline};
    }

    &.colorLink {
      ${noUnderline};
      ${colorLink};
    }
  }

  /* <Sans /> links */

  ${Sans} {
    a {
      color: inherit;

      &:hover {
        color: ${themeGet("colors.black100")};
      }

      &:active {
        color: ${themeGet("colors.black100")};
      }

      &.noUnderline {
        ${noUnderline};
      }

      &.colorLink {
        ${noUnderline};
        ${colorLink};
      }
    }
  }

  /* <Serif /> links */

  ${Serif} {
    a {
      color: inherit;

      &:hover {
        color: ${themeGet("colors.black100")};
      }

      &:active {
        color: ${themeGet("colors.black100")};
      }

      &.noUnderline {
        ${noUnderline};
      }

      &.colorLink {
        ${noUnderline};
        ${colorLink};
      }
    }
  }

  /* <Display /> links */

  ${Display} {
    a {
      color: ${themeGet("colors.black100")};
      text-decoration: none;
      text-transform: uppercase;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`
