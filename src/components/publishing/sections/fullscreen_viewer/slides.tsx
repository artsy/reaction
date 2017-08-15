import { compact, flatten, map } from "lodash"
import * as React from "react"
import styled from "styled-components"
import Caption from "./caption"

interface SlidesProps extends React.HTMLProps<HTMLDivElement> {
  sections: any
}

const getSlideItems = sections => {
  return compact(flatten(map(sections, "images")))
}

const Slides: React.SFC<SlidesProps> = props => {
  const { sections } = props
  const images = getSlideItems(sections)
  const slides = map(images, (image, i) => {
    const src = image.url || image.image
    return (
      <Slide>
        <img src={src} key={i} />
        <Caption caption={image.caption} />
      </Slide>
    )
  })
  return <SlidesContainer>{slides}</SlidesContainer>
}

const Slide = styled.div`
  display: flex;
  flex-direction: column;
`
const SlidesContainer = styled.div`
  display: flex;
`

export default Slides
