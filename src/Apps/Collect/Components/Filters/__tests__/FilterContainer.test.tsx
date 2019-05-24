import { MockBoot } from "DevTools"
import { mount } from "enzyme"
import React from "react"
import { Provider } from "unstated"
import { FilterState } from "../../../FilterState"
import { FilterContainer } from "../FilterContainer"

jest.mock("sharify", () => ({
  data: {
    NODE_ENV: "test",
  },
}))

describe("FilterContainer", () => {
  let filterState: FilterState = null
  let user = null

  const mediums = [
    { id: "photography", name: "Photography" },
    { id: "prints", name: "Prints" },
  ]

  beforeEach(() => {
    filterState = new FilterState({
      tracking: {
        trackEvent: jest.fn(),
      },
    })

    user = {
      lab_features: {
        includes: () => true,
      },
    }
  })

  it("renders mobile version", () => {
    const wrapper = mount(
      <MockBoot breakpoint="xs">
        <Provider inject={[filterState]}>
          <FilterContainer mediums={mediums} user={user}>
            {filters => {
              return <div />
            }}
          </FilterContainer>
        </Provider>
      </MockBoot>
    )

    wrapper.update()

    expect(wrapper.find("Mobile").length).toEqual(1)
    expect(wrapper.find("Desktop").length).toEqual(0)
  })

  it("renders desktop version", () => {
    const wrapper = mount(
      <MockBoot breakpoint="lg">
        <Provider inject={[filterState]}>
          <FilterContainer mediums={mediums} user={user}>
            {filters => {
              return <div />
            }}
          </FilterContainer>
        </Provider>
      </MockBoot>
    )

    wrapper.update()

    expect(wrapper.find("Mobile").length).toEqual(0)
    expect(wrapper.find("Desktop").length).toEqual(1)
  })
})
