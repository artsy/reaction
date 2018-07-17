import { Container } from "unstated"

interface StateContainer {
  selectedAuction?: any
  page?: number
  showModal: boolean
  sort?: string
}

export class AuctionResultsState extends Container<StateContainer> {
  state = { showModal: false, sort: "DATE_DESC", selectedAuction: null }

  setPage = page => {
    this.setState({ page })
  }

  setSort = sort => {
    this.setState({ sort })
  }

  showDetailsModal = selectedAuction => {
    this.setState({ showModal: true, selectedAuction })
  }

  hideDetailsModal = () => {
    this.setState({ showModal: false, selectedAuction: null })
  }
}
