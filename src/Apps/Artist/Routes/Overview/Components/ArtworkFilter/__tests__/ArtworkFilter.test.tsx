// FIXME: Uncomment tests, currently WIP

import { ArtworkFilterFixture } from "Apps/__tests__/Fixtures/Artist/Components/ArtworkFilter"
import { ArtworkFilterFragmentContainer as ArtworkFilter } from "Apps/Artist/Routes/Overview/Components/ArtworkFilter"
import { FilterState } from "Apps/Artist/Routes/Overview/state"
import { MockBoot, renderRelayTree } from "DevTools"
import React from "react"
import { graphql } from "react-relay"
import { Provider } from "unstated"
import { flushPromiseQueue } from "Utils/flushPromiseQueue"
import { get } from "Utils/get"
import { Breakpoint } from "Utils/Responsive"

jest.unmock("react-relay")
jest.mock("../ArtworkFilterRefetch", () => ({
  ArtworkFilterRefetchContainer: () => <div>Mock ArtworkFilterRefetch</div>,
}))

describe("ArtworkFilter", () => {
  let filterState: FilterState = null

  beforeEach(() => {
    filterState = new FilterState({} as any)
  })

  async function getWrapper(breakpoint: Breakpoint = "lg") {
    return await renderRelayTree({
      Component: ArtworkFilter,
      query: graphql`
        query ArtworkFilter_Test_Query {
          artist(id: "andy-warhol") {
            ...ArtworkFilter_artist
          }
        }
      `,
      mockData: {
        artist: ArtworkFilterFixture,
      },

      wrapper: children => (
        <MockBoot breakpoint={breakpoint}>
          <Provider inject={[filterState]}>{children}</Provider>
        </MockBoot>
      ),
    })
  }

  it("renders the current mediums", async () => {
    const tree = await getWrapper()

    const html = tree.html()
    expect(html).toContain("Catty Painting")
  })

  describe("Mobile Action Sheet", () => {
    it("Doesn't display the filters by default at xs", async () => {
      const wrapper = await getWrapper("xs")

      expect(wrapper.find("Filters").length).toEqual(0)
    })

    it("Displays the filters after clicking the 'Filter' button at xs", async () => {
      const wrapper = await getWrapper("xs")
      const filterButton = findButtonWithText(wrapper, "Filter")

      filterButton.simulate("click")
      await flushPromiseQueue()
      wrapper.update()

      expect(wrapper.find("Filters").length).toEqual(1)
    })

    it("Closes the filters after clicking the 'Apply' button at xs", async () => {
      const wrapper = await getWrapper("xs")

      const filterButton = findButtonWithText(wrapper, "Filter")
      filterButton.simulate("click")
      await flushPromiseQueue()
      wrapper.update()

      const applyButton = findButtonWithText(wrapper, "Apply")
      applyButton.simulate("click")
      await flushPromiseQueue()
      wrapper.update()

      expect(wrapper.find("Filters").length).toEqual(0)
    })

    function findButtonWithText(wrapper, buttonText) {
      return wrapper
        .find("Button")
        .findWhere(button => {
          return get(button, b => b.text().includes(buttonText), false)
        })
        .first()
    }
  })
})
