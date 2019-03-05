import { Menu, MenuItem } from "@artsy/palette"
import React from "react"

export const MoreNavMenu: React.FC = () => {
  return (
    <Menu title="More">
      {/*
        Hide nav items at md / lg as they appear in the top nav
      */}
      <MenuItem display={["block", "block", "none"]}>Galleries</MenuItem>
      <MenuItem display={["block", "block", "block", "none"]}>Fairs</MenuItem>

      <MenuItem>Artists</MenuItem>
      <MenuItem>Shows</MenuItem>
      <MenuItem>Museums</MenuItem>
      <MenuItem>Artsy for Galleries</MenuItem>
    </Menu>
  )
}
