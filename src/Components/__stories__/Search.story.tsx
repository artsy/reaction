import { Box } from "@artsy/palette"
import { storiesOf } from "@storybook/react"
import React from "react"

import { ContextProvider } from "Artsy/SystemContext"
import { SearchPreview } from "Components/Search/Previews"
import { SearchBarQueryRenderer as SearchBar } from "Components/Search/SearchBar"
import { SearchSuggestionsQueryRenderer as SearchSuggestions } from "Components/Search/Suggestions"

storiesOf("Components/Search/SearchBar", module).add("Input", () => (
  <ContextProvider>
    <SearchBar />
  </ContextProvider>
))

storiesOf("Components/Search/Suggestions", module).add("Term: Andy", () => (
  <ContextProvider>
    <SearchSuggestions term="andy" />
  </ContextProvider>
))

storiesOf("Components/Search/Previews/Artist", module)
  .add("An artist with collections", () => (
    <Box width="500px">
      <ContextProvider>
        <SearchPreview entityID="robert-indiana" entityType="Artist" />
      </ContextProvider>
    </Box>
  ))
  .add("An artist without collections", () => (
    <ContextProvider>
      <SearchPreview entityID="douglas-gordon" entityType="Artist" />
    </ContextProvider>
  ))

storiesOf("Components/Search/Previews/MerchandisableArtworks", module).add(
  "No query",
  () => (
    <ContextProvider>
      <SearchPreview entityID="" entityType="" />
    </ContextProvider>
  )
)
