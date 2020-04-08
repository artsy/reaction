import { Box, color, Flex, Menu, MenuItem } from "@artsy/palette"
import { AnalyticsSchema } from "Artsy"
import { useTracking } from "Artsy/Analytics/useTracking"
import React from "react"
import styled from "styled-components"
import { DropDownSection } from "./DropDownSection"

interface DropDownNavMenuProps {
  width?: string
  paddingTop?: number
  paddingBottom?: number
  menu: any
}

export const DropDownNavMenu: React.FC<DropDownNavMenuProps> = ({
  width = "100%",
  menu,
}) => {
  const { trackEvent } = useTracking()

  const trackClick = event => {
    const link = event.target
    const text = link.innerText
    const href = link.parentNode.parentNode.getAttribute("href")

    trackEvent({
      action_type: AnalyticsSchema.ActionType.Click,
      context_module: AnalyticsSchema.ContextModule.HeaderArtworksDropdown,
      subject: text,
      destination_path: href,
    })
  }

  // const getSubMenu = text => {
  //   menu.links.filter(item => {
  //     return item.text === text
  //   })[0]
  // }

  const mediumLinks = menu.links.filter(item => {
    return item.text === "Medium"
  })[0]

  const genreLinks = menu.links.filter(item => {
    return item.text === "Genre"
  })[0]

  const rarityLinks = menu.links.filter(item => {
    return item.text === "Rarity"
  })[0]

  const priceLinks = menu.links.filter(item => {
    return item.text === "Price"
  })[0]

  const sellerLocationLinks = menu.links.filter(item => {
    return item.text === "Seller Location"
  })[0]

  return (
    <Menu onClick={trackClick} width={width}>
      <ItemsContainer>
        <OuterLinkContainer py={4} mr={[4, 4, 4, 6]}>
          <Box mr={[2, 2, 3, 3]} width={[110, 110, 110, 135, 150]}>
            {menu.links.map(menuItem => {
              if (!menuItem.menu) {
                return (
                  <MenuItemContainer mb={1}>
                    <MenuItem
                      paddingX={0}
                      paddingY={0}
                      href={menuItem.href}
                      textColor={color("black60")}
                      textWeight="regular"
                      fontSize="3t"
                    >
                      {menuItem.text}
                    </MenuItem>
                  </MenuItemContainer>
                )
              }
            })}
          </Box>
        </OuterLinkContainer>
        <DropDownSection section={mediumLinks} />
        <DropDownSection section={genreLinks} />
        <DropDownSection section={rarityLinks} />
        <DropDownSection section={priceLinks} />
        <DropDownSection section={sellerLocationLinks} />
      </ItemsContainer>
    </Menu>
  )
}

const ItemsContainer = styled(Flex)`
  margin: auto auto;
`

const MenuItemContainer = styled(Box)``

const OuterLinkContainer = styled(Box)`
  border-right: 1px solid ${color("black10")};
  ${MenuItemContainer} {
    &:last-child {
      margin-top: 130px;
      text-decoration: underline;
      color: ${color("black100")};
    }
  }
`
