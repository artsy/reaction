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
      <MenuItem href="/user/saves">
        <HeartIcon mr={1} /> Saves & Follows
      </MenuItem>
      <MenuItem href="/profile/edit">
        <SoloIcon mr={1} /> Collector Profile
      </MenuItem>
      <MenuItem href="/user/edit">
        <SettingsIcon mr={1} /> Settings
      </MenuItem>
      <MenuItem href="/todo">
        <PowerIcon mr={1} /> Log out
      </MenuItem>
    </Menu>
  )
}
