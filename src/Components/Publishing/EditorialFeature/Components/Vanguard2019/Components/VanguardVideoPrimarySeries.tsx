import { Box, color } from "@artsy/palette"
import React from "react"
import styled from "styled-components"

interface Props {
  url: string
}

export const VanguardVideoPrimarySeries: React.SFC<Props> = props => {
  return (
    <PrimarySeriesWrapper>
      <svg
        viewBox="0 0 1600 900"
        xmlns="http://www.w3.org/2000/svg"
        fill={color("white100")}
        {...props}
      >
        <path d="M0,0V900H1600V0ZM1117.25,859.16c-321.9,34.84-538.72,61.19-699.67-12s-244.75-34.58-297.95-94.44S61.14,621.06,47.84,566.53-2.66,374.1,61.31,242.72c40.62-83.44,50.38-148.4,146.69-183,72.79-26.07,208.29,0,296.08,4,35.91,1.64,149-21.28,207.51-39.9s176.91-16,248.74,0,186.22-1.33,262,1.33,275.35,5.32,283.33,234.11-20,235.44,0,359.14S1439.15,824.32,1117.25,859.16Z" />
      </svg>
      <VanguardIntroVideoWrapper>
        <VanguardIntroVideo
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          src={props.url}
        />
      </VanguardIntroVideoWrapper>
    </PrimarySeriesWrapper>
  )
}

const VanguardIntroVideoWrapper = styled(Box)`
  height: 100%;
  max-width: 100vw;
  position: absolute;
  top: 0;
  z-index: -1;
`

const VanguardIntroVideo = styled.video`
  max-height: 98%;
`

const PrimarySeriesWrapper = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
`
