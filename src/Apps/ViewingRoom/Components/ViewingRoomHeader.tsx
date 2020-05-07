import React from "react"
import { Flex, color, Box, ResponsiveImage, Sans } from "@artsy/palette"
import styled from "styled-components"
import { NavBarHeight } from "Components/NavBar"

export const ViewingRoomHeader: React.FC = props => {
  return (
    <HeaderContainer>
      <ImageArea>
        <ResponsiveImage
          src="https://user-images.githubusercontent.com/236943/81243255-342dcc00-8fc4-11ea-9a2b-2ab96ab67c9b.png"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
          }}
        />
      </ImageArea>

      <ContentArea>
        <Sans size="10" element="h1">
          Christine Sun Kim
        </Sans>

        <Metadata>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            p={2}
          >
            <Flex alignItems="center">
              <Box>
                <Sans size="4">Gallery Name</Sans>
              </Box>
            </Flex>
            <Box>
              <Sans size="4">Closes in 5 days</Sans>
            </Box>
          </Flex>
        </Metadata>
      </ContentArea>
    </HeaderContainer>
  )
}

const HeaderContainer = styled(Flex)`
  height: calc(100vh - ${NavBarHeight}px);
  border-bottom: 1px solid ${color("black10")};
`

const ImageArea = styled(Box).attrs({
  width: "50%",
})`
  overflow: hidden;
`

const ContentArea = styled(Flex).attrs({
  alignItems: "center",
  justifyContent: "center",
  width: "50%",
})`
  position: relative;
`

const Metadata = styled(Box)`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
`
