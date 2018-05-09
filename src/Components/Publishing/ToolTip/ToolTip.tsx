import styled from "styled-components"
import React from "react"
import { ArtistTooltipContainer } from "./ArtistToolTip"
import { GeneToolTipContainer } from "./GeneToolTip"
import { ArrowDown, ArrowContainer } from "./Components/ArrowDown"

interface Props {
  entity: object
  model: string
  showMarketData?: boolean
  onHovered?: (hovered: boolean) => void
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
    if (!this.props.entity) return null
    const onHovered = this.props.onHovered

    return (
      <ToolTipContainer
        onMouseEnter={() => onHovered && onHovered(true)}
        onMouseLeave={() => onHovered && onHovered(false)}
      >
        {this.getToolTip()}
        <ArrowDown />
      </ToolTipContainer>
    )
  }
}

export const ToolTipContainer = styled.div`
  height: 310px;
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
