import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../helpers"

interface StandardLayoutProps {
  isTruncated?: boolean
}

const getHeight = isTruncated => {
  return isTruncated ? "500px;" : "100%;"
}

const getOverflow = isTruncated => {
  return isTruncated ? "hidden;" : "none;"
}

const Div: StyledFunction<StandardLayoutProps> = styled.div

const StandardLayout = Div`
  display: flex;
  max-width: 1250px;
  margin: auto;
  padding: 0 20px;
  height: ${props => getHeight(props.isTruncated)}
  overflow: ${props => getOverflow(props.isTruncated)}
  ${pMedia.md`
    padding: 0px;
  `}
`

export default StandardLayout
