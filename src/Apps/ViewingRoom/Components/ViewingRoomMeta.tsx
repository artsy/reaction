import React from "react"
import { Meta, Title } from "react-head"

export const ViewingRoomMeta: React.FC = props => {
  const TODO_title = "Viewing Room"
  const TODO_description = "Some description"

  return (
    <>
      <Title>{TODO_title}</Title>
      <Meta name="description" content={TODO_description} />
    </>
  )
}
