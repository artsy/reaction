import React from "react"
import { StorybooksRouter } from "Router/StorybooksRouter"
import { Boot } from "Styleguide/Pages/Boot"
import { routes } from "./routes"

export const Artwork = () => {
  return (
    <Boot>
      <StorybooksRouter
        routes={routes}
        initialRoute="pablo-picasso-david-et-bethsabee"
      />
    </Boot>
  )
}
