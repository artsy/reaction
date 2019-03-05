import React from "react"

import {
  HeartIcon,
  Menu,
  MenuItem,
  PowerIcon,
  SettingsIcon,
  SoloIcon,
} from "@artsy/palette"

export const UserMenu: React.FC = () => {
  return (
    <Menu>
      <MenuItem href="/">
        <HeartIcon mr={1} /> Saves & Follows
      </MenuItem>
      <MenuItem href="/">
        <SoloIcon mr={1} /> Collector Profile
      </MenuItem>
      <MenuItem href="/">
        <SettingsIcon mr={1} /> Settings
      </MenuItem>
      <MenuItem href="/">
        <PowerIcon mr={1} /> Log out
      </MenuItem>
    </Menu>
  )
}
