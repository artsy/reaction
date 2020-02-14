import { Box, Button, TextArea } from "@artsy/palette"
import React, { useState } from "react"

export const Reply = () => {
  const [, setMessage] = useState("")
  return (
    <Box m={1}>
      <TextArea
        description="For your security do not share personal information."
        onChange={event => setMessage(event.value)}
      />
      <Button>Reply</Button>
    </Box>
  )
}
