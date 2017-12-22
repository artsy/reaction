import { css, keyframes } from "styled-components"

export const fadeOut = css`
  animation: ${keyframes`
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  `} 0.5s both;
`

export const fadeIn = css`
  animation: ${keyframes`
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  `} 0.5s both;
`
