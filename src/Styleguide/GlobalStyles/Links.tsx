import { css } from "styled-components"
import { themeGet } from "styled-system"
import { Sans, Serif, Display } from "@artsy/palette"

export const Links = () => css`
  /* Default links */

  a {
    color: ${themeGet("colors.black60")};

    &:hover {
      color: ${themeGet("colors.black100")};
      transition: all 250ms ease-out 0s;
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
      color: ${themeGet("colors.black60")};

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
      color: ${themeGet("colors.black60")};

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
