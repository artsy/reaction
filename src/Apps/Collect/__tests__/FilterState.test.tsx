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
  price_range: "*-*",
}
