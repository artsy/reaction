import { Container } from "unstated"

type State = {
  sort?: string
  page?: number
}

export class FilterState extends Container<State> {
  state = { sort: "PRICE_AND_DATE_DESC" }

  setPage(page) {
    this.setState({ page })
  }

  setSort = sort => {
    this.setState({ sort })
  }
}
