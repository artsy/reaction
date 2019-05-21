import { cloneDeep, uniq, without } from "lodash"
import qs from "qs"
import { Container } from "unstated"

interface State {
  // Search filters
  medium: string
  major_periods?: string[]
  partner_id?: string
  for_sale?: boolean
  page?: number
  sort?: string
  offerable?: boolean
  acquireable?: boolean
  at_auction?: boolean
  inquireable_only?: boolean
  price_range?: string

  // UI
  selectedFilters: string[]
  showActionSheet: boolean
  showZeroState: boolean
}

const initialSort = "-decayed_merch"

export const initialState = {
  medium: "*",
  for_sale: null,
  page: 1,
  major_periods: [],
  partner_id: null,
  sort: initialSort,
  acquireable: null,
  offerable: null,
  at_auction: null,
  inquireable_only: null,
  price_range: "*-*",
  selectedFilters: [],
  showActionSheet: false,
  showZeroState: false,
}

// Returns a string representing the query part of a URL.
// It removes default values.
export const urlFragmentFromState = (state: State) => {
  const filters = Object.entries(state).reduce((acc, [key, value]) => {
    if (isDefaultFilter(key, value)) {
      return acc
    } else {
      return { ...acc, [key]: value }
    }
  }, {})

  return qs.stringify(filters)
}

// This is used to remove default state params that clutter up URLs.
const isDefaultFilter = (filter, value): boolean => {
  if (filter === "major_periods" || filter === "attribution_class") {
    return value.length === 0
  }

  if (filter === "sort") {
    return value === "-decayed_merch"
  }

  if (filter === "price_range" || filter === "height" || filter === "width") {
    return value === "*-*"
  }

  if (filter === "page") {
    return value === 1
  }

  if (filter === "medium") {
    return value === "*"
  }

  return !value
}

export class FilterState extends Container<State> {
  state = cloneDeep(initialState)

  static MIN_PRICE = 50
  static MAX_PRICE = 50000

  constructor(props: State) {
    super()
    if (props) {
      Object.keys(this.state).forEach(filter => {
        if (props[filter]) {
          if (
            [
              "for_sale",
              "acquireable",
              "offerable",
              "at_auction",
              "inquireable_only",
            ].includes(filter)
          ) {
            this.state[filter] = props[filter] ? true : null
          } else {
            this.state[filter] = props[filter]
          }
        }
      })
    }
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

  setPage(page) {
    this.setState({ page }, () => {
      this.pushHistory()
    })
  }

  setSort = sort => {
    this.setState({ sort }, () => {
      this.pushHistory()
    })
  }

  showActionSheet = show => {
    if (show) {
      // TODO: Manage this side-effect in a more react-like fashion
      document.body.style.overflowY = "hidden"
    } else {
      document.body.style.overflowY = "auto"
    }

    this.setState({ showActionSheet: show })
  }

  showZeroState = showZeroState => {
    this.setState({
      showZeroState,
    })
  }

  resetFilters = () => {
    this.setState(
      {
        ...initialState,
        showActionSheet: true,
      },
      () => {
        this.pushHistory()
      }
    )
  }

  unsetFilter(filter) {
    let { selectedFilters } = this.state
    let newPartialState = {}
    if (filter === "major_periods") {
      newPartialState = { major_periods: [] }
    }
    if (
      [
        "for_sale",
        "acquireable",
        "at_auction",
        "partner_id",
        "inquireable_only",
      ].includes(filter)
    ) {
      newPartialState[filter] = null
    }
    if (filter === "medium") {
      newPartialState = { medium: "*" }
    }

    selectedFilters = without(selectedFilters, "radio")

    this.setState({ page: 1, selectedFilters, ...newPartialState }, () => {
      this.pushHistory()
    })
  }

  priceRangeToTuple(): [number, number] {
    let minStr: string
    let maxStr: string
    let min: number
    let max: number
    ;[minStr, maxStr] = this.state.price_range.split("-")
    min = minStr === "*" ? FilterState.MIN_PRICE : Number(minStr)
    max = maxStr === "*" ? FilterState.MAX_PRICE : Number(maxStr)
    return [min, max]
  }

  setFilter(filter, value) {
    let { selectedFilters } = this.state

    let newPartialState = {}
    if (filter === "major_periods") {
      newPartialState = {
        partner_id: null,
        major_periods: [value],
        medium: "*",
      }
    } else if (filter === "partner_id") {
      newPartialState = {
        major_periods: [],
        partner_id: value,
        medium: "*",
      }
    } else if (filter === "medium") {
      newPartialState = {
        medium: value,
        partner_id: null,
        major_periods: [],
      }
    } else if (filter === "price_range") {
      newPartialState[filter] = value
    } else if (
      [
        "for_sale",
        "offerable",
        "acquireable",
        "at_auction",
        "inquireable_only",
      ].includes(filter)
    ) {
      if (value) {
        selectedFilters = selectedFilters.concat([filter])
        newPartialState[filter] = true
      } else {
        selectedFilters = without(selectedFilters, filter)
        newPartialState[filter] = null
      }
    }

    if (["major_periods", "partner_id", "medium"].includes(filter)) {
      selectedFilters = selectedFilters.concat(["radio"])
    }

    selectedFilters = uniq(selectedFilters)

    this.setState({ page: 1, selectedFilters, ...newPartialState }, () => {
      this.pushHistory()
    })
  }
}
