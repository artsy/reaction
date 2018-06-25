import { Container } from "unstated"

interface State {
  selectedAuction?: any
  page?: number
  showModal: boolean
  sort?: string
}

export class AuctionResultsStateContainer extends Container<State> {
  state = {
    showModal: false,
    sort: "PRICE_AND_DATE_DESC",
    selectedAuction: null,
  }

  setPage = page => {
    this.setState({
      page,
    })
  }

  setSort = sort => {
    this.setState({
      sort,
    })
  }

  showDetailsModal = selectedAuction => {
    this.setState({
      showModal: true,
      selectedAuction,
    })
  }

  hideDetailsModal = () => {
    this.setState({
      showModal: false,
      selectedAuction: null,
    })
  }
}
