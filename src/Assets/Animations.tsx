import { css, keyframes } from "styled-components"

// Fade effects
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

// Sliding effects

export const slideInDown = css`
  animation: ${keyframes`
    from {
      transform: translate3d(0, -100%, 0);
      visibility: visible;
    }

    to {
      transform: translate3d(0, 0, 0);
    }
  `} 0.5s both;
`

export const slideInLeft = css`
  animation: ${keyframes`
    from {
      transform: translate3d(-100%, 0, 0);
      visibility: visible;
    }

    to {
      transform: translate3d(0, 0, 0);
    }
  `} 0.5s both;
`

export const slideInRight = css`
  animation: ${keyframes`
    from {
      transform: translate3d(100%, 0, 0);
      visibility: visible;
    }

    to {
      transform: translate3d(0, 0, 0);
    }
  `} 0.5s both;
`

export const slideInUp = css`
  animation: ${keyframes`
    from {
      transform: translate3d(0, 100%, 0);
      visibility: visible;
    }

    to {
      transform: translate3d(0, 0, 0);
    }
  `} 0.5s both;
`