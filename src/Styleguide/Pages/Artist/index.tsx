import React from "react"
import { StorybooksRouter } from "Router/StorybooksRouter"
import { Boot } from "Styleguide/Pages/Boot"
import { routes } from "./routes"

export const Artist = () => {
  return (
    <Boot>
      <StorybooksRouter
        routes={routes}
        initialRoute="/andy-warhol/auction-results"
      />
    </Boot>
  )
}
