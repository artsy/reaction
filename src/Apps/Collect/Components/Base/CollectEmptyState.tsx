import { Button, Message, space } from "@artsy/palette"
import React from "react"
import styled from "styled-components"

interface CollectEmptyStateProps {
  onClick: () => void
}

export const CollectEmptyState: React.SFC<CollectEmptyStateProps> = props => (
  <EmptyStateContainer justifyContent="center" p={4}>
    <MessageBody>
      There aren't any works available that meet the following criteria at this
      time. Change your filter criteria to view more works.
    </MessageBody>
    <Button onClick={props.onClick}>Clear all filters</Button>
  </EmptyStateContainer>
)

const EmptyStateContainer = styled(Message)`
  text-align: center;
`

const MessageBody = styled.div`
  margin-bottom: ${space(2)}px;
  max-width: 500px;
`
