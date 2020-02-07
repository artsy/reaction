import { Container } from "unstated"

interface StateContainer {
  selectedAuction?: any
  page?: number
  showDetails: boolean
  sort?: string
}

export class AuctionResultsState extends Container<StateContainer> {
  state = { showDetails: false, sort: "DATE_DESC", selectedAuction: null }

  setPage = page => {
    this.setState({ page })
  }

  setSort = sort => {
    this.setState({ sort })
  }

  openDetailsCollpase = selectedAuction => {
    this.setState({ showDetails: true, selectedAuction })
  }

  closeDetailsCollapse = () => {
    this.setState({ showDetails: false, selectedAuction: null })
  }

  toggleDetails = selectedAuction => {
    if (!this.state.showDetails) {
      this.setState({
        showDetails: true,
        selectedAuction,
      })
    } else {
      this.setState({
        showDetails: false,
        selectedAuction: null,
      })
    }
  }
}
