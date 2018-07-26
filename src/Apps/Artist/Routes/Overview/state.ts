import { Container } from "unstated"

type State = {
  medium: string
  major_periods?: string[]
  partner_id?: string
  for_sale?: boolean
  page?: number
  sort?: string
}

export class FilterState extends Container<State> {
  state = {
    medium: "*",
    for_sale: null,
    page: 1,
    major_periods: [],
    partner_id: null,
    sort: "-partner_updated_at",
  }

  constructor(props: State) {
    super()
    if (props) {
      Object.keys(this.state).forEach(filter => {
        if (props[filter]) {
          if (filter === "major_periods") {
            this.state[filter] = [props[filter]]
          } else if (filter === "for_sale") {
            this.state.for_sale = props[filter] ? true : null
          } else {
            this.state[filter] = props[filter]
          }
        }
      })
    }
  }

  setPage(page, mediator) {
    this.setState({ page }, () => {
      mediator.trigger("artist:filter:changed", this.state)
    })
  }

  setSort = (sort, mediator) => {
    this.setState({ sort }, () => {
      mediator.trigger("artist:filter:changed", this.state)
    })
  }

  unsetFilter(filter, mediator) {
    let newPartialState
    if (filter === "major_periods") {
      newPartialState = { major_periods: [] }
    }
    if (filter === "partner_id") {
      newPartialState = { partner_id: null }
    }
    if (filter === "for_sale") {
      newPartialState = { for_sale: null }
    }
    if (filter === "medium") {
      newPartialState = { medium: "*" }
    }

    this.setState({ page: 1, ...newPartialState }, () => {
      mediator.trigger("artist:filter:changed", this.state)
    })
  }

  setFilter(filter, value, mediator) {
    let newPartialState
    if (filter === "major_periods") {
      newPartialState = {
        partner_id: null,
        major_periods: [value],
        medium: "*",
      }
    }
    if (filter === "partner_id") {
      newPartialState = {
        major_periods: [],
        partner_id: value,
        medium: "*",
      }
    }
    if (filter === "for_sale") {
      if (value) {
        newPartialState = { for_sale: true }
      } else {
        newPartialState = { for_sale: null }
      }
    }
    if (filter === "medium") {
      newPartialState = {
        medium: value,
        partner_id: null,
        major_periods: [],
      }
    }

    this.setState({ page: 1, ...newPartialState }, () => {
      mediator.trigger("artist:filter:changed", this.state)
    })
  }
}
