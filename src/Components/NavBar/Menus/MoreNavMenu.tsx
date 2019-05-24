import { Menu, MenuItem } from "@artsy/palette"
import { AnalyticsSchema } from "Artsy"
import { useTracking } from "Artsy/Analytics/useTracking"
import React from "react"

export const MoreNavMenu: React.FC = () => {
  const { trackEvent } = useTracking()

  const trackClick = event => {
    const link = event.target
    const text = link.innerText
    const href = link.parentNode.parentNode.getAttribute("href")

    trackEvent({
      context_module: AnalyticsSchema.ContextModule.HeaderMoreDropdown,
      subject: text,
      destination_path: href,
    })
  }

  return (
    <Menu onClick={trackClick}>
      {/*
        Hide nav items at md / lg as they appear in the top nav
      */}
      <MenuItem href="/galleries" display={["block", "block", "none"]}>
        Galleries
      </MenuItem>
      <MenuItem href="/fairs" display={["block", "block", "block", "none"]}>
        Fairs
      </MenuItem>
      <MenuItem href="/artists">Artists</MenuItem>
      <MenuItem href="/shows">Shows</MenuItem>
      <MenuItem href="/institutions">Museums</MenuItem>
      <MenuItem href="https://partners.artsy.net">Artsy for Galleries</MenuItem>
    </Menu>
  )
}
