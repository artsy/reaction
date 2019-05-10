import React, { useContext } from "react"

import {
  HeartIcon,
  Menu,
  MenuItem,
  PowerIcon,
  SettingsIcon,
  SoloIcon,
} from "@artsy/palette"

import { SystemContext } from "Artsy"
import { useTracking } from "Utils/Hooks/useTracking"
import * as auth from "../Utils/auth"

export const UserMenu: React.FC = () => {
  const { tracking, AnalyticsSchema } = useTracking()
  const { mediator } = useContext(SystemContext)

  const trackClick = event => {
    const link = event.target
    const text = link.innerText
    const href = link.parentNode.parentNode.getAttribute("href")

    tracking.trackEvent({
      context_module: AnalyticsSchema.ContextModule.HeaderUserDropdown,
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
