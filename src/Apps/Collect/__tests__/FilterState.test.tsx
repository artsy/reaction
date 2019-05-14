import { FilterState } from "../FilterState"

describe("FilterState", () => {
  let instance = null

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

  it("updates it's state properly if a filter is changed", () => {
    expect(instance.state.page).toEqual(1)

    instance.setState = jest.fn()
    instance.setFilter("page", 3)

    expect(instance.setState).toBeCalledWith({ page: 3 }, expect.anything())
  })

  it("confirms that state is set for price range filter", () => {
    instance.setState = jest.fn()
    instance.setFilter("price_range", "*-43000")
    expect(instance.setState).toBeCalledWith(
      { price_range: "*-43000" },
      expect.anything()
    )
  })

  it("confirms that price range filter is set to correct values", () => {
    instance.state = {
      price_range: "*-43000",
    }
    expect(instance.rangeToTuple("price_range")).toEqual([50, 43000])
  })

  it("returns a height range tuple based on filter string", () => {
    instance.setState = jest.fn()
    instance.setFilter("height", "*-50")
    expect(instance.setState).toBeCalledWith(
      { height: "*-50" },
      expect.anything()
    )
  })

  it("returns a height range tuple based on the state", () => {
    instance.state = {
      height: "*-50",
    }
    expect(instance.rangeToTuple("height")).toEqual([1, 50])
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
  height: "*-*",
  width: "*-*",
  attribution_class: [],
  artist_id: null,
  color: null,
  dimension_range: null,
}
