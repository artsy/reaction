import * as React from "react"
import styled from "styled-components"

interface FillwidthItemProps extends React.HTMLProps<HTMLDivElement> {
  width?: number
  height?: number
  margin?: number
  key: string
}

const FillwidthItem: React.SFC<FillwidthItemProps> = props => {
  const { key, ...rest } = Object.assign({}, props)
  return <div {...rest} key={key} />
}

export default styled(FillwidthItem)`
  margin-right: ${props => props.margin + "px" || 0};
  width: ${props => props.width + "px" || "auto"};
  height: ${props => props.height + "px" || "auto"};
`
