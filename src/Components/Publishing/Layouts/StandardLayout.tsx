import styled from "styled-components"
import { pMedia } from "../../helpers"

const StandardLayout = styled.div`
  display: flex;
  max-width: 1250px;
  margin: auto auto 100px auto;
  ${pMedia.md`
    padding: 0px;
  `}
`

export default StandardLayout
