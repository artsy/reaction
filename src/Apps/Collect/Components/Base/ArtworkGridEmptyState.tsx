import { Message } from "@artsy/palette"
import React from "react"
import styled from "styled-components"

interface ArtworkGridEmptyStateProps {
  onClearFilters: () => void
}

export const ArtworkGridEmptyState: React.SFC<
  ArtworkGridEmptyStateProps
> = props => (
  <EmptyMessage>
    <span>
      There aren't any works available that meet the following criteria at this
      time.
    </span>
    {props.onClearFilters && (
      <span>
        {" "}
        Change your filter criteria to view more works.{" "}
        <a onClick={props.onClearFilters}>Clear all filters</a>.
      </span>
    )}
  </EmptyMessage>
)

// TODO: add link styling to palette Message
const EmptyMessage = styled(Message)`
  a {
    text-decoration: underline;
    cursor: pointer;
  }
`
