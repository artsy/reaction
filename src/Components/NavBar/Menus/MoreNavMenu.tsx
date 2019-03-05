import { Menu, MenuItem } from "@artsy/palette"
import React from "react"

export const MoreNavMenu: React.FC = () => {
  return (
    <Menu title="More">
      {/*
        Hide nav items at md / lg as they appear in the top nav
      */}
      <MenuItem href="/" display={["block", "block", "none"]}>
        Galleries
      </MenuItem>
      <MenuItem href="/" display={["block", "block", "block", "none"]}>
        Fairs
      </MenuItem>

      <MenuItem href="/">Artists</MenuItem>
      <MenuItem href="/">Shows</MenuItem>
      <MenuItem href="/">Museums</MenuItem>
      <MenuItem href="/">Artsy for Galleries</MenuItem>
    </Menu>
  )
}
