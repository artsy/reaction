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
    event.preventDefault()
    const link = event.currentTarget
    const text = link.innerText
    const href = link.getAttribute("href")

    tracking.trackEvent({
      flow: Schema.Flow.Header,
      context_module: Schema.ContextModule.HeaderUserDropdown,
      subject: text,
      destination_path: href,
    })
  }

  return (
    <Menu>
      <MenuItem href="/user/saves" onClick={trackClick}>
        <HeartIcon mr={1} /> Saves & Follows
      </MenuItem>
      <MenuItem href="/profile/edit" onClick={trackClick}>
        <SoloIcon mr={1} /> Collector Profile
      </MenuItem>
      <MenuItem href="/user/edit" onClick={trackClick}>
        <SettingsIcon mr={1} /> Settings
      </MenuItem>
      <MenuItem
        href="/logout"
        onClick={event => {
          event.preventDefault() // `href` is only for tracking purposes
          trackClick(event)
          auth.logout(mediator)
        }}
      >
        <PowerIcon mr={1} /> Log out
      </MenuItem>
    </Menu>
  )
}
