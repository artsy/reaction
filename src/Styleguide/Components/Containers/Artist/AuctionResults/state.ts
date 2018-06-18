import { Container } from "unstated"

type State = {
  sort?: string
  page?: number
}

export class FilterState extends Container<State> {
  state = {}

  setPage(page) {
    this.setState({ page })
  }

  setSort(sort) {
    this.setState({ sort })
  }
}
