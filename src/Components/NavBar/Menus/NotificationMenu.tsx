import React from "react"

import {
  Box,
  Flex,
  Link,
  Menu,
  MenuItem,
  Sans,
  Separator,
} from "@artsy/palette"

export const NotificationMenu: React.FC = () => {
  return (
    <Menu title="Actvity">
      <MenuItem>
        <Flex alignItems="center">
          <Box width={40} height={40} bg="black5" mr={2} />
          <Box>
            <Sans size="2">5 works added</Sans>
            <Sans size="2" weight="medium">
              Jeff Koons
            </Sans>
          </Box>
        </Flex>
      </MenuItem>
      <MenuItem>
        <Flex alignItems="center">
          <Box width={40} height={40} bg="black5" mr={2} />
          <Box>
            <Sans size="2">5 works added</Sans>
            <Sans size="2" weight="medium">
              Josef Albers
            </Sans>
          </Box>
        </Flex>
      </MenuItem>
      <MenuItem>
        <Flex alignItems="center">
          <Box width={40} height={40} bg="black5" mr={2} />
          <Box>
            <Sans size="2">5 works added</Sans>
            <Sans size="2" weight="medium">
              Ellsworth Kelly
            </Sans>
          </Box>
        </Flex>
      </MenuItem>
      <Flex p={2} flexDirection="column" alignItems="center">
        <Separator />
        <Box pt={2}>
          <Sans size="2">
            <Link href="/" style={{ textDecoration: "underline" }}>
              View all
            </Link>
          </Sans>
        </Box>
      </Flex>
    </Menu>
  )
}
