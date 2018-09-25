import { FilterState } from "../FilterState"

describe("FilterState", () => {
  let instance = null

  beforeEach(() => {
    instance = new FilterState(initialState)
  })

  it("Gets initialized properly", () => {
    expect(instance.state).toEqual(initialState)
  })

  it("updates it's state properly if a filter is changed", () => {
    expect(instance.state.page).toEqual(1)
    instance.setFilter("page", 3)
    expect(instance.state.page).toEqual(3)
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
  inquireable_only: null,
  price_range: null,
  selectedFilters: [],
  showActionSheet: false,
}
