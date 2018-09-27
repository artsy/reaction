import { cloneDeep, isNil, omit, omitBy, uniq, without } from "lodash"
import { Container } from "unstated"

export interface State {
  // Search filters
  medium?: string
  major_periods?: string[]
  partner_id?: string
  for_sale?: boolean
  page?: number
  sort?: string
  acquireable?: boolean
  at_auction?: boolean
  inquireable_only?: boolean
  price_range?: string

  // UI
  selectedFilters?: string[]
  showActionSheet?: boolean

  tracking?: any
}

export const initialState = {
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

export class FilterState extends Container<State> {
  state = cloneDeep(initialState)
  tracking: any

  constructor(props: State) {
    super()
    this.tracking = props.tracking

    if (props) {
      Object.keys(this.state).forEach(filter => {
        if (props[filter]) {
          if (filter === "major_periods") {
            this.state[filter] = [props[filter]]
          } else if (
            [
              "for_sale",
              "acquireable",
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

  setPage(page, mediator) {
    this.setState({ page }, () => {
      mediator.trigger("collect:filter:changed", this.state)
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

  resetFilters = () => {
    this.setState({
      ...initialState,
      showActionSheet: true,
    })
  }

  unsetFilter(filter, mediator) {
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
      const filterState = omit(this.state, [
        "selectedFilterCount",
        "showActionSheet",
      ])
      mediator.trigger("collect:filter:changed", filterState)
    })
  }

  setFilter(filter, value, mediator) {
    let { selectedFilters } = this.state

    let newPartialState = {}
    if (filter === "major_periods") {
      newPartialState = {
        partner_id: null,
        major_periods: [value],
        medium: "*",
        price_range: null,
      }
    } else if (filter === "partner_id") {
      newPartialState = {
        major_periods: [],
        partner_id: value,
        medium: "*",
        price_range: null,
      }
    } else if (filter === "medium") {
      newPartialState = {
        medium: value,
        partner_id: null,
        major_periods: [],
        price_range: null,
      }
    } else if (filter === "price_range") {
      newPartialState = {
        price_range: value,
        medium: "*",
        partner_id: null,
        major_periods: [],
      }
    } else if (filter === "sort") {
      newPartialState = {
        sort: value,
        medium: "*",
        partner_id: null,
        major_periods: [],
        price_range: null,
      }
    } else if (
      ["for_sale", "acquireable", "at_auction", "inquireable_only"].includes(
        filter
      )
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
      let filterState: any = omit(this.state, [
        "selectedFilters",
        "showActionSheet",
      ])
      filterState = omitBy(filterState, isNil)

      mediator.trigger("collect:filter:changed", filterState)
      this.tracking.trackEvent({
        action: "Commercial filter: params changed",
        current: omit(this.state, ["selectedFilterCount", "showActionSheet"]),
        changed: newPartialState,
      })
    })
  }
}
