import { BorderBox, Box, Flex, Sans } from "@artsy/palette"
import catchLinks from "catch-links"
import { NavBar } from "Components/NavBar"
import { Link } from "found"
import React, { useEffect } from "react"

import { routes as artistRoutes } from "Apps/Artist/routes"
import { routes as artworkRoutes } from "Apps/Artwork/routes"
import { routes as collectRoutes } from "Apps/Collect/routes"
import { routes as collectionRoutes } from "Apps/Collections/routes"
import { routes as searchRoutes } from "Apps/Search/routes"

const RouteNamespace = "/experimental-app-shell"

const routes = [
  ...artistRoutes,
  ...artworkRoutes,
  ...collectRoutes,
  ...collectionRoutes,
  ...searchRoutes,
].map(route => {
  return {
    ...route,
    path: route.path.substring(1), // remove leading slash
  }
})

const links = [
  "/artist/andy-warhol",
  "/artwork/pablo-picasso-guernica",
  "/collect",
  "/artist/pablo-picasso/cv",
  "/artwork/andy-warhol-chanel-no-5-suite-of-four-prints",
  "/artwork/charles-arnoldi-brig-1",
  "/artist/andy-warhol/articles",
].map(link => {
  return RouteNamespace + link
})

export const appShellRoutes = [
  {
    path: RouteNamespace,
    Component: ({ children, router }) => {
      useEffect(() => {
        catchLinks(window, href => {
          const url = RouteNamespace + href
          router.push(url)
        })
      }, [])

      return (
        <Box width="100%">
          <Box pb={6}>
            <Box left={0} position="fixed" width={"100%"} zIndex={10}>
              <NavBar />
            </Box>
          </Box>

          <Flex m={3} justifyContent="space-between" width="100%">
            {links.map((link, key) => {
              return (
                <BorderBox key={key} p={0.5}>
                  <Link to={link}>
                    <Sans size="2">{link}</Sans>
                  </Link>
                </BorderBox>
              )
            })}
          </Flex>

          <Box mx={1}>
            <Box>{children}</Box>
            {/*
            <Box>
              <Footer />
            </Box>
            */}
          </Box>
        </Box>
      )
    },
    children: routes,
  },
]
