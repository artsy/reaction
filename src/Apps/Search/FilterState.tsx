import { cloneDeep } from "lodash"
import qs from "qs"
import { Container } from "unstated"

export interface State {
  medium?: string // x
  major_periods?: string[] // x
  partner_id?: string // x
  for_sale?: boolean // x
  page?: number // x
  sort?: string // x
  offerable?: boolean // x
  acquireable?: boolean // x
  at_auction?: boolean // x
  inquireable_only?: boolean // x
  price_range?: string // x
  height?: string // x
  width?: string // x
  attribution_class?: string[] // ????? I don't see this used anywhere.
  artist_id?: string // ????? I don't see this used anywhere.
  color?: string // x
  keyword?: string // x
}

export const initialState = {
  medium: null,
  for_sale: null,
  page: 1,
  major_periods: [],
  partner_id: null,
  sort: "-decayed_merch",
  acquireable: null,
  offerable: null,
  at_auction: null,
  inquireable_only: null,
  price_range: "*-*",
  height: "*-*",
  width: "*-*",
  attribution_class: [],
  artist_id: null,
  color: null,
  keyword: null,
}

// Returns a string representing the query part of a URL.
// It removes default values, and rewrites keyword -> term.
export const urlFragmentFromState = (state: State) => {
  const { keyword: term } = state
  const filters = Object.entries(state).reduce((acc, [key, value]) => {
    if (isDefaultFilter(key, value) || key === "keyword") {
      return acc
    } else {
      return { ...acc, [key]: value }
    }
  }, {})

  return qs.stringify({
    ...filters,
    term,
  })
}

/* sjhsjhsjh done */
// This is used to remove default state params that clutter up URLs.
const isDefaultFilter = (filter, value): boolean => {
  if (filter === "major_periods" || filter === "attribution_class") {
    return value.length === 0
  }

  if (filter === "sort") {
    return value === "-decayed_merch"
  }

  if (filter === "medium") {
    return value === "*" || !value
  }

  if (filter === "price_range" || filter === "height" || filter === "width") {
    return value === "*-*"
  }

  if (filter === "page") {
    return value === 1
  }

  return !value
}

export class FilterState extends Container<State> {
  state = cloneDeep(initialState)

  static MIN_PRICE = 50
  static MAX_PRICE = 50000
  static MIN_HEIGHT = 1
  static MAX_HEIGHT = 120
  static MIN_WIDTH = 1
  static MAX_WIDTH = 120

  constructor(props: State) {
    super()

    if (props) {
      Object.keys(this.state).forEach(filter => {
        const value = props[filter]
        if (!value) {
          return
        }

        switch (filter) {
          case "page":
            this.state[filter] = Number(value)
            break
          case "for_sale":
          case "acquireable":
          case "offerable":
          case "at_auction":
          case "inquireable_only":
            this.state[filter] = value ? true : null
            break
          default:
            this.state[filter] = value
        }
      })
    }
  }

  /* sjhsjhsjh done */
  get hasFilters() {
    return Object.entries(this.state).some(([key, value]) => {
      return !isDefaultFilter(key, value)
    })
  }

  previousQueryString = ""
  pushHistory() {
    const currentQueryString = urlFragmentFromState(this.state)
    // PriceRangeFilter's onAfterChange event fires twice; this ensures
    //   we only push that history event once.
    if (this.previousQueryString !== currentQueryString) {
      window.history.pushState(
        {},
        null,
        `${window.location.pathname}?${currentQueryString}`
      )
      this.previousQueryString = currentQueryString
    }
  }

  /* sjhsjhsjh done */
  setPage(page) {
    this.setState({ page }, () => {
      this.pushHistory()
    })
  }

  resetFilters = () => {
    const { keyword } = this.state
    this.setState(
      {
        ...initialState,
        keyword,
      },
      () => {
        this.pushHistory()
      }
    )
  }

  /* sjhsjhsjh done */
  unsetFilter(filter) {
    let newPartialState = {}
    if (filter === "major_periods") {
      newPartialState = { major_periods: [] }
    }
    if (filter === "attribution_class") {
      newPartialState = { attribution_class: [] }
    }
    if (
      [
        "for_sale",
        "acquireable",
        "offerable",
        "at_auction",
        "partner_id",
        "inquireable_only",
        "color",
      ].includes(filter)
    ) {
      newPartialState[filter] = null
    }
    if (filter === "medium") {
      newPartialState = { medium: "*" }
    }

    this.setState(newPartialState, () => {
      this.pushHistory()
    })
  }

  /* sjhsjhsjh done */
  setFilter(filter: keyof State, value) {
    let newPartialState = {}

    switch (filter) {
      case "major_periods":
        newPartialState = { major_periods: !!value ? [value] : [] }
        break
      case "attribution_class":
        newPartialState = {
          attribution_class: this.state.attribution_class.concat(value),
        }
        break
      case "page":
        newPartialState[filter] = Number(value)
        break
      case "price_range":
      case "height":
      case "width":
      case "partner_id":
      case "color":
      case "medium":
      case "sort":
        newPartialState[filter] = value
        break
      case "for_sale":
      case "acquireable":
      case "offerable":
      case "at_auction":
      case "inquireable_only":
        newPartialState[filter] = !!value
        break
    }

    this.setState({ page: 1, ...newPartialState }, () => {
      this.pushHistory()
    })
  }

  // TODO - this doesn't really belong here. It's a util.
  //   Or maybe it belongs attached to individual filters?
  rangeToTuple(range: string): [number, number] {
    let minStr: string
    let maxStr: string
    let min: number
    let max: number
    if (range === "price_range") {
      ;[minStr, maxStr] = this.state.price_range.split("-")
      min = minStr === "*" ? FilterState.MIN_PRICE : Number(minStr)
      max = maxStr === "*" ? FilterState.MAX_PRICE : Number(maxStr)
    } else if (range === "height") {
      ;[minStr, maxStr] = this.state.height.split("-")
      min = minStr === "*" ? FilterState.MIN_HEIGHT : Number(minStr)
      max = maxStr === "*" ? FilterState.MAX_HEIGHT : Number(maxStr)
    } else if (range === "width") {
      ;[minStr, maxStr] = this.state.width.split("-")
      min = minStr === "*" ? FilterState.MIN_WIDTH : Number(minStr)
      max = maxStr === "*" ? FilterState.MAX_WIDTH : Number(maxStr)
    } else {
      ;[minStr, maxStr] = ["*", "*"]
    }
    return [min, max]
  }
}
