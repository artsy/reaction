import { SvgComponent } from "Components/Publishing/EditorialFeature/Components/Vanguard2019/Blobs/NewlyEstablished"
import { ArticleData } from "Components/Publishing/Typings"
import React from "react"
import styled from "styled-components"

export const VanguardVideoBackground: React.SFC<{
  article: ArticleData
}> = props => {
  const { hero_section } = props.article
  const url = (hero_section && hero_section.url) || ""
  const isVideo = url.includes("mp4")
  const video = (
    <Video src={url} autoPlay controls={false} loop muted playsInline />
  )
  if (isVideo) {
    return <SvgComponent video={video} />
  } else {
    return null
  }
}

const Video = styled.video`
  width: 100%;
  height: 100%;
  max-height: 95vh;
  object-fit: cover;
  position: absolute;
  z-index: -1;
`
