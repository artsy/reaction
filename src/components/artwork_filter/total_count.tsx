import numeral from "numeral"
import * as React from "react"
import * as Relay from "react-relay"

import styled from "styled-components"
import { secondary } from "../../assets/fonts"

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
  ${secondary.style}
`

export default Relay.createContainer(StyledTotalCount, {
  fragments: {
    filter_artworks: () => Relay.QL`
      fragment on FilterArtworks {
        counts {
          total
        }
      }
    `,
  },
})

interface RelayProps {
  filter_artworks: {
    counts: {
      total: number | null
    } | null
  }
}
