import { SystemContext } from "Artsy"
import React, { useContext } from "react"
import * as auth from "../Utils/auth"
import { useTracking } from "../Utils/useTracking"

import {
  HeartIcon,
  Menu,
  MenuItem,
  PowerIcon,
  SettingsIcon,
  SoloIcon,
} from "@artsy/palette"

export const UserMenu: React.FC = () => {
  const { tracking, Schema } = useTracking()
  const { mediator } = useContext(SystemContext)

  const trackClick = event => {
    const link = event.target
    const text = link.innerText
    const href = link.parentNode.parentNode.getAttribute("href")

    tracking.trackEvent({
      context_module: Schema.ContextModule.HeaderUserDropdown,
      subject: text,
      destination_path: href,
    })
  }

  return (
    <Menu onClick={trackClick}>
      <MenuItem href="/user/saves">
        <HeartIcon mr={1} /> Saves & Follows
      </MenuItem>
      <MenuItem href="/profile/edit">
        <SoloIcon mr={1} /> Collector Profile
      </MenuItem>
      <MenuItem href="/user/edit">
        <SettingsIcon mr={1} /> Settings
      </MenuItem>
      <MenuItem
        href="/logout"
        onClick={event => {
          event.preventDefault() // `href` is only for tracking purposes
          auth.logout(mediator)
        }}
      >
        <PowerIcon mr={1} /> Log out
      </MenuItem>
    </Menu>
  )
}
