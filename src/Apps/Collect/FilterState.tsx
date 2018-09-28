import { cloneDeep, isNil, omit, omitBy } from "lodash"
import { Container } from "unstated"

export interface State {
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

  tracking?: any
}

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

export class FilterState extends Container<State> {
  state = cloneDeep(initialState)
  tracking: any

  constructor(props: State) {
    super()
    this.tracking = props.tracking

    if (props) {
      Object.keys(this.state).forEach(filter => {
        const value = props[filter]
        if (!value) {
          return
        }

        switch (filter) {
          case "major_periods":
            this.state[filter] = [value]
            break
          case "page":
            this.state[filter] = Number(value)
            break
          case "for_sale":
          case "acquireable":
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

  get filteredState() {
    return omitBy(this.state, isNil)
  }

  setPage(page, mediator) {
    this.setState({ page }, () => {
      mediator.trigger("collect:filter:changed", this.filteredState)
    })
  }

  resetFilters = () => {
    this.setState({
      ...initialState,
    })
  }

  unsetFilter(filter, mediator) {
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

    this.setState(newPartialState, () => {
      mediator.trigger("collect:filter:changed", this.filteredState)
    })
  }

  setFilter(filter, value, mediator) {
    let newPartialState = {}

    switch (filter) {
      case "major_periods":
        newPartialState = {
          major_periods: [value],
        }
        break
      case "page":
        newPartialState[filter] = Number(value)
        break
      case "partner_id":
      case "medium":
      case "price_range":
      case "sort":
        newPartialState[filter] = value
        break
      case "for_sale":
      case "acquireable":
      case "at_auction":
      case "inquireable_only":
        newPartialState[filter] = !!value
        break
    }

    this.setState(newPartialState, () => {
      mediator.trigger("collect:filter:changed", this.filteredState)

      this.tracking.trackEvent({
        action: "Commercial filter: params changed",
        current: omit(this.state, ["selectedFilterCount", "showActionSheet"]),
        changed: { [filter]: value },
      })
    })
  }
}
