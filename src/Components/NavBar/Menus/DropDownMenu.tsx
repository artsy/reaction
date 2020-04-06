import { Box, Flex, Menu, MenuItem } from "@artsy/palette"
import { AnalyticsSchema } from "Artsy"
import { useTracking } from "Artsy/Analytics/useTracking"
import React from "react"
import styled from "styled-components"

interface DropDownNavMenuProps {
  width?: string
  paddingTop?: number
  paddingBottom?: number
}

export const DropDownNavMenu: React.FC<DropDownNavMenuProps> = ({
  width = "100%",
}) => {
  const { trackEvent } = useTracking()

  const trackClick = event => {
    const link = event.target
    const text = link.innerText
    const href = link.parentNode.parentNode.getAttribute("href")

    trackEvent({
      action_type: AnalyticsSchema.ActionType.Click,
      context_module: AnalyticsSchema.ContextModule.HeaderMoreDropdown,
      subject: text,
      destination_path: href,
    })
  }

  return (
    <Menu onClick={trackClick} width={width}>
      <ItemsContainer>
        <Box width={150}>
          <MenuItem href="/galleries">Galleries</MenuItem>
          <MenuItem href="/fairs">Fairs</MenuItem>
          <MenuItem href="/shows">Shows</MenuItem>
          <MenuItem href="/institutions">Museums</MenuItem>
          <MenuItem href="/consign">Consign</MenuItem>
          <MenuItem href="https://partners.artsy.net">
            Artsy for Galleries
          </MenuItem>
        </Box>
        <Box width={150}>
          <MenuItem href="/galleries">Galleries</MenuItem>
          <MenuItem href="/fairs">Fairs</MenuItem>
          <MenuItem href="/shows">Shows</MenuItem>
          <MenuItem href="/institutions">Museums</MenuItem>
          <MenuItem href="/consign">Consign</MenuItem>
          <MenuItem href="https://partners.artsy.net">
            Artsy for Galleries
          </MenuItem>
        </Box>
        <Box width={150}>
          <MenuItem href="/galleries">Galleries</MenuItem>
          <MenuItem href="/fairs">Fairs</MenuItem>
          <MenuItem href="/shows">Shows</MenuItem>
          <MenuItem href="/institutions">Museums</MenuItem>
          <MenuItem href="/consign">Consign</MenuItem>
          <MenuItem href="https://partners.artsy.net">
            Artsy for Galleries
          </MenuItem>
        </Box>
        <Box width={150}>
          <MenuItem href="/galleries">Galleries</MenuItem>
          <MenuItem href="/fairs">Fairs</MenuItem>
          <MenuItem href="/shows">Shows</MenuItem>
          <MenuItem href="/institutions">Museums</MenuItem>
          <MenuItem href="/consign">Consign</MenuItem>
          <MenuItem href="https://partners.artsy.net">
            Artsy for Galleries
          </MenuItem>
        </Box>
        <Box width={150}>
          <MenuItem href="/galleries">Galleries</MenuItem>
          <MenuItem href="/fairs">Fairs</MenuItem>
          <MenuItem href="/shows">Shows</MenuItem>
          <MenuItem href="/institutions">Museums</MenuItem>
          <MenuItem href="/consign">Consign</MenuItem>
          <MenuItem href="https://partners.artsy.net">
            Artsy for Galleries
          </MenuItem>
        </Box>
        <Box width={150}>
          <MenuItem href="/galleries">Galleries</MenuItem>
          <MenuItem href="/fairs">Fairs</MenuItem>
          <MenuItem href="/shows">Shows</MenuItem>
          <MenuItem href="/institutions">Museums</MenuItem>
          <MenuItem href="/consign">Consign</MenuItem>
          <MenuItem href="https://partners.artsy.net">
            Artsy for Galleries
          </MenuItem>
        </Box>
      </ItemsContainer>
    </Menu>
  )
}

const ItemsContainer = styled(Flex)`
  margin: auto auto;
  padding: 10px 0 20px;
`
