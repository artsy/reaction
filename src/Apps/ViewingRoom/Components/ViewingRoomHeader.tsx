import React from "react"
import { Flex, color, Box, ResponsiveImage, Sans } from "@artsy/palette"
import { NavBarHeight } from "Components/NavBar"
import { Media } from "Utils/Responsive"
import { graphql, createFragmentContainer } from "react-relay"

import { ViewingRoomHeader_viewingRoom } from "__generated__/ViewingRoomHeader_viewingRoom.graphql"

interface ViewingRoomHeaderProps {
  viewingRoom: ViewingRoomHeader_viewingRoom
}

const ViewingRoomHeader: React.FC<ViewingRoomHeaderProps> = props => {
  return (
    <>
      <Media greaterThanOrEqual="sm">
        <ViewingRoomHeaderLarge {...props} />
      </Media>
      <Media lessThan="sm">
        <ViewingRoomHeaderSmall {...props} />
      </Media>
    </>
  )
}

export const ViewingRoomHeaderFragmentContainer = createFragmentContainer(
  ViewingRoomHeader,
  {
    viewingRoom: graphql`
      fragment ViewingRoomHeader_viewingRoom on ViewingRoom {
        heroImageURL
        title
        partner {
          name
        }
        endAt
      }
    `,
  }
)

const ViewingRoomHeaderSmall: React.FC<ViewingRoomHeaderProps> = props => {
  const {
    viewingRoom: { heroImageURL, title },
  } = props

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
        src={heroImageURL}
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
          {title}
        </Sans>
      </Box>

      <Metadata {...props} />
    </Flex>
  )
}

const ViewingRoomHeaderLarge: React.FC<ViewingRoomHeaderProps> = props => {
  const {
    viewingRoom: { heroImageURL, title },
  } = props

  return (
    <Flex
      style={{
        height: `calc(100vh - ${NavBarHeight}px)`,
        borderBottom: `1px solid ${color("black10")}`,
      }}
    >
      <Box width="50%" style={{ overflow: "hidden" }}>
        <ResponsiveImage
          src={heroImageURL}
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
          {title}
        </Sans>

        <Metadata {...props} />
      </Flex>
    </Flex>
  )
}

const Metadata: React.FC<ViewingRoomHeaderProps> = props => {
  const {
    viewingRoom: {
      partner: { name },
      endAt,
    },
  } = props

  return (
    <Box position="absolute" left={0} bottom={0} width="100%">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        p={2}
      >
        <Sans size={["3", "4"]} color={["white100", "black100"]}>
          {name}
        </Sans>
        <Sans size={["3", "4"]} color={["white100", "black100"]}>
          {endAt}
        </Sans>
      </Flex>
    </Box>
  )
}
