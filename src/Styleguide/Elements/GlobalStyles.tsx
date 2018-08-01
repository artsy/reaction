import { color, Display, Sans, Serif } from "@artsy/palette"
import { injectLayoutBaseCSS } from "styled-bootstrap-grid"
import styled from "styled-components"
import { css } from "styled-components"
import reset from "styled-reset"

// @ts-ignore
import { ClassAttributes, HTMLAttributes } from "react"

if (process.env.NODE_ENV !== "test") {
  injectLayoutBaseCSS(`
    ${reset};

    *:focus {
      outline: none;
    }

    html,
    body,
    #root {
      -webkit-tap-highlight-color: transparent;
      height: 100%;
    }
    body {
      margin: 0;
      padding: 0;
    }

    html, body {
      font-family: 'AGaramondPro-Regular';
      font-size: 16px;
      line-height: 24px;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
    }
  `)
}

// Mixins

const noUnderline = css`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const colorLink = css`
  color: ${color("purple100")};
`

export const GlobalStyles = styled.div`
  /* Default links */

  a {
    cursor: pointer;
    color: inherit;
    transition: color 0.25s;

    &:hover {
      color: ${color("black100")};
    }

    &:active {
      color: ${color("black100")};
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
        color: ${color("black100")};
      }

      &:active {
        color: ${color("black100")};
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
        color: ${color("black100")};
      }

      &:active {
        color: ${color("black100")};
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
      color: ${color("black100")};
      text-decoration: none;
      text-transform: uppercase;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`
