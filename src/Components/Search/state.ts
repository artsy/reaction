import { Container } from "unstated"

interface StateContainer {
  hasEnteredPreviews: boolean
  selectedPreviewIndex: number
  previewItems: any
}

export class SearchBarState extends Container<StateContainer> {
  state = {
    hasEnteredPreviews: false,
    selectedPreviewIndex: 0,
    previewItems: [],
  }

  incrementSelectedPreviewIndex() {
    const { selectedPreviewIndex, previewItems } = this.state
    let newPreviewIndex = selectedPreviewIndex + 1
    if (selectedPreviewIndex === previewItems.length - 1) {
      newPreviewIndex = 0
    }
    this.setState({
      selectedPreviewIndex: newPreviewIndex,
    })
  }

  reset() {
    this.setState({
      hasEnteredPreviews: false,
      selectedPreviewIndex: 0,
      previewItems: [],
    })
  }

  enterPreview() {
    this.setState({ hasEnteredPreviews: true, selectedPreviewIndex: 0 })
  }

  decrementOrLeavePreview() {
    let selectedPreviewIndex = this.state.selectedPreviewIndex - 1
    const hasEnteredPreviews = selectedPreviewIndex >= 0
    selectedPreviewIndex = Math.max(0, selectedPreviewIndex)
    this.setState({ hasEnteredPreviews, selectedPreviewIndex })
  }

  registerItems(items) {
    this.setState({ previewItems: items })
  }

  clearPreviewItems() {
    this.setState({ previewItems: [] })
  }
}
