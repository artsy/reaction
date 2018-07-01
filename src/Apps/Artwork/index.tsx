import React from "react"
import { StorybooksRouter } from "Router/StorybooksRouter"
import { routes } from "./routes"

export const Artwork = () => {
  return (
    <StorybooksRouter
      routes={routes}
      initialRoute="/pablo-picasso-david-et-bethsabee"
    />
  )
}
