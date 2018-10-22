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
  let mockMediator = null
  let user = null

  const mediums = [
    { id: "photography", name: "Photography" },
    { id: "prints", name: "Prints" },
  ]

  beforeEach(() => {
    mockMediator = {
      trigger: jest.fn(),
    }
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
      <Provider inject={[filterState]}>
        <FilterContainer
          isMobile
          mediator={mockMediator}
          mediums={mediums}
          user={user}
        />
      </Provider>
    )

    wrapper.update()

    expect(wrapper.find("Mobile").length).toEqual(1)
    expect(wrapper.find("Desktop").length).toEqual(0)
  })

  it("renders desktop version", () => {
    const wrapper = mount(
      <Provider inject={[filterState]}>
        <FilterContainer
          mediator={mockMediator}
          mediums={mediums}
          user={user}
        />
      </Provider>
    )

    wrapper.update()

    expect(wrapper.find("Mobile").length).toEqual(0)
    expect(wrapper.find("Desktop").length).toEqual(1)
  })
})
