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
      <MenuItem>
        <HeartIcon mr={1} /> Saves & Follows
      </MenuItem>
      <MenuItem>
        <SoloIcon mr={1} /> Collector Profile
      </MenuItem>
      <MenuItem>
        <SettingsIcon mr={1} /> Settings
      </MenuItem>
      <MenuItem>
        <PowerIcon mr={1} /> Log out
      </MenuItem>
    </Menu>
  )
}
