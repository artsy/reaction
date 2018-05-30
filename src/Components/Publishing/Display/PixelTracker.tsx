import React from "react"
import styled from "styled-components"

export const PixelTracker = props => {
  let url = props.pixel_tracking_code
  if (!url) {
    return null
  }

  const hasTimestamp = ["serving-sys", "doubleclick"].some(str =>
    url.includes(str)
  )
  if (hasTimestamp) {
    url = url.replace(
      "[timestamp]",
      String(new Date().getMilliseconds() / 1000)
    )
  }

  return <TrackerImage width={1} height={1} src={url} />
}

const TrackerImage = styled.img`
  display: none;
`
