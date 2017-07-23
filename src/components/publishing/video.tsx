import * as _ from "lodash"
import * as React from "react"
import styled from "styled-components"
import URL from "url"
const OPTIONS = {
  query: {
    title: 0,
    portrait: 0,
    badge: 0,
    byline: 0,
    showinfo: 0,
    rel: 0,
    controls: 2,
    modestbranding: 1,
    iv_load_policy: 3,
    color: "E5E5E5",
  },
}

interface VideoProps {
  mobileHeight?: number
  layout?: string
  src: string
}

function detectPlatform(url) {
  if (url.hostname.indexOf("vimeo.com") > 0) {
    return "vimeo"
  } else if (url.hostname.indexOf("youtu") > 0) {
    return "youtube"
  }
}

function getId(url) {
  url.split("/")[-1]
}

function embedVideo(src) {
  const url = URL.parse(src, true)
  const platform = detectPlatform(src)
  const id = getId(url)
  return <iframe src={src} frameBorder={"0"} allowFullScreen />
}

const Video: React.SFC<VideoProps> = props => {
  const { src } = props
  return embedVideo(src)
}

export default styled(Video)`
  width: 100%;
`
