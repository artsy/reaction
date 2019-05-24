import React, { SFC } from "react"
import { DisplayAd, DisplayAdProps } from "./DisplayAd"

export const NewDisplayPanel: SFC<DisplayAdProps> = props => (
  <DisplayAd {...props} />
)
