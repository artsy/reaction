import { Button, Message, space } from "@artsy/palette"
import React from "react"
import styled from "styled-components"

interface CollectEmptyStateProps {
  onClick: () => void
}

export const CollectEmptyState: React.SFC<CollectEmptyStateProps> = props => (
  <Message justifyContent="center">
    <MessageBody>
      There aren't any works available that meet the following criteria at this
      time. Change your filter criteria to view more works.
    </MessageBody>
    <Button onClick={props.onClick}>Clear all filters</Button>
  </Message>
)

const MessageBody = styled.div`
  margin-bottom: ${space(1)}px;
`
