import React from "react"

import { Box, Button, EditIcon, Flex, Sans, Serif } from "@artsy/palette"

export const ArtistConsignHowtoSell: React.FC = props => {
  return (
    <Box>
      <Box>
        <Serif size="8">How to sell your collection with Artsy</Serif>
      </Box>

      <Flex>
        <Box>
          <Box>
            <EditIcon />
          </Box>
          <Box>Submit once</Box>
          <Box>
            <Sans size="2">
              Submit your artwork details and images. Artsy will review and
              approve qualified submissions for consignment.
            </Sans>
          </Box>
        </Box>
        <Box>
          <Box>
            <EditIcon />
          </Box>
          <Box>Receive offers</Box>
          <Box>
            <Sans size="2">
              If your work is accepted, you’ll receive competitive consignment
              offers from auction houses, galleries, and collectors.
            </Sans>
          </Box>
        </Box>
        <Box>
          <Box>
            <EditIcon />
          </Box>
          <Box>Match & sell</Box>
          <Box>
            <Sans size="2">
              With our specialists’ expert guidance and advisement, evaluate
              your offers, choose the best offer for you and sell your work.
            </Sans>
          </Box>
        </Box>
      </Flex>

      <Box>
        <Button>Request a price estimate</Button>
      </Box>
    </Box>
  )
}
