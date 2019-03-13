import { CloseIcon, Icon } from "@artsy/palette"
import React from "react"

// FIXME: Need mobile nav icon from Jeffry

export const MobileToggleIcon: React.FC<{ open: boolean }> = ({ open }) => {
  return open ? (
    <CloseIcon fill="black100" />
  ) : (
    <Icon width="18" height="18" id="Layer_1" viewBox="0 0 32 32">
      <svg>
        <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2 s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2 S29.104,22,28,22z" />
      </svg>
    </Icon>
  )
}
