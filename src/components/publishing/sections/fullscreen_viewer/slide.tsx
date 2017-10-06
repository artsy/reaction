import { omit } from "lodash"
import * as React from "react"
import styled from "styled-components"
import { resize } from "../../../../utils/resizer"
import { pMedia } from "../../../helpers"
import Fonts from "../../fonts"
import Caption from "./caption"

const Slide = props => {
  const newProps = omit(props, ["section", "index", "total", "isCaptionOpen"])
  const section = props.section
  const src = resize(section.url || section.image, { width: 1200 })
  return (
    <div {...newProps}>
      <SlideContainer>
        <Title>{section.setTitle}</Title>
        <Image src={src} title={section.caption} />
        <Caption open={props.isCaptionOpen} section={section} total={props.total} index={props.index} />
      </SlideContainer>
    </div>
  )
}

const SlideContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`
const Image = styled.div`
  display: block;
  background: url(${props => props.src}) no-repeat center;
  background-size: contain;
  flex: 1;
  margin: 50px 60px;
  ${pMedia.sm`
    margin: 20px 0 80px 0;
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
