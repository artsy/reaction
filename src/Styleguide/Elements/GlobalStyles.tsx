import styled from "styled-components"
import { css } from "styled-components"
import { themeGet } from "styled-system"
import { Sans, Serif, Display } from "@artsy/palette"

const Links = css`
  ${Sans} {
    a {
      color: ${themeGet("colors.black60")};

      &:hover {
        color: ${themeGet("colors.black100")};
      }

      &:active {
        color: ${themeGet("colors.black100")};
      }

      &:focus {
        border: 1px solid ${themeGet("colors.purple100")};
        outline: 0;
        padding: 2px;
      }
    }
  }

  ${Serif} {
    a {
      color: ${themeGet("colors.black60")};

      &:hover {
        color: ${themeGet("colors.black100")};
      }

      &:active {
        color: ${themeGet("colors.black100")};
      }

      &:focus {
        border: 1px solid ${themeGet("colors.purple100")};
        outline: 0;
        padding: 2px;
      }
    }
  }

  ${Display} {
    a {
      color: ${themeGet("colors.black100")};
    }
  }
`

export const GlobalStyles = styled.div`
  ${Links};
`
