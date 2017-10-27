import numeral from "numeral"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay/compat"

import styled from "styled-components"
import { secondary } from "../../Assets/Fonts"

interface TotalCountProps extends RelayProps, React.HTMLProps<TotalCount> {
  filter_artworks: any
}

export class TotalCount extends React.Component<TotalCountProps, null> {
  render() {
    const total = this.props.filter_artworks.counts.total
    const s = total !== 1 ? "s" : ""
    return (
      <div className={this.props.className}>
        {numeral(total).format("0,0")} Work{s}
      </div>
    )
  }
}

const StyledTotalCount = styled(TotalCount)`
  font-style: italic;
  ${secondary.style};
`

export default createFragmentContainer(
  StyledTotalCount,
  graphql`
    fragment TotalCount_filter_artworks on FilterArtworks {
      counts {
        total
      }
    }
  `
)

interface RelayProps {
  filter_artworks: {
    counts: {
      total: number | null
    } | null
  }
}
