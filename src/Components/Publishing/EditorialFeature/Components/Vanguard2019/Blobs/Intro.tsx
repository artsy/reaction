import { Box } from "@artsy/palette"
import React from "react"
import styled from "styled-components"

interface SVGVideoBackgroundProps {
  id?: string
  url?: string
}

export const IntroSVGVideo = props => (
  <IntroSVGVideoWrapper>
    <svg
      height="0"
      width="0"
      viewBox="0 0 1600 900"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMin meet"
      clipPathUnits="objectBoundingBox"
      {...props}
    >
      <defs>{getSVGClipPath(props.id)}</defs>
    </svg>
    <SVGVideoBackground {...props} />
  </IntroSVGVideoWrapper>
)

const getSVGClipPath = id => {
  switch (id) {
    case "#clip-svg-intro":
      return (
        <clipPath id={id.slice(1)}>
          <path d="M504.08 63.72c35.91 1.64 149-21.28 207.51-39.9s176.91-16 248.74 0 186.22-1.33 262 1.33 275.35 5.32 283.33 234.11-20 235.44 0 359.14-66.51 205.92-388.41 240.76-538.72 61.19-699.67-12-244.75-34.58-297.95-94.44-58.49-131.66-71.79-186.19-50.5-192.43 13.47-323.81c40.62-83.44 50.38-148.4 146.69-183 72.79-26.07 208.29.01 296.08 4z" />
        </clipPath>
      )
    case "#clip-svg-emerging":
      return (
        <clipPath id={id.slice(1)}>
          <path d="M319.96 4.17L47.2 182.84l99.41 622.66 1343.22 90.93 64.26-658.28-360.06-147.99L319.96 4.17z" />
        </clipPath>
      )
    case "#clip-svg-getting-their-due":
      return (
        <clipPath id={id.slice(1)}>
          <path d="M1488.94 4L65.88 87.92l47.2 800.35 1423.07-83.92L1488.96 4h-.02z" />
        </clipPath>
      )
    case "#clip-svg-newly-established":
      return (
        <clipPath id={id.slice(1)}>
          <path d="M103.9 84.75a631.43 631.43 0 0195.48-21.84c56.68-8.43 113.86-9.53 171-12.3q72.95-2.7 145.49-11.07Q583.17 30.78 650.6 23c51.28-5.2 103.25-9.27 154.82-9.33 56-.05 111.88 5.93 167.63 10.71 67.17 5.76 134.18 35.8 201.61 37.05 23.86 0 47.71-13.15 71.56-12.31 25.79 1.88 51-4.07 75.48 4.34 40.51 12.77 80.73 30.95 117.85 51.75 22.73 12.74 43.63 26.54 60.68 46.63 13.57 16 24.59 34.74 35.61 52.58q11.06 18.33 21.74 36.87a199.56 199.56 0 0120.92 42.12c14.72 45.82 2.3 93-5 138.87-9.83 62.06-6.47 128.19-29 187.64a281.32 281.32 0 01-49.61 82.79l-32.41 30.52c-33.51 26.21-58 60-96.63 77.77-57.73 25.72-133.38 57.1-195.88 63.95q-60.6 4.67-121.34 6.67-76.32 6.38-152.58 13.26c-65.83 5-132.21 10.43-198.11 3.31-61.12-6.6-122.78-19.64-181.87-36.52C468 837.92 420.34 823 377.46 796.45q-40.68-28.23-81.08-56.86-35-24-70.7-47c-23.26-14.9-50.81-27.78-71-47.18-18.86-18.11-34.77-73-46.11-96.52l-10.55-26.38q-12-34-24.84-67.8a353.7 353.7 0 01-17.6-101.19C54 302.39 58.53 250 64.36 199.22c2.28-19.87 5-40.17 10.39-59.47 4.08-14.44 11.47-26.14 17.48-39.24.82-1.78 1.62-3.59 2.38-5.44 0 0 2.19-8.1 9.29-10.32" />
        </clipPath>
      )
  }
}

const SVGVideoBackground = props => (
  <VideoWrapper>
    <Video
      autoPlay
      loop
      muted
      playsInline
      controls={false}
      src={props.url}
      {...props}
    />
  </VideoWrapper>
)

const VideoWrapper = styled(Box)`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`
const IntroSVGVideoWrapper = styled(Box)`
  height: 100vw;
  width: 100vw;
  position: absolute;
  overflow-x: hidden;
`
const Video = styled.video<SVGVideoBackgroundProps>`
  z-index: -1;
  clip-path: url(${props => props.id});
`
