import * as React from "react"
import styled from "styled-components"
import Caption from "./caption"

const Slide = props => {
  const section = props.section
  const src = section.url || section.image
  return (
    <SlideContainer>
      <Image src={src} />
      <Caption caption={section.caption} />
    </SlideContainer>
  )
}

const SlideContainer = styled.div`
  // width: 100vw;
  // height: 100vh;
  display: flex;
  flex-direction: column;
`
const Image = styled.div`
  height: 100vh;
  display: block;
  background: url(${props => props.src}) no-repeat center;
  background-size: contain;
`

export default Slide
