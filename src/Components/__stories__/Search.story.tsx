import { storiesOf } from "@storybook/react"
import React from "react"

import { ContextProvider } from "Artsy/SystemContext"
import { SearchPreview } from "Components/Search/Previews"
import { SearchSuggestionsQueryRenderer as SearchSuggestions } from "Components/Search/Suggestions"

storiesOf("Components/Search/Suggestions", module).add("Term: Andy", () => (
  <ContextProvider>
    <SearchSuggestions term="andy" />
  </ContextProvider>
))

storiesOf("Components/Search/Previews/Sale", module).add("A sale", () => (
  <ContextProvider>
    <SearchPreview entityID="phillips" entityType="Sale" />
  </ContextProvider>
))

storiesOf("Components/Search/Previews/Artist", module)
  .add("An artist with collections", () => (
    <ContextProvider>
      <SearchPreview entityID="kaws" entityType="Artist" />
    </ContextProvider>
  ))
  .add("An artist without collections", () => (
    <ContextProvider>
      <SearchPreview entityID="douglas-gordon" entityType="Artist" />
    </ContextProvider>
  ))

storiesOf("Components/Search/Previews/Sale", module).add("A sale", () => (
  <ContextProvider>
    <SearchPreview entityID="phillips" entityType="Sale" />
  </ContextProvider>
))
