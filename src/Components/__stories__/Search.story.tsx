import { Box } from "@artsy/palette"
import React from "react"
import { storiesOf } from "storybook/storiesOf"

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
    <Box width="450px" p="20px">
      <ContextProvider>
        <SearchPreview entityID="robert-indiana" entityType="Artist" />
      </ContextProvider>
    </Box>
  ))
  .add("An artist without collections", () => (
    <Box width="450px" p="20px">
      <ContextProvider>
        <SearchPreview entityID="douglas-gordon" entityType="Artist" />
      </ContextProvider>
    </Box>
  ))

storiesOf("Components/Search/Previews/MerchandisableArtworks", module).add(
  "No query",
  () => (
    <Box width="450px" p="20px">
      <ContextProvider>
        <SearchPreview entityID="" entityType="" />
      </ContextProvider>
    </Box>
  )
)
