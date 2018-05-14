import styled from "styled-components"
import React from "react"
import { ArtistTooltipContainer } from "./ArtistToolTip"
import { GeneToolTipContainer } from "./GeneToolTip"
import { ArrowDown, ArrowContainer } from "./Components/ArrowDown"

interface Props extends React.HTMLProps<HTMLDivElement> {
  entity: object
  model: string
  showMarketData?: boolean
  onMouseEnter?: any
  onMouseLeave?: any
}

export class ToolTip extends React.Component<Props> {
  getToolTip = () => {
    const { entity, model, showMarketData } = this.props

    switch (model) {
      case "artist": {
        return (
          <ArtistTooltipContainer
            showMarketData={showMarketData}
            artist={entity as any}
          />
        )
      }
      case "gene": {
        return <GeneToolTipContainer gene={entity as any} />
      }
      default: {
        return null
      }
    }
  }

  render() {
    const { entity, onMouseEnter, onMouseLeave, style } = this.props

    if (!entity) return null

    return (
      <ToolTipContainer
        style={{ ...style }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Content>
          {this.getToolTip()}
          <ArrowDown />
        </Content>
      </ToolTipContainer>
    )
  }
}

export const ToolTipContainer = styled.div`
  position: absolute;
`

const Content = styled.div`
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);
  padding: 20px;
  background: white;
  margin-bottom: 15px;
  width: fit-content;
  ${ArrowContainer} {
    bottom: -15px;
    left: calc(50% - 30px);
  }
`
