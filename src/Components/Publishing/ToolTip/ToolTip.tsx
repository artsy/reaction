import styled from "styled-components"
import React from "react"
import { GeneToolTip } from "./Gene"
import { ArrowDown, ArrowContainer } from "./Components/ArrowDown"

interface Props {
  entity: object
  model: string
}

export class ToolTip extends React.Component<Props, null> {
  getToolTip = () => {
    const { entity, model } = this.props

    switch (model) {
      case "gene": {
        return <GeneToolTip {...entity} />
      }
      default: {
        return <div />
      }
    }
  }

  render() {
    return (
      <ToolTipContainer>
        {this.getToolTip()}
        <ArrowDown />
      </ToolTipContainer>
    )
  }
}

export const ToolTipContainer = styled.div`
  position: relative;
  width: 240px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);
  padding: 20px;
  ${ArrowContainer} {
    bottom: -15px;
    left: calc(50% - 30px);
  }
`
