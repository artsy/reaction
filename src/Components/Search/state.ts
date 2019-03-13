import { Container } from "unstated"

interface StateContainer {
  hasEnteredPreviews: boolean
  selectedPreviewIndex: number
  previewItems: any
}

export class SearchBarState extends Container<StateContainer> {
  state = {
    hasEnteredPreviews: false,
    selectedPreviewIndex: null, // if set, represents currently selected index (via keyboard)
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
      selectedPreviewIndex: null,
      previewItems: [],
    })
  }

  enterPreviewWithoutSelection() {
    this.setState({ hasEnteredPreviews: true, selectedPreviewIndex: null })
  }

  enterPreview() {
    this.setState({ hasEnteredPreviews: true, selectedPreviewIndex: 0 })
  }

  leavePreviewIfNoSelection() {
    if (this.state.selectedPreviewIndex != null) return
    this.setState({ hasEnteredPreviews: false })
  }

  decrementOrLeavePreview() {
    let selectedPreviewIndex = this.state.selectedPreviewIndex - 1
    const hasEnteredPreviews = selectedPreviewIndex >= 0
    selectedPreviewIndex = hasEnteredPreviews ? selectedPreviewIndex : null
    this.setState({ hasEnteredPreviews, selectedPreviewIndex })
  }

  registerItems(items) {
    this.setState({ previewItems: items })
  }

  clearPreviewItems() {
    this.setState({ previewItems: [] })
  }
}
