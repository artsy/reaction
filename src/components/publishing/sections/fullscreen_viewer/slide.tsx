import * as React from "react"
import styled from "styled-components"
import { pMedia } from "../../../helpers"
import Fonts from "../../fonts"
import Caption from "./caption"

const Slide = props => {
  const section = props.section
  const src = section.url || section.image
  console.log(props)
  return (
    <SlideContainer>
      <Title>{section.title}</Title>
      <Image src={src} />
      <Caption caption={section.caption} total={props.total} index={props.index} />
    </SlideContainer>
  )
}

const SlideContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`
const Image = styled.div`
  display: block;
  background: url(${props => props.src}) no-repeat center;
  background-size: contain;
  flex: 1;
  margin: 50px 60px;
  ${pMedia.sm`
    margin: 20px 0;
  `}
`
const Title = styled.div`
  min-height: 25px;
  padding: 30px 60px 0 60px;
  ${Fonts.unica("s40")}
  ${pMedia.sm`
    padding: 20px 60px 0 20px;
    ${Fonts.unica("s19")}
  `}
`

export default Slide
