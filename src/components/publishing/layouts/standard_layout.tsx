import styled from "styled-components"
import { pMedia } from "../../helpers"

export default styled.div`
  display: flex;
  max-width: 1250px;
  margin: auto;
  padding: 0 20px;
  ${pMedia.md`
    padding: 0px;
  `}
`
