import { Box } from "@artsy/palette"
import React from "react"
import styled from "styled-components"

export const IntroSVGVideo = props => (
  <IntroSVGVideoWrapper>
    <svg
      height="0"
      viewBox="0 0 1600 900"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <clipPath id="clip-svg-intro">
          <path d="M504.08 63.72c35.91 1.64 149-21.28 207.51-39.9s176.91-16 248.74 0 186.22-1.33 262 1.33 275.35 5.32 283.33 234.11-20 235.44 0 359.14-66.51 205.92-388.41 240.76-538.72 61.19-699.67-12-244.75-34.58-297.95-94.44-58.49-131.66-71.79-186.19-50.5-192.43 13.47-323.81c40.62-83.44 50.38-148.4 146.69-183 72.79-26.07 208.29.01 296.08 4z" />
        </clipPath>
      </defs>
    </svg>
    <SVGVideoBackground {...props} />
  </IntroSVGVideoWrapper>
)

interface SVGVideoBackgroundProps {
  id?: string
  url?: string
}

const SVGVideoBackground = props => (
  <VideoWrapper>
    <Video autoPlay loop muted playsInline controls={false} src={props.url} />
  </VideoWrapper>
)

const VideoWrapper = styled(Box)`
  max-width: 100vw;
`
const IntroSVGVideoWrapper = styled(Box)``

const Video = styled.video<SVGVideoBackgroundProps>`
  z-index: -1;
  clip-path: url(#clip-svg-intro);
  transform: scale(0.95);
`
