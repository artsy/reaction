import Input from "Components/Input"
import { SearchBarRefetchContainer as SearchBar } from "Components/Search/SearchBar"
import { SuggestionItem } from "Components/Search/Suggestions/SuggestionItem"
import { renderRelayTree } from "DevTools"
import { MockBoot } from "DevTools/MockBoot"
import { ReactWrapper } from "enzyme"
import React from "react"
import { graphql } from "react-relay"
import { flushPromiseQueue } from "Utils/flushPromiseQueue"

jest.unmock("react-relay")

const searchResults = {
  search: {
    edges: [
      {
        node: {
          displayLabel: "Percy Z",
          href: "/cat/percy-z",
          searchableType: "Cat",
          id: "percy-z",
        },
      },
    ],
  },
}

const simulateTyping = (wrapper: ReactWrapper, text: string) => {
  const textArea = wrapper.find("input")
  textArea.simulate("focus")
  // @ts-ignore
  textArea.getDOMNode().value = text
  textArea.simulate("change")
}

const getWrapper = (viewer, breakpoint = "xl") => {
  return renderRelayTree({
    Component: SearchBar,
    query: graphql`
      query SearchBarTestQuery($term: String!, $hasTerm: Boolean!) {
        viewer {
          ...SearchBar_viewer @arguments(term: $term, hasTerm: $hasTerm)
        }
      }
    `,
    mockData: {
      viewer,
    },
    variables: {
      term: "perc",
      hasTerm: true,
    },
    wrapper: children => (
      <MockBoot breakpoint={breakpoint as any}>{children}</MockBoot>
    ),
  })
}

describe("SearchBar", () => {
  it("displays search results", async () => {
    const component = await getWrapper(searchResults)

    simulateTyping(component, "blah") // Any text of non-zero length.
    await flushPromiseQueue()

    expect(component.text()).toContain("Percy Z")
    expect(component.text()).toContain("Cat")
  })

  it("displays placeholder text", async () => {
    const component = await getWrapper(searchResults)
    await flushPromiseQueue()
    expect(component.find(Input).props().placeholder).toBe(
      "Search by artist, gallery, style, theme, tag, etc."
    )
  })

  it("doesn't display placeholder text in the xs breakpoint", async () => {
    const component = await getWrapper(searchResults, "xs")
    await flushPromiseQueue()

    expect(component.find(Input).props().placeholder).toBe("")
  })

  it("navigates the user when clicking on an item", async () => {
    const component = await getWrapper(searchResults)

    simulateTyping(component, "blah") // Any text of non-zero length.
    await flushPromiseQueue()

    window.location.assign = jest.fn()
    component.find(SuggestionItem).simulate("click")
    expect(window.location.assign).toHaveBeenCalledWith("/cat/percy-z")
  })
})
