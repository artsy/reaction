import * as React from "react"
import styled from "styled-components"

interface FillwidthItemProps extends React.HTMLProps<HTMLDivElement> {
  width?: any
  height?: any
  margin?: any
}

const FillwidthItem: React.SFC<FillwidthItemProps> = props => {
  return <div {...props} />
}

export default styled(FillwidthItem)`
  margin-right: ${props => props.margin + "px" || 0};
  width: ${props => props.width + "px" || "auto"};
  height: ${props => props.height + "px" || "auto"};
`
