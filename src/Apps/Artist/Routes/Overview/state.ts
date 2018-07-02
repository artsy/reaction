import { Container } from "unstated"

type State = {
  medium: string
  major_periods?: string[]
  partner_id?: string
  for_sale?: boolean
  page?: number
}

export class FilterState extends Container<State> {
  state = {
    medium: "*",
    for_sale: null,
    page: 1,
    major_periods: [],
    partner_id: null,
  }

  setMajorPeriods(value) {
    this.setState({ major_periods: [value], page: 1 })
  }

  setPartner(value) {
    this.setState({ partner_id: value, page: 1 })
  }

  setPage(page) {
    this.setState({ page })
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
    if (filter === "gallery" || filter === "institution") {
      return this.setPartner(value)
    }
    this.setState({
      [filter.toLowerCase()]: value,
      page: 1,
    })
  }
}
