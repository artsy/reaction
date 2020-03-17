import { Box, Button, Sans, Serif } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import React from "react"

import { Meta, Title as HeadTitle } from "react-head"

export const Processing = () => {
  return (
    <AppContainer>
      <HeadTitle>Artsy | ID Verification</HeadTitle>

      <Meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=5 viewport-fit=cover"
      />

      <Box px={[2, 3]} mb={6} mt={4}>
        <Box
          mx={["auto"]}
          width={[335, "80%"]}
          maxWidth={"400px"}
          textAlign="center"
        >
          <Serif size="6" color="black100">
            Your verification is processing
          </Serif>

          <Sans size="4" color="black100" mt={2}>
            Thank you for completing identity verification. Your verification is
            processing and may take up to 5 minutes to complete.
          </Sans>
          <Sans size="4" color="black100" mt={2}>
            In the meantime, you can still browse on Artsy.
          </Sans>
          <Button
            block
            width="100%"
            mt={2}
            onClick={() => (window.location.href = "/")}
          >
            Return home
          </Button>
        </Box>
      </Box>
    </AppContainer>
  )
}

export default Processing
