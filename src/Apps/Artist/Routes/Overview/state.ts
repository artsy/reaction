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
    sort: "-decayed_merch",
  }

  setMajorPeriods(value) {
    this.setState({
      partner_id: null,
      major_periods: [value],
      page: 1,
      medium: "*",
    })
  }

  setPartner(value) {
    this.setState({
      major_periods: [],
      partner_id: value,
      medium: "*",
      page: 1,
    })
  }

  setPage(page) {
    this.setState({ page })
  }

  setSort = sort => {
    this.setState({ sort })
  }

  unsetFilter(filter) {
    if (filter === "major_periods") {
      return this.setState({ page: 1, major_periods: [] })
    }
    if (filter === "partner_id") {
      return this.setState({ page: 1, partner_id: null })
    }
    if (filter === "for_sale") {
      return this.setState({ page: 1, for_sale: null })
    }
    if (filter === "medium") {
      return this.setState({ page: 1, medium: "*" })
    }
  }

  setFilter(filter, value) {
    if (filter === "major_periods") {
      return this.setMajorPeriods(value)
    }
    if (filter === "partner_id") {
      return this.setPartner(value)
    }
    if (filter === "for_sale") {
      if (value) {
        this.setState({ page: 1, for_sale: true })
      } else {
        this.setState({ page: 1, for_sale: null })
      }
    }
    if (filter === "medium") {
      this.setState({
        medium: value,
        page: 1,
        partner_id: null,
        major_periods: [],
      })
    }
  }
}
