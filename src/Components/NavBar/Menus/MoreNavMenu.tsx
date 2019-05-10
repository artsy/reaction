import { Menu, MenuItem } from "@artsy/palette"
import React from "react"
import { useTracking } from "../Utils/useTracking"

export const MoreNavMenu: React.FC = () => {
  const { tracking, Schema } = useTracking()

  const trackClick = event => {
    const link = event.target
    const text = link.innerText
    const href = link.parentNode.parentNode.getAttribute("href")

    tracking.trackEvent({
      context_module: Schema.ContextModule.HeaderMoreDropdown,
      subject: text,
      destination_path: href,
    })
  }

  return (
    <Menu title="More" onClick={trackClick}>
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
