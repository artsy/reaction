import { FilterState } from "../FilterState"

describe("FilterState", () => {
  let instance = null
  const mediator = {
    trigger: jest.fn(),
  }

  const tracking = {
    trackEvent: jest.fn(),
  }

  beforeEach(() => {
    instance = new FilterState({
      ...initialState,
      tracking,
    })
  })

  it("Gets initialized properly", () => {
    expect(instance.state).toEqual({ ...initialState, major_periods: [[]] })
  })

  it("updates it's state properly if a filter is changed", done => {
    expect(instance.state.page).toEqual(1)
    instance.setFilter("page", 3, mediator)
    setTimeout(() => {
      expect(instance.state.page).toEqual(3)
      done()
    })
  })

  it("triggers an event after filter is set", done => {
    expect(instance.state.page).toEqual(1)
    instance.setFilter("medium", "photography", mediator)

    setTimeout(() => {
      expect(mediator.trigger).toBeCalledWith("collect:filter:changed", {
        major_periods: [[]],
        medium: "photography",
        page: 1,
        price_range: "*-*",
        height_range: "*-*",
        width_range: "*-*",
        sort: "-decayed_merch",
        attribution_class: [],
      })
      done()
    })
  })

  it("returns a price range tuple based on filter string", done => {
    instance.setFilter("price_range", "*-43000", mediator)

    setTimeout(() => {
      expect(instance.priceRangeToTuple()).toEqual([50, 43000])
      done()
    })
  })

  it("returns a height range tuple based on filter string", done => {
    instance.setFilter("height_range", "*-50", mediator)

    setTimeout(() => {
      expect(instance.heightRangeToTuple()).toEqual([1, 50])
      done()
    })
  })
})

const initialState = {
  medium: "*",
  for_sale: null,
  page: 1,
  major_periods: [],
  partner_id: null,
  sort: "-decayed_merch",
  acquireable: null,
  at_auction: null,
  offerable: null,
  inquireable_only: null,
  price_range: "*-*",
  height_range: "*-*",
  width_range: "*-*",
  attribution_class: [],
  artist_id: null,
  color: null,
}
