import React from "react"
import { StorybooksRouter } from "Router/StorybooksRouter"
import { routes } from "./routes"

export const Artist = () => {
  return (
    <StorybooksRouter routes={routes} initialRoute="/artist2/andy-warhol" />
  )
}
