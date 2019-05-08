import { Menu, MenuItem } from "@artsy/palette"
import React, { useContext } from "react"
import { NavbarContext } from "../NavBar"

export const MoreNavMenu: React.FC = () => {
  const { tracking, Schema } = useContext(NavbarContext)

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
    <Menu title="More">
      {/*
        Hide nav items at md / lg as they appear in the top nav
      */}
      <MenuItem
        href="/galleries"
        display={["block", "block", "none"]}
        onClick={trackClick}
      >
        Galleries
      </MenuItem>
      <MenuItem
        href="/fairs"
        display={["block", "block", "block", "none"]}
        onClick={trackClick}
      >
        Fairs
      </MenuItem>
      <MenuItem href="/artists" onClick={trackClick}>
        Artists
      </MenuItem>
      <MenuItem href="/shows" onClick={trackClick}>
        Shows
      </MenuItem>
      <MenuItem href="/institutions" onClick={trackClick}>
        Museums
      </MenuItem>
      <MenuItem href="https://partners.artsy.net" onClick={trackClick}>
        Artsy for Galleries
      </MenuItem>
    </Menu>
  )
}
