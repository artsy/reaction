import { Box, color, MenuItem, Sans } from "@artsy/palette"
import React from "react"
import { MenuLinkData, SimpleLinkData } from "../menuData"

interface DropDownSectionProps {
  section: MenuLinkData
}

export const DropDownSection: React.FC<DropDownSectionProps> = ({
  section,
}) => {
  return (
    <Box width={[110, 110, 110, 135, 150]} py={4} mr={[2, 2, 3, 3]}>
      <Sans size="2" mb={1}>
        {section.text}
      </Sans>
      {section.menu.links.map((menuItem: SimpleLinkData) => {
        return (
          <MenuItem
            px={0}
            py={0.5}
            href={menuItem.href}
            textColor={color("black60")}
            textWeight="regular"
            fontSize="3t"
          >
            {menuItem.text}
          </MenuItem>
        )
      })}
    </Box>
  )
}
