import React, { SFC } from "react"
import { DisplayAd, DisplayAdProps } from "./DisplayAd"

export const NewDisplayCanvas: SFC<DisplayAdProps> = props => (
  <DisplayAd {...props} />
)
