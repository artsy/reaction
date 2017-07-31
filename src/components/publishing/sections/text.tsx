import styled from "styled-components"
import { pMedia } from "../../helpers"
import Fonts from "../fonts"

const Text = styled.div`
  max-width: 680px;
  margin: auto;
  ${Fonts.garamond("s23")}
  p {
    font-size: 23px;
    line-height: 34px;
  }
  ${pMedia.sm`
    padding: 20px;
  `}
`

export default Text
