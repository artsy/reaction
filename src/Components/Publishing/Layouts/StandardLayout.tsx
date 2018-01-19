import styled from "styled-components"
import { pMedia } from "../../Helpers"

export const StandardLayoutParent = styled.div`
  margin: 0 40px 100px 40px;
  ${pMedia.sm`
    margin: 0 0 100px 0;
  `};
`

export const StandardLayout = styled.div`
  max-width: 1250px;
  display: flex;
  margin: auto;
  justify-content: space-between;
`
