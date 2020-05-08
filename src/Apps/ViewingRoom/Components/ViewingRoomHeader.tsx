import React from "react"
import { Flex, color, Box, ResponsiveImage, Sans } from "@artsy/palette"
import { NavBarHeight } from "Components/NavBar"
import { Media } from "Utils/Responsive"

export const ViewingRoomHeader: React.FC = props => {
  return (
    <>
      <Media greaterThanOrEqual="sm">
        <ViewingRoomHeaderLarge />
      </Media>
      <Media lessThan="sm">
        <ViewingRoomHeaderSmall />
      </Media>
    </>
  )
}

const ViewingRoomHeaderSmall = props => {
  const HeaderHeight = `calc(100vh - ${NavBarHeight * 2.8}px)`

  return (
    <Flex
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      height={HeaderHeight}
      style={{
        borderBottom: `1px solid ${color("black10")};`,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <ResponsiveImage
        src="https://user-images.githubusercontent.com/236943/81243255-342dcc00-8fc4-11ea-9a2b-2ab96ab67c9b.png"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%",
        }}
      />

      {/*
        Gradient overlay to raise text visibility
      */}
      <Box
        width="100%"
        height={HeaderHeight}
        position="absolute"
        top="0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.25) 100%)",
        }}
      />

      <Box position="absolute" bottom="20%">
        <Sans size="8" element="h1" color="white100">
          Christine Sun Kim
        </Sans>
      </Box>

      <Metadata />
    </Flex>
  )
}

const ViewingRoomHeaderLarge = props => {
  return (
    <Flex
      style={{
        height: `calc(100vh - ${NavBarHeight}px)`,
        borderBottom: `1px solid ${color("black10")}`,
      }}
    >
      <Box width="50%" style={{ overflow: "hidden" }}>
        <ResponsiveImage
          src="https://user-images.githubusercontent.com/236943/81243255-342dcc00-8fc4-11ea-9a2b-2ab96ab67c9b.png"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
          }}
        />
      </Box>

      <Flex
        alignItems="center"
        justifyContent="center"
        width="50%"
        style={{ position: "relative" }}
      >
        <Sans size="10" element="h1">
          Christine Sun Kim
        </Sans>

        <Metadata />
      </Flex>
    </Flex>
  )
}

const Metadata: React.FC = props => {
  return (
    <Box position="absolute" left={0} bottom={0} width="100%">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        p={2}
      >
        <Sans size={["3", "4"]} color={["white100", "black100"]}>
          Gallery Name
        </Sans>
        <Sans size={["3", "4"]} color={["white100", "black100"]}>
          Closes in 5 days
        </Sans>
      </Flex>
    </Box>
  )
}
