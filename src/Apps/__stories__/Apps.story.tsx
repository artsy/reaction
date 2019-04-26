import { MockRouter } from "DevTools/MockRouter"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { routes as collectRoutes } from "../Collect/routes"
import { routes as collectionsRoutes } from "../Collections/routes"
import { SearchResultsSkeleton } from "../Search/Components/SearchResultsSkeleton"
import { routes as searchRoutes } from "../Search/routes"

storiesOf("Apps", module)
  .add("Collect Page", () => {
    return (
      <MockRouter
        routes={collectRoutes}
        initialRoute="/collect"
        context={{
          mediator: {
            trigger: x => x,
          },
        }}
      />
    )
  })
  .add("Collection Page", () => {
    return (
      <MockRouter
        routes={collectRoutes}
        initialRoute="/collection/david-hockney-ipad-drawings"
        context={{
          mediator: {
            trigger: x => x,
          },
        }}
      />
    )
  })
  .add("Collections Page", () => {
    return (
      <MockRouter
        routes={collectionsRoutes}
        initialRoute="/collections"
        context={{}}
      />
    )
  })
  .add("Search Results Page", () => {
    return <MockRouter routes={searchRoutes} initialRoute="/search?term=andy" />
  })
  .add("Search Results Skeleton", () => <SearchResultsSkeleton />)
