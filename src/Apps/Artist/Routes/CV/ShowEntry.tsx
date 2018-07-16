import { Serif, SerifSize } from "@artsy/palette"
import React, { SFC } from "react"

const FIXME_DOMAIN = "https://www.artsy.net"

interface ShowEntryProps {
  node: any
  size?: SerifSize
}

// FIXME: Check for null links
// FIXME: Figure out how to always point to artsy.net env? how to handle urls?
export const ShowEntry: SFC<ShowEntryProps> = ({ node, size = "3" }) => (
  <Serif size={size} mb={1}>
    <Serif size={size} display="inline" italic>
      {node.href ? (
        <a href={FIXME_DOMAIN + node.href} className="noUnderline">
          {node.name}
        </a>
      ) : (
        <span>{node.name}</span>
      )}
    </Serif>,{" "}
    {node.partner.href ? (
      <a href={FIXME_DOMAIN + node.partner.href} className="noUnderline">
        {node.partner.name}
      </a>
    ) : (
      <span>{node.partner.name}</span>
    )}
    {node.city && `, ${node.city}`}
  </Serif>
)
